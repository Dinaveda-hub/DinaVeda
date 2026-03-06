import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';
import protocolsData from '../data/protocols.json';
import rulesData from '../data/recommendation_rules.json';

export interface Protocol {
    name: string;
    category: string;
    module: string;
    variables: Partial<Record<string, number>>;
    time_of_day: string;
    duration: string;
    instructions: string;
    contraindications: string;
}

export interface RecommendationRule {
    condition: string;
    protocols: string[];
    priority: number;
    module: string;
}

export class RecommendationEngine {
    private allProtocols: Protocol[];
    private allRules: RecommendationRule[];

    constructor() {
        this.allProtocols = protocolsData as Protocol[];
        this.allRules = rulesData as RecommendationRule[];
    }

    /**
     * Safely evaluates a threshold condition string against the current physiology state.
     */
    private evaluateCondition(conditionStr: string, state: VedaState, vikriti: VikritiMetrics): boolean {
        // e.g. "vata_state > 60"
        const parts = conditionStr.split(' ');
        if (parts.length !== 3) return false;

        const variable = parts[0];
        const operator = parts[1];
        const threshold = parseFloat(parts[2]);

        // Support looking up values in either state or vikriti.
        let actualValue = 0;
        if (variable in state) {
            actualValue = (state as any)[variable];
        } else if (variable in vikriti) {
            actualValue = (vikriti as any)[variable];
        } else {
            return false;
        }

        switch (operator) {
            case '>': return actualValue > threshold;
            case '<': return actualValue < threshold;
            case '>=': return actualValue >= threshold;
            case '<=': return actualValue <= threshold;
            case '===':
            case '==': return actualValue === threshold;
            default: return false;
        }
    }

    /**
     * Selects protocols deterministically by evaluating configurable rule datasets.
     */
    public getRecommendations(state: VedaState, vikriti: VikritiMetrics): Protocol[] {
        // Track unique protocol names and trace their highest priority (lower number = higher priority).
        const protocolPriorities = new Map<string, number>();

        // 1. Evaluate all rules
        for (const rule of this.allRules) {
            if (this.evaluateCondition(rule.condition, state, vikriti)) {
                for (const protoName of rule.protocols) {
                    const currentPriority = protocolPriorities.get(protoName) ?? Infinity;
                    if (rule.priority < currentPriority) {
                        protocolPriorities.set(protoName, rule.priority);
                    }
                }
            }
        }

        // 2. Sort selected protocol names by priority
        const sortedProtocolNames = Array.from(protocolPriorities.entries())
            .sort((a, b) => a[1] - b[1]) // Sort ascending by priority numeric
            .map(entry => entry[0]);

        // 3. Map to full definitions, ignoring ones not found in the DB and removing nulls
        const validProtocols = sortedProtocolNames
            .map(name => this.allProtocols.find(p => p.name === name))
            .filter((p): p is Protocol => p !== undefined);
        // Always provide a safe baseline if no dynamic rules were triggered
        if (validProtocols.length < 3) {
            const baselines = ["morning_hydration", "midday_main_meal", "evening_wind_down"];
            for (const b of baselines) {
                const proto = this.allProtocols.find(p => p.name === b);
                if (proto && !validProtocols.some(vp => vp.name === b)) {
                    validProtocols.push(proto);
                }
            }
        }

        // Filter maximums per time_of_day deterministically to prevent UI overflow
        const timeGroups: Record<string, Protocol[]> = { morning: [], midday: [], afternoon: [], evening: [], night: [], daily: [], meal_time: [], before_meal: [], after_meal: [], any: [] };

        validProtocols.forEach(p => {
            if (timeGroups[p.time_of_day]) {
                if (timeGroups[p.time_of_day].length < 2) { // 2 items per distinct time bucket max
                    timeGroups[p.time_of_day].push(p);
                }
            } else {
                timeGroups['any'].push(p);
            }
        });

        return Object.values(timeGroups).flat();
    }

    /**
     * Filters protocols down to a specific module for the UI views.
     */
    public getModuleProtocols(moduleName: string, activeProtocols: Protocol[]): Protocol[] {
        return activeProtocols.filter(p => p.module.toLowerCase() === moduleName.toLowerCase());
    }
}
