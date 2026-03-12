import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';
import { ENGINE_CONFIG } from './config';

const { clamp } = ENGINE_CONFIG.ranges;

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

const PRESSURE_THRESHOLDS = {
    EARLY: 30,
    MODERATE: 60,
    HIGH: 80
};

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
    const vata_pressure_base = Math.abs(vikriti.vata_diff);
    const pitta_pressure_base = Math.abs(vikriti.pitta_diff);
    const kapha_pressure_base = Math.abs(vikriti.kapha_diff);

    // Step 2 — Persistence Weighting (Granular per-dosha)
    // We sample the last 3 days to determine if an imbalance is "settling in"
    const last3Days = history.slice(-3);
    
    let vata_persistence = 1.0;
    let pitta_persistence = 1.0;
    let kapha_persistence = 1.0;

    if (last3Days.length > 0) {
        const historyMetrics = last3Days.map(state => computeVikriti(state));
        
        const avgVataDrift = historyMetrics.reduce((acc, m) => acc + Math.abs(m.vata_diff), 0) / last3Days.length;
        const avgPittaDrift = historyMetrics.reduce((acc, m) => acc + Math.abs(m.pitta_diff), 0) / last3Days.length;
        const avgKaphaDrift = historyMetrics.reduce((acc, m) => acc + Math.abs(m.kapha_diff), 0) / last3Days.length;

        // Cumulative pressure multiplier: 1 + (avg_drift / 200), capped at 1.5
        vata_persistence = Math.min(1 + (avgVataDrift / 200), 1.5);
        pitta_persistence = Math.min(1 + (avgPittaDrift / 200), 1.5);
        kapha_persistence = Math.min(1 + (avgKaphaDrift / 200), 1.5);
    }

    const vata_pressure = vata_pressure_base * vata_persistence;
    const pitta_pressure = pitta_pressure_base * pitta_persistence;
    const kapha_pressure = kapha_pressure_base * kapha_persistence;

    let adjusted_pressure = (vata_pressure + pitta_pressure + kapha_pressure) / 3;
    adjusted_pressure = clamp(adjusted_pressure);

    // Step 3 — Dosha Dominance
    const maxP = Math.max(vata_pressure, pitta_pressure, kapha_pressure);
    let dominant_pressure_dosha = "Balanced";

    if (maxP < 5) {
        dominant_pressure_dosha = "Balanced";
    } else {
        const dominants: string[] = [];
        if (Math.abs(vata_pressure - maxP) < 2) dominants.push("Vata");
        if (Math.abs(pitta_pressure - maxP) < 2) dominants.push("Pitta");
        if (Math.abs(kapha_pressure - maxP) < 2) dominants.push("Kapha");
        dominant_pressure_dosha = dominants.join("-");
    }

    // Step 4 — Pressure Categories using constants
    let pressure_category = "stable";
    if (adjusted_pressure > PRESSURE_THRESHOLDS.HIGH) pressure_category = "high imbalance";
    else if (adjusted_pressure > PRESSURE_THRESHOLDS.MODERATE) pressure_category = "moderate imbalance";
    else if (adjusted_pressure > PRESSURE_THRESHOLDS.EARLY) pressure_category = "early imbalance";
    else pressure_category = "stable";

    return {
        vata_pressure: Math.round(vata_pressure),
        pitta_pressure: Math.round(pitta_pressure),
        kapha_pressure: Math.round(kapha_pressure),
        base_pressure: Math.round((vata_pressure_base + pitta_pressure_base + kapha_pressure_base) / 3),
        adjusted_pressure: Math.round(adjusted_pressure),
        dominant_pressure_dosha,
        pressure_category
    };
}
