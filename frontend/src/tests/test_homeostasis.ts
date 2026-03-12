import { defaultState } from '../engine/stateModel';
import { applyGlobalHomeostasis } from '../engine/globalHomeostasisEngine';

/**
 * test_homeostasis.ts
 * 
 * Verifies the Global Homeostasis Engine's ability to pull extreme states
 * back toward equilibrium over many cycles.
 */

async function runTest() {
    console.log("--- START GLOBAL HOMEOSTASIS TEST ---");

    // 1. Setup a pathological state (Extreme Vata drift)
    let state = { ...defaultState, vata: 95, pitta: 65, kapha: 25 };
    
    console.log(`Initial State: Vata=${state.vata}, Pitta=${state.pitta}, Kapha=${state.kapha}`);

    // 2. Simulate 50 cycles of homeostasis correction without other signals
    console.log("\nSimulating 50 cycles of systemic restoration...");
    
    for (let i = 1; i <= 50; i++) {
        state = applyGlobalHomeostasis(state);
        
        if (i % 10 === 0) {
            console.log(`Cycle ${i}: Vata=${state.vata.toFixed(1)}, Pitta=${state.pitta.toFixed(1)}, Kapha=${state.kapha.toFixed(1)}`);
        }
    }

    // 3. Verification
    // With 3% correction per cycle, state should be significantly closer to baseline (50/30/20 in this case for prakriti)
    // Wait, let's check baseline in stateModel: 
    // prakriti_vata: 50, prakriti_pitta: 30, prakriti_kapha: 20
    
    const vataBaseline = 50;
    const pittaBaseline = 30;
    const kaphaBaseline = 20;

    console.log(`\nFinal State: Vata=${state.vata.toFixed(1)}, Pitta=${state.pitta.toFixed(1)}, Kapha=${state.kapha.toFixed(1)}`);
    console.log(`Baselines: Vata=${vataBaseline}, Pitta=${pittaBaseline}, Kapha=${kaphaBaseline}`);

    const vataDiff = Math.abs(state.vata - vataBaseline);
    const pittaDiff = Math.abs(state.pitta - pittaBaseline);
    const kaphaDiff = Math.abs(state.kapha - kaphaBaseline);

    if (vataDiff < 15 && pittaDiff < 15 && kaphaDiff < 15) {
        console.log("✅ SUCCESS: Homeostasis effectively reduced extreme drift over time.");
    } else {
        console.log("❌ FAILURE: Homeostasis did not correct the state sufficiently.");
    }

    console.log("--- TEST COMPLETE ---");
}

runTest();
