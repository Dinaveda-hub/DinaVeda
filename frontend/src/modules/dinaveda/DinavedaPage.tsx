import React from 'react';
import { Activity, CheckCircle2, Sun, Moon, CloudSun } from 'lucide-react';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';
import { formatProtocolName } from '@/utils/stringUtils';
import { motion } from 'framer-motion';
import ProtocolCard from '@/components/modules/ProtocolCard';

interface DinavedaPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
    subscriptionStatus: string;
    userId: string | null;
    dailyProtocols?: {
        morning: Protocol[];
        midday: Protocol[];
        evening: Protocol[];
    };
}

export default function DinavedaPage({
    state,
    vikriti,
    protocols,
    subscriptionStatus,
    userId,
    dailyProtocols
}: DinavedaPageProps) {
    const ojasScore = state.ojas || 50;

    const sections = [
        { title: "Morning", icon: CloudSun, data: dailyProtocols?.morning || [], color: "text-amber-500", bg: "bg-amber-50" },
        { title: "Midday", icon: Sun, data: dailyProtocols?.midday || [], color: "text-orange-500", bg: "bg-orange-50" },
        { title: "Evening", icon: Moon, data: dailyProtocols?.evening || [], color: "text-indigo-600", bg: "bg-indigo-50" }
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                            <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(state.ojas)}</p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Vitality State</p>
                        <p className="text-4xl font-black text-forest tracking-tighter">
                            {ojasScore > 85 ? "Tejas" : ojasScore > 60 ? "Sama" : "Ojas-Kshaya"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Rituals Plan Section */}
            <div className="space-y-12">
                <header className="px-4">
                    <h3 className="text-forest font-black uppercase tracking-[0.4em] text-sm mb-2">Today's Protocol</h3>
                    <div className="h-1 w-20 bg-forest/20 rounded-full" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {sections.map((section) => (
                        <section key={section.title} className="space-y-6">
                            <div className="flex items-center gap-3 px-4">
                                <div className={`w-10 h-10 rounded-xl ${section.bg} flex items-center justify-center ${section.color}`}>
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <h4 className="text-sm font-black text-forest uppercase tracking-[0.2em]">{section.title}</h4>
                            </div>

                            <div className="space-y-4">
                                {section.data.length > 0 ? (
                                    section.data.map((p, i) => (
                                        <ProtocolCard
                                            key={i}
                                            protocol={p}
                                            subscriptionStatus={subscriptionStatus}
                                            userId={userId}
                                        />
                                    ))
                                ) : (
                                    <div className="bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-[2rem] p-8 text-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">
                                            No acute {section.title.toLowerCase()} protocols active. Maintain balanced activity and mindful meals.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
