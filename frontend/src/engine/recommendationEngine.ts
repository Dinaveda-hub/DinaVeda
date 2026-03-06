import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';
import protocolsData from '../data/protocols.json';
import rulesData from '../data/rules/recommendation_rules.json';
import { applyGoalBoost } from './goalEngine';


import { Protocol } from './protocolSelectionEngine';

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
        this.allProtocols = protocolsData as unknown as Protocol[];
        this.allRules = rulesData as RecommendationRule[];
    }

    private evaluateCondition(conditionStr: string, state: VedaState, vikriti: VikritiMetrics): boolean {
        const parts = conditionStr.split(' ');
        if (parts.length !== 3) return false;

        const variable = parts[0];
        const operator = parts[1];
        const threshold = parseFloat(parts[2]);

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

    public getRecommendations(state: VedaState, vikriti: VikritiMetrics, healthGoal: string = "general_wellness"): Protocol[] {
        const protocolPriorities = new Map<string, number>();

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

        const sortedProtocolNames = Array.from(protocolPriorities.entries())
            .sort((a, b) => a[1] - b[1])
            .map(entry => entry[0]);

        const validProtocols = sortedProtocolNames
            .map(name => this.allProtocols.find(p => p.name === name))
            .filter((p): p is Protocol => p !== undefined);

        if (validProtocols.length < 3) {
            const baselines = ["morning_hydration", "midday_main_meal", "evening_wind_down"];
            for (const b of baselines) {
                const proto = this.allProtocols.find(p => p.name === b);
                if (proto && !validProtocols.some(vp => vp.name === b)) {
                    validProtocols.push(proto);
                }
            }
        }

        const boostedProtocols = applyGoalBoost(validProtocols, healthGoal);

        const morning: Protocol[] = [];
        const midday: Protocol[] = [];
        const evening: Protocol[] = [];

        for (const p of boostedProtocols) {
            const tod = p.time_of_day.toLowerCase();

            if (tod === 'morning' || tod === 'before_meal') {
                if (morning.length < 3) morning.push(p);
            } else if (tod === 'midday' || tod === 'meal_time' || tod === 'afternoon' || tod === 'any' || tod === 'daily') {
                if (midday.length < 2) midday.push(p);
            } else if (tod === 'evening' || tod === 'night' || tod === 'after_meal') {
                if (evening.length < 3) evening.push(p);
            }
        }

        return [...morning, ...midday, ...evening];
    }

    public getModuleProtocols(moduleName: string, activeProtocols: Protocol[]): Protocol[] {
        return activeProtocols.filter(p => p.module.toLowerCase() === moduleName.toLowerCase());
    }
}
