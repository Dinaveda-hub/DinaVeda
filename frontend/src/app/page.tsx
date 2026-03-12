"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, BrainCircuit, CheckCircle2, ChevronDown } from "lucide-react";
import PhysiologyPreview from "@/components/PhysiologyPreview";
import DailyInsightTimeline from "@/components/DailyInsightTimeline";
import SampleInsightCard from "@/components/SampleInsightCard";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

const FAQS = [
  { q: "Is this medical advice?", a: "No. Dinaveda is an educational wellness platform designed to align your daily lifestyle with natural rhythms. It is not intended to diagnose, treat, or cure any medical conditions." },
  { q: "How long does the assessment take?", a: "The initial Prakriti assessment takes approximately 2 minutes. It contains 21 questions about your innate traits and physiological patterns." },
  { q: "Is Dinaveda free?", a: "Creating your health profile and viewing your baseline constitution is completely free. We offer premium modules for ongoing daily protocols and adaptive guidance." },
  { q: "How is my data protected?", a: "We employ end-to-end encryption and strict privacy protocols. Your physiological data is never sold to third parties and is used entirely to power your personal insights." },
];

export default function LandingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <LazyMotion features={domAnimation}>
            <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans selection:bg-forest/20 selection:text-forest" style={{ transform: "translateZ(0)" }}>
                {/* Ambient background glows */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-40 -mt-40 blur-2xl" style={{ willChange: "transform" }} />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-40 -mb-40 blur-2xl" style={{ willChange: "transform" }} />
                
                {/* 1. Redesigned Hero Section */}
                <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center lg:text-left lg:flex-row gap-12 relative z-10">
                  <div className="absolute -z-10 w-[300px] h-[300px] bg-emerald-300/20 blur-[60px] rounded-full hidden md:block right-10" style={{ willChange: "transform" }} />

              {/* LEFT SIDE */}
              <div className="flex-1 space-y-8">
                {/* Eyebrow */}
                <p className="text-xs font-black text-forest/60 uppercase tracking-[0.3em]">
                  AI-Powered Ayurvedic Health
                </p>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black text-forest tracking-tight leading-[1.05]">
                  Discover Your  
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
                    Ayurvedic Body Type
                  </span>
                  and Your Ideal Daily Rhythm
                </h1>

                {/* Subtext */}
                <p className="text-base md:text-lg text-slate-600 max-w-lg font-medium mx-auto lg:mx-0">
                  Dinaveda analyzes your physiology, circadian rhythms, and lifestyle signals to generate a personalized Ayurvedic routine for optimal energy, digestion, and sleep.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center gap-3 bg-forest text-white px-10 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-forest/20 transition-all w-full sm:w-auto hover:bg-forest/90"
                    >
                      Start Free Assessment
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>

                {/* Micro trust */}
                <div className="space-y-2">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      21-question assessment • Takes ~2 minutes • Free
                    </p>
                    <p className="text-xs text-emerald-600 font-bold">
                      Trusted by early adopters exploring Ayurvedic health optimization
                    </p>
                </div>
              </div>

              {/* RIGHT SIDE VISUAL */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="flex-1 w-full max-w-lg"
              >
                <div className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-premium p-6 md:p-8">
                  {/* Animated Pulse Card */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase font-black text-slate-400 tracking-widest">
                        Example Insight
                      </p>
                      <Activity className="w-4 h-4 text-forest" />
                    </div>

                    <div>
                      <p className="text-lg font-black text-forest">
                        Pitta-Dominant Constitution
                      </p>
                      <p className="text-sm text-slate-500 font-medium mt-2">
                        Your digestive fire is strong today. Favor cooling foods and reduce stimulants.
                      </p>
                    </div>

                    {/* Example score */}
                    <div className="bg-[#F8FAF9] p-4 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-2">
                        Ojas Vitality Score
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-forest">82</span>
                        <span className="text-xs font-black text-emerald-600 uppercase">Optimal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* 1.5 Interactive Physiology Preview */}
            <section className="px-6 pb-16 relative z-10 w-full">
                <PhysiologyPreview />
            </section>

            {/* 2. Instant Value */}
            <section id="features" className="py-16 md:py-24 px-6 bg-white border-y border-slate-100 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="text-center md:text-left p-6 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-forest flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-3 tracking-tight">Know Your Body Type</h3>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed">Discover your unique Dosha profile and understand your innate physiological strengths.</p>
                    </div>
                    <div className="text-center md:text-left p-6 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-gold flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-3 tracking-tight">Track Daily Rhythms</h3>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed">Monitor your energy, digestion, and sleep through our advanced analytical engine.</p>
                    </div>
                    <div className="text-center md:text-left p-6 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-forest/5 text-forest flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-3 tracking-tight">Personalized Rituals</h3>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed">Receive time-based protocols mapped precisely to your Ayurvedic constitution.</p>
                    </div>
                </div>
            </section>

            {/* 3. Problem Awareness (Vertical Stacked Timeline) */}
            <section className="py-16 md:py-24 px-6 relative z-10 max-w-3xl mx-auto">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 text-center">The Wellness Paradox</h2>
                <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-12 text-center">Why Most Wellness Advice Fails</h3>
                
                <div className="space-y-8 mb-16 relative">
                    <div className="border-l-4 border-emerald-500 pl-6 space-y-2 py-2">
                        <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">01</div>
                        <h4 className="text-lg font-black text-forest">Generic Advice</h4>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed">Most health trends prescribe the exact same routines to everyone, ignoring profound biological differences.</p>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-6 space-y-2 py-2">
                        <div className="text-xs font-black text-amber-600 uppercase tracking-widest">02</div>
                        <h4 className="text-lg font-black text-forest">Unique Body Type</h4>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed">Your body has a unique, permanent composition of elements (Prakriti) that governs how you digest and metabolize stress.</p>
                    </div>
                    <div className="border-l-4 border-indigo-500 pl-6 space-y-2 py-2">
                        <div className="text-xs font-black text-indigo-600 uppercase tracking-widest">03</div>
                        <h4 className="text-lg font-black text-forest">Daily Habits Matter</h4>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed">Without aligning microscopic choices—like when to eat and when to sleep—with your unique rhythm, even "healthy" habits cause fatigue.</p>
                    </div>
                </div>

                <div className="bg-forest text-white p-8 md:p-10 rounded-[2.5rem] shadow-premium relative overflow-hidden flex flex-col items-center text-center gap-6">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none" />
                     <p className="text-lg md:text-2xl font-black text-emerald-100 tracking-tighter leading-snug relative z-10 max-w-lg">
                        Dinaveda analyzes these subtle patterns to guide your daily routine with microscopic precision.
                     </p>
                     <Link href="/login" className="bg-white text-forest px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all relative z-10 w-full sm:w-auto">
                         Get Your Routine
                     </Link>
                </div>
            </section>

            {/* 4. How Dinaveda Works */}
            <section id="how-it-works" className="py-16 md:py-24 px-6 bg-white border-t border-slate-100 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter">How It Works</h2>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-slate-100 z-0" />

                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-2xl font-black text-forest shadow-lg mb-6 group-hover:scale-105 transition-transform">1</div>
                            <h4 className="text-lg font-black text-forest mb-3">Take a Short Assessment</h4>
                            <p className="text-sm font-medium text-slate-500 max-w-[240px] leading-relaxed">Answer 21 targeted physiological questions in under 2 minutes.</p>
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-2xl font-black text-forest shadow-lg mb-6 group-hover:scale-105 transition-transform">2</div>
                            <h4 className="text-lg font-black text-forest mb-3">Dinaveda Maps Your Profile</h4>
                            <p className="text-sm font-medium text-slate-500 max-w-[240px] leading-relaxed">Our engine identifies your Prakriti and current imbalances.</p>
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-forest border-4 border-slate-50 flex items-center justify-center text-2xl font-black text-white shadow-lg mb-6 group-hover:scale-105 transition-transform">3</div>
                            <h4 className="text-lg font-black text-forest mb-3">Receive Your Protocol</h4>
                            <p className="text-sm font-medium text-slate-500 max-w-[240px] leading-relaxed">Access your daily schedule of personalized circadian rituals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4.5 Daily Insight Timeline */}
            <section className="pb-16 md:pb-24 px-6 bg-white relative z-10">
                <DailyInsightTimeline />
            </section>

            {/* 5. Trust Layer */}
            <section className="py-16 md:py-20 px-6 bg-forest text-white relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-10 md:gap-16">
                    <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-8 h-8 text-gold shrink-0" />
                        <div className="text-left">
                            <h4 className="font-black tracking-widest uppercase text-sm text-emerald-100 mb-1">Built by Experts</h4>
                            <p className="text-xs font-bold text-emerald-300">Authored by Ayurvedic Doctors</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-8 h-8 text-gold shrink-0" />
                        <div className="text-left">
                            <h4 className="font-black tracking-widest uppercase text-sm text-emerald-100 mb-1">Evidence-Based</h4>
                            <p className="text-xs font-bold text-emerald-300">Science + AI physiology engine</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-8 h-8 text-gold shrink-0" />
                        <div className="text-left">
                            <h4 className="font-black tracking-widest uppercase text-sm text-emerald-100 mb-1">Deep Tradition</h4>
                            <p className="text-xs font-bold text-emerald-300">Rooted in 5000 years of science</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Lead Magnet */}
            <section className="py-16 md:py-24 bg-[#F8FAF9] px-6 relative z-10">
                 <div className="max-w-3xl mx-auto text-center bg-white p-8 md:p-16 rounded-[3rem] border border-slate-100 shadow-premium relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <h2 className="text-xs font-black text-gold uppercase tracking-[0.3em] mb-4">Free Ayurvedic Rhythm Guide</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-6 relative z-10 leading-tight">
                        Unlock 7 Habits That Stabilize Energy, Digestion, And Sleep.
                    </h3>
                    <p className="text-sm md:text-base text-slate-500 font-bold mb-10 max-w-lg mx-auto relative z-10">
                        Learn how identifying and aligning with your natural constitution can resolve fatigue and mental fog.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/login"
                            className="inline-block bg-gold text-white px-10 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-gold/20 transition-all relative z-10 w-full sm:w-auto hover:bg-yellow-500"
                        >
                            Get Free Guide
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* 7. Adaptive Intelligence */}
            <section className="py-16 md:py-24 bg-forest text-white text-center relative z-10">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-tight">
                        Dinaveda Learns Your Body
                    </h2>
                    <p className="max-w-xl mx-auto text-emerald-100 font-medium mb-12 text-sm md:text-base">
                        Every daily log refines your physiological model.  
                        Your protocols evolve as your body changes.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-emerald-900/40 p-6 rounded-3xl border border-emerald-800/50">
                            <h4 className="text-lg font-black mb-2 tracking-wide">Day 1</h4>
                            <p className="text-sm text-emerald-200">
                                Baseline constitution mapped.
                            </p>
                        </div>
                        <div className="bg-emerald-900/40 p-6 rounded-3xl border border-emerald-800/50">
                            <h4 className="text-lg font-black mb-2 tracking-wide">Day 7</h4>
                            <p className="text-sm text-emerald-200">
                                Patterns detected in sleep and digestion.
                            </p>
                        </div>
                        <div className="bg-emerald-900/40 p-6 rounded-3xl border border-emerald-800/50">
                            <h4 className="text-lg font-black mb-2 tracking-wide">Day 30</h4>
                            <p className="text-sm text-emerald-200">
                                Fully personalized lifestyle protocol.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. FAQ */}
            <section className="py-16 md:py-24 px-6 bg-white border-y border-slate-100 relative z-10">
                <div className="max-w-3xl mx-auto">
                     <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-10 text-center">Frequently Asked Questions</h2>
                     <div className="space-y-4">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="border border-slate-100 rounded-3xl overflow-hidden hover:border-forest/20 transition-all bg-slate-50/50">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <h4 className="font-black text-forest pr-4">{faq.q}</h4>
                                    <ChevronDown className={`w-5 h-5 shrink-0 text-forest/50 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, scaleY: 0.95 }}
                                            animate={{ opacity: 1, scaleY: 1 }}
                                            exit={{ opacity: 0, scaleY: 0.95 }}
                                            transition={{ duration: 0.18 }}
                                            className="px-6 pb-6 origin-top"
                                        >
                                            <p className="text-sm font-medium text-slate-600 leading-relaxed">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                     </div>
                </div>
            </section>

            {/* 9. Final CTA & Footer */}
            <section className="pt-20 md:pt-24 pb-0 bg-forest text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-400/20 blur-[60px] rounded-full pointer-events-none -mr-40 -mt-40" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 pb-20 md:pb-24">
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.05]">
                        Your Body Has Its Own Rhythm. <br className="hidden md:block"/> Discover It.
                    </h2>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center gap-3 bg-white text-forest px-10 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-black/20 transition-all w-full sm:w-auto"
                        >
                            Start Free Assessment <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
            
            <Footer />
        </div>
        </LazyMotion>
    );
}

