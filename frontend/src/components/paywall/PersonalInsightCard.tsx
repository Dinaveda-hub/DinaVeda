"use client";

import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { Sparkles } from "lucide-react";

export default function PersonalInsightCard() {
  const { state } = usePhysiologyState();

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm max-w-md mx-auto mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full blur-xl -mr-10 -mt-10 pointer-events-none" />
      
      <p className="text-xs font-black uppercase tracking-widest text-slate-600 mb-6 flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-gold" /> Your Physiology Today
      </p>

      <div className="space-y-4 text-sm font-semibold text-slate-600">
        <div className="flex justify-between items-center pb-2 border-b border-slate-50">
          <span>Vata Intensity</span>
          <span className={state.vata > 60 ? "text-orange-600" : "text-emerald-700"}>
            {Math.round(state.vata)}%
          </span>
        </div>

        <div className="flex justify-between items-center pb-2 border-b border-slate-50">
          <span>Agni Strength</span>
          <span className="text-forest">
            {Math.round(state.agni)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span>Ojas Reserve</span>
          <span className="text-forest">
            {Math.round(state.ojas)}/100
          </span>
        </div>
      </div>

      <p className="text-xs font-bold text-forest mt-6 pt-4 border-t border-slate-50">
        Premium generates routines to optimize these patterns.
      </p>
    </div>
  );
}
