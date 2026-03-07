"use client";

import { motion } from "framer-motion";
import { FileText, AlertCircle, Scale, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
    const itemVariants = {
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
            <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full -ml-40 -mt-40 blur-[120px] pointer-events-none" />

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

            <main className="max-w-3xl mx-auto px-6 pt-24 pb-32 relative z-10">
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }} className="space-y-12">
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black text-forest tracking-tighter leading-none">Terms of Harmony</h1>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </motion.div>

                    {/* CRITICAL MEDICAL DISCLAIMER */}
                    <motion.div variants={itemVariants} className="p-10 bg-orange-50 rounded-[2.5rem] border-2 border-orange-200/50 shadow-sm space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 blur-3xl opacity-20 -mr-16 -mt-16" />
                        <div className="flex items-center gap-3 text-orange-600 mb-2">
                            <AlertCircle className="w-6 h-6" />
                            <h2 className="text-sm font-black uppercase tracking-[0.2em]">Medical Disclaimer (Critical)</h2>
                        </div>
                        <p className="text-sm font-bold text-orange-900 leading-relaxed uppercase tracking-tighter">
                            Dinaveda is an educational wellness and lifestyle tool. It is NOT a substitute for professional medical advice, clinical diagnosis, or treatment.
                        </p>
                        <p className="text-xs font-bold text-orange-800/80 leading-relaxed uppercase tracking-wide">
                            The AI-generated insights, Prakriti assessments, and daily rituals provided are for informational purposes only. Never disregard professional medical advice or delay seeking it because of something you have read on Dinaveda. Always consult with a qualified healthcare provider before making significant behavioral lifestyle adjustments.
                        </p>
                    </motion.div>

                    <div className="space-y-16 pt-10">
                        <motion.section variants={itemVariants} className="space-y-6">
                            <h2 className="text-2xl font-black text-forest tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-forest/20 rounded-full" /> 1. Acceptance of Terms
                            </h2>
                            <p className="font-bold text-slate-600 leading-relaxed uppercase tracking-tight text-sm">
                                By accessing or using the Service, you agree to be bound by these Terms of Harmony. If you disagree with any part of these terms, you should gracefully exit the sanctuary and cease all usage.
                            </p>
                        </motion.section>

                        <motion.section variants={itemVariants} className="space-y-6">
                            <h2 className="text-2xl font-black text-forest tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-forest/20 rounded-full" /> 2. User Guardianship
                            </h2>
                            <p className="font-bold text-slate-600 leading-relaxed uppercase tracking-tight text-sm">
                                You are the guardian of your account credentials. You understand that providing inaccurate biological data will result in sub-optimal rhythmic guidance from the neural core.
                            </p>
                        </motion.section>

                        <motion.section variants={itemVariants} className="space-y-6">
                            <h2 className="text-2xl font-black text-forest tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-forest/20 rounded-full" /> 3. Algorithmic Integrity
                            </h2>
                            <p className="font-bold text-slate-600 leading-relaxed uppercase tracking-tight text-sm">
                                The Service's designs, proprietary algorithms, and brand essence are protected under intellectual property laws. Unauthorized replication of our neural architecture is strictly prohibited.
                            </p>
                        </motion.section>
                    </div>

                    <motion.section variants={itemVariants} className="pt-20 border-t border-slate-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-forest/5 flex items-center justify-center text-forest mb-6">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-4">Legal Clarity</h3>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-8">Synchronize with our legal stewards</p>
                        <a href="mailto:support@dinaveda.com" className="font-black text-forest hover:opacity-70 transition-opacity tracking-widest text-sm uppercase">support@dinaveda.com</a>
                    </motion.section>
                </motion.div>
            </main>

            <footer className="py-20 border-t border-slate-100 text-center">
                <Heart className="w-6 h-6 text-rose-300 mx-auto mb-6" />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">© {new Date().getFullYear()} Dinaveda Neural Systems</p>
            </footer>
        </div>
    );
}
