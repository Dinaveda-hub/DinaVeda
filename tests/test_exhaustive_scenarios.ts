import { selectProtocols, Protocol } from '../frontend/src/engine/protocolSelectionEngine';
import { defaultState, VedaState } from '../frontend/src/engine/stateModel';
import { PredictionEngine, StateSnapshot } from '../frontend/src/engine/predictionEngine';

// --- MOCK STORAGE ---
const mockStorage: Record<string, string> = {};
(global as any).localStorage = {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, value: string) => { mockStorage[key] = value; },
};
(global as any).window = {
    localStorage: (global as any).localStorage
};

function setupTrendHistory(variable: string, startValue: number, changePerDay: number) {
    const history: StateSnapshot[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        const state: any = { ...defaultState };
        state[variable] = startValue + ((6 - i) * changePerDay);
        history.push({ date: dateString, state: state });
    }
    mockStorage['veda_state_history'] = JSON.stringify(history);
}

// --- TEST RUNNER ---
function runScenario(name: string, state: VedaState, description: string) {
    console.log(`\n=== SCENARIO: ${name} ===`);
    console.log(`Physiology: ${description}`);
    const results = selectProtocols(state);

    console.log(`Top 5 Recommendations:`);
    results.slice(0, 5).forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} (${p.category})`);
    });

    // Validations
    return { name, results };
}

async function startExhaustiveTest() {
    console.log("--- Dinaveda Exhaustive Physiological Optimization Test Suite ---");

    // Clear history for baseline tests
    mockStorage['veda_state_history'] = "[]";

    // 1. DOSHA PERMUTATIONS
    runScenario("High Vata", { ...defaultState, vata: 75, prakriti_vata: 50 }, "Acute Vata elevation (Dryness/Air)");
    runScenario("High Pitta", { ...defaultState, pitta: 75, prakriti_pitta: 30 }, "Acute Pitta elevation (Heat/Fire)");
    runScenario("High Kapha", { ...defaultState, kapha: 75, prakriti_kapha: 20 }, "Acute Kapha elevation (Heavy/Water)");

    runScenario("Vata-Pitta Duo", { ...defaultState, vata: 65, pitta: 65, prakriti_vata: 50, prakriti_pitta: 30 }, "Heat + Wind elevation");
    runScenario("Pitta-Kapha Duo", { ...defaultState, pitta: 65, kapha: 65, prakriti_pitta: 30, prakriti_kapha: 20 }, "Heat + Heaviness (Dampness)");

    // 2. STRUCTURAL VARIABLES
    runScenario("High Ama (Accumulation)", { ...defaultState, ama: 75 }, "High metabolic waste");
    runScenario("Low Agni (Weak Digestion)", { ...defaultState, agni: 30 }, "Weak digestive fire");
    runScenario("Low Ojas (Depletion)", { ...defaultState, ojas: 35 }, "Low vitality reserves");

    // 3. ACUTE / INFLAMMATORY STATES
    runScenario("High Stress", { ...defaultState, stress: 80 }, "Acute mental/nervous load");
    runScenario("High Inflammation", { ...defaultState, inflammation: 75, pitta: 60 }, "High Pitta + systemic inflammation");
    runScenario("Acute Sleep Debt", { ...defaultState, sleep: 35 }, "Severe sleep deprivation");

    // 4. SAFETY EDGE CASES
    runScenario("Sleep Deprived + Kapha Heavy", { ...defaultState, sleep: 40, kapha: 80 }, "Should NOT recommend vigorous exercise despite High Kapha");
    runScenario("Extreme Pitta + Weak Agni", { ...defaultState, pitta: 85, agni: 35 }, "Should favor cooling but light protocols");
    runScenario("High Ama + Low Ojas", { ...defaultState, ama: 80, ojas: 30 }, "Should NOT recommend heavy nourishing meals");

    // 5. TREND-BASED PREDICTIONS
    console.log("\n--- ENTERING PREDICTIVE SCENARIOS ---");
    setupTrendHistory('stress', 40, 6); // 40 -> 76 over 6 days (Rising Stress)
    runScenario("Rising Stress Trend", { ...defaultState, stress: 76 }, "Stress is building sharply");

    setupTrendHistory('sleep', 70, -7); // 70 -> 28 over 6 days (Sleep Crash)
    runScenario("Sleep Crash Trend", { ...defaultState, sleep: 28 }, "Sleep quality is plummeting");

    setupTrendHistory('ojas', 65, -5); // 65 -> 35 over 6 days (Ojas Decline)
    runScenario("Ojas Depletion Trend", { ...defaultState, ojas: 35 }, "Vitality reserves are leaking");

    // 6. CONFLICT RESOLUTION
    console.log("\n--- CONFLICT RESOLUTION TEST ---");
    // Force a state that triggers both light_dinner and heavy_nourishing_meal candidates
    const conflictState: VedaState = { ...defaultState, ama: 60, ojas: 35, kapha: 60 };
    const conflictResults = runScenario("Conflict Detection", conflictState, "Testing exclusion of light_dinner vs heavy_nourishing_meal");

    const hasLight = conflictResults.results.some(p => p.name === 'light_dinner');
    const hasHeavy = conflictResults.results.some(p => p.name === 'heavy_nourishing_meal');

    if (hasLight && hasHeavy) {
        console.log("❌ CONFLICT FAILURE: Both light_dinner and heavy_nourishing_meal selected.");
    } else {
        console.log("✅ CONFLICT SUCCESS: Mutual exclusivity maintained.");
    }

    console.log("\n--- Exhaustive testing complete. ---");
}

startExhaustiveTest();
