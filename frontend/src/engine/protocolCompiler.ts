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
    is_premium?: boolean;
    variables?: Record<string, number>;
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
    const categoryCounts: Record<string, number> = {};
    
    const morning: CompiledProtocolItem[] = [];
    const midday: CompiledProtocolItem[] = [];
    const evening: CompiledProtocolItem[] = [];

    // The input rankedProtocols is already sorted by Score
    for (const p of rankedProtocols) {
        // 1. Deduplicate by name
        if (seen.has(p.name)) continue;

        // 2. Category Diversity Guard
        // Limit each category to max 2 per day to prevent repetition.
        // High-score protocols (score > 2.0) bypass this guard.
        const category = p.category;
        const score = p.score || 0;
        const currentCatCount = categoryCounts[category] || 0;
        
        if (currentCatCount >= 2 && score <= 2.0) continue;

        // 3. Routing to UI Buckets with Cap Enforcement
        const tod = (p.time_of_day || 'midday').toLowerCase();
        let added = false;

        if (MORNING_TAGS.has(tod)) {
            if (morning.length < 3) {
                morning.push(toItem(p));
                added = true;
            }
        } else if (EVENING_TAGS.has(tod)) {
            if (evening.length < 3) {
                evening.push(toItem(p));
                added = true;
            }
        } else {
            // Default Fallback: Unknown or MIDDAY_TAGS route to Midday
            if (midday.length < 2) {
                midday.push(toItem(p));
                added = true;
            }
        }

        if (added) {
            seen.add(p.name);
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
    }

    return { morning, midday, evening };
}
