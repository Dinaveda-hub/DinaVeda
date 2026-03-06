import React from 'react';
import { Activity, ShieldCheck, Clock, CheckCircle2, Zap, BrainCircuit, Sparkles } from 'lucide-react';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';

interface DinavedaPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
}

const humanizeSlug = (slug: string) => {
    return slug
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default function DinavedaPage({
    state,
    vikriti,
    protocols,
}: DinavedaPageProps) {
    const ojasScore = state.ojas_score || 50;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Principle Section */}
            <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-forest/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-forest text-white flex items-center justify-center shadow-lg shadow-forest/20">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Dinacharya Logic</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Mastery of the Day</p>
                    </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-10 border-l-4 border-forest/20 pl-6 text-balance">
                    Mastery over the self begins with mastery over the day. Daily rhythm establishes the biological clock.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Ojas Core</p>
                        <p className="text-4xl font-black text-forest tracking-tighter">{Math.round(ojasScore)}</p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Vitality State</p>
                        <p className="text-4xl font-black text-forest tracking-tighter">
                            {ojasScore > 85 ? "Tejas" : ojasScore > 60 ? "Sama" : "Ojas-Kshaya"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Rituals Section */}
            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-amber-50 flex items-center justify-center text-amber-600">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Sanctified Rituals</h2>
                </div>
                <div className="space-y-4">
                    {protocols.map((p, i) => (
                        <div key={i} className="bg-white/60 p-6 md:p-8 rounded-[2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-100 hover:bg-white transition-all hover:shadow-md group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest shrink-0 mt-1 transition-transform group-hover:scale-110">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-black text-xl text-forest tracking-tighter mb-1">{humanizeSlug(p.name)}</h4>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-lg">{p.instructions}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100/50">
                                <Clock className="w-3 h-3 text-forest" /> {p.time_of_day}
                            </div>
                        </div>
                    ))}
                    {protocols.length === 0 && (
                        <p className="text-xs font-bold text-slate-400 text-center py-10 italic">No specific daily rituals triggered for your current state.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
