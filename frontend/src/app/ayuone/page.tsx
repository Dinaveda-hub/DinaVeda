"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BrainCircuit, ShieldCheck, Zap, CloudSun, Leaf, Send, Sparkles } from "lucide-react";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { applySignals, applyEffects, updateScores } from "@/engine/stateUpdater";
import { createBrowserClient } from "@supabase/ssr";
import { registerUserWithOneSignal } from "@/services/notificationService";

import { PrakritiEngine, PrakritiMetrics } from "@/engine/prakritiEngine";
import prakritiQuizData from "@/data/prakriti_questions.json";
import dailyCheckinData from "@/data/daily_checkin.json";
import DailyLogForm from "@/components/DailyLogForm";

interface CheckinOption {
    answer: string;
    signal: string;
    effects: Partial<Record<string, number>>;
}

interface CheckinQuestion {
    id: string;
    question: string;
    time: string;
    options: CheckinOption[];
}

interface Option {
    label: string;
    signal: string;
    dosha_effect: { vata: number; pitta: number; kapha: number };
}

interface Question {
    question_id: string;
    question: string;
    options: Option[];
}

const quizFlow = prakritiQuizData as Question[];

export default function AyuOneHub() {
    // Shared State
    const [isPrakritiSet, setIsPrakritiSet] = useState<boolean>(true);
    const [mounted, setMounted] = useState(false);

    // Quiz State
    const [isIdentified, setIsIdentified] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', age: '', gender: '' });
    const [currentStep, setCurrentStep] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
    const [constitution, setConstitution] = useState<any>(null);

    // Chat State
    const [messages, setMessages] = useState([
        { role: "ai", text: "Namaste! How can I guide your wellness today? Tell me about your sleep, meals, or any discomfort." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Daily Check-in State
    const [activeCheckinType, setActiveCheckinType] = useState<"morning" | "evening" | null>(null);
    const [checkinStep, setCheckinStep] = useState(0);
    const [accumulatedEffects, setAccumulatedEffects] = useState<Partial<Record<string, number>>[]>([]);
    const [showDetailedLog, setShowDetailedLog] = useState(false);

    const { state, updateState } = usePhysiologyState();

    useEffect(() => {
        setMounted(true);

        if (typeof window !== "undefined") {
            const storedPrakriti = localStorage.getItem("prakriti_result");
            if (storedPrakriti) {
                setIsPrakritiSet(true);
                const data = JSON.parse(storedPrakriti);
                setMessages([
                    { role: "ai", text: `Namaste! I see your biological rhythm aligns with ${data.type}. How was your sleep last night? Or what was your dinner like?` }
                ]);
            } else {
                setIsPrakritiSet(false);
            }
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isPrakritiSet) {
            scrollToBottom();
        }
    }, [messages, isTyping, isPrakritiSet]);

    // --- PRAKRITI LOGIC ---
    const calculateResult = (finalScores: { vata: number; pitta: number; kapha: number }) => {
        const engine = new PrakritiEngine();
        const metrics = engine.calculateConstitution([finalScores]);

        const finalResult = {
            title: "Core Profile (Prakriti)",
            type: metrics.constitution_string,
            prakriti_vata: metrics.prakriti_vata,
            prakriti_pitta: metrics.prakriti_pitta,
            prakriti_kapha: metrics.prakriti_kapha,
            insights: [
                `Your ${metrics.constitution_string} nature suggests a specific thermodynamic baseline.`,
                `This biological blueprint is now the permanent anchor for your daily health analysis.`
            ],
            timestamp: new Date().toISOString()
        };

        localStorage.setItem("prakriti_result", JSON.stringify(finalResult));
        setConstitution(finalResult);

        updateState({
            ...state,
            prakriti_vata: metrics.prakriti_vata,
            prakriti_pitta: metrics.prakriti_pitta,
            prakriti_kapha: metrics.prakriti_kapha,
            vata_state: metrics.prakriti_vata,
            pitta_state: metrics.prakriti_pitta,
            kapha_state: metrics.prakriti_kapha
        });
    };

    const handleOptionSelect = (option: Option) => {
        setIsTransitioning(true);
        const newScores = {
            vata: scores.vata + option.dosha_effect.vata,
            pitta: scores.pitta + option.dosha_effect.pitta,
            kapha: scores.kapha + option.dosha_effect.kapha
        };
        setScores(newScores);

        setTimeout(() => {
            const nextStep = currentStep + 1;
            if (nextStep < quizFlow.length) {
                setCurrentStep(nextStep);
            } else {
                calculateResult(newScores);
                setCurrentStep(nextStep);
            }
            setIsTransitioning(false);
        }, 400);
    };

    const completeOnboarding = () => {
        setIsPrakritiSet(true);
        setMessages([
            { role: "ai", text: `Namaste! I see your biological rhythm aligns with ${constitution?.type || "your nature"}. How was your sleep last night? Or what was your dinner like?` }
        ]);
    };

    // --- DAILY CHECK-IN LOGIC ---
    const activeQuestions = activeCheckinType ? dailyCheckinData[activeCheckinType] : [];

    const handleCheckinOption = (option: CheckinOption) => {
        setIsTransitioning(true);
        const newEffectsList = [...accumulatedEffects, option.effects];
        setAccumulatedEffects(newEffectsList);

        setTimeout(() => {
            const nextStep = checkinStep + 1;
            if (nextStep < activeQuestions.length) {
                setCheckinStep(nextStep);
            } else {
                finishCheckin(newEffectsList);
            }
            setIsTransitioning(false);
        }, 400);
    };

    const finishCheckin = (effectsList: Partial<Record<string, number>>[]) => {
        const nextState = applyEffects(state, effectsList);

        updateState(nextState);

        const typeLabel = activeCheckinType === "morning" ? "Morning" : "Evening";
        setActiveCheckinType(null);
        setCheckinStep(0);
        setAccumulatedEffects([]);
        setMessages(prev => [
            ...prev,
            { role: "ai", text: `✅ ${typeLabel} Check-in Complete. I have dynamically synced these signals to your biological pulse. Ojas, Digestion, and Circadian reserves have been updated.` }
        ]);
        scrollToBottom();
    };

    // --- CHAT LOGIC ---
    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setIsTyping(true);

        const storedResult = localStorage.getItem("prakriti_result");
        const prakriti = storedResult ? JSON.parse(storedResult).type : "Unknown";

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';
            const res = await fetch(`${apiUrl}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, prakriti }),
            });
            if (!res.ok) {
                throw new Error("Backend connection issue.");
            }
            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: "ai", text: data.reply }]);

                if (data.signals && Array.isArray(data.signals) && data.signals.length > 0) {
                    const nextState = applySignals(data.signals, state);
                    updateState(nextState);
                }
            } else {
                throw new Error("Empty reply");
            }
        } catch (error) {
            console.error("AyuOne Chat Error Details:", error);
            setMessages(prev => [...prev, { role: "ai", text: "I'm currently unable to access the neural core. Please check your connection or try again later." }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="flex flex-col h-screen h-[100dvh] bg-[#F8FAF9] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-60 -mt-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-60 -mb-60" />

            {/* Header - Removed sticky, using flex-col flow */}
            <header className="px-6 py-4 md:px-10 md:pt-12 flex flex-col md:flex-row md:items-end justify-between gap-2 z-20 shrink-0">
                <div className="relative">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-forest animate-pulse" />
                        <span className="text-[10px] font-black text-forest uppercase tracking-[0.3em]">AyuOne Engine</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-forest tracking-tight">
                        {!isPrakritiSet ? "Constitution Mapping" : "Veda Interface"}
                    </h1>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center overflow-hidden px-3 md:px-10 pb-4 md:pb-6">
                {!isPrakritiSet ? (
                    <div className="w-full max-w-xl space-y-8 py-8 overflow-y-auto custom-scrollbar">
                        {!constitution && currentStep < quizFlow.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/40 shadow-premium w-full text-center relative overflow-hidden"
                            >
                                {!isIdentified ? (
                                    <div className="space-y-6 max-w-sm mx-auto">
                                        <div className="text-center mb-8">
                                            <div className="w-16 h-16 bg-forest/5 rounded-[1.5rem] flex items-center justify-center text-forest mx-auto mb-6 shadow-sm">
                                                <User className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-black text-forest tracking-tighter mb-2">Initialize Profile</h3>
                                            <p className="text-xs font-bold text-slate-500">Provide basic details to map your constitution. You only do this once.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <input type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="w-full bg-white font-bold text-slate-700 px-6 py-4 rounded-xl border border-slate-100 focus:outline-none focus:border-forest/30 shadow-sm" placeholder="Your Name" />
                                            <input type="number" value={userInfo.age} onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })} className="w-full bg-white font-bold text-slate-700 px-6 py-4 rounded-xl border border-slate-100 focus:outline-none focus:border-forest/30 shadow-sm" placeholder="Age" />
                                            <select value={userInfo.gender} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} className="w-full bg-white font-bold text-slate-700 px-6 py-4 rounded-xl border border-slate-100 focus:outline-none focus:border-forest/30 shadow-sm cursor-pointer appearance-none">
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <button disabled={!userInfo.name || !userInfo.age || !userInfo.gender} onClick={() => setIsIdentified(true)} className="w-full mt-6 bg-forest text-white py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-forest/20 active:scale-95 disabled:opacity-50 transition-all">
                                            Begin Assessment
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Progress Bar */}
                                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-forest/5">
                                            <motion.div
                                                className="h-full bg-forest"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(currentStep / quizFlow.length) * 100}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>

                                        <div className="mb-8">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest/5 text-forest mb-4">
                                                <BrainCircuit className="w-6 h-6" />
                                            </div>
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">
                                                Question {currentStep + 1} of {quizFlow.length}
                                            </h4>
                                            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tighter text-balance">
                                                {quizFlow[currentStep].question}
                                            </h2>
                                        </div>

                                        <div className={`grid grid-cols-1 gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                            {quizFlow[currentStep].options.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionSelect(opt)}
                                                    className="w-full bg-white hover:bg-forest text-slate-600 hover:text-white font-bold py-4 px-6 rounded-2xl border border-slate-100 transition-all duration-300 shadow-sm text-center active:scale-[0.98] group"
                                                >
                                                    <span className="text-sm leading-snug">{opt.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {constitution && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/40 shadow-premium space-y-6 md:space-y-8"
                            >
                                <div className="text-center flex flex-col items-center">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[2rem] bg-forest/5 flex items-center justify-center text-forest mb-4">
                                        <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{constitution.title}</span>
                                    <h3 className="text-3xl md:text-4xl font-black text-forest tracking-tighter">{constitution.type}</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 py-6 border-y border-forest/5">
                                    <div className="text-center bg-white/40 p-4 rounded-xl md:rounded-2xl relative overflow-hidden group border border-slate-50 transition-all hover:border-forest/20 shadow-sm">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vata</div>
                                        <div className="text-2xl md:text-3xl font-black text-forest">{constitution.prakriti_vata}%</div>
                                    </div>
                                    <div className="text-center bg-white/40 p-4 rounded-xl md:rounded-2xl relative overflow-hidden group border border-slate-50 transition-all hover:border-forest/20 shadow-sm">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pitta</div>
                                        <div className="text-2xl md:text-3xl font-black text-forest">{constitution.prakriti_pitta}%</div>
                                    </div>
                                    <div className="text-center bg-white/40 p-4 rounded-xl md:rounded-2xl relative overflow-hidden group border border-slate-50 transition-all hover:border-forest/20 shadow-sm">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Kapha</div>
                                        <div className="text-2xl md:text-3xl font-black text-forest">{constitution.prakriti_kapha}%</div>
                                    </div>
                                </div>

                                <button onClick={completeOnboarding} className="block w-full text-center py-5 bg-forest text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-forest/20 hover:bg-forest/90 active:scale-[0.98] transition-all">
                                    Enter Veda
                                </button>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-4xl flex flex-col bg-white/60 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/80 h-full max-h-[calc(100%-10px)] md:max-h-[calc(100%-20px)] overflow-hidden">

                        {activeCheckinType ? (
                            <div className="flex-1 flex flex-col p-4 md:p-12 items-center justify-center overflow-y-auto w-full custom-scrollbar relative">
                                {/* Close Button */}
                                <button
                                    onClick={() => { setActiveCheckinType(null); setCheckinStep(0); setAccumulatedEffects([]); }}
                                    className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all font-bold shadow-sm"
                                >
                                    ✕
                                </button>

                                <div className="absolute top-6 left-6 h-1.5 bg-forest/5 w-[calc(100%-80px)] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-forest"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(checkinStep / activeQuestions.length) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <div className="mt-8 absolute top-8 left-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                                    Question {checkinStep + 1} of {activeQuestions.length}
                                </div>

                                <motion.div
                                    key={checkinStep}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full max-w-lg text-center mt-12"
                                >
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter text-balance mb-8">
                                        {activeQuestions[checkinStep].question}
                                    </h2>

                                    <div className={`grid grid-cols-1 gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                        {activeQuestions[checkinStep].options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleCheckinOption(opt)}
                                                className="w-full text-left p-6 rounded-[1.5rem] border-2 border-slate-100 bg-white hover:border-forest hover:bg-forest/5 transition-all text-slate-700 font-bold hover:text-forest group flex flex-col"
                                            >
                                                <span className="text-sm md:text-base leading-snug">{opt.answer}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        ) : (
                            <>
                                {/* Action Chips */}
                                <div className="p-3 md:p-4 border-b border-white/50 bg-white/40 flex gap-2 md:gap-3 overflow-x-auto custom-scrollbar items-center shrink-0">
                                    <button
                                        onClick={() => setActiveCheckinType("morning")}
                                        className="flex items-center gap-2 bg-forest text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-emerald-800 border border-forest/20 shadow-lg shadow-forest/10 whitespace-nowrap transition-all active:scale-95"
                                    >
                                        <CloudSun className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300" />
                                        Morning
                                    </button>
                                    <button
                                        onClick={() => setActiveCheckinType("evening")}
                                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-indigo-700 border border-indigo-200 shadow-lg shadow-indigo-10/10 whitespace-nowrap transition-all active:scale-95"
                                    >
                                        <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300" />
                                        Evening
                                    </button>
                                    <button
                                        onClick={() => setShowDetailedLog(true)}
                                        className="flex items-center gap-2 bg-slate-800 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-900 border border-slate-700 shadow-lg whitespace-nowrap transition-all active:scale-95"
                                    >
                                        <BrainCircuit className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
                                        Audit
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {showDetailedLog && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md p-4 md:p-10 flex items-center justify-center"
                                        >
                                            <motion.div
                                                initial={{ scale: 0.9, y: 20 }}
                                                animate={{ scale: 1, y: 0 }}
                                                exit={{ scale: 0.9, y: 20 }}
                                                className="bg-white rounded-[2rem] md:rounded-[3rem] w-full max-w-2xl h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl relative p-5 md:p-12"
                                            >
                                                <button
                                                    onClick={() => setShowDetailedLog(false)}
                                                    className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors z-10"
                                                >
                                                    <Zap className="w-4 h-4 rotate-45" />
                                                </button>
                                                <DailyLogForm
                                                    onResult={(data) => {
                                                        setShowDetailedLog(false);
                                                        setMessages(prev => [...prev, { role: "ai", text: "✅ Detailed Audit Complete. Your physiological pulse has been updated with these deep signals." }]);
                                                    }}
                                                    isLoading={isTyping}
                                                    setIsLoading={setIsTyping}
                                                />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Chat Messages Area */}
                                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 custom-scrollbar bg-slate-50/50">
                                    <div className="flex flex-col gap-4">
                                        {messages.map((msg, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                className={`flex gap-3 md:gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                {msg.role === "ai" && (
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-forest/10 flex items-center justify-center shrink-0 shadow-sm border border-forest/5">
                                                        <Leaf className="w-4 h-4 md:w-5 md:h-5 text-forest" />
                                                    </div>
                                                )}
                                                <div className={`max-w-[88%] md:max-w-[75%] p-4 md:p-5 text-sm md:text-base font-bold leading-relaxed shadow-sm border transition-all ${msg.role === "user"
                                                    ? "bg-forest/10 text-forest rounded-[1.25rem] rounded-tr-sm border-forest/20"
                                                    : "bg-white text-slate-800 rounded-[1.25rem] border-slate-200 rounded-tl-sm shadow-md"
                                                    }`}>
                                                    {msg.text}
                                                </div>
                                                {msg.role === "user" && (
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-sm border border-slate-300">
                                                        <User className="w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                        {isTyping && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 md:gap-4 justify-start">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-forest/10 flex items-center justify-center shrink-0 shadow-sm">
                                                    <Leaf className="w-4 h-4 md:w-5 md:h-5 text-forest" />
                                                </div>
                                                <div className="bg-white/90 backdrop-blur-sm p-4 md:p-5 rounded-[1.5rem] rounded-tl-sm border border-white/60 shadow-sm flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 bg-forest rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                    <div className="w-1.5 h-1.5 bg-forest rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                    <div className="w-1.5 h-1.5 bg-forest rounded-full animate-bounce"></div>
                                                </div>
                                            </motion.div>
                                        )}
                                        <div ref={messagesEndRef} className="h-2" />
                                    </div>
                                </div>

                                {/* Chat Input Area */}
                                <div className="p-3 md:p-8 bg-white/60 backdrop-blur-md border-t border-white/40 flex gap-2 md:gap-4 items-center shrink-0">
                                    <div className="flex-1 bg-white/80 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm flex items-center px-4 md:px-5 py-2.5 md:py-4 focus-within:border-forest/40 focus-within:ring-4 ring-forest/5 transition-all">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                            placeholder="Log signals..."
                                            className="w-full bg-transparent outline-none text-slate-700 font-bold placeholder:text-slate-400 text-xs md:text-base"
                                            disabled={isTyping}
                                        />
                                    </div>
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isTyping}
                                        className="w-10 h-10 md:w-14 md:h-14 bg-forest text-white rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-emerald-800 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-forest/20 shrink-0"
                                    >
                                        <Send className="w-4 h-4 md:w-6 md:h-6" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
