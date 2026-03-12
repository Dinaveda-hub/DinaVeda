import { selectProtocols } from './frontend/src/engine/protocolSelectionEngine';
import { defaultState } from './frontend/src/engine/stateModel';

function testVectorScenarios() {
    // 1. Vata Spike Scenario
    // Input: sleep: poor (40), stress: high (80), hydration: low (40)
    // Note: 'stress' drives Vata up, poor sleep drives Vata up
    const vataState = {
        ...defaultState,
        sleep: 40,
        stress: 80,
        hydration: 40,
        vata: 80, // Simulate the spike directly for protocol match
        pitta: 50,
        kapha: 50
    };

    console.log("--- 1. Vata Spike Protocol Response ---");
    const vataProtocols = selectProtocols(vataState);
    console.log(vataProtocols.slice(0, 3).map(p => p.name));

    // 2. Kapha Spike Scenario
    // Input: late wake (circadian 40), heavy meals (ama 80), no activity (movement 20)
    const kaphaState = {
        ...defaultState,
        circadian: 40,
        ama: 80,
        movement: 20,
        kapha: 80, // Simulate spike
        vata: 50,
        pitta: 50
    };

    console.log("\n--- 2. Kapha Spike Protocol Response ---");
    const kaphaProtocols = selectProtocols(kaphaState);
    console.log(kaphaProtocols.slice(0, 3).map(p => p.name));

    // 3. Agni Drop Scenario
    // Input: bloating (80), low appetite (40), heavy coating (ama 80)
    const agniState = {
        ...defaultState,
        bloating: 80,
        appetite: 40,
        ama: 80,
        agni: 30 // Simulate Agni drop
    };

    console.log("\n--- 3. Agni Drop Protocol Response ---");
    const agniProtocols = selectProtocols(agniState);
    console.log(agniProtocols.slice(0, 3).map(p => p.name));
}

testVectorScenarios();
