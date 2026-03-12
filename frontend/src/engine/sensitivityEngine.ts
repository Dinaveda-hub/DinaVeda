import { VedaState } from './stateModel';

/**
 * BASE_VARIABLE_SENSITIVITY
 * Models the intrinsic responsiveness of different physiological systems.
 * Some systems (like Ojas) are harder to shift than others (like Stress).
 */
export const BASE_VARIABLE_SENSITIVITY: Partial<Record<keyof VedaState, number>> = {
    // Core Doshas
    vata: 0.9,
    pitta: 0.9,
    kapha: 0.9,

    // Metabolic & Vitality
    agni: 1.0,
    ama: 0.8,
    ojas: 1.2,
    immunity: 1.0,

    // Daily Performance
    sleep: 1.1,
    energy: 1.0,
    stress: 1.2,
    mood: 1.1,

    // Digestion
    digestion: 1.0,
    bloating: 0.9,
    elimination: 0.9,
    hydration: 1.0,
    appetite: 1.0,

    // Structural
    movement: 1.0,
    stiffness: 0.9,
    inflammation: 1.0,

    // Tissue/Subtle
    skin_health: 0.8,
    hair_health: 0.7,
    mental_clarity: 1.1,
    irritability: 1.1,
    attention_stability: 1.0,
    cognitive_energy: 1.0,
    social_balance: 0.9,

    // Rhythms
    circadian: 1.2
};

/**
 * CONSTITUTION_RELIANCE (Elasticity Parameters)
 * Models how different Prakriti types respond to signals.
 * Vata = High reactivity, Pitta = Selective heat, Kapha = Slow/Stable.
 */
const DOSHA_ELASTICITY: Record<string, Partial<Record<keyof VedaState, number>>> = {
    vata: {
        vata: 1.25,     // Vata-dominant easily aggravates Vata
        pitta: 1.1,
        kapha: 0.9,     // Kapha is "heavier" and harder to move for Vata types
        agni: 1.15,     // Vishama Agni (variable)
        ojas: 0.85,     // Harder to sustain Ojas
        stress: 1.2,    // High nervous system reactivity
        sleep: 1.1      // Sleep easily disturbed
    },
    pitta: {
        pitta: 1.25,    // Pitta-dominant easily gains heat
        vata: 1.0,
        kapha: 1.0,
        agni: 0.85,     // Tikshna Agni (strong, harder to damp)
        inflammation: 1.2, // High inflammatory reactivity
        irritability: 1.2
    },
    kapha: {
        kapha: 1.25,    // Kapha-dominant easily accumulates
        vata: 0.8,      // Vata is moving Kapha (harder)
        pitta: 0.9,
        agni: 1.2,      // Manda Agni (sluggish, reacts strongly to stimulation)
        bloating: 1.2
    }
};

/**
 * Calculates a weighted elasticity multiplier based on the user's Prakriti blend.
 * This supports dual constitutions (e.g. Vata-Pitta) with accurate reactivity.
 */
export function getConstitutionElasticity(variable: keyof VedaState, state: VedaState): number {
    const vWeight = (state.prakriti_vata || 33) / 100;
    const pWeight = (state.prakriti_pitta || 33) / 100;
    const kWeight = (state.prakriti_kapha || 34) / 100;

    const vElasticity = DOSHA_ELASTICITY.vata[variable] ?? 1.0;
    const pElasticity = DOSHA_ELASTICITY.pitta[variable] ?? 1.0;
    const kElasticity = DOSHA_ELASTICITY.kapha[variable] ?? 1.0;

    // Blend elasticities based on Prakriti percentages
    return (vWeight * vElasticity) + (pWeight * pElasticity) + (kWeight * kElasticity);
}

/**
 * Final Unified Sensitivity Multiplier
 * multiplier = base_sensitivity * constitution_elasticity
 */
export function getSensitivityMultiplier(variable: keyof VedaState, state: VedaState): number {
    const base = BASE_VARIABLE_SENSITIVITY[variable] ?? 1.0;
    const elasticity = getConstitutionElasticity(variable, state);
    
    return base * elasticity;
}

// Legacy export to prevent breaking other files during migration
// (Will gradually phase out in favor of getSensitivityMultiplier)
export const variableSensitivity = BASE_VARIABLE_SENSITIVITY;
