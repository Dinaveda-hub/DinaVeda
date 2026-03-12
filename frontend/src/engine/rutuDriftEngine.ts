import { VedaState } from './stateModel';
import { ENGINE_CONFIG } from './config';

const { clamp } = ENGINE_CONFIG.ranges;

/**
 * rutuDriftEngine.ts
 *
 * Applies gradual seasonal physiological pressure (Rutu Drift) to the VedaState.
 *
 * Classical Ayurveda describes predictable shifts in dosha accumulation and pacification
 * across the six Ritu (seasons). Without this, the model only reacts to user logs,
 * ignoring environmental pressure — which is a fundamental flaw in Ayurvedic modelling.
 *
 * Pipeline position:
 *   User Input → State Update → Physiology Momentum → [SEASONAL DRIFT] → Baseline Stabilizer → Vector Matching
 *
 * Drift is small (DRIFT_STRENGTH = 0.2), gradual, and cumulative over days.
 */

export type Season =
    | 'hemanta'    // Early Winter (Nov–Jan)   — Strong Agni, nourishing period
    | 'shishira'   // Late Winter  (Jan–Mar)   — Kapha accumulates, Vata lingers
    | 'vasanta'    // Spring       (Mar–May)   — Kapha aggravates, Agni weakens
    | 'grishma'    // Summer       (May–Jul)   — Pitta + Vata rise, Agni dampens
    | 'varsha'     // Monsoon      (Jul–Sep)   — Vata peaks, Agni severely weakened
    | 'sharad';    // Autumn       (Sep–Nov)   — Pitta peaks, Agni rekindling

/**
 * Seasonal baseline drift vectors (per daily update cycle).
 * Keys match VedaState field names exactly.
 *
 * | Season   | Vata  | Pitta | Kapha | Agni |
 * |----------|-------|-------|-------|------|
 * | Hemanta  |  -1   |  +1   |  +1   |  +2  |
 * | Shishira |  +1   |   0   |  +2   |  +1  |
 * | Vasanta  |   0   |   0   |  +3   |  -1  |
 * | Grishma  |  +2   |  +2   |  -2   |  -2  |
 * | Varsha   |  +3   |  +1   |   0   |  -3  |
 * | Sharad   |  -1   |  +3   |  -1   |  +1  |
 */
const RUTU_DRIFT: Record<Season, Partial<Record<keyof VedaState, number>>> = {
    hemanta: {
        vata_axis: -1,
        pitta_axis: 1,
        kapha_axis: 1,
        agni_axis: 2
    },
    shishira: {
        vata_axis: 1,
        pitta_axis: 0,
        kapha_axis: 2,
        agni_axis: 1
    },
    vasanta: {
        vata_axis: 0,
        pitta_axis: 0,
        kapha_axis: 3,
        agni_axis: -1
    },
    grishma: {
        vata_axis: 2,
        pitta_axis: 2,
        kapha_axis: -2,
        agni_axis: -2
    },
    varsha: {
        vata_axis: 3,
        pitta_axis: 1,
        kapha_axis: 0,
        agni_axis: -3
    },
    sharad: {
        vata_axis: -1,
        pitta_axis: 3,
        kapha_axis: -1,
        agni_axis: 1
    }
};

/**
 * Damping factor — keeps seasonal drift biologically realistic.
 * 20% of the raw drift table value is applied per cycle.
 * This means Varsha's Vata +3 becomes +0.6 per day.
 * After 30 days: Vata +18.
 */
const DRIFT_STRENGTH = 0.2;

/**
 * Optional Season Intensity Factor.
 * Allows future regional climate adaptation (heavy monsoon vs. mild rain, etc.)
 * Default is 1.0 (standard intensity). Range: 0.5 – 1.5.
 */
export interface SeasonalContext {
    season: Season;
    intensity?: number; // Default: 1.0
}

/**
 * Detects the current Ritu season from the system month.
 *
 * Mapping (Northern India / Indian subcontinent standard):
 *   Nov–Dec → Hemanta   (Early Winter)
 *   Jan–Feb → Shishira  (Late Winter)
 *   Mar–Apr → Vasanta   (Spring)
 *   May–Jun → Grishma   (Summer)
 *   Jul–Aug → Varsha    (Monsoon)
 *   Sep–Oct → Sharad    (Autumn)
 */
export function getCurrentSeason(): Season {
    const month = new Date().getMonth(); // 0 = January
    if (month === 10 || month === 11) return 'hemanta';  // Nov, Dec
    if (month === 0  || month === 1)  return 'shishira'; // Jan, Feb
    if (month === 2  || month === 3)  return 'vasanta';  // Mar, Apr
    if (month === 4  || month === 5)  return 'grishma';  // May, Jun
    if (month === 6  || month === 7)  return 'varsha';   // Jul, Aug
    return 'sharad';                                      // Sep, Oct
}

/**
 * Calculates a 0-100 index representing the progress through the annual seasonal cycle.
 * 0 = Jan 1st, 100 = Dec 31st.
 * Used for smooth multiplier mapping.
 */
export function getRutuIndex(): number {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Normalize to 0-100 (365 days approx)
    return clamp((dayOfYear / 365) * 100);
}

/**
 * Returns the human-readable Ritu metadata for display.
 */
export function getSeasonMeta(season: Season): {
    name: string;
    sanskrit: string;
    dominant: string;
    description: string;
} {
    const META: Record<Season, { name: string; sanskrit: string; dominant: string; description: string }> = {
        hemanta:  { name: 'Hemanta',  sanskrit: 'हेमन्त', dominant: 'Strong Agni',   description: 'Early Winter — Peak digestive strength. Nourishing foods recommended.' },
        shishira: { name: 'Shishira', sanskrit: 'शिशिर',  dominant: 'Kapha Builds',  description: 'Late Winter — Kapha accumulates. Warming and lightening practices needed.' },
        vasanta:  { name: 'Vasanta',  sanskrit: 'वसन्त',  dominant: 'Kapha Peaks',   description: 'Spring — Kapha melts and aggravates. Lighten diet, increase movement.' },
        grishma:  { name: 'Grishma',  sanskrit: 'ग्रीष्म', dominant: 'Pitta + Vata', description: 'Summer — Heat rises. Stay cool, hydrated, and avoid strenuous midday exercise.' },
        varsha:   { name: 'Varsha',   sanskrit: 'वर्षा',   dominant: 'Vata Peaks',   description: 'Monsoon — Vata aggravation and Agni weakness. Warm, light, cooked foods only.' },
        sharad:   { name: 'Sharad',   sanskrit: 'शरद्',   dominant: 'Pitta Peaks',   description: 'Autumn — Pitta aggravates. Cooling, sweet, and bitter tastes reduce excess heat.' },
    };
    return META[season];
}

/**
 * Applies seasonal drift to the VedaState.
 *
 * @param state - Current VedaState after momentum smoothing
 * @param context - { season, intensity? } — season is auto-detected if not provided
 * @returns Updated VedaState with seasonal pressure applied
 */
export function applySeasonalDrift(
    state: VedaState,
    context?: SeasonalContext
): VedaState {
    const season = context?.season ?? getCurrentSeason();
    const intensity = context?.intensity ?? 1.0;

    const drift = RUTU_DRIFT[season];
    const next = { ...state };

    for (const rawKey of Object.keys(drift) as (keyof VedaState)[]) {
        const driftValue = drift[rawKey];
        if (driftValue === undefined) continue;

        const currentValue = (state[rawKey] as number) ?? 50;
        const delta = driftValue * DRIFT_STRENGTH * intensity;

        (next as any)[rawKey] = clamp(currentValue + delta);
    }

    return next;
}
