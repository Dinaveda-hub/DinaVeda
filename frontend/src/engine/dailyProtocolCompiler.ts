import { Protocol } from './recommendationEngine';

// ─────────────────────────────────────────────
// Output Types
// ─────────────────────────────────────────────

export interface CompiledProtocolItem {
    name: string;
    title: string;
    description: string;
    module: string;
    duration: string;
    category: string;
}

export interface CompiledDailyPlan {
    morning: CompiledProtocolItem[];
    midday: CompiledProtocolItem[];
    evening: CompiledProtocolItem[];
}

// ─────────────────────────────────────────────
// Time Bucket Mapping
// Maps granular `time_of_day` tags → three UI buckets
// ─────────────────────────────────────────────

const MORNING_TAGS = new Set(['morning', 'before_meal', 'sunrise']);
const MIDDAY_TAGS = new Set(['midday', 'meal_time', 'afternoon', 'any', 'daily']);
const EVENING_TAGS = new Set(['evening', 'night', 'after_meal', 'sunset']);

// ─────────────────────────────────────────────
// Helper: Format protocol name for display
// ─────────────────────────────────────────────

function formatTitle(name: string): string {
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// ─────────────────────────────────────────────
// Helper: Map protocol to CompiledProtocolItem
// ─────────────────────────────────────────────

function toItem(protocol: Protocol): CompiledProtocolItem {
    return {
        name: protocol.name,
        title: formatTitle(protocol.name),
        description: protocol.instructions,
        module: protocol.module,
        duration: protocol.duration,
        category: protocol.category,
    };
}

// ─────────────────────────────────────────────
// Compiler: Main Entry Point
// ─────────────────────────────────────────────

/**
 * Merges outputs from all engine modules into one structured daily plan.
 *
 * Rules:
 *  - Groups protocols by time of day into Morning, Midday, Evening.
 *  - Removes duplicate protocol names.
 *  - Caps: Morning ≤ 3, Midday ≤ 2, Evening ≤ 3.
 *  - Optionally merges prediction protocol names as priority additions.
 */
export function compileDailyProtocols(
    protocols: Protocol[],
    predictionProtocolNames: string[] = []
): CompiledDailyPlan {
    // 1. Sort so prediction-triggered protocols surface first (highest priority)
    const sorted = [...protocols].sort((a, b) => {
        const aIsPrediction = predictionProtocolNames.includes(a.name) ? 0 : 1;
        const bIsPrediction = predictionProtocolNames.includes(b.name) ? 0 : 1;
        return aIsPrediction - bIsPrediction;
    });

    const seen = new Set<string>();
    const morning: CompiledProtocolItem[] = [];
    const midday: CompiledProtocolItem[] = [];
    const evening: CompiledProtocolItem[] = [];

    for (const p of sorted) {
        // 2. Deduplicate by name
        if (seen.has(p.name)) continue;
        seen.add(p.name);

        const tod = p.time_of_day.toLowerCase();

        // 3. Route to correct bucket with cap enforcement
        if (MORNING_TAGS.has(tod) && morning.length < 3) {
            morning.push(toItem(p));
        } else if (MIDDAY_TAGS.has(tod) && midday.length < 2) {
            midday.push(toItem(p));
        } else if (EVENING_TAGS.has(tod) && evening.length < 3) {
            evening.push(toItem(p));
        }
    }

    return { morning, midday, evening };
}
