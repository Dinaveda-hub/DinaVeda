export interface VedaState {
    // Constant baseline
    prakriti_vata: number;
    prakriti_pitta: number;
    prakriti_kapha: number;

    // Vikriti state (daily drifting)
    vata_state: number;
    pitta_state: number;
    kapha_state: number;

    // Agni layer
    agni_strength: number;
    agni_stability: number;
    ama_risk: number;

    // Vitality
    ojas_score: number;
    ojas_recovery: number;

    // Circadian layer
    circadian_alignment: number;
    sleep_debt: number;
    light_exposure: number;

    // Digestive signals
    appetite_quality: number;
    digestion_comfort: number;
    bloating_level: number;
    bowel_quality: number;

    // Nervous system
    stress_load: number;
    mental_clarity: number;
    screen_exposure: number;

    // Lifestyle activity
    movement_level: number;
    hydration_status: number;
    meal_timing: number;

    // Environmental context
    rutu_season: string; // e.g. 'Grishma' (Summer)
    climate_quality: number;

    // Onboarding status
    is_onboarded: boolean;
}

export const defaultState: VedaState = {
    prakriti_vata: 33,
    prakriti_pitta: 33,
    prakriti_kapha: 33,

    vata_state: 33,
    pitta_state: 33,
    kapha_state: 33,

    agni_strength: 70,
    agni_stability: 70,
    ama_risk: 10,

    ojas_score: 80,
    ojas_recovery: 50,

    circadian_alignment: 85,
    sleep_debt: 10,
    light_exposure: 50,

    appetite_quality: 70,
    digestion_comfort: 80,
    bloating_level: 10,
    bowel_quality: 75,

    stress_load: 30,
    mental_clarity: 70,
    screen_exposure: 60,

    movement_level: 50,
    hydration_status: 60,
    meal_timing: 80,

    rutu_season: "Vasanta",
    climate_quality: 50,
    is_onboarded: false,
};

// Global hook/state manager will be implemented in a separate hook if needed.
// For now, this is the foundational interface.
