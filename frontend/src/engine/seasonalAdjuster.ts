export interface SeasonalMultipliers {
    vata: number;
    pitta: number;
    kapha: number;
}

export function getSeasonalMultipliers(rutu_index: number): SeasonalMultipliers {
    // Bounded linear interpolation for smoother transitions (0.85 - 1.15 range)
    const vata = 0.9 + (rutu_index / 100) * 0.2;
    const pitta = 1.1 - (rutu_index / 100) * 0.2;
    const kapha = 1.0 + Math.sin((rutu_index / 100) * Math.PI) * 0.15;

    return { vata, pitta, kapha };
}
