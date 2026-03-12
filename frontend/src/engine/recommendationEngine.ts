import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';
import protocolsData from '../data/protocols.json';
import rulesData from '../data/rules/recommendation_rules.json';
import { applyGoalBoost } from './goalEngine';
import { Protocol } from './protocolSelectionEngine';
import { PredictionEngine } from './predictionEngine';
import { clamp } from '../utils/clamp';

export interface RecommendationRule {
    variable: keyof VedaState;
    operator: ">" | "<" | ">=" | "<=" | "==" | "!=";
    threshold: number | boolean;
    protocols: string[];
    module: string;
    priority: number;
}

export interface ScoredProtocol extends Protocol {
    score: number;
}

export class RecommendationEngine {
    private protocolMap: Map<string, Protocol>;
    private allRules: RecommendationRule[];
    private predictionEngine: PredictionEngine;

    constructor() {
        this.protocolMap = new Map((protocolsData as any[]).map(p => [p.name, p]));
        this.allRules = rulesData as RecommendationRule[];
        this.predictionEngine = new PredictionEngine();
    }

    private evaluateRule(rule: RecommendationRule, state: VedaState, vikriti: VikritiMetrics): boolean {
        const currentValue = state[rule.variable as keyof VedaState] ?? (vikriti as any)[rule.variable];
        const threshold = rule.threshold;

        if (currentValue === undefined) return false;

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
     * Calculates the Drift Severity (S_drift) for a protocol.
     * Σ ( |state[var] - baseline| × |protocol_effect[var]| )
     */
    private calculateDriftScore(protocol: Protocol, state: VedaState): number {
        let totalDrift = 0;
        let totalEffectMagnitude = 0;

        for (const [varName, effect] of Object.entries(protocol.variables)) {
            const magnitude = Math.abs(effect);
            totalEffectMagnitude += magnitude;

            if (varName in state) {
                const currentValue = (state as any)[varName];
                const baseline = (state as any)[`prakriti_${varName}`] ?? 50;
                const deviation = Math.abs(currentValue - baseline);

                // If the protocol effect moves the variable back towards baseline, it scores.
                const isBeneficial = (currentValue > baseline && effect < 0) || (currentValue < baseline && effect > 0);

                if (isBeneficial) {
                    totalDrift += deviation * magnitude;
                }
            }
        }

        if (totalEffectMagnitude === 0) return 0;

        const normalizedDrift = totalDrift / totalEffectMagnitude;
        return clamp(normalizedDrift / 50, 0, 1);
    }

    public getRecommendations(
        state: VedaState,
        vikriti: VikritiMetrics,
        healthGoal: string = "general_wellness"
    ): Protocol[] {
        const triggeredProtocols = new Set<string>();
        const predictions = this.predictionEngine.getPredictionProtocols(this.predictionEngine.loadStateHistory());

        // Load completed logs for repetition decay
        const completedLogs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("completed_logs") || "{}") : {};
        const today = new Date().toISOString().split('T')[0];

        // 1. Identify triggered protocols from rules
        for (const rule of this.allRules) {
            if (this.evaluateRule(rule, state, vikriti)) {
                for (const protoName of rule.protocols) {
                    triggeredProtocols.add(protoName);
                }
            }
        }

        // 2. Score and Rank
        const scored: ScoredProtocol[] = Array.from(triggeredProtocols)
            .map(name => this.protocolMap.get(name))
            .filter((p): p is Protocol => p !== undefined)
            .map(p => {
                const sDrift = this.calculateDriftScore(p, state);
                const sPrediction = predictions.includes(p.name) ? 1.0 : 0.0;

                let score = (sDrift * 0.6) + (sPrediction * 0.4);

                // Protocol Repetition Decay (0.85 if completed today)
                const completedToday = completedLogs[p.name] === today;

                if (completedToday) {
                    score *= 0.85;
                }

                return { ...p, score };
            });

        // 3. Sort by Score + Tie stability
        const ranked = scored.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.name.localeCompare(b.name);
        });

        return ranked;
    }

    public getModuleProtocols(moduleName: string, activeProtocols: Protocol[]): Protocol[] {
        return activeProtocols.filter(p => p.module.toLowerCase() === moduleName.toLowerCase());
    }
}
