import { filterByCooldown } from '../frontend/src/engine/signalCooldownEngine';

function testCooldown() {
    console.log("--- Dinaveda Signal Cooldown Verification ---");

    const MS_PER_HOUR = 3600000;
    const now = Date.now();

    // Initial State: No signals applied
    const initialMap: Record<string, number> = {};
    const signals = ["poor_sleep", "high_stress"];

    console.log("\nScenario 1: Initial Application");
    const result1 = filterByCooldown(signals, initialMap);
    console.log("Filtered Signals:", result1.filteredSignals);
    if (result1.filteredSignals.length === 2) console.log("✅ All signals accepted for first application.");

    console.log("\nScenario 2: Immediate Re-application (Blocked)");
    const result2 = filterByCooldown(["poor_sleep"], result1.updatedMap);
    console.log("Filtered Signals:", result2.filteredSignals);
    if (result2.filteredSignals.length === 0) console.log("✅ Repeated signal blocked within cooldown.");

    console.log("\nScenario 3: Application After 13 Hours (Accepted)");
    const oldMap = { "poor_sleep": now - (13 * MS_PER_HOUR) };
    const result3 = filterByCooldown(["poor_sleep"], oldMap);
    console.log("Filtered Signals:", result3.filteredSignals);
    if (result3.filteredSignals.length === 1) console.log("✅ Signal accepted after 12h cooldown expired.");

    console.log("\nScenario 4: Duplicate Signals in Same Message");
    const result4 = filterByCooldown(["poor_sleep", "poor_sleep", "high_stress"], initialMap);
    console.log("Filtered Signals:", result4.filteredSignals);
    if (result4.filteredSignals.length === 2 && result4.filteredSignals.filter(s => s === "poor_sleep").length === 1) {
        console.log("✅ Duplicates in same message successfully deduplicated.");
    }

    console.log("\nScenario 5: Variable Cooldowns (Stress 3h)");
    const stressMap = { "high_stress": now - (4 * MS_PER_HOUR) };
    const result5 = filterByCooldown(["high_stress"], stressMap);
    console.log("Filtered Signals:", result5.filteredSignals);
    if (result5.filteredSignals.length === 1) console.log("✅ Stress signal accepted after its specific 3h cooldown.");

    console.log("\n✨ Signal Cooldown Verification Complete.");
}

testCooldown();
