import signalsRaw from '../data/signals.json';

const signalLibrary = signalsRaw as Record<string, {
    synonyms?: string[],
    type?: string,
    severity?: string,
    effects: Record<string, number>
}>;

// Maximum number of signals the AI can assert in a single prompt
const MAX_SIGNALS_PER_PROMPT = 3;

// Precomputed O(1) lookup map for synonyms and canonical names
const SYNONYM_MAP: Record<string, string> = (() => {
    const map: Record<string, string> = {};
    for (const [canonicalName, data] of Object.entries(signalLibrary)) {
        // Map canonical name to itself (lowercased)
        map[canonicalName.toLowerCase()] = canonicalName;
        
        // Map all synonyms to the canonical name
        if (data.synonyms) {
            for (const synonym of data.synonyms) {
                map[synonym.toLowerCase().trim()] = canonicalName;
            }
        }
    }
    return map;
})();

/**
 * Validates an array of LLM-extracted signal strings.
 * Discards hallucinations, deduplicates overlaps, and enforces a hard cap.
 */
export function validateLLMSignals(extractedSignals: string[]): string[] {
    if (!extractedSignals || !Array.isArray(extractedSignals)) return [];

    const validSignals = new Set<string>();

    for (const rawSignal of extractedSignals) {
        if (validSignals.size >= MAX_SIGNALS_PER_PROMPT) break;

        const normalizedSignal = rawSignal.toLowerCase().trim();

        // Check precomputed map for O(1) lookup (canonical or synonym)
        const canonicalMatch = SYNONYM_MAP[normalizedSignal];
        
        if (canonicalMatch) {
            validSignals.add(canonicalMatch);
        } else {
            console.warn(`[SignalValidator] Dropped hallucinated/unknown signal: ${normalizedSignal}`);
        }
    }

    return Array.from(validSignals);
}
