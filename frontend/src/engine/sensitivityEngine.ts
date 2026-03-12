import sensitivityData from '../data/physiology/variable_sensitivity.json';

export interface SensitivityProfile {
    vata: number;
    pitta: number;
    kapha: number;
    agni: number;
    ojas: number;
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
        vata: 1.0,
        pitta: 1.0,
        kapha: 1.0,
        agni: 1.0,
        ojas: 1.0
    };

    if (primary === "vata") {
        profile.vata = 1.2;
        profile.agni = 1.1;
        profile.ojas = 0.9;
    } else if (primary === "pitta") {
        profile.pitta = 1.2;
        profile.agni = 0.8;
        profile.ojas = 1.0;
    } else if (primary === "kapha") {
        profile.kapha = 1.2;
        profile.agni = 1.2;
        profile.ojas = 1.1;
    }

    return profile;
};
