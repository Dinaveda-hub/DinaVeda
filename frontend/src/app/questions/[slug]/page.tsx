import Link from "next/link";
import { SYMPTOMS } from "@/data/symptoms";
import { QUESTION_TEMPLATES } from "@/data/questionTemplates";
import { ArrowRight, Shield, AlertTriangle } from "lucide-react";

export async function generateStaticParams() {
  const pages: { slug: string }[] = [];

  Object.keys(SYMPTOMS).forEach((symptom) => {
    QUESTION_TEMPLATES.forEach((template) => {
      const slug = template.replace("{symptom}", symptom);
      pages.push({ slug });
    });
  });

  return pages;
}

function findSymptom(slug: string) {
  for (const symptom of Object.keys(SYMPTOMS)) {
    if (slug.includes(symptom)) {
      return symptom;
    }
  }
  return null;
}

export default function QuestionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const symptomKey = findSymptom(slug);
  const symptom = symptomKey ? SYMPTOMS[symptomKey] : null;
  const questionText = slug.replaceAll("-", " ");

  return (
    <div className="bg-[#F8FAF9] min-h-screen font-sans selection:bg-forest/20 selection:text-forest">
      {/* Simple Nav */}
      <nav className="p-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-black text-forest text-xl tracking-tighter">
            Dinaveda
          </Link>
          <Link href="/health" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-forest transition-all">
            Health Hub
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-12">
        {/* H1 Question */}
        <header className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-black text-forest leading-[1.1] capitalize">
            {questionText}?
          </h1>

          {/* E-E-A-T Reviewer */}
          <div className="flex items-center gap-4 border-l-4 border-emerald-400 pl-4 py-1">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-xs font-bold text-emerald-700">
              DR
            </div>
            <div>
              <p className="text-xs font-bold text-forest">
                Reviewed by Dr. Rahul K R, BAMS
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Ayurvedic Physician • Clinical Authority
              </p>
            </div>
          </div>
        </header>

        {/* Quick Explanation */}
        <section className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Questions such as <span className="text-forest font-bold">"{questionText}"</span> often
            relate to physiological imbalances affecting digestion,
            metabolism, or nervous system regulation. In Ayurvedic
            physiology, these patterns are commonly interpreted through
            the balance of the three regulatory principles known as
            Vata, Pitta, and Kapha.
          </p>
        </section>

        {/* Possible Causes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-forest tracking-tight flex items-center gap-3">
            <div className="w-2 h-8 bg-amber-400 rounded-full" />
            Possible Causes
          </h2>
          <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Irregular digestive function (Agni imbalance)",
                "Accumulation of metabolic residue (Ama)",
                "Stress affecting nervous system regulation",
                "Disruption of sleep or daily rhythms"
              ].map((cause, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  {cause}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ayurvedic Explanation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-forest tracking-tight flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-400 rounded-full" />
            Ayurvedic Interpretation
          </h2>
          <div className="bg-slate-900 text-slate-300 p-8 md:p-12 rounded-[3rem] space-y-6 leading-relaxed">
            <p>
              Ayurvedic physiology interprets symptoms as signals of
              systemic imbalance. When digestive strength (Agni)
              weakens or metabolic by-products (Ama) accumulate,
              the body may produce symptoms that manifest as
              fatigue, digestive discomfort, or cognitive slowing.
            </p>
            <p className="text-sm border-l-2 border-blue-500 pl-6 text-slate-400 italic">
              "When the root cause remains unaddressed, the external sign (Linga) 
              persists, indicating a deeper disruption in the body's internal harmony."
            </p>
          </div>
        </section>

        {/* Medical Safety */}
        <section className="bg-orange-50 border border-orange-100 p-8 rounded-[2.5rem] flex gap-6 items-start">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-black text-forest">
              When to Seek Medical Advice
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Persistent or severe symptoms should always be evaluated
              by a qualified healthcare professional. Sudden weight
              loss, severe pain, or unexplained fatigue may indicate
              underlying medical conditions requiring clinical care.
            </p>
          </div>
        </section>

        {/* Related Symptom Page */}
        {symptom && (
          <section className="space-y-6 pt-8 border-t border-slate-100">
            <h2 className="text-xl font-black text-forest uppercase tracking-widest text-xs">
              Deep Dive Authority
            </h2>
            <Link
              href={`/health/${symptomKey}`}
              className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-between hover:border-forest transition-all shadow-sm"
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Detailed Analysis</p>
                <p className="text-xl font-black text-forest group-hover:text-forest transition-all">
                  Science of {symptom.name}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-forest group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </section>
        )}

        {/* Root Cause Guides */}
        <section className="space-y-6 pt-8">
          <h2 className="text-xl font-black text-forest uppercase tracking-widest text-xs">
            Ayurvedic Foundations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/guide/agni" className="p-6 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition text-center">
              <p className="text-sm font-black text-forest">Digestive Fire (Agni)</p>
            </Link>
            <Link href="/guide/ama" className="p-6 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition text-center">
              <p className="text-sm font-black text-forest">Metabolic Residue (Ama)</p>
            </Link>
            <Link href="/guide/doshas" className="p-6 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition text-center">
              <p className="text-sm font-black text-forest">The Three Doshas</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-forest p-10 md:p-16 rounded-[4rem] text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
          <h3 className="text-3xl font-black text-white leading-tight">
            Analyze Your <br /> Physiological Pattern
          </h3>
          <p className="text-emerald-100/70 text-sm font-medium max-w-sm mx-auto">
            Dinaveda evaluates digestion, metabolism,
            sleep, and nervous system signals to identify
            patterns of imbalance.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-3 bg-white text-forest px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
          >
            Start Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Medical Disclaimer */}
        <footer className="pt-12 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Safety & Compliance</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
            This information provides educational insights into
            Ayurvedic physiology and does not replace professional
            medical diagnosis or treatment. Always consult a
            healthcare professional for clinical concerns.
          </p>
        </footer>
      </article>
    </div>
  );
}
