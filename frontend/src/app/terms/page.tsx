"use client";

import { motion, Variants } from "framer-motion";
import { AlertCircle, Scale, ArrowLeft, ShieldCheck, CreditCard, BrainCircuit, Users, BookOpen, AlertTriangle, XCircle, Gavel, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Metadata cannot be in client components, but included here for move to layout/meta file.
/*
export const metadata = {
  title: "Terms of Service – Dinaveda",
  description: "Terms governing the use of the Dinaveda wellness platform."
}
*/

export default function TermsPage() {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: ShieldCheck,
            content: "By accessing or using Dinaveda, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you should discontinue use of the service immediately."
        },
        {
            title: "2. Service Description",
            icon: BookOpen,
            content: "Dinaveda is a digital wellness platform providing insights based on Ayurvedic principles and user-provided lifestyle signals. Our goal is to support your health journey through personalized information and rhythmic patterns."
        },
        {
            title: "3. User Accounts",
            icon: Users,
            content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate, complete, and updated information. Inaccurate biological data may lead to inaccurate wellness guidance."
        },
        {
            title: "4. Subscriptions and Payments",
            icon: CreditCard,
            content: "Certain features require a paid subscription, processed securely via Razorpay. Subscriptions are billed according to your selected cycle. You may cancel at any time; access continues until the current billing period concludes."
        },
        {
            title: "5. AI Content Disclaimer",
            icon: BrainCircuit,
            content: "AI-generated routines and recommendations are informational tools designed to support wellness habits. These are generated via computational models and are not clinical, therapeutic, or diagnostic instructions."
        },
        {
            title: "6. User Responsibilities",
            icon: Scale,
            content: "You agree not to use the service for any unlawful purpose. You are solely responsible for actions taken using your account and for ensuring that your use of the service complies with local regulations."
        },
        {
            title: "7. Intellectual Property",
            icon: BookOpen,
            content: "The service, its original content, features, proprietary algorithms, and architectural designs are the exclusive property of Dinaveda and are protected by international copyright and intellectual property laws."
        },
        {
            title: "8. Limitation of Liability",
            icon: AlertTriangle,
            content: "Dinaveda, its directors, and employees shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service or any reliance on health-related information provided."
        },
        {
            title: "9. Termination",
            icon: XCircle,
            content: "We reserve the right to suspend or terminate your account without notice if we determine you have violated these terms or engaged in behavior that puts the platform or its users at risk."
        },
        {
            title: "10. Governing Law",
            icon: Gavel,
            content: "These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions."
        },
        {
            title: "11. Contact Information",
            icon: Mail,
            content: "For legal inquiries or clarifications regarding these terms, please reach out to our legal steward at support@dinaveda.com."
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAF9] selection:bg-forest/20 selection:text-forest overflow-x-hidden text-slate-800 font-sans">
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
                        <h1 className="text-5xl md:text-7xl font-black text-forest tracking-tighter leading-none">Terms of Service</h1>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Last Updated: March 2026</p>
                    </motion.div>

                    {/* CRITICAL MEDICAL DISCLAIMER */}
                    <motion.div variants={itemVariants} className="p-10 bg-orange-50 rounded-[2.5rem] border-2 border-orange-200/50 shadow-sm space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 blur-3xl opacity-20 -mr-16 -mt-16" />
                        <div className="flex items-center gap-3 text-orange-600 mb-2">
                            <AlertCircle className="w-6 h-6" />
                            <h2 className="text-sm font-black uppercase tracking-[0.2em]">Medical Disclaimer (Critical)</h2>
                        </div>
                        <p className="text-sm font-bold text-orange-900 leading-relaxed">
                            Dinaveda is an educational wellness tool. It is NOT a substitute for professional medical advice, clinical diagnosis, or treatment.
                        </p>
                        <p className="text-sm font-medium text-orange-800/80 leading-relaxed">
                            The AI-generated insights, Prakriti assessments, and daily rituals provided are for informational purposes only. Never disregard professional medical advice or delay seeking it because of something you have read on Dinaveda. If you have a medical emergency, you should discontinue use of the service and consult with a medical professional.
                        </p>
                    </motion.div>

                    <div className="space-y-16 pt-10">
                        {sections.map((section, idx) => (
                            <motion.section key={idx} variants={itemVariants} className="space-y-6">
                                <h2 className="text-xl md:text-2xl font-black text-forest tracking-tight flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-forest shrink-0 shadow-sm">
                                        <section.icon className="w-5 h-5" />
                                    </div>
                                    {section.title}
                                </h2>
                                <p className="font-medium text-slate-600 leading-relaxed text-sm md:text-base">
                                    {section.content}
                                </p>
                            </motion.section>
                        ))}
                    </div>

                    <motion.section variants={itemVariants} className="pt-20 border-t border-slate-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-3xl bg-forest/5 flex items-center justify-center text-forest mb-6">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-4 tracking-tight">Legal Clarity Questions?</h3>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-8">Direct Access to Our Legal Steward</p>
                        <a 
                            href="mailto:support@dinaveda.com" 
                            className="inline-flex items-center gap-3 bg-forest text-white px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-forest/20 hover:scale-[1.05] active:scale-95 transition-all"
                        >
                            <Mail className="w-4 h-4" /> support@dinaveda.com
                        </a>
                    </motion.section>
                </motion.div>
            </main>
        </div>
    );
}
