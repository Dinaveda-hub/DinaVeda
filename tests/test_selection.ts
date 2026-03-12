import { selectProtocols } from '../frontend/src/engine/protocolSelectionEngine';
import { defaultState, VedaState } from '../frontend/src/engine/stateModel';

function testSelection() {
    console.log("--- Dinaveda Protocol Selection & Conflict Verification ---");

    // 1. Test Conflict Resolution
    // We need to trigger rules that would normally select both light_dinner and heavy_nourishing_meal
    // Actually, let's just mock the state if needed, or find rules.
    // light_dinner is often triggered by "High Ama" or "Low Agni".
    // heavy_nourishing_meal might be triggered by "High Vata".

    // For testing, we can manually trigger many rules to hit the 10 limit.
    const extremeState: VedaState = {
        ...defaultState,
        vata: 80,
        pitta: 80,
        kapha: 80,
        agni: 30,
        ama: 60,
        stress: 80,
        sleep: 30,
        circadian: 20
    };

    console.log("\nScenario 1: Overload Protection (Max 10)");
    const protocols = selectProtocols(extremeState);
    console.log(`Total Protocols Selected: ${protocols.length}`);
    if (protocols.length <= 10) {
        console.log("✅ MAX_PROTOCOLS limit respected.");
    } else {
        console.log("❌ Overload Protection Failed!");
    }

    console.log("\nScenario 2: Conflict Resolution (light_dinner vs heavy_nourishing_meal)");
    // We'll check if both exist in a state that should trigger many.
    // If our rules are balanced, they might conflict.
    // Let's check for specific names.
    const names = protocols.map(p => p.name);
    const hasLight = names.includes("light_dinner");
    const hasHeavy = names.includes("heavy_nourishing_meal");

    if (hasLight && hasHeavy) {
        console.log("❌ Conflict Resolution Failed: Both light_dinner and heavy_nourishing_meal present.");
    } else {
        console.log("✅ Conflict Resolution Passed: No mutually exclusive protocols detected.");
    }

    console.log("\nScenario 3: Deterministic Sorting");
    const names2 = selectProtocols(extremeState).map(p => p.name);
    const isEqual = JSON.stringify(names) === JSON.stringify(names2);
    if (isEqual) {
        console.log("✅ Selection is deterministic.");
    } else {
        console.log("❌ Selection is non-deterministic!");
    }

    console.log("\n✨ Protocol Selection Verification Complete.");
}

testSelection();
