"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, ChevronLeft, ClipboardList, BrainCircuit, ShieldCheck, Zap, Moon, Utensils, CloudSun } from "lucide-react";
import Link from "next/link";
import DailyLogForm from "@/components/DailyLogForm";
import PathyaPlanDisplay from "@/components/PathyaPlanDisplay";

interface Message {
    id: number;
    role: "ai" | "user";
    text: string;
}

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

const vikritiFlow: Question[] = [
    // DOMAIN 1 — Physical
    {
        id: "v_frame",
        domain: "Current Physical State",
        text: "Lately, your physical body feels:",
        options: [
            { label: "Lighter than usual, dry, or stiff", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Excessively warm, sensitive, or inflamed", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Heavier than usual, sluggish, or congested", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "About normal / fluctuating slightly", value: { vata: 1, pitta: 1, kapha: 1 } },
        ]
    },
    {
        id: "v_digestion",
        domain: "Current Digestion",
        text: "Over the past few weeks, your digestion has been:",
        options: [
            { label: "Irregular, gassy, or constipated", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Sharp, acidic, or running loose", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Slow, heavy, and lack of appetite", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Stable and comfortable", value: { vata: 0, pitta: 0, kapha: 0 } },
        ]
    },
    {
        id: "v_mind",
        domain: "Current Mental State",
        text: "Lately, your mind feels:",
        options: [
            { label: "Anxious, scattered, overthinking", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Irritable, critical, or intense", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Dull, unmotivated, or foggy", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Clear and calm", value: { vata: 0, pitta: 0, kapha: 0 } },
        ]
    },
    {
        id: "v_sleep",
        domain: "Current Sleep",
        text: "Recently, your sleep pattern has been:",
        options: [
            { label: "Interrupted, restless, or light", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Heavy sweating or waking up hot", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Oversleeping, hard to get out of bed", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Deep and refreshing", value: { vata: 0, pitta: 0, kapha: 0 } },
        ]
    },
    {
        id: "v_energy",
        domain: "Current Energy",
        text: "Your energy levels this week are mostly:",
        options: [
            { label: "Wired but tired, erratic", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Intense, pushing through fatigue", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Lethargic, heavy, and slow", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Consistent and strong", value: { vata: 0, pitta: 0, kapha: 0 } },
        ]
    }
];

export default function VedaAIActionHub() {
    const [activeTab, setActiveTab] = useState<"log" | "quiz">("log");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    // Quiz State
    const [isVikriti, setIsVikriti] = useState(false);
    const [isIdentified, setIsIdentified] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', age: '', gender: '' });
    const [activeFlow, setActiveFlow] = useState<Question[]>(quizFlow);
    const [currentStep, setCurrentStep] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
    const [constitution, setConstitution] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedPrakriti = localStorage.getItem("prakriti_result");
            if (storedPrakriti) {
                setIsVikriti(true);
                setActiveFlow(vikritiFlow);
            }

            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get("tab") === "quiz") {
                setActiveTab("quiz");
            }
        }
    }, [setActiveTab]);

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

        const seasonal = `During transitional months, emphasize ${primary === 'vata' ? 'grounding oils' : primary === 'pitta' ? 'cooling herbs' : 'light movement'}.`;

        const finalResult = {
            title: isVikriti ? "Vikriti (Current State)" : "Core Profile (Prakriti)",
            type,
            scores: finalScores,
            insights: isVikriti ? [
                "This mapping reflects your current, fluctuating state known as Vikriti.",
                `Any elevation above your core baseline may indicate an active imbalance.`,
                "Tailor your daily pathya log to soothe this specific drift."
            ] : insights,
            seasonal: isVikriti
                ? `Currently, your dominant active element is ${primary.charAt(0).toUpperCase() + primary.slice(1)}. Focus on a ${primary === 'vata' ? 'grounding and warm' : primary === 'pitta' ? 'cooling and calm' : 'light and active'} daily regimen to restore balance.`
                : seasonal,
            timestamp: new Date().toISOString()
        };

        if (!isVikriti) {
            localStorage.setItem("prakriti_result", JSON.stringify(finalResult));
        } else {
            localStorage.setItem("vikriti_result", JSON.stringify(finalResult));
        }

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
            if (nextStep < activeFlow.length) {
                setCurrentStep(nextStep);
            } else {
                calculateResult(newScores);
                if (!isVikriti) {
                    setIsVikriti(true);
                    setActiveFlow(vikritiFlow);
                }
                // We keep currentStep at boundary to trigger constitution render.
                setCurrentStep(nextStep);
            }
            setIsTransitioning(false);
        }, 400);
    };

    return (
        <div className="flex flex-col h-screen bg-[#F8FAF9] relative overflow-hidden">
            {/* Background elements - Optimized */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-60 -mt-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-60 -mb-60" />

            {/* Premium Tab Switcher */}
            <div className="p-6 sticky top-0 z-20">
                <div className="glass max-w-sm mx-auto p-1.5 rounded-[1.75rem] flex gap-1 border border-white/40 shadow-premium">
                    <button
                        onClick={() => setActiveTab("log")}
                        className={`flex-1 py-3 px-6 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === "log" ? "bg-forest text-white shadow-lg shadow-forest/20" : "text-slate-400 hover:text-forest"
                            }`}
                    >
                        <ClipboardList className="w-4 h-4" /> Pulse Log
                    </button>
                    <button
                        onClick={() => setActiveTab("quiz")}
                        className={`flex-1 py-3 px-6 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === "quiz" ? "bg-forest text-white shadow-lg shadow-forest/20" : "text-slate-400 hover:text-forest"
                            }`}
                    >
                        <Sparkles className="w-4 h-4" /> {isVikriti ? "Vikriti" : "Prakriti"}
                    </button>
                </div>
            </div>

            <main className="flex-1 overflow-y-auto p-6 pb-32">
                {activeTab === "log" ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl mx-auto space-y-8"
                    >
                        <div className="glass p-8 rounded-[2.5rem] border border-white/40 shadow-premium">
                            <DailyLogForm onResult={(data) => setResult(data)} isLoading={loading} setIsLoading={setLoading} />
                        </div>

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass p-8 rounded-[2.5rem] border border-white/40 shadow-premium"
                            >
                                <h3 className="text-[10px] font-black text-forest mb-6 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <BrainCircuit className="w-4 h-4" /> Derived Intelligence
                                </h3>
                                <PathyaPlanDisplay
                                    observation={result.pathya_plan.observation}
                                    principle={result.pathya_plan.principle}
                                    timeline={result.pathya_plan.pathya_plan}
                                    score={result.ojas_score}
                                    breakdown={result.breakdown}
                                    rituInfo={result.ritu_info}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <div className="max-w-xl mx-auto space-y-8 w-full">
                        {!constitution && currentStep < activeFlow.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/40 shadow-premium w-full text-center relative overflow-hidden"
                            >
                                {!isIdentified && !isVikriti ? (
                                    <div className="space-y-6 max-w-sm mx-auto">
                                        <div className="text-center mb-8">
                                            <div className="w-16 h-16 bg-forest/5 rounded-[1.5rem] flex items-center justify-center text-forest mx-auto mb-6 shadow-sm">
                                                <User className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-black text-forest tracking-tighter mb-2">Initialize Profile</h3>
                                            <p className="text-xs font-bold text-slate-500">Provide basic details to map your constitution.</p>
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
                                                animate={{ width: `${(currentStep / activeFlow.length) * 100}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>

                                        <div className="mb-8">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest/5 text-forest mb-4">
                                                <BrainCircuit className="w-6 h-6" />
                                            </div>
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">
                                                {activeFlow[currentStep].domain} ({currentStep + 1} of {activeFlow.length})
                                            </h4>
                                            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tighter text-balance">
                                                {activeFlow[currentStep].text}
                                            </h2>
                                        </div>

                                        <div className={`grid grid-cols-1 gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                            {activeFlow[currentStep].options.map((opt, idx) => (
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
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-forest/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{dosha}</div>
                                            <div className="text-3xl font-black text-forest">{score}</div>
                                            <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 opacity-60">
                                                {dosha === 'vata' ? 'Air + Ether' : dosha === 'pitta' ? 'Fire + Water' : 'Earth + Water'}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    {constitution.insights.map((insight: string, i: number) => (
                                        <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
                                            <Zap className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                            <p className="text-sm font-bold text-slate-600 leading-relaxed">{insight}</p>
                                        </div>
                                    ))}
                                    <div className="flex gap-4 items-start bg-earth/10 p-4 rounded-2xl">
                                        <CloudSun className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                        <p className="text-sm font-bold text-slate-700 leading-relaxed italic">{constitution.seasonal}</p>
                                    </div>
                                </div>

                                <button onClick={() => {
                                    setConstitution(null);
                                    if (constitution.title.includes("Prakriti")) {
                                        setCurrentStep(0);
                                        setScores({ vata: 0, pitta: 0, kapha: 0 });
                                    } else {
                                        // Retaking Vikriti
                                        setCurrentStep(0);
                                        setScores({ vata: 0, pitta: 0, kapha: 0 });
                                    }
                                }} className="block w-full text-center py-5 bg-forest text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-forest/20 hover:bg-forest/90 active:scale-[0.98] transition-all">
                                    {constitution.title.includes("Prakriti") ? "Take Vikriti Audit" : "Retake Vikriti Audit"}
                                </button>
                            </motion.div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
