import { applySignals } from '../engine/stateUpdater';
import { defaultState } from '../engine/stateModel';
import { runPhysiologyCycle } from '../engine/physiologyOrchestrator';

async function verifyLatentAxes() {
    console.log("=== Latent Health Axes Engine Verification ===\n");

    const initialState = { ...defaultState };

    console.log("1. Base Axes State:", {
        vata: initialState.vata_axis,
        pitta: initialState.pitta_axis,
        kapha: initialState.kapha_axis,
        agni: initialState.agni_axis,
        ojas: initialState.ojas_axis
    });

    // Apply a signal known to affect Vata and Ojas
    const { state: newState } = await applySignals(['high_stress'], initialState);

    console.log("\n2. Axes After 'high_stress' Signal:");
    console.log({
        vata: newState.vata_axis,
        pitta: newState.pitta_axis,
        kapha: newState.kapha_axis,
        agni: newState.agni_axis,
        ojas: newState.ojas_axis
    });

    console.log("\n3. Derived Variables (Computed via Engine):");
    console.log({
        stress: newState.stress,
        sleep: newState.sleep,
        mental_clarity: newState.mental_clarity,
        energy: newState.energy
    });

    // Verify mathematical bounds
    const isStressElevated = newState.stress > initialState.stress;
    const isSleepReduced = newState.sleep < initialState.sleep;

    console.log("\n4. Verification Status:");
    console.log(`Stress Increased: ${isStressElevated ? '✅' : '❌'}`);
    console.log(`Sleep Reduced: ${isSleepReduced ? '✅' : '❌'}`);

    if (isStressElevated && isSleepReduced) {
        console.log("\n✅ Latent Axis Architecture is functioning correctly.");
    } else {
        console.log("\n❌ Tests failed. Underlying mapping is incorrect.");
        process.exit(1);
    }
}

verifyLatentAxes().catch(console.error);
