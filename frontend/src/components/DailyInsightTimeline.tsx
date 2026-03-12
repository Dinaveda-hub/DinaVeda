"use client";

import { Sunrise, Sun, Moon } from "lucide-react";
import { usePhysiology } from "@/contexts/PhysiologyContext";

export default function DailyInsightTimeline() {
  const { state } = usePhysiology();
  const { vata, pitta, kapha } = state;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Morning Card */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 transition-all duration-300 md:hover:-translate-y-2 active:scale-[0.98] shadow-sm md:hover:shadow-premium">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
          <Sunrise className="w-5 h-5 text-emerald-500" />
        </div>
        <h4 className="text-lg font-black text-forest mb-2">Morning</h4>
        <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-[22ch]">
          {vata > 65 
            ? "Prioritize grounding warm water and stillness to stabilize high Vata."
            : "Gentle movement and warm water to awaken your system."}
        </p>
      </div>

      {/* Midday Card */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 transition-all duration-300 md:hover:-translate-y-2 active:scale-[0.98] shadow-sm md:hover:shadow-premium">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
          <Sun className="w-5 h-5 text-orange-500" />
        </div>
        <h4 className="text-lg font-black text-forest mb-2">Midday</h4>
        <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-[22ch]">
          {pitta > 65
            ? "Agni is peak, but Pitta is high — favor cooling, nourishing foods."
            : "Strong Agni window — consume your largest, most nutrient-dense meal."}
        </p>
      </div>

      {/* Evening Card */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 transition-all duration-300 md:hover:-translate-y-2 active:scale-[0.98] shadow-sm md:hover:shadow-premium">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
          <Moon className="w-5 h-5 text-indigo-500" />
        </div>
        <h4 className="text-lg font-black text-forest mb-2">Evening</h4>
        <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-[22ch]">
          {kapha > 65
            ? "Inertia is high — prioritize light activity or stretching before rest."
            : "Reduce stimulation and focus on restoration to reset your biological clock."}
        </p>
      </div>
    </div>
  );
}
