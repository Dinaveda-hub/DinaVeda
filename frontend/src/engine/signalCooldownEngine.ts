/**
 * signalCooldownEngine.ts
 * 
 * Prevents redundant application of the same physiological signal within a defined time window.
 * Enforces biological pacing by ensuring symptoms are not over-processed if repeated quickly.
 */

const MS_PER_HOUR = 3600000;
const DEFAULT_COOLDOWN_HOURS = 12;

/**
 * Variable cooldown windows based on signal type or specific key.
 */
const SIGNAL_COOLDOWNS_HOURS: Record<string, number> = {
    poor_sleep: 12,
    deep_sleep: 12,
    late_dinner: 6,
    heavy_meal: 6,
    morning_exercise: 4,
    high_stress: 3,
    irritability: 3
};

/**
 * Filters a list of signal keys based on their last applied timestamp.
 * Maintains stateless operation to allow flexible storage (localStorage/Supabase).
 */
export function filterByCooldown(
    signals: string[],
    lastAppliedMap: Record<string, number>
): { filteredSignals: string[]; updatedMap: Record<string, number> } {
    const now = Date.now();
    const updatedMap = { ...lastAppliedMap };

    // 1. Deduplicate signals in the same message
    const uniqueSignals = Array.from(new Set(signals));
    const filteredSignals: string[] = [];

    for (const signal of uniqueSignals) {
        const cooldownHours = SIGNAL_COOLDOWNS_HOURS[signal] || DEFAULT_COOLDOWN_HOURS;
        const cooldownMs = cooldownHours * MS_PER_HOUR;

        const lastApplied = lastAppliedMap[signal] || 0;
        const timeSinceLastApplied = now - lastApplied;

        if (timeSinceLastApplied >= cooldownMs) {
            filteredSignals.push(signal);
            updatedMap[signal] = now;
        } else {
            // 2. Production-safe logging
            const isDev = typeof process !== 'undefined' && (process.env as any).NODE_ENV !== 'production';
            if (isDev) {
                console.log(`[SignalCooldown] Skipping "${signal}" - Applied ${Math.round(timeSinceLastApplied / MS_PER_HOUR)}h ago (Cooldown: ${cooldownHours}h)`);
            }
        }
    }

    return { filteredSignals, updatedMap };
}
