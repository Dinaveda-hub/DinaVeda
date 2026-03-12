"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles, CheckCircle2, Square, Crown } from "lucide-react";
import { CompiledProtocolItem } from "@/engine/protocolCompiler";
import { formatProtocolName } from "@/utils/stringUtils";

interface ProtocolCardProps {
    protocol: CompiledProtocolItem;
    isChecked?: boolean;
    onToggle?: () => void;
    isSectionDone?: boolean;
    subscriptionStatus: string;
    userId: string | null;
    children?: React.ReactNode;
}

import { useUpgrade } from "@/contexts/UpgradeContext";

export default function ProtocolCard({
    protocol,
    isChecked,
    onToggle,
    isSectionDone,
    subscriptionStatus,
    userId,
    children
}: ProtocolCardProps) {
    const isPremiumUser = subscriptionStatus === "active";
    const isLocked = protocol.is_premium && !isPremiumUser;
    const { openUpgrade } = useUpgrade();

    const handleCardClick = () => {
        if (!isLocked && onToggle && !isSectionDone) {
            onToggle();
        } else if (isLocked) {
            // Trigger contextual upgrade modal based on the module (diet, yoga, etc.)
            openUpgrade(protocol.module || "diet");
        }
    };

    return (
        <div className="relative">
            <div
                onClick={handleCardClick}
                className={`flex gap-4 items-start p-5 rounded-[2rem] transition-all border group cursor-pointer relative overflow-hidden ${
                    isLocked
                        ? "bg-white/40 border-slate-100/50 opacity-80"
                        : isChecked
                        ? "bg-forest/5 border-forest/20"
                        : "bg-white/80 border-white shadow-sm hover:border-forest/20"
                }`}
            >
                <div className="mt-1.5 shrink-0 transition-colors">
                    {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                        <Square className={`w-5 h-5 ${isLocked ? 'text-slate-200' : 'text-slate-300 group-hover:text-forest/40'}`} />
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                        <h4 className={`font-black tracking-tight text-lg transition-all ${
                            isChecked || isLocked ? 'text-slate-400' : 'text-forest'
                        } ${isChecked ? 'line-through' : ''}`}>
                            {protocol.title || formatProtocolName(protocol.name)}
                        </h4>
                        {isLocked && <Lock className="w-3 h-3 text-slate-400" />}
                    </div>
                    
                    <p className={`text-xs font-bold leading-relaxed ${
                        isChecked || isLocked ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                        {protocol.description}
                    </p>

                    {/* Predicted Shift Section (Always visible on tap or just visible metadata) */}
                    {Object.keys(protocol.variables || {}).length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            {Object.entries(protocol.variables || {}).map(([key, val]) => (
                                <div key={key} className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-white/50 border border-white/80">
                                    <span className="text-slate-400">{key.replace('_axis', '')}</span>
                                    <span className={val > 0 ? 'text-emerald-500' : 'text-orange-500'}>
                                        {val > 0 ? '↑' : '↓'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
