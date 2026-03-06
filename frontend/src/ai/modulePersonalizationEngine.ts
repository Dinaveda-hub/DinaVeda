/**
 * modulePersonalizationEngine.ts
 *
 * AI Personalization Layer — Premium Only
 *
 * Architecture:
 *  Deterministic engine → selects protocols (what to correct)
 *  This engine → calls AI to explain and structure them (how to present)
 *
 * RULE: AI must never change physiology logic, only present the already-selected protocols
 * as personalized routines for the user.
 *
 * AI is called LAZILY — only when a premium user opens a specific module,
 * never on the main dashboard.
 *
 * Prompt files (public/ai/prompts/*.txt) are split at the "---" divider into:
 *  - systemPrompt: the SYSTEM role + RULES block (sent as system_instruction to Gemini)
 *  - userPrompt:   the INPUT + OUTPUT FORMAT block with interpolated values
 */

import { VedaState } from '../engine/stateModel';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ModuleSlug =
    | 'nutriveda'
    | 'ayufit'
    | 'manasayur'
    | 'somasleep'
    | 'sattvaliving';

export interface PersonalizationInput {
    state: VedaState;
    selectedProtocols: string[];   // Names from the daily protocol compiler
    season?: string;               // e.g. 'spring', 'summer', 'autumn', 'winter'
    isPremium: boolean;
}

export interface PersonalizationResult {
    content: string;               // AI-generated markdown/text routine
    module: ModuleSlug;
    generatedAt: string;           // ISO timestamp
    cached: boolean;
}

// ─────────────────────────────────────────────
// Season Detection
// ─────────────────────────────────────────────

function detectSeason(): string {
    const month = new Date().getMonth(); // 0-indexed
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
}

// ─────────────────────────────────────────────
// Prompt Interpolation
// ─────────────────────────────────────────────

/**
 * Replaces {{variable}} placeholders in a prompt template with actual values.
 */
function interpolatePrompt(template: string, state: VedaState, protocols: string[], season: string): string {
    const protocolListFormatted = protocols.map(p => `• ${p.replace(/_/g, ' ')}`).join('\n');

    return template
        .replace(/{{vata_state}}/g, String(Math.round(state.vata_state)))
        .replace(/{{pitta_state}}/g, String(Math.round(state.pitta_state)))
        .replace(/{{kapha_state}}/g, String(Math.round(state.kapha_state)))
        .replace(/{{agni_strength}}/g, String(Math.round(state.agni_strength)))
        .replace(/{{agni_stability}}/g, String(Math.round(state.agni_stability)))
        .replace(/{{circadian_alignment}}/g, String(Math.round(state.circadian_alignment)))
        .replace(/{{sleep_debt}}/g, String(Math.round(state.sleep_debt)))
        .replace(/{{stress_load}}/g, String(Math.round(state.stress_load)))
        .replace(/{{mental_clarity}}/g, String(Math.round(state.mental_clarity)))
        .replace(/{{movement_level}}/g, String(Math.round(state.movement_level)))
        .replace(/{{season}}/g, season)
        .replace(/{{protocol_list}}/g, protocolListFormatted);
}

// ─────────────────────────────────────────────
// Prompt Loading & Splitting
// ─────────────────────────────────────────────

const PROMPT_MAP: Record<ModuleSlug, string> = {
    nutriveda: '/ai/prompts/nutriveda_prompt.txt',
    ayufit: '/ai/prompts/ayufit_prompt.txt',
    manasayur: '/ai/prompts/manasayur_prompt.txt',
    somasleep: '/ai/prompts/somasleep_prompt.txt',
    sattvaliving: '/ai/prompts/sattvaliving_prompt.txt',
};

async function loadPromptTemplate(module: ModuleSlug): Promise<string> {
    const response = await fetch(PROMPT_MAP[module]);
    if (!response.ok) {
        throw new Error(`Failed to load prompt template for module: ${module}`);
    }
    return response.text();
}

/**
 * Splits a prompt file at the first "---" separator into:
 *  - systemPrompt: SYSTEM role + RULES block
 *  - userPrompt:   INPUT + OUTPUT FORMAT block
 *
 * If no "---" separator is found, the whole template is used as userPrompt.
 */
function splitPrompt(rawTemplate: string): { systemPrompt: string; userPrompt: string } {
    const DIVIDER = '---';
    const firstDivider = rawTemplate.indexOf(DIVIDER);
    if (firstDivider === -1) {
        return { systemPrompt: '', userPrompt: rawTemplate };
    }
    const systemPrompt = rawTemplate.slice(0, firstDivider).trim();
    const userPrompt = rawTemplate.slice(firstDivider + DIVIDER.length).trim();
    return { systemPrompt, userPrompt };
}

// ─────────────────────────────────────────────
// Cache (session-level, keyed by module + date)
// ─────────────────────────────────────────────

const CACHE_PREFIX = 'veda_ai_routine_';

function buildCacheKey(module: ModuleSlug): string {
    const today = new Date().toISOString().split('T')[0];
    return `${CACHE_PREFIX}${module}_${today}`;
}

function readCache(module: ModuleSlug): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(buildCacheKey(module));
}

function writeCache(module: ModuleSlug, content: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(buildCacheKey(module), content);
}

// ─────────────────────────────────────────────
// Main Personalization Function
// ─────────────────────────────────────────────

/**
 * Generates an AI-personalized routine for the specified module.
 *
 * - Only runs if `isPremium === true`
 * - Returns cached result if routine was already generated today
 * - Calls the Next.js `/api/personalize` route which proxies to the AI model
 *
 * The engine determines WHAT to correct (protocols).
 * The AI determines HOW to present it (structured routine).
 */
export async function generateModuleRoutine(
    module: ModuleSlug,
    input: PersonalizationInput
): Promise<PersonalizationResult> {
    // 1. Premium gate
    if (!input.isPremium) {
        return {
            content: '',
            module,
            generatedAt: new Date().toISOString(),
            cached: false,
        };
    }

    // 2. Check cache — avoid re-generating if already done today
    const cached = readCache(module);
    if (cached) {
        return {
            content: cached,
            module,
            generatedAt: new Date().toISOString(),
            cached: true,
        };
    }

    // 3. Load prompt template, interpolate values, split into system + user parts
    const season = input.season ?? detectSeason();
    const rawTemplate = await loadPromptTemplate(module);
    const interpolated = interpolatePrompt(rawTemplate, input.state, input.selectedProtocols, season);
    const { systemPrompt, userPrompt } = splitPrompt(interpolated);

    // 4. Call the Next.js API route (proxies to AI model — keeps API key server-side)
    const response = await fetch('/api/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module, systemPrompt, userPrompt }),
    });

    if (!response.ok) {
        throw new Error(`AI personalization failed for module: ${module} (${response.status})`);
    }

    const data = await response.json();
    const content: string = data.content ?? '';

    // 5. Cache the result so this module only calls AI once per day
    writeCache(module, content);

    return {
        content,
        module,
        generatedAt: new Date().toISOString(),
        cached: false,
    };
}
