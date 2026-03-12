import { VedaState } from './stateModel';
import { ENGINE_CONFIG } from './config';

const { clamp } = ENGINE_CONFIG.ranges;
const HW = ENGINE_CONFIG.weights.health;

export const HEALTH_BANDS = {
    OPTIMAL: 85,
    BALANCED: 70,
    MILD: 55,
    MODERATE: 40
};

/**
 * Functional version of Health Score (Ojas Balance) calculation.
 * A weighted composite of the physiological sub-systems.
 */
export function computeHealthScore(state: VedaState, driftIndex: number): number {
    const ojas = state.ojas ?? 50;
    const agni = state.agni ?? 50;
    const circadian = state.circadian ?? 50;
    
    // Non-linear stability penalty: Deterioration accelerates beyond moderate drift.
    // Formula: 100 - (driftIndex^2 / 100)
    const stability = clamp(100 - (Math.pow(driftIndex || 0, 2) / 100));

    // Refined weighting to prioritize Circadian Rhythm in health composition
    const healthScore =
        (ojas * HW.OJAS) +
        (agni * HW.AGNI) +
        (circadian * HW.CIRCADIAN) +
        (stability * HW.STABILITY);

    return Math.round(clamp(healthScore));
}

/**
 * Returns a human-readable interpretation of the health score.
 */
export function getHealthCategory(score: number): string {
    if (score >= HEALTH_BANDS.OPTIMAL) return "optimal vitality";
    if (score >= HEALTH_BANDS.BALANCED) return "balanced";
    if (score >= HEALTH_BANDS.MILD) return "mild imbalance";
    if (score >= HEALTH_BANDS.MODERATE) return "moderate imbalance";
    return "severe imbalance";
}
