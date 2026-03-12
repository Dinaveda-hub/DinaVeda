"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft, BrainCircuit, Target, Activity,
    Sparkles, ShieldCheck, Zap, Leaf, Heart, ArrowRight,
    Utensils, Focus, Moon, Wind
} from "lucide-react";
import Footer from "@/components/Footer";

// Metadata cannot be in client components, but we'll include it as a comment for the user to move to a layout or metadata file if needed.
/*
export const metadata = {
  title: "How Dinaveda Works – AI Ayurveda Health Platform",
  description:
    "Learn how Dinaveda combines Ayurvedic principles with AI to generate personalized daily health routines."
}
*/

export default function HowItWorks() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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

    const timelineSteps = [
        { title: "Prakriti", desc: "Constitution", icon: Target },
        { title: "Daily Signals", desc: "Input Data", icon: Activity },
        { title: "Physiology Engine", desc: "AI Synthesis", icon: BrainCircuit },
        { title: "Pathya", desc: "Protocols", icon: Sparkles }
    ];

    return (
        <div className="bg-[#FBFAF8] min-h-screen text-slate-700 font-sans selection:bg-forest/20 selection:text-forest overflow-x-hidden">
            {/* Background Radiance */}
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
                        <Image src="/logo.png" alt="Dinaveda Logo" fill className="object-contain" sizes="40px" />
                    </div>
                    <span className="font-black text-forest text-2xl tracking-tighter">Dinaveda</span>
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-20 md:py-32 relative z-10">
                <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-24 md:space-y-32">
                    
                    {/* Header */}
                    <motion.header variants={itemVariants} className="text-center md:text-left">
                        <Heart className="w-10 h-10 text-rose-400 mx-auto md:mx-0 mb-8 animate-pulse" />
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/5 text-forest/60 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-8">
                            <Sparkles className="w-4 h-4" /> The Science of Balance
                        </div>
                        <h1 className="text-[2.75rem] md:text-8xl font-black text-forest tracking-tighter leading-none mb-8">
                            How it <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-600">Works.</span>
                        </h1>
                        <p className="text-sm md:text-lg font-bold text-slate-600 max-w-lg leading-relaxed tracking-tight">
                            Dinaveda uses a health intelligence system to translate 5,000 years of Ayurvedic medicine into your daily routine.
                        </p>
                    </motion.header>

                    {/* Visual Timeline */}
                    <motion.section variants={itemVariants} className="bg-white/40 border border-slate-100 p-8 rounded-[3rem] backdrop-blur-sm shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            {timelineSteps.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center gap-4 relative">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center text-forest relative z-10">
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-forest mb-1">{step.title}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{step.desc}</div>
                                    </div>
                                    {idx < timelineSteps.length - 1 && (
                                        <div className="hidden md:block absolute top-7 left-[100%] w-full h-[1px] bg-slate-100 -translate-y-1/2 z-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Phase 1: Prakriti */}
                    <motion.section variants={itemVariants} className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="w-16 h-16 bg-forest text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-forest/20">
                                    <Target className="w-8 h-8" />
                                </div>
                                <h2 className="text-xs font-black text-forest/70 uppercase tracking-[0.4em] mb-4">Phase 01</h2>
                                <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-6">Constitution Assessment</h3>
                                <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed mb-8">
                                    Your journey begins with a Prakriti assessment — an Ayurvedic framework that identifies your natural physiological tendencies. This defines your unique "center" for perfect health.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#64748B]/10 text-[10px] font-black uppercase tracking-widest text-[#64748B] shadow-sm">Vata (Air)</div>
                                    <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#9A3412]/10 text-[10px] font-black uppercase tracking-widest text-[#9A3412] shadow-sm">Pitta (Fire)</div>
                                    <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#3F6212]/10 text-[10px] font-black uppercase tracking-widest text-[#3F6212] shadow-sm">Kapha (Earth)</div>
                                </div>
                            </div>
                            <div className="p-1 rounded-[3rem] border border-forest/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden">
                                <div className="aspect-square bg-white rounded-[2.8rem] relative overflow-hidden">
                                    <Image src="/images/prakriti_walkthrough.jpg" alt="Prakriti Assessment" fill className="object-cover" />
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
                                <h3 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter mb-6">The Daily Pulse</h3>
                                <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed mb-8">
                                    Daily inputs such as sleep quality, digestion, mood, and activity help the system measure how your physiology is shifting away from your baseline.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        { l: 'Sleep Quality', v: 'Circadian Alignment' },
                                        { l: 'Digestion Strength', v: 'Agni (Metabolic) Stability' },
                                        { l: 'Stress & Mood', v: 'Nervous System Load' }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <Zap className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-800">{item.l}</div>
                                                <div className="text-xs font-medium text-slate-400">{item.v}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-1 rounded-[3rem] border border-amber-900/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden md:order-1">
                                <div className="aspect-square bg-slate-900 rounded-[2.8rem] relative overflow-hidden">
                                    <Image src="/images/pulse_walkthrough.jpg" alt="Daily Signals" fill className="object-cover opacity-80" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D97706]/20 to-transparent" />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Phase 3: Engine */}
                    <motion.section variants={itemVariants} className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="w-16 h-16 bg-[#1E1B4B] text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-indigo-950/20">
                                    <BrainCircuit className="w-8 h-8" />
                                </div>
                                <h2 className="text-xs font-black text-slate-600 uppercase tracking-[0.4em] mb-4">Phase 03</h2>
                                <h3 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter mb-6">Physiology Engine</h3>
                                <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed mb-8">
                                    Dinaveda uses a deterministic physiology engine combined with AI assistants to translate complex Ayurvedic medical logic into personalized daily routines strictly calibrated for your biology.
                                </p>
                                <div className="p-6 rounded-2xl bg-slate-900/[0.03] border border-slate-900/5">
                                    <p className="text-xs font-bold text-slate-600 italic leading-relaxed">
                                        "Our engine computes the precise lifestyle adjustments needed to return you to your natural constitution."
                                    </p>
                                </div>
                            </div>
                            <div className="p-1 rounded-[3rem] border border-indigo-900/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden">
                                <div className="aspect-square bg-white rounded-[2.8rem] relative overflow-hidden">
                                    <Image src="/images/synthesis_walkthrough.jpg" alt="Physiology Engine" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* What Dinaveda Generates Section */}
                    <motion.section variants={itemVariants} className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">The Outcome</h2>
                            <h3 className="text-3xl md:text-6xl font-black text-forest tracking-tighter">What Dinaveda Generates</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Personalized Diet", desc: "Meals that support your digestion and dosha balance.", icon: Utensils },
                                { title: "Daily Movement", desc: "Yoga or activity aligned with your energy state.", icon: Focus },
                                { title: "Sleep Optimization", desc: "Wind-down routines to repair circadian rhythm.", icon: Moon },
                                { title: "Mental Balance", desc: "Mindfulness practices based on stress levels.", icon: Wind }
                            ].map((item, idx) => (
                                <div key={idx} className="glass p-8 rounded-[2.5rem] border border-white flex gap-6 items-start hover:border-forest/20 transition-all shadow-sm">
                                    <div className="w-12 h-12 rounded-2xl bg-forest/5 flex-shrink-0 flex items-center justify-center text-forest">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-black text-forest uppercase tracking-widest text-sm">{item.title}</h4>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Final CTA */}
                    <motion.section variants={itemVariants} className="pb-40">
                        <div className="glass p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-white/40 shadow-premium text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-gold/5 pointer-events-none" />
                            <div className="relative z-10 space-y-10">
                                <h2 className="text-3xl md:text-6xl font-black text-forest tracking-tighter leading-none">Ready for Balance?</h2>
                                <p className="text-base md:text-lg font-bold text-slate-600 max-w-md mx-auto leading-relaxed">
                                    Step into your personalized health profile and begin mapping your path to optimal physiology.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/ayuone"
                                        className="px-10 py-6 bg-forest text-white rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-xl shadow-forest/20 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Start Your Personalized Protocol
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="pt-20 text-[10px] font-medium text-slate-400 text-center max-w-md mx-auto leading-relaxed">
                            Dinaveda provides wellness insights based on Ayurvedic principles. 
                            It does not replace professional medical diagnosis or treatment.
                        </div>
                    </motion.section>

                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
