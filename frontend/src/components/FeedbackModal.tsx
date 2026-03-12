import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { submitProtocolFeedback } from "@/services/feedbackService";
import { VedaState } from "@/types/physiologyState";
import { CompiledProtocolItem } from "@/engine/protocolCompiler";
import protocolsRaw from "@/data/protocols.json";

interface FeedbackModalProps {
    queue: CompiledProtocolItem[];
    currentState: VedaState;
    onClose: () => void;
    onComplete: () => void;
}

export default function FeedbackModal({ queue, currentState, onClose, onComplete }: FeedbackModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Escape key support
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isSubmitting) onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, isSubmitting]);

    // O(1) protocol lookup map
    const protocolMap = useMemo(() => {
        return new Map((protocolsRaw as any[]).map(p => [p.name || p.id, p]));
    }, []);

    if (queue.length === 0 || currentIndex >= queue.length) return null;

    const currentItem = queue[currentIndex];

    // Refined Primary Target Selection Logic
    const original = protocolMap.get(currentItem.name);
    const primaryTarget = useMemo(() => {
        if (!original?.variables) return "balance";
        
        // Sort by absolute effect and pick the strongest target variable
        const entries = Object.entries(original.variables) as [string, number][];
        if (entries.length === 0) return "balance";
        
        const [bestKey] = entries.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))[0];
        return bestKey;
    }, [original]);

    // Adaptive Question Wording
    const getQuestion = () => {
        if (primaryTarget === "balance") return `How did ${currentItem.title} feel?`;
        
        const targetMap: Record<string, string> = {
            stress: "help your stress levels?",
            sleep: "improve your sleep quality?",
            digestion: "improve your digestion?",
            agni: "stimulate your digestive fire?",
            ama: "reduce heaviness?",
            energy: "boost your energy?",
            mental_clarity: "clear your mind?",
            vata: "calm your nervous system?",
            pitta: "cool your internal heat?",
            kapha: "reduce physical sluggishness?",
            ojas: "restore your vital energy?"
        };

        const hint = targetMap[primaryTarget] || "improve your state?";
        return `Did ${currentItem.title} ${hint}`;
    };

    const handleFeedback = async (shift: number) => {
        setIsSubmitting(true);
        try {
            await submitProtocolFeedback(
                currentItem.name,
                currentState,
                primaryTarget,
                shift
            );
            
            // Artificial delay for UX/haptic feeling
            await new Promise(resolve => setTimeout(resolve, 300));

            if (currentIndex < queue.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                onComplete();
            }
        } catch (error) {
            console.error("Feedback submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest/40 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative border border-white/50"
                >
                    <button
                        disabled={isSubmitting}
                        onClick={onClose}
                        className="absolute top-6 right-6 text-slate-600 hover:text-forest transition-colors disabled:opacity-30"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                        Quick Feedback ({currentIndex + 1}/{queue.length})
                    </p>
                    <h3 className="text-2xl font-black text-forest tracking-tighter leading-tight mb-3">
                        {getQuestion()}
                    </h3>
                    <p className="text-sm font-bold text-slate-600 mb-8 text-balance">
                        Help Dinaveda learn your unique physiology to personalize future recommendations.
                    </p>

                    <div className="flex gap-3 justify-between">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            disabled={isSubmitting}
                            onClick={() => handleFeedback(-1)}
                            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-500 transition-all group disabled:opacity-50"
                        >
                            <ThumbsDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Worse</span>
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            disabled={isSubmitting}
                            onClick={() => handleFeedback(0)}
                            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-600 transition-all group disabled:opacity-50"
                        >
                            <Minus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">No Change</span>
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            disabled={isSubmitting}
                            onClick={() => handleFeedback(1)}
                            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-500 transition-all group disabled:opacity-50"
                        >
                            <ThumbsUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Better</span>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
