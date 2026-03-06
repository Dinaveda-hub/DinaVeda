import seasonalData from '../data/physiology/seasonal_multipliers.json';

export interface SeasonalMultipliers {
    vata_multiplier: number;
    pitta_multiplier: number;
    kapha_multiplier: number;
}

export function getSeasonalMultipliers(season: string): SeasonalMultipliers {
    const s = season.toLowerCase();

    // Default baseline
    const baseline: SeasonalMultipliers = {
        vata_multiplier: 1.0,
        pitta_multiplier: 1.0,
        kapha_multiplier: 1.0
    };

    if (s.includes('spring') || s.includes('vasanta')) {
        return { ...baseline, ...seasonalData.spring };
    }
    if (s.includes('summer') || s.includes('grishma')) {
        return { ...baseline, ...seasonalData.summer };
    }
    if (s.includes('autumn') || s.includes('fall') || s.includes('sharad')) {
        return { ...baseline, ...seasonalData.autumn };
    }
    if (s.includes('winter') || s.includes('hemanta') || s.includes('shishira')) {
        return { ...baseline, ...seasonalData.winter };
    }

    return baseline;
}
