"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, ChevronDown, ChevronUp, BrainCircuit } from "lucide-react";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import UpgradeModal from "@/components/billing/UpgradeModal";
import { getApiUrl } from "@/services/notificationService";

interface ProtocolExplanationProps {
    protocolName: string;
}

export default function ProtocolExplanation({ protocolName }: ProtocolExplanationProps) {
    const { state, subscriptionStatus, userId } = usePhysiologyState();
    const isPremium = subscriptionStatus === "active";
    
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    const handleToggle = async () => {
        if (!isPremium) {
            setIsUpgradeModalOpen(true);
            return;
        }

        if (isOpen) {
            setIsOpen(false);
            return;
        }

        setIsOpen(true);
        if (explanation) return; // Already fetched

        setIsLoading(true);
        try {
            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/ai/protocol-explanation`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    // In a real prod app, pass an Auth Bearer token here
                    "x-user-id": userId || "guest"
                },
                body: JSON.stringify({
                    protocol: protocolName,
                    state: state
                })
            });

            if (!res.ok) throw new Error("Failed to fetch explanation");
            
            const data = await res.json();
            setExplanation(data.explanation_text);
        } catch (error) {
            console.error("Explanation Error:", error);
            setExplanation("Veda AI is currently analyzing cosmic patterns. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-4 pt-4 border-t border-slate-100">
            <button 
                onClick={handleToggle}
                className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${
                    isPremium 
                    ? "bg-forest/5 hover:bg-forest/10 text-forest" 
                    : "bg-amber-50 hover:bg-amber-100/80 text-amber-700 border border-amber-100/50"
                }`}
            >
                <div className="flex items-center gap-2">
                    {isPremium ? (
                        <BrainCircuit className="w-4 h-4" />
                    ) : (
                        <Lock className="w-4 h-4" />
                    )}
                    <span className="text-xs font-black uppercase tracking-widest">
                        {isPremium ? "Why this protocol?" : "Why this protocol? (Premium)"}
                    </span>
                </div>
                
                {isPremium ? (
                    isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                ) : (
                    <Sparkles className="w-4 h-4" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && isPremium && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 mt-2 bg-white rounded-xl border border-forest/10 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full blur-2xl pointer-events-none -mt-10 -mr-10" />
                            {isLoading ? (
                                <div className="flex items-center gap-3 text-slate-400">
                                    <BrainCircuit className="w-5 h-5 animate-pulse text-forest/50" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Veda Engine Processing...</span>
                                </div>
                            ) : (
                                <p className="text-sm font-medium text-slate-600 leading-relaxed relative z-10">
                                    {explanation}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Render Upgrade Modal if triggered */}
            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
                userId={userId || ''}
                onSuccess={() => {
                    setIsUpgradeModalOpen(false);
                    // Standard practice to reload data manually or trigger page refresh
                    window.location.reload();
                }}
            />
        </div>
    );
}
