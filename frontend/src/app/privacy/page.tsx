"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
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
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px] pointer-events-none" />

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
                        <h1 className="text-5xl md:text-7xl font-black text-forest tracking-tighter leading-none">Privacy Sovereignty</h1>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-8 glass rounded-[2.5rem] border border-white shadow-sm flex items-start gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-forest flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed uppercase tracking-wide">
                            Your biological data is sacred. We treat your physiology logs, sleep patterns, and assessments with the highest level of neural encryption and privacy sovereignty.
                        </p>
                    </motion.div>

                    <div className="space-y-16 pt-10">
                        <motion.section variants={itemVariants} className="space-y-6">
                            <h2 className="text-2xl font-black text-forest tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-forest/20 rounded-full" /> 1. Data Collection
                            </h2>
                            <p className="font-bold text-slate-600 leading-relaxed uppercase tracking-tight text-sm">
                                We gather qualitative biological signals through your daily logs and assessments. This data—spanning dietary habits to rhythmic energy levels—is used exclusively to synthesize your personalized wellness path.
                            </p>
                        </motion.section>

                        <motion.section variants={itemVariants} className="space-y-6">
                            <h2 className="text-2xl font-black text-forest tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-forest/20 rounded-full" /> 2. Neural Processing
                            </h2>
                            <p className="font-bold text-slate-600 leading-relaxed uppercase tracking-tight text-sm">
                                All AI synthesis is handled via encrypted prompts. We strip personally identifiable contact information before state-vector processing. We do not use your personal health data to train external third-party models.
                            </p>
                        </motion.section>

                        <motion.section variants={itemVariants} className="space-y-6">
                            <h2 className="text-2xl font-black text-forest tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-forest/20 rounded-full" /> 3. Data Sovereignty
                            </h2>
                            <p className="font-bold text-slate-600 leading-relaxed uppercase tracking-tight text-sm">
                                You maintain 100% ownership. At any time, you can wipe your biological logs from our neural core through your settings dashboard. We do not sell or trade your identity.
                            </p>
                        </motion.section>
                    </div>

                    <motion.section variants={itemVariants} className="pt-20 border-t border-slate-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-forest/5 flex items-center justify-center text-forest mb-6">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-4">Questions regarding your data?</h3>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-8">Reach our security stewards</p>
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
