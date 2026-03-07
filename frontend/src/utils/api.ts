/**
 * api.ts
 * 
 * Centralized API configuration with fallback logic.
 * Ensures the app stays functional even if custom DNS (api.dinaveda.com) is pending.
 */

const IS_PROD = process.env.NODE_ENV === "production";

// The primary custom domain for the backend
const PRIMARY_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.dinaveda.com";

// The direct internal Render subdomain (always works even if DNS fails)
const FALLBACK_API_URL = "https://dinaveda.onrender.com";

/**
 * Returns the primary API URL.
 * In a real-world scenario, we could add logic here to "ping" the primary 
 * and switch to fallback globally, but for now, we provide the primary.
 */
export function getApiUrl(): string {
    // If we're in development, we might want to use localhost (handled by env)
    // Otherwise, return the primary custom domain.
    return PRIMARY_API_URL;
}

/**
 * A standard fetch wrapper that automatically tries the Fallback URL 
 * if the Primary URL fails (DNS error, timeout, or 5xx).
 */
export async function fetchWithFallback(path: string, options: RequestInit = {}): Promise<Response> {
    const primaryUrl = `${PRIMARY_API_URL}${path}`;
    const fallbackUrl = `${FALLBACK_API_URL}${path}`;

    try {
        // Attempt 1: Primary Custom Domain
        const response = await fetch(primaryUrl, {
            ...options,
            // Low timeout for the primary if we want to fail fast to fallback
            // but standard fetch doesn't have a built-in timeout.
            // We'll rely on standard connection failure for now.
        });

        // If it's a server error or not found, try the fallback
        if (!response.ok && response.status >= 500) {
            console.warn(`Primary API failed with status ${response.status}. Attempting fallback...`);
            return await fetch(fallbackUrl, options);
        }

        return response;
    } catch (error) {
        // Attempt 2: Fallback Render Subdomain (on network error)
        console.warn("Primary API network error. Attempting fallback...", error);
        return await fetch(fallbackUrl, options);
    }
}
