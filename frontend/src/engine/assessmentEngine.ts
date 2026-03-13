import { CalculatorConfig, CalculatorResult, PhysiologyWeights, CalculatorId } from "../data/calculators";
import { VedaState } from "./stateModel";

export interface AssessmentScoreResult {
  score: PhysiologyWeights;
  result: CalculatorResult;
  dominantDosha?: string;
  normalizedTotals: Record<string, number>;
}

/**
 * Generic engine to compute assessment results.
 */
export function runAssessment(
  calculator: CalculatorConfig,
  answers: number[]
): AssessmentScoreResult {
  const aggregated: PhysiologyWeights = {};

  // 1. Aggregate weights from all answers
  answers.forEach((optionIndex, questionIndex) => {
    const question = calculator.questions[questionIndex];
    if (!question) return;
    const option = question.options[optionIndex];
    if (!option) return;

    Object.entries(option.weights).forEach(([key, value]) => {
      const k = key as keyof PhysiologyWeights;
      aggregated[k] = (aggregated[k] || 0) + (value || 0);
    });
  });

  // 2. Select Result
  let result: CalculatorResult;
  let dominantDosha: string | undefined;

  if (calculator.id === "dosha-quiz") {
    const constitution = computeDoshaConstitution(aggregated);
    result = calculator.results.find(r => r.id === constitution.id) || calculator.results[0];
    dominantDosha = constitution.type;
  } else {
    // Declarative threshold-based selection
    // We look for the result with the highest minScore that is <= current score
    // Assumes results are defined for the primary metric of the calculator
    const primaryKey = Object.keys(calculator.stateMapping || {})[0] || "";
    const primaryScore = (aggregated as any)[primaryKey] || 0;
    
    const sortedResults = [...calculator.results].sort((a, b) => (b.minScore || 0) - (a.minScore || 0));
    result = sortedResults.find(r => primaryScore >= (r.minScore || 0)) || calculator.results[0];
  }

  // 3. Normalize totals for state mapping
  const normalizedTotals: Record<string, number> = {};
  const factor = calculator.scalingFactor || 1;
  
  Object.entries(aggregated).forEach(([key, val]) => {
    normalizedTotals[key] = Math.min(100, Math.round((val as number) * factor));
  });

  return {
    score: aggregated,
    result,
    dominantDosha,
    normalizedTotals
  };
}

/**
 * Maps assessment results to state updates.
 */
export function mapAssessmentToState(
  currentState: VedaState,
  calculator: CalculatorConfig,
  assessmentResult: AssessmentScoreResult
): Partial<VedaState> {
  const updates: Partial<VedaState> = {};
  const { normalizedTotals, result } = assessmentResult;

  // 1. Basic Mapping from weights
  if (calculator.stateMapping) {
    Object.entries(calculator.stateMapping).forEach(([weightKey, stateKey]) => {
      const value = normalizedTotals[weightKey];
      if (value !== undefined) {
        (updates as any)[stateKey] = value;
      }
    });

    // Special Case: Prakriti also initializes current Vikriti axes
    if (calculator.id === "dosha-quiz") {
      updates.vata = updates.prakriti_vata;
      updates.pitta = updates.prakriti_pitta;
      updates.kapha = updates.prakriti_kapha;
      updates.is_onboarded = true;
    }
  }

  // 2. Result-specific side effects (Declarative resultUpdates)
  if (result.resultUpdates) {
    Object.entries(result.resultUpdates).forEach(([stateKey, action]) => {
      const currentVal = (currentState as any)[stateKey] || 50;
      
      if (typeof action === "number") {
         (updates as any)[stateKey] = action;
      } else if (action.type === "set") {
         (updates as any)[stateKey] = action.value;
      } else if (action.type === "add") {
         (updates as any)[stateKey] = Math.max(0, Math.min(100, currentVal + action.value));
      }
    });
  }

  return updates;
}

/**
 * Dual-dominance logic for Prakriti.
 */
function computeDoshaConstitution(weights: PhysiologyWeights): { id: string; type: string } {
  const v = weights.vata || 0;
  const p = weights.pitta || 0;
  const k = weights.kapha || 0;
  const total = v + p + k || 1;

  const scores = [
    { id: "vata", val: v },
    { id: "pitta", val: p },
    { id: "kapha", val: k }
  ].sort((a, b) => b.val - a.val);

  const primary = scores[0];
  const secondary = scores[1];

  // Margin check for dual dominance (15% of total score)
  const margin = total * 0.15;
  const isDual = (primary.val - secondary.val) <= margin;

  if (isDual) {
    const type = `${primary.id.charAt(0).toUpperCase()}${primary.id.slice(1)}-${secondary.id.charAt(0).toUpperCase()}${secondary.id.slice(1)}`;
    return { id: primary.id, type };
  }

  return { id: primary.id, type: primary.id.charAt(0).toUpperCase() + primary.id.slice(1) };
}
