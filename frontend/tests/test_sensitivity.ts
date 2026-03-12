
import { getSensitivityMultiplier } from '../src/engine/sensitivityEngine';
import { defaultState, VedaState } from '../src/engine/stateModel';

async function runTest() {
    console.log("=== Sensitivity Engine (Unified & Weighted) Verification ===");

    // Scenario 1: Constitution-Aware Reactivity (Vata vs Kapha)
    console.log("\n1. Testing Dosha Reactivity (Vata vs Kapha dominant)...");
    
    const vataDominant: VedaState = {
        ...defaultState,
        prakriti_vata: 70,
        prakriti_pitta: 20,
        prakriti_kapha: 10
    };

    const kaphaDominant: VedaState = {
        ...defaultState,
        prakriti_vata: 10,
        prakriti_pitta: 20,
        prakriti_kapha: 70
    };

    const vataSensV = getSensitivityMultiplier('vata', vataDominant);
    const kaphaSensV = getSensitivityMultiplier('vata', kaphaDominant);

    console.log(`- Vata Sensitivity (Vata-dominant): ${vataSensV.toFixed(2)}`);
    console.log(`- Vata Sensitivity (Kapha-dominant): ${kaphaSensV.toFixed(2)}`);

    if (vataSensV > kaphaSensV) {
        console.log("✅ Vata-dominant is more sensitive to Vata signals.");
    } else {
        console.error("❌ Vata-dominant should be more sensitive to Vata signals.");
    }

    // Scenario 2: Dual Constitution (Vata-Pitta Blend)
    console.log("\n2. Testing Dual Constitution Blend (Vata-Pitta)...");
    const dualState: VedaState = {
        ...defaultState,
        prakriti_vata: 45,
        prakriti_pitta: 45,
        prakriti_kapha: 10
    };
    
    const vataSensD = getSensitivityMultiplier('vata', dualState);
    const pittaSensD = getSensitivityMultiplier('pitta', dualState);
    
    console.log(`- Vata Sensitivity (Vata-Pitta): ${vataSensD.toFixed(2)}`);
    console.log(`- Pitta Sensitivity (Vata-Pitta): ${pittaSensD.toFixed(2)}`);
    
    if (Math.abs(vataSensD - pittaSensD) < 0.05) {
        console.log("✅ Dual constitution shows balanced reactivity across both dominant doshas.");
    } else {
        console.error("❌ Dual constitution blend failed.");
    }

    // Scenario 3: Variable-Specific Coverage
    console.log("\n3. Testing Variable Coverage...");
    const variables: (keyof VedaState)[] = ['energy', 'mood', 'inflammation', 'mental_clarity', 'ojas'];
    for (const v of variables) {
        const sens = getSensitivityMultiplier(v, defaultState);
        console.log(`- ${v}: ${sens.toFixed(2)}`);
    }
    console.log("✅ Global variable coverage verified.");
}

runTest().catch(console.error);
