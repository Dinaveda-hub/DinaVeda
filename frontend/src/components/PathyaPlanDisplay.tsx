import React from 'react';
import { Activity, BrainCircuit, Sunrise, Sun, Moon, Info, LucideIcon } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PathyaPlanProps {
    observation: string;
    principle: string;
    timeline: {
        morning: string;
        midday: string;
        evening: string;
    };
    score: number;
    breakdown?: any;
    rituInfo?: {
        name: string;
        is_transition: boolean;
        transition_to: string | null;
    };
}

const InsightPills = ({ breakdown, score }: { breakdown: any; score: number }) => {
    if (!breakdown) return null;

    const pills = [];

    if (typeof score === "number") {
        if (score >= 80) pills.push({ label: "Optimal Ojas", color: "bg-[#E3F2ED] text-[#2D7A5C] border-emerald-100" });
        else if (score >= 60) pills.push({ label: "Moderate Balance", color: "bg-blue-50 text-blue-700 border-blue-100" });
        else pills.push({ label: "Low Ojas", color: "bg-rose-50 text-rose-700 border-rose-100" });
    }

    if (breakdown?.Nidra !== undefined && breakdown.Nidra < 15) pills.push({ label: "Sleep Architecture Risk", color: "bg-slate-100 text-slate-700 border-slate-200" });
    
    if (breakdown?.Ahara !== undefined) {
        if (breakdown.Ahara < 15) pills.push({ label: "Agni Disturbance", color: "bg-orange-50 text-orange-700 border-orange-100" });
        else if (breakdown.Ahara >= 20) pills.push({ label: "Strong Agni", color: "bg-[#E3F2ED] text-[#2D7A5C] border-emerald-100" });
    }

    if (breakdown?.Vyayama !== undefined && breakdown.Vyayama < 10) pills.push({ label: "Movement Deficit", color: "bg-amber-50 text-amber-700 border-amber-100" });
    if (breakdown?.Jala !== undefined && breakdown.Jala < 10) pills.push({ label: "Hydration Deficit", color: "bg-cyan-50 text-cyan-700 border-cyan-100" });

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {pills.map((p, i) => (
                <span key={i} className={`text-xs font-black px-4 py-2 rounded-full border uppercase tracking-widest ${p.color}`}>
                    {p.label}
                </span>
            ))}
        </div>
    );
};

const SummaryCard = ({ observation, score }: { observation: string; score: number }) => {
    return (
        <div className={`mb-8 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 bg-[#2D7A5C] rounded-full" />
                <h3 className={`text-xs font-black text-slate-400 tracking-[0.2em] uppercase`}>
                    Wellness Observation
                </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium text-balance pt-2">
                {observation}
            </p>
        </div>
    );
};

const PrincipleAlert = ({ principle }: { principle: string }) => (
    <div className="mb-8 p-6 bg-[#E3F2ED] rounded-[2rem] border border-emerald-100 flex gap-4">
        <div className="shrink-0">
            <div className="w-10 h-10 bg-[#2D7A5C] rounded-2xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-white" />
            </div>
        </div>
        <div>
            <h3 className="font-black text-[#2D7A5C] mb-1 uppercase tracking-widest text-xs">Veda Principle</h3>
            <p className="text-emerald-900 leading-relaxed text-sm font-semibold opacity-80">
                {principle}
            </p>
        </div>
    </div>
);

const TimelineCard = ({
    title,
    content,
    icon: Icon,
    colorClass
}: {
    title: string;
    content: string;
    icon: LucideIcon;
    colorClass: string
}) => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col h-full transition-all hover:shadow-xl hover:shadow-slate-200/50 group">
        <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-3xl ${colorClass} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${colorClass}`} />
            </div>
            <h4 className="text-xl font-black text-slate-800 tracking-tight">{title}</h4>
        </div>
        <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed font-semibold">
            <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>{content}</ReactMarkdown>
        </div>
    </div>
);

export default function PathyaPlanDisplay({ observation, principle, timeline, score, breakdown, rituInfo }: PathyaPlanProps) {
    const isError = !observation && !principle && !timeline;

    if (isError) {
        return (
            <div className="p-8 bg-orange-50/50 border border-orange-100 rounded-[2rem] text-center shadow-sm">
                <Activity className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-black text-slate-700 mb-2">Unable to generate protocol today</h3>
                <p className="text-sm font-bold text-slate-500">The Neural Core encountered turbulence analyzing your log. Try reanalyzing your data.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {rituInfo && (
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#F0FDF4] to-[#ECFCCB] border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between shadow-sm gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[1.25rem] bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                            <Sun className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-[#2D7A5C] opacity-70">Seasonal Pulse</h4>
                            <p className="text-sm font-bold text-slate-700">{rituInfo.name}</p>
                        </div>
                    </div>
                    {rituInfo.is_transition && (
                        <div className="flex flex-col md:items-end gap-2">
                            <div className="px-3 py-1.5 rounded-full bg-orange-100/50 border border-orange-200 text-xs font-black uppercase tracking-widest text-orange-600 flex items-center gap-1.5 w-fit">
                                <Activity className="w-3 h-3" />
                                Transitioning to {rituInfo.transition_to}
                            </div>
                            <p className="text-xs font-bold text-orange-700/80 md:text-right">
                                Seasonal transition increases Vata variability.<br/>
                                Stabilize routine and digestion.
                            </p>
                        </div>
                    )}
                </div>
            )}

            <InsightPills breakdown={breakdown} score={score} />
            <SummaryCard
                observation={observation || (isError ? "The Neural Core encountered turbulence analyzing your log. However, your pulse data has been safely recorded in the sanctuary. Try again later." : "Maintain harmony with your surrounding elements.")}
                score={score}
            />

            <PrincipleAlert
                principle={principle || "Nature flows when resistance ceases. Align your daily rhythms with the sun and your doshic constitution."}
            />

            <div className="space-y-6">
                <div className="flex items-center gap-3 ml-2">
                    <Sun className="w-8 h-8 text-[#2D7A5C]" />
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                        Pathya Optimization
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TimelineCard
                        title="Morning"
                        content={timeline?.morning || "Maintain a steady morning routine based on your Prakriti."}
                        icon={Sunrise}
                        colorClass="text-emerald-600 bg-emerald-100"
                    />
                    <TimelineCard
                        title="Midday"
                        content={timeline?.midday || "Observe your hunger (Agni) and eat mindfully."}
                        icon={Sun}
                        colorClass="text-orange-600 bg-orange-100"
                    />
                    <TimelineCard
                        title="Evening"
                        content={timeline?.evening || "Wind down gently before bed to support Nidra (sleep architecture)."}
                        icon={Moon}
                        colorClass="text-indigo-600 bg-indigo-100"
                    />
                </div>
            </div>
        </div>
    );
}
