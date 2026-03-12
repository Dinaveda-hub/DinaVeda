import { CalculatorConfig, CalculatorResult, PhysiologyWeights } from "../data/calculators";

export interface CalculatorScoreResult {
  score: PhysiologyWeights;
  result: CalculatorResult;
  dominantDosha?: string;
}

/**
 * Core engine to compute results for all system calculators.
 * Implemented with weighting aggregation and dual-dominance logic for constitutions.
 */
export function computeCalculatorResult(
  calculator: CalculatorConfig,
  answers: number[] // index of selected option for each question
): CalculatorScoreResult {
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

  // 2. Select Result based on Category
  let resultId = "";
  let dominantDosha = "";

  if (calculator.id === "dosha-quiz") {
    const { id, type } = computeDoshaConstitution(aggregated);
    resultId = id;
    dominantDosha = type;
  } else if (calculator.id === "agni-test") {
    resultId = selectAgniResult(aggregated);
  } else if (calculator.id === "ama-checker") {
    resultId = selectAmaResult(aggregated);
  } else if (calculator.id === "daily-rhythm-analyzer") {
    resultId = selectCircadianResult(aggregated);
  }

  const result = calculator.results.find(r => r.id === resultId) || calculator.results[0];

  return {
    score: aggregated,
    result,
    dominantDosha
  };
}

/**
 * Implements dual-dominance logic for Prakriti.
 * If top 2 doshas are within 15% margin of each other, it's a dual constitution.
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
    return { id: primary.id, type }; // We still map to a base result ID for explanation, but note the type
  }

  return { id: primary.id, type: primary.id.charAt(0).toUpperCase() + primary.id.slice(1) };
}

function selectAgniResult(weights: PhysiologyWeights): string {
  const agni = weights.agni || 0;
  const pitta = weights.pitta || 0;
  
  // Basic thresholds for the 3 results in data/calculators.ts
  if (agni >= 25) return "sama-agni";
  if (pitta > agni) return "tikshna-agni";
  return "manda-agni";
}

function selectAmaResult(weights: PhysiologyWeights): string {
  const ama = weights.ama || 0;
  return ama > 15 ? "high-ama" : "low-ama";
}

function selectCircadianResult(weights: PhysiologyWeights): string {
  const circadian = weights.circadian || 0;
  return circadian > 40 ? "high-alignment" : "moderate-drift";
}
