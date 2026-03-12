"use client";

import { BrainCircuit } from "lucide-react";

interface InsightTimelineProps {
    logs: any[];
}

export default function InsightTimeline({ logs }: InsightTimelineProps) {
    const insights = logs
        .filter((l: any) => l.detailed_analysis)
        .slice(0, 5);

    if (insights.length === 0) return null;

    return (
        <div className="glass p-8 md:p-10 rounded-[2.5rem] shadow-premium border border-white/40">
            <header className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-forest mb-1">
                        Veda Intelligence
                    </h3>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Medical Journal</p>
                </div>
            </header>

            <div className="space-y-6">
                {insights.map((log: any) => (
                    <div key={log.id} className="relative group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 to-indigo-50 rounded-full" />
                        
                        <div className="pl-6">
                            <p className="text-[10px] font-black text-indigo-400/80 uppercase tracking-widest mb-2">
                                {new Date(log.created_at).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                            
                            <p className="text-sm md:text-base font-bold text-slate-700 leading-relaxed italic bg-indigo-50/30 p-4 rounded-xl border border-indigo-100/50">
                                "{log.detailed_analysis}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
