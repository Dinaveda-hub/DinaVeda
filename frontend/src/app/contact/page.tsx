"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Globe, Sparkles, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

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
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }} className="space-y-12">
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h1 className="text-5xl md:text-8xl font-black text-forest tracking-tighter leading-none">Reach the Core</h1>
                        <p className="text-lg md:text-xl font-bold text-slate-600 max-w-lg mx-auto leading-relaxed uppercase tracking-wide pt-4">
                            Experiencing a neural drift? Our stewards are ready to help you find your rhythmic baseline.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-10">
                        <div className="glass p-10 rounded-[3rem] border border-white shadow-premium group hover:border-forest/30 transition-all duration-500">
                            <div className="w-16 h-16 bg-forest/5 text-forest rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-forest mb-4">Email Sanctuary</h3>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-10 leading-relaxed">
                                Our stewards typically achieve synchronization with your inquiry within 24 to 48 dimensional hours.
                            </p>
                            <a href="mailto:support@dinaveda.com" className="inline-flex items-center gap-3 bg-forest text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-forest/20 hover:scale-[1.02] active:scale-95 transition-all">
                                support@dinaveda.com
                            </a>
                        </div>

                        <div className="glass p-10 rounded-[3rem] border border-white shadow-premium group hover:border-gold/30 transition-all duration-500">
                            <div className="w-16 h-16 bg-gold/5 text-gold rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-forest mb-4">Remote Sync</h3>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-10 leading-relaxed">
                                We operate as a borderless entity, merging ancient scholars from the East with modern technologists from the West.
                            </p>
                            <div className="inline-flex items-center gap-3 text-slate-400 font-black uppercase text-xs tracking-[0.3em] bg-slate-50 px-6 py-4 rounded-full border border-slate-200">
                                Distributed Core
                            </div>
                        </div>
                    </motion.div>

                    <motion.section variants={itemVariants} className="pt-20">
                        <div className="glass p-12 rounded-[4rem] border border-white max-w-2xl mx-auto space-y-8">
                            <Sparkles className="w-8 h-8 text-gold/60 mx-auto" />
                            <h3 className="text-3xl font-black text-forest tracking-tighter">Collaborations</h3>
                            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest leading-relaxed">
                                Are you an Ayurvedic researcher or neural engine specialist? We are always looking to expand our rhythmic algorithms.
                            </p>
                            <a href="mailto:support@dinaveda.com" className="font-black text-forest hover:opacity-70 transition-opacity tracking-widest text-sm uppercase">stewardship@dinaveda.com</a>
                        </div>
                    </motion.section>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
