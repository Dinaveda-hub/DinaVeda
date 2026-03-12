/**
 * protocolSelectionEngine.ts
 *
 * The Ayurvedic decision engine of Dinaveda.
 * Converts physiological state into recommended micro-protocols.
 *
 * PIPELINE:
 * Physiology State → Dosha/Agni/Circadian Evaluation → Protocol Selection → TOD Filtering
 *
 * LAYERS:
 * 1. Primary Imbalance (Dosha)
 * 2. Agni Condition
 * 3. Circadian Correction
 */

import protocolsRaw from "../data/protocols.json";
import rulesRaw from "../data/rules/recommendation_rules.json";
import { VedaState, defaultState } from "./stateModel";
import { PredictionEngine } from "./predictionEngine";
import { ProtocolWeights } from "@/utils/userWeightsService";
import { PhysiologyPattern, PATTERN_PROTOCOL_MAP } from "@/services/patternService";

export interface Protocol {
    name: string;
    display_name?: string;
    module: string;
    category: string;
    time_of_day: string;
    duration: string;
    variables: Record<string, number>;
    instructions: string;
    recommended_foods?: string[];
    avoid_foods?: string[];
    contraindications: string[];
    tags?: string[];
    season?: string[];
    is_premium?: boolean;
}

export interface ProtocolRule {
    variable: keyof VedaState;
    operator: ">" | "<" | ">=" | "<=" | "==" | "!=";
    threshold: number | boolean;
    protocols: string[];
    module: string;
    priority: number;
}

const MAX_PROTOCOLS = 10;
const protocol_conflicts: Record<string, string[]> = {
    "light_dinner": ["heavy_nourishing_meal"],
    "fasting": ["strength_building_meal"]
};

const protocolMap = new Map((protocolsRaw as any[]).map(p => [p.name, p]));
const rules = rulesRaw as ProtocolRule[];
const predictionEngine = new PredictionEngine();

/**
 * Safely evaluates a structured physiological rule without any dynamic execution.
 */
function evaluateRule(rule: ProtocolRule, state: VedaState): boolean {
    const currentValue = state[rule.variable];
    const threshold = rule.threshold;

    if (typeof currentValue === 'number' && typeof threshold === 'number') {
        switch (rule.operator) {
            case ">": return currentValue > threshold;
            case "<": return currentValue < threshold;
            case ">=": return currentValue >= threshold;
            case "<=": return currentValue <= threshold;
            case "==": return currentValue === threshold;
            case "!=": return currentValue !== threshold;
            default: return false;
        }
    }

    if (typeof currentValue === 'boolean' && typeof threshold === 'boolean') {
        switch (rule.operator) {
            case "==": return currentValue === threshold;
            case "!=": return currentValue !== threshold;
            default: return false;
        }
    }

    return false;
}

/**
 * Checks if a protocol is clinically safe for the current state.
 * Acts as a Hard Safety Filter (Guardrail).
 */
function isProtocolSafe(protocol: Protocol, state: VedaState): boolean {
    // 1. Pitta Guard (Heat avoidance)
    if (state.pitta >= 70 || state.inflammation >= 70) {
        const heatingCategories = ['kapha_activator', 'movement_activation', 'agni_support', 'agni_alignment', 'kapha_activation', 'circadian_activation'];
        if (heatingCategories.includes(protocol.category)) return false;
        if (protocol.name.includes('vigorous') || protocol.name.includes('spices') || protocol.name.includes('dynamic') || protocol.name.includes('brisk')) return false;
    }

    // 2. Vata/Stress Guard (Over-stimulation & Cold & Lightness avoidance)
    // Stricter at 65+ to prevent Vata runaway (Cold/Light/Mobile)
    if (state.vata >= 65 || state.stress >= 70) {
        const stimulatingCategories = ['kapha_activator', 'movement_activation', 'kapha_activation', 'circadian_activation', 'mental_activation', 'energy_activation'];
        if (stimulatingCategories.includes(protocol.category)) return false;

        // Vata is cold & light; block all cooling/lightening interventions
        const isCooling = protocol.name.includes('cooling') || protocol.name.includes('cold') ||
            protocol.name.includes('moonlight') || protocol.name.includes('coriander') ||
            protocol.name.includes('greens') || protocol.name.includes('bath') ||
            protocol.category.includes('pitta');

        const isLightening = protocol.variables.kapha && protocol.variables.kapha < 0;

        if (isCooling || isLightening) return false;
        if (protocol.name.includes('vigorous') || protocol.name.includes('brisk') || protocol.name.includes('dynamic')) return false;
    }

    // 4. Structured Contraindication Checks
    const contra = protocol.contraindications;
    if (contra.includes('fever') && state.inflammation > 30) return false;
    if (contra.includes('gastric_sensitivity') && state.pitta > 70) return false;
    if (contra.includes('injury') && (state.stiffness > 60 || state.inflammation > 60)) return false;
    if (contra.includes('hypertension') && state.stress > 80) return false;
    if (contra.includes('sinus_infection') && state.kapha > 70) return false;

    // 5. Sleep Deprivation Guard (Vata reduction focus)
    // Acute sleep debt = High Vata. Block Light/Cold/Sharp.
    if (state.sleep < 50) {
        const recoveryBlocked = [
            'kapha_activator', 'movement_activation', 'kapha_activation',
            'circadian_activation', 'mental_activation', 'energy_activation',
            'circadian_stabilizer', 'metabolic_regulation', 'kapha_balance'
        ];
        if (recoveryBlocked.includes(protocol.category)) return false;

        // Block 'Light' (Kapha-reducing), 'Cold', and 'Sharp' stimulants (like Ginger)
        const isLightening = protocol.variables.kapha && protocol.variables.kapha < 0;
        const isCooling = protocol.name.includes('cooling') || protocol.name.includes('cold') ||
            protocol.name.includes('moonlight') || protocol.name.includes('coriander') ||
            protocol.name.includes('greens') || protocol.name.includes('bath') ||
            protocol.category.includes('pitta');

        if (isLightening || isCooling) return false;
        if (protocol.name.includes('light_dinner') || protocol.name.includes('ginger') || protocol.name.includes('sugar')) return false;

        if (protocol.name.includes('vigorous') || protocol.name.includes('brisk') ||
            protocol.name.includes('dynamic') || protocol.name.includes('early_wake') ||
            protocol.name.includes('fasting')) return false;
    }

    // 5. Ojas Depletion Guard (Restoration focus)
    if (state.ojas < 40) {
        const recoveryBlocked = ['kapha_activator', 'movement_activation', 'kapha_activation', 'circadian_activation', 'mental_activation', 'energy_activation', 'circadian_stabilizer', 'metabolic_regulation'];
        if (recoveryBlocked.includes(protocol.category)) return false;
        if (protocol.name.includes('vigorous') || protocol.name.includes('brisk') || protocol.name.includes('dynamic') || protocol.name.includes('fasting')) return false;
    }

    // 6. Weak Agni Guard (Digestive sensitivity)
    if (state.agni < 40) {
        // Block thermal cooling (baths/cold water) but allow mental cooling (pranayama/meditation)
        const agniBlocked = ['kapha_activator', 'kapha_activation', 'movement_activation'];
        if (agniBlocked.includes(protocol.category)) return false;
        if (protocol.name.includes('vigorous') || protocol.name.includes('brisk')) return false;

        // Specific thermal cooling block
        if (protocol.category.includes('pitta') && (protocol.name.includes('bath') || protocol.name.includes('water') || protocol.name.includes('food'))) return false;
        if (protocol.name.includes('cold') || (protocol.name.includes('cooling') && !protocol.name.includes('pranayama'))) return false;
    }

    // 6. Per-Variable Escalation Guard
    for (const [stateKey, effect] of Object.entries(protocol.variables)) {
        const value = state[stateKey as keyof VedaState];
        if (typeof value !== 'number') continue;

        let baseline = (defaultState as any)[stateKey] || 50;
        if (stateKey === 'vata') baseline = state.prakriti_vata || 50;
        else if (stateKey === 'pitta') baseline = state.prakriti_pitta || 50;
        else if (stateKey === 'kapha') baseline = state.prakriti_kapha || 50;

        const deviation = value - baseline;

        if (value > 85 && ((deviation > 0 && effect > 0) || (deviation < 0 && effect < 0))) {
            return false;
        }
    }

    return true;
}

/**
 * Calculates how well a protocol corrects the current physiological deviations.
 * Uses Non-Linear Weighting: Larger deviations are prioritized exponentially.
 * Formula: Σ ( -WeightedDeviation_i × Effect_i ) / (Σ |Effect_i| ^ 0.75)
 */
function calculateCorrectionScore(protocol: Protocol, state: VedaState, userWeights: Record<string, number> = {}): number {
    let weightedSum = 0;
    let absoluteEffectSum = 0;

    for (const [stateKey, baseEffect] of Object.entries(protocol.variables)) {
        const value = state[stateKey as keyof VedaState];
        if (typeof value !== 'number') continue;

        let baseline = (defaultState as any)[stateKey] || 50;
        if (stateKey === 'vata') baseline = state.prakriti_vata || 50;
        else if (stateKey === 'pitta') baseline = state.prakriti_pitta || 50;
        else if (stateKey === 'kapha') baseline = state.prakriti_kapha || 50;

        const deviation = value - baseline;

        // Apply personal multiplier (Machine Learning Feedback Loop)
        const multiplier = userWeights[stateKey] ?? 1.0;
        const effect = baseEffect * multiplier;

        // 1. Power-Law Deviation Weighting: Priority grows exponentially with deviation.
        const weight = 1 + Math.pow(Math.abs(deviation) / 30, 1.5);
        const weightedDeviation = deviation * weight;

        // 2. Clinical Priority: Vata-related variables (Sleep, Stress, etc.) get a 20 \%$ multiplier
        const priorityMultiplier = (stateKey === 'vata' || stateKey === 'stress' || stateKey === 'sleep') ? 1.2 : 1.0;

        // 3. Correction Factor (Signs already normalized in JSON)
        weightedSum += -weightedDeviation * effect * priorityMultiplier;
        absoluteEffectSum += Math.abs(effect);
    }

    if (absoluteEffectSum === 0) return 0;

    const normalizationFactor = Math.pow(absoluteEffectSum, 0.5);
    return (weightedSum / normalizationFactor) / 15;
}

/**
 * Selects protocols based on physiological optimization (Vector Matching).
 * 
 * SCORING MODEL:
 * FinalScore = (CorrectionScore * 0.35) + (PredictionBoost * 0.4) + (PatternBoost * 0.15) + (RulePriority * 0.1)
 */
export function selectProtocols(
    state: VedaState,
    userWeights: ProtocolWeights = {},
    healthGoal: string = "general_wellness",
    userPatterns: PhysiologyPattern[] = []
): Protocol[] {
    const protocolScores = new Map<string, number>();
    const protocolRulePriorities = new Map<string, number>();

    const history = predictionEngine.loadStateHistory();
    const predictionBoostMap = predictionEngine.getPredictionBoostMap(history);

    // Build pattern boost map from detected behavioral patterns
    const patternBoostMap: Record<string, number> = {};
    for (const pattern of userPatterns) {
        const boostProtocols = PATTERN_PROTOCOL_MAP[pattern.pattern_type] || [];
        for (const pName of boostProtocols) {
            patternBoostMap[pName] = (patternBoostMap[pName] || 0) + pattern.confidence * 3;
        }
    }

    // 1. Calculate Physiological Correction for ALL protocols
    const allProtocols = protocolsRaw as unknown as Protocol[];
    for (const proto of allProtocols) {
        // --- SAFETY FILTER ---
        if (!isProtocolSafe(proto, state)) continue;

        const correctionScore = calculateCorrectionScore(proto, state, userWeights[proto.name] || {});

        // 2. Prediction Boost (Σ trendStrength)
        const predictionBoost = predictionBoostMap[proto.name] || 0;

        // 3. Pattern Memory Boost (from detected behavioral patterns)
        const patternBoost = patternBoostMap[proto.name] || 0;

        // 4. Initial Base Score
        // Weighting: Correction * 0.35 + Prediction * 0.4 + Pattern * 0.15
        const baseScore = (correctionScore * 0.35) + (predictionBoost * 0.4) + (patternBoost * 0.15);
        protocolScores.set(proto.name, baseScore);
    }

    // 4. Rule-Based Safety Filter & Priority Boost
    // Rules now act as guardrails (blacklists/whitelists) and secondary advisors.
    const ruleTriggeredProtocols = new Set<string>();
    for (const rule of rules) {
        if (evaluateRule(rule, state)) {
            for (const pName of rule.protocols) {
                ruleTriggeredProtocols.add(pName);
                const currentPriority = protocolRulePriorities.get(pName) || 0;
                if (rule.priority > currentPriority) {
                    protocolRulePriorities.set(pName, rule.priority);
                }
            }
        }
    }

    // 5. Finalize Scores with Rule Priority
    for (const [pName, baseScore] of protocolScores.entries()) {
        const rulePriority = protocolRulePriorities.get(pName) || 0;
        const finalScore = baseScore + (rulePriority * 0.1);
        protocolScores.set(pName, finalScore);
    }

    // 6. Candidate Ranking & Filtering
    const candidates = Array.from(protocolScores.entries())
        .map(([name, score]) => {
            const proto = protocolMap.get(name);
            return proto ? { ...proto, score } : null;
        })
        .filter((p): p is (Protocol & { score: number }) => p !== null && p.score > 0)
        .sort((a, b) => b.score - a.score);

    // 7. Apply Conflict Resolution and MAX_PROTOCOLS limit
    const finalProtocols: Protocol[] = [];
    const selectedNames = new Set<string>();

    for (const p of candidates) {
        if (finalProtocols.length >= MAX_PROTOCOLS) break;

        const conflicts = protocol_conflicts[p.name] || [];
        const hasConflict = conflicts.some(c => selectedNames.has(c)) ||
            Array.from(selectedNames).some(s => (protocol_conflicts[s] || []).includes(p.name));

        if (!hasConflict) {
            finalProtocols.push(p);
            selectedNames.add(p.name);
        }
    }

    // Ensure baseline protocols if list is empty (Extreme safety)
    if (finalProtocols.length === 0) {
        const baselines = ["warm_water_morning", "midday_main_meal", "evening_wind_down"];
        for (const bName of baselines) {
            const proto = protocolMap.get(bName);
            if (proto) finalProtocols.push(proto);
        }
    }

    return finalProtocols;
}

/**
 * Filters the selected protocols into time-of-day slots with specific limits.
 */
export function filterProtocols(selectedProtocols: Protocol[]) {
    const morning = selectedProtocols
        .filter(p => p.time_of_day === "morning")
        .slice(0, 5);

    const midday = selectedProtocols
        .filter(p => p.time_of_day === "midday" || p.time_of_day === "meal_time")
        .slice(0, 4);

    const evening = selectedProtocols
        .filter(p => p.time_of_day === "evening" || p.time_of_day === "night")
        .slice(0, 5);

    return {
        morning,
        midday,
        evening
    };
}
