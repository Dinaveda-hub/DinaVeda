"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
    ChevronLeft, BrainCircuit, Activity, Moon, Utensils,
    Zap, CloudSun, Leaf, CheckCircle2,
    ListChecks, Clock, Wind, Flame, Sparkles, Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { createBrowserClient } from "@supabase/ssr";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { computeVikriti } from "@/engine/vikritiEngine";
import { selectProtocols } from "@/engine/protocolSelectionEngine";
import ModuleHistory from "@/components/ModuleHistory";

// Domain Module Pages
import NutrivedaPage from "@/modules/nutriveda/NutrivedaPage";
import AyufitPage from "@/modules/ayufit/AyufitPage";
import ManasayurPage from "@/modules/manasayur/ManasayurPage";
import SomasleepPage from "@/modules/somasleep/SomasleepPage";
import SattvalivingPage from "@/modules/sattvaliving/SattvalivingPage";
import DinavedaPage from "@/modules/dinaveda/DinavedaPage";
import RutuvedaPage from "@/modules/rutuveda/RutuvedaPage";

// ─────────────────────────────────────────────────────────
// Module Data Registry
// ─────────────────────────────────────────────────────────

const moduleData: Record<string, any> = {
    somasleep: {
        title: "Somasleep",
        subtitle: "Nidra & Sleep Architecture",
        icon: Moon,
        principles: "Nidra is the natural state of restoration. Proper Sleep provides strength, immunity, and cognitive clarity.",
        vedaInsight: "The Charaka Samhita defines Nidra as one of the 'Trayopastambha' (Three Pillars of Life). It is essential for the nourishment of Ojas.",
        stats: [
            { label: "Circadian Sync", getValue: (s: any) => `${Math.round(s.circadian_alignment)}%` },
            { label: "Sleep Quality", getValue: (s: any) => s.circadian_alignment > 80 ? "Restorative" : "Disrupted" }
        ]
    },
    nutriveda: {
        title: "Nutriveda",
        subtitle: "Ahara & Food Medicine",
        icon: Utensils,
        principles: "Ahara is the primary source of biological fuel. When diet is correct, medicine is of no need.",
        vedaInsight: "Ahara dictates the quality of all seven Dhatus (tissues).",
        stats: [
            { label: "Agni Strength", getValue: (s: any) => `${Math.round(s.agni_strength)}/100` },
            { label: "Metabolic State", getValue: (s: any) => s.agni_strength > 75 ? "Teekshna (Sharp)" : s.agni_strength > 50 ? "Sama (Balanced)" : "Manda (Dull)" }
        ]
    },
    dinaveda: {
        title: "Dinaveda",
        subtitle: "Dinacharya & Daily Rituals",
        icon: Activity,
        principles: "Mastery over the self begins with mastery over the day. Daily rhythm establishes the biological clock.",
        vedaInsight: "Dinacharya aligns your individual biological rhythm with the cosmic solar cycle to prevent chronic imbalances.",
        stats: [
            { label: "Ojas Core", getValue: (s: any) => `${Math.round(s.ojas_score)}` },
            { label: "Vitality State", getValue: (s: any) => s.ojas_score > 85 ? "Excellent" : "Stable" }
        ]
    },
    rutuveda: {
        title: "Rutuveda",
        subtitle: "Ritucharya & Seasonality",
        icon: CloudSun,
        principles: "As the universe shifts, so must the inner biological fire. Harmony with seasons prevents disease.",
        vedaInsight: "Each Ritu (season) requires specific shifts in Ahara and Vihara. Kapha accumulates in winter and melts in spring.",
        stats: [
            { label: "Current Ritu", getValue: (_s: any) => "Vasanta (Spring)" },
            { label: "Dosha Risk", getValue: (_s: any, v: any) => v.dominant_dosha }
        ]
    },
    ayufit: {
        title: "Ayufit",
        subtitle: "Vyayama & Movement",
        icon: Zap,
        principles: "Movement should provide lightness and strength without exhaustion. Exercise to half capacity.",
        vedaInsight: "Vyayama brings 'Laghava' (lightness) to the body. Excessive exercise generates Vata.",
        stats: [
            { label: "Physical Strain", getValue: (s: any) => s.vata_state > 15 ? "High Vata" : "Balanced" },
            { label: "Movement Pulse", getValue: (_s: any) => "Stable" }
        ]
    },
    manasayur: {
        title: "Manasayur",
        subtitle: "Sadvritta & Mental Flow",
        icon: BrainCircuit,
        principles: "The mind follows the body, and the body follows the mind. Cognitive clarity is the ultimate Ojas.",
        vedaInsight: "Mental hygiene prevents Pragyaparadha (crimes against wisdom).",
        stats: [
            { label: "Mental Clarity", getValue: (s: any) => s.vata_state < 10 ? "Clear (Sattvic)" : "Active (Rajasic)" },
            { label: "Stress Load", getValue: (s: any) => s.ojas_score < 70 ? "Elevated" : "Low" }
        ]
    },
    sattvaliving: {
        title: "Sattvaliving",
        subtitle: "Ethical & Harmonious Life",
        icon: Leaf,
        principles: "Sattva is the quality of clarity, harmony, and balance. Daily behavioral rituals cultivate inner purity.",
        vedaInsight: "Sadvritta (ethical conduct) and daily behavioral hygiene prevent Pragyaparadha and maintain Ojas over time.",
        stats: [
            { label: "Stress Load", getValue: (s: any) => `${Math.round(s.stress_load)}/100` },
            { label: "Mental Clarity", getValue: (s: any) => s.mental_clarity > 60 ? "Clear (Sattvic)" : "Clouded (Tamasic)" }
        ]
    },
};

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

/**
 * Formats a snake_case slug into Title Case.
 */
const humanizeSlug = (slug: string) => {
    return slug
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Renders the AI routine text with basic formatting:
 */
function RoutineText({ content }: { content: string }) {
    const lines = content.split('\n');
    return (
        <div className="space-y-1 text-sm leading-relaxed text-slate-700">
            {lines.map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="h-2" />;
                // Section header: ends with ":" or is all-caps-ish and short
                if (trimmed.endsWith(':') || /^[A-Z][A-Za-z\s]+:$/.test(trimmed)) {
                    return (
                        <p key={i} className="font-black text-forest text-xs uppercase tracking-[0.2em] mt-4 first:mt-0">
                            {trimmed}
                        </p>
                    );
                }
                // Bullet items
                if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                    return (
                        <p key={i} className="pl-3 text-slate-600 font-medium">
                            {trimmed}
                        </p>
                    );
                }
                return (
                    <p key={i} className="font-medium text-slate-700">
                        {trimmed}
                    </p>
                );
            })}
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────

export default function ModuleDetail({ params }: { params: any }) {
    const [slug, setSlug] = useState<string>("");

    // Engine & Data State
    const { state, isLoaded } = usePhysiologyState();
    const [logs, setLogs] = useState<any[]>([]);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function fetchLogs() {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            const { data } = await supabase
                .from("pulse_logs")
                .select("*")
                .eq("user_id", session.user.id)
                .order("created_at", { ascending: false });
            if (data) setLogs(data);
        }
    }

    useEffect(() => {
        fetchLogs();
    }, [isLoaded]);

    // ── Resolve slug from async params ──────────────────
    useEffect(() => {
        params.then((p: any) => {
            setSlug(p.slug);
        });
    }, [params]);

    if (!slug || !isLoaded) return null;

    const mod = moduleData[slug] || moduleData.dinaveda;
    const Icon = mod.icon;

    // ── Deterministic engine computes recommendations ────
    const vikriti = computeVikriti(state);
    const moduleRecs = selectProtocols(state).filter(p => p.module.toLowerCase() === (slug as string).toLowerCase());

    // ── Placeholder for domain-specific views ───────────
    return (
        <div className="bg-[#F8FAF9] min-h-screen font-sans pb-40 relative overflow-x-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px]" />
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -ml-40" />

            {/* Header */}
            <header className="pt-20 pb-36 px-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <Link href="/modules" className="inline-flex items-center gap-3 mb-12 bg-white/60 hover:bg-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all backdrop-blur-md border border-slate-100 text-slate-500 hover:text-forest group shadow-sm">
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="w-20 h-20 bg-white shadow-premium border border-slate-100 rounded-[2rem] flex items-center justify-center mb-8">
                            <Icon className="w-10 h-10 text-forest" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-forest tracking-tighter mb-4 leading-none">{mod.title}</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">{mod.subtitle}</p>
                    </motion.div>
                </div>
            </header>

            {/* Main Content: Delegated to Domain Modules */}
            <main className="px-6 -mt-24 relative z-20 space-y-8 max-w-4xl mx-auto">
                {slug === 'nutriveda' && (
                    <NutrivedaPage
                        state={state} vikriti={vikriti} protocols={moduleRecs}
                    />
                )}
                {slug === 'ayufit' && (
                    <AyufitPage
                        state={state} vikriti={vikriti} protocols={moduleRecs}
                    />
                )}
                {slug === 'manasayur' && (
                    <ManasayurPage
                        state={state} vikriti={vikriti} protocols={moduleRecs}
                    />
                )}
                {slug === 'somasleep' && (
                    <SomasleepPage
                        state={state} vikriti={vikriti} protocols={moduleRecs}
                    />
                )}
                {slug === 'dinaveda' && (
                    <DinavedaPage
                        state={state} vikriti={vikriti} protocols={moduleRecs}
                    />
                )}
                {slug === 'rutuveda' && (
                    <RutuvedaPage
                        state={state} vikriti={vikriti} protocols={moduleRecs}
                    />
                )}
                {slug === 'sattvaliving' && (
                    <SattvalivingPage
                        state={state} vikriti={vikriti} protocols={moduleRecs}
                    />
                )}

                {/* Module-Specific History */}
                <ModuleHistory moduleSlug={slug} logs={logs} />

                {/* Default/Fallback for non-personalized modules */}
                {!['nutriveda', 'ayufit', 'manasayur', 'somasleep', 'sattvaliving', 'dinaveda', 'rutuveda'].includes(slug) && (
                    <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white">
                        <p className="text-xl font-bold text-slate-700">Detailed insights for this module are coming soon.</p>
                        <div className="mt-8 space-y-4">
                            {moduleRecs.map((p, i) => (
                                <div key={i} className="bg-white/60 p-6 rounded-2xl border border-slate-100 flex justify-between">
                                    <span className="font-bold text-forest">{humanizeSlug(p.name)}</span>
                                    <span className="text-xs text-slate-400 font-bold uppercase">{p.time_of_day}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
