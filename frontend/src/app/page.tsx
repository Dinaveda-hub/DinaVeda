"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, BrainCircuit, CheckCircle2, ChevronDown } from "lucide-react";
import CircadianPreview from "@/components/CircadianPreview";
import SampleInsightCard from "@/components/SampleInsightCard";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  { q: "Is this medical advice?", a: "No. Dinaveda is an educational wellness platform designed to align your daily lifestyle with natural rhythms. It is not intended to diagnose, treat, or cure any medical conditions." },
  { q: "How long does the assessment take?", a: "The initial Prakriti assessment takes approximately 2 minutes. It contains 21 questions about your innate traits and physiological patterns." },
  { q: "Is Dinaveda free?", a: "Creating your health profile and viewing your baseline constitution is completely free. We offer premium modules for ongoing daily protocols and adaptive guidance." },
  { q: "How is my data protected?", a: "We employ end-to-end encryption and strict privacy protocols. Your physiological data is never sold to third parties and is used entirely to power your personal insights." },
];

export default function LandingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-40 -mt-40 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-40 -mb-40 blur-3xl" />
            
            {/* 1. Hero Section */}
            <section className="pt-24 pb-20 md:pt-32 md:pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                <div className="flex-1 space-y-8 z-10 w-full text-center lg:text-left">
                    <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-forest tracking-tighter leading-[0.9] text-balance">
                        Discover Your Ayurvedic Body Type.
                    </h1>
                    <p className="text-base md:text-lg font-bold text-slate-600 max-w-lg leading-relaxed mx-auto lg:mx-0 uppercase tracking-wide">
                        Dinaveda analyzes your lifestyle rhythms and generates a personalized daily wellness routine based on Ayurveda.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <Link href="/login" className="group relative px-8 py-5 w-full sm:w-auto justify-center rounded-3xl bg-forest text-white flex items-center gap-3 overflow-hidden shadow-xl shadow-forest/20 transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95">
                            <span className="relative z-10 font-black text-xs md:text-sm uppercase tracking-widest">Start Free Health Assessment</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mx-auto lg:mx-0">
                        Takes 2 minutes • Free
                    </p>
                </div>
                
                <div className="flex-1 w-full relative z-10 flex flex-col sm:flex-row lg:flex-col gap-6 items-center">
                    <CircadianPreview />
                    <SampleInsightCard />
                </div>
            </section>

            {/* 2. Instant Value */}
            <section className="py-20 px-6 bg-white border-y border-slate-100 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left p-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-forest flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-3 tracking-tight">Know Your Body Type</h3>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed">Discover your unique Dosha profile and understand your innate physiological strengths.</p>
                    </div>
                    <div className="text-center md:text-left p-6">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-gold flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-3 tracking-tight">Track Daily Rhythms</h3>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed">Monitor your energy, digestion, and sleep through our advanced analytical engine.</p>
                    </div>
                    <div className="text-center md:text-left p-6">
                        <div className="w-14 h-14 rounded-2xl bg-forest/5 text-forest flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-3 tracking-tight">Personalized Rituals</h3>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed">Receive time-based protocols mapped precisely to your Ayurvedic constitution.</p>
                    </div>
                </div>
            </section>

            {/* 3. Problem Awareness */}
            <section className="py-24 px-6 relative z-10 max-w-5xl mx-auto text-center">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 text-center">The Wellness Paradox</h2>
                <h3 className="text-4xl md:text-5xl font-black text-forest tracking-tighter mb-12">Why Most Wellness Advice Fails</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="text-xs font-black text-gold uppercase tracking-widest mb-3">Flaw 01</div>
                        <p className="font-bold text-slate-600">Everyone receives the exact same generalized advice.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="text-xs font-black text-gold uppercase tracking-widest mb-3">Flaw 02</div>
                        <p className="font-bold text-slate-600">Your body has a unique, permanent constitution.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="text-xs font-black text-gold uppercase tracking-widest mb-3">Flaw 03</div>
                        <p className="font-bold text-slate-600">Small daily habits influence you differently than others.</p>
                    </div>
                </div>

                <div className="bg-forest text-white p-10 rounded-[2.5rem] shadow-premium relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[80px] opacity-20 -mr-20 -mt-20 pointer-events-none" />
                     <div className="relative z-10 md:max-w-xl">
                        <p className="text-xl font-black text-emerald-100 tracking-tighter sm:text-2xl leading-snug">
                            Dinaveda analyzes these subtle patterns to guide your daily routine with microscopic precision.
                        </p>
                     </div>
                     <Link href="/login" className="bg-white text-forest px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all text-center relative z-10 shrink-0">
                         Get Your Routine
                     </Link>
                </div>
            </section>

            {/* 4. How Dinaveda Works */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-100 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-forest tracking-tighter">How It Works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-slate-200 z-0" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-2xl font-black text-forest shadow-lg mb-6">1</div>
                            <h4 className="text-xl font-black text-forest mb-3">Take a Short Assessment</h4>
                            <p className="text-sm font-bold text-slate-500 max-w-[240px]">Answer 21 targeted physiological questions in under 2 minutes.</p>
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-2xl font-black text-forest shadow-lg mb-6">2</div>
                            <h4 className="text-xl font-black text-forest mb-3">Dinaveda Maps Your Profile</h4>
                            <p className="text-sm font-bold text-slate-500 max-w-[240px]">Our engine identifies your Prakriti and current imbalances.</p>
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-forest border-4 border-slate-50 flex items-center justify-center text-2xl font-black text-white shadow-lg mb-6">3</div>
                            <h4 className="text-xl font-black text-forest mb-3">Receive Your Protocol</h4>
                            <p className="text-sm font-bold text-slate-500 max-w-[240px]">Access your daily schedule of personalized circadian rituals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Trust Layer */}
            <section className="py-16 px-6 bg-forest text-white relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
                    <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-8 h-8 text-gold" />
                        <div className="text-left">
                            <h4 className="font-black tracking-widest uppercase text-sm text-emerald-100">Built by Experts</h4>
                            <p className="text-xs font-bold text-emerald-300">Authored by Ayurvedic Doctors</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-8 h-8 text-gold" />
                        <div className="text-left">
                            <h4 className="font-black tracking-widest uppercase text-sm text-emerald-100">Evidence-Based</h4>
                            <p className="text-xs font-bold text-emerald-300">Science + AI physiology engine</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-8 h-8 text-gold" />
                        <div className="text-left">
                            <h4 className="font-black tracking-widest uppercase text-sm text-emerald-100">Deep Tradition</h4>
                            <p className="text-xs font-bold text-emerald-300">Rooted in 5000 years of science</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Lead Magnet */}
            <section className="py-24 bg-[#F8FAF9] px-6 relative z-10">
                 <div className="max-w-3xl mx-auto text-center bg-white p-12 md:p-16 rounded-[3rem] border border-slate-100 shadow-premium relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] pointer-events-none" />
                    
                    <h2 className="text-xs font-black text-gold uppercase tracking-[0.3em] mb-4">Free Ayurvedic Rhythm Guide</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-forest tracking-tighter mb-6 relative z-10">
                        Unlock 7 Habits That Stabilize Energy, Digestion, And Sleep.
                    </h3>
                    <p className="text-slate-500 font-bold mb-10 max-w-lg mx-auto relative z-10">
                        Learn how identifying and aligning with your natural constitution can resolve fatigue and mental fog.
                    </p>
                    <Link
                        href="/login"
                        className="inline-block bg-gold text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-105 active:scale-95 transition-all relative z-10"
                    >
                        Get Free Guide
                    </Link>
                </div>
            </section>

            {/* 7. Primary Conversion CTA */}
            <section className="py-24 px-6 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-black text-forest tracking-tighter mb-6 relative z-10">
                        Start Your Free Health Assessment
                    </h2>
                    <p className="text-lg font-bold text-slate-500 mb-10 max-w-xl mx-auto relative z-10">
                        Understand your natural constitution and receive a daily personalized routine.
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-3 bg-forest text-white px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-forest/30 hover:-translate-y-1 active:scale-95 transition-all hover:bg-forest/90 relative z-10"
                    >
                        Create Free Account <ArrowRight className="w-5 h-5" />
                    </Link>
                    <p className="text-xs font-bold text-slate-400 mt-6 uppercase tracking-widest relative z-10">
                        No credit card required
                    </p>
                </div>
            </section>

            {/* 8. FAQ */}
            <section className="py-24 px-6 bg-white border-y border-slate-100 relative z-10">
                <div className="max-w-3xl mx-auto">
                     <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
                     <div className="space-y-4">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="border border-slate-100 rounded-3xl overflow-hidden hover:border-forest/20 transition-all bg-slate-50/50">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <h4 className="font-black text-forest">{faq.q}</h4>
                                    <ChevronDown className={`w-5 h-5 text-forest/50 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="text-sm font-bold text-slate-600 leading-relaxed">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                     </div>
                </div>
            </section>

            {/* 9. Final CTA & Footer */}
            <section className="pt-24 pb-0 bg-forest text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400/20 blur-[100px] rounded-full pointer-events-none -mr-40 -mt-40" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 pb-24">
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
                        Your Body Has Its Own Rhythm. <br/> Discover It.
                    </h2>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-3 bg-white text-forest px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        Start Free Assessment <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <Footer />
            </section>
        </div>
    );
}

