"use client";

import { Lock } from "lucide-react";

export default function PremiumPreview() {
  return (
    <section className="px-6 mb-16 max-w-xl mx-auto">
      <h3 className="text-xl font-black text-forest text-center mb-6 tracking-tight">
        Premium Insights Preview
      </h3>

      <div className="relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm shadow-slate-200/50">
        {/* Blurred Content */}
        <div className="blur-[3px] opacity-40 p-8 scale-[1.02] pointer-events-none select-none">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            Tomorrow's Protocol Forecast
          </p>

          <div className="space-y-4 text-sm font-bold text-slate-600">
            <div className="flex justify-between items-center pb-3 border-b border-slate-50">
              <span>Vata Drift</span>
              <span className="text-orange-500">Rising Intensity</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-50">
              <span>Agni (Digestive Fire)</span>
              <span className="text-emerald-600">Stable Strength</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Recommended Focus</span>
              <span className="text-forest">Deep Grounding</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2">
             <div className="h-1 bg-forest/20 rounded-full" />
             <div className="h-1 bg-forest/40 rounded-full" />
             <div className="h-1 bg-forest/10 rounded-full" />
          </div>
        </div>

        {/* Lock Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-4 border border-slate-100">
             <Lock className="w-6 h-6 text-forest" />
          </div>
          <div className="bg-forest text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-forest/20">
            Unlock Advanced Forensics
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-[0.15em]">
        Join premium to see your 24-hour predictive model
      </p>
    </section>
  );
}
