import * as scoring from "./scoringWeights";
import * as thresholds from "./thresholds";
import * as ranges from "./variableRanges";

/**
 * Central Engine Configuration
 * Unified access point for all biological constants and validation utilities.
 */
export const ENGINE_CONFIG = {
  weights: {
    ojas: scoring.OJAS_WEIGHTS,
    imbalance: scoring.IMBALANCE_PRESSURE_WEIGHTS,
    health: scoring.HEALTH_WEIGHTS,
    validate: scoring.validateWeights
  },
  thresholds: {
    drift: thresholds.DRIFT_SEVERITY,
    protocol: thresholds.PROTOCOL_THRESHOLDS,
    prakriti: thresholds.PRAKRITI_THRESHOLDS,
    criticalOjas: thresholds.CRITICAL_OJAS,
    getDriftLevel: thresholds.getDriftLevel
  },
  ranges: {
    min: ranges.VARIABLE_MIN,
    max: ranges.VARIABLE_MAX,
    default: ranges.DEFAULT_SCORE,
    clamp: ranges.clamp
  }
} as const;

// Auto-validate weights on load (in non-production usually, or just once)
if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
  scoring.validateWeights(scoring.OJAS_WEIGHTS, "OJAS_WEIGHTS");
  scoring.validateWeights(scoring.IMBALANCE_PRESSURE_WEIGHTS, "IMBALANCE_PRESSURE_WEIGHTS");
}
