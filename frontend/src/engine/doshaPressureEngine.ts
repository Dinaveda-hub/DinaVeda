import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';
import { clamp } from '../utils/clamp';

/**
 * doshaPressureEngine.ts
 * 
 * Tracks cumulative dosha imbalance pressure over time.
 * Pressure represents persistent physiological stress, not immediate symptoms.
 */

export interface DoshaPressure {
    vata_pressure: number;
    pitta_pressure: number;
    kapha_pressure: number;
    base_pressure: number;
    adjusted_pressure: number;
    dominant_pressure_dosha: string;
    pressure_category: string;
}

import { computeVikriti } from './vikritiEngine';

/**
 * Calculates dosha pressure based on current vikriti drift and history.
 * 
 * @param currentState - Current physiological state
 * @param vikriti - Metrics from Vikriti Engine
 * @param history - Array of last 7 days physiology states (VedaState)
 */
export function calculateDoshaPressure(
    currentState: VedaState,
    vikriti: VikritiMetrics,
    history: VedaState[]
): DoshaPressure {
    // Step 1 — Base Pressure Calculation
    // Pressure is the absolute diff from Prakriti baseline.
    const vata_pressure = Math.abs(vikriti.vata_diff);
    const pitta_pressure = Math.abs(vikriti.pitta_diff);
    const kapha_pressure = Math.abs(vikriti.kapha_diff);

    let base_pressure = (vata_pressure + pitta_pressure + kapha_pressure) / 3;
    base_pressure = clamp(base_pressure, 0, 100);

    // Step 2 — Momentum Weighting
    // Calculate persistence using the last 3 days average imbalance.
    // We use the same Prakriti-based calculation as the base pressure for theoretical consistency.
    const last3Days = history.slice(-3);
    let recent_drift = 0;

    if (last3Days.length > 0) {
        const sumImbalance = last3Days.reduce((acc, state) => {
            const metrics = computeVikriti(state);
            // Average absolute imbalance (deviation from Prakriti)
            const dailyImbalance = (
                Math.abs(metrics.vata_diff) +
                Math.abs(metrics.pitta_diff) +
                Math.abs(metrics.kapha_diff)
            ) / 3;
            return acc + dailyImbalance;
        }, 0);
        recent_drift = sumImbalance / last3Days.length;
    } else {
        // Fallback to current base pressure if no history available
        recent_drift = base_pressure;
    }

    // Persistence multiplier: 1 + (recent_drift / 200)
    let persistence_factor = 1 + (recent_drift / 200);
    // Limit factor: persistence_factor ≤ 1.5
    if (persistence_factor > 1.5) persistence_factor = 1.5;

    let adjusted_pressure = base_pressure * persistence_factor;
    adjusted_pressure = clamp(adjusted_pressure, 0, 100);

    // Step 3 — Dosha Dominance (Determine which contributes most pressure)
    // Support tie-aware logic (e.g. Vata-Pitta)
    const maxP = Math.max(vata_pressure, pitta_pressure, kapha_pressure);
    let dominant_pressure_dosha = "Balanced";

    if (maxP < 5) {
        dominant_pressure_dosha = "Balanced";
    } else {
        const dominants: string[] = [];
        if (vata_pressure === maxP) dominants.push("Vata");
        if (pitta_pressure === maxP) dominants.push("Pitta");
        if (kapha_pressure === maxP) dominants.push("Kapha");
        dominant_pressure_dosha = dominants.join("-");
    }

    // Step 4 — Pressure Categories
    // 0–30 → stable, 31–60 → early, 61–80 → moderate, 81–100 → high
    let pressure_category = "stable";
    if (adjusted_pressure > 80) pressure_category = "high imbalance";
    else if (adjusted_pressure > 60) pressure_category = "moderate imbalance";
    else if (adjusted_pressure > 30) pressure_category = "early imbalance";
    else pressure_category = "stable";

    // Step 5 — Output Structure
    return {
        vata_pressure,
        pitta_pressure,
        kapha_pressure,
        base_pressure,
        adjusted_pressure,
        dominant_pressure_dosha,
        pressure_category
    };
}
