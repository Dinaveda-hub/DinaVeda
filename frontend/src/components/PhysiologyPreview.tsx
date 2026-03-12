"use client";

import { useState } from "react";
import { Activity } from "lucide-react";

export default function PhysiologyPreview() {
  const [sleep, setSleep] = useState(7);

  const score = Math.min(100, Math.round((sleep / 8) * 85 + 10));

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-premium max-w-md mx-auto hover:-translate-y-1 transition-transform">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Physiology Preview
        </p>
        <Activity className="w-4 h-4 text-forest" />
      </div>

      <p className="text-sm font-semibold text-slate-600 mb-6">
        Adjust your sleep to see how Dinaveda evaluates daily vitality.
      </p>

      <input
        type="range"
        min="4"
        max="10"
        step="0.5"
        value={sleep}
        onChange={(e) => setSleep(Number(e.target.value))}
        className="w-full mb-6 accent-forest cursor-pointer"
        aria-label="Sleep hours"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-forest">{score}</span>
            <span className="text-sm font-bold text-slate-400">/{sleep} hrs</span>
        </div>
        <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">
          Ojas Estimate
        </span>
      </div>
    </div>
  );
}
