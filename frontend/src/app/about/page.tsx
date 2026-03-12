"use client";

import { motion, Variants } from "framer-motion";
import { Leaf, BrainCircuit, Heart, Sparkles, ArrowLeft, ShieldCheck, Database, Zap, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    // Animation Variants - Only used for key sections to minimize layout work
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
                <div className="space-y-32">
                    
                    {/* Hero Section */}
                    <motion.section 
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        className="text-center space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-[10px] font-black uppercase tracking-[0.3em] text-forest/80">
                            <Sparkles className="w-4 h-4 text-gold/60" /> Our Mission
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-forest tracking-tighter leading-[0.85]">
                            Ancient Medicine. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest via-emerald-600 to-gold">Personalized Health.</span>
                        </h1>
                        <p className="text-lg md:text-xl font-bold text-slate-600 max-w-2xl mx-auto leading-relaxed tracking-tight">
                            We are building the bridge between 5,000 years of Ayurvedic medicine and the future of hyper-personalized computational health.
                        </p>
                    </motion.section>

                    {/* How Dinaveda Works */}
                    <section className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">The Process</h2>
                            <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter">How Dinaveda Works</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Signal Collection", desc: "Daily check-ins capture sleep, digestion, mood, and activity patterns.", icon: Activity },
                                { title: "Physiology Engine", desc: "Signals are processed into dynamic Ayurvedic and biological scores.", icon: BrainCircuit },
                                { title: "Protocol Selection", desc: "Deterministic rules select personalized Ayurvedic routines for your current state.", icon: Zap },
                                { title: "AI Refinement", desc: "AI Health Coaches convert protocols into structured, actionable daily routines.", icon: Sparkles }
                            ].map((step, idx) => (
                                <div key={idx} className="glass p-8 rounded-[2.5rem] border border-white flex gap-6 items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-forest/5 flex-shrink-0 flex items-center justify-center text-forest">
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-black text-forest uppercase tracking-widest text-sm">{step.title}</h4>
                                        <p className="text-sm text-slate-500 font-bold leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Scientific Model Section */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={itemVariants}
                        className="space-y-12 bg-white/40 p-12 rounded-[4rem] border border-slate-100"
                    >
                        <div className="text-center">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-4">
                                Scientific Model
                            </h2>
                            <h3 className="text-4xl font-black text-forest tracking-tighter">
                                The Physiology Intelligence Engine
                            </h3>
                            <p className="text-slate-500 font-bold text-sm max-w-xl mx-auto mt-6 leading-relaxed">
                                Dinaveda converts everyday lifestyle signals into measurable variables, allowing principles such as Dosha balance, Agni strength, and Circadian alignment to be quantified and tracked over time.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "20+", detail: "Biological Variables" },
                                { label: "100%", detail: "Personalized" },
                                { label: "5k Yrs", detail: "Clinical Wisdom" },
                                { label: "AI", detail: "Neural Insights" }
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center space-y-2">
                                    <div className="text-3xl font-black text-forest">{stat.label}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.detail}</div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Expert Guidance Section */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={itemVariants} 
                        className="space-y-12"
                    >
                        <div className="text-center">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Clinical Authority</h2>
                            <h3 className="text-4xl font-black text-forest tracking-tighter">The Visionary Behind Dinaveda</h3>
                        </div>
                        <div className="glass p-2 flex flex-col md:flex-row items-stretch gap-2 rounded-[3.5rem] border border-white max-w-4xl mx-auto overflow-hidden">
                            <div className="w-full md:w-2/5 relative rounded-[3rem] overflow-hidden bg-forest/5 min-h-[300px]">
                                <Image
                                    src="/rahul.jpg"
                                    alt="Dr Rahul K R"
                                    fill
                                    className="object-cover transition-all duration-700 hover:scale-105"
                                    placeholder="blur"
                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                                />
                            </div>
                            <div className="flex-1 p-10 md:p-12 flex flex-col justify-center space-y-6">
                                <div className="space-y-1">
                                    <h4 className="text-4xl font-black text-forest tracking-tight leading-none">Dr Rahul K R</h4>
                                    <p className="text-gold font-black text-[10px] uppercase tracking-[0.3em]">Ayurvedic Physician & Founder</p>
                                </div>
                                <p className="text-slate-600 font-bold leading-relaxed text-sm">
                                    Dr Rahul K R is an Ayurvedic physician specializing in preventive lifestyle medicine and circadian health. Through Dinaveda, he is translating clinical Ayurvedic principles into modern computational health models, ensuring every digital routine is anchored in authentic clinical wisdom.
                                </p>
                                <div className="flex gap-4 items-center pt-4 opacity-50">
                                    <div className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-200">Lifestyle Medicine</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-200">Circadian Health</div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Differentiation Section */}
                    <section className="bg-forest p-12 md:p-20 rounded-[4rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-20 -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <h4 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Why Dinaveda?</h4>
                                <p className="text-emerald-100/70 font-bold text-sm leading-relaxed max-w-md">
                                    Most wellness apps offer generic advice. Dinaveda analyzes your daily physiological state and generates adaptive routines based on Dosha balance, digestion strength, and stress load. Every recommendation evolves with you.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-3xl font-black mb-2 tracking-tighter flex items-center gap-2">1:1 <Zap className="w-5 h-5 text-gold" /></div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200/50 leading-relaxed">Biological Tuning</p>
                                </div>
                                <div>
                                    <div className="text-3xl font-black mb-2 tracking-tighter flex items-center gap-2">∞ <Database className="w-5 h-5 text-emerald-400" /></div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200/50 leading-relaxed">Data Sovereignty</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Trust Signals Section */}
                    <section className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Privacy First", desc: "Your health data is encrypted end-to-end and never sold to third parties.", icon: ShieldCheck },
                            { title: "Clinical Wisdom", desc: "Protocols are anchored in physician-led Ayurvedic medical research.", icon: Leaf },
                            { title: "Health Platform", desc: "Providing wellness guidance for prevention — not medical diagnosis.", icon: Heart }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 flex flex-col items-center text-center space-y-4">
                                <item.icon className="w-5 h-5 text-forest/40" />
                                <h5 className="font-black text-forest uppercase tracking-widest text-[10px]">{item.title}</h5>
                                <p className="text-xs text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </section>

                    {/* Final CTA */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={itemVariants}
                        className="text-center py-10"
                    >
                        <Heart className="w-12 h-12 text-rose-400 mx-auto mb-8 animate-pulse shadow-rose-200" />
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Physiology is Wellness</h4>
                        <Link href="/welcome" className="inline-flex items-center gap-3 bg-forest text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-forest/20 hover:scale-[1.02] active:scale-95 transition-all">
                            Discover Your Ayurvedic Blueprint
                        </Link>
                    </motion.section>
                </div>
            </main>
        </div>
    );
}
