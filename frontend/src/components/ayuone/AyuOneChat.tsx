import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Zap, Send } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getApiUrl, sendNotification } from "@/services/notificationService";
import { applySignals } from "@/engine/stateUpdater";
import { validateLLMSignals } from "@/engine/signalValidator";
import { useChatLimits } from "@/hooks/useChatLimits";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import UpgradeModal from "@/components/billing/UpgradeModal";

// Limit chat history to 50 messages to prevent infinite scrolling lag
const MAX_MESSAGES = 50;

interface AyuOneChatProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AyuOneChat({ isOpen, onClose }: AyuOneChatProps) {
    const { state, updateState, userId, subscriptionStatus } = usePhysiologyState();
    const { checkLimit, incrementCount, isAtDailyCap, timeUntilDailyReset } = useChatLimits();
    const [limitError, setLimitError] = useState<string | null>(null);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    const [messages, setMessages] = useState<{ role: string; text: string }[]>([
        { role: "ai", text: "Namaste! How can I guide your wellness today? Tell me about your sleep, meals, or any discomfort." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isTyping, isOpen]);

    const getCurrentTimeHHMM = () => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const limitStatus = checkLimit();
        if (limitStatus === 'daily_cap') {
            setIsUpgradeModalOpen(true);
            return;
        }
        if (limitStatus === 'rate_limit') {
            setLimitError('Slow down, you’re chatting too fast!');
            setTimeout(() => setLimitError(null), 3000);
            return;
        }

        const userMessage = input;
        setMessages((prev) => {
            const newMessages = [...prev, { role: "user", text: userMessage }];
            if (newMessages.length > MAX_MESSAGES) {
                return newMessages.slice(newMessages.length - MAX_MESSAGES);
            }
            return newMessages;
        });

        setInput("");
        setIsTyping(true);
        incrementCount();

        const storedResult = localStorage.getItem("prakriti_result");
        const prakriti = storedResult ? JSON.parse(storedResult).type : "Unknown";

        // Extract deep state for LLM context tuning
        const deepContext = {
            agni: state.agni,
            stress: state.stress,
            circadian: state.circadian
        };

        try {
            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    prakriti,
                    context: deepContext
                }),
            });
            
            if (!res.ok) {
                throw new Error("Backend connection issue.");
            }
            const data = await res.json();

            if (data.reply) {
                setMessages((prev) => {
                    const newMessages = [...prev, { role: "ai", text: data.reply }];
                    if (newMessages.length > MAX_MESSAGES) {
                        return newMessages.slice(newMessages.length - MAX_MESSAGES);
                    }
                    return newMessages;
                });

                if (data.signals && Array.isArray(data.signals) && data.signals.length > 0) {
                    const validSignals = validateLLMSignals(data.signals);

                    if (validSignals.length > 0) {
                        const currentTime = getCurrentTimeHHMM();
                        const { state: nextState, events } = await applySignals(validSignals, state, userId || 'guest', currentTime);
                        updateState(nextState);

                        if (userId && events.length > 0) {
                            const { triggerNotifications } = await import('@/services/notificationService');
                            triggerNotifications(events, userId);
                        }
                    }
                }
            } else {
                throw new Error("Empty reply");
            }
        } catch (error) {
            console.error("AyuOne Chat Error Details:", error);
            setMessages((prev) => [...prev, { role: "ai", text: "I'm currently unable to access the neural core. Please check your connection or try again later." }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70] md:hidden"
            />
            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9, x: "50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                className="fixed bottom-6 right-6 left-6 md:left-auto md:w-[450px] md:h-[650px] h-[80vh] glass rounded-[2.5rem] border border-white/60 shadow-2xl flex flex-col z-[80] overflow-hidden"
            >
                {/* Chat Header */}
                <div className="p-6 border-b border-forest/5 flex items-center justify-between bg-white/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                            <BrainCircuit className="w-5 h-5 text-forest" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-forest uppercase tracking-widest">AyuOne Veda</h4>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Neural Core Active</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
                    >
                        <Zap className="w-4 h-4 rotate-45" />
                    </button>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30">
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`max-w-[85%] p-4 text-sm font-bold leading-relaxed shadow-sm border ${msg.role === "user"
                                ? "bg-forest text-white rounded-[1.5rem] rounded-tr-sm border-forest/20 shadow-lg shadow-forest/10"
                                : "bg-white text-slate-900 rounded-[1.5rem] border-slate-200 rounded-tl-sm shadow-md"
                                }`}>
                                {msg.text.split('\n').map((line, i) => (
                                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/90 p-4 rounded-xl shadow-sm flex items-center gap-1">
                                <div className="w-1 h-1 bg-forest rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-1 h-1 bg-forest rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-1 h-1 bg-forest rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-2" />
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-2">
                    {limitError && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] font-black text-orange-500 uppercase tracking-widest text-center px-4"
                        >
                            {limitError}
                        </motion.div>
                    )}
                    
                    {isAtDailyCap ? (
                        <button
                            onClick={() => setIsUpgradeModalOpen(true)}
                            className="bg-amber-100/50 border border-amber-200 text-amber-700 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest w-full hover:bg-amber-100 transition-colors shadow-sm"
                        >
                            Upgrade for Unlimited AI Coaching
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Type your wellness query..."
                                disabled={isTyping}
                                className="flex-1 bg-slate-50 border border-slate-200 px-5 py-3 rounded-[1.5rem] text-sm font-bold text-slate-800 outline-none focus:border-forest/30 transition-all disabled:opacity-50"
                            />
                            <button
                                disabled={!input.trim() || isTyping}
                                onClick={handleSend}
                                className="w-12 h-12 shrink-0 bg-forest text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-forest/10 hover:bg-emerald-800 transition-all active:scale-90 disabled:opacity-50"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Premium Upgrade Modal Layered Above Chat */}
            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
                userId={userId || ''}
                onSuccess={() => {
                    setIsUpgradeModalOpen(false);
                    window.location.reload(); 
                }}
            />
        </AnimatePresence>
    );
}
