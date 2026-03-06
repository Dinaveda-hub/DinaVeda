/**
 * stringUtils.ts
 * Centralized utility for formatting protocol names and other Veda-specific strings.
 */

const PROTOCOL_MAPPINGS: Record<string, string> = {
    "abhyanga": "Abhyanga",
    "grounding_yoga": "Ground yoga",
    "padabhyanga": "Padaabhyanga",
    "nasya": "Nasya",
    "early_wake": "Early wake",
    "morning_sunlight": "Morning sunlight",
    "warm_water_morning": "Warm water",
    "oil_pulling": "Oil pulling",
    "brisk_walk": "Brisk walk",
    "dry_brushing": "Dry brushing"
};

/**
 * Humanizes a protocol slug into a user-friendly name with specific mappings.
 * Ensures the first letter is capitalized as per user preference.
 */
export const humanizeProtocolName = (slug: string): string => {
    if (!slug) return "";

    // Check for specific overrides first
    const normalizedSlug = slug.toLowerCase();
    if (PROTOCOL_MAPPINGS[normalizedSlug]) {
        return PROTOCOL_MAPPINGS[normalizedSlug];
    }

    // Default: Capitalize first letter, replace underscores with spaces
    const humanized = slug.replace(/_/g, ' ');
    return humanized.charAt(0).toUpperCase() + humanized.slice(1);
};
