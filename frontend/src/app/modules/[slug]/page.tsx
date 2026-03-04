"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft, BrainCircuit, Activity, Moon, Utensils,
    Zap, CloudSun, Leaf, CheckCircle2, Info, AlertCircle,
    Sparkles, ListChecks, History, Clock, ChevronRight, Waves
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const moduleData: Record<string, any> = {
    somasleep: {
        title: "Somasleep",
        subtitle: "Nidra & Sleep Architecture",
        icon: Moon,
        color: "indigo",
        accent: "#4338ca", // indigo-700
        principles: "Nidra is the natural state of restoration. Proper Sleep provides strength, immunity, and cognitive clarity.",
        vedaInsight: "The Charaka Samhita defines Nidra as one of the 'Trayopastambha' (Three Pillars of Life). It is essential for the nourishment of Ojas.",
        practices: [
            { name: "Padabhyanga", desc: "Foot massage with warm sesame oil.", time: "8:30 PM", detail: "Relaxes the nervous system and induces deep Somasleep." },
            { name: "Digital Detox", desc: "No screens 60 mins before bed.", time: "9:00 PM", detail: "Prevents Vata-aggravation in the mind caused by blue light." },
            { name: "Medhya Rasayana", desc: "Warm moon milk infusion.", time: "9:30 PM", detail: "Ashwagandha or nutmeg in milk calms the Sadhaka Pitta." }
        ],
        stats: [
            { label: "Circadian Sync", value: "85%" },
            { label: "Ojas Recovery", value: "High" }
        ]
    },
    nutriveda: {
        title: "Nutriveda",
        subtitle: "Ahara & Food Medicine",
        icon: Utensils,
        color: "emerald",
        accent: "#065f46", // emerald-800
        principles: "Ahara is the primary source of biological fuel. When diet is correct, medicine is of no need.",
        vedaInsight: "Ahara is the first of the 'Trayopastambha'. It dictates the quality of all seven Dhatus (tissues).",
        practices: [
            { name: "Agni Deepana", desc: "Ginger/Lemon before heavy meals.", time: "Before Lunch", detail: "Ignites the digestive fire (Jatharagni) for optimal nutrient absorption." },
            { name: "Mindful Mastication", desc: "32 chews per morsel.", time: "During Meals", detail: "Proper mixing with saliva begins the process of carbohydrate digestion." },
            { name: "Viruddha Check", desc: "Avoid incompatible food combos.", time: "All Day", detail: "Prevents the formation of Ama (internal toxins) in the gut." }
        ],
        stats: [
            { label: "Agni Strength", value: "Bala" },
            { label: "Toxin Build-up", value: "Minimal" }
        ]
    },
    dinaveda: {
        title: "Dinaveda",
        subtitle: "Dinacharya & Daily Rituals",
        icon: Activity,
        color: "forest",
        accent: "#1B4332", // forest
        principles: "Mastery over the self begins with mastery over the day. Daily rhythm establishes the biological clock.",
        vedaInsight: "Dinacharya aligns your individual biological rhythm with the cosmic solar cycle to prevent chronic imbalances.",
        practices: [
            { name: "Brahmamuhurta", desc: "Wake before sunrise.", time: "5:30 AM", detail: "The 'time of Brahman' offers the highest concentration of Sattvic energy." },
            { name: "Jivha Nirlekhana", desc: "Tongue scraping ritual.", time: "6:00 AM", detail: "Removes overnight metabolic waste and stimulates internal organs." },
            { name: "Gandusha", desc: "Oil pulling for systemic health.", time: "6:15 AM", detail: "Strengthens jaws, prevents tooth decay, and detoxifies the lymphatic system." }
        ],
        stats: [
            { label: "Ritual Streak", value: "5 Days" },
            { label: "Morning Energy", value: "Vibrant" }
        ]
    },
    rutuveda: {
        title: "Rutuveda",
        subtitle: "Ritucharya & Seasonality",
        icon: CloudSun,
        color: "orange",
        accent: "#c2410c", // orange-700
        principles: "As the universe shifts, so must the inner biological fire. Harmony with seasons prevents disease.",
        vedaInsight: "Ritucharya is the critical adaptation protocol. Each Ritu (season) requires specific shifts in Ahara and Vihara.",
        practices: [
            { name: "Seasonal Pulse", desc: "Clear Kapha from winter.", time: "Spring Focus", detail: "Vasant Ritucharya focuses on detoxification as frozen Kapha begins to melt." },
            { name: "Taste Modulation", desc: "Prioritize Bitter & Pungent.", time: "Vasant Logic", detail: "Bitter tastes help dry up excess moisture accumulated during the cold months." },
            { name: "Ritu Sandhi", desc: "Gentle transition protocols.", time: "Late March", detail: "The junction between seasons is when the body is most vulnerable to low immunity." }
        ],
        stats: [
            { label: "Seasonal Sync", value: "Active" },
            { label: "Current Ritu", value: "Vasanta" }
        ]
    },
    ayufit: {
        title: "Ayufit",
        subtitle: "Vyayama & Movement",
        icon: Zap,
        color: "rose",
        accent: "#be123c", // rose-700
        principles: "Movement should provide lightness and strength without exhaustion. Exercise to half capacity.",
        vedaInsight: "Vyayama brings 'Laghava' (lightness) to the body. Excessive exercise generates Vata; under-exercise generates Kapha.",
        practices: [
            { name: "Surya Namaskar", desc: "12 morning solar cycles.", time: "7:00 AM", detail: "A complete Sadhana involving physical movement, breath, and solar energy." },
            { name: "Dosha-Yoga", desc: "Pitra-soothing slow flow.", time: "11:00 AM", detail: "Current emphasis on grounding asanas to balance metabolic heat." },
            { name: "Pranayama", desc: "Anulom Vilom channeling.", time: "Anytime", detail: "Alternate nostril breathing balances the Ida and Pingala nadis." }
        ],
        stats: [
            { label: "Vitality level", value: "Stable" },
            { label: "Range of Motion", value: "Improved" }
        ]
    },
    manasayur: {
        title: "Manasayur",
        subtitle: "Sadvritta & Mental Flow",
        icon: BrainCircuit,
        color: "purple",
        accent: "#7e22ce", // purple-700
        principles: "The mind follows the body, and the body follows the mind. Cognitive clarity is the ultimate Ojas.",
        vedaInsight: "Sadvritta (Right Conduct) is considered a 'Mental Rasayana'. It prevents Pragyaparadha (crimes against wisdom).",
        practices: [
            { name: "Dharaniya Vega", desc: "Control of greed and anger.", time: "Continuous", detail: "Suppressing emotional urges (Vega) is fundamental to mental hygiene." },
            { name: "Dhyana", desc: "Grounding meditation.", time: "Sunrise/Set", detail: "Connects the individual consciousness to the universal field." },
            { name: "Trataka", desc: "Steady gazing for focus.", time: "Evening", detail: "Purifies the tear ducts and develops crystalline mental focus." }
        ],
        stats: [
            { label: "Mental Guna", value: "Sattva" },
            { label: "Reactive Index", value: "Low" }
        ]
    },
    sattvaliving: {
        title: "Sattvaliving",
        subtitle: "Achara Rasayana",
        icon: Leaf,
        color: "green",
        accent: "#15803d", // green-700
        principles: "The pinnacle of longevity is not just what you eat, but how you live and interact with the world.",
        vedaInsight: "Achara Rasayana is the logic of 'Behavioral Rejuvenation'. It is the third pillar (Brahmacharya/Lifestyle control).",
        practices: [
            { name: "Dana & Seva", desc: "Acts of selfless service.", time: "Weekly", detail: "Reduces Ego (Ahamkara) and expands the heart center (Hridaya)." },
            { name: "Satyam Bruyat", desc: "Speaking truth with kindness.", time: "Always", detail: "Vak-Shakti (power of speech) is preserved through truthful living." },
            { name: "Gratitude Log", desc: "Three nightly gratitudes.", time: "Night", detail: "Rewires the brain to focus on abundance rather than lack." }
        ],
        stats: [
            { label: "Ethical Alignment", value: "High" },
            { label: "Sattvic Pulse", value: "Growing" }
        ]
    }
};

export default function ModuleDetail({ params }: { params: any }) {
    const [slug, setSlug] = useState<string>("");
    const [modalContent, setModalContent] = useState<{ title: string; body: string; type?: string } | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncProgress, setSyncProgress] = useState(0);
    const [completedRituals, setCompletedRituals] = useState<Record<string, boolean>>({});

    // Dynamic AI State
    const [isGenerating, setIsGenerating] = useState(true);
    const [dynamicPlan, setDynamicPlan] = useState<any>(null);
    const [customNote, setCustomNote] = useState("");
    const [activeGoal, setActiveGoal] = useState("");
    const customNoteRef = useRef("");

    const router = useRouter();

    useEffect(() => {
        params.then((p: any) => {
            const currentSlug = p.slug;
            setSlug(currentSlug);
            generateDynamicPlan(currentSlug);
        });
    }, [params]);

    const generateDynamicPlan = async (currentSlug: string, noteOverride?: string) => {
        const goalToUse = noteOverride !== undefined ? noteOverride : customNote;
        setActiveGoal(goalToUse);
        setIsGenerating(true);
        try {
            const storedPrakriti = localStorage.getItem("prakriti_result");
            const storedVikriti = localStorage.getItem("vikriti_result");
            const prakriti = storedPrakriti ? JSON.parse(storedPrakriti).type : "Unknown";
            const vikriti = storedVikriti ? JSON.parse(storedVikriti).type : "Unknown";

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001'}/module-plan`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    module_slug: currentSlug,
                    prakriti,
                    vikriti,
                    custom_note: noteOverride !== undefined ? noteOverride : customNote
                }),
            });
            const data = await res.json();
            if (data && !data.error) {
                setDynamicPlan(data);
            }
        } catch (error) {
            console.error("Failed to fetch dynamic module plan:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleRitualClick = (practice: any) => {
        setCompletedRituals(prev => ({
            ...prev,
            [practice.name]: !prev[practice.name]
        }));

        setModalContent({
            title: practice.name,
            body: practice.detail
        });
    };

    const handleSyncClick = () => {
        setIsSyncing(true);
        setSyncProgress(0);

        // Simulated high-fidelity scan sequence
        const interval = setInterval(() => {
            setSyncProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsSyncing(false);
                        setModalContent({
                            title: "Pulse Optimized",
                            body: "Biometric analysis successful. Your Vitality (Ojas) has increased by 12 points. Proceed to the Intelligence Hub to see your updated Radar Chart.",
                            type: "success"
                        });
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
    };

    if (!slug) return null;
    const mod = moduleData[slug] || moduleData.dinaveda;
    const Icon = mod.icon;

    return (
        <div className="bg-background min-h-screen font-sans pb-40 relative overflow-x-hidden">
            {/* Soft Ambient Backgrounds */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-forest/5 to-transparent -z-10" />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-air/10 rounded-full blur-[100px] -mr-40" />

            {/* Biometric Scanner Overlay */}
            <AnimatePresence>
                {isSyncing && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-forest/90 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center px-10"
                        >
                            <div className="relative w-72 h-72 mx-auto mb-16">
                                {/* Pulsing Breathing Rings */}
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 border-[6px] border-white/20 rounded-full"
                                />
                                <motion.div
                                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-[-20px] border-[2px] border-gold/30 rounded-full"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Icon className="w-24 h-24 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
                                </div>
                                {/* Soft Light Bar */}
                                <motion.div
                                    animate={{ top: ['10%', '90%', '10%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute left-[15%] right-[15%] h-[2px] bg-white shadow-[0_0_15px_#fff]"
                                />
                            </div>

                            <h3 className="text-white text-3xl font-black tracking-tighter mb-3 leading-none italic">Calibrating Flow...</h3>
                            <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.4em] mb-10">Synchronizing your biological pulse</p>

                            {/* Progress Bar */}
                            <div className="w-full max-w-xs mx-auto bg-white/10 h-1 rounded-full overflow-hidden mb-6">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${syncProgress}%` }}
                                    className="h-full bg-gold"
                                />
                            </div>
                            <p className="text-gold font-black text-[10px] tabular-nums tracking-widest">{syncProgress}% COMPLETE</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <AnimatePresence>
                {modalContent && !isSyncing && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-forest/20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalContent(null)}
                            className="absolute inset-0"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="glass rounded-[3.5rem] p-12 max-w-sm w-full relative z-10 shadow-2xl border-white/60"
                        >
                            <div className="w-20 h-20 rounded-[2rem] bg-forest/5 flex items-center justify-center mb-8 mx-auto">
                                <Sparkles className="w-10 h-10 text-forest" />
                            </div>
                            <h3 className="text-3xl font-black text-forest tracking-tighter mb-6 text-center leading-tight">{modalContent.title}</h3>
                            <p className="text-slate-600 font-bold leading-relaxed text-center mb-12 text-balance italic">
                                "{modalContent.body}"
                            </p>

                            {modalContent.type === 'success' ? (
                                <button
                                    onClick={() => router.push('/veda-ai')}
                                    className="w-full bg-forest text-white py-6 rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl shadow-forest/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    Return to Sanctuary <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setModalContent(null)}
                                    className="w-full bg-forest text-white py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-all"
                                >
                                    Understood
                                </button>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header Section */}
            <div className="pt-20 pb-36 px-8 relative overflow-hidden transition-colors duration-1000 z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px]" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/modules" className="inline-flex items-center gap-3 mb-12 bg-white/60 hover:bg-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all backdrop-blur-md border border-slate-100 text-slate-500 hover:text-forest group shadow-sm">
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Paths
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-20 h-20 bg-white shadow-premium border border-slate-100 rounded-[2rem] flex items-center justify-center mb-8">
                            <Icon className="w-10 h-10 text-forest" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-forest tracking-tighter mb-6 leading-[0.9]">{mod.title}</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">{mod.subtitle}</p>
                    </motion.div>
                </div>
            </div>

            {/* Main Guidance Area */}
            <main className="px-6 -mt-20 relative z-20 space-y-10 max-w-4xl mx-auto">

                {/* Guiding Wisdom */}
                <section className="glass rounded-[3.5rem] p-12 shadow-premium border border-white/60">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 rounded-[1.5rem] bg-air flex items-center justify-center text-blue-500 shadow-sm">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-forest uppercase tracking-[0.2em] leading-none mb-1">Guiding Wisdom</h2>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Principles for your unique nature</p>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-12 border-l-4 border-forest/20 pl-8 py-2 text-balance">
                        {mod.principles}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {mod.stats.map((stat: any, i: number) => (
                            <div key={i} className="bg-white/40 p-10 rounded-[2.5rem] border border-white shadow-sm flex flex-col gap-4 group hover:bg-white transition-colors">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1 group-hover:text-forest transition-colors">{stat.label}</p>
                                <p className="text-3xl font-black text-forest tracking-tighter group-active:scale-95 transition-transform">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Specific Outcomes Input */}
                <section className="glass rounded-[3.5rem] p-10 shadow-premium border border-white/60">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center shrink-0">
                            <Info className="w-6 h-6 text-forest" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Specific Goal?</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                Want to adapt this module for a specific goal? Tell Veda.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                        <textarea
                            value={customNote}
                            onChange={(e) => {
                                setCustomNote(e.target.value);
                                customNoteRef.current = e.target.value;
                            }}
                            placeholder="e.g. I want to specifically reduce inflammation..."
                            className="flex-1 bg-white font-bold text-sm text-slate-700 p-5 rounded-[2rem] border border-slate-100 focus:outline-none focus:border-forest/30 shadow-sm resize-y min-h-[60px]"
                        />
                        <button
                            onClick={() => generateDynamicPlan(slug, customNoteRef.current)}
                            disabled={isGenerating}
                            className={`px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg self-end md:self-stretch flex items-center justify-center ${isGenerating ? 'bg-slate-200 text-slate-400' : 'bg-forest text-white hover:bg-forest/90 active:scale-95'}`}
                        >
                            {isGenerating ? <div className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" /> : 'Adapt'}
                        </button>
                    </div>
                </section>

                {/* Daily Harmonizers */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between px-6 flex-wrap gap-4">
                        <h3 className="text-sm font-black text-forest uppercase tracking-[0.3em] flex items-center gap-3">
                            <ListChecks className="w-5 h-5" /> Dynamic AI Practices
                            {activeGoal && (
                                <span className="text-[9px] bg-orange-100/80 text-orange-700 px-3 py-1 rounded-full border border-orange-200 ml-2 hidden sm:inline-block">Target: {activeGoal}</span>
                            )}
                        </h3>
                        {isGenerating && (
                            <span className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                                <Sparkles className="w-3 h-3 animate-pulse" /> Generating...
                            </span>
                        )}
                        {!isGenerating && (
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-2">
                                Tuned for You
                            </span>
                        )}
                        {activeGoal && (
                            <div className="w-full sm:hidden text-[9px] font-black bg-orange-100/80 text-orange-700 px-3 py-2 rounded-xl border border-orange-200 mt-2 flex items-center gap-2">
                                <Sparkles className="w-3 h-3" /> Target: {activeGoal}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {(dynamicPlan?.dynamic_practices || mod.practices).map((practice: any, i: number) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => handleRitualClick(practice)}
                                className="glass p-8 rounded-[3rem] shadow-premium flex items-center justify-between group border border-white/60 text-left active:scale-[0.98] transition-all duration-700 relative z-10"
                            >
                                <div className="flex items-center gap-8">
                                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 shadow-sm border ${completedRituals[practice.name] ? 'bg-forest text-white' : 'bg-forest/5 text-forest/40 border-forest/5'}`}>
                                        {completedRituals[practice.name] ? <CheckCircle2 className="w-8 h-8" /> : <Icon className="w-8 h-8" />}
                                    </div>
                                    <div>
                                        <h4 className={`font-black text-2xl tracking-tighter leading-tight mb-2 ${completedRituals[practice.name] ? 'text-forest/50' : 'text-forest'}`}>{practice.name}</h4>
                                        <p className={`text-xs font-bold uppercase tracking-widest ${completedRituals[practice.name] ? 'text-forest/30' : 'text-slate-500'}`}>{practice.desc}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3 pr-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 group-hover:text-forest transition-colors">
                                        <Clock className="w-4 h-4" /> {practice.time}
                                    </div>
                                    <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Whispers of Wisdom */}
                <div className="glass p-12 rounded-[3.5rem] border border-forest/10 flex flex-col md:flex-row gap-10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-water/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className={`w-20 h-20 rounded-[2rem] ${isGenerating ? 'bg-slate-200' : 'bg-forest'} text-white flex items-center justify-center shrink-0 shadow-2xl shadow-forest/20 relative z-10 group-hover:scale-110 transition-transform duration-700`}>
                        {isGenerating ? <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin" /> : <Info className="w-10 h-10" />}
                    </div>
                    <div className="relative z-10 w-full">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <h4 className="text-[10px] font-black text-forest uppercase tracking-[0.4em]">AI Personalized Insight</h4>
                            {activeGoal && !isGenerating && (
                                <span className="text-[9px] font-black bg-orange-100/80 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 flex items-center gap-2 shrink-0">
                                    <Sparkles className="w-3 h-3" /> Target: {activeGoal}
                                </span>
                            )}
                        </div>
                        <div className={`text-base font-medium ${isGenerating ? 'text-slate-400' : 'text-slate-700'} leading-relaxed max-w-2xl text-balance mb-6 transition-colors space-y-4`}>
                            {isGenerating ? (
                                <p>Deep-parsing local environment and Dosha parameters to synthesize insight...</p>
                            ) : (
                                Array.isArray(dynamicPlan?.personalized_insight)
                                    ? dynamicPlan.personalized_insight.map((paragraph: string, idx: number) => (
                                        <p key={idx} className="bg-white/40 p-4 rounded-2xl border border-white/50 shadow-sm">{paragraph}</p>
                                    ))
                                    : <p>{dynamicPlan?.personalized_insight || mod.vedaInsight}</p>
                            )}
                        </div>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-xl">
                            "Let this wisdom settle into your heart. True vitality is a gentle dialogue between your choices and the cosmic rhythm."
                        </p>
                    </div>
                </div>

                {/* Supportive Action Call */}
                <div className="pt-12">
                    <Link
                        href="/veda-ai"
                        className="w-full bg-forest text-white p-12 rounded-[3.5rem] shadow-2xl flex items-center justify-between group transition-all duration-700 active:scale-[0.97] hover:shadow-forest/30 relative z-10"
                    >
                        <div className="text-left">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Establish Rhythm</p>
                            <h3 className="text-3xl font-black tracking-tighter leading-none">Log My Daily Pulse</h3>
                        </div>
                        <div className="bg-white rounded-[2rem] p-6 text-forest transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 shadow-2xl flex items-center justify-center">
                            <Activity className="w-8 h-8 group-hover:animate-pulse" />
                        </div>
                    </Link>
                    <p className="text-center mt-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Trust the process • Breathe deep</p>
                </div>

            </main>
        </div>
    );
}
