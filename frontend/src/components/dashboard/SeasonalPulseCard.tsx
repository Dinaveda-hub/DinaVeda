"use client";

import { CloudSun } from "lucide-react";

interface SeasonalPulseCardProps {
  ritu: {
    name: string;
    description: string;
  };
}

const SEASON_COLORS: Record<string, { title: string; panel: string }> = {
  Hemanta: {
    title: "text-emerald-700",
    panel: "bg-[#EEF5F2]",
  },
  Shishira: {
    title: "text-slate-700",
    panel: "bg-[#F2F3F5]",
  },
  Vasanta: {
    title: "text-orange-600",
    panel: "bg-[#F4EFE7]",
  },
  Grishma: {
    title: "text-red-600",
    panel: "bg-[#F7EFEF]",
  },
  Varsha: {
    title: "text-indigo-600",
    panel: "bg-[#EEF2F8]",
  },
  Sharad: {
    title: "text-yellow-600",
    panel: "bg-[#F9F5E8]",
  }
};

export default function SeasonalPulseCard({ ritu }: SeasonalPulseCardProps) {
  const key = ritu.name.split(" ")[0];
  const colors = SEASON_COLORS[key] || SEASON_COLORS.Vasanta;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700 mb-6">
        <CloudSun className="w-4 h-4 text-orange-500" />
        Seasonal Rhythm
      </div>

      {/* Season Panel */}
      <div className={`rounded-2xl py-10 text-center ${colors.panel} border border-slate-50/50`}>
        <h3 className={`text-4xl font-black tracking-tight ${colors.title}`}>
          {key}
        </h3>
      </div>

      {/* Description */}
      <p className="mt-8 text-lg font-semibold text-slate-500 leading-relaxed">
        {ritu.description}
      </p>
    </div>
  );
}
