/**
 * stringUtils.ts
 * Centralized utility for formatting protocol names and other Veda-specific strings.
 */

const PROTOCOL_MAPPINGS: Record<string, string> = {
    "abhyanga": "Abhyanga",
    "grounding_yoga": "Ground yoga",
    "padabhyanga": "Padabhyanga",
    "nasya": "Nasya",
    "early_wake": "Early wake",
    "morning_sunlight": "Morning sunlight",
    "warm_water_morning": "Warm water morning",
    "oil_pulling": "Oil pulling",
    "brisk_walk": "Brisk walk",
    "dry_brushing": "Dry brushing",
    "morning_hydration": "Morning hydration",
    "meditation": "Meditation",
    "pranayama": "Pranayama",
    "midday_main_meal": "Midday main meal",
    "mindful_chewing": "Mindful chewing",
    "evening_wind_down": "Evening wind down"
};

/**
 * Humanizes a protocol slug into a user-friendly name with specific mappings.
 * Ensures the first letter is capitalized as per user preference.
 */
export const humanizeProtocolName = (slug: string): string => {
    if (!slug) return "";

    // Normalize: some slugs might have spaces instead of underscores depending on source
    const key = slug.toLowerCase().replace(/\s+/g, '_');

    // 1. Check for specific overrides first
    if (PROTOCOL_MAPPINGS[key]) {
        return PROTOCOL_MAPPINGS[key];
    }

    // 2. Default: Sentence Case (Only first letter upper, rest forced lower)
    const humanized = slug.replace(/_/g, ' ').toLowerCase();
    return humanized.charAt(0).toUpperCase() + humanized.slice(1);
};
