/**
 * Physiological thresholds for intervention and diagnostic labeling.
 */

export const DRIFT_SEVERITY = {
  STABLE: { max: 15, label: "Stable" },
  MILD: { max: 30, label: "Mild Drift" },
  MODERATE: { max: 50, label: "Moderate Drift" },
  SEVERE: { max: 75, label: "Severe Drift" },
  CRITICAL: { max: 100, label: "Critical Imbalance" }
} as const;

/**
 * Thresholds for triggering protocol recommendations.
 */
export const PROTOCOL_THRESHOLDS = {
  BASE: 60,
  LOW_OJAS: 50, // Trigger earlier if vitality is low
} as const;

export const CRITICAL_OJAS = 40;

/**
 * Thresholds for Prakriti classification and anti-gaming.
 */
export const PRAKRITI_THRESHOLDS = {
  TRIDOSHA_MARGIN: 5,
  DUAL_DOSHA_MARGIN: 10,
  EXTREME_DOMINANCE: 65,
  EXTREME_RECESSION: 20
} as const;

/**
 * Maps a drift score to a severity key.
 */
export function getDriftLevel(score: number): keyof typeof DRIFT_SEVERITY {
  if (score <= DRIFT_SEVERITY.STABLE.max) return "STABLE";
  if (score <= DRIFT_SEVERITY.MILD.max) return "MILD";
  if (score <= DRIFT_SEVERITY.MODERATE.max) return "MODERATE";
  if (score <= DRIFT_SEVERITY.SEVERE.max) return "SEVERE";
  return "CRITICAL";
}
