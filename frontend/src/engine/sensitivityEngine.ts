import sensitivityData from '../data/physiology/variable_sensitivity.json';

export interface SensitivityProfile {
    vata_elasticity: number;
    pitta_elasticity: number;
    kapha_elasticity: number;
    agni_elasticity: number;
    ojas_elasticity: number;
}

export const variableSensitivity: Record<string, number> = sensitivityData;

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

    if (primary === "vata") {
        profile.vata_elasticity = 1.2;
        profile.agni_elasticity = 1.1;
        profile.ojas_elasticity = 0.9;
    } else if (primary === "pitta") {
        profile.pitta_elasticity = 1.2;
        profile.agni_elasticity = 0.8;
        profile.ojas_elasticity = 1.0;
    } else if (primary === "kapha") {
        profile.kapha_elasticity = 1.2;
        profile.agni_elasticity = 1.2;
        profile.ojas_elasticity = 1.1;
    }

    return profile;
};
