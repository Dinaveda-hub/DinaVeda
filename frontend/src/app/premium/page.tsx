"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles, Check, X, ShieldCheck, Zap, BrainCircuit,
    CloudSun, Activity, Flame, Moon, Utensils,
    ChevronRight, ArrowRight, Lock, HelpCircle,
    UserCircle, Heart, Wind
} from "lucide-react";
import Link from "next/link";
import { useSubscription } from "@/hooks/useSubscription";

export default function PremiumPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
    const [loading, setLoading] = useState(false);

    const { userId } = useSubscription();

    const handleUpgrade = async () => {
        if (loading || !userId) {
            if (!userId) alert("Please sign in to upgrade to Premium.");
            return;
        }
        setLoading(true);
        try {
            const billingBaseUrl = process.env.NEXT_PUBLIC_BILLING_API_URL || process.env.NEXT_PUBLIC_API_URL || "";
            const res = await fetch(`${billingBaseUrl}/api/billing/create-subscription`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, planType: billingCycle }),
            });

            if (!res.ok) throw new Error("Could not initialize subscription.");
            const subscription = await res.json();

            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            if (!razorpayKey) throw new Error("Payment gateway configuration missing.");

            const options = {
                key: razorpayKey,
                subscription_id: subscription.id,
                name: "Dinaveda Premium",
                description: "Full Ayurvedic Experience",
                handler: async function (response: any) {
                    setLoading(true);
                    try {
                        const verifyRes = await fetch(`${billingBaseUrl}/api/billing/verify-subscription`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response),
                        });
                        const verification = await verifyRes.json();
                        if (verification.success) window.location.href = "/profile?upgrade=success";
                        else throw new Error("Verification failed.");
                    } catch (err) {
                        alert("Verification failed. Please contact support.");
                    } finally {
                        setLoading(false);
                    }
                },
                modal: { ondismiss: () => setLoading(false) },
                theme: { color: "#2D5A43" },
                notes: { user_id: userId }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            console.error("Upgrade failed:", error);
            alert(error.message || "Something went wrong.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation / Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-forest rounded-xl flex items-center justify-center text-white">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="font-black text-slate-800 tracking-tighter">Dinaveda</span>
                </Link>
                <Link href="/" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
                    Back to App
                </Link>
            </nav>

            <main className="pt-24 pb-20">
                {/* 1. HERO SECTION */}
                <section className="px-6 md:px-10 py-16 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-forest/5 text-forest text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full inline-block mb-8"
                    >
                        Dinaveda Premium
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-800 tracking-tightest mb-6 leading-tight"
                    >
                        Unlock Personalized <span className="text-forest">Ayurvedic Guidance</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12"
                    >
                        Dinaveda analyzes your body’s daily balance and generates personalized routines for diet, sleep, movement, and mental clarity.
                    </motion.p>

                    {/* Visual indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                        <VisualMetric icon={<Heart className="w-6 h-6" />} color="bg-petal text-rose-500" label="Ojas Score" />
                        <VisualMetric icon={<Wind className="w-6 h-6" />} color="bg-air text-blue-500" label="Dosha Drift" />
                        <VisualMetric icon={<Flame className="w-6 h-6" />} color="bg-fire text-orange-500" label="Agni Status" />
                        <VisualMetric icon={<CloudSun className="w-6 h-6" />} color="bg-earth text-forest" label="Daily Dinacharya" />
                    </div>
                </section>

                {/* 2. PROBLEM FRAMING */}
                <section className="bg-slate-50 py-24 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-6">Your body changes every day.</h3>
                        <p className="text-lg md:text-xl font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Two people with the same energy level may need completely different corrections.
                            Dinaveda analyzes your current state and recommends the right practices for your body today.
                        </p>
                    </div>
                </section>

                {/* 3. PREMIUM BENEFITS */}
                <section className="py-24 px-6 max-w-5xl mx-auto">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-16 text-center">The Premium Ecosystem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <BenefitCard icon={<Utensils className="w-7 h-7" />} title="Nutriveda" sub="Personalized Ayurvedic diet guidance." />
                        <BenefitCard icon={<Activity className="w-7 h-7" />} title="Ayufit" sub="Adaptive yoga and movement routines." />
                        <BenefitCard icon={<Wind className="w-7 h-7" />} title="Manasayur" sub="Pranayama and mental balance practices." />
                        <BenefitCard icon={<Moon className="w-7 h-7" />} title="Somasleep" sub="Sleep optimization and circadian correction." />
                        <BenefitCard icon={<BrainCircuit className="w-7 h-7" />} title="AyuOne Coach" sub="Unlimited AI wellness assistant." />
                        <BenefitCard icon={<ShieldCheck className="w-7 h-7" />} title="Deep Insights" sub="Core Intelligence Engine tracking." />
                    </div>
                </section>

                {/* 4. COMPARISON TABLE */}
                <section className="bg-slate-50 py-24 px-6">
                    <div className="max-w-3xl mx-auto bg-white rounded-[3rem] shadow-premium overflow-hidden">
                        <div className="p-10 md:p-14">
                            <h3 className="text-xl font-black text-slate-800 mb-10 text-center">Why Upgrade?</h3>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Feature</th>
                                        <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Free</th>
                                        <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-forest">Premium</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-bold text-slate-600">
                                    <ComparisonRow label="Daily Dinacharya" free={true} premium={true} />
                                    <ComparisonRow label="Ojas Balance score" free={true} premium={true} />
                                    <ComparisonRow label="Imbalance Pressure" free={true} premium={true} />
                                    <ComparisonRow label="Protocol recommendations" free={true} premium={true} />
                                    <ComparisonRow label="AI personalized diet" free={false} premium={true} />
                                    <ComparisonRow label="AI yoga routines" free={false} premium={true} />
                                    <ComparisonRow label="AI pranayama routines" free={false} premium={true} />
                                    <ComparisonRow label="AI sleep optimization" free={false} premium={true} />
                                    <ComparisonRow label="AyuOne chat" free="5/day" premium="Unlimited" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* 5. PRICING SECTION */}
                <section className="py-24 px-6 text-center max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-12 bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto border border-slate-200">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-white text-forest shadow-sm' : 'text-slate-400'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'yearly' ? 'bg-white text-forest shadow-sm' : 'text-slate-400'}`}
                        >
                            Yearly
                        </button>
                    </div>

                    <div className="mb-12">
                        <div className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
                            <Zap className="w-4 h-4 fill-amber-600" /> Best Value - Save 50%
                        </div>
                        <div className="flex items-baseline justify-center gap-3">
                            <span className="text-7xl font-black text-slate-800 tracking-tighter">
                                {billingCycle === 'yearly' ? '₹199' : '₹399'}
                            </span>
                            <span className="text-slate-400 font-bold text-2xl">/ month</span>
                        </div>
                        <p className="text-base font-bold text-slate-400 mt-4">
                            {billingCycle === 'yearly' ? 'billed annually ₹2399' : 'billed monthly'}
                        </p>
                        <div className="mt-6 inline-block bg-forest/10 text-forest text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full border border-forest/10">
                            Limited introductory price
                        </div>
                    </div>

                    <div className="max-w-md mx-auto space-y-4">
                        <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="w-full bg-forest text-white py-8 rounded-[2.5rem] font-black text-base uppercase tracking-[0.2em] shadow-2xl shadow-forest/20 hover:shadow-forest/40 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loading ? "Initializing..." : "Start Premium"}
                        </button>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            ₹199/month introductory price
                        </p>
                    </div>

                    {/* 6. TRUST SECTION */}
                    <div className="mt-24 pt-12 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto">
                        <TrustItem icon={<ShieldCheck className="w-6 h-6" />} label="Built using classical Ayurvedic physiology" />
                        <TrustItem icon={<BrainCircuit className="w-6 h-6" />} label="Core Intelligence Engine" />
                        <TrustItem icon={<Heart className="w-6 h-6" />} label="Evidence-based wellness principles" />
                    </div>

                    {/* 7. SECONDARY CTA */}
                    <Link href="/" className="mt-20 inline-block text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
                        Continue with free version
                    </Link>
                    <div className="mt-6 flex items-center justify-center gap-2 opacity-50">
                        <CloudSun className="w-3 h-3 text-slate-400" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cancel anytime</span>
                    </div>
                </section>
            </main>
        </div>
    );
}

function VisualMetric({ icon, color, label }: { icon: React.ReactNode, color: string, label: string }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className={`w-14 h-14 ${color} rounded-[1.5rem] flex items-center justify-center shadow-premium`}>
                {icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        </div>
    );
}

function BenefitCard({ icon, title, sub }: { icon: React.ReactNode, title: string, sub: string }) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-start gap-6 group hover:shadow-premium transition-all">
            <div className="w-14 h-14 bg-forest/5 rounded-2xl flex items-center justify-center text-forest group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="text-left">
                <h4 className="text-xl font-black text-slate-800 tracking-tight mb-2">{title}</h4>
                <p className="text-sm font-bold text-slate-500 leading-relaxed">{sub}</p>
            </div>
        </div>
    );
}

function ComparisonRow({ label, free, premium }: { label: string, free: boolean | string, premium: boolean | string }) {
    return (
        <tr className="border-b border-slate-50">
            <td className="py-6 text-left text-slate-700">{label}</td>
            <td className="py-6 text-center">
                {typeof free === 'boolean' ? (
                    free ? <Check className="w-5 h-5 text-slate-300 mx-auto" /> : <div className="w-5 h-0.5 bg-slate-100 mx-auto" />
                ) : <span className="text-xs text-slate-400">{free}</span>}
            </td>
            <td className="py-6 text-center">
                {typeof premium === 'boolean' ? (
                    premium ? <Check className="w-5 h-5 text-forest mx-auto" /> : <X className="w-5 h-5 text-slate-200 mx-auto" />
                ) : <span className="text-xs text-forest font-black">{premium}</span>}
            </td>
        </tr>
    );
}

function TrustItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex flex-col items-center gap-4 px-4">
            <div className="text-forest/30">
                {icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-tight max-w-[120px] mx-auto">{label}</p>
        </div>
    );
}
