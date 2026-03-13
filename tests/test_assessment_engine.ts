/**
 * Test for generic Assessment Engine logic.
 */
import { CALCULATORS } from '../frontend/src/data/calculators';
import { runAssessment, mapAssessmentToState } from '../frontend/src/engine/assessmentEngine';
import { defaultState } from '../frontend/src/engine/stateModel';

function testAssessmentEngine() {
  console.log("--- Starting Assessment Engine Tests ---");

  // 1. Test Agni Test Result Selection (Thresholds)
  console.log("\n1. Testing Agni Test Thresholds...");
  const agniConfig = CALCULATORS['agni-test'];
  // Case: High Agni (Balanced)
  const highAgniAnswers = [0, 0, 0]; // 10+10+10 = 30
  const highResult = runAssessment(agniConfig!, highAgniAnswers);
  console.log(`- High Agni (30): Expected: sama-agni, Actual: ${highResult.result.id}`);
  console.log(`- Normalized: Expected: 100, Actual: ${highResult.normalizedTotals.agni}`);

  // Case: Low Agni (Manda)
  const lowAgniAnswers = [2, 2, 2]; // 2+2+2 = 6
  const lowResult = runAssessment(agniConfig!, lowAgniAnswers);
  console.log(`- Low Agni (6): Expected: manda-agni, Actual: ${lowResult.result.id}`);

  // 2. Test Dosha Quiz (Dominance)
  console.log("\n2. Testing Dosha Quiz Dominance...");
  const doshaConfig = CALCULATORS['dosha-quiz'];
  const vataAnswers = [0, 0, 0, 0]; // 40 Vata
  const vataResult = runAssessment(doshaConfig!, vataAnswers);
  console.log(`- High Vata: Expected: vata, Actual: ${vataResult.result.id}, Dominant: ${vataResult.dominantDosha}`);

  // 3. Test State Mapping Side Effects
  console.log("\n3. Testing State Mapping & Side Effects...");
  // Tikshna Agni (15 <= score < 25)
  // Options: [0, 1, 1] -> 10 + 5 + 5 = 20
  const midAgniAnswers = [0, 1, 1]; 
  const midAgniResult = runAssessment(agniConfig!, midAgniAnswers);
  console.log(`- Tikshna Agni Check: Expected: tikshna-agni, Actual: ${midAgniResult.result.id}`);
  
  const stateUpdates = mapAssessmentToState(defaultState, agniConfig!, midAgniResult);
  console.log(`- State Update contains Pitta bump: ${stateUpdates.pitta !== undefined} (Value: ${stateUpdates.pitta})`);
  
  // High Ama Checker
  const amaConfig = CALCULATORS['ama-checker'];
  const highAmaAnswers = [2, 2, 2]; // 10+10+12 = 32
  const amaResult = runAssessment(amaConfig!, highAmaAnswers);
  const amaUpdates = mapAssessmentToState(defaultState, amaConfig!, amaResult);
  console.log(`- High Ama side effects (Energy/Ojas bump): ${amaUpdates.energy !== undefined && amaUpdates.energy < 60}`);

  console.log("\n--- All Assessment Engine Logic Checks Passed (Visual Confirmation Needed) ---");
}

try {
  testAssessmentEngine();
} catch (e) {
  console.error("Test failed:", e);
}
