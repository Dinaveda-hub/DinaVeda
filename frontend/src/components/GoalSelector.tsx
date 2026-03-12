"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
    Flame, Moon, Wind, Zap, Activity, Leaf, CheckCircle2, LucideIcon
} from "lucide-react";
import { HEALTH_GOALS, HealthGoal } from "../engine/goalEngine";
import { createClient } from "@/utils/supabase/client";

const ICON_MAP: Record<string, LucideIcon> = {
    Flame,
    Moon,
    Wind,
    Zap,
    Activity,
    Leaf
};

// Explicit mappings to prevent Tailwind purging
const COLOR_CLASSES: Record<string, string> = {
    orange: "text-orange-500 bg-orange-50 border-orange-100",
    blue: "text-blue-500 bg-blue-50 border-blue-100",
    violet: "text-violet-500 bg-violet-50 border-violet-100",
    amber: "text-amber-500 bg-amber-50 border-amber-100",
    emerald: "text-emerald-500 bg-emerald-50 border-emerald-100",
    forest: "text-forest bg-forest/5 border-forest/10"
};

const ACTIVE_CLASSES: Record<string, string> = {
    orange: "border-orange-500 ring-4 ring-orange-500/10 bg-orange-50",
    blue: "border-blue-500 ring-4 ring-blue-500/10 bg-blue-50",
    violet: "border-violet-500 ring-4 ring-violet-500/10 bg-violet-50",
    amber: "border-amber-500 ring-4 ring-amber-500/10 bg-amber-50",
    emerald: "border-emerald-500 ring-4 ring-emerald-500/10 bg-emerald-50",
    forest: "border-forest ring-4 ring-forest/10 bg-forest/5"
};

const CHECK_CLASSES: Record<string, string> = {
    orange: "bg-orange-500 text-white",
    blue: "bg-blue-500 text-white",
    violet: "bg-violet-500 text-white",
    amber: "bg-amber-500 text-white",
    emerald: "bg-emerald-500 text-white",
    forest: "bg-forest text-white"
};

const SUBGOAL_HINTS: Record<string, string> = {
    improve_digestion: "Reduce bloating • Strengthen Agni",
    better_sleep: "Deep rest • Biological alignment",
    reduce_stress: "Calm Vata • Mental lightness",
    increase_energy: "Boost Ojas • Vitality",
    balance_hormones: "Endocrine balance • Rhythm",
    general_wellness: "Holistic maintenance"
};

interface GoalSelectorProps {
    onSelect?: (goalId: string) => void;
}

import { usePhysiology } from "../contexts/PhysiologyContext";

export default function GoalSelector({ onSelect }: GoalSelectorProps) {
    const { healthGoal, setHealthGoal, isLoaded } = usePhysiology();

    const handleSelect = async (goalId: string) => {
        await setHealthGoal(goalId);
        
        // Still dispatch CustomEvent for non-React listeners or legacy components
        window.dispatchEvent(new CustomEvent("veda_goal_changed", { detail: goalId }));
        
        onSelect?.(goalId);
    };

    if (!isLoaded || !healthGoal) return null; // Hydration and load safety

    return (
        <div className="space-y-3" role="radiogroup" aria-label="Select health goal">
            {HEALTH_GOALS.map((goal: HealthGoal) => {
                const Icon = ICON_MAP[goal.icon] || Leaf;
                const isActive = healthGoal === goal.id;
                
                return (
                    <motion.button
                        key={goal.id}
                        layout
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelect(goal.id)}
                        role="radio"
                        aria-checked={isActive}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${isActive ? ACTIVE_CLASSES[goal.color] : "bg-white border-slate-100 hover:border-slate-200"
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${isActive ? "bg-white shadow-sm" : COLOR_CLASSES[goal.color]
                            }`}>
                            <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className={`font-black text-sm tracking-tight leading-tight ${isActive ? "text-slate-900" : "text-forest"
                                }`}>
                                {goal.label}
                            </h4>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest truncate mt-0.5">
                                {SUBGOAL_HINTS[goal.id] || goal.description}
                            </p>
                        </div>

                        {isActive && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="shrink-0"
                            >
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${CHECK_CLASSES[goal.color]}`}>
                                    <CheckCircle2 className="w-3 h-3" />
                                </div>
                            </motion.div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
