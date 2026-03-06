"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Activity, ShieldCheck, Leaf, BrainCircuit, ArrowRight, Zap, Target, Play, User } from "lucide-react";
import Image from "next/image";

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
        id: "stress_reaction",
        domain: "Neural Overload [Manas]",
        text: "Under extreme stress or pressure, you mostly become:",
        options: [
            { label: "Restless, highly anxious, or scattered", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Irritated, critical, or hyper-controlling", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Withdrawn, silent, or unmotivated", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Calm externally but extremely tense internally", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    }
];

export default function WelcomeLandingPage() {
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [isIdentified, setIsIdentified] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', age: '', gender: '' });
    const [currentStep, setCurrentStep] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
    const [resultData, setResultData] = useState<any>(null);

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
                const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
                const [primary, primaryScore] = sorted[0];
                const [secondary, secondaryScore] = sorted[1];
                const [tertiary, tertiaryScore] = sorted[2];

                let type = "";
                if (primaryScore >= secondaryScore + 3) type = primary.charAt(0).toUpperCase() + primary.slice(1);
                else if (primaryScore - tertiaryScore <= 2) type = "Tridoshic";
                else type = `${primary.charAt(0).toUpperCase() + primary.slice(1)}-${secondary.charAt(0).toUpperCase() + secondary.slice(1)}`;

                const seasonal = `During transitional months, emphasize ${primary === 'vata' ? 'grounding oils' : primary === 'pitta' ? 'cooling herbs' : 'light movement'}.`;

                const finalResult = {
                    title: "Core Profile (Prakriti [Constitution])",
                    type,
                    scores: newScores,
                    userInfo,
                    insights: [
                        `Your intrinsic ${type} nature holds a deep affinity for ${primary === 'pitta' ? 'high-intensity analytical' : primary === 'vata' ? 'fluid and creative' : 'grounded, steady'} environments.`,
                        `To maintain optimal health, your specific baseline requires careful balancing of internal ${secondary === 'pitta' ? 'heat' : secondary === 'vata' ? 'movement' : 'stability'}.`
                    ],
                    seasonal,
                    timestamp: new Date().toISOString()
                };

                localStorage.setItem("prakriti_result", JSON.stringify(finalResult));
                setResultData(finalResult);
                setIsCompleted(true);
            }
            setIsTransitioning(false);
        }, 300);
    };

    return (
        <div className="bg-[#FAF9F6] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
            {/* Lightweight Static Background to improve rendering speeds */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-forest/5 via-transparent to-transparent pointer-events-none -z-10" />

            {/* Navbar */}
            <nav className="p-6 sticky top-0 z-50 flex justify-between items-center backdrop-blur-md bg-white/70 border-b border-forest/5">
                <div className="flex flex-1 items-center gap-2">
                    <div className="w-8 h-8 rounded-[0.8rem] bg-forest flex items-center justify-center text-white shadow-md">
                        <Leaf className="w-4 h-4" />
                    </div>
                    <span className="font-black text-forest text-xl tracking-tighter">Dinaveda</span>
                </div>
                <div className="hidden md:flex gap-6 items-center text-xs font-bold text-slate-500 uppercase tracking-widest pl-4 pr-12">
                    <button onClick={() => {
                        document.getElementById('ai-science')?.scrollIntoView({ behavior: 'smooth' });
                    }} className="hover:text-forest transition-colors">Technology</button>
                    <button onClick={() => {
                        if (!isQuizActive) setIsQuizActive(true);
                        document.getElementById('prakriti-auditor')?.scrollIntoView({ behavior: 'smooth' });
                    }} className="hover:text-forest transition-colors">Free Assessment</button>
                </div>
                <Link href="/login" className="px-6 py-2.5 rounded-[1.2rem] bg-forest text-white font-bold text-xs uppercase tracking-widest hover:bg-forest/90 transition-all shadow-lg shadow-forest/20 active:scale-95">
                    Sign In
                </Link>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="pt-20 pb-12 lg:pt-32 lg:pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8 text-center lg:text-left z-10 w-full">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-forest/10 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-forest/80">
                            <Sparkles className="w-4 h-4 text-gold" /> Beyond Generic Wellness
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-forest tracking-tighter leading-[0.9] text-balance">
                            Discover <br />
                            Your True <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest via-emerald-600 to-gold">
                                Elemental Nature.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl font-medium text-slate-500 max-w-lg leading-relaxed mx-auto lg:mx-0">
                            Discover your innate <strong className="text-forest">Prakriti Core</strong> (Ayurvedic Constitution) in moments. Dinaveda maps your unique essence and delivers deeply personalized daily rhythms.
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => {
                                    setIsQuizActive(true);
                                    setTimeout(() => {
                                        document.getElementById("prakriti-auditor")?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 100);
                                }}
                                className="group relative px-8 py-5 w-full sm:w-auto justify-center rounded-[2rem] bg-forest text-white flex items-center gap-3 overflow-hidden shadow-xl shadow-forest/30 transition-all hover:-translate-y-1 hover:shadow-2xl"
                            >
                                <span className="relative z-10 font-black text-sm uppercase tracking-widest">Take Free Assessment</span>
                                <Play className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform fill-white" />
                            </button>
                            <Link href="/login" className="px-8 py-5 rounded-[2rem] bg-white text-forest border-2 border-forest/10 font-black text-sm uppercase tracking-widest hover:bg-forest/5 transition-all text-center">
                                Log In
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 w-full relative z-10">
                        {/* Hero Image */}
                        <div className="relative w-full aspect-[4/5] md:aspect-square bg-gradient-to-br from-forest/10 to-transparent rounded-[3rem] overflow-hidden border-[8px] border-white shadow-2xl p-2 group">
                            <Image
                                src="/images/hero.png"
                                alt="Serene golden leaf over forest water - AI Ayurvedic technology"
                                fill
                                className="object-cover rounded-[2rem] transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* Main Interactive Modul: Prakriti Auditor */}
                <section id="prakriti-auditor" className="py-24 bg-white/50 px-6 relative">
                    <div className="max-w-4xl mx-auto">

                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-4">The Prakriti Auditor</h2>
                            <p className="text-slate-500 max-w-xl mx-auto font-medium">Decode the elemental framework of your body.</p>
                        </div>

                        {!isQuizActive ? (
                            <div className="bg-white border border-forest/10 rounded-[3rem] p-12 text-center shadow-premium relative overflow-hidden group w-full max-w-md mx-auto cursor-pointer hover:border-forest/30 transition-all hover:shadow-2xl" onClick={() => setIsQuizActive(true)}>
                                <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-20 h-20 mx-auto bg-forest/5 rounded-full flex items-center justify-center text-forest mb-6">
                                    <BrainCircuit className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black text-forest mb-4">Ready to Discover?</h3>
                                <p className="text-sm text-slate-500 mb-8 font-medium px-4">
                                    This elegant 4-step flow reveals the primary elemental forces guiding your life.
                                </p>
                                <button className="mx-auto flex items-center gap-2 bg-forest text-white px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-forest/20 group-hover:scale-105 transition-transform">
                                    Start Journey
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white border border-forest/10 rounded-[3rem] p-8 md:p-14 shadow-premium w-full max-w-3xl mx-auto relative overflow-hidden">
                                {!isIdentified ? (
                                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto space-y-6">
                                        <div className="text-center mb-10">
                                            <div className="w-16 h-16 bg-forest/5 rounded-[1.5rem] flex items-center justify-center text-forest mx-auto mb-6 shadow-sm">
                                                <User className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-3xl font-black text-forest tracking-tighter mb-2">Initialize Profile</h3>
                                            <p className="text-sm font-medium text-slate-500">Provide your basic details to begin the elemental mapping.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Full Name</label>
                                                <input type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="w-full bg-slate-50 font-bold text-slate-700 px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:border-forest/30 focus:bg-white transition-all shadow-sm" placeholder="Your Name" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Age</label>
                                                    <input type="number" value={userInfo.age} onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })} className="w-full bg-slate-50 font-bold text-slate-700 px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:border-forest/30 focus:bg-white transition-all shadow-sm" placeholder="Age" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Gender</label>
                                                    <select value={userInfo.gender} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} className="w-full bg-slate-50 font-bold text-slate-700 px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:border-forest/30 focus:bg-white transition-all shadow-sm cursor-pointer appearance-none">
                                                        <option value="">Select</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button disabled={!userInfo.name || !userInfo.age || !userInfo.gender} onClick={() => setIsIdentified(true)} className="w-full mt-6 bg-forest text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-forest/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center gap-2">
                                            Begin Assessment <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ) : !isCompleted ? (
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full"
                                    >
                                        <div className="absolute top-[-32px] left-[-32px] right-[-32px] h-1.5 bg-forest/5 md:top-[-56px] md:left-[-56px] md:right-[-56px]">
                                            <motion.div
                                                className="h-full bg-forest"
                                                initial={{ width: `${(currentStep / quizFlow.length) * 100}%` }}
                                                animate={{ width: `${((currentStep + 1) / quizFlow.length) * 100}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>

                                        <div className="mb-10 mt-4 text-center">
                                            <h4 className="inline-block px-3 py-1 bg-forest/5 text-[9px] font-black text-forest uppercase tracking-[0.3em] rounded-full mb-6">
                                                {quizFlow[currentStep].domain} ({currentStep + 1}/{quizFlow.length})
                                            </h4>
                                            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tighter text-balance leading-snug">
                                                {quizFlow[currentStep].text}
                                            </h2>
                                        </div>

                                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                            {quizFlow[currentStep].options.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionSelect(opt)}
                                                    className="w-full bg-white hover:bg-forest text-slate-600 hover:text-white font-bold py-5 px-6 rounded-2xl border-2 border-slate-100 transition-all duration-300 shadow-sm text-left flex items-center justify-between group active:scale-[0.98]"
                                                >
                                                    <span className="text-sm leading-snug pr-4">{opt.label}</span>
                                                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-white/40 flex items-center justify-center shrink-0">
                                                        <div className="w-2 h-2 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center py-6 border-b border-forest/10">
                                            <div className="w-16 h-16 rounded-[2rem] bg-forest/5 flex items-center justify-center text-forest mx-auto mb-4">
                                                <ShieldCheck className="w-8 h-8" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 block">Your Core Nature Revealed</span>
                                            <h3 className="text-5xl font-black text-forest tracking-tighter mb-2">{resultData.type}</h3>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6 py-4">
                                            {Object.entries(resultData.scores).map(([dosha, score]: any) => (
                                                <div key={dosha} className="text-center">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{dosha}</div>
                                                    <div className="text-2xl font-black text-forest">{score}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            {resultData.insights.map((insight: string, i: number) => (
                                                <div key={i} className="flex gap-4 items-start bg-[#F8FAF9] p-4 rounded-2xl border border-slate-200">
                                                    <Zap className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                                    <p className="text-sm font-bold text-slate-600 leading-relaxed">{insight}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-8 text-center bg-gradient-to-b from-transparent to-forest/5 p-8 -mx-8 -my-8 md:-mx-14 md:-my-14 rounded-b-[3rem] mt-8">
                                            <h4 className="text-xl font-black text-forest mb-2">Want deeper insights?</h4>
                                            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">Sign up to permanently save this beautiful profile, unlock daily tracking, and access personalized lifestyle paths.</p>
                                            <Link href="/login" className="inline-flex items-center justify-center w-full md:w-auto px-10 py-5 rounded-[2rem] bg-forest text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-forest/20 hover:bg-forest/90 active:scale-95 transition-all group">
                                                Sign Up For Free <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* AI & Features Section */}
                <section id="ai-science" className="px-6 py-24 relative z-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-premium border border-slate-100 flex flex-col justify-between">
                            <div>
                                <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 shadow-sm">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-forest tracking-tight mb-4">Deep Elemental Analysis</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    Our engine gracefully maps your innate constitution, identifying the precise balance of Vata, Pitta, and Kapha within you.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-premium border border-slate-100 flex flex-col justify-between">
                            <div>
                                <div className="w-16 h-16 rounded-[1.5rem] bg-amber-50 text-gold flex items-center justify-center mb-8 shadow-sm">
                                    <Activity className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-forest tracking-tight mb-4">Pulse Architecture</h3>
                                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                                    Track dynamic, daily imbalances (Vikriti). Log routine lifestyle habits to generate live, highly personalized Pathya remedy plans.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-forest p-10 rounded-[3rem] shadow-premium text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 blur-3xl opacity-20 -mr-10 -mt-10" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
                                    <BrainCircuit className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-tight mb-4">Veda Neural Engine</h3>
                                <p className="text-emerald-100/80 font-medium leading-relaxed mb-6">
                                    Powered by Gemini 2.5 Flash, Dinaveda seamlessly integrates seasonal ritucharya logic and cross-references them against large biological models.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="pt-20 pb-10 bg-forest text-white">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-[0.8rem] bg-white flex items-center justify-center text-forest">
                                <Leaf className="w-4 h-4" />
                            </div>
                            <span className="font-black text-2xl tracking-tighter">Dinaveda</span>
                        </div>
                        <p className="text-emerald-100/70 max-w-sm font-medium leading-relaxed text-sm">
                            Advanced wisdom meets modern technology. Discover your deep rhythm and balance.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-emerald-400 mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm font-medium text-emerald-100/80">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><button onClick={() => {
                                document.getElementById('prakriti-auditor')?.scrollIntoView({ behavior: 'smooth' });
                            }} className="hover:text-white transition-colors">Free Assessment</button></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-emerald-400 mb-6">Legal & Connect</h4>
                        <ul className="space-y-4 text-sm font-medium text-emerald-100/80">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-emerald-100/40 text-[10px] font-black uppercase tracking-widest border-t border-white/10 pt-10 mx-6">
                    © {new Date().getFullYear()} Dinaveda Neural Systems. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
