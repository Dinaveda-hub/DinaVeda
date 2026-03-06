"use client";

import Link from "next/link";
import { Activity, Moon, Utensils, Zap, BrainCircuit, CloudSun, Leaf } from "lucide-react";

const modules = [
    { id: "somasleep", title: "Somasleep", subtitle: "Nidra & Sleep Architecture", icon: Moon, color: "bg-air", text: "text-blue-500", element: "Air & Space" },
    { id: "nutriveda", title: "Nutriveda", subtitle: "Ahara & Food Alchemy", icon: Utensils, color: "bg-water", text: "text-blue-600", element: "Water & Earth" },
    { id: "dinaveda", title: "Dinaveda", subtitle: "Dinacharya & Daily Rituals", icon: Activity, color: "bg-earth", text: "text-forest", element: "Earth" },
    { id: "rutuveda", title: "Rutuveda", subtitle: "Ritucharya & Seasonality", icon: CloudSun, color: "bg-fire", text: "text-orange-500", element: "Fire" },
    { id: "ayufit", title: "Ayufit", subtitle: "Vyayama & Flow State", icon: Zap, color: "bg-fire", text: "text-orange-600", element: "Fire" },
    { id: "manasayur", title: "Manasayur", subtitle: "Sadvritta & Mental Clarity", icon: BrainCircuit, color: "bg-air", text: "text-blue-400", element: "Air" },
    { id: "sattvaliving", title: "Sattvaliving", subtitle: "Ethical & Harmonious Life", icon: Leaf, color: "bg-earth", text: "text-forest", element: "Space" },
];

export default function ModulesPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden p-6 md:p-14 pb-40">
            {/* Background elements - Optimized */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-water/10 to-transparent pointer-events-none -z-10 -mr-60 -mt-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fire/5 to-transparent pointer-events-none -z-10 -ml-60 -mb-60" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-20 flex flex-col items-center text-center">
                    <div className="w-12 h-1 bg-forest mb-6 rounded-full opacity-20" />
                    <h1 className="text-6xl font-black text-forest tracking-tighter">Life Principles</h1>
                    <p className="text-slate-400 mt-4 font-bold uppercase tracking-[0.3em] text-[10px]">Harmonize with the Panchamahabhutas</p>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
                    {modules.slice(0, 6).map((mod) => (
                        <Link
                            href={`/modules/${mod.id}`}
                            key={mod.id}
                            className="glass p-6 md:p-8 rounded-[2rem] shadow-premium flex flex-col items-center justify-center text-center transition-all duration-700 hover:shadow-xl hover:shadow-forest/10 hover:-translate-y-2 group relative overflow-hidden active:scale-95 border border-white/60"
                        >
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${mod.color} bg-opacity-10`} />

                            <div className="relative z-10 mb-4 flex flex-col items-center">
                                <span className="text-[7px] md:text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 block group-hover:text-forest/40 transition-colors">{mod.element}</span>
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] ${mod.color} flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-sm border border-white/40`}>
                                    <mod.icon className={`w-8 h-8 md:w-10 md:h-10 ${mod.text}`} />
                                </div>
                            </div>

                            <h3 className="font-black text-forest text-xl md:text-2xl tracking-tighter relative z-10 leading-none">{mod.title}</h3>
                            <p className="text-[11px] text-slate-500 font-bold mt-4 tracking-tight relative z-10 max-w-[160px] leading-relaxed italic">{mod.subtitle}</p>

                            <div className="mt-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 relative z-10">
                                <span className="text-[10px] font-black text-forest uppercase tracking-widest">Enter Sanctum</span>
                                <Leaf className="w-3 h-3 text-forest animate-pulse" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
