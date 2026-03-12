import { VedaState } from "./stateModel"
import { ENGINE_CONFIG } from "./config";

const { clamp } = ENGINE_CONFIG.ranges;

/**
 * baselineStabilizer.ts
 * 
 * Anchors the long-term physiology toward the user's constitutional baseline (Prakriti).
 * This prevents state drift and ensures the physiological model remains theoretically consistent.
 */

const MAX_BASELINE_STEP = 2;

type AxisKey = "vata_axis" | "pitta_axis" | "kapha_axis";
const AXIS_KEYS: AxisKey[] = ["vata_axis", "pitta_axis", "kapha_axis"];

/**
 * Applies baseline stabilization to Vata, Pitta, and Kapha axes.
 * 
 * @param state - Current VedaState
 * @param driftIndex - Optional current system drift index for adaptive stabilization
 * @returns - Updated VedaState anchored to Prakriti
 */
export function applyBaselineStabilizer(state: VedaState, driftIndex: number = 20): VedaState {
    const nextState = { ...state };

    const baselineMap: Record<AxisKey, number> = {
        vata_axis: state.prakriti_vata || 50,
        pitta_axis: state.prakriti_pitta || 50,
        kapha_axis: state.prakriti_kapha || 50
    };

    // 1. Adaptive Baseline Anchoring
    // The pull toward Prakriti scales with the global instability (driftIndex)
    // Rate ranges from ~0.03 (stable) to ~0.06 (severe instability)
    const adaptiveRate = 0.03 + (driftIndex * 0.0005);

    for (const key of AXIS_KEYS) {
        const baseline = baselineMap[key];
        const value = state[key];

        const drift = baseline - value;
        // Apply adaptive rate, manual clamp for range limit
        let step = drift * adaptiveRate;
        if (step > MAX_BASELINE_STEP) step = MAX_BASELINE_STEP;
        if (step < -MAX_BASELINE_STEP) step = -MAX_BASELINE_STEP;

        nextState[key] = clamp(value + step);
    }

    // 2. Extreme State Safeguard (Soft Normalization)
    // Rule A: Unified runaway (All three at extremes)
    const extremeHigh = nextState.vata_axis > 85 && nextState.pitta_axis > 85 && nextState.kapha_axis > 85;
    const extremeLow = nextState.vata_axis < 15 && nextState.pitta_axis < 15 && nextState.kapha_axis < 15;

    if (extremeHigh || extremeLow) {
        for (const key of AXIS_KEYS) {
            const baseline = baselineMap[key];
            const value = nextState[key];
            const compression = (baseline - value) * 0.1;
            nextState[key] = clamp(value + compression);
        }
    }

    // Rule B: Individual runaway (Any single dosha at critical boundaries >95 or <5)
    for (const key of AXIS_KEYS) {
        const value = nextState[key];
        if (value > 95 || value < 5) {
            const baseline = baselineMap[key];
            const compression = (baseline - value) * 0.1;
            nextState[key] = clamp(value + compression);
        }
    }

    return nextState;
}
