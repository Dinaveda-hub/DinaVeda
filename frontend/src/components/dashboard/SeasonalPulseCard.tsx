"use client";

import { motion } from "framer-motion";
import { CloudSun, Leaf, Wind, Sun, Droplets, Thermometer } from "lucide-react";
import { getCurrentSeason, getSeasonMeta } from "@/engine/rutuDriftEngine";

export default function SeasonalPulseCard() {
    const season = getCurrentSeason();
    const meta = getSeasonMeta(season);

    const getIcon = () => {
        switch (season) {
            case 'hemanta': return <Thermometer className="w-6 h-6" />;
            case 'shishira': return <Wind className="w-6 h-6" />;
            case 'vasanta': return <Leaf className="w-6 h-6" />;
            case 'grishma': return <Sun className="w-6 h-6" />;
            case 'varsha': return <Droplets className="w-6 h-6" />;
            case 'sharad': return <CloudSun className="w-6 h-6" />;
            default: return <CloudSun className="w-6 h-6" />;
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-gradient-to-r from-emerald-50 to-amber-50 rounded-[2.5rem] p-8 border border-white shadow-premium relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
            <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-white/80 shadow-sm border border-white flex items-center justify-center text-forest animate-pulse-slow">
                    {getIcon()}
                </div>
                <div>
                    <h4 className="text-[10px] font-black text-forest/40 uppercase tracking-[0.4em] mb-1">Seasonal Pulse</h4>
                    <div className="flex items-center gap-2">
                        <h3 className="text-3xl font-black text-forest tracking-tighter leading-none capitalize">
                            {meta.name}
                        </h3>
                        <span className="text-[10px] bg-forest/10 text-forest px-3 py-1 rounded-full font-black uppercase tracking-widest">
                            {meta.dominant}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 md:max-w-md relative z-10">
                <p className="text-sm font-bold text-slate-600 leading-relaxed md:text-right">
                    {meta.description}
                </p>
            </div>

            {/* Ambient background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 blur-3xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200/20 blur-3xl -ml-5 -mb-5" />
        </motion.div>
    );
}
