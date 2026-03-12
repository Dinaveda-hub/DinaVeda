import { Shield, Sparkles, Zap } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="bg-forest text-white py-14 px-8 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 blur-[80px] -mr-20 -mt-20 pointer-events-none" />
      
      <div className="max-w-md mx-auto space-y-8 relative z-10">
        <div className="flex flex-col items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-300" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">Secure encrypted health data</p>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-300" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">Built on classical Ayurvedic physiology</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-300" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">Deterministic health engine</p>
        </div>
      </div>
    </section>
  );
}
