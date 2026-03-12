import { motion } from "framer-motion";
import { CloudSun, Zap, ShieldCheck } from "lucide-react";

interface RitualCardsProps {
    completedLogs: string[];
    onSelectRitual: (type: "morning" | "evening") => void;
}

export default function RitualCards({ completedLogs, onSelectRitual }: RitualCardsProps) {
    const rituals = [
        {
            id: "morning" as const,
            label: "Morning Ritual",
            description: "Align your physiology with the rising sun. Sync Agni and clear metabolic toxins.",
            icon: CloudSun,
            color: "bg-forest",
            hover: "hover:border-forest/50 hover:bg-emerald-50/80",
            accent: "bg-white border-slate-100",
            gradient: "from-forest/10 to-transparent"
        },
        {
            id: "evening" as const,
            label: "Evening Wind",
            description: "Decompress the nervous system and prepare for deep, restorative Nidra.",
            icon: Zap,
            color: "bg-indigo-600",
            hover: "hover:border-indigo-400/50 hover:bg-slate-50",
            accent: "bg-white border-slate-100",
            gradient: "from-indigo-100/10 to-transparent"
        },
    ];

    return (
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {rituals.map((ritual) => {
                    const isDone = completedLogs.includes(ritual.id);
                    return (
                        <motion.button
                            key={ritual.id}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => !isDone && onSelectRitual(ritual.id)}
                            className={`relative group flex flex-col text-left overflow-hidden rounded-[2.5rem] border transition-all duration-500 shadow-sm hover:shadow-xl ${isDone ? "bg-slate-100/30 border-slate-200/50 opacity-60 grayscale-[0.5]" : `${ritual.accent} backdrop-blur-sm ${ritual.hover}`
                                }`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${ritual.gradient} rounded-full -mr-16 -mt-16 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                            <div className="p-8 relative z-10 flex-1 flex flex-col">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-12 shadow-sm ${isDone ? "bg-slate-200 text-slate-600" : `${ritual.color} text-white`
                                    }`}>
                                    <ritual.icon className="w-7 h-7" />
                                </div>

                                <h3 className={`text-2xl font-black tracking-tighter mb-2 ${isDone ? "text-slate-500" : "text-slate-800"}`}>
                                    {ritual.label}
                                </h3>
                                <p className="text-sm font-bold text-slate-500 leading-relaxed mb-8">
                                    {ritual.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    {isDone ? (
                                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            <ShieldCheck className="w-4 h-4" />
                                            Completed
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center gap-2 text-forest px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-forest/20 group-hover:bg-forest group-hover:text-white transition-all">
                                            Begin Protocol
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <div className="glass rounded-[2.5rem] p-8 md:p-12 border border-white/60 shadow-inner bg-white/30 text-center">
                <p className="text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Neural Activity</p>
                <p className="text-slate-500 font-bold leading-relaxed max-w-md mx-auto italic">
                    "Daily logging builds the metabolic archive. Only morning and evening signals are required to maintain a perfect biological sync."
                </p>
            </div>
        </div>
    );
}
