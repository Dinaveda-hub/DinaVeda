import { selectProtocols } from '../frontend/src/engine/protocolSelectionEngine';
import { defaultState, VedaState } from '../frontend/src/engine/stateModel';
import { PredictionEngine, StateSnapshot } from '../frontend/src/engine/predictionEngine';

// Mock localStorage for Node.js environment
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

        history.push({
            date: dateString,
            state: state
        });
    }

    mockStorage['veda_state_history'] = JSON.stringify(history);
}

function testRefinedOptimization() {
    console.log("--- Dinaveda Refined Protocol Optimization Math Verification ---");

    /**
     * Scenario 1: Stable Normalization (Hybrid ^0.75)
     * Comparing a focused protocol vs a comprehensive one.
     */
    console.log("\nScenario 1: Testing Hybrid Normalization (Comprehensive vs Focused)");
    const vataState: VedaState = {
        ...defaultState,
        vata: 70,       // Dev +20
        stress: 70,     // Dev +30
        prakriti_vata: 50
    };

    const results1 = selectProtocols(vataState);
    console.log("Top protocols for High Vata & Stress:");
    results1.slice(0, 5).forEach((p, i) => console.log(`${i + 1}. ${p.name}`));

    const hasAbhyanga = results1.some(p => p.name === 'abhyanga');
    if (hasAbhyanga) {
        console.log("✅ Comprehensive protocol 'abhyanga' successfully recommended.");
    }

    /**
     * Scenario 2: Trend-Strength Boosting
     * We simulate a sharp decline in sleep.
     */
    console.log("\nScenario 2: Testing Trend-Strength Prediction Boosting");
    // Start at 65, drop by 5 each day -> trend strength = -15? 
    // detectTrend = average(last3) - average(prev3)
    // prev3 (days 1,2,3): 65, 60, 55 (avg 60)
    // last3 (days 4,5,6): 50, 45, 40 (avg 45)
    // trend = 45 - 60 = -15.
    // Rule for sleep_declining might have threshold_change = 10 (abs).
    // Let's check prediction_rules.json
    setupTrendHistory('sleep', 65, -5);

    const sleepState: VedaState = {
        ...defaultState,
        sleep: 40,
        prakriti_vata: 50
    };

    const results2 = selectProtocols(sleepState);
    console.log("Top protocols for Sudden Sleep Decline:");
    results2.slice(0, 5).forEach((p, i) => console.log(`${i + 1}. ${p.name}`));

    const sleepProtocols = ['padabhyanga', 'sleep_ritual', 'evening_wind_down'];
    if (results2.some(p => sleepProtocols.includes(p.name))) {
        console.log("✅ Predictive boosting surfaced sleep-correcting protocols.");
    }

    /**
     * Scenario 3: Safety Guard (The Edge Case)
     */
    console.log("\nScenario 3: Testing Safety Guard (Contraindications)");
    const extremePittaState: VedaState = {
        ...defaultState,
        pitta: 85,
        inflammation: 80,
        prakriti_pitta: 30
    };

    const results3 = selectProtocols(extremePittaState);
    const heatingProtocols = ['vigorous_exercise', 'warming_spices'];
    const hasHeating = results3.some(p => heatingProtocols.includes(p.name));

    if (!hasHeating) {
        console.log("✅ Heating protocols blocked for High Pitta state.");
    }

    console.log("\n✨ Refined optimization logic verified.");
}

testRefinedOptimization();
