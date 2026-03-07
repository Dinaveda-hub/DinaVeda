"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft, BrainCircuit, Target, Activity,
    Sparkles, ShieldCheck, Zap, Leaf
} from "lucide-react";

export default function HowItWorks() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 20 }
        }
    } as const;

    return (
        <div className="bg-[#FBFAF8] min-h-screen text-slate-700 font-sans selection:bg-forest/20 selection:text-forest overflow-x-hidden">
            {/* Background Radiance (Softened) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest/[0.03] rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

            {/* Navigation */}
            <nav className="p-6 sticky top-0 z-50 flex justify-between items-center backdrop-blur-md bg-white/60 border-b border-forest/5">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-all duration-300">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-[10px] md:text-xs uppercase tracking-[0.3em] text-forest/60">The Portal</span>
                </Link>
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-10 h-10">
                        <Image
                            src="/logo.png"
                            alt="Dinaveda Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-black text-forest text-2xl tracking-tighter">Dinaveda</span>
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-20 md:py-32 relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-16 md:space-y-32"
                >
                    {/* Header */}
                    <motion.header variants={itemVariants} className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/5 text-forest/60 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-8">
                            <Sparkles className="w-4 h-4" /> Technical Blueprint
                        </div>
                        <h1 className="text-[2.75rem] md:text-8xl font-black text-forest tracking-tighter leading-none mb-8">
                            Harmonizing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-600">Biology & AI.</span>
                        </h1>
                        <p className="text-sm md:text-lg font-bold text-slate-600 max-w-lg leading-relaxed uppercase tracking-tight md:tracking-wide">
                            Understand the neural architecture that powers your journey toward perfect biological alignment.
                        </p>
                    </motion.header>

                    {/* Phase 1: Prakriti */}
                    <motion.section variants={itemVariants} className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="w-16 h-16 bg-forest text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-forest/20">
                                    <Target className="w-8 h-8" />
                                </div>
                                <h2 className="text-xs font-black text-forest/70 uppercase tracking-[0.4em] mb-4">Phase 01</h2>
                                <h3 className="text-2xl md:text-5xl font-black text-forest tracking-tighter mb-6">Prakriti Mapping</h3>
                                <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed mb-8">
                                    Your journey begins with a genetic audit. We map your "Prakriti"—your permanent biological baseline determined at conception. This serves as the "Gold Standard" for your unique state of perfect health.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#64748B]/10 text-[10px] font-black uppercase tracking-widest text-[#64748B] shadow-sm">Vata (Air)</div>
                                    <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#9A3412]/10 text-[10px] font-black uppercase tracking-widest text-[#9A3412] shadow-sm">Pitta (Fire)</div>
                                    <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#3F6212]/10 text-[10px] font-black uppercase tracking-widest text-[#3F6212] shadow-sm">Kapha (Earth)</div>
                                </div>
                            </div>
                            <div className="p-1 rounded-[3rem] border border-forest/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden">
                                <div className="aspect-square bg-white rounded-[2.8rem] relative overflow-hidden">
                                    <Image
                                        src="/images/prakriti_walkthrough.jpg"
                                        alt="Prakriti Mapping DNA"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Phase 2: Vikriti */}
                    <motion.section variants={itemVariants} className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-row-reverse">
                            <div className="md:order-2">
                                <div className="w-16 h-16 bg-[#D97706] text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-amber-900/10">
                                    <Activity className="w-8 h-8" />
                                </div>
                                <h2 className="text-xs font-black text-[#D97706]/80 uppercase tracking-[0.4em] mb-4">Phase 02</h2>
                                <h3 className="text-2xl md:text-5xl font-black text-slate-800 tracking-tighter mb-6">The Daily Pulse</h3>
                                <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed mb-8">
                                    Life creates "Vikriti"—daily deviations from your center. Through simple morning and evening signals, our engine tracks how stress, seasonal shifts, and nutrition are pulling you away from your baseline.
                                </p>
                                <ul className="space-y-3">
                                    {['Circadian Alignment', 'Agni (Digestion) Strength', 'Nervous System Load'].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
                                            <Zap className="w-3.5 h-3.5 text-amber-600" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-1 rounded-[3rem] border border-amber-900/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden md:order-1">
                                <div className="aspect-square bg-slate-900 rounded-[2.8rem] relative overflow-hidden">
                                    <Image
                                        src="/images/pulse_walkthrough.jpg"
                                        alt="The Daily Pulse"
                                        fill
                                        className="object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D97706]/20 to-transparent" />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Phase 3: AI Engine */}
                    <motion.section variants={itemVariants} className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="w-16 h-16 bg-[#1E1B4B] text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-indigo-950/20">
                                    <BrainCircuit className="w-8 h-8" />
                                </div>
                                <h2 className="text-xs font-black text-slate-600 uppercase tracking-[0.4em] mb-4">Phase 03</h2>
                                <h3 className="text-2xl md:text-5xl font-black text-slate-800 tracking-tighter mb-6">Neural Synthesis</h3>
                                <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed mb-8">
                                    This is where the magic happens. Dinaveda uses advanced AI to compare your daily signals against 5,000 years of Ayurvedic logic. It generates a "Pathya" (optimized plan) that is strictly calibrated for your unique biology.
                                </p>
                                <div className="p-6 rounded-2xl bg-slate-900/[0.03] border border-slate-900/5">
                                    <p className="text-xs font-bold text-slate-600 italic leading-relaxed">
                                        "Our engine doesn't just guess; it computes the precise counter-signals needed to neutralize biological drift."
                                    </p>
                                </div>
                            </div>
                            <div className="p-1 rounded-[3rem] border border-indigo-900/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden">
                                <div className="aspect-square bg-white rounded-[2.8rem] relative overflow-hidden">
                                    <Image
                                        src="/images/synthesis_walkthrough.jpg"
                                        alt="Neural Synthesis Brain"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Final CTA */}
                    <motion.section variants={itemVariants} className="pb-40">
                        <div className="glass p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-white/40 shadow-premium text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-gold/5 pointer-events-none" />
                            <div className="relative z-10 space-y-10">
                                <h2 className="text-3xl md:text-6xl font-black text-forest tracking-tighter leading-none">Ready to Harmonize?</h2>
                                <p className="text-base md:text-lg font-bold text-slate-600 max-w-md mx-auto leading-relaxed">
                                    Now that you understand the system, take the first step toward biological sovereignty. Initialize your neural hub to begin.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/ayuone"
                                        className="px-10 py-6 bg-forest text-white rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-xl shadow-forest/20 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Initialize Now
                                    </Link>
                                    <Link
                                        href="/"
                                        className="px-10 py-6 bg-white text-slate-400 border border-slate-100 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all"
                                    >
                                        Back to Portal
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                </motion.div>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-forest/5 text-center mt-auto bg-white/40">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
                    © {new Date().getFullYear()} Dinaveda • Optimized for Balance
                </p>
            </footer>
        </div>
    );
}
