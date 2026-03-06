/**
 * /api/personalize
 *
 * Server-side proxy for AI module personalization.
 * Keeps the AI API key secure — never exposed to the client.
 *
 * Only accessible for premium users (auth check via Supabase session + profiles table).
 *
 * POST body: { module: ModuleSlug, systemPrompt: string, userPrompt: string }
 * Response:  { content: string }
 *
 * Architecture rule: The physiology engine selects protocols (what to correct).
 * This route calls AI only to present those protocols as a personalized routine (how to present).
 * AI is called lazily — only when a premium user opens a specific module.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Gemini model fallback order: fastest first, cascade on 429 / 5xx
const GEMINI_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
];

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

async function callGemini(
    apiKey: string,
    systemPrompt: string,
    userPrompt: string
): Promise<string> {
    let lastError: Error | null = null;

    for (const model of GEMINI_MODELS) {
        try {
            const body: Record<string, unknown> = {
                contents: [{ parts: [{ text: userPrompt }] }],
                generationConfig: {
                    temperature: 0.4,      // Low: keeps responses structured and predictable
                    maxOutputTokens: 900,  // Enough for a full structured routine
                },
            };

            // Pass the system role block via system_instruction when present
            if (systemPrompt) {
                body.system_instruction = { parts: [{ text: systemPrompt }] };
            }

            const res = await fetch(
                `${GEMINI_BASE}/${model}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                }
            );

            // On 429 (quota) or 5xx (server error), try next model
            if (res.status === 429 || res.status >= 500) {
                const errText = await res.text();
                console.warn(`[/api/personalize] Model ${model} returned ${res.status}: ${errText}`);
                lastError = new Error(`Model ${model} failed with ${res.status}`);
                continue;
            }

            if (!res.ok) {
                const errText = await res.text();
                console.error(`[/api/personalize] Model ${model} error: ${errText}`);
                throw new Error(`Gemini ${model} failed: ${res.status}`);
            }

            const data = await res.json();
            return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        } catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
            console.warn(`[/api/personalize] Model ${model} threw:`, lastError.message);
        }
    }

    throw lastError ?? new Error('All Gemini models failed');
}

export async function POST(request: NextRequest) {
    // ── 1. Supabase auth check ─────────────────────────────────────────
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => cookieStore.getAll(),
                setAll: () => { },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── 2. Premium subscription check via Supabase 'profiles' table ────
    // NOTE: Requires 'profiles' table with column: is_premium boolean DEFAULT false
    // Run this migration in Supabase SQL editor if not yet done:
    //   ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false;
    const { data: profile } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', session.user.id)
        .single();

    if (!profile?.is_premium) {
        return NextResponse.json({ error: 'Premium subscription required' }, { status: 403 });
    }

    // ── 3. Parse request ───────────────────────────────────────────────
    const body = await request.json();
    const { module, systemPrompt, userPrompt } = body;

    if (!module || !userPrompt) {
        return NextResponse.json({ error: 'Missing module or userPrompt' }, { status: 400 });
    }

    // ── 4. Call AI model with fallback ────────────────────────────────
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
    }

    try {
        const content = await callGemini(apiKey, systemPrompt ?? '', userPrompt);
        return NextResponse.json({ content });
    } catch (err) {
        console.error('[/api/personalize] All models failed:', err);
        return NextResponse.json({ error: 'AI generation failed' }, { status: 502 });
    }
}
