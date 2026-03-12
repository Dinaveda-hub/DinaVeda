import { VedaState } from '@/types/physiologyState';
export type { VedaState };

export const defaultState: VedaState = {
    vata: 50,
    pitta: 50,
    kapha: 50,

    agni: 60,
    ama: 20,
    ojas: 70,
    immunity: 65,

    sleep: 60,
    energy: 60,
    stress: 40,
    mood: 60,

    digestion: 60,
    bloating: 20,
    elimination: 60,
    hydration: 60,
    appetite: 60,

    movement: 50,
    stiffness: 20,
    inflammation: 20,

    skin_health: 60,
    hair_health: 60,

    mental_clarity: 60,
    irritability: 20,
    attention_stability: 60,
    cognitive_energy: 60,
    social_balance: 60,

    circadian: 60,
    rutu_index: 50,
    age_factor: 50,

    prakriti_vata: 50,
    prakriti_pitta: 30,
    prakriti_kapha: 20,

    daily_circadian_drag: 0,

    // Latent Health Axes
    vata_axis: 50,
    pitta_axis: 50,
    kapha_axis: 50,
    agni_axis: 60,
    ojas_axis: 70,

    is_onboarded: false
}

/**
 * Retrieves the baseline value for a given physiological variable.
 * Prioritizes Prakriti for doshas, then falls back to defaultState.
 */
export function getBaseline(varName: string, state: VedaState): number {
    if (varName === 'vata') return state.prakriti_vata || (defaultState as any).vata || 50;
    if (varName === 'pitta') return state.prakriti_pitta || (defaultState as any).pitta || 50;
    if (varName === 'kapha') return state.prakriti_kapha || (defaultState as any).kapha || 50;

    return (defaultState as any)[varName] ?? 50;
}

// Global hook/state manager will be implemented in a separate hook if needed.
// For now, this is the foundational interface.
