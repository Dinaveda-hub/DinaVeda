import { VedaState } from './stateModel';
import { ENGINE_CONFIG } from './config';

const { clamp } = ENGINE_CONFIG.ranges;
const IW = ENGINE_CONFIG.weights.imbalance;

export const IPI_BANDS = {
    LOW: 20,
    MILD: 40,
    MODERATE: 60,
    HIGH: 80
};

/**
 * Functional version of Imbalance Pressure Index (IPI) calculation.
 * Tracks acute load + dosha drift. Represents systemic physiological risk.
 */
export function computeIPI(state: VedaState, driftIndex: number): number {
    const stress = state.stress ?? 50;
    const sleep = state.sleep ?? 50;
    const agni = state.agni ?? 50;
    const circadian = state.circadian ?? 50;
    const drift_index = driftIndex ?? 0;
 
    // Acute Load: stress + recovery deficit + metabolic weakness + circadian disruption
    const sleep_debt = 100 - sleep;
    const agni_deficit = 100 - agni;
    const circadian_debt = 100 - circadian;
    
    let acuteLoad = (stress + sleep_debt + agni_deficit + circadian_debt) / 4;

    // Stabilization Guard: Prevent tiny fluctuations from raising IPI
    if (acuteLoad < 10) acuteLoad = 0;

    // Structural Component: Non-linear impact emphasizes severe imbalances
    const structuralPressure = Math.pow(drift_index, 1.2);

    // Final IPI: Weighted Chronic/Structural + Acute Strain
    const IPI = (structuralPressure * IW.DOSHA_DRIFT) + (acuteLoad * IW.SIGNAL_LOAD);

    return Math.round(clamp(IPI));
}

/**
 * Returns a human-readable interpretation of the IPI risk level.
 */
export function getIPICategory(score: number): string {
    if (score <= IPI_BANDS.LOW) return "low pressure";
    if (score <= IPI_BANDS.MILD) return "mild load";
    if (score <= IPI_BANDS.MODERATE) return "moderate pressure";
    if (score <= IPI_BANDS.HIGH) return "high pressure";
    return "critical imbalance";
}
