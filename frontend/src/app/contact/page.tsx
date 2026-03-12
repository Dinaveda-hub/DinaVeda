"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Globe, Sparkles, ArrowLeft, Heart, HelpCircle, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAF9] selection:bg-forest/20 selection:text-forest overflow-x-hidden text-slate-800">
            {/* Ambient Background */}
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-forest/5 rounded-full -mr-40 -mb-40 blur-[120px] pointer-events-none" />

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

            <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10 text-center">
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-16">
                    <motion.div variants={itemVariants} className="space-y-6">
                        <Heart className="w-10 h-10 text-rose-400 mx-auto mb-6 animate-pulse" />
                        <h1 className="text-5xl md:text-8xl font-black text-forest tracking-tighter leading-none">Get in Touch</h1>
                        <p className="text-lg md:text-xl font-bold text-slate-600 max-w-lg mx-auto leading-relaxed pt-2">
                            Need help or have a question? Our team is here to support your physiological journey.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-6">
                        {/* Support Card */}
                        <div className="glass p-10 rounded-[3rem] border border-white shadow-premium group hover:border-forest/30 transition-all duration-500">
                            <div className="w-16 h-16 bg-forest/5 text-forest rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-forest mb-4">Direct Support</h3>
                            <p className="text-slate-500 font-medium text-sm mb-10 leading-relaxed">
                                Our support team typically responds to inquiries within 24–48 hours. We are here to help with access, data, or technical issues.
                            </p>
                            <a href="mailto:support@dinaveda.com" className="inline-flex items-center gap-3 bg-forest text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-forest/20 hover:scale-[1.02] active:scale-95 transition-all">
                                support@dinaveda.com
                            </a>
                        </div>

                        {/* FAQ Card */}
                        <Link href="/faq" className="glass p-10 rounded-[3rem] border border-white shadow-premium group hover:border-gold/30 transition-all duration-500">
                            <div className="w-16 h-16 bg-gold/5 text-gold rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                <HelpCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-forest mb-4">Quick Help</h3>
                            <p className="text-slate-500 font-medium text-sm mb-10 leading-relaxed">
                                Frequently asked questions about login, magic links, subscriptions, and health insights.
                            </p>
                            <div className="inline-flex items-center gap-3 text-gold font-black uppercase text-[10px] tracking-[0.3em] bg-gold/5 px-6 py-4 rounded-full border border-gold/10 group-hover:bg-gold group-hover:text-white transition-all">
                                Browse FAQ
                            </div>
                        </Link>
                    </motion.div>

                    {/* Secondary Tiers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <motion.div variants={itemVariants} className="text-left glass p-8 rounded-[2.5rem] border border-white/60">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-forest">Partnerships</h4>
                            </div>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                                For brand integrations or strategic health partnerships.
                            </p>
                            <a href="mailto:support@dinaveda.com" className="font-black text-forest hover:opacity-70 transition-opacity tracking-widest text-[10px] uppercase">
                                support@dinaveda.com
                            </a>
                        </motion.div>

                        <motion.div variants={itemVariants} className="text-left glass p-8 rounded-[2.5rem] border border-white/60">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gold/5 flex items-center justify-center text-gold">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-forest">Research</h4>
                            </div>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                                For Ayurvedic research labs or data science inquiries.
                            </p>
                            <a href="mailto:support@dinaveda.com" className="font-black text-forest hover:opacity-70 transition-opacity tracking-widest text-[10px] uppercase">
                                support@dinaveda.com
                            </a>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="pt-20 text-[10px] font-medium text-slate-600 max-w-md mx-auto leading-relaxed">
                        Dinaveda provides wellness guidance and educational insights. 
                        It does not replace professional medical advice.
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
