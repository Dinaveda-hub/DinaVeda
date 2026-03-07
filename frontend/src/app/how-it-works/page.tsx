"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
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

    // Abstract Biological Core SVG (Phase 01)
    const BiologicalCore = () => (
        <div className="relative w-48 h-48 flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-forest/5 rounded-full"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-forest/10 border-dashed rounded-full"
            />
            <div className="w-12 h-12 bg-forest/10 rounded-full blur-xl absolute" />
            <div className="relative w-24 h-24 rounded-full border-2 border-forest/20 flex items-center justify-center p-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-forest/20 to-emerald-800/20 animate-pulse" />
                <div className="absolute w-2 h-2 bg-forest rounded-full -top-1 left-1/2" />
                <div className="absolute w-1.5 h-1.5 bg-forest/40 rounded-full top-1/2 -right-1" />
            </div>
        </div>
    );

    // Neural Lattice SVG (Phase 03)
    const NeuralMesh = () => (
        <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-8 relative">
                {[...Array(9)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                        }}
                        className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    />
                ))}
                {/* Connection Lines (Simplified Abstract) */}
                <div className="absolute inset-0 border border-indigo-500/10 rounded-2xl -m-4" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent" />
            </div>
        </div>
    );

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
                <div className="flex items-center gap-2">
                    <span className="font-black text-forest text-2xl tracking-tighter">Dinaveda</span>
                    <Leaf className="w-6 h-6 text-forest" />
                </div>
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
                        <h1 className="text-4xl md:text-8xl font-black text-forest tracking-tighter leading-none mb-8">
                            Harmonizing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-600">Biology & AI.</span>
                        </h1>
                        <p className="text-base md:text-lg font-bold text-slate-400 max-w-lg leading-relaxed uppercase tracking-wide">
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
                                <h2 className="text-xs font-black text-forest/40 uppercase tracking-[0.4em] mb-4">Phase 01</h2>
                                <h3 className="text-2xl md:text-5xl font-black text-forest tracking-tighter mb-6">Prakriti Mapping</h3>
                                <p className="text-base md:text-lg font-bold text-slate-500 leading-relaxed mb-8">
                                    Your journey begins with a genetic audit. We map your "Prakriti"—your permanent biological baseline determined at conception. This serves as the "Gold Standard" for your unique state of perfect health.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#64748B]/10 text-[10px] font-black uppercase tracking-widest text-[#64748B] shadow-sm">Vata (Air)</div>
                                    <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#9A3412]/10 text-[10px] font-black uppercase tracking-widest text-[#9A3412] shadow-sm">Pitta (Fire)</div>
                                    <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#3F6212]/10 text-[10px] font-black uppercase tracking-widest text-[#3F6212] shadow-sm">Kapha (Earth)</div>
                                </div>
                            </div>
                            <div className="p-1 rounded-[3rem] border border-forest/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden">
                                <div className="aspect-square bg-[#FBFAF8] rounded-[2.8rem] flex items-center justify-center p-12">
                                    <BiologicalCore />
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
                                <h2 className="text-xs font-black text-amber-800/40 uppercase tracking-[0.4em] mb-4">Phase 02</h2>
                                <h3 className="text-2xl md:text-5xl font-black text-slate-800 tracking-tighter mb-6">The Daily Pulse</h3>
                                <p className="text-base md:text-lg font-bold text-slate-500 leading-relaxed mb-8">
                                    Life creates "Vikriti"—daily deviations from your center. Through simple morning and evening signals, our engine tracks how stress, seasonal shifts, and nutrition are pulling you away from your baseline.
                                </p>
                                <ul className="space-y-3">
                                    {['Circadian Alignment', 'Agni (Digestion) Strength', 'Nervous System Load'].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
                                            <Zap className="w-3.5 h-3.5 text-amber-600" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-1 rounded-[3rem] border border-amber-900/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden md:order-1">
                                <div className="aspect-square bg-slate-900 rounded-[2.8rem] flex items-center justify-center p-12 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D97706]/10 to-transparent" />
                                    <Activity className="w-32 h-32 text-[#D97706]/40" />
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
                                <h2 className="text-xs font-black text-indigo-400/60 uppercase tracking-[0.4em] mb-4">Phase 03</h2>
                                <h3 className="text-2xl md:text-5xl font-black text-slate-800 tracking-tighter mb-6">Neural Synthesis</h3>
                                <p className="text-base md:text-lg font-bold text-slate-500 leading-relaxed mb-8">
                                    This is where the magic happens. Dinaveda uses advanced AI to compare your daily signals against 5,000 years of Ayurvedic logic. It generates a "Pathya" (optimized plan) that is strictly calibrated for your unique biology.
                                </p>
                                <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                                    <p className="text-xs font-bold text-indigo-900 italic leading-relaxed">
                                        "Our engine doesn't just guess; it computes the precise counter-signals needed to neutralize biological drift."
                                    </p>
                                </div>
                            </div>
                            <div className="p-1 rounded-[3rem] border border-indigo-900/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden">
                                <div className="aspect-square bg-[#FBFAF8] rounded-[2.8rem] flex items-center justify-center p-12">
                                    <NeuralMesh />
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
                                <p className="text-base md:text-lg font-bold text-slate-500 max-w-md mx-auto leading-relaxed">
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
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
                    © {new Date().getFullYear()} Dinaveda Neural Systems • Optimized for Balance
                </p>
            </footer>
        </div>
    );
}
