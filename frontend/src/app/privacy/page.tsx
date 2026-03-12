"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Lock, ArrowLeft, Info, Server, Globe, UserCheck, Clock, ShieldAlert, RefreshCcw, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Metadata cannot be in client components, but included here for move to layout/meta file.
/*
export const metadata = {
 title: "Privacy Policy – Dinaveda",
 description: "Learn how Dinaveda collects, uses, and protects your personal wellness data."
}
*/

export default function PrivacyPage() {
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
            title: "1. Introduction",
            icon: Info,
            content: "Dinaveda is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our Ayurvedic wellness platform. By using Dinaveda, you agree to the practices described in this policy."
        },
        {
            title: "2. Information We Collect",
            icon: UserCheck,
            content: "We collect information necessary to provide personalized wellness guidance, including: Account Information (name, email), Wellness Signals (sleep, digestion, mood, activity logged by you), Device Data (IP address, browser type), and Subscription Data (processed via third-party secure providers)."
        },
        {
            title: "3. How We Use Your Data",
            icon: RefreshCcw,
            content: "Your data is used solely to: generate personalized Ayurvedic protocols, improve engine accuracy, maintain account security, and provide customer support. We do not sell your personal data to advertisers or third parties."
        },
        {
            title: "4. Data Storage and Security",
            icon: Lock,
            content: "User data is stored securely using Supabase infrastructure. We implement industry-standard encryption (SSL/TLS) for data in transit and rest. Access is restricted to authorized system components required for processing your health insights."
        },
        {
            title: "5. Third-Party Services",
            icon: Globe,
            content: "We rely on trusted partners to deliver our services: Supabase (Auth & Database), Razorpay (Payment Processing), and specialized AI providers for signal synthesis. These providers process limited data necessary for their specific functions under strict confidentiality."
        },
        {
            title: "6. Cookies and Tracking",
            icon: ShieldCheck,
            content: "We use secure session tokens and essential functional cookies to maintain your login state and preferences. These are necessary for the platform's operation and security."
        },
        {
            title: "7. User Rights & GDPR",
            icon: UserCheck,
            content: "You have the right to access your collected data, request corrections, or request complete deletion of your account and all associated biological logs at any time via your Profile settings."
        },
        {
            title: "8. Data Retention",
            icon: Clock,
            content: "We retain your information for as long as your account is active or as needed to provide you with services. If you delete your account, your personal data and wellness logs are permanently removed from our active databases."
        },
        {
            title: "9. Children's Privacy",
            icon: ShieldAlert,
            content: "Dinaveda is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children."
        },
        {
            title: "10. Neural Processing and AI",
            icon: Server,
            content: "Our AI assistants process de-identified data packets to generate guidance. We do not use your personal health logs to train general third-party foundation models."
        },
        {
            title: "11. Policy Updates",
            icon: RefreshCcw,
            content: "We may update this policy periodically to reflect changes in our practices or regulatory requirements. Updates will be indicated by the 'Last Updated' date at the top of this page."
        },
        {
            title: "12. Contact Information",
            icon: Mail,
            content: "If you have questions about this Privacy Policy or your data, please contact our privacy steward at support@dinaveda.com."
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAF9] selection:bg-forest/20 selection:text-forest overflow-x-hidden text-slate-800 font-sans">
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
                        <h1 className="text-5xl md:text-7xl font-black text-forest tracking-tighter leading-none">Privacy Policy</h1>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Last Updated: March 2026</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-8 glass rounded-[2.5rem] border border-white shadow-sm flex items-start gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <p className="text-base font-medium text-slate-600 leading-relaxed italic">
                            At Dinaveda, we respect the integrity of your personal wellness data. We implement strict encryption and transparent processing to ensure your health journey remains private and secure.
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
                                <p className="font-medium text-slate-600 leading-relaxed text-base md:text-lg">
                                    {section.content}
                                </p>
                            </motion.section>
                        ))}
                    </div>

                    <motion.section variants={itemVariants} className="pt-20 border-t border-slate-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-3xl bg-forest/5 flex items-center justify-center text-forest mb-6">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-forest mb-4 tracking-tight">Data Integrity Questions?</h3>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-8">Direct Access to Our Privacy Steward</p>
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
