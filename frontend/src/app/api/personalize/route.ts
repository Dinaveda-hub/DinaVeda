/**
 * /api/personalize
 *
 * Proxy for AI module personalization.
 *
 * Toggle via process.env.NEXT_PUBLIC_USE_PYTHON_AGENTS:
 *  - true:  Calls Python backend /personalize (Supervisor + Module Agents)
 *  - false: Calls Gemini directly using local prompt templates (Current Default)
 *
 * Response: { content: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const USE_PYTHON_AGENTS = process.env.NEXT_PUBLIC_USE_PYTHON_AGENTS === 'true';
const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';

// Gemini model fallback logic (used if USE_PYTHON_AGENTS is false)
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

async function callGemini(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
    for (const model of GEMINI_MODELS) {
        try {
            const body: any = {
                contents: [{ parts: [{ text: userPrompt }] }],
                generationConfig: { temperature: 0.4, maxOutputTokens: 900 },
            };
            if (systemPrompt) body.system_instruction = { parts: [{ text: systemPrompt }] };

            const res = await fetch(`${GEMINI_BASE}/${model}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.status === 429 || res.status >= 500) continue;
            if (!res.ok) throw new Error(`Gemini ${model} failed: ${res.status}`);

            const data = await res.json();
            return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        } catch (err) {
            console.warn(`Model ${model} failed:`, err);
        }
    }
    throw new Error('All Gemini models failed');
}

export async function POST(request: NextRequest) {
    // 1. Auth check
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { getAll: () => cookieStore.getAll(), setAll: () => { } } }
    );
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 2. Premium check
    const { data: profile } = await supabase.from('profiles').select('is_premium').eq('id', session.user.id).single();
    if (!profile?.is_premium) return NextResponse.json({ error: 'Premium required' }, { status: 403 });

    // 3. Parse request
    const body = await request.json();
    const { module, systemPrompt, userPrompt, state, protocols, season, healthGoal } = body;

    // 4. Dispatch
    if (USE_PYTHON_AGENTS) {
        try {
            const res = await fetch(`${PYTHON_BACKEND}/personalize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    module,
                    state,
                    protocols,
                    season,
                    health_goal: healthGoal,
                    is_premium: true
                }),
            });
            if (!res.ok) throw new Error(`Python agents failed: ${res.status}`);
            const data = await res.json();
            return NextResponse.json({ content: data.content });
        } catch (err) {
            console.error('Python agent error:', err);
            return NextResponse.json({ error: 'Agent dispatch failed' }, { status: 502 });
        }
    } else {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return NextResponse.json({ error: 'AI not configured' }, { status: 500 });
        try {
            const content = await callGemini(apiKey, systemPrompt ?? '', userPrompt);
            return NextResponse.json({ content });
        } catch (err) {
            return NextResponse.json({ error: 'AI failed' }, { status: 502 });
        }
    }
}
