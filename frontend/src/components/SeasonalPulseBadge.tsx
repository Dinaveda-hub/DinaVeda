"use client";

interface SeasonalPulseBadgeProps {
    ritu_info: {
        name: string;
        is_transition: boolean;
        transition_to: string | null;
    };
}

export default function SeasonalPulseBadge({ ritu_info }: SeasonalPulseBadgeProps) {
    // Determine dominant dosha focus based on Ritu
    let focus = "Tridoshic Focus";
    const name = ritu_info.name;

    if (name.includes("Vasanta")) focus = "Kapha Detox Focus";
    else if (name.includes("Grishma")) focus = "Pitta/Vata Soothing Focus";
    else if (name.includes("Varsha")) focus = "Vata Pacification Focus";
    else if (name.includes("Sharad")) focus = "Pitta Detox Focus";
    else if (name.includes("Hemanta") || name.includes("Shishira")) focus = "Bala (Strength) Building";

    return (
        <div className="w-full flex items-center justify-between p-5 bg-[#F8F9F8] rounded-[2rem] border border-emerald-100 shadow-sm mb-8">
            <div className="flex flex-col">
                
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#2D7A5C] animate-pulse"></div>
                    <span className="text-xs font-black text-[#2D7A5C] uppercase tracking-widest">
                        {name.split(' ')[0]} Seasonal Pulse
                    </span>
                </div>

                <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-2">
                    {focus}
                </h3>

                {ritu_info.is_transition && (
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black text-white bg-[#2D7A5C] px-3 py-1 rounded-full uppercase tracking-widest">
                            Transition Active
                        </span>

                        <span className="text-xs font-bold text-slate-600 italic">
                            Moving towards {ritu_info.transition_to?.split(' ')[0]}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
