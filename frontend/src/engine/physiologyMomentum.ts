import { VedaState } from './stateModel';
import { clamp } from '../utils/clamp';

/**
 * physiologyMomentum.ts
 * 
 * Prevents extreme jumps in physiology variables by applying biological momentum smoothing.
 * Biology changes gradually, not instantly.
 */

const MOMENTUM_MAPPING: Record<string, number> = {
    // Doshas: Stable but adaptable
    vata: 0.8,
    pitta: 0.8,
    kapha: 0.8,
    // Vitality: High momentum (slowest to change)
    ojas: 0.9,
    agni: 0.85,
    // Circadian: Moderate momentum
    circadian: 0.85,
    sleep: 0.85,
    // Physical: Moderate
    stiffness: 0.7,
    inflammation: 0.7,
    // Mental: Low momentum (fastest to react)
    stress: 0.75,
    mood: 0.75,
    mental_clarity: 0.75,
    irritability: 0.75
};

const DEFAULT_MOMENTUM = 0.85;
const MAX_DAILY_DRIFT = 20;

/**
 * Applies biological momentum smoothing and safety drift caps.
 */
export function applyMomentum(previousState: VedaState, newState: VedaState): VedaState {
    const smoothedState = { ...newState };

    for (const key in newState) {
        const vKey = key as keyof VedaState;

        if (typeof newState[vKey] === 'number' && vKey !== 'is_onboarded') {
            const previousValue = previousState[vKey] as number;
            const newValue = newState[vKey] as number;

            // 1. Apply Variable-Specific Momentum
            const momentum = MOMENTUM_MAPPING[vKey] || DEFAULT_MOMENTUM;
            let smoothedValue = (previousValue * momentum) + (newValue * (1 - momentum));

            // 2. Apply Daily Drift Cap Safety Guard
            const delta = smoothedValue - previousValue;
            if (Math.abs(delta) > MAX_DAILY_DRIFT) {
                smoothedValue = previousValue + (Math.sign(delta) * MAX_DAILY_DRIFT);
            }

            (smoothedState as any)[vKey] = clamp(smoothedValue, 0, 100);
        }
    }

    return smoothedState;
}
