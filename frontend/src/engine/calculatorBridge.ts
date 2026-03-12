import { VedaState } from "./stateModel";
import { CalculatorScoreResult } from "./calculatorEngine";
import { CalculatorId } from "../data/calculators";

/**
 * Translates a calculator result into a state update for the physiology engine.
 */
export function bridgeCalculatorToState(
  currentState: VedaState,
  calculatorId: CalculatorId,
  scoreResult: CalculatorScoreResult
): Partial<VedaState> {
  const updates: Partial<VedaState> = {};
  const { score, result } = scoreResult;

  // 1. Handle Dosha Quiz (Prakriti Initialization)
  if (calculatorId === "dosha-quiz") {
    // Normalize 0-100
    const v = score.vata || 0;
    const p = score.pitta || 0;
    const k = score.kapha || 0;
    const total = v + p + k || 1;

    updates.prakriti_vata = Math.round((v / total) * 100);
    updates.prakriti_pitta = Math.round((p / total) * 100);
    updates.prakriti_kapha = Math.round((k / total) * 100);
    updates.is_onboarded = true;
    
    // Also initialize current vikriti axes to match prakriti
    updates.vata = updates.prakriti_vata;
    updates.pitta = updates.prakriti_pitta;
    updates.kapha = updates.prakriti_kapha;
  }

  // 2. Handle Agni Test
  if (calculatorId === "agni-test") {
    // Agni in quiz is 0-30 approximately. Scale to 0-100.
    const agniScore = score.agni || 0;
    updates.agni = Math.min(100, Math.round((agniScore / 30) * 100));
    
    // Tikshna Agni implies high pitta
    if (result.id === "tikshna-agni") {
      updates.pitta = Math.min(100, (currentState.pitta || 50) + 15);
    }
    // Manda Agni implies high ama/kapha
    if (result.id === "manda-agni") {
      updates.ama = Math.min(100, (currentState.ama || 20) + 10);
      updates.kapha = Math.min(100, (currentState.kapha || 50) + 5);
    }
  }

  // 3. Handle Ama Checker
  if (calculatorId === "ama-checker") {
    const amaScore = score.ama || 0;
    // Ama score 0-30 scaled to 100
    updates.ama = Math.min(100, Math.round((amaScore / 30) * 100));
    
    if (updates.ama > 50) {
      updates.ojas = Math.max(0, (currentState.ojas || 70) - 10);
      updates.energy = Math.max(0, (currentState.energy || 60) - 10);
    }
  }

  // 4. Handle Daily Rhythm
  if (calculatorId === "daily-rhythm-analyzer") {
    const circScore = score.circadian || 0;
    // Score ~0-60 scaled
    updates.circadian = Math.min(100, Math.round((circScore / 60) * 100));
    
    if (result.id === "moderate-drift") {
      updates.daily_circadian_drag = 10;
      updates.stress = Math.min(100, (currentState.stress || 40) + 10);
    } else {
      updates.daily_circadian_drag = 0;
    }
  }

  return updates;
}
