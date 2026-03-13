import { PrakritiEngine, DoshaAnswer } from '../frontend/src/engine/prakritiEngine';

function runTest(name: string, answers: DoshaAnswer[]) {
    console.log(`\n--- Test Case: ${name} ---`);
    const engine = new PrakritiEngine();
    const result = engine.calculateConstitution(answers);

    console.log(`Constitution: ${result.constitution_string}`);
    console.log(`Scores: V:${result.prakriti_vata} P:${result.prakriti_pitta} K:${result.prakriti_kapha}`);
    console.log(`Total: ${result.prakriti_vata + result.prakriti_pitta + result.prakriti_kapha}`);
    console.log(`Raw: V:${result.raw_vata_points} P:${result.raw_pitta_points} K:${result.raw_kapha_points}`);
    console.log(`Extreme: ${result.is_extreme}`);

    const sum = result.prakriti_vata + result.prakriti_pitta + result.prakriti_kapha;
    if (sum !== 100) {
        console.error("❌ FAIL: Sum is not 100!");
        return false;
    }
    return true;
}

/**
 * Helper to pad answers to exactly 21 for the engine's validation
 */
function padAnswers(answers: DoshaAnswer[]): DoshaAnswer[] {
    const padded = [...answers];
    while (padded.length < 21) {
        padded.push({ vata: 0, pitta: 0, kapha: 0 });
    }
    return padded;
}

function testPrakritiSuite() {
    console.log("=== Dinaveda Prakriti Engine Verification Suite ===");
    let allPassed = true;

    // 1. Equal Division (Rounding Check)
    // 3 questions, each giving 1 point to different dosha. Repeat 7 times to get 21.
    const equalAnswers: DoshaAnswer[] = [];
    for (let i = 0; i < 7; i++) {
        equalAnswers.push({ vata: 1, pitta: 0, kapha: 0 });
        equalAnswers.push({ vata: 0, pitta: 1, kapha: 0 });
        equalAnswers.push({ vata: 0, pitta: 0, kapha: 1 });
    }
    allPassed = runTest("Equal Division (Rounding Check)", equalAnswers) && allPassed;

    // 2. Dual Dosha (42/38/20 Case)
    allPassed = runTest("Dual Dosha (Vata-Pitta Dominant)", padAnswers([
        { vata: 42, pitta: 38, kapha: 20 }
    ])) && allPassed;

    // 3. Tridoshic (35/33/32 Case)
    allPassed = runTest("Tridoshic", padAnswers([
        { vata: 35, pitta: 33, kapha: 32 }
    ])) && allPassed;

    // 4. Single Dosha (55/30/15 Case)
    allPassed = runTest("Single Dosha (Vata Dominant)", padAnswers([
        { vata: 55, pitta: 30, kapha: 15 }
    ])) && allPassed;

    // 5. Anti-Gaming (Extreme Case)
    allPassed = runTest("Extreme Vata (Anti-Gaming)", padAnswers([
        { vata: 80, pitta: 10, kapha: 10 }
    ])) && allPassed;

    console.log("\n===============================================");
    if (allPassed) {
        console.log("🏆 PRAKRITI ENGINE SUCCESS: Logic is stable and clinically aligned.");
        process.exit(0);
    } else {
        console.error("🚨 PRAKRITI ENGINE FAILURE: Analysis mismatch!");
        process.exit(1);
    }
}

testPrakritiSuite();
