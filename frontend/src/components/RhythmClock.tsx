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

  // Pre-calculate marker positions for efficiency and layout
  const sleepPos = sleepHour !== undefined ? getMarkerPos(sleepHour, 130) : null;
  const sleepLabelPos = sleepHour !== undefined ? getMarkerPos(sleepHour, 150) : null;
  
  const wakePos = wakeHour !== undefined ? getMarkerPos(wakeHour, 130) : null;
  const wakeLabelPos = wakeHour !== undefined ? getMarkerPos(wakeHour, 145) : null;
  
  const mealPos = mealHour !== undefined ? getMarkerPos(mealHour, 130) : null;
  const mealLabelPos = mealHour !== undefined ? getMarkerPos(mealHour, 140) : null;

  // Agni/Pitta Peak (12 PM)
  const agniPos = getMarkerPos(12, 130);
  const agniLabelPos = getMarkerPos(12, 75);

  return (
    <div className="relative w-full max-w-[320px] md:max-w-md mx-auto aspect-square">
      <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-xl overflow-visible">
        {/* Ambient Glow */}
        <defs>
          <filter id="glow">
             <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
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
              className={`${seg.color} opacity-80 transition-all duration-700`}
            />
            {(() => {
                const midAngle = ((seg.start + (seg.end < seg.start ? seg.end + 24 : seg.end)) / 2 * 15) - 90;
                const tx = 150 + 105 * Math.cos((midAngle * Math.PI) / 180);
                const ty = 150 + 105 * Math.sin((midAngle * Math.PI) / 180);
                return (
                    <text 
                        x={tx} 
                        y={ty} 
                        className={`text-[10px] md:text-[8px] font-black uppercase tracking-widest ${seg.text} opacity-40`}
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

        {/* Agni Peak Indicator */}
        <g className="opacity-30">
            <line x1="150" y1="150" x2={agniPos.x} y2={agniPos.y} className="stroke-orange-400 stroke-[1] stroke-dasharray-[2,2]" strokeDasharray="2,2" />
            <text x={agniLabelPos.x} y={agniLabelPos.y} className="text-[10px] md:text-[8px] font-black fill-orange-500 uppercase" textAnchor="middle">Agni Peak</text>
        </g>

        {/* Dynamic Markers */}
        {sleepPos && sleepLabelPos && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <line x1="150" y1="150" x2={sleepPos.x} y2={sleepPos.y} className="stroke-slate-900 stroke-[2] stroke-dasharray-[4,4]" strokeDasharray="4,4" />
              <circle cx={sleepPos.x} cy={sleepPos.y} r="8" className="fill-slate-900 shadow-lg" filter="url(#glow)" />
              <text x={sleepLabelPos.x} y={sleepLabelPos.y} className="text-[9px] md:text-[7px] font-black fill-slate-900 uppercase" textAnchor="middle">Sleep</text>
          </motion.g>
        )}
        {wakePos && wakeLabelPos && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <line x1="150" y1="150" x2={wakePos.x} y2={wakePos.y} className="stroke-emerald-500 stroke-[2]" />
              <circle cx={wakePos.x} cy={wakePos.y} r="8" className="fill-emerald-500 shadow-lg" filter="url(#glow)" />
              <text x={wakeLabelPos.x} y={wakeLabelPos.y} className="text-[9px] md:text-[7px] font-black fill-emerald-500 uppercase" textAnchor="middle">Wake</text>
          </motion.g>
        )}
        {mealPos && mealLabelPos && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <line x1="150" y1="150" x2={mealPos.x} y2={mealPos.y} className="stroke-orange-500 stroke-[2]" />
              <circle cx={mealPos.x} cy={mealPos.y} r="8" className="fill-orange-500 shadow-lg" filter="url(#glow)" />
              <text x={mealLabelPos.x} y={mealLabelPos.y} className="text-[9px] md:text-[7px] font-black fill-orange-500 uppercase" textAnchor="middle">Meal</text>
          </motion.g>
        )}

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
