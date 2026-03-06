"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles, Check, X, ShieldCheck, Zap, BrainCircuit,
    CloudSun, Activity, Flame, Moon, Utensils,
    ChevronRight, ArrowRight, Lock, HelpCircle,
    UserCircle, Heart, Wind, Star
} from "lucide-react";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    contextualMessage?: string;
}

export default function UpgradeModal({ isOpen, onClose, userId, contextualMessage }: UpgradeModalProps) {
    const [loading, setLoading] = useState(false);
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

    const handleUpgrade = async () => {
        if (loading) return;
        setLoading(true);
        try {
            // Robust URL handling
            let billingBaseUrl = process.env.NEXT_PUBLIC_BILLING_API_URL || process.env.NEXT_PUBLIC_API_URL || "";
            billingBaseUrl = billingBaseUrl.replace(/\/$/, "");

            const apiUrl = `${billingBaseUrl}/api/billing/create-subscription`;

            const res = await fetch(apiUrl, {
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
                console.error("Non-JSON response:", text);
                throw new Error("Server communication failure. Please check your connection.");
            }

            if (!res.ok || subscription.error) {
                throw new Error(subscription.error || `Error (${res.status}): Failed to initialize.`);
            }

            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            if (!razorpayKey) {
                throw new Error("Payment configuration missing. Please contact support.");
            }

            const options = {
                key: razorpayKey,
                subscription_id: subscription.id,
                name: "Dinaveda Premium",
                description: `${billingCycle === 'yearly' ? 'Yearly' : 'Monthly'} Ayurvedic Access`,
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
                theme: { color: "#064e3b" },
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
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-emerald-950/40 backdrop-blur-md overflow-hidden p-0 md:p-6">
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="bg-white rounded-t-[3rem] md:rounded-[3rem] shadow-premium max-w-lg w-full relative overflow-hidden flex flex-col max-h-[92vh]"
                    >
                        {/* Luxury Header Banner */}
                        <div className="bg-emerald-900 px-8 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">Premium Membership</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-emerald-100" />
                            </button>
                        </div>

                        <div className="overflow-y-auto custom-scrollbar">
                            <div className="p-8 md:p-10">
                                {/* Hero Copy */}
                                <div className="text-center mb-10">
                                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tightest mb-4 leading-tight">
                                        Absolute <span className="text-emerald-700">Evolution</span>
                                    </h1>
                                    <p className="text-sm font-bold text-slate-500 max-w-xs mx-auto leading-relaxed">
                                        Unlock the full depth of Ayurvedic intelligence for a body that feels like home.
                                    </p>
                                </div>

                                {/* Plan Selection */}
                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    <PlanCard
                                        isSelected={billingCycle === 'monthly'}
                                        onClick={() => setBillingCycle('monthly')}
                                        title="Monthly"
                                        price="₹399"
                                        sub="Full access"
                                    />
                                    <PlanCard
                                        isSelected={billingCycle === 'yearly'}
                                        onClick={() => setBillingCycle('yearly')}
                                        title="Yearly"
                                        price="₹249" // 2999 / 12 ~ 249
                                        sub="₹2999 billed annually"
                                        badge="Save 40%"
                                    />
                                </div>

                                {/* Premium Feature List */}
                                <div className="space-y-4 mb-10">
                                    <PremiumFeature icon={<Utensils />} title="Nutriveda AI" desc="Daily precision diet based on Agni" />
                                    <PremiumFeature icon={<Activity />} title="Ayufit Adaptive" desc="Yoga routines that evolve with you" />
                                    <PremiumFeature icon={<BrainCircuit />} title="Unlimited AyuOne" desc="Infinite guidance from our AI engine" />
                                    <PremiumFeature icon={<Moon />} title="SomaSleep" desc="Deep circadian rhythm correction" />
                                </div>

                                {/* Context Message */}
                                {contextualMessage && (
                                    <div className="mb-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest leading-normal">
                                            {contextualMessage}
                                        </p>
                                    </div>
                                )}

                                {/* CTA Button */}
                                <button
                                    onClick={handleUpgrade}
                                    disabled={loading}
                                    className="w-full relative group"
                                >
                                    <div className="absolute -inset-1 bg-emerald-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative flex items-center justify-center bg-emerald-800 text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-900 transition-all disabled:opacity-50">
                                        {loading ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Preparing...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span>Begin Elevation</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        )}
                                    </div>
                                </button>

                                <p className="mt-8 text-[9px] font-black text-center text-slate-400 uppercase tracking-[0.2em]">
                                    Secure Razorpay Checkout • Cancel Anytime
                                </p>
                            </div>

                            {/* Trust Badges */}
                            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-around">
                                <div className="flex flex-col items-center gap-1">
                                    <ShieldCheck className="w-4 h-4 text-emerald-800 opacity-40" />
                                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">Verified</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Zap className="w-4 h-4 text-emerald-800 opacity-40" />
                                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">Instant Access</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Heart className="w-4 h-4 text-emerald-800 opacity-40" />
                                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">Holistic</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function PlanCard({ isSelected, onClick, title, price, sub, badge }: { isSelected: boolean, onClick: () => void, title: string, price: string, sub: string, badge?: string }) {
    return (
        <button
            onClick={onClick}
            className={`relative p-6 rounded-[2rem] border-2 text-left transition-all ${isSelected ? 'border-emerald-600 bg-emerald-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}
        >
            {badge && (
                <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-sm">
                    {badge}
                </div>
            )}
            <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`}>{title}</div>
            <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-black text-slate-800 tracking-tight">{price}</span>
                <span className="text-[10px] font-bold text-slate-400">/mo</span>
            </div>
            <div className="text-[9px] font-bold text-slate-500 leading-tight">{sub}</div>

            {isSelected && (
                <div className="absolute top-4 right-4 bg-emerald-600 rounded-full p-1 shadow-sm">
                    <Check className="w-2.4 h-2.4 text-white" strokeWidth={4} />
                </div>
            )}
        </button>
    );
}

function PremiumFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex items-start gap-4 p-1">
            <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-800 shrink-0">
                {icon}
            </div>
            <div className="flex flex-col">
                <h4 className="text-xs font-black text-slate-800 tracking-widest uppercase mb-0.5">{title}</h4>
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
