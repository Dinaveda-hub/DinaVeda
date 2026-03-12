"use client";

import { AlertCircle, Info, ShieldAlert } from "lucide-react";

interface Props {
    vata: number;
    pitta: number;
    kapha: number;
    sleep: number;
    stress: number;
}

/**
 * SystemMessage — Contextual Ayurvedic explanation of the current physiological pressure state.
 */
export default function SystemMessage({ vata, pitta, kapha, sleep, stress }: Props) {
    let message = "Your physiology is largely stable today. Continue your current rhythms.";
    let severity: "info" | "warn" | "alert" = "info";
    let Icon = Info;

    // Priority cascade: most dangerous pattern first
    if (vata > 65 && stress > 55) {
        message = "Vata pressure is elevated alongside high stress. This combination destabilizes sleep and digestion. Focus on grounding routines — warm meals, abhyanga, and earlier bedtime.";
        severity = "alert";
        Icon = ShieldAlert;
    } else if (pitta > 65 && stress > 55) {
        message = "Pitta is aggravated with elevated stress. This generates heat and irritability. Prioritize cooling foods, reduced screen time, and sheetali pranayama.";
        severity = "alert";
        Icon = ShieldAlert;
    } else if (kapha > 65 && sleep < 45) {
        message = "Kapha accumulation is active. Increased movement, lighter meals, and early waking can restore metabolic flow.";
        severity = "warn";
        Icon = AlertCircle;
    } else if (vata > 60) {
        message = "Vata pressure is rising. Warm, grounding foods and consistent daily routines will help pacify the nervous system.";
        severity = "warn";
        Icon = AlertCircle;
    } else if (pitta > 60) {
        message = "Pitta pressure appears elevated. Cooling foods, mild exercise, and reduced heat exposure may help stabilize metabolism.";
        severity = "warn";
        Icon = AlertCircle;
    } else if (kapha > 60) {
        message = "Kapha pressure is accumulating. Increased movement and lighter meals may help restore balance.";
        severity = "warn";
        Icon = AlertCircle;
    } else if (sleep < 40) {
        message = "Sleep debt is high. Prioritize Nidra protocols — screen-free evenings, warm milk, and consistent sleep timing.";
        severity = "warn";
        Icon = AlertCircle;
    }

    const colorClass =
        severity === "alert" ? "text-orange-600 border-orange-100 bg-orange-50/50" :
        severity === "warn" ? "text-amber-700 border-amber-100 bg-amber-50/50" :
        "text-forest/80 border-forest/10 bg-forest/5";

    return (
        <div className={`mt-10 p-7 rounded-[2.5rem] border backdrop-blur-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-700 ${colorClass}`}>
            <div className="flex items-start gap-4">
                <div className={`mt-0.5 shrink-0 ${severity === 'info' ? 'text-forest/40' : ''}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-3">
                        Biological Directive
                    </p>
                    <p className="text-[13px] font-bold leading-relaxed tracking-tight max-w-prose">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}
