import { VedaState } from "./stateModel";
import { applyMomentum } from "./physiologyMomentum";
import { applySeasonalDrift, getRutuIndex } from "./rutuDriftEngine";
import { applyRecovery } from "./recoveryEngine";
import { applyBaselineStabilizer } from "./baselineStabilizer";
import { applyGlobalHomeostasis } from "./globalHomeostasisEngine";
import { computeVikriti, VikritiMetrics } from "./vikritiEngine";
import { computeHealthScore } from "./healthScoreEngine";
import { computeIPI } from "./imbalancePressureEngine";
import { selectProtocols, Protocol } from "./protocolSelectionEngine";
import { compileDailyProtocols, CompiledDailyPlan } from "./protocolCompiler";
import { detectNotificationEvents, NotificationEvent } from "./notificationEventEngine";
import { ProtocolWeights } from "@/utils/userWeightsService";
import { PhysiologyPattern } from "@/services/patternService";

export interface PhysiologyCycleResult {
    state: VedaState;
    analysis: {
        vikriti: VikritiMetrics;
        healthScore: number;
        ipi: number;
    };
    decisions: {
        protocols: Protocol[];
        dailyPlan: CompiledDailyPlan;
    };
    notifications: NotificationEvent[];
}

/**
 * The Central Orchestrator of Dinaveda.
 * Executes the full 21-subsystem pipeline in a deterministic sequence.
 */
export function runPhysiologyCycle(
    previousState: VedaState,
    newStateWithSignals: VedaState,
    userWeights: ProtocolWeights = {},
    healthGoal: string = "general_wellness",
    userPatterns: PhysiologyPattern[] = []
): PhysiologyCycleResult {
    // ── PHASE 1: EVOLUTION ──────────────────────────────────────────────
    // Biological transition from previous state to new signal-affected state
    
    // 1. Momentum Smoothing (gradual transition)
    let evolvedState = applyMomentum(previousState, newStateWithSignals);
    
    // 2. Seasonal Drift (environmental pressure)
    evolvedState = applySeasonalDrift(evolvedState);
    
    // 3. Baseline Stabilizer (constitutional anchoring)
    evolvedState = applyBaselineStabilizer(evolvedState);

    // 4. Passive Recovery (homeostasis relaxation)
    evolvedState = applyRecovery(evolvedState);
    
    // 5. Global Homeostasis (Systemic Equilibrium)
    evolvedState = applyGlobalHomeostasis(evolvedState);
    
    // 6. Derived Metrics Projection (Latent Axes -> Surface Variables)
    const { computeDerivedMetrics } = require("./derivedMetricsEngine");
    evolvedState = computeDerivedMetrics(evolvedState);
    
    // 7. Update Rutu Index
    evolvedState.rutu_index = getRutuIndex();

    // ── PHASE 2: ANALYSIS ───────────────────────────────────────────────
    // Interpreting the new state into health metrics
    
    const vikriti = computeVikriti(evolvedState);
    const healthScore = computeHealthScore(evolvedState, vikriti.drift_index);
    const ipi = computeIPI(evolvedState, vikriti.drift_index);

    // ── PHASE 3: DECISION ───────────────────────────────────────────────
    // Generating interventions based on state and goals
    
    const protocols = selectProtocols(evolvedState, userWeights, healthGoal, userPatterns);
    const dailyPlan = compileDailyProtocols(protocols);

    // ── PHASE 4: NOTIFICATION ────────────────────────────────────────────
    // Detecting critical patterns for alerts
    
    const notifications = detectNotificationEvents(evolvedState);

    return {
        state: evolvedState,
        analysis: {
            vikriti,
            healthScore,
            ipi
        },
        decisions: {
            protocols,
            dailyPlan
        },
        notifications
    };
}
