import { VedaState } from './stateModel';
import { ENGINE_CONFIG } from './config';

const { clamp } = ENGINE_CONFIG.ranges;

export interface VikritiMetrics {
    vata_diff: number;
    pitta_diff: number;
    kapha_diff: number;
    drift_index: number;
    dominant_dosha: string;
    stability_score: number; // Biological resistance to drift based on Prakriti balance
    directions: Record<string, 'high' | 'low' | 'normal'>;
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
    const pV = state.prakriti_vata ?? 50;
    const pP = state.prakriti_pitta ?? 50;
    const pK = state.prakriti_kapha ?? 50;

    const vata_diff = state.vata - pV;
    const pitta_diff = state.pitta - pP;
    const kapha_diff = state.kapha - pK;

    // 2. Weighted Drift Index (Current - Neutral 50)
    // Vata propagation is physiologically faster/more sensitive (1.2 weighting).
    const drift = (
        Math.abs(state.vata - 50) * 1.2 +
        Math.abs(state.pitta - 50) * 1.0 +
        Math.abs(state.kapha - 50) * 0.9
    ) / 3;
    const drift_index = clamp(drift);

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

    // 4. Directional Imbalance
    const getDirection = (diff: number) => {
        if (Math.abs(diff) < 5) return 'normal';
        return diff > 0 ? 'high' : 'low';
    };

    const directions: Record<string, 'high' | 'low' | 'normal'> = {
        vata: getDirection(vata_diff),
        pitta: getDirection(pitta_diff),
        kapha: getDirection(kapha_diff)
    };

    // 5. Stability Score (Biological resistance to drift)
    // Based on the user's "Dominance Bias" concept: more balanced Prakriti = higher stability.
    const sortedP = [pV, pP, pK].sort((a, b) => b - a);
    const dominance_index = sortedP[0] - sortedP[1];
    
    // Invert dominance: 100 is perfectly balanced (Tridoshic), 
    // 10 is extreme dominance (lower clamp for more realistic modeling)
    const stability_score = Math.round(clamp(100 - (dominance_index * 1.2)));

    return {
        vata_diff,
        pitta_diff,
        kapha_diff,
        drift_index,
        dominant_dosha,
        stability_score,
        directions
    };
}
