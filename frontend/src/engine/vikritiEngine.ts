import { VedaState } from './stateModel';

export interface VikritiMetrics {
    vikriti_vata: number;
    vikriti_pitta: number;
    vikriti_kapha: number;
    drift: number;
    drift_index: number;
    dominant_dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic';
}

export class VikritiEngine {
    /**
     * Calculates the deviation from the baseline Prakriti and generates the overall Dosha Drift Index.
     */
    public calculateMetrics(state: VedaState): VikritiMetrics {
        // Calculate raw deviation from Prakriti
        const vikriti_vata = state.vata_state - state.prakriti_vata;
        const vikriti_pitta = state.pitta_state - state.prakriti_pitta;
        const vikriti_kapha = state.kapha_state - state.prakriti_kapha;

        // Calculate overall imbalance magnitude
        const drift = (Math.abs(vikriti_vata) + Math.abs(vikriti_pitta) + Math.abs(vikriti_kapha)) / 3;

        // Scale to a more readable 0-100% index range
        const drift_index = Math.min(100, drift * 2);

        // Determine dominant out-of-balance dosha based on absolute drift distance
        let dominant_dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic' = 'Tridoshic';

        const absVata = Math.abs(vikriti_vata);
        const absPitta = Math.abs(vikriti_pitta);
        const absKapha = Math.abs(vikriti_kapha);

        const maxDev = Math.max(absVata, absPitta, absKapha);

        if (maxDev < 5) {
            dominant_dosha = 'Tridoshic'; // Indicates relative balance
        } else if (maxDev === absVata) {
            dominant_dosha = 'Vata';
        } else if (maxDev === absPitta) {
            dominant_dosha = 'Pitta';
        } else if (maxDev === absKapha) {
            dominant_dosha = 'Kapha';
        }

        return {
            vikriti_vata,
            vikriti_pitta,
            vikriti_kapha,
            drift,
            drift_index,
            dominant_dosha
        };
    }
}
