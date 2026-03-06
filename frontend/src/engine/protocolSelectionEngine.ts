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
import { VedaState } from "./stateModel";

export interface Protocol {
    name: string;
    module: string;
    category: string;
    time_of_day: string;
    duration: string;
    variables: Record<string, number>;
    instructions: string;
    contraindications: string;
}

const protocols = protocolsRaw as any[];
const rules = rulesRaw as any[];

/**
 * Parses and evaluates simple string conditions like "vata_state > 60"
 */
function evaluateRule(condition: string, state: VedaState): boolean {
    const parts = condition.split(" ");
    if (parts.length !== 3) return false;

    const variable = parts[0];
    const operator = parts[1];
    const value = Number(parts[2]);

    const stateValue = (state as any)[variable];
    if (typeof stateValue !== 'number') return false;

    if (operator === ">") return stateValue > value;
    if (operator === "<") return stateValue < value;
    if (operator === ">=") return stateValue >= value;
    if (operator === "<=") return stateValue <= value;

    return false;
}

/**
 * Selects protocols based on the current state across three priority layers.
 */
export function selectProtocols(state: VedaState): Protocol[] {
    const selectedNames = new Set<string>();
    const selectedProtocols: Protocol[] = [];

    // Define priority layers to ensure logic order
    const layers = [
        { name: 'imbalance', keywords: ['vata', 'pitta', 'kapha'] },
        { name: 'agni', keywords: ['agni', 'ama', 'bloating', 'digestion'] },
        { name: 'circadian', keywords: ['circadian', 'sleep', 'stress'] }
    ];

    // Process rules by layer
    for (const layer of layers) {
        const layerRules = rules.filter(rule =>
            layer.keywords.some(k => rule.condition.includes(k))
        );

        for (const rule of layerRules) {
            if (evaluateRule(rule.condition, state)) {
                for (const pName of rule.protocols) {
                    if (!selectedNames.has(pName)) {
                        const protocol = protocols.find(x => x.name === pName);
                        if (protocol) {
                            selectedProtocols.push(protocol);
                            selectedNames.add(pName);
                        }
                    }
                }
            }
        }
    }

    // Baseline protocols if list is too short
    if (selectedProtocols.length < 3) {
        const baselines = ["morning_hydration", "midday_main_meal", "evening_wind_down"];
        for (const b of baselines) {
            if (!selectedNames.has(b)) {
                const proto = protocols.find(p => p.name === b);
                if (proto) selectedProtocols.push(proto);
            }
        }
    }

    return selectedProtocols;
}

/**
 * Filters the selected protocols into time-of-day slots with specific limits.
 * Morning: 3, Midday: 2, Evening: 3.
 */
export function filterProtocols(selectedProtocols: Protocol[]) {
    const morning = selectedProtocols
        .filter(p => p.time_of_day === "morning")
        .slice(0, 3);

    const midday = selectedProtocols
        .filter(p => p.time_of_day === "midday" || p.time_of_day === "meal_time")
        .slice(0, 2);

    const evening = selectedProtocols
        .filter(p => p.time_of_day === "evening" || p.time_of_day === "night")
        .slice(0, 3);

    return {
        morning,
        midday,
        evening
    };
}
