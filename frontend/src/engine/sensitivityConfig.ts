export interface SensitivityProfile {
    vata_elasticity: number;
    pitta_elasticity: number;
    kapha_elasticity: number;
    agni_elasticity: number;
    ojas_elasticity: number;
}

export const variableSensitivity: Record<string, number> = {
    vata: 0.9,
    pitta: 0.9,
    kapha: 0.9,

    agni: 1.0,
    ama_risk: 0.8,

    ojas_score: 1.2,
    ojas_recovery: 1.0,

    circadian: 1.1,
    sleep: 1.0,
    light_exposure: 1.0,

    appetite_quality: 1.0,
    digestion_comfort: 1.0,
    bloating_level: 1.0,
    bowel_quality: 1.0,

    stress_load: 1.0,
    mental_clarity: 1.0,
    screen_exposure: 1.0,

    movement: 1.0,
    hydration_status: 1.0,
    meal_timing: 1.0
};

export const getSensitivityConfig = (
    prakriti_vata: number,
    prakriti_pitta: number,
    prakriti_kapha: number
): SensitivityProfile => {
    // Determine primary dosha from Prakriti
    let primary = "vata";
    let max = prakriti_vata;

    if (prakriti_pitta > max) {
        primary = "pitta";
        max = prakriti_pitta;
    }
    if (prakriti_kapha > max) {
        primary = "kapha";
    }

    // Default neutral elasticity
    const profile: SensitivityProfile = {
        vata_elasticity: 1.0,
        pitta_elasticity: 1.0,
        kapha_elasticity: 1.0,
        agni_elasticity: 1.0,
        ojas_elasticity: 1.0
    };

    // Elasticity logic: If a dosha is naturally high in Prakriti, it is more easily aggravated
    // and harder to pacify, hence a higher elasticity multiplier for aggravating signals.
    if (primary === "vata") {
        profile.vata_elasticity = 1.2;  // Vata pushes out of balance easily
        profile.agni_elasticity = 1.1;  // Agni is variable and sensitive
        profile.ojas_elasticity = 0.9;  // Harder to build Ojas
    } else if (primary === "pitta") {
        profile.pitta_elasticity = 1.2; // Pitta flares easily
        profile.agni_elasticity = 0.8;  // Agni is naturally strong/stable
        profile.ojas_elasticity = 1.0;
    } else if (primary === "kapha") {
        profile.kapha_elasticity = 1.2; // Kapha accumulates easily
        profile.agni_elasticity = 1.2;  // Agni is sluggish/sensitive to heavy inputs
        profile.ojas_elasticity = 1.1;  // Easier to maintain Ojas
    }

    return profile;
};
