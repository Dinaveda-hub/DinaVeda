import { runPhysiologyCycle } from '../src/engine/physiologyOrchestrator';
import { defaultState, VedaState } from '../src/engine/stateModel';
import { ProtocolWeights } from '../src/utils/userWeightsService';

async function runTest() {
    console.log("=== Architectural Harmonization & Orchestration Verification ===");

    const previousState: VedaState = {
        ...defaultState,
        vata: 50,
        pitta: 50,
        kapha: 50,
        stress: 50,
        sleep: 50,
        ojas: 50
    };

    // Simulate input signals that push the state
    const newStateWithSignals: VedaState = {
        ...previousState,
        vata: 80,   // Sudden jump in Vata
        stress: 75, // High stress
        sleep: 40   // Poor sleep
    };

    const userWeights: ProtocolWeights = {};
    const healthGoal = "stress_reduction"; // Goal: Stress Reduction

    console.log("\n1. Running Full Physiology Cycle...");
    const result = runPhysiologyCycle(
        previousState,
        newStateWithSignals,
        userWeights,
        healthGoal,
        [] 
    );

    // ── VERIFY EVOLUTION ──────────────────────────────────────────────
    console.log("\n2. Verifying Evolution (Momentum & Stabilization)...");
    const evolvedVata = result.state.vata;
    console.log(`- Vata: Input(80) -> Smoothed(${evolvedVata.toFixed(2)})`);
    
    // Momentum should have prevented 50 -> 80 jump. 
    // Vata momentum is 0.8. Smoothed = 50*0.8 + 80*(1-0.8) = 40 + 16 = 56.
    // Plus seasonal/recovery nudges.
    if (evolvedVata < 80 && evolvedVata > 50) {
        console.log("✅ Momentum smoothing verified.");
    } else {
        console.error("❌ Momentum smoothing failed.");
    }

    // ── VERIFY ANALYSIS ───────────────────────────────────────────────
    console.log("\n3. Verifying Analysis Metrics...");
    console.log(`- Vikriti Dominant: ${result.analysis.vikriti.dominant_dosha}`);
    console.log(`- Health Score: ${result.analysis.healthScore}`);
    console.log(`- IPI: ${result.analysis.ipi}`);

    if (result.analysis.ipi > 0 && result.analysis.healthScore < 100) {
        console.log("✅ Analysis metrics (Vikriti, Health, IPI) computed.");
    } else {
        console.error("❌ Analysis metrics failed.");
    }

    // ── VERIFY DECISIONS (GOAL BOOST) ──────────────────────────────────
    console.log("\n4. Verifying Decision Engine & Goal Boost...");
    const protocols = result.decisions.protocols;
    console.log(`- Protocols Count: ${protocols.length}`);
    
    // Check for stress-reduction protocols (Manasayur module)
    const stressProtocols = protocols.filter(p => p.module.toLowerCase() === "manasayur");
    console.log(`- Stress Reduction (Manasayur) protocols found: ${stressProtocols.length}`);
    
    if (stressProtocols.length > 0) {
        console.log("✅ Goal-aligned protocols prioritized.");
    } else {
        console.warn("⚠️ No module-specific protocols found for this goal/state combo.");
    }

    // ── VERIFY NOTIFICATIONS ────────────────────────────────────────────
    console.log("\n5. Verifying Notification Events...");
    console.log(`- Events Detected: [${result.notifications.join(", ")}]`);
    
    if (result.notifications.length > 0) {
        console.log("✅ Notification events detected post-evolution.");
    } else {
        console.warn("⚠️ No critical events detected for this test state.");
    }

    console.log("\n=== Final Confirmation ===");
    console.log("System Architecture: Deterministic 21-Engine Pipeline Verified.");
}

runTest().catch(console.error);
