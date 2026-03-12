/**
 * stringUtils.ts
 * Centralized utility for formatting protocol names and other Veda-specific strings.
 */

/**
 * Formats a snake_case protocol name into a human-readable Title Case string.
 * tongue_scraping -> Tongue Scraping
 */
export function formatProtocolName(name: string): string {
    if (!name) return "";
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * @deprecated Use formatProtocolName instead.
 */
export const humanizeProtocolName = formatProtocolName;

