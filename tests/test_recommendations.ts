import { RecommendationEngine } from '../frontend/src/engine/recommendationEngine';
import { VedaState } from '../frontend/src/engine/stateModel';
import { VikritiMetrics } from '../frontend/src/engine/vikritiEngine';

const testState: VedaState = {
    vata: 80, // High Vata (+30)
    stress: 70, // High Stress (+30)
    sleep: 45, // Low Sleep
    prakriti_vata: 50,
    prakriti_pitta: 30,
    prakriti_kapha: 20,
    // Add other required fields for VedaState if necessary, 
    // but the engine uses indexed access or defaults.
} as any;

const testVikriti: VikritiMetrics = {
    vata_diff: 30,
    pitta_diff: 0,
    kapha_diff: 0,
    drift_index: 10,
    dominant_dosha: 'Vata'
};

const engine = new RecommendationEngine();
const recs = engine.getRecommendations(testState, testVikriti);

console.log("TOP RECOMMENDATIONS:");
recs.slice(0, 5).forEach((p: any) => {
    console.log(`- ${p.name}: Score ${p.score.toFixed(4)}`);
});
