import { applyBaselineStabilizer } from '../frontend/src/engine/baselineStabilizer';
import { defaultState, VedaState } from '../frontend/src/engine/stateModel';

function testStabilization() {
    console.log("--- Dinaveda Baseline Stabilizer Verification ---");

    // Scenario 1: Re-centering toward Prakriti
    // Baseline: Vata 50, Pitta 30, Kapha 20
    const state1: VedaState = {
        ...defaultState,
        prakriti_vata: 60,
        vata: 80
    };

    // Calculation:
    // drift = 60 - 80 = -20
    // step = -20 * 0.05 = -1
    const stabilized1 = applyBaselineStabilizer(state1);
    console.log("\nScenario 1: Prakriti Anchoring (Vata 80 -> 60)");
    console.log(`Vata: ${state1.vata} -> ${stabilized1.vata.toFixed(2)} (Expected 79)`);
    if (stabilized1.vata === 79) console.log("✅ Prakriti Anchoring Passed");

    // Scenario 2: Max Step Cap
    const state2: VedaState = {
        ...defaultState,
        prakriti_vata: 20,
        vata: 80
    };
    // drift = 20 - 80 = -60
    // step = -60 * 0.05 = -3 (Capped at MAX_BASELINE_STEP = 2)
    const stabilized2 = applyBaselineStabilizer(state2);
    console.log("\nScenario 2: Max Step Cap");
    console.log(`Vata: ${state2.vata} -> ${stabilized2.vata.toFixed(2)} (Expected 78 because cap 2)`);
    if (stabilized2.vata === 78) console.log("✅ Max Baseline Step Passed");

    // Scenario 1 in prompt Example
    // prakriti_vata = 60, vata = 80
    // user example says 80 -> 75, but logic says 80 -> 79 (5% of 20 = 1).
    // prompt says 80 -> 77 (recovery) then 77 -> 75 (stabilizer).
    // Our standalone test for stabilizer logic: drift correction 5%.

    // Scenario 3: Extreme Runaway Safeguard
    const state3: VedaState = {
        ...defaultState,
        prakriti_vata: 50,
        prakriti_pitta: 30,
        prakriti_kapha: 20,
        vata: 90,
        pitta: 90,
        kapha: 90
    };
    // drift vata: 50-90 = -40, step = -2 (cap). nextState.vata = 88
    // drift pitta: 30-90 = -60, step = -2 (cap). nextState.pitta = 88
    // drift kapha: 20-90 = -70, step = -2 (cap). nextState.kapha = 88
    // nextState.vata/pitta/kapha > 85? Yes.
    // Safeguard: (baseline - value) * 0.1
    // vata: 88 + (50-88)*0.1 = 88 - 3.8 = 84.2

    const stabilized3 = applyBaselineStabilizer(state3);
    console.log("\nScenario 3: Extreme Runaway Safeguard (All > 85)");
    console.log(`Vata: ${state3.vata} -> ${stabilized3.vata.toFixed(2)} (Expected 84.20)`);
    if (Math.abs(stabilized3.vata - 84.2) < 0.1) console.log("✅ Extreme Runaway Safeguard Passed");

    // Scenario 4: Individual Runaway Safeguard (Vata 98)
    const state4: VedaState = {
        ...defaultState,
        prakriti_vata: 50,
        vata: 98
    };
    // 1. Anchor: drift -48, step -2 (cap). val = 96
    // 2. Rule B (>95): (50 - 96) * 0.1 = -4.6. val = 91.4
    const stabilized4 = applyBaselineStabilizer(state4);
    console.log("\nScenario 4: Individual Runaway Safeguard (Vata 98)");
    console.log(`Vata: ${state4.vata} -> ${stabilized4.vata.toFixed(2)} (Expected 91.40)`);
    if (Math.abs(stabilized4.vata - 91.4) < 0.1) console.log("✅ Individual Runaway Safeguard Passed");

    console.log("\n✨ Baseline Stabilizer Refinement Verification Complete.");
}

testStabilization();
