"use client";

import { useState } from "react";

export default function CircadianPreview() {
  const [sleep, setSleep] = useState("23:00");
  const [wake, setWake] = useState("07:00");
  const [dinner, setDinner] = useState("20:00");

  const computeScore = () => {
    let score = 100;

    const sleepHour = parseInt(sleep.split(":")[0]);
    const wakeHour = parseInt(wake.split(":")[0]);
    const dinnerHour = parseInt(dinner.split(":")[0]);

    if (sleepHour > 23) score -= 15;
    if (wakeHour > 7) score -= 10;
    if (dinnerHour > 20) score -= 10;

    return Math.max(score, 40);
  };

  const score = computeScore();

  let recommendation = "";
  if (score >= 90) {
      recommendation = "Excellent alignment! Your rhythms naturally support Ojas.";
  } else if (score >= 70) {
      recommendation = "Good, but tweaking dinner or sleep timing slightly could boost energy.";
  } else {
      recommendation = "Your circadian rhythm may improve with earlier dinner timing.";
  }

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-premium p-8 w-full max-w-sm">
      
      <h3 className="text-xl font-black text-forest tracking-tighter mb-6 relative z-10">
        Check Your Rhythms
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">
            Sleep Time
          </label>
          <input
            type="time"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-[1.2rem] px-5 py-3 font-bold text-slate-700 outline-none focus:border-forest/30 transition-colors"
          />
        </div>

        <div>
           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">
            Wake Time
          </label>
          <input
            type="time"
            value={wake}
            onChange={(e) => setWake(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-[1.2rem] px-5 py-3 font-bold text-slate-700 outline-none focus:border-forest/30 transition-colors"
          />
        </div>

        <div>
           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">
            Dinner Time
          </label>
          <input
            type="time"
            value={dinner}
            onChange={(e) => setDinner(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-[1.2rem] px-5 py-3 font-bold text-slate-700 outline-none focus:border-forest/30 transition-colors"
          />
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">

        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
          Alignment Score
        </div>

        <div className="text-6xl font-black text-forest tracking-tighter leading-none mb-3">
          {score}
        </div>

        <p className="text-xs font-bold text-slate-500 mb-6 leading-relaxed max-w-[240px] mx-auto text-balance">
          {recommendation}
        </p>

        <a href="/login" className="inline-block w-full bg-forest text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-forest/20 hover:scale-[1.02] active:scale-95 transition-all">
            Unlock Full Profile
        </a>

      </div>

    </div>
  );
}
