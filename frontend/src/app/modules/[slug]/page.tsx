"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo, use } from "react";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { computeVikriti } from "@/engine/vikritiEngine";
import { selectProtocols, filterProtocols, Protocol } from "@/engine/protocolSelectionEngine";
import { getProtocolsForModule, ModuleName } from "@/engine/moduleEngine";
import { formatProtocolName } from "@/utils/stringUtils";
import { fetchUserProtocolWeights, ProtocolWeights } from "@/utils/userWeightsService";
import ModuleHistory from "@/components/ModuleHistory";
import { MODULE_MAP, ModuleId } from "@/data/moduleRegistry";

// Domain Module Pages — static imports for dynamic component rendering
import NutrivedaPage from "@/modules/nutriveda/NutrivedaPage";
import AyufitPage from "@/modules/ayufit/AyufitPage";
import ManasayurPage from "@/modules/manasayur/ManasayurPage";
import SomasleepPage from "@/modules/somasleep/SomasleepPage";
import SattvalivingPage from "@/modules/sattvaliving/SattvalivingPage";
import DinavedaPage from "@/modules/dinaveda/DinavedaPage";
import RutuvedaPage from "@/modules/rutuveda/RutuvedaPage";
import ProtocolExplanation from "@/components/modules/ProtocolExplanation"; // New import

// ─────────────────────────────────────────────────────────
// Dynamic Component Map (replaces conditional slug checks)
// ─────────────────────────────────────────────────────────

const MODULE_COMPONENTS: Record<string, React.ComponentType<any>> = {
    nutriveda: NutrivedaPage,
    ayufit: AyufitPage,
    manasayur: ManasayurPage,
    somasleep: SomasleepPage,
    sattvaliving: SattvalivingPage,
    dinaveda: DinavedaPage,
    rutuveda: RutuvedaPage,
};

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

/**
 * Renders the AI routine text with basic formatting.
 */
function RoutineText({ content }: { content: string }) {
    const lines = content.split('\n');
    return (
        <div className="space-y-1 text-sm leading-relaxed text-slate-700">
            {lines.map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="h-2" />;
                if (trimmed.endsWith(':') || /^[A-Z][A-Za-z\s]+:$/.test(trimmed)) {
                    return (
                        <p key={i} className="font-black text-forest text-xs uppercase tracking-[0.2em] mt-4 first:mt-0">
                            {trimmed}
                        </p>
                    );
                }
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

const COLOR_MAP = {
    air: { bg: "bg-blue-50", icon: "text-blue-800" },
    water: { bg: "bg-teal-50", icon: "text-teal-800" },
    earth: { bg: "bg-emerald-50", icon: "text-forest" },
    fire: { bg: "bg-orange-50", icon: "text-orange-900" },
    space: { bg: "bg-indigo-50", icon: "text-indigo-800" }
};

// ─────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────

export default function ModuleDetail({ params }: { params: Promise<{ slug: string }> }) {
    // Fix #3: Use React.use() to unwrap the async params promise.
    const { slug } = use(params);

    // Engine & Data State
    const { state, isLoaded, subscriptionStatus, userId } = usePhysiologyState();
    const [logs, setLogs] = useState<any[]>([]);
    const [userWeights, setUserWeights] = useState<ProtocolWeights>({});

    // Fix #9: Run data fetches once when auth is ready, not on every isLoaded change
    useEffect(() => {
        if (!isLoaded) return;

        let cancelled = false;

        const init = async () => {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();

            if (cancelled) return;

            if (session) {
                // Fix #10: Select only needed columns and limit to 50
                const { data } = await supabase
                    .from("pulse_logs")
                    .select("id, created_at, ojas_score, agni, ama, mood, detailed_analysis, routines")
                    .eq("user_id", session.user.id)
                    .order("created_at", { ascending: false })
                    .limit(50);

                if (!cancelled && data) setLogs(data);
            }

            // Fetch user weights for protocol scoring
            const weights = await fetchUserProtocolWeights();
            if (!cancelled) setUserWeights(weights);
        };

        init();

        return () => { cancelled = true; };
    }, [isLoaded]);

    // Fix #4 & #5: Memoize engine computations
    const vikriti = useMemo(() => {
        if (!isLoaded) return null;
        return computeVikriti(state);
    }, [state, isLoaded]);

    // Fix #6: Pass healthGoal and userWeights to selectProtocols
    const healthGoal = typeof window !== 'undefined'
        ? localStorage.getItem("health_goal") || "general_wellness"
        : "general_wellness";

    const allProtocols = useMemo(() => {
        if (!isLoaded) return [];
        return selectProtocols(state, userWeights, healthGoal);
    }, [state, userWeights, healthGoal, isLoaded]);

    const moduleRecs = useMemo(() => {
        const filtered = getProtocolsForModule(allProtocols, slug.toLowerCase() as ModuleName);
        return filtered.slice(0, 4); // Show only top 4 to prevent user fatigue
    }, [allProtocols, slug]);

    const dailyProtocols = useMemo(() => {
        if (slug !== 'dinaveda') return undefined;
        // Enforce Module Isolation for Dinacharya view as well
        const moduleSpecific = getProtocolsForModule(allProtocols, 'dinaveda');
        // Still cap total protocols to 4 per rule
        return filterProtocols(moduleSpecific.slice(0, 4));
    }, [allProtocols, slug]);

    if (!isLoaded || !vikriti) return null;

    // Resolve module definition from shared registry
    const moduleId = slug as ModuleId;
    const mod = MODULE_MAP[moduleId] || MODULE_MAP["dinaveda"];
    const Icon = mod.icon;
    const styles = COLOR_MAP[mod.color as keyof typeof COLOR_MAP];

    // Fix #8: Dynamic component lookup
    const DomainComponent = MODULE_COMPONENTS[slug];

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
                        <div className={`w-20 h-20 ${styles.bg} shadow-premium border border-white rounded-[2rem] flex items-center justify-center mb-8`}>
                            <Icon className={`w-10 h-10 ${styles.icon}`} />
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-5 md:mb-6 leading-none">{mod.title}</h1>
                        <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">{mod.subtitle}</p>
                    </motion.div>
                </div>
            </header>

            {/* Main Content: Delegated to Domain Modules */}
            <main className="px-6 -mt-24 relative z-20 space-y-8 max-w-4xl mx-auto">
                {DomainComponent ? (
                    <DomainComponent
                        state={state}
                        vikriti={vikriti}
                        protocols={moduleRecs}
                        subscriptionStatus={subscriptionStatus}
                        userId={userId}
                        {...(slug === 'dinaveda' ? { dailyProtocols } : {})}
                    />
                ) : (
                    /* Fallback for non-personalized / future modules */
                    <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white">
                        <p className="text-xl font-bold text-slate-700">Detailed insights for this module are coming soon.</p>
                        <div className="mt-8 space-y-4">
                            {moduleRecs.map((p, i) => (
                                <div key={i} className="bg-white/60 p-6 rounded-2xl border border-slate-100 flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-forest">
                                            {p.display_name || formatProtocolName(p.name)}
                                        </span>
                                        <span className="text-xs text-slate-400 font-bold uppercase">{p.time_of_day}</span>
                                    </div>
                                    <ProtocolExplanation protocolName={p.name} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Module-Specific History */}
                <ModuleHistory moduleSlug={slug} logs={logs} />
            </main>
        </div>
    );
}
