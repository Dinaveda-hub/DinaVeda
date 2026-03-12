import PricingSection from "../billing/PricingSection";

export default function PricingCards() {
  return (
    <section id="pricing-cards" className="px-6 mb-16 max-w-xl mx-auto scroll-mt-20">
      <h3 className="text-xl font-black text-center text-forest mb-8 tracking-tighter">
        Choose Your Path
      </h3>
      <PricingSection />
      <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-600 mt-10 px-6">
        Secure checkout via Razorpay • Cancel anytime with one tap
      </p>
    </section>
  );
}
