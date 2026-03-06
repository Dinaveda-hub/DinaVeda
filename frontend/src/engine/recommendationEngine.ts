import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';
import protocolsData from '../data/protocols.json';

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

export class RecommendationEngine {
    private allProtocols: Protocol[];

    constructor() {
        this.allProtocols = protocolsData as Protocol[];
    }

    /**
     * Selects protocols deterministically based on physiological state bounding rules.
     */
    public getRecommendations(state: VedaState, vikriti: VikritiMetrics): Protocol[] {
        const recommendedNames = new Set<string>();

        const addCategory = (categoryName: string) => {
            this.allProtocols
                .filter(p => p.category === categoryName)
                .forEach(p => recommendedNames.add(p.name));
        };

        // Rule 1: High Vata or Sleep Debt
        if (vikriti.vikriti_vata > 10 || state.vata_state > 55 || state.sleep_debt > 20) {
            addCategory("vata_stabilizer");
            addCategory("vata_relief");
            addCategory("sleep_support");
            addCategory("circadian_support");
            addCategory("sleep_preparation");
            addCategory("relaxation");
        }

        // Rule 2: Low Agni (Digestive Fire) or High Ama
        if (state.agni_strength < 50 || state.ama_risk > 30) {
            addCategory("agni_support");
            addCategory("agni_regulator");
            addCategory("digestive_activation");
            addCategory("digestion_support");
            addCategory("agni_protection");
        }

        // Rule 3: High Kapha / Lethargy
        if (vikriti.vikriti_kapha > 10 || state.kapha_state > 55 || state.movement_level < 40) {
            addCategory("kapha_activator");
            addCategory("kapha_activation");
            addCategory("kapha_balance");
            addCategory("movement_activation");
        }

        // Rule 4: High Pitta / Stress / Screen Overload
        if (vikriti.vikriti_pitta > 15 || state.stress_load > 60 || state.screen_exposure > 50) {
            addCategory("pitta_balance");
            addCategory("pitta_balancer");
            addCategory("mental_regulation");
            addCategory("mental_balance");
            addCategory("stress_regulation");
            addCategory("stress_relief");
        }

        // Rule 5: Low Circadian Alignment / Routine Building
        if (state.circadian_alignment < 60) {
            addCategory("circadian_stabilizer");
            addCategory("circadian_support");
            addCategory("circadian_activation");
        }

        // Rule 6: Low Ojas (Vitality)
        if (state.ojas_score < 50 || state.ojas_recovery < 40) {
            addCategory("restorative_practice");
            addCategory("energy_balance");
            addCategory("behavioral_balance");
        }

        // Ensure we always have a baseline routine
        if (recommendedNames.size < 5) {
            addCategory("circadian_stabilizer");
            addCategory("digestion_support");
            addCategory("mental_balance");
            addCategory("hydration_support");
        }

        // Map Set of names back to full Protocol objects
        let results = this.allProtocols.filter(p => recommendedNames.has(p.name));

        // Filter maximums per time_of_day deterministically to prevent UI overflow
        const timeGroups: Record<string, Protocol[]> = { morning: [], midday: [], afternoon: [], evening: [], night: [], daily: [], meal_time: [], before_meal: [], after_meal: [], any: [] };

        results.forEach(p => {
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
