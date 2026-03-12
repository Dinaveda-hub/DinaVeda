import { VedaState, getBaseline } from "./stateModel";
import { ENGINE_CONFIG } from "./config";

const { clamp } = ENGINE_CONFIG.ranges;

/**
 * globalHomeostasisEngine.ts
 * 
 * Implements a systemic equilibrium layer to prevent long-term state drift.
 * Acts as a gentle "biological gravity" pulling all variables toward their baselines.
 */

const HOMEOSTASIS_RATE = 0.03; // 3% correction per cycle

/**
 * Applies global homeostasis to the entire VedaState.
 * Unlike the Recovery Engine which targets specific systems, 
 * this affects all physiological variables to ensure systemic equilibrium.
 * 
 * @param state - Current VedaState
 * @returns - Updated VedaState with systemic correction applied
 */
export function applyGlobalHomeostasis(state: VedaState): VedaState {
    const nextState = { ...state };

    const CORE_AXES: (keyof VedaState)[] = [
        'vata_axis', 'pitta_axis', 'kapha_axis', 'agni_axis', 'ojas_axis'
    ];

    for (const key of CORE_AXES) {
        const value = state[key];
        if (typeof value !== 'number') continue;

        // Calculate drift from personalized baseline
        const baseline = getBaseline(key, state);
        const drift = baseline - value;

        // Systemic correction: 3% of the drift
        const correction = drift * HOMEOSTASIS_RATE;

        // Apply correction and clamp to physiological boundaries
        (nextState[key as keyof VedaState] as number) = clamp(value + correction);
    }

    return nextState;
}
