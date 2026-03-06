"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Flame, Moon, Wind, Zap, Activity, Leaf, CheckCircle2
} from "lucide-react";
import { HEALTH_GOALS, HealthGoal } from "../engine/goalEngine";

const ICON_MAP: Record<string, any> = {
    Flame,
    Moon,
    Wind,
    Zap,
    Activity,
    Leaf
};

const COLOR_MAP: Record<string, string> = {
    orange: "text-orange-500 bg-orange-50 border-orange-100",
    blue: "text-blue-500 bg-blue-50 border-blue-100",
    violet: "text-violet-500 bg-violet-50 border-violet-100",
    amber: "text-amber-500 bg-amber-50 border-amber-100",
    emerald: "text-emerald-500 bg-emerald-50 border-emerald-100",
    forest: "text-forest bg-forest/5 border-forest/10"
};

const ACTIVE_COLOR_MAP: Record<string, string> = {
    orange: "border-orange-500 ring-4 ring-orange-500/10 bg-orange-50",
    blue: "border-blue-500 ring-4 ring-blue-500/10 bg-blue-50",
    violet: "border-violet-500 ring-4 ring-violet-500/10 bg-violet-50",
    amber: "border-amber-500 ring-4 ring-amber-500/10 bg-amber-50",
    emerald: "border-emerald-500 ring-4 ring-emerald-500/10 bg-emerald-50",
    forest: "border-forest ring-4 ring-forest/10 bg-forest/5"
};

export default function GoalSelector() {
    const [selectedGoal, setSelectedGoal] = useState<string>("general_wellness");

    useEffect(() => {
        const saved = localStorage.getItem("veda_health_goal");
        if (saved) setSelectedGoal(saved);
    }, []);

    const handleSelect = (goalId: string) => {
        setSelectedGoal(goalId);
        localStorage.setItem("veda_health_goal", goalId);
        // Dispatch a custom event to notify other components (like Dashboard)
        window.dispatchEvent(new Event("veda_goal_changed"));
    };

    return (
        <div className="space-y-3">
            {HEALTH_GOALS.map((goal: HealthGoal) => {
                const Icon = ICON_MAP[goal.icon] || Leaf;
                const isActive = selectedGoal === goal.id;
                const baseColor = COLOR_MAP[goal.color] || COLOR_MAP.forest;
                const activeColor = ACTIVE_COLOR_MAP[goal.color] || ACTIVE_COLOR_MAP.forest;

                return (
                    <motion.button
                        key={goal.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelect(goal.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${isActive ? activeColor : "bg-white border-slate-100 hover:border-slate-200"
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${isActive ? "bg-white shadow-sm" : baseColor
                            }`}>
                            <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className={`font-black text-sm tracking-tight leading-tight ${isActive ? "text-slate-900" : "text-forest"
                                }`}>
                                {goal.label}
                            </h4>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">
                                {goal.description}
                            </p>
                        </div>

                        {isActive && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="shrink-0"
                            >
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${goal.color === 'forest' ? 'bg-forest text-white' : `bg-${goal.color}-500 text-white`
                                    }`}>
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
