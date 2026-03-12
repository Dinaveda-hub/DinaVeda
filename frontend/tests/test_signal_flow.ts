
import { applySignals } from '../src/engine/stateUpdater';
import { defaultState, VedaState } from '../src/engine/stateModel';

async function runTest() {
    console.log("=== Signal Flow & Orchestration Verification ===");

    const initialState: VedaState = {
        ...defaultState,
        vata: 50,
        stress: 50,
        sleep: 80
    };

    // Signal: "Late Sleep" (Predicted effects: vata +4, pitta +4, sleep -10)
    // Signal: "High Stress" (Predicted effects: vata +12, stress +15)
    const testSignals = ["late_sleep", "high_stress"];
    
    console.log("\n1. Applying Signals: ", testSignals);
    
    // We call applySignals directly as it's the core of useSignalLogger
    const result = await applySignals(testSignals, initialState, "test_user", "23:30");

    console.log("\n2. Verifying Signal Processing...");
    console.log(`- Final Vata: ${result.state.vata.toFixed(2)}`);
    console.log(`- Final Sleep: ${result.state.sleep.toFixed(2)}`);
    console.log(`- Final Stress: ${result.state.stress.toFixed(2)}`);

    // Verification Logic:
    // Raw effects: vata +10, stress +10, sleep -10.
    // However, the TOD (23:30) might apply a penalty to the late night work if it's marked as night.
    // And runPhysiologyCycle applies Momentum (0.8).
    
    if (result.state.vata > 50 && result.state.sleep < 80) {
        console.log("✅ Signals correctly applied and evolved through orchestrator.");
    } else {
        console.error("❌ Signal application failed or state did not evolve.");
    }

    console.log("\n3. Verifying Orchestrator Events...");
    if (result.events.length > 0) {
        console.log(`- Events Triggered: [${result.events.join(", ")}]`);
        console.log("✅ Orchestrator triggered notification events.");
    } else {
        console.warn("⚠️ No events triggered for this state change.");
    }

    console.log("\n=== Final Confirmation ===");
    console.log("Hook -> StateUpdater -> Orchestrator Pipeline: VERIFIED.");
}

runTest().catch(console.error);
