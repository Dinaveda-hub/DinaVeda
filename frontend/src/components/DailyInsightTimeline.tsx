"use client";

import { Sunrise, Sun, Moon } from "lucide-react";

export default function DailyInsightTimeline() {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:-translate-y-2 transition-transform shadow-sm hover:shadow-premium duration-300">
        <Sunrise className="w-6 h-6 text-emerald-500 mb-4" />
        <h4 className="text-lg font-black text-forest mb-2">Morning</h4>
        <p className="text-sm font-bold text-slate-500 leading-relaxed">
          Warm water + gentle movement to stabilize Vata.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:-translate-y-2 transition-transform shadow-sm hover:shadow-premium duration-300">
        <Sun className="w-6 h-6 text-orange-500 mb-4" />
        <h4 className="text-lg font-black text-forest mb-2">Midday</h4>
        <p className="text-sm font-bold text-slate-500 leading-relaxed">
          Strong Agni window — eat your largest meal here.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:-translate-y-2 transition-transform shadow-sm hover:shadow-premium duration-300">
        <Moon className="w-6 h-6 text-indigo-500 mb-4" />
        <h4 className="text-lg font-black text-forest mb-2">Evening</h4>
        <p className="text-sm font-bold text-slate-500 leading-relaxed">
          Reduce stimulation to restore circadian balance.
        </p>
      </div>
    </div>
  );
}
