import { selectProtocols } from '../src/engine/protocolSelectionEngine';
import { defaultState } from '../src/engine/stateModel';

console.log("=== Protocol Synergy Test ===");

// 1. Setup a state that favors Abhyanga and Warm Bath (Vata imbalance)
const vataImbalance = {
    ...defaultState,
    vata: 70,
    stress: 60,
    prakriti_vata: 50,
    prakriti_pitta: 50,
    prakriti_kapha: 50
};

console.log("Simulating Vata imbalance state...");
const finalProtocols = selectProtocols(vataImbalance);

console.log("\nTop recommended protocols (with score):");
finalProtocols.slice(0, 10).forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} (Score: ${(p as any).score.toFixed(2)})`);
});

const hasAbhyanga = finalProtocols.some(p => p.name === 'abhyanga');
const hasWarmBath = finalProtocols.some(p => p.name === 'warm_bath');

if (hasAbhyanga && hasWarmBath) {
    console.log("\n✅ Synergy Success: Both 'abhyanga' and 'warm_bath' are ranked together.");
} else {
    console.warn("\n⚠️ Synergy Check: One or both protocols missing from top list.");
}

// 2. Verify synergy between ginger_before_meal and light_dinner
const agniLow = {
    ...defaultState,
    agni: 40,
    ama: 40,
    kapha: 70,
    prakriti_vata: 50,
    prakriti_pitta: 50,
    prakriti_kapha: 50
};

console.log("\nSimulating Low Agni / High Ama state...");
const agniProtocols = selectProtocols(agniLow);

console.log("Top recommended protocols (with score):");
agniProtocols.slice(0, 15).forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} (Score: ${(p as any).score.toFixed(2)})`);
});

const ginger = agniProtocols.find(p => p.name === 'ginger_before_meal');
const lightDinner = agniProtocols.find(p => p.name === 'light_dinner');

console.log(`\nDiagnostics:`);
console.log(`- ginger_before_meal in list: ${!!ginger} (Score: ${(ginger as any)?.score?.toFixed(2) || 'N/A'})`);
console.log(`- light_dinner in list: ${!!lightDinner} (Score: ${(lightDinner as any)?.score?.toFixed(2) || 'N/A'})`);

if (ginger && lightDinner) {
    console.log("\n✅ Synergy Success: 'ginger_before_meal' and 'light_dinner' are ranked together.");
} else {
    console.warn("\n⚠️ Synergy Check: Ginger/Light Dinner pair missing from top list.");
}


