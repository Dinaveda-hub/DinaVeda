/**
 * Biological weighting configurations for the Dinaveda engine.
 * Unified to ensure deterministic scoring.
 */

export const OJAS_WEIGHTS = {
  DIGESTION: 0.30,
  SLEEP: 0.30,
  STRESS: 0.20,
  CIRCADIAN: 0.20
} as const;

export const IMBALANCE_PRESSURE_WEIGHTS = {
  DOSHA_DRIFT: 0.6,
  SIGNAL_LOAD: 0.4
} as const;

export const HEALTH_WEIGHTS = {
  OJAS: 0.30,
  AGNI: 0.25,
  CIRCADIAN: 0.25,
  STABILITY: 0.20
} as const;

/**
 * Validates that a weight object sums to 1.0.
 * Used at engine startup to ensure configuration integrity.
 */
export function validateWeights(weights: Record<string, number>, label: string) {
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1) > 0.001) {
    console.warn(`[Engine Configuration] ${label} does not sum to 1.0 (current: ${sum}). This may cause metric overflow.`);
  }
}
