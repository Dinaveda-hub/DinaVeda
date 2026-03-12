import { applyMomentum } from '../frontend/src/engine/physiologyMomentum';
import { defaultState, VedaState } from '../frontend/src/engine/stateModel';

function testMomentum() {
    console.log("--- Dinaveda Biological Momentum & Safety Verification ---");

    const previousState: VedaState = { ...defaultState, vata: 50, ojas: 70, stress: 40 };

    // Scenario 1: Extreme jump (100) to test smoothing and drift cap
    const newState: VedaState = { ...previousState, vata: 150, ojas: 150, stress: 150 };

    const smoothed = applyMomentum(previousState, newState);

    console.log("\nScenario: Extreme Jump (Target: 150, Clipped to 100)");

    // Vata: Momentum 0.8 -> (50 * 0.8) + (150 * 0.2) = 40 + 30 = 70.
    console.log(`Vata: ${previousState.vata} -> ${smoothed.vata} (Expected 70)`);
    if (Math.abs(smoothed.vata - 70) < 1) console.log("✅ Vata Momentum Passed");

    // Ojas: Momentum 0.9 -> (70 * 0.9) + (150 * 0.1) = 63 + 15 = 78.
    console.log(`Ojas: ${previousState.ojas} -> ${smoothed.ojas} (Expected 78)`);
    if (Math.abs(smoothed.ojas - 78) < 1) console.log("✅ Ojas Momentum Passed");

    // Stress: Momentum 0.75 -> (40 * 0.75) + (150 * 0.25) = 30 + 37.5 = 67.5.
    // Delta (27.5) > 20 -> Capped to 40 + 20 = 60.
    console.log(`Stress: ${previousState.stress} -> ${smoothed.stress} (Expected 60 due to Drift Cap)`);
    if (Math.abs(smoothed.stress - 60) < 1) console.log("✅ Stress Momentum & Drift Cap Passed");

    // Scenario 2: Test Daily Drift Cap (Direct forced change > 20)
    // We simulate this by mocking a very low momentum or high target in a single step
    // Using a custom test state to trigger the cap
    const capTestState: VedaState = { ...previousState, vata: 300 }; // Target 100 after clamp
    // If delta > 20, it should be capped.
    // Normalized delta for Vata (0.8 momentum) from 50 to 100 is 10. (Not capped)
    // Let's try Ojas from 10 to 100. Smooth: (10 * 0.9) + (100 * 0.1) = 9 + 10 = 19. (Not capped)

    // To trigger cap, we'd need a very large smoothed jump.
    // The current formula (0.9/0.1) makes it hard to hit 20 in one step unless the gap is > 200.
    // BUT since we clamp the input to 100, the max gap is 100.
    // Max delta for 0.7 momentum (Mental) on 0 -> 100 is 30. (THIS SHOULD TRIGGER CAP to 20)

    const stressJump: VedaState = { ...previousState, stress: 0 };
    const stressJumpTarget: VedaState = { ...previousState, stress: 100 };
    const smoothedJump = applyMomentum({ ...previousState, stress: 0 }, { ...previousState, stress: 100 });

    console.log(`\nScenario: Drift Cap (Stress 0 -> 100)`);
    // (0 * 0.75) + (100 * 0.25) = 25. Delta (25) > 20. Expected: 20.
    console.log(`Stress Result: ${smoothedJump.stress} (Expected 20 due to Drift Cap)`);
    if (smoothedJump.stress === 20) console.log("✅ Daily Drift Cap Passed");

    console.log("\n✨ Biological Safety Verification Complete.");
}

testMomentum();
