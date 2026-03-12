import { applySignalsRegression } from '../frontend/src/engine/stateUpdater.regression';
import { defaultState, VedaState } from '../frontend/src/engine/stateModel';
import { computeVikriti } from '../frontend/src/engine/vikritiEngine';
import { computeIPI } from '../frontend/src/engine/imbalancePressureEngine';

interface GoldenState {
    vata: number;
    pitta: number;
    kapha: number;
    agni: number;
    ojas: number;
    circadian: number;
    ipi: number;
}

const GOLDEN_STATES: Record<string, { signals: string[], expected: GoldenState }> = {
    "Standard Mix": {
        signals: ["poor_sleep", "late_dinner", "morning_exercise"],
        expected: {
            vata: 54.32,
            pitta: 50,
            kapha: 47.52,
            agni: 60,
            ojas: 67.48,
            circadian: 57.69,
            ipi: 19
        }
    },
    "High Stress": {
        signals: ["high_stress", "screen_fatigue", "caffeine_crash"],
        expected: {
            vata: 62.0,
            pitta: 62.0,
            kapha: 50,
            agni: 60,
            ojas: 60.76,
            circadian: 60,
            ipi: 23
        }
    }
};

function verifyState(name: string, actual: VedaState, actualIpi: number, expected: GoldenState) {
    console.log(`\n--- Verification: ${name} ---`);
    let passed = true;

    const checks: (keyof GoldenState)[] = ["vata", "pitta", "kapha", "agni", "ojas", "circadian", "ipi"];

    for (const key of checks) {
        const actualVal = (key === 'ipi') ? actualIpi : (actual as any)[key];
        const expectedVal = expected[key];
        const diff = Math.abs(actualVal - expectedVal);

        if (diff < 0.01) {
            console.log(`✅ ${key}: ${actualVal.toFixed(2)} (Match)`);
        } else {
            console.log(`❌ ${key}: ${actualVal.toFixed(2)} (Expected ${expectedVal.toFixed(2)}, Diff: ${diff.toFixed(4)})`);
            passed = false;
        }
    }

    return passed;
}

async function runRegressionSuite() {
    console.log("=== Dinaveda Deterministic Engine Regression Suite ===");
    let allPassed = true;

    for (const [name, data] of Object.entries(GOLDEN_STATES)) {
        const result = applySignalsRegression(data.signals, defaultState);
        const state = result.state;
        const vikriti = computeVikriti(state);
        const ipi = computeIPI(state, vikriti.drift_index);

        if (!verifyState(name, state, ipi, data.expected)) {
            allPassed = false;
        }
    }

    console.log("\n===============================================");
    if (allPassed) {
        console.log("🏆 ENGINE REGRESSION SUCCESS: Math is stable.");
        process.exit(0);
    } else {
        console.error("🚨 ENGINE REGRESSION FAILURE: Physiological drift detected!");
        process.exit(1);
    }
}

runRegressionSuite();
