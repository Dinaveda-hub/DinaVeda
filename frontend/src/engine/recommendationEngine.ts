import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';
import protocolsData from '../data/protocols.json';

export interface Protocol {
    id: string;
    name: string;
    category: string;
    module: string;
    dosha_effect: { vata: number; pitta: number; kapha: number };
    agni_effect: number;
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

        // Rule 1: High Vata
        if (vikriti.vikriti_vata > 10 || state.vata_state > 55) {
            recommendedIds.add("padabhyanga");
            // Also recommend digital sunset to calm the nervous system
            if (state.screen_exposure > 50) {
                recommendedIds.add("digital_sunset");
            }
        }

        // Rule 2: Low Agni (Digestive Fire) or High Ama
        if (state.agni_strength < 50 || state.ama_risk > 30) {
            recommendedIds.add("ginger_water");

            // If Ama is very high, push a stronger evening flush
            if (state.ama_risk > 50) {
                recommendedIds.add("triphala_flush");
            }
        }

        // Rule 3: High Kapha
        if (vikriti.vikriti_kapha > 10 || state.kapha_state > 55) {
            recommendedIds.add("kapalabhati");
        }

        // Rule 4: High Pitta / Stress
        if (vikriti.vikriti_pitta > 15 || state.stress_load > 60) {
            recommendedIds.add("shitali");
        }

        // Rule 5: Low Circadian Alignment
        if (state.circadian_alignment < 50) {
            recommendedIds.add("digital_sunset");
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
