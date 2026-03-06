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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HEALTH_GOALS.map((goal: HealthGoal) => {
                const Icon = ICON_MAP[goal.icon] || Leaf;
                const isActive = selectedGoal === goal.id;
                const baseColor = COLOR_MAP[goal.color] || COLOR_MAP.forest;
                const activeColor = ACTIVE_COLOR_MAP[goal.color] || ACTIVE_COLOR_MAP.forest;

                return (
                    <motion.button
                        key={goal.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(goal.id)}
                        className={`relative flex flex-col items-start p-6 rounded-[2rem] border transition-all duration-300 text-left h-full ${isActive ? activeColor : "bg-white border-slate-100 hover:border-slate-200"
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center mb-4 transition-all duration-500 ${isActive ? "bg-white shadow-sm" : baseColor
                            }`}>
                            <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1">
                            <h4 className={`font-black text-lg tracking-tight mb-1 ${isActive ? "text-slate-900" : "text-forest"
                                }`}>
                                {goal.label}
                            </h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-snug">
                                {goal.description}
                            </p>
                        </div>

                        {isActive && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute top-4 right-4"
                            >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${goal.color === 'forest' ? 'bg-forest text-white' : `bg-${goal.color}-500 text-white`
                                    }`}>
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                            </motion.div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
