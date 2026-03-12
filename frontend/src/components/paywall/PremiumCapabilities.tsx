const FEATURES = [
  {
    title: "Diet & Digestion",
    desc: "Personalized food recommendations based on your Agni."
  },
  {
    title: "Movement & Yoga",
    desc: "Adaptive routines aligned with your current dosha balance."
  },
  {
    title: "Breath & Stress",
    desc: "Targeted Pranayama protocols for nervous system stability."
  },
  {
    title: "Sleep Optimization",
    desc: "Circadian protocols that restore your natural rhythm."
  }
];

export default function PremiumCapabilities() {
  return (
    <section className="px-6 mb-16 max-w-xl mx-auto">
      <h3 className="text-xl font-black text-forest text-center mb-8 tracking-tight">
        Premium Generates Guidance For
      </h3>

      <div className="grid gap-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-forest/20 transition-all shadow-sm"
          >
            <h4 className="font-black text-forest text-sm mb-1">{f.title}</h4>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
