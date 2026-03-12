/**
 * test_rutu_drift.ts
 *
 * Verifies the Rutu Drift Engine logic:
 * - Correct drift vectors are applied per season
 * - DRIFT_STRENGTH damping is respected
 * - Values are clamped to [0, 100]
 * - Optional intensity factor scales drift correctly
 */

import { applySeasonalDrift, Season, SeasonalContext } from '../frontend/src/engine/rutuDriftEngine';
import { defaultState } from '../frontend/src/engine/stateModel';

const DRIFT_STRENGTH = 0.2;

function assertEqual(label: string, actual: number, expected: number, tolerance = 0.01): void {
    const diff = Math.abs(actual - expected);
    const status = diff <= tolerance ? '✅ PASS' : '❌ FAIL';
    console.log(`  ${status} [${label}] actual=${actual.toFixed(3)}, expected=${expected.toFixed(3)}`);
}

console.log('\n══════════════════════════════════════════');
console.log('   RUTU DRIFT ENGINE — Regression Test   ');
console.log('══════════════════════════════════════════\n');

// ── Scenario 1: Varsha (Monsoon) — the most impactful season ──────────────────
console.log('Scenario 1: Varsha (Monsoon) — Vata +3, Pitta +1, Agni -3 (damped 0.2x)');
{
    const baseline = { ...defaultState, vata: 50, pitta: 50, kapha: 50, agni: 50 };
    const result = applySeasonalDrift(baseline, { season: 'varsha' });

    assertEqual('Vata  (50 + 3*0.2 = 50.6)', result.vata,  50.6);
    assertEqual('Pitta (50 + 1*0.2 = 50.2)', result.pitta, 50.2);
    assertEqual('Kapha (50 + 0*0.2 = 50.0)', result.kapha, 50.0);
    assertEqual('Agni  (50 - 3*0.2 = 49.4)', result.agni,  49.4);
}

// ── Scenario 2: Vasanta (Spring) — Kapha peaks, Agni weakens ─────────────────
console.log('\nScenario 2: Vasanta (Spring) — Kapha +3, Agni -1 (damped 0.2x)');
{
    const baseline = { ...defaultState, vata: 50, pitta: 50, kapha: 50, agni: 60 };
    const result = applySeasonalDrift(baseline, { season: 'vasanta' });

    assertEqual('Vata  (50 + 0)    = 50.0', result.vata,  50.0);
    assertEqual('Pitta (50 + 0)    = 50.0', result.pitta, 50.0);
    assertEqual('Kapha (50 + 0.6)  = 50.6', result.kapha, 50.6);
    assertEqual('Agni  (60 - 0.2)  = 59.8', result.agni,  59.8);
}

// ── Scenario 3: Hemanta (Early Winter) — Strong Agni ─────────────────────────
console.log('\nScenario 3: Hemanta (Early Winter) — Agni +2, Kapha +1, Pitta +1, Vata -1 (damped)');
{
    const baseline = { ...defaultState, vata: 50, pitta: 50, kapha: 50, agni: 50 };
    const result = applySeasonalDrift(baseline, { season: 'hemanta' });

    assertEqual('Vata  (50 - 0.2)  = 49.8', result.vata,  49.8);
    assertEqual('Pitta (50 + 0.2)  = 50.2', result.pitta, 50.2);
    assertEqual('Kapha (50 + 0.2)  = 50.2', result.kapha, 50.2);
    assertEqual('Agni  (50 + 0.4)  = 50.4', result.agni,  50.4);
}

// ── Scenario 4: Intensity Factor (1.3x — heavy monsoon) ─────────────────────
console.log('\nScenario 4: Varsha with intensity=1.3 (heavy monsoon)');
{
    const baseline = { ...defaultState, vata: 50, agni: 50 };
    const result = applySeasonalDrift(baseline, { season: 'varsha', intensity: 1.3 });

    // Vata: 50 + 3 * 0.2 * 1.3 = 50 + 0.78 = 50.78
    assertEqual('Vata  (50 + 0.78) = 50.78', result.vata, 50.78);
    // Agni: 50 - 3 * 0.2 * 1.3 = 50 - 0.78 = 49.22
    assertEqual('Agni  (50 - 0.78) = 49.22', result.agni, 49.22);
}

// ── Scenario 5: Clamping at boundaries ───────────────────────────────────────
console.log('\nScenario 5: Clamping — Agni near 0 during Varsha should not go below 0');
{
    const baseline = { ...defaultState, agni: 0.1 };
    const result = applySeasonalDrift(baseline, { season: 'varsha' });
    const isValid = result.agni >= 0;
    console.log(`  ${isValid ? '✅ PASS' : '❌ FAIL'} [Agni clamped >= 0] actual=${result.agni.toFixed(3)}`);
}

// ── Scenario 6: 30-day cumulative Varsha drift ───────────────────────────────
console.log('\nScenario 6: 30-day cumulative Varsha drift on a neutral baseline (50, 50)');
{
    let state = { ...defaultState, vata: 50, agni: 50 };
    for (let day = 0; day < 30; day++) {
        state = applySeasonalDrift(state, { season: 'varsha' }) as typeof state;
    }
    // Expected: Vata = 50 + (3*0.2) * 30 = 50 + 18 = 68 (unclamped)
    // But momentum is NOT applied in the engine itself (done in PhysiologyContext), so pure math:
    const expectedVata = Math.min(50 + 0.6 * 30, 100); // 68
    const expectedAgni = Math.max(50 - 0.6 * 30, 0);   // 32
    assertEqual(`Vata after 30 days = ${expectedVata}`, state.vata, expectedVata);
    assertEqual(`Agni after 30 days = ${expectedAgni}`, state.agni, expectedAgni);
}

console.log('\n════════════════════════════════════════════\n');
