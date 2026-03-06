import { VedaState } from './stateModel';

export interface DriftMetrics {
    total_drift_percentage: number;
    primary_drifting_dosha: "Vata" | "Pitta" | "Kapha" | "Balanced";
    vata_drift: number;
    pitta_drift: number;
    kapha_drift: number;
}

export class DriftEngine {
    /**
     * Calculates the vector deviation from the baseline Prakriti to generate
     * the "Dosha Drift" percentage used in the UI.
     */
    public calculateDrift(state: VedaState): DriftMetrics {
        // Calculate absolute deviation vectors
        const v_drift = Math.max(0, state.vata_state - state.prakriti_vata);
        const p_drift = Math.max(0, state.pitta_state - state.prakriti_pitta);
        const k_drift = Math.max(0, state.kapha_state - state.prakriti_kapha);

        // Calculate total deviation (max possible drift is theoretically 200, but we scale it to a 100% index)
        // A single dosha drifting from 33 to 100 is a 67 point drift. 
        // We consider a total combined drift of ~100 points to be "100% drift" (extreme pathology).
        const rawTotal = v_drift + p_drift + k_drift;
        const total_drift_percentage = Math.min(100, (rawTotal / 100) * 100);

        // Determine which dosha is drifting the most
        let primary_drifting_dosha: "Vata" | "Pitta" | "Kapha" | "Balanced" = "Balanced";
        let max_drift = 0;

        if (v_drift > max_drift && v_drift > 5) {
            max_drift = v_drift;
            primary_drifting_dosha = "Vata";
        }
        if (p_drift > max_drift && p_drift > 5) {
            max_drift = p_drift;
            primary_drifting_dosha = "Pitta";
        }
        if (k_drift > max_drift && k_drift > 5) {
            primary_drifting_dosha = "Kapha";
        }

        return {
            total_drift_percentage,
            primary_drifting_dosha,
            vata_drift: v_drift,
            pitta_drift: p_drift,
            kapha_drift: k_drift
        };
    }
}
