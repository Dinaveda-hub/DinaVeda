"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

interface Props {
  sleep?: string;
  dinner?: string;
}

export default function SampleInsightCard({ sleep = "23:30", dinner = "20:30" }: Props) {
  const insight = useMemo(() => {
    const sleepHour = parseInt(sleep.split(":")[0]) || 23;
    const dinnerHour = parseInt(dinner.split(":")[0]) || 20;

    if (sleepHour > 23 && dinnerHour > 20) {
      return "Late meals combined with late sleep may increase Kapha heaviness tomorrow morning. Earlier dinners and warm evening routines can improve digestion and energy.";
    }

    if (sleepHour <= 23 && dinnerHour <= 19) {
      return "Your timing supports healthy circadian rhythm. Maintaining early dinners and consistent sleep helps strengthen digestive fire (Agni).";
    }

    if (sleepHour > 23) {
      return "Late sleep can disturb Vata rhythms and reduce morning clarity. A wind-down routine around 10:30 PM can improve recovery.";
    }

    return "Dinner timing influences overnight digestion. Earlier meals allow the body to rest and restore energy for the next day.";
  }, [sleep, dinner]);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-premium p-8 max-w-sm w-full relative group hover:border-forest/20 transition-all">

      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-gold" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          Sample Dinaveda Insight
        </span>
      </div>

      <p className="text-sm font-bold text-slate-600 leading-relaxed mb-6 italic border-l-2 border-forest/20 pl-4 py-1">
        "{insight}"
      </p>

      <Link
        href="/login"
        className="inline-flex items-center justify-center
        w-full px-6 py-4 rounded-xl bg-forest/5 text-forest
        font-black text-[10px] uppercase tracking-widest
        hover:bg-forest/10 transition group-active:scale-95"
      >
        View Your Insights <ArrowRight className="w-4 h-4 ml-2" />
      </Link>

    </div>
  );
}
