
import { validateLLMSignals } from '../src/engine/signalValidator';
import { filterByCooldown } from '../src/engine/signalCooldownEngine';

async function runTest() {
    console.log("=== Signal Input Layer Verification ===");

    // 1. Synonym Match Verification
    console.log("\n1. Testing Synonym & Canonical Matching...");
    const rawInputs = ["slept badly", "Anxiety", "CHEERFUL", "unknown_hallucination"];
    const validated = validateLLMSignals(rawInputs);
    
    console.log(`Input: [${rawInputs.join(", ")}]`);
    console.log(`Validated: [${validated.join(", ")}]`);
    
    const expected = ["poor_sleep", "high_stress", "positive_mood"];
    const allMatched = expected.every(sig => validated.includes(sig));
    
    if (allMatched && validated.length === 3) {
        console.log("✅ Synonyms and casing correctly mapped to canonical signals.");
    } else {
        console.error("❌ Signal mapping failed.");
    }

    // 2. Signal Cap Verification
    console.log("\n2. Testing MAX_SIGNALS_PER_PROMPT (Cap = 3)...");
    const manySignals = ["poor_sleep", "high_stress", "positive_mood", "late_dinner", "bloating_after_meal"];
    const capped = validateLLMSignals(manySignals);
    
    console.log(`Input size: ${manySignals.length}, Capped size: ${capped.length}`);
    if (capped.length === 3) {
        console.log("✅ Hard cap of 3 signals correctly enforced.");
    } else {
        console.error("❌ Signal cap failed.");
    }

    // 3. Cooldown Verification
    console.log("\n3. Testing Cooldown Filtering...");
    const signalsToTest = ["poor_sleep", "high_stress"];
    const now = Date.now();
    
    // Scenario: poor_sleep was applied 1 hour ago (cooldown 12h), high_stress was applied 10 hours ago (cooldown 3h)
    const lastApplied = {
        "poor_sleep": now - (1 * 3600000), // 1 hour ago
        "high_stress": now - (10 * 3600000) // 10 hours ago
    };
    
    const { filteredSignals, updatedMap } = filterByCooldown(signalsToTest, lastApplied);
    
    console.log(`Incoming: [${signalsToTest.join(", ")}]`);
    console.log(`Filtered: [${filteredSignals.join(", ")}]`);
    
    if (filteredSignals.includes("high_stress") && !filteredSignals.includes("poor_sleep")) {
        console.log("✅ Cooldown correctly blocked poor_sleep and allowed high_stress.");
    } else {
        console.error("❌ Cooldown logic failed.");
    }

    if (updatedMap["high_stress"] === now && updatedMap["poor_sleep"] === lastApplied["poor_sleep"]) {
        console.log("✅ Cooldown map updated correctly (only for allowed signals).");
    } else {
        console.error("❌ Cooldown map update failed.");
    }
}

runTest().catch(console.error);
