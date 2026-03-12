import React from 'react';
import { CloudSun, Wind, Snowflake, Sun, Droplets, Thermometer, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';
import { formatProtocolName } from '@/utils/stringUtils';
import ProtocolCard from '@/components/modules/ProtocolCard';

interface RutuvedaPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
    subscriptionStatus: string;
    userId: string | null;
}


export default function RutuvedaPage({
    state,
    vikriti,
    protocols,
    subscriptionStatus,
    userId
}: RutuvedaPageProps) {
    const currentSeason = process.env.NEXT_PUBLIC_SEASON || "Spring (Vasanta)";

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Season Context */}
            <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-200/50">
                        <CloudSun className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Ritucharya Intelligence</h2>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest leading-tight">Seasonal Synchronization</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center bg-white/40 p-8 rounded-[2.5rem] border border-white/60 mb-8">
                    <div className="flex-1 text-center md:text-left">
                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest block mb-2">Current Cycle</span>
                        <h3 className="text-4xl font-black text-forest tracking-tighter">{currentSeason}</h3>
                    </div>
                    <div className="w-px h-12 bg-forest/10 hidden md:block" />
                    <div className="flex-1 text-center md:text-left">
                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest block mb-2">Dominant Imbalance</span>
                        <h3 className="text-4xl font-black text-orange-500 tracking-tighter">{vikriti?.dominant_dosha} Flux</h3>
                    </div>
                </div>

                <p className="text-xl font-bold text-slate-700 leading-relaxed border-l-4 border-sky-400/30 pl-6">
                    As the universe shifts, so must the inner biological fire. Harmony with seasons prevents disease by neutralizing accumulated Doshas.
                </p>
            </section>

            {/* Seasonal Protocols */}
            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-sky-50 flex items-center justify-center text-sky-600">
                        <Thermometer className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Seasonal Recalibrations</h2>
                </div>
                <div className="space-y-6">
                    {protocols.map((p, i) => (
                        <ProtocolCard
                            key={i}
                            protocol={p}
                            subscriptionStatus={subscriptionStatus}
                            userId={userId}
                        />
                    ))}
                    {protocols.length === 0 && (
                        <p className="text-xs font-bold text-slate-600 text-center py-10 italic">Your internal climate is currently stable against the seasonal backdrop.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
