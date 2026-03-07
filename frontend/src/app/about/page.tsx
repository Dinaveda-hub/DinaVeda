"use client";

import { motion, Variants } from "framer-motion";
import { Leaf, BrainCircuit, Heart, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function AboutPage() {
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
    };

    return (
        <div className="min-h-screen bg-[#F8FAF9] selection:bg-forest/20 selection:text-forest overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -ml-40 pointer-events-none" />

            {/* Header / Nav */}
            <nav className="p-6 sticky top-0 z-50 flex justify-between items-center backdrop-blur-md bg-white/60 border-b border-slate-100">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-8 h-8 transition-transform duration-500 group-hover:scale-105">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" sizes="32px" />
                    </div>
                    <span className="font-black text-forest text-xl tracking-tighter uppercase">Dinaveda</span>
                </Link>
                <Link href="/" className="flex items-center gap-2 text-[10px] font-black text-forest uppercase tracking-[0.3em] hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-4 h-4" /> Back Home
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto px-6 pt-20 pb-32 relative z-10 text-slate-800">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-20"
                >
                    {/* Hero Section */}
                    <motion.section variants={itemVariants} className="text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-[10px] font-black uppercase tracking-[0.3em] text-forest/80">
                            <Sparkles className="w-4 h-4 text-gold/60" /> Our Mission
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-forest tracking-tighter leading-[0.85]">
                            Ancient Secrets. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest via-emerald-600 to-gold">Neural Intelligence.</span>
                        </h1>
                        <p className="text-lg md:text-xl font-bold text-slate-600 max-w-2xl mx-auto leading-relaxed uppercase tracking-wide">
                            We are building the bridge between 5,000 years of Ayurvedic wisdom and the future of hyper-personalized neural health.
                        </p>
                    </motion.section>

                    {/* Philosophy Section */}
                    <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass p-10 rounded-[3rem] border border-white">
                            <div className="w-14 h-14 rounded-2xl bg-forest/5 flex items-center justify-center text-forest mb-8">
                                <Leaf className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-forest mb-4">The Veda Tradition</h3>
                            <p className="text-slate-500 font-bold leading-relaxed text-sm uppercase tracking-wide">
                                Ayurveda teaches us that health is not a destination, but a state of continuous alignment. Everything—the sun, the seasons, the food we eat—interacts with our unique biological blueprint.
                            </p>
                        </div>
                        <div className="glass p-10 rounded-[3rem] border border-white">
                            <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center text-gold mb-8">
                                <BrainCircuit className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-forest mb-4">The Neural Engine</h3>
                            <p className="text-slate-500 font-bold leading-relaxed text-sm uppercase tracking-wide">
                                Dinaveda's proprietary AI translates subjective ayurvedic qualitative signals into precise, quantitative physiological scores, ensuring your daily rituals are backed by temporal data.
                            </p>
                        </div>
                    </motion.section>

                    {/* Expert Guidance Section */}
                    <motion.section variants={itemVariants} className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Expert Guidance</h2>
                            <h3 className="text-4xl font-black text-forest tracking-tighter">The Visionary Behind Dinaveda</h3>
                        </div>
                        <div className="glass p-1 split-glass flex flex-col md:flex-row items-center gap-10 rounded-[4rem] border border-white max-w-3xl mx-auto">
                            <div className="w-full md:w-1/3 aspect-square relative rounded-[3rem] overflow-hidden bg-forest/5">
                                <Image
                                    src="/logo.png"
                                    alt="Dr Rahul K R"
                                    fill
                                    className="object-contain p-8 opacity-40 grayscale group-hover:grayscale-0 transition-all"
                                />
                            </div>
                            <div className="flex-1 p-8 md:pr-12 md:pl-0 space-y-4">
                                <div className="space-y-1">
                                    <h4 className="text-3xl font-black text-forest tracking-tight leading-none">Dr Rahul K R</h4>
                                    <p className="text-gold font-bold text-sm uppercase tracking-widest">Ayurvedic Doctor & Founder</p>
                                </div>
                                <p className="text-slate-500 font-bold leading-relaxed text-sm uppercase tracking-wide">
                                    With deep roots in traditional Ayurvedic practice and a vision for digital health, Dr Rahul K R directs the scientific core of Dinaveda, ensuring every neural protocol is anchored in authentic medical wisdom.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Values */}
                    <motion.section variants={itemVariants} className="bg-forest p-12 md:p-20 rounded-[4rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-20 -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
                        <div className="relative z-10 space-y-12">
                            <div className="max-w-lg">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">Built for Balance.</h2>
                                <p className="text-emerald-100/70 font-bold text-sm uppercase tracking-[0.2em] leading-relaxed">
                                    Dinaveda was born from the need to simplify profound health sciences for the modern world. We believe your health profile should be as unique as your DNA.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-8 pt-8">
                                <div>
                                    <div className="text-3xl font-black mb-2 tracking-tighter">100%</div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200/50">Data Sovereignty</p>
                                </div>
                                <div>
                                    <div className="text-3xl font-black mb-2 tracking-tighter">24/7</div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200/50">Biological Tuning</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Final CTA */}
                    <motion.section variants={itemVariants} className="text-center py-10">
                        <Heart className="w-12 h-12 text-rose-400 mx-auto mb-8 animate-pulse" />
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Rhythm is Wellness</h4>
                        <Link href="/welcome" className="inline-flex items-center gap-3 bg-forest text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-forest/20 hover:scale-[1.02] active:scale-95 transition-all">
                            Initialize Your Journey
                        </Link>
                    </motion.section>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
