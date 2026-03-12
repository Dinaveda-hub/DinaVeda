import { calculateDoshaPressure } from '../frontend/src/engine/doshaPressureEngine';
import { defaultState, VedaState } from '../frontend/src/engine/stateModel';
import { VikritiMetrics } from '../frontend/src/engine/vikritiEngine';

function testPressure() {
    console.log("--- Dinaveda Dosha Pressure Engine Verification ---");

    // Scenario 1: Day 1 (Snapshot)
    const vState1: VedaState = { ...defaultState, vata: 62, pitta: 34, kapha: 23 }; // Diff from prakriti: 12, 4, 3
    const vikriti1: VikritiMetrics = {
        vata_diff: 12,
        pitta_diff: 4,
        kapha_diff: 3,
        drift_index: 6.33,
        dominant_dosha: 'Vata'
    };

    const pressure1 = calculateDoshaPressure(vState1, vikriti1, []);
    console.log("\nScenario 1: Day 1 (Snapshot)");
    console.log(`Base Pressure: ${pressure1.base_pressure.toFixed(1)}`);
    console.log(`Category: ${pressure1.pressure_category}`);
    if (pressure1.base_pressure.toFixed(1) === "6.3") console.log("✅ Day 1 Base Pressure Passed");

    // Scenario 2: Day 10 (Persistence & Ties)
    // vata_diff = 40, pitta_diff = 40, kapha_diff = 40 
    const vikriti10: VikritiMetrics = {
        vata_diff: 40,
        pitta_diff: 40,
        kapha_diff: 40,
        drift_index: 30, // abs(80-50)
        dominant_dosha: 'Vata-Pitta-Kapha'
    };

    // Mock history: states that deviate from Prakriti
    // vata: 90 (90-50=40), pitta: 70 (70-30=40), kapha: 60 (60-20=40)
    // Avg Imbalance: 40.0
    const histState: VedaState = { ...defaultState, vata: 90, pitta: 70, kapha: 60 };
    const history = [histState, histState, histState];

    const pressure10 = calculateDoshaPressure(vState1, vikriti10, history);
    console.log("\nScenario 2: Day 10 (Persistence & Ties)");
    console.log(`Base Pressure: ${pressure10.base_pressure.toFixed(1)}`);
    console.log(`Dominant Pressure Dosha: ${pressure10.dominant_pressure_dosha}`);
    console.log(`Persistence Factor (implied): ${(pressure10.adjusted_pressure / pressure10.base_pressure).toFixed(2)}`);
    console.log(`Adjusted Pressure: ${pressure10.adjusted_pressure.toFixed(1)}`);

    if (pressure10.dominant_pressure_dosha === 'Vata-Pitta-Kapha') {
        console.log("✅ Tie-Aware Dominance Passed");
    }

    // recent_drift (average imbalance) = 40. Persistence = 1 + 40/200 = 1.2. 
    // Adjusted = 40 * 1.2 = 48.
    if (Math.abs(pressure10.adjusted_pressure - 48) < 1) {
        console.log("✅ Prakriti-Based Persistence Logic Passed");
    }

    console.log("\n✨ Dosha Pressure Refinement Verification Complete.");
}

testPressure();
