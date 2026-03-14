import { RAW_PROTOCOLS as protocolsRaw } from "@/data";
import rulesRaw from "../data/rules/recommendation_rules.json";
import { VedaState, getBaseline } from "./stateModel";
import { VikritiMetrics, computeVikriti } from "./vikritiEngine";
import { PredictionEngine } from "./predictionEngine";
import { ProtocolWeights } from "@/utils/userWeightsService";
import { PhysiologyPattern, PATTERN_PROTOCOL_MAP } from "@/services/patternService";
import { applyGoalBoost } from "./goalEngine";
import { ENGINE_CONFIG } from "./config";

const { thresholds } = ENGINE_CONFIG;

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
    score?: number;
}

export interface ProtocolRule {
    variable: keyof VedaState;
    operator: ">" | "<" | ">=" | "<=" | "==" | "!=";
    threshold: number | boolean;
    protocols: string[];
    module: string;
    priority: number;
}

const MAX_PROTOCOLS = 15;
const protocol_conflicts: Record<string, string[]> = {
    "light_dinner": ["heavy_nourishing_meal"],
    "fasting": ["strength_building_meal"]
};

const protocol_synergies: Record<string, string[]> = {
    "abhyanga": ["warm_bath", "evening_wind_down"],
    "warm_bath": ["abhyanga", "evening_wind_down"],
    "meditation": ["pranayama", "evening_wind_down"],
    "pranayama": ["meditation", "evening_wind_down"],
    "ginger_before_meal": ["light_dinner"],
    "brisk_walking": ["sunlight_exposure"]
};

const protocolMap = new Map((protocolsRaw as any[]).map(p => [p.name, p]));
const rules = rulesRaw as ProtocolRule[];
const predictionEngine = new PredictionEngine();

/**
 * Safely evaluates a structured physiological rule without any dynamic execution.
 */
function evaluateRule(rule: ProtocolRule, state: VedaState, vikriti?: VikritiMetrics): boolean {
    const currentValue = state[rule.variable] ?? (vikriti as any)?.[rule.variable];
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
    const { MILD, MODERATE, SEVERE } = thresholds.drift;
    
    // 1. Pitta Guard (Heat avoidance)
    if (state.pitta >= SEVERE.max || state.inflammation >= SEVERE.max) {
        const heatingCategories = ['kapha_activator', 'movement_activation', 'agni_support', 'agni_alignment', 'kapha_activation', 'circadian_activation'];
        if (heatingCategories.includes(protocol.category)) return false;
        if (protocol.name.includes('vigorous') || protocol.name.includes('spices') || protocol.name.includes('dynamic') || protocol.name.includes('brisk')) return false;
    }

    // 2. Vata/Stress Guard (Over-stimulation avoidance)
    if (state.vata >= 65 || state.stress >= SEVERE.max) {
        const stimulatingCategories = ['kapha_activator', 'movement_activation', 'kapha_activation', 'circadian_activation', 'mental_activation', 'energy_activation'];
        if (stimulatingCategories.includes(protocol.category)) return false;

        // Vata is cold & light; block all cooling/lightening interventions
        const isCooling = (protocol.name.includes('cooling') || protocol.name.includes('cold') ||
            protocol.name.includes('moonlight') || protocol.name.includes('coriander') ||
            protocol.name.includes('greens') || (protocol.name.includes('bath') && !protocol.name.includes('warm'))) ||
            protocol.category.includes('pitta');

        const isLightening = protocol.variables.kapha && protocol.variables.kapha < 0;

        if (isCooling || isLightening) return false;
        if (protocol.name.includes('vigorous') || protocol.name.includes('brisk') || protocol.name.includes('dynamic')) return false;
    }

    // 4. Structured Contraindication Checks
    const contra = protocol.contraindications;
    if (contra.includes('fever') && state.inflammation > MILD.max) return false;
    if (contra.includes('gastric_sensitivity') && state.pitta > SEVERE.max) return false;
    if (contra.includes('injury') && (state.stiffness > thresholds.protocol.BASE || state.inflammation > thresholds.protocol.BASE)) return false;
    if (contra.includes('hypertension') && state.stress > 80) return false;
    if (contra.includes('sinus_infection') && state.kapha > SEVERE.max) return false;

    // 5. Sleep Deprivation Guard
    if (state.sleep < MODERATE.max) {
        const recoveryBlocked = [
            'kapha_activator', 'movement_activation', 'kapha_activation',
            'circadian_activation', 'mental_activation', 'energy_activation',
            'circadian_stabilizer', 'metabolic_regulation', 'kapha_balance'
        ];
        if (recoveryBlocked.includes(protocol.category)) return false;

        const isLightening = protocol.variables.kapha && protocol.variables.kapha < 0;
        const isCooling = (protocol.name.includes('cooling') || protocol.name.includes('cold') ||
            protocol.name.includes('moonlight') || protocol.name.includes('coriander') ||
            protocol.name.includes('greens') || (protocol.name.includes('bath') && !protocol.name.includes('warm'))) ||
            protocol.category.includes('pitta');
  
        if (isLightening || isCooling) return false;
        if (protocol.name.includes('light_dinner') || protocol.name.includes('ginger') || protocol.name.includes('sugar')) return false;
        if (protocol.name.includes('vigorous') || protocol.name.includes('brisk') || protocol.name.includes('dynamic') || protocol.name.includes('early_wake') || protocol.name.includes('fasting')) return false;
    }

    // 5. Ojas Depletion Guard (Restoration focus)
    if (state.ojas < thresholds.criticalOjas) {
        const recoveryBlocked = ['kapha_activator', 'movement_activation', 'kapha_activation', 'circadian_activation', 'mental_activation', 'energy_activation', 'circadian_stabilizer', 'metabolic_regulation'];
        if (recoveryBlocked.includes(protocol.category)) return false;
        if (protocol.name.includes('vigorous') || protocol.name.includes('brisk') || protocol.name.includes('dynamic') || protocol.name.includes('fasting')) return false;
    }

    // 6. Weak Agni Guard
    if (state.agni < thresholds.criticalOjas) {
        const agniBlocked = ['kapha_activator', 'kapha_activation', 'movement_activation'];
        if (agniBlocked.includes(protocol.category)) return false;
        if (protocol.name.includes('vigorous') || protocol.name.includes('brisk')) return false;
    }

    // 6. Per-Variable Escalation Guard
    for (const [stateKey, effect] of Object.entries(protocol.variables)) {
        const value = state[stateKey as keyof VedaState];
        if (typeof value !== 'number') continue;

        const baseline = getBaseline(stateKey, state);
        const deviation = value - baseline;

        if (value > 85 && ((deviation > 0 && effect > 0) || (deviation < 0 && effect < 0))) {
            return false;
        }
    }

    return true;
}

/**
 * Calculates how well a protocol corrects the current physiological deviations.
 */
function calculateCorrectionScore(protocol: Protocol, state: VedaState, userWeights: Record<string, number> = {}): number {
    let weightedSum = 0;
    let absoluteEffectSum = 0;

    for (const [stateKey, baseEffect] of Object.entries(protocol.variables)) {
        const value = state[stateKey as keyof VedaState];
        if (typeof value !== 'number') continue;

        const baseline = getBaseline(stateKey, state);
        const deviation = value - baseline;

        const multiplier = userWeights[stateKey] ?? 1.0;
        const effect = baseEffect * multiplier;

        const weight = 1 + Math.pow(Math.abs(deviation) / 30, 1.5);
        const weightedDeviation = deviation * weight;

        const priorityMultiplier = (stateKey === 'vata' || stateKey === 'stress' || stateKey === 'sleep') ? 1.2 : 1.0;

        weightedSum += -weightedDeviation * effect * priorityMultiplier;
        absoluteEffectSum += Math.abs(effect);
    }

    if (absoluteEffectSum === 0) return 0;

    const baseScore = (weightedSum / Math.pow(absoluteEffectSum, 0.5)) / 15;
    const adaptiveBoost = userWeights['_protocol_boost'] ?? 1.0;
    
    return baseScore * adaptiveBoost;
}

/**
 * Selects protocols based on physiological optimization.
 */
export function selectProtocols(
    state: VedaState,
    userWeights: ProtocolWeights = {},
    healthGoal: string = "general_wellness",
    userPatterns: PhysiologyPattern[] = []
): Protocol[] {
    const protocolScores = new Map<string, number>();
    const protocolRulePriorities = new Map<string, number>();

    const vikriti = computeVikriti(state);
    const history = predictionEngine.loadStateHistory();
    const predictionBoostMap = predictionEngine.getPredictionBoostMap(history);

    // Dynamic Triggering Threshold: Lower the threshold if vitality (Ojas) is low
    const protocolThreshold = state.ojas < thresholds.criticalOjas 
        ? thresholds.protocol.LOW_OJAS 
        : thresholds.protocol.BASE;

    // Load completed logs
    const completedItemsString = typeof window !== 'undefined' ? localStorage.getItem("veda_checked_items") : null;
    const completedItems = completedItemsString ? JSON.parse(completedItemsString) as string[] : [];

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
        if (evaluateRule(rule, state, vikriti)) {
            for (const pName of rule.protocols) {
                ruleTriggeredProtocols.add(pName);
                const currentPriority = protocolRulePriorities.get(pName) || 0;
                if (rule.priority > currentPriority) {
                    protocolRulePriorities.set(pName, rule.priority);
                }
            }
        }
    }

    // 5. Finalize Scores with Rule Priority and Repetition Decay
    for (const [pName, baseScore] of protocolScores.entries()) {
        const rulePriority = protocolRulePriorities.get(pName) || 0;
        let finalScore = baseScore + (rulePriority * 0.1);

        // Repetition Decay (15% penalty if already completed today)
        if (completedItems.includes(pName)) {
            finalScore *= 0.85;
        }

        protocolScores.set(pName, finalScore);
    }

    // 6. Apply Protocol Synergy Boost
    // If two protocols have synergy and both are strong candidates, boost both.
    const candidateNames = Array.from(protocolScores.keys());
    for (const pName of candidateNames) {
        const baseScore = protocolScores.get(pName) || 0;
        if (baseScore <= 0) continue;

        const synergies = protocol_synergies[pName] || [];
        for (const sName of synergies) {
            const synergyScore = protocolScores.get(sName) || 0;
            // If the synergistic partner is also a valid candidate (>0)
            if (synergyScore > 0) {
                // Apply a 10% synergy boost
                protocolScores.set(pName, (protocolScores.get(pName) || 0) + (baseScore * 0.1));
            }
        }
    }

    // 7. Candidate Ranking & Filtering
    let candidates = Array.from(protocolScores.entries())
        .map(([name, score]) => {
            const proto = protocolMap.get(name);
            return proto ? { ...proto, score } : null;
        })
        .filter((p): p is (Protocol & { score: number }) => p !== null && p.score > protocolThreshold);

    // 8. Apply User Health Goal Preference Layer
    candidates = applyGoalBoost(candidates, healthGoal);

    // 9. Final Sorting
    candidates.sort((a, b) => b.score - a.score);

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

    // Ensure baseline protocols if list is sparse (Improved Density Fallback)
    if (finalProtocols.length < 5) {
        const currentNames = new Set(finalProtocols.map(p => p.name));
        const baselines = [
            "warm_water_morning", 
            "midday_main_meal", 
            "evening_wind_down",
            "tongue_scraping",
            "gentle_walking_after_meal",
            "nose_oil_nasya"
        ];
        
        for (const bName of baselines) {
            if (finalProtocols.length >= 8) break; // Don't overfill with fallbacks
            if (!currentNames.has(bName)) {
                const proto = protocolMap.get(bName);
                if (proto && isProtocolSafe(proto, state)) {
                    finalProtocols.push(proto);
                    currentNames.add(bName);
                }
            }
        }
    }

    return finalProtocols;
}

/**
 * Filters the selected protocols into time-of-day slots with specific limits.
 * Optimized to a single pass for performance.
 */
export function filterProtocols(selectedProtocols: Protocol[]) {
    const morning: Protocol[] = [];
    const midday: Protocol[] = [];
    const evening: Protocol[] = [];

    for (let i = 0; i < selectedProtocols.length; i++) {
        const p = selectedProtocols[i];
        const tod = p.time_of_day;

        if (tod === "morning") {
            if (morning.length < 5) morning.push(p);
        } else if (tod === "midday" || tod === "meal_time") {
            if (midday.length < 4) midday.push(p);
        } else if (tod === "evening" || tod === "night") {
            if (evening.length < 5) evening.push(p);
        }

        // Early exit if all slots are filled
        if (morning.length >= 5 && midday.length >= 4 && evening.length >= 5) {
            break;
        }
    }

    return {
        morning,
        midday,
        evening
    };
}
