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
        domain: "Body Type",
        text: "How would you describe your natural body build?",
        options: [
            { label: "Lean or slender — I find it easy to stay light", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Medium or athletic — I have a steady, defined build", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Strong or broad — I have a solid, sturdy frame", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "A combination that changes with my lifestyle", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    {
        id: "energy",
        domain: "Energy Pattern",
        text: "When it comes to your daily energy, you usually feel:",
        options: [
            { label: "Quick bursts of energy followed by sudden tired spells", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "Strong, steady, and very goal-oriented", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "Consistent energy that takes a while to build up", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "Completely different from one day to the next", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    {
        id: "sleep_timing",
        domain: "Sleep Quality",
        text: "How do you typically experience sleep?",
        options: [
            { label: "I am a light sleeper and wake up easily", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "I sleep well but can be restless when busy", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "I am a very deep sleeper and love my rest", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "My sleep pattern is very irregular", value: { vata: 1, pitta: 1, kapha: 0 } },
        ]
    },
    {
        id: "stress_reaction",
        domain: "Stress Response",
        text: "When things get stressful, your first reaction is:",
        options: [
            { label: "I tend to feel worried or a bit scattered", value: { vata: 2, pitta: 0, kapha: 0 } },
            { label: "I get focused, impatient, or determined", value: { vata: 0, pitta: 2, kapha: 0 } },
            { label: "I stay calm but might feel unmotivated", value: { vata: 0, pitta: 0, kapha: 2 } },
            { label: "I feel tense but try to keep it inside", value: { vata: 1, pitta: 1, kapha: 0 } },
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
                    title: "Historical Health Identity",
                    type,
                    scores: newScores,
                    userInfo,
                    insights: [
                        `Your personality naturally thrives in ${primary === 'pitta' ? 'high-energy and focused' : primary === 'vata' ? 'flexible and creative' : 'stable and steady'} settings.`,
                        `To feel your best, your body needs to balance its natural tendency toward ${secondary === 'pitta' ? 'heat' : secondary === 'vata' ? 'restlessness' : 'heaviness'}.`
                    ],
                    seasonal: `This season, focus on ${primary === 'vata' ? 'warm, grounding foods' : primary === 'pitta' ? 'cooling activities' : 'refreshing movement'} to stay balanced.`,
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
        <div className="bg-background text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -ml-40" />

            {/* Navbar */}
            <nav className="p-6 sticky top-0 z-50 flex justify-between items-center backdrop-blur-md bg-white/60 border-b border-slate-100">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 transition-transform duration-500 group-hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="Dinaveda Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-black text-forest text-xl tracking-tighter">Dinaveda</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] pl-4 pr-12">
                    <button onClick={() => {
                        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }} className="hover:text-forest transition-colors">How it works</button>
                    <button onClick={() => {
                        if (!isQuizActive) setIsQuizActive(true);
                        document.getElementById('health-profile')?.scrollIntoView({ behavior: 'smooth' });
                    }} className="hover:text-forest transition-colors">Free Profile</button>
                </div>
                <Link href="/login" className="px-6 py-2.5 rounded-2xl bg-forest text-white font-black text-[10px] md:text-sm uppercase tracking-widest hover:bg-forest/90 transition-all shadow-lg shadow-forest/20 active:scale-95">
                    Sign In
                </Link>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="pt-20 pb-12 lg:pt-32 lg:pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8 text-center lg:text-left z-10 w-full">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-forest/60">
                            <Sparkles className="w-4 h-4 text-gold/60" /> Your Health, Reimagined
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black text-forest tracking-tighter leading-[0.9] text-balance">
                            Understand <br />
                            Your Body's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest via-emerald-600 to-gold">
                                Unique Rhythm.
                            </span>
                        </h1>

                        <p className="text-base md:text-lg font-bold text-slate-400 max-w-lg leading-relaxed mx-auto lg:mx-0 uppercase tracking-wide">
                            Your body is unique. Your health should be too. Dinaveda helps you discover your natural balance and stay centered every day.
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => {
                                    setIsQuizActive(true);
                                    setTimeout(() => {
                                        document.getElementById("health-profile")?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 100);
                                }}
                                className="group relative px-8 py-5 w-full sm:w-auto justify-center rounded-3xl bg-forest text-white flex items-center gap-3 overflow-hidden shadow-xl shadow-forest/20 transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95"
                            >
                                <span className="relative z-10 font-black text-xs md:text-sm uppercase tracking-widest">Start Your Health Profile</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Link href="/login" className="px-8 py-5 rounded-3xl bg-white text-slate-400 border border-slate-100 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-slate-50 transition-all text-center">
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

                {/* Main Interactive Modul: Health Profile Creation */}
                <section id="health-profile" className="py-24 bg-white/40 px-6 relative">
                    <div className="max-w-4xl mx-auto">

                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-4">Your Health Profile</h2>
                            <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-[0.3em]">Map your natural state of balance</p>
                        </div>

                        {!isQuizActive ? (
                            <div className="bg-white border border-slate-100 rounded-[3rem] p-12 text-center shadow-premium relative overflow-hidden group w-full max-w-md mx-auto cursor-pointer hover:border-forest/20 transition-all hover:shadow-2xl" onClick={() => setIsQuizActive(true)}>
                                <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-20 h-20 mx-auto bg-forest/5 rounded-[2rem] flex items-center justify-center text-forest mb-8 shadow-sm">
                                    <BrainCircuit className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black text-forest mb-4">Start Your Profile</h3>
                                <p className="text-sm text-slate-400 mb-10 font-bold px-4 leading-relaxed">
                                    Answer 4 simple questions to unlock your personal health ritual.
                                </p>
                                <button className="mx-auto flex items-center gap-3 bg-forest text-white px-10 py-5 rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-[0.2em] shadow-lg shadow-forest/20 group-hover:scale-105 transition-transform">
                                    Begin Now <ArrowRight className="w-4 h-4" />
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
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Full Name</label>
                                                <input type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="w-full bg-slate-50 font-bold text-slate-700 px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:border-forest/30 focus:bg-white transition-all shadow-sm" placeholder="Your Name" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Age</label>
                                                    <input type="number" value={userInfo.age} onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })} className="w-full bg-slate-50 font-bold text-slate-700 px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:border-forest/30 focus:bg-white transition-all shadow-sm" placeholder="Age" />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Gender</label>
                                                    <select value={userInfo.gender} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} className="w-full bg-slate-50 font-bold text-slate-700 px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:border-forest/30 focus:bg-white transition-all shadow-sm cursor-pointer appearance-none">
                                                        <option value="">Select</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button disabled={!userInfo.name || !userInfo.age || !userInfo.gender} onClick={() => setIsIdentified(true)} className="w-full mt-6 bg-forest text-white py-5 rounded-3xl font-black text-[10px] md:text-sm uppercase tracking-[0.2em] shadow-lg shadow-forest/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center gap-2">
                                            Start Assessment <ArrowRight className="w-4 h-4" />
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
                                            <h4 className="inline-block px-3 py-1 bg-forest/5 text-xs font-black text-forest uppercase tracking-[0.3em] rounded-full mb-6">
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
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2 block">Your Core Nature Revealed</span>
                                            <h3 className="text-5xl font-black text-forest tracking-tighter mb-2">{resultData.type}</h3>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6 py-4">
                                            {Object.entries(resultData.scores).map(([dosha, score]: any) => (
                                                <div key={dosha} className="text-center">
                                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{dosha}</div>
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
                                            <Link href="/login" className="inline-flex items-center justify-center w-full md:w-auto px-10 py-5 rounded-[2rem] bg-forest text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-forest/20 hover:bg-forest/90 active:scale-95 transition-all group">
                                                Sign Up For Free <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="px-6 py-24 relative z-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-12 rounded-[3.5rem] shadow-premium border border-slate-100 flex flex-col justify-between group hover:border-forest/10 transition-colors">
                            <div>
                                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-forest flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-forest tracking-tight mb-4">Personal Health Identity</h3>
                                <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">
                                    Discover how your body naturally operates and what it needs to stay in peak condition.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-12 rounded-[3.5rem] shadow-premium border border-slate-100 flex flex-col justify-between group hover:border-gold/10 transition-colors">
                            <div>
                                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-gold flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform">
                                    <Activity className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-forest tracking-tight mb-4">Daily Smart Rhythms</h3>
                                <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">
                                    Get a customized schedule of simple rituals and nutrition that keeps your energy steady all day.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-forest p-12 rounded-[3.5rem] shadow-premium text-white flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 blur-3xl opacity-20 -mr-10 -mt-10 group-hover:scale-150 transition-transform" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center mb-10 backdrop-blur-md">
                                    <BrainCircuit className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-tight mb-4">Proactive Insights</h3>
                                <p className="text-emerald-100/80 font-bold text-sm leading-relaxed mb-8">
                                    Our smart engine analyzes your daily logs to predict health trends and prevent burnout before it happens.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="pt-12 pb-12 bg-white border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-12">
                    <div className="md:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center gap-3 mb-4 group">
                            <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110">
                                <Image
                                    src="/logo.png"
                                    alt="Dinaveda Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-black text-3xl text-forest tracking-tighter">Dinaveda</span>
                        </Link>
                        <p className="text-slate-400 max-w-sm font-bold leading-relaxed text-sm uppercase tracking-wide">
                            Ancient wisdom meeting modern intelligence. Build your rhythm, find your balance.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400 mb-8">Product</h4>
                        <ul className="space-y-4 text-sm font-bold text-slate-600">
                            <li><button onClick={() => {
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }} className="hover:text-forest transition-colors">How it works</button></li>
                            <li><button onClick={() => {
                                setIsQuizActive(true);
                                document.getElementById('health-profile')?.scrollIntoView({ behavior: 'smooth' });
                            }} className="hover:text-forest transition-colors">Start Assessment</button></li>
                            <li><Link href="/login" className="hover:text-forest transition-colors">Sign In</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400 mb-8">Company</h4>
                        <ul className="space-y-4 text-sm font-bold text-slate-600">
                            <li><Link href="/privacy" className="hover:text-forest transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-forest transition-colors">Terms of Service</Link></li>
                            <li><Link href="/contact" className="hover:text-forest transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] pt-8 mx-6 border-t border-slate-50">
                    © {new Date().getFullYear()} Dinaveda. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
