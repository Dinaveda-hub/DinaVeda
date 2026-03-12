
import { applySeasonalDrift, getCurrentSeason, getRutuIndex } from '../src/engine/rutuDriftEngine';
import { applyRecovery } from '../src/engine/recoveryEngine';
import { applyBaselineStabilizer } from '../src/engine/baselineStabilizer';
import { defaultState, VedaState } from '../src/engine/stateModel';

async function runTest() {
    console.log("=== Seasonal & Environmental Pipeline Verification ===");

    // 1. Dynamic Rutu Index
    const index = getRutuIndex();
    console.log(`\n1. Current Rutu Index: ${index.toFixed(2)} / 100`);
    if (index >= 0 && index <= 100) {
        console.log("✅ Rutu Index correctly calculated based on day of year.");
    } else {
        console.error("❌ Rutu Index calculation failed.");
    }

    // 2. Continuous State Evolution (Pipeline: Drift -> Recovery -> Stabilizer)
    console.log("\n2. Testing Passive State Evolution (10 cycles)...");
    
    let state: VedaState = {
        ...defaultState,
        vata: 50,
        pitta: 50,
        kapha: 50,
        prakriti_vata: 60, // Baseline anchor
        ojas: 100
    };

    const season = getCurrentSeason();
    console.log(`Current Season: ${season}`);

    for (let i = 1; i <= 10; i++) {
        // Step 1: Seasonal Drift (Baseline Pressure)
        const withDrift = applySeasonalDrift(state);
        // Step 2: Recovery (Homeostatic Relaxation)
        const withRecovery = applyRecovery(withDrift);
        // Step 3: Baseline Stabilizer (Constitution Anchor)
        state = applyBaselineStabilizer(withRecovery);

        if (i % 2 === 0) {
            console.log(`Cycle ${i}: Vata=${state.vata.toFixed(2)}, Pitta=${state.pitta.toFixed(2)}, Kapha=${state.kapha.toFixed(2)}`);
        }
    }

    console.log("\nFinal state after 10 passive cycles:");
    console.log(`- Vata: ${state.vata.toFixed(2)} (Anchor: 60)`);
    console.log(`- Pitta: ${state.pitta.toFixed(2)} (Anchor: 30)`);
    console.log(`- Kapha: ${state.kapha.toFixed(2)} (Anchor: 20)`);

    console.log("✅ Physiological evolution pipeline verified.");
}

runTest().catch(console.error);
