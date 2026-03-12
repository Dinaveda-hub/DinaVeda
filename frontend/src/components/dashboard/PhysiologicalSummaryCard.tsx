"use client";

import { Sparkles, Activity, Flame, Clock, AlertCircle } from "lucide-react";

interface PhysiologicalSummaryCardProps {
  ojasScore: number;
  strain: number;
  agniState: string;
  circadian: number;
  drift: number;
  driftType?: string;
}

export default function PhysiologicalSummaryCard({
  ojasScore,
  strain,
  agniState,
  circadian,
  drift,
  driftType
}: PhysiologicalSummaryCardProps) {

  return (
    <div className="space-y-6">

      {/* Daily Health Score */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
        
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
          <Sparkles className="w-4 h-4 text-gold" />
          Daily Health Score
        </div>

        <div className="text-6xl font-black text-forest leading-none">
          {ojasScore}
        </div>

        <div className="text-sm font-black uppercase tracking-widest text-slate-500 mt-6 flex items-center gap-2">
          Ojas Balance
          <div className="h-px flex-1 bg-slate-50" />
        </div>
      </div>

      {/* Physiological Strain */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
          <Activity className="w-4 h-4 text-orange-500" />
          Physiological Strain
        </div>

        <div className="text-6xl font-black text-orange-500 leading-none">
          {strain}
        </div>

        <div className="text-sm font-black uppercase tracking-widest text-slate-500 mt-6 flex items-center gap-2">
          Imbalance Pressure
          <div className="h-px flex-1 bg-slate-50" />
        </div>
      </div>

      {/* Micro Metrics */}
      <div className="grid grid-cols-3 gap-4">

        {/* Agni */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center group hover:border-orange-200 transition-colors">
          <div className="flex justify-center mb-2 text-slate-400 group-hover:text-orange-500 transition-colors">
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Agni
          </div>
          <div className="text-xl font-black text-orange-500">
            {agniState}
          </div>
        </div>

        {/* Circadian */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center group hover:border-blue-200 transition-colors">
          <div className="flex justify-center mb-2 text-slate-400 group-hover:text-blue-500 transition-colors">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Circadian
          </div>
          <div className="text-xl font-black text-blue-600">
            {circadian}%
          </div>
        </div>

        {/* Drift */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center group hover:border-forest/20 transition-colors">
          <div className="flex justify-center mb-2 text-slate-400 group-hover:text-forest transition-colors">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Drift
          </div>
          <div className="text-xl font-black text-forest">
            {drift}% 
            {driftType && (
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">
                ({driftType})
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
