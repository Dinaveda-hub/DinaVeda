import { VedaState } from './stateModel';
import { OJAS_WEIGHTS } from '../config/scoringWeights';

export class HealthScoreEngine {
    /**
     * Calculates the Daily Health Score (Branded as "Ojas Balance")
     * A weighted composite of the physiological sub-systems.
     */
    public calculateOjasBalance(state: VedaState, driftIndex: number): number {
        const ojas = state.ojas_score;
        const agni = state.agni_strength;
        const circadian = state.circadian_alignment;
        const doshaStability = 100 - driftIndex;

        const score =
            (ojas * OJAS_WEIGHTS.DIGESTION) + // Using DIGESTION weight for OJAS in this context
            (agni * 0.25) +
            (circadian * 0.20) +
            (doshaStability * 0.20);

        return Math.round(score);
    }
}
