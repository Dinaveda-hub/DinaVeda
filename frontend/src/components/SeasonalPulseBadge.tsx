"use client";

interface SeasonalPulseBadgeProps {
    ritu_info: {
        name: string;
        is_transition: boolean;
        transition_to: string | null;
    };
}

export default function SeasonalPulseBadge({ ritu_info }: SeasonalPulseBadgeProps) {
    const name = ritu_info.name;

    let focus = "Tridoshic Balance";
    let gradient = "from-white to-emerald-50";
    let accent = "text-emerald-700";
    let dot = "bg-emerald-600";
    let badge = "bg-emerald-600";
    let icon = "🌱";

    if (name.includes("Vasanta")) {
        focus = "Kapha Detox Phase";
        gradient = "from-white to-emerald-50";
        accent = "text-emerald-700";
        dot = "bg-emerald-600";
        badge = "bg-emerald-600";
        icon = "🌱";
    }
    else if (name.includes("Grishma")) {
        focus = "Cooling & Hydration";
        gradient = "from-white to-amber-50";
        accent = "text-amber-700";
        dot = "bg-amber-500";
        badge = "bg-amber-500";
        icon = "☀️";
    }
    else if (name.includes("Varsha")) {
        focus = "Vata Stabilization";
        gradient = "from-white to-indigo-50";
        accent = "text-indigo-700";
        dot = "bg-indigo-500";
        badge = "bg-indigo-500";
        icon = "🌧";
    }
    else if (name.includes("Sharad")) {
        focus = "Pitta Pacification";
        gradient = "from-white to-orange-50";
        accent = "text-orange-700";
        dot = "bg-orange-500";
        badge = "bg-orange-500";
        icon = "🍂";
    }
    else if (name.includes("Hemanta") || name.includes("Shishira")) {
        focus = "Strength & Ojas Building";
        gradient = "from-white to-teal-50";
        accent = "text-teal-700";
        dot = "bg-teal-600";
        badge = "bg-teal-600";
        icon = "❄️";
    }

    const shortName = name.split(" ")[0];

    return (
        <div className="relative rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm mb-8">
            {/* Seasonal Accent Bar */}
            <div className={`h-1.5 w-full ${dot}`} />

            <div className={`relative bg-gradient-to-br ${gradient} p-6 md:p-8`}>
                {/* Ambient glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/40 blur-3xl rounded-full pointer-events-none" />

                <div className="relative flex flex-col gap-3">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${dot}`}></div>
                            <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${accent}`}>
                                {shortName} Seasonal Pulse
                            </span>
                        </div>
                        
                        {/* Axis Micro Indicators */}
                        <div className="flex gap-1.5 opacity-60">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        </div>
                    </div>

                    {/* Main title */}
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{icon}</span>
                        <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                            {focus}
                        </h3>
                    </div>

                    {/* Transition indicator */}
                    {ritu_info.is_transition && (
                        <div className="flex flex-wrap items-center gap-3 mt-1 bg-white/40 p-3 rounded-2xl border border-white/60 w-fit">
                            <span className={`text-[9px] font-black uppercase tracking-widest text-white px-3 py-1 rounded-full ${badge}`}>
                                Transition
                            </span>
                            <span className="text-[11px] font-bold text-slate-500">
                                Moving toward <span className="text-slate-700 font-black uppercase tracking-wider ml-1">{ritu_info.transition_to?.split(" ")[0]}</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
