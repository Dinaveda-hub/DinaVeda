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
    public calculateMetrics(state: VedaState): VikritiMetrics {
        return computeVikriti(state);
    }
}

/**
 * Functional version of Vikriti calculation for engine pipelining.
 */
export function computeVikriti(state: VedaState): VikritiMetrics {
    const vata_diff = state.vata_state - state.prakriti_vata;
    const pitta_diff = state.pitta_state - state.prakriti_pitta;
    const kapha_diff = state.kapha_state - state.prakriti_kapha;

    const drift = (Math.abs(vata_diff) + Math.abs(pitta_diff) + Math.abs(kapha_diff)) / 3;
    const drift_index = Math.min(100, drift * 2);

    let dominant_dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic' = 'Tridoshic';
    const absVata = Math.abs(vata_diff);
    const absPitta = Math.abs(pitta_diff);
    const absKapha = Math.abs(kapha_diff);
    const maxDev = Math.max(absVata, absPitta, absKapha);

    if (maxDev < 5) {
        dominant_dosha = 'Tridoshic';
    } else if (maxDev === absVata) {
        dominant_dosha = 'Vata';
    } else if (maxDev === absPitta) {
        dominant_dosha = 'Pitta';
    } else if (maxDev === absKapha) {
        dominant_dosha = 'Kapha';
    }

    return {
        vikriti_vata: vata_diff,
        vikriti_pitta: pitta_diff,
        vikriti_kapha: kapha_diff,
        drift,
        drift_index,
        dominant_dosha
    };
}
