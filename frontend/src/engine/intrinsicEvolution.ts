import { VedaState } from './stateModel';
import { ENGINE_CONFIG } from './config';

const { clamp } = ENGINE_CONFIG.ranges;
const { thresholds } = ENGINE_CONFIG;

/**
 * Models intrinsic physiological evolution (passive recovery and coupled decay).
 * This runs at the end of each simulation step (day).
 */
export function applyIntrinsicEvolution(state: VedaState): VedaState {
    const nextState = { ...state };

    // 1. Agni / Ama Coupling (The Core Metabolic Loop)
    if (state.agni < 60) {
        nextState.ama = clamp(state.ama + 1.2); // Low agni creates ama
    } else if (state.agni > 75) {
        nextState.ama = clamp(state.ama - 1.0); // Strong agni purges ama
    }

    // 2. Ojas / Stress Coupling (The Vitality Loop)
    if (state.stress > 65) {
        nextState.ojas = clamp(state.ojas - 0.5); // Burnout
    } else if (state.stress < 30 && state.mood > 70) {
        nextState.ojas = clamp(state.ojas + 0.5); // Accumulating vitality
    }

    // 3. Vata / Sleep Coupling (The Nervous System Loop)
    if (state.sleep < 40) {
        nextState.vata = clamp(state.vata + 1.5); // Nervous exhaustion
    }

    // 4. Circadian / Agni Coupling (The Chrono-Metabolic Loop)
    if (state.circadian < 45) {
        nextState.agni = clamp(state.agni - 0.8); // Circadian metabolic disruption
    }

    // 5. Passive Recovery (Entropy reduction/healing)
    // Stress naturally trends back to baseline (40)
    if (state.stress > 40) {
        nextState.stress = clamp(state.stress - 0.4);
    }

    // Inflammation naturally trends back to baseline (20)
    if (state.inflammation > 20) {
        nextState.inflammation = clamp(state.inflammation - 0.6);
    }

    return nextState;
}
