import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';
import protocolsData from '../data/protocols.json';

export interface Protocol {
    id: string;
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
     * Selects protocols deterministically based on hardcoded threshold rules.
     */
    public getRecommendations(state: VedaState, vikriti: VikritiMetrics): Protocol[] {
        const recommendedIds = new Set<string>();

        // Rule 1: High Vata or Sleep Debt
        if (vikriti.vikriti_vata > 10 || state.vata_state > 55 || state.sleep_debt > 20) {
            recommendedIds.add("padabhyanga");
            recommendedIds.add("nadi_shodhana");
        }

        // Rule 2: Low Agni (Digestive Fire) or High Ama
        if (state.agni_strength < 50 || state.ama_risk > 30) {
            recommendedIds.add("ginger_water");
            recommendedIds.add("tongue_scraping");

            if (state.ama_risk > 50) {
                recommendedIds.add("triphala_flush");
                recommendedIds.add("kitchari_cleanse");
            }
        }

        // Rule 3: High Kapha / Lethargy
        if (vikriti.vikriti_kapha > 10 || state.kapha_state > 55 || state.movement_level < 30) {
            recommendedIds.add("kapalabhati");
        }

        // Rule 4: High Pitta / Stress / Overwork
        if (vikriti.vikriti_pitta > 15 || state.stress_load > 60 || state.screen_exposure > 70) {
            recommendedIds.add("shitali");
            recommendedIds.add("digital_sunset");
        }

        // Rule 5: Low Circadian Alignment / Routine Building
        if (state.circadian_alignment < 60) {
            recommendedIds.add("brahmamuhurta");
            recommendedIds.add("digital_sunset");
        }

        // Rule 6: Low Ojas (Vitality)
        if (state.ojas_score < 50 || state.ojas_recovery < 40) {
            recommendedIds.add("golden_milk");
            recommendedIds.add("oil_pulling");
        }

        // Ensure we always have a baseline morning and evening anchor if the system is balanced
        if (recommendedIds.size < 4) {
            recommendedIds.add("tongue_scraping");
            recommendedIds.add("brahmamuhurta");
            recommendedIds.add("digital_sunset");
            recommendedIds.add("nadi_shodhana");
        }

        // Map Set of IDs back to full Protocol objects
        return this.allProtocols.filter(p => recommendedIds.has(p.id));
    }

    /**
     * Filters protocols down to a specific module for the UI views.
     */
    public getModuleProtocols(moduleName: string, activeProtocols: Protocol[]): Protocol[] {
        return activeProtocols.filter(p => p.module.toLowerCase() === moduleName.toLowerCase());
    }
}
