import { VedaState, getBaseline } from "./stateModel";
import { clamp } from "../utils/clamp";
const MAX_RECOVERY_STEP = 3;

/**
 * Variable-specific recovery sensitivity.
 * Models biological reality where different systems recover at different rates.
 */
const RECOVERY_SENSITIVITY: Partial<Record<keyof VedaState, number>> = {
    vata_axis: 0.8,
    pitta_axis: 0.8,
    kapha_axis: 0.8,
    agni_axis: 0.7,
    ojas_axis: 0.9
};

/**
 * Applies biological recovery to a physiological state.
 * 
 * @param state - Current VedaState
 * @returns - Updated VedaState with recovery applied
 */
export function applyRecovery(state: VedaState): VedaState {
    const nextState = { ...state };

    // Recovery strength proportional to Ojas (clamped between 0.3 and 1.0)
    const recoveryFactor = clamp(state.ojas / 100, 0.3, 1);

    type RecoverableKey = keyof typeof RECOVERY_SENSITIVITY;
    const recoverableVariables = Object.keys(RECOVERY_SENSITIVITY) as RecoverableKey[];

    for (const key of recoverableVariables) {
        const value = state[key];
        if (typeof value !== 'number') continue;

        // Calculate drift from personalized baseline (Prakriti or neutral)
        const baseline = getBaseline(key, state);
        const drift = baseline - value;
        const sensitivity = RECOVERY_SENSITIVITY[key] || 1.0;

        // Step formula: drift * 10% * Ojas-factor * Variable-sensitivity
        const rawStep = drift * 0.1 * recoveryFactor * sensitivity;

        const step = clamp(
            rawStep,
            -MAX_RECOVERY_STEP,
            MAX_RECOVERY_STEP
        );

        // Nudge the variable toward the baseline point
        // Using explicit cast to match the VedaState numeric type
        (nextState[key] as number) = clamp(value + step, 0, 100);
    }

    return nextState;
}
