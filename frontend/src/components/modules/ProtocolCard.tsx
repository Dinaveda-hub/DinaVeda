"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles, CheckCircle2, Square, Crown } from "lucide-react";
import { Protocol } from "@/engine/protocolSelectionEngine";
import ProtocolExplanation from "./ProtocolExplanation";
import UpgradeModal from "@/components/billing/UpgradeModal";
import { formatProtocolName } from "@/utils/stringUtils";

interface ProtocolCardProps {
    protocol: Protocol;
    isChecked?: boolean;
    onToggle?: () => void;
    isSectionDone?: boolean;
    subscriptionStatus: string;
    userId: string | null;
    children?: React.ReactNode;
}

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
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    const handleCardClick = () => {
        if (isLocked) {
            setIsUpgradeModalOpen(true);
            return;
        }
        if (onToggle && !isSectionDone) {
            onToggle();
        }
    };

    return (
        <div className="relative">
            <div
                onClick={handleCardClick}
                className={`flex gap-4 items-start p-4 rounded-2xl transition-all border group cursor-pointer relative overflow-hidden ${
                    isLocked
                        ? "bg-slate-50 border-slate-100 opacity-80 hover:bg-slate-100"
                        : isSectionDone
                        ? "bg-emerald-50/10 border-emerald-100/50 opacity-60 pointer-events-none"
                        : isChecked
                        ? "bg-forest/5 border-forest/10"
                        : "bg-white/60 border-slate-100 hover:border-forest/30"
                }`}
            >
                {/* Premium Shine for Locked Cards */}
                {isLocked && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                )}

                <div className="mt-1 shrink-0 transition-colors">
                    {isLocked ? (
                        <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Lock className="w-3 h-3 text-amber-600" />
                        </div>
                    ) : isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                        <Square className="w-5 h-5 text-slate-300 group-hover:text-forest/40" />
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-black tracking-tight text-lg transition-all ${
                            isChecked || isLocked ? 'text-slate-400' : 'text-forest'
                        } ${isChecked ? 'line-through' : ''}`}>
                            {protocol.display_name || formatProtocolName(protocol.name)}
                        </h4>
                        {protocol.is_premium && (
                            <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-200">
                                <Crown className="w-2.5 h-2.5" /> Premium
                            </div>
                        )}
                    </div>
                    
                    <p className={`text-xs font-bold leading-relaxed text-balance ${
                        isChecked || isLocked ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                        {isLocked ? "This advanced protocol requires a premium subscription to unlock its full potential." : protocol.instructions}
                    </p>

                    {/* Meta info if not locked */}
                    {!isLocked && (protocol.duration || protocol.category) && (
                        <div className="flex items-center gap-3 mt-3">
                            {protocol.duration && (
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                    {protocol.duration}
                                </span>
                            )}
                            {protocol.category && (
                                <span className="text-[9px] font-black uppercase tracking-widest text-forest/50 bg-forest/5 px-2 py-1 rounded-md">
                                    {protocol.category.replace(/_/g, ' ')}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {isLocked && (
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    </div>
                )}
            </div>

            {/* Explanation Section — Only show if not locked or for premium users */}
            {!isLocked && (
                <>
                    <ProtocolExplanation protocolName={protocol.name} />
                    {children && (
                        <div className="mt-4">
                            {children}
                        </div>
                    )}
                </>
            )}

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
                userId={userId || ''}
                onSuccess={() => {
                    setIsUpgradeModalOpen(false);
                    window.location.reload();
                }}
            />
        </div>
    );
}
