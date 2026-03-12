"use client";

import { motion } from "framer-motion";

interface Props {
    label: string;
    value: number;
    icon?: React.ReactNode;
}

/**
 * Animated horizontal progress bar for individual body system metrics.
 */
export default function BodySystemBar({ label, value, icon }: Props) {
    const width = Math.min(value, 100);

    // Color based on health semantics
    const barColor =
        value > 70 ? "bg-emerald-500" :
        value > 45 ? "bg-forest" :
        value > 25 ? "bg-amber-500" :
        "bg-red-400";

    return (
        <div>
            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                <span className="flex items-center gap-1.5">
                    {icon}
                    {label}
                </span>
                <span className="text-slate-700">{Math.round(value)}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className={`h-full ${barColor} rounded-full`}
                />
            </div>
        </div>
    );
}
