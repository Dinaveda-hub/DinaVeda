"use client";

import React, { useState, useMemo } from 'react';
import { Clock, History, CheckCircle2, Calendar, ChevronDown, ChevronUp, Sparkles, Zap, Flame, Brain, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface PulseLog {
    id: string;
    created_at: string;
    ojas_score: number;
    module_slug?: string;
    agni?: string;
    ama?: string;
    mood?: string;
    detailed_analysis?: string;
}

interface ModuleHistoryProps {
    moduleSlug: string;
    logs: PulseLog[];
}

export default function ModuleHistory({ moduleSlug, logs }: ModuleHistoryProps) {
    const [expandedLog, setExpandedLog] = useState<string | null>(null);

    const moduleLogs = useMemo(() => {
        return logs
            .filter(log => log.module_slug === moduleSlug)
            .slice(0, 10);
    }, [logs, moduleSlug]);


    return (
        <section className="glass rounded-[3rem] p-8 md:p-12 shadow-premium border border-white">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-forest/5 flex items-center justify-center text-forest">
                        <History className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Temporal Activity</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Stewardship of Historical State</p>
                    </div>
                </div>
                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Protocol Archive</span>
            </div>

            <div className="space-y-6">
                {moduleLogs.length > 0 ? (
                    moduleLogs.map((log, i) => {
                        const ojas = log.ojas_score ?? 0;
                        const date = new Date(log.created_at || Date.now());
                        
                        // Generate quick insight
                        let insight = "Balanced State";
                        let InsightIcon = Sparkles;
                        let insightColor = "text-emerald-600 bg-emerald-50";

                        if (ojas > 80) {
                            insight = "Optimal Day";
                            InsightIcon = Zap;
                            insightColor = "text-emerald-600 bg-emerald-50";
                        } else if (log.agni === "low" || log.agni === "variable") {
                            insight = "Digestive Disturbance";
                            InsightIcon = Flame;
                            insightColor = "text-orange-600 bg-orange-50";
                        } else if (log.mood && log.mood.toLowerCase().includes("restless")) {
                            insight = "Restless Mind";
                            InsightIcon = Brain;
                            insightColor = "text-amber-600 bg-amber-50";
                        } else if (ojas < 60) {
                            insight = "Low Ojas Day";
                            InsightIcon = Activity; // Note: needs import if keeping activity, else fallback
                            insightColor = "text-rose-600 bg-rose-50";
                        }

                        return (
                        <div key={`${log.id}-${i}`} className="relative">
                            <motion.button
                                layout
                                aria-expanded={expandedLog === log.id}
                                onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                className={`w-full text-left bg-white/40 p-6 rounded-[2rem] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group ${expandedLog === log.id ? 'border-forest/30 bg-white ring-8 ring-forest/5 shadow-xl z-10' : 'border-slate-50 hover:bg-white z-0'
                                    }`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all ${expandedLog === log.id ? 'bg-forest text-white' : 'bg-forest/5 text-forest'
                                        }`}>
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-forest uppercase tracking-tight">
                                            {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                            <span className="w-1 h-1 rounded-full bg-slate-200 hidden md:block" />
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full hidden md:flex items-center gap-1 ${insightColor}`}>
                                                <InsightIcon className="w-3 h-3" />
                                                {insight}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full ${ojas > 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                        Ojas: {ojas}
                                    </span>
                                    {expandedLog === log.id ? <ChevronUp className="w-5 h-5 text-forest shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-300 group-hover:text-forest transition-colors shrink-0" />}
                                </div>
                            </motion.button>

                            <AnimatePresence>
                                {expandedLog === log.id && (
                                    <motion.div
                                        layout
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-white/60 border-x border-b border-forest/10 rounded-b-[2rem] -mt-6 pt-10 p-8 shadow-inner"
                                    >
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 text-forest border-b border-forest/5 pb-4">
                                                <Sparkles className="w-4 h-4" />
                                                <h4 className="text-[10px] font-black uppercase tracking-widest">Biological Protocols Provided</h4>
                                            </div>

                                            <div className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line bg-white/50 p-6 rounded-2xl border border-white">
                                                {log.detailed_analysis || "No secondary protocol breakdown recorded for this interaction."}
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="bg-white/40 p-4 rounded-xl border border-white">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Agni Status</p>
                                                    <p className="text-[10px] font-black text-forest uppercase">{log.agni || 'Balanced'}</p>
                                                </div>
                                                <div className="bg-white/40 p-4 rounded-xl border border-white">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Ama State</p>
                                                    <p className="text-[10px] font-black text-forest uppercase">{log.ama || 'None'}</p>
                                                </div>
                                                <div className="bg-white/40 p-4 rounded-xl border border-white">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Mood Archetype</p>
                                                    <p className="text-[10px] font-black text-forest uppercase">{log.mood || 'Calm'}</p>
                                                </div>
                                                <div className="bg-white/40 p-4 rounded-xl border border-white">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sync Intensity</p>
                                                    <p className="text-[10px] font-black text-forest uppercase">{ojas}% Ojas</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        );
                    })
                ) : (
                    <div className="py-20 text-center glass rounded-[2rem] border border-slate-50">
                        <History className="w-12 h-12 text-slate-200 mx-auto mb-6" />
                        <p className="text-xs font-black text-slate-300 uppercase tracking-widest italic">No historical data recorded for this biological archetype.</p>
                    </div>
                )}
            </div>

            {moduleLogs.length > 0 && (
                <div className="mt-12 flex items-center justify-center gap-4">
                    <div className="h-px bg-forest/5 flex-1" />
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Syncretic Alignment Complete</p>
                    <div className="h-px bg-forest/5 flex-1" />
                </div>
            )}
        </section>
    );
}
