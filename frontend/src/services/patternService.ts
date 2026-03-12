/**
 * patternService.ts
 *
 * API client for the Physiology Memory Layer.
 * Fetches detected behavioral patterns and triggers pattern analysis.
 */

import { getApiUrl } from '../utils/api';

export interface PhysiologyPattern {
    id: string;
    user_id: string;
    pattern_type: string;
    description: string;
    confidence: number;      // 0.0 – 1.0
    occurrences: number;
    last_seen: string;       // ISO timestamp
    created_at: string;      // ISO timestamp
}

/**
 * Fetches all detected patterns for a user.
 */
export async function fetchPatterns(userId: string): Promise<PhysiologyPattern[]> {
    try {
        const apiUrl = getApiUrl();
        const res = await fetch(`${apiUrl}/api/patterns/${userId}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.patterns || [];
    } catch (err) {
        console.error('Pattern fetch error:', err);
        return [];
    }
}

/**
 * Triggers pattern analysis for a user (processes last 30 days of logs).
 */
export async function triggerPatternAnalysis(userId: string): Promise<PhysiologyPattern[]> {
    try {
        const apiUrl = getApiUrl();
        const res = await fetch(`${apiUrl}/api/patterns/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId }),
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.detected || [];
    } catch (err) {
        console.error('Pattern analysis error:', err);
        return [];
    }
}

/**
 * Maps pattern_type to protocol names that should receive a scoring boost.
 * Used by the protocol selection engine's patternBoost layer.
 */
export const PATTERN_PROTOCOL_MAP: Record<string, string[]> = {
    sleep_agni_correlation:   ['early_sleep', 'warm_milk_before_bed', 'digital_sunset'],
    late_dinner_kapha:        ['light_dinner', 'eat_before_sunset', 'evening_walk'],
    stress_agni_suppression:  ['nadi_shodhana', 'grounding_pranayama', 'stillness_meditation'],
    exercise_ojas_boost:      ['morning_yoga', 'bala_vyayama', 'morning_sun_salutation'],
    hydration_energy:         ['warm_water_morning', 'hydration_rhythm', 'herbal_water'],
    early_wake_circadian:     ['brahma_muhurta_wake', 'morning_light_exposure', 'circadian_reset'],
    screen_sleep_disruption:  ['digital_sunset', 'evening_wind_down', 'candlelight_reading'],
};
