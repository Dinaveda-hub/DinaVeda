import { PredictionEngine, StateSnapshot } from '../frontend/src/engine/predictionEngine';
import { defaultState } from '../frontend/src/engine/stateModel';

// --- MOCK STORAGE ---
const mockStorage: Record<string, string> = {};
(global as any).localStorage = {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, value: string) => { mockStorage[key] = value; },
};

function setupTrendHistory(variable: string, startValue: number, changePerDay: number): StateSnapshot[] {
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
    return history;
}

function testPredictions() {
    console.log("=== Dinaveda Prediction Engine Verification Suite ===");
    const engine = new PredictionEngine();

    const scenarios = [
        {
            name: "Sleep Crash Risk",
            variable: "sleep",
            start: 70,
            delta: -7,
            expected: "sleep_crash_risk"
        },
        {
            name: "Stress Accumulating",
            variable: "stress",
            start: 40,
            delta: 6,
            expected: "stress_accumulating"
        },
        {
            name: "Ojas Decline",
            variable: "ojas",
            start: 65,
            delta: -5,
            expected: "ojas_decline"
        },
        {
            name: "Vata Rising",
            variable: "vata",
            start: 50,
            delta: 3,
            expected: "vata_rising"
        }
    ];

    let allPassed = true;

    for (const scenario of scenarios) {
        console.log(`\nScenario: ${scenario.name}`);
        const history = setupTrendHistory(scenario.variable, scenario.start, scenario.delta);
        
        // PredictionEngine.runPredictions(history)
        const predictions = engine.runPredictions(history);
        const matched = predictions.some(p => p.prediction === scenario.expected);

        if (matched) {
            console.log(`✅ [PASS] Prediction "${scenario.expected}" correctly triggered.`);
        } else {
            console.log(`❌ [FAIL] Prediction "${scenario.expected}" NOT triggered.`);
            console.log("Current Predictions:", predictions.map(p => p.prediction));
            allPassed = false;
        }
    }

    console.log("\n===============================================");
    if (allPassed) {
        console.log("🏆 PREDICTION ENGINE SUCCESS: Trends are accurate.");
        process.exit(0);
    } else {
        console.error("🚨 PREDICTION ENGINE FAILURE: Trend detection mismatch!");
        process.exit(1);
    }
}

testPredictions();
