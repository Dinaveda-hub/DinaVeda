"use client";

import Link from "next/link";
import { ChevronLeft, Sparkles, CheckCircle2 } from "lucide-react";
import PricingSection from "@/components/billing/PricingSection";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#F8FAF9] relative overflow-x-hidden font-sans pb-40">
            {/* Ambient Backgrounds */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -ml-40 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 md:px-10 pt-20 relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-12 bg-white/60 hover:bg-white px-5 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all backdrop-blur-md border border-slate-100 text-slate-500 hover:text-forest group shadow-sm"
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back
                </Link>

                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-amber-50 text-amber-500 flex items-center justify-center shadow-sm">
                            <Sparkles className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-forest tracking-tighter leading-none mb-6">
                        Unlock Your Full Health Potential
                    </h1>
                    <p className="text-sm md:text-base font-bold text-slate-500 leading-relaxed max-w-xl mx-auto">
                        Upgrade to Premium to access the AI Health Coach, advanced biological analytics, and hyper-personalized protocol insights.
                    </p>
                </div>

                {/* The core Pricing Section */}
                <PricingSection />

                {/* FAQ / Trust Indicators */}
                <div className="mt-32 max-w-2xl mx-auto">
                    <h3 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-8 text-center">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div className="bg-white/60 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-black text-forest mb-2">Can I cancel anytime?</h4>
                            <p className="text-sm text-slate-600 font-medium">Yes, your subscription auto-renews but you can cancel right from your profile settings at any time with no penalty.</p>
                        </div>
                        <div className="bg-white/60 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-black text-forest mb-2">What happens to my data if I cancel?</h4>
                            <p className="text-sm text-slate-600 font-medium">Your historical pulse logs and core physiological mappings remain securely on your account. You simply lose access to the AI coach and vector insights.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
