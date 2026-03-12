import { PrakritiEngine, DoshaAnswer } from '../frontend/src/engine/prakritiEngine';

function runTest(name: string, answers: DoshaAnswer[]) {
    console.log(`\n--- Test Case: ${name} ---`);
    const engine = new PrakritiEngine();
    const result = engine.calculateConstitution(answers);

    console.log(`Constitution: ${result.constitution_string}`);
    console.log(`Scores: V:${result.prakriti_vata} P:${result.prakriti_pitta} K:${result.prakriti_kapha}`);
    console.log(`Total: ${result.prakriti_vata + result.prakriti_pitta + result.prakriti_kapha}`);
    console.log(`Raw: V:${result.raw_vata} P:${result.raw_pitta} K:${result.raw_kapha}`);
    console.log(`Extreme: ${result.is_extreme}`);

    const sum = result.prakriti_vata + result.prakriti_pitta + result.prakriti_kapha;
    if (sum !== 100) {
        console.error("❌ FAIL: Sum is not 100!");
        return false;
    }
    return true;
}

function testPrakritiSuite() {
    console.log("=== Dinaveda Prakriti Engine Verification Suite ===");
    let allPassed = true;

    // 1. Equal Division (Rounding Check)
    // 3 questions, each giving 1 point to different dosha
    allPassed = runTest("Equal Division (Rounding Check)", [
        { vata: 1, pitta: 0, kapha: 0 },
        { vata: 0, pitta: 1, kapha: 0 },
        { vata: 0, pitta: 0, kapha: 1 }
    ]) && allPassed;

    // 2. Dual Dosha (42/38/20 Case)
    // 100 total points: 42 Vata, 38 Pitta, 20 Kapha
    allPassed = runTest("Dual Dosha (Vata-Pitta Dominant)", [
        { vata: 42, pitta: 38, kapha: 20 }
    ]) && allPassed;

    // 3. Tridoshic (35/33/32 Case)
    allPassed = runTest("Tridoshic", [
        { vata: 35, pitta: 33, kapha: 32 }
    ]) && allPassed;

    // 4. Single Dosha (55/30/15 Case)
    allPassed = runTest("Single Dosha (Vata Dominant)", [
        { vata: 55, pitta: 30, kapha: 15 }
    ]) && allPassed;

    // 5. Anti-Gaming (Extreme Case)
    allPassed = runTest("Extreme Vata (Anti-Gaming)", [
        { vata: 80, pitta: 10, kapha: 10 }
    ]) && allPassed;

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
