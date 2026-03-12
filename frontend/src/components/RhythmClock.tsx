"use client";

import { motion, AnimatePresence } from "framer-motion";

interface RhythmClockProps {
  sleepHour?: number; // 0-23
  wakeHour?: number;  // 0-23
  mealHour?: number;  // 0-23
}

export default function RhythmClock({ sleepHour, wakeHour, mealHour }: RhythmClockProps) {
  const segments = [
    { start: 2, end: 6, label: "Vata", color: "fill-sky-400/20", text: "fill-sky-600" },
    { start: 6, end: 10, label: "Kapha", color: "fill-emerald-400/20", text: "fill-emerald-600" },
    { start: 10, end: 14, label: "Pitta", color: "fill-orange-400/20", text: "fill-orange-600" },
    { start: 14, end: 18, label: "Vata", color: "fill-sky-400/20", text: "fill-sky-600" },
    { start: 18, end: 22, label: "Kapha", color: "fill-emerald-400/20", text: "fill-emerald-600" },
    { start: 22, end: 2, label: "Pitta", color: "fill-orange-400/20", text: "fill-orange-600" },
  ];

  const describeArc = (startHour: number, endHour: number, radius: number) => {
    const startAngle = (startHour * 15) - 90;
    const endAngle = (endHour < startHour ? (endHour + 24) : endHour) * 15 - 90;
    const x1 = 150 + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 150 + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 150 + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = 150 + radius * Math.sin((endAngle * Math.PI) / 180);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M 150 150 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getMarkerPos = (hour: number, radius: number) => {
    const angle = (hour * 15) - 90;
    return {
      x: 150 + radius * Math.cos((angle * Math.PI) / 180),
      y: 150 + radius * Math.sin((angle * Math.PI) / 180)
    };
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-xl overflow-visible">
        {/* Ambient Glow */}
        <defs>
          <filter id="glow">
             <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
             <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
             </feMerge>
          </filter>
        </defs>

        <circle cx="150" cy="150" r="140" className="fill-white/80 backdrop-blur-xl stroke-slate-50 stroke-1" />
        
        {/* Dosha Segments */}
        {segments.map((seg, i) => (
          <g key={i}>
            <path
              d={describeArc(seg.start, seg.end, 130)}
              className={`${seg.color} transition-all duration-700 hover:opacity-100`}
            />
            {(() => {
                const midAngle = ((seg.start + (seg.end < seg.start ? seg.end + 24 : seg.end)) / 2 * 15) - 90;
                const tx = 150 + 105 * Math.cos((midAngle * Math.PI) / 180);
                const ty = 150 + 105 * Math.sin((midAngle * Math.PI) / 180);
                return (
                    <text 
                        x={tx} 
                        y={ty} 
                        className={`text-[8px] font-black uppercase tracking-widest ${seg.text} opacity-40`}
                        textAnchor="middle"
                    >
                        {seg.label}
                    </text>
                );
            })()}
          </g>
        ))}

        {/* Hour Notches */}
        {[...Array(24)].map((_, i) => {
          const angle = (i * 15) - 90;
          const x1 = 150 + 130 * Math.cos((angle * Math.PI) / 180);
          const y1 = 150 + 130 * Math.sin((angle * Math.PI) / 180);
          const x2 = 150 + 138 * Math.cos((angle * Math.PI) / 180);
          const y2 = 150 + 138 * Math.sin((angle * Math.PI) / 180);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-slate-200 stroke-1" />;
        })}

        {/* Dynamic Markers */}
        <AnimatePresence>
          {sleepHour !== undefined && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <line x1="150" y1="150" {...getMarkerPos(sleepHour, 130)} className="stroke-slate-900 stroke-[2] stroke-dasharray-[4,4]" strokeDasharray="4,4" />
               <circle {...getMarkerPos(sleepHour, 130)} r="8" className="fill-slate-900 shadow-lg" filter="url(#glow)" />
               <text {...getMarkerPos(sleepHour, 145)} className="text-[7px] font-black fill-slate-900 uppercase" textAnchor="middle">Sleep</text>
            </motion.g>
          )}
          {wakeHour !== undefined && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <line x1="150" y1="150" {...getMarkerPos(wakeHour, 130)} className="stroke-emerald-500 stroke-[2]" />
               <circle {...getMarkerPos(wakeHour, 130)} r="8" className="fill-emerald-500 shadow-lg" filter="url(#glow)" />
               <text {...getMarkerPos(wakeHour, 145)} className="text-[7px] font-black fill-emerald-500 uppercase" textAnchor="middle">Wake</text>
            </motion.g>
          )}
          {mealHour !== undefined && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <line x1="150" y1="150" {...getMarkerPos(mealHour, 130)} className="stroke-orange-500 stroke-[2]" />
               <circle {...getMarkerPos(mealHour, 130)} r="8" className="fill-orange-500 shadow-lg" filter="url(#glow)" />
               <text {...getMarkerPos(mealHour, 145)} className="text-[7px] font-black fill-orange-500 uppercase" textAnchor="middle">Meal</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Center Hole for "Donut" look */}
        <circle cx="150" cy="150" r="60" className="fill-[#FAFBFB]" />
        
        {/* Clock Center Logo/Icon */}
        <circle cx="150" cy="150" r="10" className="fill-white stroke-slate-100 stroke-1" />
        <circle cx="150" cy="150" r="4" className="fill-forest" />
      </svg>
      
      {/* Legend Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="text-center">
            <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-slate-300 mb-1">Stability</span>
            <span className="block text-2xl font-black text-forest leading-none">RHYTHM</span>
         </div>
      </div>
    </div>
  );
}
