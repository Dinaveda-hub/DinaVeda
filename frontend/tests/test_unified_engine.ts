
import { selectProtocols } from '../src/engine/protocolSelectionEngine';
import { defaultState, VedaState } from '../src/engine/stateModel';

// Mock localStorage for repetition decay
(global as any).window = {};
const mockStorage: Record<string, string> = {};
(global as any).localStorage = {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, value: string) => { mockStorage[key] = value; },
};

async function runTest() {
    console.log("=== Unified Protocol Selection Engine Verification ===");

    // Scenario 1: Basic Vector Matching (Vata Imbalance)
    console.log("\n1. Testing Vector Matching (High Vata)...");
    const vataState: VedaState = {
        ...defaultState,
        vata: 75,
        prakriti_vata: 50
    };
    const recs1 = selectProtocols(vataState);
    console.log(`- Top protocol: ${recs1[0].name} (Score: ${recs1[0].score?.toFixed(2)})`);
    
    // Scenario 2: Rule Evaluation (Vikriti-based)
    // Rule: if vata_diff > 20 -> trigger specific protocols (if any in rules.json)
    // Looking at recommendation_rules.json, let's see what's there.
    // I recall rules support variables from both state and vikriti.
    console.log("\n2. Testing Rule Evaluation (Vikriti vs State)...");
    const stressState: VedaState = {
        ...defaultState,
        stress: 85 // Should trigger high stress rules
    };
    const recs2 = selectProtocols(stressState);
    const hasStressProtocol = recs2.some(p => p.category === 'mental_activation' || p.category === 'mental_alignment');
    console.log(`- Recommendations count: ${recs2.length}`);
    console.log(`- High Stress Protocol detected: ${hasStressProtocol}`);

    // Scenario 3: Repetition Decay
    console.log("\n3. Testing Repetition Decay...");
    const topProtocol = recs1[0].name;
    const initialScore = recs1[0].score || 0;
    
    // Mark top protocol as completed
    mockStorage['veda_checked_items'] = JSON.stringify([topProtocol]);
    
    const recs3 = selectProtocols(vataState);
    const repeatedProtocol = recs3.find(p => p.name === topProtocol);
    const newScore = repeatedProtocol?.score || 0;
    
    console.log(`- Protocol: ${topProtocol}`);
    console.log(`- Initial Score: ${initialScore.toFixed(2)}`);
    console.log(`- Score after completion (Decay): ${newScore.toFixed(2)}`);

    if (newScore < initialScore && Math.abs(newScore - (initialScore * 0.85)) < 0.05) {
        console.log("✅ Repetition Decay Verified (15% penalty applied).");
    } else {
        console.error("❌ Repetition Decay Failed.");
    }

    // Scenario 4: Baseline Hardening
    console.log("\n4. Testing Baseline Hardening...");
    // If prakriti_vata is missing, it should fallback to 50
    const missingPrakritiState: VedaState = {
        ...defaultState,
        vata: 75,
        prakriti_vata: undefined as any
    };
    const recs4 = selectProtocols(missingPrakritiState);
    console.log(`- Top protocol with fallback baseline: ${recs4[0].name}`);
    if (recs4[0].name === recs1[0].name) {
        console.log("✅ Baseline Hardening Verified (Falls back to defaultState).");
    } else {
        console.error("❌ Baseline Hardening Failed.");
    }
}

runTest().catch(console.error);
