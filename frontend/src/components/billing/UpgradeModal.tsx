"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles, Check, X, ShieldCheck, Zap, BrainCircuit,
    CloudSun, Activity, Flame, Moon, Utensils,
    ChevronRight, ArrowRight, Lock, HelpCircle,
    UserCircle, Heart, Wind
} from "lucide-react";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    contextualMessage?: string; // e.g. "Your Vata drift needs personalization"
}

export default function UpgradeModal({ isOpen, onClose, userId, contextualMessage }: UpgradeModalProps) {
    const [loading, setLoading] = useState(false);
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

    const handleUpgrade = async () => {
        if (loading) return;
        setLoading(true);
        try {
            // Support for cross-platform (Render/Vercel) setup where API might be on a diff domain
            const billingBaseUrl = process.env.NEXT_PUBLIC_BILLING_API_URL || process.env.NEXT_PUBLIC_API_URL || "";

            const res = await fetch(`${billingBaseUrl}/api/billing/create-subscription`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    planType: billingCycle
                }),
            });

            let subscription;
            try {
                subscription = await res.json();
            } catch (jsonErr) {
                const text = await res.text();
                console.error("Non-JSON response from billing API:", text);
                throw new Error(`Server Error (${res.status}): The billing service returned an invalid response. Please check your NEXT_PUBLIC_API_URL.`);
            }

            if (!res.ok || subscription.error) {
                throw new Error(subscription.error || `Server Error (${res.status}): Failed to initialize subscription.`);
            }

            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            if (!razorpayKey) {
                throw new Error("Payment gateway configuration missing. Please contact support.");
            }

            const options = {
                key: razorpayKey,
                subscription_id: subscription.id,
                name: "Dinaveda Premium",
                description: "Personalized Ayurvedic Guidance",
                image: "/apple-touch-icon.png",
                handler: async function (response: any) {
                    setLoading(true);
                    try {
                        const verifyRes = await fetch(`${billingBaseUrl}/api/billing/verify-subscription`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response),
                        });
                        const verification = await verifyRes.json();
                        if (verification.success) {
                            window.location.reload();
                        } else {
                            throw new Error("Verification failed.");
                        }
                    } catch (err) {
                        alert("We couldn't verify your payment. Please contact support.");
                    } finally {
                        setLoading(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                },
                theme: { color: "#2D5A43" },
                notes: { user_id: userId }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            console.error("Upgrade failed:", error);
            alert(error.message || "Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-forest/30 backdrop-blur-xl overflow-y-auto pt-20 pb-20 px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="bg-white rounded-[3.5rem] shadow-premium max-w-2xl w-full relative overflow-hidden"
                    >
                        {/* Close Button */}
                        <button onClick={onClose} className="absolute top-8 right-8 z-50 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="h-full">
                            {/* 1. HERO SECTION */}
                            <div className="p-10 md:p-14 text-center bg-gradient-to-b from-forest/5 to-transparent">
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-forest mx-auto mb-8 border border-forest/10"
                                >
                                    <Sparkles className="w-8 h-8" />
                                </motion.div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tightest mb-4 leading-tight">
                                    Unlock Personalized <span className="text-forest">Ayurvedic Guidance</span>
                                </h1>
                                <p className="text-base md:text-lg font-bold text-slate-500 max-w-md mx-auto leading-relaxed">
                                    Dinaveda analyzes your body’s daily balance and generates personalized routines for diet, sleep, movement, and mental clarity.
                                </p>

                                {/* Visual: Ojas, Dosha, Agni, Dinacharya */}
                                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-petal rounded-2xl flex items-center justify-center text-rose-500 shadow-sm">
                                            <Heart className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ojas Score</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-air rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                                            <Wind className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dosha Drift</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-fire rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                                            <Flame className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Agni Status</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-earth rounded-2xl flex items-center justify-center text-forest shadow-sm">
                                            <CloudSun className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dinacharya</span>
                                    </div>
                                </div>

                                {contextualMessage && (
                                    <div className="mt-8 inline-flex items-center gap-3 bg-amber-50 px-6 py-3 rounded-2xl border border-amber-100">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                        <p className="text-xs font-black text-amber-900 uppercase tracking-widest">{contextualMessage}</p>
                                    </div>
                                )}
                            </div>

                            {/* 2. PROBLEM FRAMING */}
                            <div className="px-10 md:px-14 py-10 border-y border-slate-50 bg-slate-50/30">
                                <div className="max-w-md mx-auto text-center space-y-4">
                                    <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Your body changes every day.</h3>
                                    <p className="text-sm md:text-base font-bold text-slate-500 leading-relaxed">
                                        Two people with the same energy level may need completely different corrections.
                                        Dinaveda analyzes your current state and recommends the right practices for your body today.
                                    </p>
                                </div>
                            </div>

                            {/* 3. PREMIUM BENEFITS */}
                            <div className="p-10 md:p-14">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10 text-center">Premium Modules</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <BenefitCard icon={<Utensils className="w-6 h-6" />} title="Nutriveda" sub="Personalized Diet Guidance" />
                                    <BenefitCard icon={<Activity className="w-6 h-6" />} title="Ayufit" sub="Adaptive Yoga Routines" />
                                    <BenefitCard icon={<Wind className="w-6 h-6" />} title="Manasayur" sub="Pranayama & Mental Balance" />
                                    <BenefitCard icon={<Moon className="w-6 h-6" />} title="Somasleep" sub="Sleep Optimization" />
                                    <BenefitCard icon={<BrainCircuit className="w-6 h-6" />} title="AyuOne Coach" sub="Unlimited AI Assistant" />
                                    <BenefitCard icon={<ShieldCheck className="w-6 h-6" />} title="Vital Insights" sub="Deep Trend Analysis" />
                                </div>
                            </div>

                            {/* 4. COMPARISON TABLE */}
                            <div className="px-10 md:px-14 py-12 bg-slate-50/50">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Features</th>
                                            <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Free</th>
                                            <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-forest">Premium</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs font-bold text-slate-600">
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

                            {/* 5. PRICING & CTA */}
                            <div className="p-10 md:p-14 text-center">
                                {/* Billing Toggle */}
                                <div className="flex items-center justify-center gap-4 mb-10 bg-slate-100 p-1 rounded-2xl w-fit mx-auto border border-slate-200">
                                    <button
                                        onClick={() => setBillingCycle("monthly")}
                                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-white text-forest shadow-sm' : 'text-slate-400'}`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => setBillingCycle("yearly")}
                                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'yearly' ? 'bg-white text-forest shadow-sm' : 'text-slate-400'}`}
                                    >
                                        Yearly
                                    </button>
                                </div>

                                <div className="mb-10 group cursor-pointer" onClick={() => setBillingCycle("yearly")}>
                                    <div className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-2 flex items-center justify-center gap-2">
                                        <Zap className="w-3 h-3 fill-amber-600" /> Best Value - Save 50%
                                    </div>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-5xl font-black text-slate-800 tracking-tighter">
                                            {billingCycle === 'yearly' ? '₹199' : '₹399'}
                                        </span>
                                        <span className="text-slate-400 font-bold text-lg">/ month</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 mt-2">
                                        {billingCycle === 'yearly' ? 'billed annually ₹2399' : 'billed monthly'}
                                    </p>
                                    <div className="mt-4 inline-block bg-forest/10 text-forest text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-forest/10">
                                        Limited introductory price
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpgrade}
                                    disabled={loading}
                                    className="w-full bg-forest text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-premium hover:shadow-forest/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {loading ? "Preparing Access..." : "Start Premium"}
                                </button>
                                <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    ₹199/month introductory price
                                </p>

                                {/* 6. TRUST SECTION */}
                                <div className="mt-12 pt-8 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-forest/40" />
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-tight">Built using classical Ayurvedic physiology</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <BrainCircuit className="w-5 h-5 text-forest/40" />
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-tight">Core Intelligence Engine</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <Heart className="w-5 h-5 text-forest/40" />
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-tight">Evidence-based wellness principles</p>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="mt-12 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                                >
                                    Continue with free version
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-2 opacity-50">
                                    <CloudSun className="w-3 h-3 text-slate-400" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cancel anytime</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function BenefitCard({ icon, title, sub }: { icon: React.ReactNode, title: string, sub: string }) {
    return (
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-6 group hover:bg-white hover:shadow-xl hover:shadow-forest/5 transition-all border-transparent hover:border-forest/5">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-forest shadow-sm group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="text-left">
                <h4 className="font-black text-slate-800 tracking-tight">{title}</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{sub}</p>
            </div>
        </div>
    );
}

function ComparisonRow({ label, free, premium }: { label: string, free: boolean | string, premium: boolean | string }) {
    return (
        <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
            <td className="py-4 text-left text-slate-700">{label}</td>
            <td className="py-4 text-center">
                {typeof free === 'boolean' ? (
                    free ? <Check className="w-4 h-4 text-slate-400 mx-auto" /> : <div className="w-4 h-0.5 bg-slate-200 mx-auto" />
                ) : <span className="text-[10px] text-slate-400">{free}</span>}
            </td>
            <td className="py-4 text-center">
                {typeof premium === 'boolean' ? (
                    premium ? <Check className="w-4 h-4 text-forest mx-auto" /> : <X className="w-4 h-4 text-slate-200 mx-auto" />
                ) : <span className="text-[10px] text-forest font-black">{premium}</span>}
            </td>
        </tr>
    );
}
