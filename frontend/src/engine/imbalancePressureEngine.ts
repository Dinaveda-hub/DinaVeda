import { VedaState } from './stateModel';
import { IMBALANCE_PRESSURE_WEIGHTS } from '../config/scoringWeights';

export class ImbalancePressureEngine {
    /**
     * Calculates the "Imbalance Pressure" — a metric of how much the physiological
     * system is being pushed away from its Prakriti baseline.
     */
    public calculateImbalancePressure(state: VedaState, driftIndex: number): number {
        return computeIPI(state, driftIndex);
    }
}

/**
 * Functional version of Imbalance Pressure Index (IPI) calculation.
 */
export function computeIPI(state: VedaState, driftIndex: number): number {
    // High drift + High Signal impact = High Pressure

    // 1. Base pressure from drift (0-100)
    const driftPressure = Math.min(100, driftIndex * 2);

    // 2. Added pressure from acute variables (stress, sleep debt, agni weakness)
    const acuteLoad = (
        state.stress_load +
        state.sleep_debt +
        (100 - state.agni_strength)
    ) / 3;

    const pressure = (driftPressure * (IMBALANCE_PRESSURE_WEIGHTS.DOSHA_DRIFT || 0.6)) +
        (acuteLoad * (IMBALANCE_PRESSURE_WEIGHTS.SIGNAL_LOAD || 0.4));

    return Math.round(pressure);
}
