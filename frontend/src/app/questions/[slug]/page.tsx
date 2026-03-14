import { SYMPTOMS } from "@/data/symptoms";
import { QUESTION_TEMPLATES } from "@/data/questionTemplates";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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
  // Sort symptoms by length descending to match longest possible symptom first (e.g. "post-meal-fatigue" before "fatigue")
  const symptomKeys = Object.keys(SYMPTOMS).sort((a, b) => b.length - a.length);
  for (const symptom of symptomKeys) {
    if (slug.includes(symptom)) {
      return symptom;
    }
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const symptomKey = findSymptom(slug);
  if (!symptomKey) return {};

  const symptom = SYMPTOMS[symptomKey as keyof typeof SYMPTOMS];
  const questionTitle = slug.replaceAll("-", " ");
  const capitalizedQuestion = questionTitle.charAt(0).toUpperCase() + questionTitle.slice(1) + "?";

  return {
    title: `${capitalizedQuestion} Ayurvedic Perspective | Dinaveda`,
    description: `Explore the Ayurvedic interpretation of ${symptom.name.toLowerCase()}. Learn about digestive fire (Agni), metabolic residue (Ama), and traditionally used lifestyle support patterns.`,
    alternates: {
      canonical: `https://www.dinaveda.com/questions/${slug}`,
    },
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symptomKey = findSymptom(slug);

  if (!symptomKey) {
    notFound();
  }

  const symptom = SYMPTOMS[symptomKey as keyof typeof SYMPTOMS];
  const questionTitle = slug.replaceAll("-", " ");
  const capitalizedQuestion = questionTitle.charAt(0).toUpperCase() + questionTitle.slice(1) + "?";

  const JSON_LD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `https://www.dinaveda.com/questions/${slug}#webpage`,
        "url": `https://www.dinaveda.com/questions/${slug}`,
        "name": `${capitalizedQuestion} Ayurvedic Perspective | Dinaveda`,
        "description": `Ayurvedic interpretation and lifestyle support patterns for ${symptom.name.toLowerCase()}.`,
        "lastReviewed": "2026-03-14",
        "author": {
          "@type": "Person",
          "name": "Dr. Rahul K R",
          "jobTitle": "Ayurvedic Physician"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Dinaveda"
        },
        "breadcrumb": { "@id": `https://www.dinaveda.com/questions/${slug}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.dinaveda.com/questions/${slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Health Hub",
            "item": "https://www.dinaveda.com/health"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Q&A",
            "item": `https://www.dinaveda.com/questions/${slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://www.dinaveda.com/questions/${slug}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": capitalizedQuestion,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `In Ayurvedic physiology, this is often interpreted as an imbalance in digestive fire (Agni) or the accumulation of metabolic residue (Ama). Lifestyle protocols are traditionally used to support internal balance.`
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#F8FAF9] min-h-screen font-sans selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {/* Navigation */}
      <nav className="p-6 bg-white border-b border-slate-50 flex justify-between items-center w-full sticky top-0 z-[70] backdrop-blur-md">
        <Link href="/health" className="font-black text-forest text-xl tracking-tighter">
          Dinaveda
        </Link>
        <Link href="/login" className="text-xs font-black text-white bg-forest px-6 py-2.5 rounded-full uppercase tracking-widest hover:bg-forest/90 transition-all shadow-lg shadow-forest/10">
          Start Assessment
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-12">
        {/* H1 Question */}
        <h1 className="text-4xl md:text-6xl font-black text-forest tracking-tighter leading-[1.1] capitalize">
          {questionTitle}
        </h1>

        {/* E-E-A-T Reviewer Block */}
        <div className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xs font-black text-emerald-700">
            RK
          </div>
          <div>
            <p className="text-xs font-black text-forest uppercase tracking-widest">
              Medically Reviewed by
            </p>
            <p className="text-sm font-bold text-slate-600">
              Dr. Rahul K R, BAMS • Ayurvedic Physician
            </p>
          </div>
        </div>

        {/* Quick Explanation */}
        <div className="space-y-6">
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Questions such as "<span className="text-forest italic">{questionTitle}</span>" often
            relate to physiological imbalances affecting digestion, metabolism, or nervous system regulation.
          </p>
          <p className="text-slate-500 leading-relaxed">
            In Ayurvedic physiology, these patterns are commonly interpreted through the balance of the three regulatory principles known as Vata, Pitta, and Kapha. Rather than treating the symptom in isolation, we look at the state of your digestive fire (Agni) and the presence of metabolic toxins (Ama).
          </p>
        </div>

        {/* Possible Causes */}
        <section className="space-y-6 p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-black text-forest tracking-tight">
            Possible Contributing Factors
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-600 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
              <span>Irregular digestive fire (Agni imbalance) due to inconsistent nutrition or habits.</span>
            </li>
            <li className="flex items-start gap-3 text-slate-600 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
              <span>Accumulation of metabolic residue (Ama) that may obstruct physiological channels.</span>
            </li>
            <li className="flex items-start gap-3 text-slate-600 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
              <span>Chronic psychological stress affecting nervous system (Vata) regulation.</span>
            </li>
            <li className="flex items-start gap-3 text-slate-600 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
              <span>Disruption of natural circadian cycles (Dinacharya) impacting sleep efficiency.</span>
            </li>
          </ul>
        </section>

        {/* Ayurvedic Explanation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-forest tracking-tight">
            Ayurvedic Interpretation
          </h2>
          <p className="text-slate-600 leading-relaxed font-medium">
            Ayurvedic physiology interprets symptoms as biological signals of systemic imbalance. In traditional clinical practice, when digestive fire (Agni) weakens, the body may accumulate metabolic residue (Ama). 
            This residue often manifests as {symptom.name.toLowerCase()}, fatigue, or cognitive slowing. Ayurvedic lifestyle protocols are traditionally used to support internal balance and the body's natural regulatory capacity.
          </p>
          <div className="p-6 bg-slate-900 rounded-[2rem] text-slate-300 text-sm leading-relaxed border border-white/5 shadow-xl">
            <span className="text-emerald-400 font-black uppercase tracking-widest block mb-2">Internal Logic</span>
            Identifying whether your symptoms reflect Vata, Pitta, or Kapha dominance is essential for determining the most appropriate dietary and lifestyle support patterns.
          </div>
        </section>

        {/* Medical Safety */}
        <section className="bg-rose-50 border border-rose-100 p-8 rounded-[2.5rem] space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-white border border-rose-100 flex items-center justify-center text-rose-600 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
             </div>
             <h3 className="text-xl font-black text-forest">
               When to Seek Medical Advice
             </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Persistent or severe symptoms should always be evaluated by a qualified healthcare professional. Sudden weight loss, severe pain, or unexplained fatigue may indicate underlying medical conditions requiring prompt clinical care.
          </p>
        </section>

        {/* Related Symptom & Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Related Symptom Page */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-forest tracking-tight uppercase text-xs tracking-widest text-slate-400">
              Symptom Authority
            </h2>
            <Link
              href={`/health/${symptomKey}`}
              className="group block p-6 bg-white border border-slate-100 rounded-3xl hover:bg-emerald-50 transition-all border-b-4 border-b-forest/10 hover:border-b-forest"
            >
              <p className="text-lg font-black text-forest group-hover:text-emerald-700 transition-colors">
                Learn more about {symptom.name}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">View the full clinical overview and fixes.</p>
            </Link>
          </section>

          {/* Root Cause Guides */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-forest tracking-tight uppercase text-xs tracking-widest text-slate-400">
              Physiology Authority
            </h2>
            <div className="flex flex-col gap-2">
              <Link href="/guide/agni" className="text-sm font-bold text-forest hover:text-emerald-600 transition-colors flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-forest" /> Digestive Fire (Agni)
              </Link>
              <Link href="/guide/ama" className="text-sm font-bold text-forest hover:text-emerald-600 transition-colors flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-forest" /> Metabolic Residue (Ama)
              </Link>
              <Link href="/guide/doshas" className="text-sm font-bold text-forest hover:text-emerald-600 transition-colors flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-forest" /> Understanding Doshas
              </Link>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="bg-forest text-white p-12 md:p-16 rounded-[4rem] text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter">
            Analyze Your <br /> Physiological Pattern
          </h3>
          <p className="text-sm md:text-base text-emerald-100/70 font-bold uppercase tracking-widest leading-relaxed max-w-md mx-auto">
            Dinaveda evaluates your unique digestive, metabolic,
            and nervous system signals to identify patterns of imbalance.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Start Assessment
          </Link>
        </div>

        {/* Medical Disclaimer */}
        <footer className="text-[11px] text-slate-400 font-bold border-t border-slate-100 pt-10 text-center uppercase tracking-widest leading-relaxed">
          This information provides educational insights into
          Ayurvedic physiology and does not replace professional
          medical diagnosis or treatment. Always consult a healthcare professional.
        </footer>
      </article>
    </div>
  );
}
