import { VedaState } from './stateModel';
import { clamp } from '../utils/clamp';

export interface VikritiMetrics {
    vata_diff: number;
    pitta_diff: number;
    kapha_diff: number;
    drift_index: number;
    dominant_dosha: string;
}

export class VikritiEngine {
    public calculateMetrics(state: VedaState): VikritiMetrics {
        return computeVikriti(state);
    }
}

/**
 * Functional version of Vikriti calculation for engine pipelining.
 * Dual-Baseline Model:
 * 1. Vikriti (Diffs) = Measured against individual Prakriti.
 * 2. Drift (Stability) = Measured against neutral 50.
 */
export function computeVikriti(state: VedaState): VikritiMetrics {
    // 1. Vikriti Calculation (Current - Individual Prakriti)
    const vata_diff = state.vata - (state.prakriti_vata || 50);
    const pitta_diff = state.pitta - (state.prakriti_pitta || 50);
    const kapha_diff = state.kapha - (state.prakriti_kapha || 50);

    // 2. Drift Index (Current - Neutral 50)
    // Tracks absolute system instability regardless of constitution.
    const drift = (
        Math.abs(state.vata - 50) +
        Math.abs(state.pitta - 50) +
        Math.abs(state.kapha - 50)
    ) / 3;
    const drift_index = clamp(drift, 0, 100);

    // 3. Dominant Dosha (Largest absolute deviation from Prakriti)
    const absVata = Math.abs(vata_diff);
    const absPitta = Math.abs(pitta_diff);
    const absKapha = Math.abs(kapha_diff);
    const maxDev = Math.max(absVata, absPitta, absKapha);

    let dominant_dosha = 'Balanced';

    if (maxDev < 5) {
        dominant_dosha = 'Balanced';
    } else {
        const dominants: string[] = [];
        if (absVata === maxDev) dominants.push('Vata');
        if (absPitta === maxDev) dominants.push('Pitta');
        if (absKapha === maxDev) dominants.push('Kapha');
        dominant_dosha = dominants.join('-');
    }

    return {
        vata_diff,
        pitta_diff,
        kapha_diff,
        drift_index,
        dominant_dosha
    };
}
