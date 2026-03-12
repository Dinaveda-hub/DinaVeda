
import { detectNotificationEvents, NotificationEvent } from '../src/engine/notificationEventEngine';
import { defaultState, VedaState } from '../src/engine/stateModel';

async function runTest() {
    console.log("=== Notification Event Engine Verification ===");

    // 1. Basic Threshold Test
    console.log("\n1. Testing Basic Thresholds (Vata & Stress)...");
    const stressedState: VedaState = {
        ...defaultState,
        vata: 75,
        stress: 72
    };
    const events1 = detectNotificationEvents(stressedState);
    console.log(`Detected Events: [${events1.join(", ")}]`);
    if (events1.includes("vata_imbalance") && events1.includes("stress_overload")) {
        console.log("✅ Basic thresholds correctly detected.");
    } else {
        console.error("❌ Basic threshold detection failed.");
    }

    // 2. Complex/Pattern Test (Kapha Stagnation)
    console.log("\n2. Testing Complex Patterns (Kapha Stagnation)...");
    const stagnantState: VedaState = {
        ...defaultState,
        kapha: 75,
        movement: 30
    };
    const events2 = detectNotificationEvents(stagnantState);
    console.log(`Detected Events: [${events2.join(", ")}]`);
    if (events2.includes("kapha_stagnation") && !events2.includes("kapha_accumulation")) {
        console.log("✅ Kapha stagnation pattern correctly resolved.");
    } else {
        console.error("❌ Kapha pattern resolution failed.");
    }

    // 3. Priority Sorting Test
    console.log("\n3. Testing Priority-Based Sorting...");
    const mixedState: VedaState = {
        ...defaultState,
        circadian: 50, // Priority 1
        ama: 50,      // Priority 2
        vata: 75      // Priority 3
    };
    const events3 = detectNotificationEvents(mixedState);
    console.log(`Detected Events (Sorted): [${events3.join(", ")}]`);
    
    const isSorted = events3[0] === "vata_imbalance" && events3[1] === "ama_accumulation" && events3[2] === "circadian_drift";
    if (isSorted) {
        console.log("✅ Events correctly sorted by priority (Highest first).");
    } else {
        console.error("❌ Priority sorting failed.");
    }

    // 4. Vitality/Secondary Markers
    console.log("\n4. Testing Secondary Markers (Ama, Ojas, Sleep Debt)...");
    const lowVitalityState: VedaState = {
        ...defaultState,
        ama: 60,
        ojas: 30,
        sleep: 40
    };
    const events4 = detectNotificationEvents(lowVitalityState);
    console.log(`Detected Events: [${events4.join(", ")}]`);
    if (events4.includes("ama_accumulation") && events4.includes("ojas_depletion") && events4.includes("sleep_debt")) {
        console.log("✅ Secondary physiological markers correctly detected.");
    } else {
        console.error("❌ Secondary marker detection failed.");
    }
}

runTest().catch(console.error);
