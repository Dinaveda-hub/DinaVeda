import { VedaState } from "./stateModel";
import { clamp } from "../utils/clamp";

/**
 * recoveryEngine.ts
 * 
 * A deterministic engine that nudges physiological variables toward 
 * equilibrium (neutral 50) based on system vitality (Ojas).
 */

const NEUTRAL = 50;
const MAX_RECOVERY_STEP = 3;

/**
 * Variable-specific recovery sensitivity.
 * Models biological reality where different systems recover at different rates.
 */
const RECOVERY_SENSITIVITY: Partial<Record<keyof VedaState, number>> = {
    stress: 1.0,           // Fast recovery
    mental_clarity: 0.9,
    energy: 0.9,
    vata: 0.8,             // Slower structural recovery
    pitta: 0.8,
    kapha: 0.8,
    digestion: 0.7,        // Slowest recovery systems
    bloating: 0.7
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

        // Calculate drift from neutral 50
        const drift = NEUTRAL - value;
        const sensitivity = RECOVERY_SENSITIVITY[key] || 1.0;

        // Step formula: drift * 10% * Ojas-factor * Variable-sensitivity
        const rawStep = drift * 0.1 * recoveryFactor * sensitivity;

        const step = clamp(
            rawStep,
            -MAX_RECOVERY_STEP,
            MAX_RECOVERY_STEP
        );

        // Nudge the variable toward the neutral point
        // Using explicit cast to match the VedaState numeric type
        (nextState[key] as number) = clamp(value + step, 0, 100);
    }

    return nextState;
}
