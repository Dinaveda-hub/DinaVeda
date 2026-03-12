import { applyRecovery } from '../frontend/src/engine/recoveryEngine';
import { defaultState, VedaState } from '../frontend/src/engine/stateModel';

function testRecovery() {
    console.log("--- Dinaveda Recovery Engine Verification ---");

    // Scenario 1: High Stress & Good Ojas
    const state1: VedaState = {
        ...defaultState,
        stress: 75,
        ojas: 70
    };

    // Calculation:
    // drift = 50 - 75 = -25
    // recoveryFactor = 70/100 = 0.7
    // step = -25 * 0.1 * 0.7 = -1.75

    const recovered1 = applyRecovery(state1);
    console.log("\nScenario 1: High Stress & High Ojas");
    console.log(`Stress: ${state1.stress} -> ${recovered1.stress.toFixed(2)} (Expected ~73.25)`);
    if (Math.abs(recovered1.stress - 73.25) < 0.1) console.log("✅ High Ojas Recovery Passed");

    // Scenario 2: High Stress & Low Ojas
    const state2: VedaState = {
        ...defaultState,
        stress: 75,
        ojas: 20
    };

    // Calculation:
    // recoveryFactor = clamp(20/100, 0.3, 1) = 0.3
    // step = -25 * 0.1 * 0.3 = -0.75

    const recovered2 = applyRecovery(state2);
    console.log("\nScenario 2: High Stress & Low Ojas");
    console.log(`Stress: ${state2.stress} -> ${recovered2.stress.toFixed(2)} (Expected ~74.25)`);
    if (Math.abs(recovered2.stress - 74.25) < 0.1) console.log("✅ Low Ojas Recovery Passed");

    // Scenario 3: Extreme Drift & Ojas
    const state3: VedaState = {
        ...defaultState,
        vata: 10,
        ojas: 100
    };

    // Calculation:
    // drift = 50 - 10 = 40
    // recoveryFactor = 1.0
    // step = 40 * 0.1 * 1.0 = 4 (Capped at MAX_RECOVERY_STEP = 3)

    const recovered3 = applyRecovery(state3);
    console.log("\nScenario 3: Extreme Drift (Max Step Cap)");
    console.log(`Vata: ${state3.vata} -> ${recovered3.vata.toFixed(2)} (Expected 13 because cap 3)`);
    if (recovered3.vata === 13) console.log("✅ Max Recovery Step Cap Passed");

    // Scenario 4: Variable Sensitivity (Digestion)
    const state4: VedaState = {
        ...defaultState,
        circadian: 0.7, sleep: 0.8,
        ojas: 70      // recoveryFactor = 0.7
    };
    // step = 20 * 0.1 * 0.7 * 0.7 (sensitivity) = 0.98
    const recovered4 = applyRecovery(state4);
    console.log("\nScenario 4: Variable Sensitivity (Digestion)");
    console.log(`Digestion: ${state4.digestion} -> ${recovered4.digestion.toFixed(2)} (Expected ~30.98)`);
    if (Math.abs(recovered4.digestion - 30.98) < 0.1) console.log("✅ Variable Sensitivity Passed");

    console.log("\n✨ Recovery Engine Hardening Verification Complete.");
}

testRecovery();
