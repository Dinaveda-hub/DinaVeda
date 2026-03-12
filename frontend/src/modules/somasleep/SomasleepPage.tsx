import React from 'react';
import { Moon, Sunrise, CheckCircle2, Clock, Sparkles, Lock } from 'lucide-react';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';
import { getSleepInsight } from './sleepLogic';
import { formatProtocolName } from '@/utils/stringUtils';
import ProtocolCard from '@/components/modules/ProtocolCard';

interface SomasleepPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
    subscriptionStatus: string;
    userId: string | null;
}


export default function SomasleepPage({
    state,
    vikriti,
    protocols,
    subscriptionStatus,
    userId
}: SomasleepPageProps) {
    const sleepInsight = getSleepInsight(state);

    return (
        <div className="space-y-8">
            {/* ... sections ... */}
            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-700">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Circadian Protocols</h2>
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
                </div>
            </section>
        </div>
    );
}
