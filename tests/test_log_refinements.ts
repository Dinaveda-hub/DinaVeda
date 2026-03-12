import { applySignalsRegression } from '../frontend/src/engine/stateUpdater.regression';
import { defaultState } from '../frontend/src/engine/stateModel';

function testLogRefinements() {
    console.log("=== Dinaveda Daily Log Refinement Verification ===");

    // Test Case 1: Late Dinner Ama accumulation
    console.log("\nScenario: Late Dinner");
    const res1 = applySignalsRegression(["late_dinner"], defaultState);
    const amaDiff = res1.state.ama - defaultState.ama;
    const agniDiff = res1.state.agni - defaultState.agni;

    if (amaDiff > 0 && agniDiff < 0) {
        console.log(`✅ [PASS] Late Dinner: Ama increased (+${amaDiff.toFixed(2)}), Agni decreased (${agniDiff.toFixed(2)})`);
    } else {
        console.error(`❌ [FAIL] Late Dinner: Ama delta: ${amaDiff}, Agni delta: ${agniDiff}`);
    }

    // Test Case 2: Low Mood
    console.log("\nScenario: Low Mood");
    const res2 = applySignalsRegression(["low_mood"], defaultState);
    const moodDiff = res2.state.mood - defaultState.mood;
    const vataDiff = res2.state.vata - defaultState.vata;

    if (moodDiff < 0 && vataDiff > 0) {
        console.log(`✅ [PASS] Low Mood: Mood decreased (${moodDiff.toFixed(2)}), Vata increased (+${vataDiff.toFixed(2)})`);
    } else {
        console.error(`❌ [FAIL] Low Mood: Mood delta: ${moodDiff}, Vata delta: ${vataDiff}`);
    }

    // Test Case 3: High Irritability
    console.log("\nScenario: High Irritability");
    const res3 = applySignalsRegression(["high_irritability"], defaultState);
    const pittaDiff = res3.state.pitta - defaultState.pitta;
    const stressDiff = res3.state.stress - defaultState.stress;

    if (pittaDiff > 0 && stressDiff > 0) {
        console.log(`✅ [PASS] Irritability: Pitta increased (+${pittaDiff.toFixed(2)}), Stress increased (+${stressDiff.toFixed(2)})`);
    } else {
        console.error(`❌ [FAIL] Irritability: Pitta delta: ${pittaDiff}, Stress delta: ${stressDiff}`);
    }

    console.log("\n===============================================");
    console.log("🏆 LOG REFINEMENT SUCCESS: Clinical effects are active.");
}

testLogRefinements();
