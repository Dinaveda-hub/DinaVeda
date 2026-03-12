"use client";

import { motion } from "framer-motion";

interface Props {
    vata: number;
    pitta: number;
    kapha: number;
}

/**
 * Renders a triangular radial visualization of dosha pressure.
 * Balanced physiology → compact equilateral triangle.
 * Imbalance → triangle stretches toward the dominant axis.
 */
export default function DoshaTriangle({ vata, pitta, kapha }: Props) {
    const cx = 110;
    const cy = 100;
    const maxR = 75;

    // Normalize to 0–1 and scale to radius
    const scale = (v: number) => (Math.min(v, 100) / 100) * maxR;

    const vR = scale(vata);
    const pR = scale(pitta);
    const kR = scale(kapha);

    // Triangle vertices: Vata=top, Pitta=bottom-right, Kapha=bottom-left
    // Angles: Vata=-90°, Pitta=30°, Kapha=210°
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const vx = cx + vR * Math.cos(toRad(-90));
    const vy = cy + vR * Math.sin(toRad(-90));
    const px = cx + pR * Math.cos(toRad(30));
    const py = cy + pR * Math.sin(toRad(30));
    const kx = cx + kR * Math.cos(toRad(210));
    const ky = cy + kR * Math.sin(toRad(210));

    // Outer reference triangle (max)
    const oV = { x: cx + maxR * Math.cos(toRad(-90)), y: cy + maxR * Math.sin(toRad(-90)) };
    const oP = { x: cx + maxR * Math.cos(toRad(30)), y: cy + maxR * Math.sin(toRad(30)) };
    const oK = { x: cx + maxR * Math.cos(toRad(210)), y: cy + maxR * Math.sin(toRad(210)) };

    const doshaStatus = (val: number) => {
        if (val > 65) return { label: "Aggravated", color: "text-red-500" };
        if (val > 45) return { label: "Pressured", color: "text-amber-500" };
        return { label: "Balanced", color: "text-emerald-600" };
    };

    return (
        <div className="flex flex-col items-center">
            <svg width="220" height="210" viewBox="0 0 220 210" className="overflow-visible">
                {/* Grid rings (25%, 50%, 75%) */}
                {[0.25, 0.5, 0.75].map((frac) => {
                    const r = maxR * frac;
                    const tv = { x: cx + r * Math.cos(toRad(-90)), y: cy + r * Math.sin(toRad(-90)) };
                    const tp = { x: cx + r * Math.cos(toRad(30)), y: cy + r * Math.sin(toRad(30)) };
                    const tk = { x: cx + r * Math.cos(toRad(210)), y: cy + r * Math.sin(toRad(210)) };
                    return (
                        <polygon
                            key={frac}
                            points={`${tv.x},${tv.y} ${tp.x},${tp.y} ${tk.x},${tk.y}`}
                            fill="none"
                            stroke="#E2E8F0"
                            strokeWidth="1"
                            strokeDasharray="3,3"
                        />
                    );
                })}

                {/* Outer reference triangle */}
                <polygon
                    points={`${oV.x},${oV.y} ${oP.x},${oP.y} ${oK.x},${oK.y}`}
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                />

                {/* Axis lines from center */}
                <line x1={cx} y1={cy} x2={oV.x} y2={oV.y} stroke="#E2E8F0" strokeWidth="1" />
                <line x1={cx} y1={cy} x2={oP.x} y2={oP.y} stroke="#E2E8F0" strokeWidth="1" />
                <line x1={cx} y1={cy} x2={oK.x} y2={oK.y} stroke="#E2E8F0" strokeWidth="1" />

                {/* Pressure polygon (animated) */}
                <motion.polygon
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        points: `${vx},${vy} ${px},${py} ${kx},${ky}`,
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    fill="rgba(45,122,92,0.18)"
                    stroke="#2D7A5C"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />

                {/* Vertex dots */}
                <motion.circle cx={vx} cy={vy} r="4" fill="#94A3B8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
                <motion.circle cx={px} cy={py} r="4" fill="#F97316" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
                <motion.circle cx={kx} cy={ky} r="4" fill="#0EA5E9" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />

                {/* Axis labels */}
                <text x={oV.x} y={oV.y - 10} textAnchor="middle" className="fill-slate-400 text-[9px] font-black uppercase tracking-widest">Vata</text>
                <text x={oP.x + 12} y={oP.y + 5} textAnchor="start" className="fill-slate-400 text-[9px] font-black uppercase tracking-widest">Pitta</text>
                <text x={oK.x - 12} y={oK.y + 5} textAnchor="end" className="fill-slate-400 text-[9px] font-black uppercase tracking-widest">Kapha</text>
            </svg>

            {/* Value chips below triangle */}
            <div className="flex items-center gap-6 mt-4">
                {[
                    { label: "Vata", value: vata, dot: "bg-slate-400" },
                    { label: "Pitta", value: pitta, dot: "bg-orange-500" },
                    { label: "Kapha", value: kapha, dot: "bg-sky-500" },
                ].map(d => {
                    const status = doshaStatus(d.value);
                    return (
                        <div key={d.label} className="flex flex-col items-center">
                            <div className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${d.dot}`} />
                                <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{d.label}</span>
                            </div>
                            <span className="text-lg font-black text-slate-800 tracking-tighter">{Math.round(d.value)}</span>
                            <span className={`text-[9px] font-bold ${status.color}`}>{status.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
