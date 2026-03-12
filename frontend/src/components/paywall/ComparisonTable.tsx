export default function ComparisonTable() {
  const ROWS = [
    ["Daily Dinacharya", "✓", "✓"],
    ["Ojas Vitality Score", "✓", "✓"],
    ["Physiology Map", "✓", "✓"],
    ["Personalized Diet", "—", "✓"],
    ["Yoga Routines", "—", "✓"],
    ["Sleep Protocols", "—", "✓"],
    ["AyuOne Coach", "3/day", "Unlimited"]
  ];

  return (
    <div className="px-6 mb-16 max-w-xl mx-auto">
      <h3 className="text-xl font-black text-forest text-center mb-8 tracking-tight">
        Free vs Premium
      </h3>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-3 p-4 bg-slate-50/50 font-black text-[10px] uppercase tracking-widest text-slate-600 border-b border-slate-100">
          <div>Feature</div>
          <div className="text-center">Free</div>
          <div className="text-center">Premium</div>
        </div>

        {ROWS.map((row, i) => (
          <div key={i} className="grid grid-cols-3 p-4 border-b border-slate-50 last:border-none items-center">
            <div className="text-xs font-bold text-slate-600">{row[0]}</div>
            <div className="text-center text-xs font-black text-slate-300">{row[1]}</div>
            <div className="text-center text-xs font-black text-forest">{row[2]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
