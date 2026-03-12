import signalsRaw from '../data/signals.json';

const signalLibrary = signalsRaw as Record<string, {
    synonyms?: string[],
    type?: string,
    severity?: string,
    effects: Record<string, number>
}>;

// Maximum number of signals the AI can assert in a single prompt
const MAX_SIGNALS_PER_PROMPT = 3;

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

        // Check if exact match exists in JSON library
        if (signalLibrary[normalizedSignal]) {
            validSignals.add(normalizedSignal);
            continue;
        }

        // Check synonyms if not exact match
        let foundMatch = false;
        for (const [canonicalName, data] of Object.entries(signalLibrary)) {
            if (data.synonyms && data.synonyms.includes(normalizedSignal)) {
                validSignals.add(canonicalName);
                foundMatch = true;
                break;
            }
        }

        if (!foundMatch) {
            console.warn(`[SignalValidator] Dropped hallucinated/unknown signal: ${normalizedSignal}`);
        }
    }

    return Array.from(validSignals);
}
