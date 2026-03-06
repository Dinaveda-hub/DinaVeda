import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';

export interface HealthAdjustment {
    issue: string;
    recommendation: string;
}

export class PredictionEngine {
    /**
     * Analyzes state trends and potential risks to provide preventive adjustments.
     */
    public getAdjustments(state: VedaState, vikriti: VikritiMetrics): HealthAdjustment[] {
        const adjustments: HealthAdjustment[] = [];

        // 1. Circadian Risk
        if (state.circadian_alignment < 50) {
            adjustments.push({
                issue: "Circadian rhythm disruption detected",
                recommendation: "Strict digital detox 2 hours before sleep tonight."
            });
        }

        // 2. Agni/Digestive Risk
        if (state.ama_risk > 30 || state.agni_strength < 40) {
            adjustments.push({
                issue: "Low digestive fire (Agni) / Ama accumulation",
                recommendation: "Lighter, warm cooked meals today. Avoid raw foods."
            });
        }

        // 3. Vata/Stress Risk
        if (state.stress_load > 60 || (vikriti.dominant_dosha === 'Vata' && vikriti.vikriti_vata > 20)) {
            adjustments.push({
                issue: "Elevated subtle stress / High Vata pressure",
                recommendation: "Prioritize grounding practices and slow movement."
            });
        }

        // 4. Sleep Debt Accumulation
        if (state.sleep_debt > 40) {
            adjustments.push({
                issue: "Sleep debt accumulating",
                recommendation: "Prioritize early sleep (before 10 PM) tonight for Ojas recovery."
            });
        }

        return adjustments;
    }

    /**
     * Generates a textual reflection on the current system balance.
     */
    public getSystemReflection(state: VedaState): string {
        if (state.ojas_score > 80) return "Your vitality is flourishing. Continue your consistent daily rhythms to maintain this high Ojas.";
        if (state.ojas_score > 50) return "Your routines are stabilizing your circadian rhythm. Focus on deep rest tonight.";
        return "Your system is seeking balance. Gentle, restorative practices are key right now to rebuild Ojas.";
    }
}
