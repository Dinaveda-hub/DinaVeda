import React from 'react';
import { Clock, History, CheckCircle2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleHistoryProps {
    moduleSlug: string;
    logs: any[];
}

export default function ModuleHistory({ moduleSlug, logs }: ModuleHistoryProps) {
    // Filter logs that have routines belonging to this module
    // Note: In the current schema, 'routines' is an array of strings like 'water_therapy'
    // We need to match these against protocols to see if they belong to this module.

    const moduleLogs = logs.filter(log => {
        if (!log.routines) return false;
        // This is a simplification; in a real scenario we'd check against the protocol registry module field
        // For now, we'll show logs that have any activity if we are in a module
        return true;
    }).slice(0, 5); // Show last 5 interactions

    return (
        <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-slate-50 flex items-center justify-center text-slate-400">
                        <History className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Temporal Activity</h2>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Module History</span>
            </div>

            <div className="space-y-4">
                {moduleLogs.length > 0 ? (
                    moduleLogs.map((log, i) => (
                        <div key={log.id} className="bg-white/40 p-6 rounded-[2rem] border border-slate-50 flex items-center justify-between group hover:bg-white transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-forest uppercase tracking-tight">
                                        {new Date(log.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${log.ojas_score > 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                    Ojas: {log.ojas_score}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-10 text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">No historical data recorded for this module archetype.</p>
                    </div>
                )}
            </div>

            {moduleLogs.length > 0 && (
                <p className="mt-6 text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Syncing with Biological Archive...</p>
            )}
        </section>
    );
}
