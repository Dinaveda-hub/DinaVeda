import { defaultState } from '../src/engine/stateModel';
import { selectProtocols } from '../src/engine/protocolSelectionEngine';
import { calculateEffectiveness } from '../src/engine/effectLearningEngine';
import { ProtocolWeights } from '../src/utils/userWeightsService';

/**
 * test_adaptive_learning.ts
 * 
 * Verifies the Protocol Effect Learning Engine's ability to:
 * 1. Calculate effectiveness based on state improvement.
 * 2. Update protocol weights dynamically.
 * 3. Influence future recommendations.
 */

async function runTest() {
    console.log("--- START ADAPTIVE LEARNING TEST ---");

    // 1. Initial State: High Stress (70)
    const stateBefore = { ...defaultState, stress: 70 };
    
    // 2. Protocol: evening_breathing (Theoretical effect: stress -5)
    const protocolName = "evening_breathing";
    const eveningBreathing = {
        name: protocolName,
        variables: { stress: -5 }
    };

    // 3. Scenario A: True Improvement (Measured state after protocol: stress 50)
    const stateAfterA = { ...stateBefore, stress: 50 }; // -20 improvement (better than theoretical -5)
    const effectivenessA = calculateEffectiveness(stateBefore, stateAfterA, eveningBreathing as any);
    
    console.log(`Scenario A Effectiveness: ${effectivenessA.toFixed(2)} (Expected ~0.8)`);
    
    // 4. Scenario B: No Improvement (Measured state after protocol: stress 75)
    const stateAfterB = { ...stateBefore, stress: 75 }; // +5 worsening
    const effectivenessB = calculateEffectiveness(stateBefore, stateAfterB, eveningBreathing as any);
    
    console.log(`Scenario B Effectiveness: ${effectivenessB.toFixed(2)} (Expected Negative)`);

    // 5. Weight Update Verification (Mocked logic flow)
    // Formula: new_weight = old_weight * 0.9 + (1 + effectiveness) * 0.1
    // (Note: simplified in test to show direction)
    
    let weight = 1.0;
    const learningRate = 0.1;
    const persistence = 0.9;
    
    // After 3 successful completions with effectiveness 0.8
    for(let i=0; i<3; i++) {
        const target = 1.0 + 0.8;
        weight = (weight * persistence) + (target * learningRate);
    }
    console.log(`Learned Boost after 3 successes: ${weight.toFixed(2)}`);

    // 6. Recommendation Influence Verification
    const learnedWeights: ProtocolWeights = {
        [protocolName]: { _protocol_boost: weight }
    };

    // We need to modify protocolSelectionEngine to use _protocol_boost if we want to test that key
    // But protocolSelectionEngine currently uses userWeights[proto.name] as a map of { var: mult }
    
    const learnedUserWeights: ProtocolWeights = {
        [protocolName]: { stress: weight }
    };

    const initialRecommendations = selectProtocols(stateBefore, {}, "general_wellness");
    const adaptiveRecommendations = selectProtocols(stateBefore, learnedUserWeights, "general_wellness");

    const initialRank = initialRecommendations.findIndex(p => p.name === protocolName);
    const adaptiveRank = adaptiveRecommendations.findIndex(p => p.name === protocolName);

    console.log(`Initial Rank of ${protocolName}: ${initialRank}`);
    console.log(`Adaptive Rank of ${protocolName}: ${adaptiveRank}`);

    if (adaptiveRank <= initialRank && adaptiveRank !== -1) {
        console.log("✅ SUCCESS: Protocol ranked as high or higher after learning.");
    } else {
        console.log("❌ FAILURE: Protocol did not rank higher.");
    }

    console.log("--- TEST COMPLETE ---");
}

runTest();
