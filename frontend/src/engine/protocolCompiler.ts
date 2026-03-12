import { Protocol } from './protocolSelectionEngine';

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
    rankedProtocols: Protocol[]
): CompiledDailyPlan {
    const seen = new Set<string>();
    const morning: CompiledProtocolItem[] = [];
    const midday: CompiledProtocolItem[] = [];
    const evening: CompiledProtocolItem[] = [];

    // The input rankedProtocols is already sorted by Score (Drift + Prediction + Decay)
    for (const p of rankedProtocols) {
        // 1. Deduplicate by name
        if (seen.has(p.name)) continue;
        seen.add(p.name);

        const tod = p.time_of_day.toLowerCase();

        // 2. Route to correct bucket with cap enforcement (Morning: 3, Midday: 2, Evening: 3)
        if (MORNING_TAGS.has(tod)) {
            if (morning.length < 3) morning.push(toItem(p));
        } else if (MIDDAY_TAGS.has(tod)) {
            if (midday.length < 2) midday.push(toItem(p));
        } else if (EVENING_TAGS.has(tod)) {
            if (evening.length < 3) evening.push(toItem(p));
        }
    }

    return { morning, midday, evening };
}
