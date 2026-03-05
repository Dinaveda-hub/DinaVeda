import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';

export interface VedaPrediction {
    risk: string;
    suggestion: string;
}

export class PredictionEngine {
    /**
     * In a production app, trend tracking would ideally look at the deltas over the last X days.
     * Since we do not have a full timeseries database yet, we will simulate "trends" 
     * by evaluating the severity of the current static state deviations and assuming 
     * prolonged thresholds equate to short-term trends.
     */
    public evaluateTrends(state: VedaState, vikriti: VikritiMetrics): VedaPrediction[] {
        const predictions: VedaPrediction[] = [];

        // Trend 1: Kapha Imbalance Risk (e.g., kapha > 60 usually means 3+ days of accumulation)
        if (vikriti.vikriti_kapha > 20 || state.kapha_state > 60) {
            predictions.push({
                risk: "Kapha accumulation vector detected.",
                suggestion: "Reduce heavy, cold, or oily foods at dinner tonight to prevent congestion."
            });
        }

        // Trend 2: Vata Nervous System Overload
        if (state.sleep_debt > 40 && state.vata_state > 50) {
            predictions.push({
                risk: "Vata aggravation linked to persistent sleep debt.",
                suggestion: "Prioritize an earlier bedtime tonight and apply warm oil to feet (Padabhyanga) before sleeping."
            });
        }

        // Trend 3: Pitta Digestive/Inflammatory Risk
        if (state.pitta_state > 60 && state.digestion_comfort < 40) {
            predictions.push({
                risk: "Pitta excess irritating the digestive tract (Amlapitta risk).",
                suggestion: "Avoid spicy, sour, and fermented foods today. Drink cooling coriander-fennel water."
            });
        }

        // Trend 4: Ama (Toxin) Accumulation
        if (state.ama_risk > 50) {
            predictions.push({
                risk: "High Ama (undigested toxins) likely accumulating in tissues.",
                suggestion: "Sip hot ginger water throughout the day. Avoid cold water and raw foods entirely until digestion feels light."
            });
        }

        // Trend 5: Low Vitality (Ojas)
        if (state.ojas_score < 40) {
            predictions.push({
                risk: "Low Ojas (vitality reserve) indicating potential burnout.",
                suggestion: "Rest is paramount. Practice gentle restorative yoga or Nadi Shodhana, and consume warm, nourishing foods like Kitchari."
            });
        }

        return predictions;
    }
}
