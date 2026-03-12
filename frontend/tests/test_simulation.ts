import { simulateTrajectory } from '../src/engine/simulationEngine';
import { defaultState } from '../src/engine/stateModel';
import { VedaState } from '../src/types/physiologyState';

async function runSimulationTest() {
    console.log("=== Forward Physiological Simulation Test ===");

    // Simulate 7 days of late sleep (e.g., watching screens until 2 AM)
    const initialState: VedaState = { ...defaultState };
    const habits = ['late_sleep'];
    const daysToSimulate = 7;
    const performedAt = "02:00"; // Severe circadian drag

    console.log(`Initial Agni: ${initialState.agni}`);
    console.log(`Initial Circadian: ${initialState.circadian}`);
    console.log(`Initial Vata: ${initialState.vata}`);
    console.log("Simulating 7 days of late sleep at 2 AM...\n");

    const trajectory = await simulateTrajectory(initialState, habits, daysToSimulate, performedAt);

    trajectory.forEach((state, index) => {
        console.log(`Day ${index + 1}:`);
        console.log(`  Agni: ${state.agni.toFixed(1)}`);
        console.log(`  Circadian: ${state.circadian.toFixed(1)}`);
        console.log(`  Vata: ${state.vata.toFixed(1)}`);
        console.log(`  Ama: ${state.ama.toFixed(1)}`);
        console.log(`  Ojas: ${state.ojas.toFixed(1)}\n`);
    });

    const finalState = trajectory[trajectory.length - 1];
    
    // Assertions
    if (finalState.ojas < initialState.ojas) {
        console.log("✅ Simulation accurately depleted Ojas over time.");
    } else {
        console.error("❌ Simulation failed to deplete Ojas.");
    }

    if (finalState.circadian < initialState.circadian) {
        console.log("✅ Simulation accurately depleted Circadian rhythm due to persistent drag.");
    } else {
        console.error("❌ Simulation failed to deplete Circadian rhythm.");
    }

    if (finalState.vata > initialState.vata) {
        console.log("✅ Simulation accurately increased Vata state.");
    } else {
        console.error("❌ Simulation failed to increase Vata.");
    }
}

runSimulationTest().catch(console.error);
