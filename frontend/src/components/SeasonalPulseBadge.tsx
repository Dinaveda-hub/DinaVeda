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
    let accent = "bg-emerald-600";
    let tint = "bg-emerald-50";
    let text = "text-emerald-700";

    if (name.includes("Vasanta")) {
        focus = "Kapha Detox Phase";
        accent = "bg-emerald-600";
        tint = "bg-emerald-50";
        text = "text-emerald-700";
    }
    else if (name.includes("Grishma")) {
        focus = "Cooling & Hydration";
        accent = "bg-amber-500";
        tint = "bg-amber-50";
        text = "text-amber-700";
    }
    else if (name.includes("Varsha")) {
        focus = "Vata Stabilization";
        accent = "bg-indigo-500";
        tint = "bg-indigo-50";
        text = "text-indigo-700";
    }
    else if (name.includes("Sharad")) {
        focus = "Pitta Pacification";
        accent = "bg-orange-500";
        tint = "bg-orange-50";
        text = "text-orange-700";
    }
    else if (name.includes("Hemanta") || name.includes("Shishira")) {
        focus = "Ojas & Strength Building";
        accent = "bg-teal-600";
        tint = "bg-teal-50";
        text = "text-teal-700";
    }

    const shortName = name.split(" ")[0];

    return (
        <div className="rounded-[2rem] border border-slate-100 bg-white shadow-sm overflow-hidden mb-8">
            {/* Accent bar */}
            <div className={`h-1 w-full ${accent}`} />

            <div className={`p-6 ${tint}`}>
                {/* header */}
                <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${accent}`} />
                    <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${text}`}>
                        {shortName} Seasonal Pulse
                    </span>
                </div>

                {/* main focus */}
                <h3 className="text-lg font-black text-slate-800">
                    {focus}
                </h3>

                {/* transition */}
                {ritu_info.is_transition && (
                    <div className="flex items-center gap-2 mt-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest text-white px-3 py-1 rounded-full ${accent}`}>
                            Transition
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                            Moving toward {ritu_info.transition_to?.split(" ")[0]}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
