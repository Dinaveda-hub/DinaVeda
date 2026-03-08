"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BrainCircuit, ShieldCheck, Zap, CloudSun, Leaf, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { applySignals, applyEffects, updateScores } from "@/engine/stateUpdater";
import { createClient } from "@/utils/supabase/client";
import { registerUserWithOneSignal, syncNotificationTags, getApiUrl } from "@/services/notificationService";

import { PrakritiEngine, PrakritiMetrics } from "@/engine/prakritiEngine";
import prakritiQuizData from "@/data/prakriti_questions.json";
import dailyCheckinData from "@/data/daily_checkin.json";

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
    const { state, updateState, isLoaded } = usePhysiologyState();

    // Shared State
    const [isPrakritiSet, setIsPrakritiSet] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    // Quiz State
    const [isIdentified, setIsIdentified] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', age: '', gender: '' });
    const [currentStep, setCurrentStep] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, Option>>({});
    const [constitution, setConstitution] = useState<any>(null);

    // Chat State
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([
        { role: "ai", text: "Namaste! How can I guide your wellness today? Tell me about your sleep, meals, or any discomfort." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Daily Check-in State
    const [activeCheckinType, setActiveCheckinType] = useState<"morning" | "evening" | null>(null);
    const [checkinStep, setCheckinStep] = useState(0);
    const [checkinAnswers, setCheckinAnswers] = useState<Record<string, CheckinOption>>({});
    const [completedLogs, setCompletedLogs] = useState<string[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Sync with global state
    useEffect(() => {
        if (isLoaded) {
            setIsPrakritiSet(state.is_onboarded);

            // If already onboarded, we can try to load the local constitution if available
            // though the chat will also use state.
            const storedPrakriti = localStorage.getItem("prakriti_result");
            if (storedPrakriti) {
                const data = JSON.parse(storedPrakriti);
                setConstitution(data);
                setMessages([
                    { role: "ai", text: `Namaste! I see your biological rhythm aligns with ${data.type}. How was your sleep last night? Or what was your dinner like?` }
                ]);
            }
        }
    }, [isLoaded, state.is_onboarded]);

    // Load initialization for logs only
    useEffect(() => {
        setMounted(true);

        const loadLogs = async () => {
            if (typeof window === "undefined") return;

            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Check pulse_logs for today's check-ins
                const todayStart = new Date();
                todayStart.setHours(0, 0, 0, 0);

                const { data: todayLogs } = await supabase
                    .from('pulse_logs')
                    .select('detailed_analysis, created_at')
                    .eq('user_id', user.id)
                    .gte('created_at', todayStart.toISOString());

                if (todayLogs) {
                    const completed: string[] = [];
                    todayLogs.forEach((log: any) => {
                        const analysis = (log.detailed_analysis || "").toLowerCase();
                        if (analysis.includes("morning check-in")) completed.push("morning");
                        if (analysis.includes("evening check-in")) completed.push("evening");
                    });
                    setCompletedLogs(completed);
                }
            } else {
                // Fallback to localStorage for guest users
                const today = new Date().toISOString().split('T')[0];
                const storedLogs = JSON.parse(localStorage.getItem("completed_logs") || "{}");
                const completed = Object.entries(storedLogs)
                    .filter(([_, val]) => val === today)
                    .map(([key]) => key);
                setCompletedLogs(completed);
            }
        };

        loadLogs();

        // Midnight Reset Interval
        const resetInterval = setInterval(() => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0) {
                setCompletedLogs([]);
                localStorage.removeItem("completed_logs");
            }
        }, 60000); // Check every minute

        return () => clearInterval(resetInterval);
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
    const calculateResult = () => {
        const answersArray = Object.values(selectedAnswers) as Option[];
        const finalScores = answersArray.reduce((acc: { vata: number; pitta: number; kapha: number }, opt: Option) => {
            acc.vata += opt.dosha_effect.vata;
            acc.pitta += opt.dosha_effect.pitta;
            acc.kapha += opt.dosha_effect.kapha;
            return acc;
        }, { vata: 0, pitta: 0, kapha: 0 });

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

        // Sync to Supabase Profiles
        const syncPrakriti = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await supabase.from('profiles').upsert({
                    id: user.id,
                    prakriti_result: finalResult,
                    is_onboarded: true,
                    updated_at: new Date().toISOString()
                });
            }
        };
        syncPrakriti();

        updateState({
            ...state,
            prakriti_vata: metrics.prakriti_vata,
            prakriti_pitta: metrics.prakriti_pitta,
            prakriti_kapha: metrics.prakriti_kapha,
            vata_state: metrics.prakriti_vata,
            pitta_state: metrics.prakriti_pitta,
            kapha_state: metrics.prakriti_kapha,
            is_onboarded: true
        });
    };

    const handleOptionSelect = (option: Option) => {
        setSelectedAnswers((prev: Record<number, Option>) => ({ ...prev, [currentStep]: option }));

        // Auto-advance with a slight delay
        setTimeout(() => {
            if (currentStep < quizFlow.length - 1) {
                setIsTransitioning(true);
                setTimeout(() => {
                    setCurrentStep((prev: number) => prev + 1);
                    setIsTransitioning(false);
                }, 300);
            }
        }, 200);
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep((prev: number) => prev - 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const handleNext = () => {
        const isLastStep = currentStep === quizFlow.length - 1;
        if (isLastStep) {
            calculateResult();
            setCurrentStep((prev: number) => prev + 1);
        } else if (selectedAnswers[currentStep]) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep((prev: number) => prev + 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const completeOnboarding = () => {
        setIsPrakritiSet(true);
        setMessages([
            { role: "ai", text: `Namaste! I see your biological rhythm aligns with ${constitution?.type || "your nature"}. How was your sleep last night? Or what was your dinner like?` }
        ]);
    };

    // --- DAILY CHECK-IN LOGIC ---
    const activeQuestions = (activeCheckinType && dailyCheckinData[activeCheckinType as keyof typeof dailyCheckinData]) ? dailyCheckinData[activeCheckinType as keyof typeof dailyCheckinData] : [];

    const handleCheckinOption = (option: CheckinOption) => {
        const questionId = activeQuestions[checkinStep].id;
        setCheckinAnswers((prev: Record<string, CheckinOption>) => ({ ...prev, [questionId]: option }));

        // Auto-advance with a slight delay
        setTimeout(() => {
            if (checkinStep < activeQuestions.length - 1) {
                setIsTransitioning(true);
                setTimeout(() => {
                    setCheckinStep((prev: number) => prev + 1);
                    setIsTransitioning(false);
                }, 300);
            }
        }, 200);
    };

    const handleCheckinBack = () => {
        if (checkinStep > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCheckinStep((prev: number) => prev - 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const handleCheckinNext = () => {
        const isLastStep = checkinStep === activeQuestions.length - 1;
        const currentQuestionId = activeQuestions[checkinStep].id;

        if (isLastStep) {
            finishCheckin();
        } else if (checkinAnswers[currentQuestionId]) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCheckinStep((prev: number) => prev + 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const finishCheckin = async () => {
        // Calculate total effects from all answers
        const answersArray = Object.values(checkinAnswers) as CheckinOption[];
        const effectsList = answersArray.map(opt => opt.effects);
        const nextState = applyEffects(state, effectsList);
        updateState(nextState);

        const typeLabel = activeCheckinType === "morning" ? "Morning" : "Evening";

        // Sync with Supabase
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const logData: any = {
                    user_id: user.id,
                    ojas_score: nextState.ojas_score || 70,
                    sleep_quality: checkinAnswers.sleep_quality?.answer,
                    wake_time: checkinAnswers.wake_time?.answer,
                    ama: checkinAnswers.tongue_coating?.answer,
                    mala: checkinAnswers.bowel_movement?.answer,
                    agni: checkinAnswers.appetite_level?.answer || checkinAnswers.digestion?.answer,
                    mood: checkinAnswers.mental_state?.answer || checkinAnswers.stress?.answer,
                    movement: checkinAnswers.physical_activity?.answer,
                    routines: checkinAnswers.meal_timing?.answer || checkinAnswers.evening_wind_down?.answer,
                    hydration: checkinAnswers.hydration?.answer ? (checkinAnswers.hydration.answer.includes("Well") ? 3 : 2) : 2,
                    detailed_analysis: `AyuOne ${typeLabel} Check-in completed. Energy: ${checkinAnswers.energy_level?.answer || 'N/A'}.`
                };

                const { error: dbError } = await supabase.from('pulse_logs').insert(logData);
                if (dbError) console.error("AyuOne Sync Error:", dbError);
            }
        } catch (err) {
            console.error("AyuOne Persistence Error:", err);
        }

        // Persist completion
        if (activeCheckinType) {
            const today = new Date().toISOString().split('T')[0];
            const storedLogs = JSON.parse(localStorage.getItem("completed_logs") || "{}");
            storedLogs[activeCheckinType] = today;
            localStorage.setItem("completed_logs", JSON.stringify(storedLogs));
            setCompletedLogs((prev: string[]) => [...prev, activeCheckinType!]);
        }

        setActiveCheckinType(null);
        setCheckinStep(0);
        setAccumulatedEffects([]);
        setCheckinAnswers({});
        setMessages((prev: { role: string; text: string }[]) => [
            ...prev,
            { role: "ai", text: `✅ ${typeLabel} Check-in Complete. I have dynamically synced these signals to your biological pulse. Ojas, Digestion, and Circadian reserves have been updated.` }
        ]);
        scrollToBottom();
    };

    // --- CHAT LOGIC ---
    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev: { role: string; text: string }[]) => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setIsTyping(true);

        const storedResult = localStorage.getItem("prakriti_result");
        const prakriti = storedResult ? JSON.parse(storedResult).type : "Unknown";

        try {
            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, prakriti }),
            });
            if (!res.ok) {
                throw new Error("Backend connection issue.");
            }
            const data = await res.json();

            if (data.reply) {
                setMessages((prev: { role: string; text: string }[]) => [...prev, { role: "ai", text: data.reply }]);

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

    if (!mounted || !isLoaded) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background text-forest/40">
                <BrainCircuit className="w-8 h-8 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="flex-1 w-full flex flex-col bg-background relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/10 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

            {/* Header */}
            <header className="px-6 pt-12 pb-6 md:px-12 md:pt-24 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 z-20 shrink-0">
                <div className="relative">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                        <div className="relative w-6 h-6">
                            <Image src="/logo.png" alt="Logo" fill className="object-contain" sizes="24px" />
                        </div>
                        <span className="text-[10px] md:text-sm font-black text-forest/60 uppercase tracking-[0.3em]">AyuOne Neural Interface</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter drop-shadow-sm leading-none">
                        {!isPrakritiSet ? "Protocol" : "Dialogue"}
                    </h1>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center overflow-hidden w-full relative">
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
                                        <button disabled={!userInfo.name || !userInfo.age || !userInfo.gender} onClick={() => setIsIdentified(true)} className="w-full mt-6 bg-forest text-white py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-forest/20 active:scale-95 disabled:opacity-50 transition-all">
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
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2">
                                                Question {currentStep + 1} of {quizFlow.length}
                                            </h4>
                                            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tighter text-balance">
                                                {quizFlow[currentStep].question}
                                            </h2>
                                        </div>

                                        <div className={`grid grid-cols-1 gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                            {quizFlow[currentStep].options.map((opt, idx) => {
                                                const isSelected = selectedAnswers[currentStep]?.label === opt.label;
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleOptionSelect(opt)}
                                                        className={`w-full font-bold py-4 px-6 rounded-2xl border transition-all duration-300 shadow-sm text-center active:scale-[0.98] group flex items-center justify-center gap-3 ${isSelected
                                                            ? 'bg-forest text-white border-forest'
                                                            : 'bg-white hover:bg-forest/5 text-slate-600 border-slate-100'}`}
                                                    >
                                                        <span className="text-sm leading-snug">{opt.label}</span>
                                                        {isSelected && <ShieldCheck className="w-4 h-4" />}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Navigation Buttons */}
                                        <div className="flex items-center justify-between mt-8 gap-4">
                                            <button
                                                onClick={handleBack}
                                                disabled={currentStep === 0}
                                                className="flex-1 bg-slate-50 text-slate-400 py-4 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-100"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                disabled={!selectedAnswers[currentStep]}
                                                className="flex-1 bg-forest text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-50 transition-all shadow-lg shadow-forest/10"
                                            >
                                                {currentStep === quizFlow.length - 1 ? 'Complete' : 'Next'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {constitution && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/60 shadow-premium space-y-8"
                            >
                                <div className="text-center flex flex-col items-center">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-forest text-white flex items-center justify-center mb-6 shadow-xl shadow-forest/20">
                                        <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
                                    </div>
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{constitution.title}</span>
                                    <h3 className="text-4xl md:text-5xl font-black text-forest tracking-tighter">{constitution.type}</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 py-8 border-y border-forest/5">
                                    <div className="text-center bg-white/40 p-6 rounded-2xl border border-white/80 transition-all hover:border-forest/20 shadow-sm">
                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Vata</div>
                                        <div className="text-3xl font-black text-forest">{constitution.prakriti_vata}%</div>
                                    </div>
                                    <div className="text-center bg-white/40 p-6 rounded-2xl border border-white/80 transition-all hover:border-forest/20 shadow-sm">
                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Pitta</div>
                                        <div className="text-3xl font-black text-forest">{constitution.prakriti_pitta}%</div>
                                    </div>
                                    <div className="text-center bg-white/40 p-6 rounded-2xl border border-white/80 transition-all hover:border-forest/20 shadow-sm">
                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Kapha</div>
                                        <div className="text-3xl font-black text-forest">{constitution.prakriti_kapha}%</div>
                                    </div>
                                </div>

                                <button onClick={completeOnboarding} className="block w-full text-center py-6 bg-forest text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-forest/30 hover:bg-forest/90 active:scale-95 transition-all">
                                    Enter Veda
                                </button>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-5xl flex flex-col glass rounded-[2rem] md:rounded-[3rem] shadow-premium border border-white/80 flex-1 overflow-hidden h-full">

                        {activeCheckinType ? (
                            <div className="flex-1 flex flex-col p-4 md:p-12 items-center justify-center overflow-y-auto w-full custom-scrollbar relative">
                                {/* Close Button */}
                                <button
                                    onClick={() => { setActiveCheckinType(null); setCheckinStep(0); setCheckinAnswers({}); }}
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
                                <div className="mt-8 absolute top-8 left-6 text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
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
                                        {activeQuestions[checkinStep].options.map((opt: any, idx: number) => {
                                            const isSelected = checkinAnswers[activeQuestions[checkinStep].id]?.answer === opt.answer;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleCheckinOption(opt)}
                                                    className={`w-full text-left p-6 rounded-[1.5rem] border-2 transition-all group flex flex-col relative ${isSelected
                                                        ? "border-forest bg-forest/5 text-forest shadow-md"
                                                        : "border-slate-100 bg-white text-slate-700 hover:border-forest hover:bg-forest/5 hover:text-forest"
                                                        }`}
                                                >
                                                    <span className="text-sm md:text-base leading-snug">{opt.answer}</span>
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="absolute top-4 right-4 text-forest"
                                                        >
                                                            <ShieldCheck className="w-5 h-5 fill-forest/10" />
                                                        </motion.div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Navigation Buttons for Check-in */}
                                    <div className="flex items-center gap-4 mt-10">
                                        <button
                                            onClick={handleCheckinBack}
                                            disabled={checkinStep === 0}
                                            className={`flex-1 flex items-center justify-center gap-2 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.1em] text-[10px] transition-all border-2 ${checkinStep === 0
                                                ? "border-slate-100 text-slate-300 cursor-not-allowed"
                                                : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                                }`}
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleCheckinNext}
                                            disabled={!checkinAnswers[activeQuestions[checkinStep].id]}
                                            className={`flex-1 flex items-center justify-center gap-2 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.1em] text-[10px] transition-all shadow-lg ${!checkinAnswers[activeQuestions[checkinStep].id]
                                                ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                                                : "bg-forest text-white shadow-forest/20 hover:bg-emerald-800"
                                                }`}
                                        >
                                            {checkinStep === activeQuestions.length - 1 ? "Complete" : "Next"}
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        ) : (
                            <>
                                {/* Fixed App Area */}
                                <div className="flex-1 w-full max-w-5xl flex flex-col relative pb-20">
                                    {/* Primary Content: Daily Ritual Cards */}
                                    <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 custom-scrollbar">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                            {[
                                                {
                                                    id: "morning",
                                                    label: "Morning Ritual",
                                                    description: "Align your physiology with the rising sun. Sync Agni and clear metabolic toxins.",
                                                    icon: CloudSun,
                                                    color: "bg-forest",
                                                    hover: "hover:border-forest/50 hover:bg-emerald-50/80",
                                                    accent: "bg-white border-slate-100",
                                                    gradient: "from-forest/10 to-transparent"
                                                },
                                                {
                                                    id: "evening",
                                                    label: "Evening Wind",
                                                    description: "Decompress the nervous system and prepare for deep, restorative Nidra.",
                                                    icon: Zap,
                                                    color: "bg-indigo-600",
                                                    hover: "hover:border-indigo-400/50 hover:bg-slate-50",
                                                    accent: "bg-white border-slate-100",
                                                    gradient: "from-indigo-100/10 to-transparent"
                                                },
                                            ].map((ritual) => {
                                                const isDone = completedLogs.includes(ritual.id);
                                                return (
                                                    <motion.button
                                                        key={ritual.id}
                                                        whileHover={{ y: -8, scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => !isDone && setActiveCheckinType(ritual.id as any)}
                                                        className={`relative group flex flex-col text-left overflow-hidden rounded-[2.5rem] border transition-all duration-500 shadow-sm hover:shadow-xl ${isDone ? "bg-slate-100/30 border-slate-200/50 opacity-60 grayscale-[0.5]" : `${ritual.accent} backdrop-blur-sm ${ritual.hover}`
                                                            }`}
                                                    >
                                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${ritual.gradient} rounded-full -mr-16 -mt-16 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                                                        <div className="p-8 relative z-10 flex-1 flex flex-col">
                                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-12 shadow-sm ${isDone ? "bg-slate-200 text-slate-400" : `${ritual.color} text-white`
                                                                }`}>
                                                                <ritual.icon className="w-7 h-7" />
                                                            </div>

                                                            <h3 className={`text-2xl font-black tracking-tighter mb-2 ${isDone ? "text-slate-500" : "text-slate-800"}`}>
                                                                {ritual.label}
                                                            </h3>
                                                            <p className="text-sm font-bold text-slate-500 leading-relaxed mb-8">
                                                                {ritual.description}
                                                            </p>

                                                            <div className="mt-auto flex items-center justify-between">
                                                                {isDone ? (
                                                                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                                        <ShieldCheck className="w-4 h-4" />
                                                                        Completed
                                                                    </div>
                                                                ) : (
                                                                    <div className="inline-flex items-center gap-2 text-forest px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-forest/20 group-hover:bg-forest group-hover:text-white transition-all">
                                                                        Begin Protocol
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>

                                        <div className="glass rounded-[2.5rem] p-8 md:p-12 border border-white/60 shadow-inner bg-white/30 text-center">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Neural Activity</p>
                                            <p className="text-slate-500 font-bold leading-relaxed max-w-md mx-auto italic">
                                                "Daily logging builds the metabolic archive. Only morning and evening signals are required to maintain a perfect biological sync."
                                            </p>
                                        </div>
                                    </div>

                                    {/* Floating Chat Bubble Toggle */}
                                    <div className="fixed bottom-32 right-6 z-[60] md:right-12">
                                        <motion.button
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsChatOpen(true)}
                                            className="w-16 h-16 md:w-20 md:h-20 bg-forest text-white rounded-full flex items-center justify-center shadow-2xl shadow-forest/30 border-4 border-white relative overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-forest opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <BrainCircuit className="w-8 h-8 relative z-10" />
                                            <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-forest animate-pulse" />
                                        </motion.button>
                                    </div>

                                    {/* Floating Chat Overlay */}
                                    <AnimatePresence>
                                        {isChatOpen && (
                                            <>
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    onClick={() => setIsChatOpen(false)}
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
                                                            onClick={() => setIsChatOpen(false)}
                                                            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
                                                        >
                                                            <Zap className="w-4 h-4 rotate-45" />
                                                        </button>
                                                    </div>

                                                    {/* Chat Messages Area */}
                                                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30">
                                                        {messages.map((msg: any, idx: number) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                                            >
                                                                <div className={`max-w-[85%] p-4 text-sm font-bold leading-relaxed shadow-sm border ${msg.role === "user"
                                                                    ? "bg-forest text-white rounded-2xl rounded-tr-sm border-forest/20 shadow-lg shadow-forest/10"
                                                                    : "bg-white text-slate-900 rounded-2xl border-slate-200 rounded-tl-sm shadow-md"
                                                                    }`}>
                                                                    {msg.text}
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
                                                    <div className="p-4 bg-white border-t border-slate-100 flex gap-3">
                                                        <input
                                                            type="text"
                                                            value={input}
                                                            onChange={(e) => setInput(e.target.value)}
                                                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                                            placeholder="Type your wellness query..."
                                                            className="flex-1 bg-slate-50 border border-slate-200 px-5 py-3 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:border-forest/30 transition-all"
                                                        />
                                                        <button
                                                            disabled={!input.trim() || isTyping}
                                                            onClick={handleSend}
                                                            className="w-11 h-11 bg-forest text-white rounded-2xl flex items-center justify-center shadow-lg shadow-forest/10 hover:bg-emerald-800 transition-all active:scale-90"
                                                        >
                                                            <Send className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
