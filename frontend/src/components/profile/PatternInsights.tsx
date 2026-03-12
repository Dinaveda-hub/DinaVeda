"use client";

/**
 * PatternInsights.tsx
 *
 * Premium-gated UI component that displays detected physiological patterns
 * from the Physiology Memory Layer. Shows confidence bars, occurrence counts,
 * and human-readable descriptions.
 */

import { motion } from "framer-motion";
import { Brain, RefreshCw, Lock, TrendingUp, Eye } from "lucide-react";
import { usePatterns } from "@/hooks/usePatterns";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";

const PATTERN_ICONS: Record<string, string> = {
    sleep_agni_correlation: "🔥",
    late_dinner_kapha: "🌙",
    stress_agni_suppression: "😰",
    exercise_ojas_boost: "💪",
    hydration_energy: "💧",
    early_wake_circadian: "🌅",
    screen_sleep_disruption: "📱",
};

const CONFIDENCE_COLORS: Record<string, string> = {
    high: "bg-emerald-500",
    medium: "bg-amber-500",
    low: "bg-red-400",
};

function getConfidenceLevel(confidence: number): string {
    if (confidence >= 0.7) return "high";
    if (confidence >= 0.45) return "medium";
    return "low";
}

function getConfidenceLabel(confidence: number): string {
    if (confidence >= 0.8) return "Strong";
    if (confidence >= 0.6) return "Moderate";
    if (confidence >= 0.4) return "Emerging";
    return "Weak";
}

export default function PatternInsights() {
    const { patterns, isLoading, analyze } = usePatterns();
    const { subscriptionStatus } = usePhysiologyState();
    const isPremium = subscriptionStatus === "active";

    if (!isPremium) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] p-8 border border-slate-200/60"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-forest uppercase tracking-widest">Behavioral Memory</h3>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Premium Feature</p>
                    </div>
                </div>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                    Unlock long-term pattern detection to understand how your daily habits shape your physiology over weeks.
                </p>
                <a
                    href="/premium"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-black text-forest uppercase tracking-widest hover:text-forest/70 transition-colors"
                >
                    Upgrade to Premium <TrendingUp className="w-3.5 h-3.5" />
                </a>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-forest uppercase tracking-widest">Behavioral Memory</h3>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">30-Day Pattern Analysis</p>
                    </div>
                </div>
                <button
                    onClick={analyze}
                    disabled={isLoading}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors disabled:opacity-50"
                    title="Re-analyze patterns"
                >
                    <RefreshCw className={`w-4 h-4 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Pattern List */}
            {patterns.length === 0 ? (
                <div className="text-center py-8">
                    <Eye className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-bold text-slate-600">No patterns detected yet</p>
                    <p className="text-xs text-slate-300 mt-1">Log at least 7 days for pattern detection to activate.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {patterns.map((pattern, i) => {
                        const level = getConfidenceLevel(pattern.confidence);
                        const colorClass = CONFIDENCE_COLORS[level];
                        const icon = PATTERN_ICONS[pattern.pattern_type] || "📊";
                        const pct = Math.round(pattern.confidence * 100);

                        return (
                            <motion.div
                                key={pattern.pattern_type}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="group bg-slate-50/60 hover:bg-slate-50 rounded-2xl p-4 transition-all border border-transparent hover:border-slate-100"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-lg mt-0.5">{icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-700 leading-snug">
                                            {pattern.description}
                                        </p>
                                        <div className="flex items-center gap-3 mt-2">
                                            {/* Confidence bar */}
                                            <div className="flex-1 h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ delay: i * 0.08 + 0.3, duration: 0.5 }}
                                                    className={`h-full rounded-full ${colorClass}`}
                                                />
                                            </div>
                                            <span className="text-xs font-black text-slate-600 tabular-nums whitespace-nowrap">
                                                {pct}% {getConfidenceLabel(pattern.confidence)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 mt-1.5 font-bold">
                                            Observed {pattern.occurrences} time{pattern.occurrences !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}
