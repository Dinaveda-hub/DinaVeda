"use client";

interface Props {
    vata: number;
    pitta: number;
    kapha: number;
    sleep: number;
    stress: number;
}

/**
 * Generates a contextual Ayurvedic explanation of the current physiological pressure state.
 * Prioritizes the most clinically relevant imbalance.
 */
export default function PressureExplanation({ vata, pitta, kapha, sleep, stress }: Props) {
    let message = "Your physiology is largely stable today. Continue your current rhythms.";
    let severity: "info" | "warn" | "alert" = "info";

    // Priority cascade: most dangerous pattern first
    if (vata > 65 && stress > 55) {
        message = "Vata pressure is elevated alongside high stress. This combination destabilizes sleep and digestion. Focus on grounding routines — warm meals, abhyanga, and earlier bedtime.";
        severity = "alert";
    } else if (pitta > 65 && stress > 55) {
        message = "Pitta is aggravated with elevated stress. This generates heat and irritability. Prioritize cooling foods, reduced screen time, and sheetali pranayama.";
        severity = "alert";
    } else if (kapha > 65 && sleep < 45) {
        message = "Kapha accumulation is active. Increased movement, lighter meals, and early waking can restore metabolic flow.";
        severity = "warn";
    } else if (vata > 60) {
        message = "Vata pressure is rising. Warm, grounding foods and consistent daily routines will help pacify the nervous system.";
        severity = "warn";
    } else if (pitta > 60) {
        message = "Pitta pressure appears elevated. Cooling foods, mild exercise, and reduced heat exposure may help stabilize metabolism.";
        severity = "warn";
    } else if (kapha > 60) {
        message = "Kapha pressure is accumulating. Increased movement and lighter meals may help restore balance.";
        severity = "warn";
    } else if (sleep < 40) {
        message = "Sleep debt is high. Prioritize Nidra protocols — screen-free evenings, warm milk, and consistent sleep timing.";
        severity = "warn";
    }

    const bgClass =
        severity === "alert" ? "bg-red-50/60 border-red-100" :
        severity === "warn" ? "bg-amber-50/60 border-amber-100" :
        "bg-white/50 border-white";

    return (
        <div className={`mt-8 p-6 rounded-2xl border ${bgClass}`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                Physiological Interpretation
            </p>
            <p className="text-sm font-bold text-slate-600 leading-relaxed">
                {message}
            </p>
        </div>
    );
}
