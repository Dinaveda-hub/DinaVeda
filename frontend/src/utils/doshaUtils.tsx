import React from 'react';
import { Wind, Flame, Droplets } from 'lucide-react';

export type DoshaType = 'Vata' | 'Pitta' | 'Kapha' | string;

export function getDoshaIcon(dosha: DoshaType, className = "w-5 h-5") {
    const d = dosha.toLowerCase();
    if (d.includes("vata")) return <Wind className={`${className} text-blue-600`} />;
    if (d.includes("pitta")) return <Flame className={`${className} text-orange-600`} />;
    if (d.includes("kapha")) return <Droplets className={`${className} text-teal-600`} />;
    return null;
}

export function getDoshaColorClass(dosha: DoshaType) {
    const d = dosha.toLowerCase();
    if (d.includes("vata")) return "bg-air/10 text-blue-700 shadow-premium border border-air/20";
    if (d.includes("pitta")) return "bg-fire/10 text-orange-700 shadow-premium border border-fire/20";
    if (d.includes("kapha")) return "bg-water/10 text-teal-700 shadow-premium border border-water/20";
    return "bg-slate-50 text-slate-500 shadow-premium border border-white/20";
}

export const DOSHA_COLORS = {
    Vata: "bg-air",
    Pitta: "bg-fire",
    Kapha: "bg-water"
} as const;

export const DOSHA_BAR_COLORS = {
    Vata: "bg-air",
    Pitta: "bg-fire",
    Kapha: "bg-water"
};
