import { VedaState } from './stateModel';
import { clamp } from '../utils/clamp';

/**
 * Functional version of Imbalance Pressure Index (IPI) calculation.
 * Tracks acute load + dosha drift.
 */
export function computeIPI(state: VedaState, driftIndex: number): number {
    const stress = state.stress ?? 50;
    const sleep = state.sleep ?? 50;
    const agni = state.agni ?? 50;
    const drift_index = driftIndex ?? 0;

    const sleep_debt = 100 - sleep;
    let acuteLoad = (stress + sleep_debt + (100 - agni)) / 3;

    // Stabilization Guard: Prevent tiny fluctuations from raising IPI
    if (acuteLoad < 10) acuteLoad = 0;

    const IPI = (drift_index * 0.6) + (acuteLoad * 0.4);

    return Math.round(clamp(IPI, 0, 100));
}
