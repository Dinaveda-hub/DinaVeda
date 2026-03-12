"use client";

import { motion } from "framer-motion";

interface PhysiologyAxis {
    label: string;
    value: number;
    color: string;
}

/**
 * Spider/Radar chart showing multi-system physiological balance.
 * Balanced physiology → symmetrical polygon.
 * Imbalance → visible distortion toward the stressed axis.
 */
export default function PhysiologyRadar({ axes }: { axes: PhysiologyAxis[] }) {
    const cx = 110;
    const cy = 105;
    const maxR = 72;
    const count = axes.length;
    const angleStep = (Math.PI * 2) / count;

    const toPoint = (index: number, radius: number) => {
        const angle = angleStep * index - Math.PI / 2;
        return {
            x: cx + radius * Math.cos(angle),
            y: cy + radius * Math.sin(angle),
        };
    };

    // Grid rings at 25%, 50%, 75%, 100%
    const gridLevels = [0.25, 0.5, 0.75, 1.0];

    // Value polygon
    const valuePoints = axes
        .map((a, i) => {
            const p = toPoint(i, (Math.min(a.value, 100) / 100) * maxR);
            return `${p.x},${p.y}`;
        })
        .join(" ");

    return (
        <div className="flex flex-col items-center w-full">
            <svg 
                viewBox="0 0 220 220" 
                className="w-full max-w-[220px] h-auto overflow-visible"
            >
                {/* Concentric grid polygons */}
                {gridLevels.map((frac) => {
                    const pts = Array.from({ length: count }, (_, i) => {
                        const p = toPoint(i, maxR * frac);
                        return `${p.x},${p.y}`;
                    }).join(" ");
                    return (
                        <polygon
                            key={frac}
                            points={pts}
                            fill="none"
                            stroke={frac === 1 ? "#CBD5E1" : "#E2E8F0"}
                            strokeWidth={frac === 1 ? "1.5" : "1"}
                            strokeDasharray={frac === 1 ? "none" : "3,3"}
                        />
                    );
                })}

                {/* Axis spokes */}
                {axes.map((_, i) => {
                    const outer = toPoint(i, maxR);
                    return (
                        <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="#E2E8F0" strokeWidth="1" />
                    );
                })}

                {/* Value polygon */}
                <motion.polygon
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, points: valuePoints }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    fill="rgba(45,122,92,0.15)"
                    stroke="#2D7A5C"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />

                {/* Vertex dots */}
                {axes.map((a, i) => {
                    const p = toPoint(i, (Math.min(a.value, 100) / 100) * maxR);
                    return (
                        <motion.circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r="3.5"
                            fill={a.color}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                        />
                    );
                })}

                {/* Axis labels */}
                {axes.map((a, i) => {
                    const label = toPoint(i, maxR + 16);
                    return (
                        <text
                            key={`label-${i}`}
                            x={label.x}
                            y={label.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-slate-400 text-[8px] font-black uppercase tracking-widest"
                        >
                            {a.label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}
