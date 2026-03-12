import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PaywallCTA() {
  return (
    <section className="py-20 text-center px-6 max-w-xl mx-auto">
      <h3 className="text-2xl font-black text-forest mb-8 tracking-tighter leading-tight">
        Unlock Personalized Health Guidance
      </h3>

      <Link
        href="#pricing-cards"
        className="inline-flex items-center gap-3 bg-forest text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        Start Premium Now <ArrowRight className="w-4 h-4" />
      </Link>

      <p className="text-xs text-slate-400 mt-6 font-bold uppercase tracking-widest opacity-60">
        Join 2,400+ health explorers
      </p>
    </section>
  );
}
