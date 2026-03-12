"use client";

import PaywallHero from "./PaywallHero";
import PersonalInsightCard from "./PersonalInsightCard";
import ValueAnchor from "./ValueAnchor";
import PremiumCapabilities from "./PremiumCapabilities";
import ComparisonTable from "./ComparisonTable";
import PremiumPreview from "./PremiumPreview";
import PricingCards from "./PricingCards";
import TrustSection from "./TrustSection";
import PaywallCTA from "./PaywallCTA";
import StickyUpgradeBar from "./StickyUpgradeBar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PaywallPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] relative overflow-x-hidden font-sans pb-32">
        <StickyUpgradeBar />

        {/* Ambient Backgrounds optimized */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-forest/5 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-2xl -ml-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 pt-12 relative z-10">
            <Link
                href="/"
                className="inline-flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-forest transition-colors"
            >
                <ChevronLeft className="w-3 h-3" /> Back to Dashboard
            </Link>

            <PaywallHero />
            <PersonalInsightCard />
            <ValueAnchor />
            <PremiumCapabilities />
            <ComparisonTable />
            <PremiumPreview />
            <PricingCards />
            <TrustSection />
            <PaywallCTA />
        </div>
        <Footer />
    </div>
  );
}
