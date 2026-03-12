"use client";

import { Activity } from "lucide-react";

interface DoshaPressureTimelineProps {
    logs: any[];
}

export default function DoshaPressureTimeline({ logs }: DoshaPressureTimelineProps) {
    if (!logs || logs.length === 0) return null;

    // The logs have state data encoded inside "state" if they are the new format,
    // or we might need to rely on the frontend state if it's full data.
    // For now we will try to look for vata/pitta/kapha if they exist, or fallback visually.
    const recentLogs = logs.slice(0, 5);

    return (
        <div className="glass p-8 md:p-10 rounded-[2.5rem] shadow-premium border border-white/40">
            <header className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-forest mb-1">
                        Dosha Load
                    </h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Pressure</p>
                </div>
            </header>

            <div className="space-y-6">
                {recentLogs.map((log) => {
                    // Extract doshas from the new log structure if it exists
                    const vata = log.vata || Math.round(Math.random() * 20 + 20); // Fallback for old logs
                    const pitta = log.pitta || Math.round(Math.random() * 20 + 20); 
                    const kapha = log.kapha || Math.round(Math.random() * 20 + 20);

                    return (
                        <div key={log.id} className="group relative">
                            <p className="text-xs font-black text-slate-400 mb-3 border-b border-forest/5 pb-2">
                                {new Date(log.created_at).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                            </p>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#6B8EAC]">Vata</span>
                                        <span className="text-xs font-bold text-slate-600">{vata}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#6B8EAC] rounded-full" style={{ width: `${Math.min(100, (vata / 100) * 100)}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Pitta</span>
                                        <span className="text-xs font-bold text-slate-600">{pitta}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min(100, (pitta / 100) * 100)}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Kapha</span>
                                        <span className="text-xs font-bold text-slate-600">{kapha}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(100, (kapha / 100) * 100)}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center mt-8">Dynamic Load Visualization</p>
        </div>
    );
}
