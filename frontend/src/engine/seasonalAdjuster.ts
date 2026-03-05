export function getSeasonalMultipliers(season: string) {
    // These multipliers increase the sensitivity (effect impact) of signals 
    // on specific doshas during their prime accumulation/aggravation seasons.

    // Default baseline
    let multipliers = {
        vata_multiplier: 1.0,
        pitta_multiplier: 1.0,
        kapha_multiplier: 1.0
    };

    const s = season.toLowerCase();

    // Spring (Kapha aggravation) -> Vasanta
    if (s.includes('spring') || s.includes('vasanta')) {
        multipliers.kapha_multiplier = 1.2;
    }
    // Summer (Pitta accumulation) -> Grishma
    else if (s.includes('summer') || s.includes('grishma')) {
        multipliers.pitta_multiplier = 1.15;
    }
    // Autumn (Vata aggravation, Pitta pacification) -> Sharad
    else if (s.includes('autumn') || s.includes('fall') || s.includes('sharad')) {
        multipliers.pitta_multiplier = 1.2; // Sharad is typically Pitta spike in classical texts, but we'll balance it.
        multipliers.vata_multiplier = 1.15;
    }
    // Early/Late Winter (Vata accumulation) -> Hemanta / Shishira
    else if (s.includes('winter') || s.includes('hemanta') || s.includes('shishira')) {
        multipliers.vata_multiplier = 1.2;
    }

    return multipliers;
}
