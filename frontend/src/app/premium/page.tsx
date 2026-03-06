"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Check, Sparkles, Star, ArrowRight, ShieldCheck,
    Brain, Heart, Zap, Infinity, Lock,
    Crown, Compass, Anchor, Leaf
} from "lucide-react";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";

export default function PremiumPage() {
    const { isPremium, userId } = useSubscription();
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
    const [loading, setLoading] = useState(false);

    const handleStartPremium = async () => {
        if (loading) return;
        setLoading(true);
        try {
            let billingBaseUrl = process.env.NEXT_PUBLIC_BILLING_API_URL || process.env.NEXT_PUBLIC_API_URL || "";
            billingBaseUrl = billingBaseUrl.replace(/\/$/, "");

            const apiUrl = `${billingBaseUrl}/api/billing/create-subscription`;

            const res = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, planType: billingCycle }),
            });

            let subscription;
            try {
                subscription = await res.json();
            } catch (jsonErr) {
                const text = await res.text();
                throw new Error("Server communication failure.");
            }

            if (!res.ok || subscription.error) {
                throw new Error(subscription.error || `Server Error (${res.status})`);
            }

            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            if (!razorpayKey) throw new Error("Payment gateway configuration missing.");

            const options = {
                key: razorpayKey,
                subscription_id: subscription.id,
                name: "Dinaveda Premium",
                description: `${billingCycle === 'yearly' ? 'Yearly' : 'Monthly'} Membership`,
                image: "/apple-touch-icon.png",
                handler: async function (response: any) {
                    setLoading(true);
                    try {
                        const verifyRes = await fetch(`${billingBaseUrl}/api/billing/verify-subscription`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response),
                        });
                        const ver = await verifyRes.json();
                        if (ver.success) window.location.href = "/";
                    } catch (err) {
                        alert("Verification failed. Please contact support.");
                    } finally {
                        setLoading(false);
                    }
                },
                theme: { color: "#064e3b" },
                notes: { user_id: userId }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            alert(error.message || "Initialization failed.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCF9] overflow-x-hidden pb-20">
            {/* Majestic Hero Section */}
            <section className="relative pt-24 pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-gradient-radial from-emerald-100/40 via-transparent to-transparent -z-10 blur-3xl opacity-60" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-emerald-100/50 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200 mb-8">
                        <Crown className="w-4 h-4 text-emerald-800" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900">Royal Veda Access</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tightest leading-[0.9] mb-8">
                        The Science of <br />
                        <span className="text-emerald-700">Immortality</span>
                    </h1>

                    <p className="text-lg md:text-xl font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
                        Move beyond superficial wellness. Access the absolute depths of classical Ayurveda with precision intelligence.
                    </p>

                    <div className="flex justify-center mb-16">
                        <div className="p-1 bg-slate-100 rounded-full flex gap-1 border border-slate-200 shadow-inner">
                            <button
                                onClick={() => setBillingCycle("monthly")}
                                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle("yearly")}
                                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${billingCycle === 'yearly' ? 'bg-emerald-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                Yearly <span className="ml-1 opacity-60 text-[9px]">-40%</span>
                            </button>
                        </div>
                    </div>

                    {/* Pricing Display */}
                    <div className="relative inline-block mb-12">
                        <motion.div
                            key={billingCycle}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-7xl md:text-8xl font-black text-slate-800 tracking-tighter"
                        >
                            ₹{billingCycle === 'monthly' ? '399' : '2999'}
                        </motion.div>
                        <div className="text-xs font-black uppercase tracking-[0.4em] text-emerald-700 mt-2">
                            {billingCycle === 'monthly' ? '/ MONTH' : '/ YEAR (BEST VALUE)'}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <button
                            onClick={handleStartPremium}
                            disabled={loading}
                            className="relative group w-full md:w-auto"
                        >
                            <div className="absolute -inset-1 bg-emerald-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative bg-emerald-800 text-white px-12 py-7 rounded-[2.5rem] font-black text-base uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 hover:bg-emerald-900 transition-all">
                                {loading ? "Connecting..." : "Begin Elevation"}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Premium Pillars */}
            <section className="bg-emerald-900 py-24 px-6 rounded-t-[4rem] -mt-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PillarCard
                            icon={<Compass />}
                            title="Daily Precision"
                            desc="Real-time protocol adjustments based on your evolving physiology and external environment."
                        />
                        <PillarCard
                            icon={<Anchor />}
                            title="Deep Sleep Labs"
                            desc="Advanced circadian syncing logic to restore Ojas during the restorative hours."
                        />
                        <PillarCard
                            icon={<Leaf />}
                            title="Total Nutriveda"
                            desc="Unlimited access to daily nutritional alchemy, precision-weighted for your Dosha."
                        />
                    </div>
                </div>
            </section>

            {/* Mobile Benefit List */}
            <section className="py-24 px-6 max-w-2xl mx-auto">
                <h3 className="text-2xl font-black text-slate-800 tracking-tightest mb-12 text-center uppercase tracking-widest">Included Privileges</h3>
                <div className="space-y-6">
                    <BenefitItem icon={<Infinity />} title="Infinite AI Consultations" />
                    <BenefitItem icon={<Lock />} title="Exclusive Clinical Insights" />
                    <BenefitItem icon={<ShieldCheck />} title="Verified Practitioner Resources" />
                    <BenefitItem icon={<Star />} title="Priority Access to New Modules" />
                    <BenefitItem icon={<Heart />} title="Comprehensive Family Tracking" />
                </div>
            </section>
        </div>
    );
}

function PillarCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-emerald-800/50 backdrop-blur-lg border border-emerald-700/50 p-10 rounded-[3rem] shadow-xl text-emerald-50"
        >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-900 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
                {icon}
            </div>
            <h3 className="text-xl font-black mb-4 tracking-tight uppercase tracking-wider">{title}</h3>
            <p className="text-sm font-bold text-emerald-100/70 leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function BenefitItem({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <span className="text-sm font-black text-slate-700 uppercase tracking-widest">{title}</span>
        </div>
    );
}
