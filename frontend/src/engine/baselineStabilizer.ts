import { VedaState } from "./stateModel"
import { clamp } from "../utils/clamp"

/**
 * baselineStabilizer.ts
 * 
 * Anchors the long-term physiology toward the user's constitutional baseline (Prakriti).
 * This prevents state drift and ensures the physiological model remains theoretically consistent.
 */

const MAX_BASELINE_STEP = 2;

type DoshaKey = "vata" | "pitta" | "kapha";
const DOSHA_KEYS: DoshaKey[] = ["vata", "pitta", "kapha"];

/**
 * Applies baseline stabilization to Vata, Pitta, and Kapha.
 * 
 * @param state - Current VedaState
 * @returns - Updated VedaState anchored to Prakriti
 */
export function applyBaselineStabilizer(state: VedaState): VedaState {
    const nextState = { ...state };

    const baselineMap: Record<DoshaKey, number> = {
        vata: state.prakriti_vata || 50,
        pitta: state.prakriti_pitta || 50,
        kapha: state.prakriti_kapha || 50
    };

    // 1. Core Baseline Anchoring (5% correction step)
    for (const key of DOSHA_KEYS) {
        const baseline = baselineMap[key];
        const value = state[key];

        const drift = baseline - value;
        // Step is 5% of the drift, capped at MAX_BASELINE_STEP
        const step = clamp(drift * 0.05, -MAX_BASELINE_STEP, MAX_BASELINE_STEP);

        nextState[key] = clamp(value + step, 0, 100);
    }

    // 2. Extreme State Safeguard (Soft Normalization)
    // Rule A: Unified runaway (All three at extremes)
    const extremeHigh = nextState.vata > 85 && nextState.pitta > 85 && nextState.kapha > 85;
    const extremeLow = nextState.vata < 15 && nextState.pitta < 15 && nextState.kapha < 15;

    if (extremeHigh || extremeLow) {
        for (const key of DOSHA_KEYS) {
            const baseline = baselineMap[key];
            const value = nextState[key];
            const compression = (baseline - value) * 0.1;
            nextState[key] = clamp(value + compression, 0, 100);
        }
    }

    // Rule B: Individual runaway (Any single dosha at critical boundaries >95 or <5)
    for (const key of DOSHA_KEYS) {
        const value = nextState[key];
        if (value > 95 || value < 5) {
            const baseline = baselineMap[key];
            const compression = (baseline - value) * 0.1;
            nextState[key] = clamp(value + compression, 0, 100);
        }
    }

    return nextState;
}
