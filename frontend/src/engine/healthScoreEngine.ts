import { VedaState } from './stateModel';
import { clamp } from '../utils/clamp';

/**
 * Functional version of Health Score (Ojas Balance) calculation.
 * A weighted composite of the physiological sub-systems.
 */
export function computeHealthScore(state: VedaState, driftIndex: number): number {
    const ojas = state.ojas ?? 50;
    const agni = state.agni ?? 50;
    const circadian = state.circadian ?? 50;
    const stability = 100 - (driftIndex ?? 0);

    const healthScore =
        (ojas * 0.35) +
        (agni * 0.25) +
        (circadian * 0.20) +
        (stability * 0.20);

    return Math.round(clamp(healthScore, 0, 100));
}
