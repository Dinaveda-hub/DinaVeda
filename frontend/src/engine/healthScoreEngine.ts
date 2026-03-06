import { VedaState } from './stateModel';

export class HealthScoreEngine {
    /**
     * Calculates the Daily Health Score (branded as "Ojas Balance")
     * A weighted composite of the four major physiological systems.
     * 
     * Ojas (Vitality Reserve) -> 35%
     * Agni (Metabolic Function) -> 25%
     * Circadian Alignment (Biological Rhythm) -> 20%
     * Dosha Stability (100 - Imbalance Pressure) -> 20%
     * 
     * @param state The current VedaState
     * @param driftIndex The calculated Dosha Drift Index (0-100)
     * @returns The final 0-100 integer score
     */
    public calculateOjasBalance(state: VedaState, driftIndex: number): number {
        const ojas = state.ojas_score;
        const agni = state.agni_strength;
        const circadian = state.circadian_alignment;
        const doshaStability = 100 - driftIndex;

        const score =
            (ojas * 0.35) +
            (agni * 0.25) +
            (circadian * 0.20) +
            (doshaStability * 0.20);

        return Math.round(score);
    }
}
