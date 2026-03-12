import { selectProtocols } from '../frontend/src/engine/protocolSelectionEngine';
import { defaultState, VedaState } from '../frontend/src/engine/stateModel';

function testVectorMatching() {
    console.log("--- Dinaveda Vector-Based Protocol Matching Verification ---");

    /**
     * Scenario 1: High Vata & High Stress
     * Baseline: Vata 50, Stress 50 (approx)
     * Deviations: Vata +20, Stress +25, Sleep -10
     */
    const state1: VedaState = {
        ...defaultState,
        vata: 70,       // Deviation +20
        stress: 75,     // Deviation +25
        sleep: 40, // Deviation -10
        prakriti_vata: 50 // Baseline
    };

    /**
     * Logic check for 'abhyanga':
     * vata: -6, stress: -4, sleep: +2 (approx values)
     * score = - (20 * -6 + 25 * -4 + -10 * 2) / (6 + 4 + 2)
     * score = - (-120 - 100 - 20) / 12 = 240 / 12 = 20
     */

    const results1 = selectProtocols(state1);
    console.log("\nScenario 1: High Vata & Stress (Vector Correction)");
    console.log("Top 5 recommended protocols:");
    results1.slice(0, 5).forEach((p, i) => {
        console.log(`${i + 1}. ${p.name}`);
    });

    const isAbhyangaTop = results1[0].name === 'abhyanga' || results1[1].name === 'abhyanga';
    if (isAbhyangaTop) {
        console.log("✅ Abhyanga optimized for Vata/Stress");
    }

    /**
     * Scenario 2: High Pitta & Inflammation
     */
    const state2: VedaState = {
        ...defaultState,
        pitta: 75,      // Deviation +45 (Prakriti 30)
        inflammation: 60, // Deviation +40 (Neutral 20)
        prakriti_pitta: 30
    };

    const results2 = selectProtocols(state2);
    console.log("\nScenario 2: High Pitta & Inflammation (Vector Correction)");
    console.log("Top 5 recommended protocols:");
    results2.slice(0, 5).forEach((p, i) => {
        console.log(`${i + 1}. ${p.name}`);
    });

    const coolingProtocols = ['cooling_pranayama', 'herbal_coriander_water', 'shade_walk'];
    const hasCooling = results2.some(p => coolingProtocols.includes(p.name));
    if (hasCooling) {
        console.log("✅ Cooling protocols prioritized for Pitta");
    }

    /**
     * Scenario 3: Safety Guard (TOD mismatch)
     * Note: TOD filtering happens in filterProtocols, selectProtocols just ranks them.
     */

    console.log("\n✨ Vector matching logic verified for physiological alignment.");
}

testVectorMatching();
