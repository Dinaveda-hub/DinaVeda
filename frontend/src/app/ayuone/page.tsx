"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BrainCircuit, ShieldCheck, Zap, CloudSun, Leaf, Send, Sparkles } from "lucide-react";
import { useVedaState } from "@/engine/useVedaState";
import { StateUpdater } from "@/engine/stateUpdater";

interface Option {
    label: string;
    value: { vata: number; pitta: number; kapha: number };
}

interface Question {
    id: string;
    domain: string;
    text: string;
    options: Option[];
}

const quizFlow: Question[] = [
    // DOMAIN 1 — Constitutional Tendencies
    {
        id: "frame",
        domain: "Constitutional Baseline [Prakriti]",
        text: "Your natural body frame and build is:",
        options: [
            { label: "Light, lean, or thin — I lose weight easily (Vata [Air + Ether])", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Medium build, defined athletic muscles (Pitta [Fire + Water])", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Broader frame, solid, gains weight easily (Kapha [Earth + Water])", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "A mix depending on lifestyle", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    {
        id: "energy",
        domain: "Kinetic State [Prana]",
        text: "Your natural, untamed energy pattern feels like:",
        options: [
            { label: "Quick intense bursts, then sudden drops", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Steady, intense, and heavily driven", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Slow to start, but extremely long-lasting", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Highly unpredictable from day to day", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    {
        id: "skin",
        domain: "Physical Covering [Twak]",
        text: "Your skin and temperature tendency:",
        options: [
            { label: "Dry or cold-sensitive (Vata [Air + Ether])", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Warm, sensitive, prone to redness (Pitta [Fire + Water])", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Cool, smooth, slightly oily (Kapha [Earth + Water])", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Seasonal changes affect it", value: { vata: 1, pitta: 0, kapha: 1 } },
        ]
    },
    // DOMAIN 2 — Sleep & Circadian
    {
        id: "sleep_timing",
        domain: "Circadian Rhythm [Nidra]",
        text: "Your optimal sleep pattern is usually:",
        options: [
            { label: "Late sleeper, very light and easily disturbed", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Moderate sleep, but disrupted if I am stressed", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Very deep, heavy sleeper, hard to wake up", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Changes completely based on my schedule", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    {
        id: "skip_sleep",
        domain: "Circadian Rhythm [Nidra]",
        text: "If you skip sleep, you feel:",
        options: [
            { label: "Anxious and scattered", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Irritable and overheated", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Heavy and dull", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Tired but functional", value: { vata: 0, pitta: 1, kapha: 1 } },
        ]
    },
    {
        id: "focus_time",
        domain: "Circadian Rhythm [Nidra]",
        text: "Your best focus time is:",
        options: [
            { label: "Early morning", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Midday", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Late evening", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Varies daily", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    // DOMAIN 3 — Digestion & Agni
    {
        id: "hunger_pattern",
        domain: "Metabolic Fire [Agni]",
        text: "Your hunger pattern is:",
        options: [
            { label: "Irregular — sometimes hungry, sometimes not", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Strong and sharp — I get irritated if I miss meals", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Mild and steady — I can skip meals", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Depends on stress", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    {
        id: "after_meals",
        domain: "Metabolic Fire [Agni]",
        text: "After meals you often feel:",
        options: [
            { label: "Bloated or gassy", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Warm or acidic", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Heavy or sleepy", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Fine most of the time", value: { vata: 0, pitta: 0, kapha: 1 } },
        ]
    },
    {
        id: "food_preference",
        domain: "Metabolic Fire [Agni]",
        text: "Your preference for food is:",
        options: [
            { label: "Warm, comforting foods", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Cool, fresh foods", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Light, spicy foods", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Mixed cravings", value: { vata: 1, pitta: 0, kapha: 1 } },
        ]
    },
    // DOMAIN 4 — Stress & Seasonal Sensitivity
    {
        id: "stress_reaction",
        domain: "Neural Overload [Manas]",
        text: "Under stress you become:",
        options: [
            { label: "Restless or anxious", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Irritated or controlling", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Withdrawn or unmotivated", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Calm externally but tense internally", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    {
        id: "seasonal_change",
        domain: "Seasonal Rhythm [Ritucharya]",
        text: "Seasonal changes affect you most in:",
        options: [
            { label: "Dry or windy seasons", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Hot seasons", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Damp or cold seasons", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Transitional months", value: { vata: 1, pitta: 0, kapha: 1 } },
        ]
    },
    {
        id: "pace",
        domain: "Daily Rhythm [Dinacharya]",
        text: "Your natural pace in life is:",
        options: [
            { label: "Fast and multitasking", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Driven and goal-focused", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Slow and steady", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Balanced depending on environment", value: { vata: 1, pitta: 0, kapha: 1 } },
        ]
    },
    // DOMAIN 5 — Mind & Processing
    {
        id: "learning",
        domain: "Mind & Memory [Buddhi & Smriti]",
        text: "How do you process new information?",
        options: [
            { label: "Learn quickly, forget quickly", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Learn systematically, good memory", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Learn slowly, remember forever", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Varies heavily", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    {
        id: "joints",
        domain: "Structural Body [Dhatu]",
        text: "Your joints and bones generally feel:",
        options: [
            { label: "Prominent, easily pop or crack", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Flexible, loose, well-proportioned", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Heavy, well-lubricated, strong", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "No distinct pattern", value: { vata: 1, pitta: 1, kapha: 1 } },
        ]
    },
];

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
    const { state, updateState } = useVedaState();
    const updater = new StateUpdater();

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
        const sorted = Object.entries(finalScores).sort((a, b) => b[1] - a[1]);
        const [primary, primaryScore] = sorted[0];
        const [secondary, secondaryScore] = sorted[1];
        const [tertiary, tertiaryScore] = sorted[2];

        let type = "";
        if (primaryScore >= secondaryScore + 4) {
            type = primary.charAt(0).toUpperCase() + primary.slice(1);
        } else if (primaryScore - tertiaryScore <= 3) {
            type = "Tridoshic";
        } else {
            type = `${primary.charAt(0).toUpperCase() + primary.slice(1)}-${secondary.charAt(0).toUpperCase() + secondary.slice(1)}`;
        }

        const insights = [
            `Your ${type} nature suggests a natural affinity for ${primary === 'pitta' ? 'high-intensity' : primary === 'vata' ? 'fluid and creative' : 'grounded and steady'} environments.`,
            `The ${secondaryScore > 10 ? 'strong' : 'present'} ${secondary} influence means you should balance ${secondary === 'pitta' ? 'heat' : secondary === 'vata' ? 'movement' : 'stability'} carefully.`,
            `Focus on ${primaryScore > 18 ? 'aggressive' : 'gentle'} pacification of ${primary} during its peak times.`
        ];

        const finalResult = {
            title: "Core Profile (Prakriti)",
            type,
            scores: finalScores,
            insights,
            seasonal: `During transitional months, emphasize ${primary === 'vata' ? 'grounding oils' : primary === 'pitta' ? 'cooling herbs' : 'light movement'}.`,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem("prakriti_result", JSON.stringify(finalResult));
        setConstitution(finalResult);
    };

    const handleOptionSelect = (option: Option) => {
        setIsTransitioning(true);
        const newScores = {
            vata: scores.vata + option.value.vata,
            pitta: scores.pitta + option.value.pitta,
            kapha: scores.kapha + option.value.kapha
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
            { role: "ai", text: `Namaste! I see your biological rhythm aligns with ${constitution.type}. How was your sleep last night? Or what was your dinner like?` }
        ]);
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001'}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, prakriti }),
            });
            if (!res.ok) {
                throw new Error("Backend not fully reloaded yet.");
            }
            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: "ai", text: data.reply }]);

                // Apply deterministic state updates
                if (data.signals && Array.isArray(data.signals) && data.signals.length > 0) {
                    const nextState = updater.applySignals(state, data.signals);
                    updateState(nextState);
                }
            } else {
                throw new Error("Empty reply");
            }
        } catch (error) {
            console.error("AyuOne Chat Error Details:", error);
            setMessages(prev => [...prev, { role: "ai", text: "I'm currently unable to access the neural core. Please make sure your Python API is running on port 8001." }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] md:h-screen bg-[#F8FAF9] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-60 -mt-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-60 -mb-60" />

            {/* Header */}
            <header className="p-6 md:px-10 md:pt-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sticky top-0 bg-gradient-to-b from-[#F8FAF9] to-transparent z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-forest" />
                        <span className="text-[10px] font-black text-forest uppercase tracking-[0.3em]">AyuOne Engine</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-forest tracking-tighter">
                        {!isPrakritiSet ? "Constitution Mapping" : "Veda Interface"}
                    </h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-6 pb-24 md:px-10 custom-scrollbar flex flex-col items-center">
                {!isPrakritiSet ? (
                    <div className="w-full max-w-xl space-y-8 pb-32 pt-8">
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
                                                {quizFlow[currentStep].domain} ({currentStep + 1} of {quizFlow.length})
                                            </h4>
                                            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tighter text-balance">
                                                {quizFlow[currentStep].text}
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
                                className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/40 shadow-premium space-y-8"
                            >
                                <div className="text-center flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-[2rem] bg-forest/5 flex items-center justify-center text-forest mb-4">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{constitution.title}</span>
                                    <h3 className="text-4xl font-black text-forest tracking-tighter">{constitution.type}</h3>
                                </div>

                                <div className="grid grid-cols-3 gap-6 py-6 border-y border-forest/5">
                                    {Object.entries(constitution.scores).map(([dosha, score]: any) => (
                                        <div key={dosha} className="text-center bg-white/40 p-4 rounded-2xl relative overflow-hidden group border border-slate-50 transition-all hover:border-forest/20 shadow-sm">
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{dosha}</div>
                                            <div className="text-3xl font-black text-forest">{score}</div>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={completeOnboarding} className="block w-full text-center py-5 bg-forest text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-forest/20 hover:bg-forest/90 active:scale-[0.98] transition-all">
                                    Enter Veda
                                </button>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-3xl flex flex-col h-full bg-white/50 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white flex-1 mb-8 overflow-hidden">
                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 custom-scrollbar">
                            <AnimatePresence initial={false}>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex gap-4 ${msg.role === "user" ? "justify-end flex-row-reverse" : "justify-start"}`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-slate-100 text-slate-400" : "bg-forest/10"}`}>
                                            {msg.role === "ai" ? <Leaf className="w-5 h-5 text-forest" /> : <User className="w-5 h-5" />}
                                        </div>
                                        <div className={`max-w-[80%] p-5 text-sm md:text-base font-bold leading-relaxed break-words whitespace-pre-wrap shadow-sm ${msg.role === "user"
                                            ? "bg-slate-800 text-white rounded-[1.5rem] rounded-tr-sm"
                                            : "bg-white text-slate-700 rounded-[1.5rem] border border-slate-100 rounded-tl-sm"
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 justify-start">
                                        <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center shrink-0 shadow-sm">
                                            <Leaf className="w-5 h-5 text-forest" />
                                        </div>
                                        <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-sm border border-slate-100 shadow-sm flex items-center gap-1.5">
                                            <div className="w-2 h-2 bg-forest/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-2 h-2 bg-forest/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-2 h-2 bg-forest/40 rounded-full animate-bounce"></div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </AnimatePresence>
                        </div>
                        {/* Chat Input */}
                        <div className="p-4 md:p-6 bg-white/80 border-t border-slate-100 flex gap-4 items-center">
                            <div className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-inner flex items-center px-6 py-3 md:py-4 focus-within:border-forest/50 focus-within:ring-4 ring-forest/10 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Log your lifestyle signals..."
                                    className="w-full bg-transparent outline-none text-slate-700 font-bold placeholder:text-slate-400"
                                    disabled={isTyping}
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="w-12 h-12 md:w-14 md:h-14 bg-forest text-white rounded-full flex items-center justify-center hover:bg-emerald-800 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-xl shadow-forest/20 shrink-0"
                            >
                                <Send className="w-5 h-5 md:w-6 md:h-6 -ml-1" />
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
