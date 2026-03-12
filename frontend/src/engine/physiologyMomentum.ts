import { VedaState } from './stateModel';
import { ENGINE_CONFIG } from './config';

const { clamp } = ENGINE_CONFIG.ranges;

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
    immunity: 0.9,
    // Circadian & Sleep: Moderate momentum
    circadian: 0.85,
    sleep: 0.85,
    // Physical: Moderate
    stiffness: 0.7,
    inflammation: 0.7,
    skin_health: 0.7,
    hair_health: 0.7,
    // Metabolism & Digestion
    digestion: 0.8,
    elimination: 0.8,
    appetite: 0.7,
    hydration: 0.65,
    energy: 0.8,
    // Mental: Low momentum (fastest to react)
    stress: 0.75,
    mood: 0.75,
    mental_clarity: 0.75,
    irritability: 0.75,
    bloating: 0.75
};

const DEFAULT_MOMENTUM = 0.85;
const MAX_DAILY_DRIFT = 20;

type NumericKeys = { [K in keyof VedaState]: VedaState[K] extends number ? K : never }[keyof VedaState];

/**
 * Applies biological momentum smoothing and safety drift caps.
 * Incorporates age_factor to dynamically scale physiological resistance.
 */
export function applyMomentum(previousState: VedaState, newState: VedaState): VedaState {
    const smoothedState = { ...newState };

const CORE_AXES: (keyof VedaState)[] = ['vata_axis', 'pitta_axis', 'kapha_axis', 'agni_axis', 'ojas_axis'];

    for (const vKey of CORE_AXES) {
        const numKey = vKey as NumericKeys;
        const previousValue = previousState[numKey] || 50; 
        const newValue = newState[numKey] as number;

        // 1. Map axis key to its category for momentum lookup
        // e.g. 'vata_axis' -> 'vata'
        const baseKey = numKey.replace('_axis', '');
        let momentum = MOMENTUM_MAPPING[baseKey] || DEFAULT_MOMENTUM;

        // 2. Incorporate Age-Driven Momentum Scaling
        // Older physiology resists change more strongly (Higher Momentum).
        // age_factor 0 -> momentum * 1.0, age_factor 100 -> momentum * 1.15
        const ageResistance = 1 + (newState.age_factor / 666); // Subtle but real scaling
        momentum = Math.min(0.98, momentum * ageResistance);

        // 3. Apply Exponential Smoothing
        let smoothedValue = (previousValue * momentum) + (newValue * (1 - momentum));

        // 4. Apply Daily Drift Cap Safety Guard
        const delta = smoothedValue - previousValue;
        if (Math.abs(delta) > MAX_DAILY_DRIFT) {
            smoothedValue = previousValue + (Math.sign(delta) * MAX_DAILY_DRIFT);
        }

        smoothedState[numKey] = clamp(smoothedValue) as never;
    }

    return smoothedState;
}
