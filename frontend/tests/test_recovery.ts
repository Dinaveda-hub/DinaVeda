
import { applyRecovery } from '../src/engine/recoveryEngine';
import { defaultState, VedaState } from '../src/engine/stateModel';

async function runTest() {
    console.log("=== Recovery Engine (Prakriti-Anchored) Verification ===");

    // Scenario 1: Vata recovery toward high Prakriti
    console.log("\n1. Testing Dosha Recovery (Toward Prakriti)...");
    const vataState: VedaState = {
        ...defaultState,
        vata: 50,
        prakriti_vata: 65, // User naturally high in Vata
        ojas: 100 // Full recovery strength
    };
    
    let state = vataState;
    console.log(`Initial Vata: ${state.vata}, Prakriti Vata: ${state.prakriti_vata}`);
    
    // Run 5 steps of recovery
    for (let i = 1; i <= 5; i++) {
        state = applyRecovery(state);
        console.log(`Step ${i}: Vata = ${state.vata.toFixed(2)}`);
    }
    
    if (state.vata > 50) {
        console.log("✅ Vata correctly recovering UP toward Prakriti (65).");
    } else {
        console.error("❌ Vata failed to recover toward Prakriti.");
    }

    // Scenario 2: Stress recovery toward 50
    console.log("\n2. Testing General Variable Recovery (Toward 50)...");
    const stressState: VedaState = {
        ...defaultState,
        stress: 80,
        ojas: 100
    };
    
    state = stressState;
    console.log(`Initial Stress: ${state.stress}`);
    for (let i = 1; i <= 5; i++) {
        state = applyRecovery(state);
        console.log(`Step ${i}: Stress = ${state.stress.toFixed(2)}`);
    }
    
    if (state.stress < 80) {
        console.log("✅ Stress correctly recovering DOWN toward 50.");
    } else {
        console.error("❌ Stress failed to recover.");
    }

    // Scenario 3: Low Ojas effect
    console.log("\n3. Testing Vitality Influence (Low Ojas)...");
    const lowOjasState: VedaState = {
        ...defaultState,
        stress: 80,
        ojas: 30 // Low vitality
    };
    
    const highOjasStep = stressState.stress - applyRecovery(stressState).stress;
    const lowOjasStep = lowOjasState.stress - applyRecovery(lowOjasState).stress;
    
    console.log(`High Ojas Step: ${highOjasStep.toFixed(2)}`);
    console.log(`Low Ojas Step: ${lowOjasStep.toFixed(2)}`);
    
    if (lowOjasStep < highOjasStep) {
        console.log("✅ Recovery speed significantly reduced at low Ojas.");
    } else {
        console.error("❌ Ojas scaling failed.");
    }
}

runTest().catch(console.error);
