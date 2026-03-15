"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, AlertCircle, Sparkles, CheckCircle2, Activity, Compass, Layers, Flame, Thermometer, ShieldAlert, ChevronDown, BookOpen, Search } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SYMPTOMS, DOSHAS } from "@/data";

interface SymptomClientProps {
  slug: string;
}

export default function SymptomClient({ slug }: SymptomClientProps) {
  const symptom = SYMPTOMS[slug];
  if (!symptom) return null;

  // Find related symptoms in the same cluster
  const relatedInCluster = Object.values(SYMPTOMS)
    .filter(s => s.cluster === symptom.cluster && s.id !== slug)
    .slice(0, 3);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const JSON_LD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `https://www.dinaveda.com/health/${slug}#webpage`,
        "url": `https://www.dinaveda.com/health/${slug}`,
        "name": `${symptom.name}: Ayurvedic Explanation & Causes | Dinaveda`,
        "description": symptom.summary,
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
        "breadcrumb": {
          "@id": `https://www.dinaveda.com/health/${slug}#breadcrumb`
        },
        "mainEntity": {
          "@id": `https://www.dinaveda.com/health/${slug}#condition`
        }
      },
      {
        "@type": "MedicalCondition",
        "@id": `https://www.dinaveda.com/health/${slug}#condition`,
        "name": symptom.name,
        "description": symptom.summary,
        "associatedAnatomy": {
          "@type": "AnatomicalSystem",
          "name": "Digestive System"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.dinaveda.com/health/${slug}#breadcrumb`,
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
            "name": symptom.name,
            "item": `https://www.dinaveda.com/health/${slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://www.dinaveda.com/health/${slug}#faq`,
        "mainEntity": (symptom.faqs || [
          {
            q: `Is ${symptom.name.toLowerCase()} always a sign of disease?`,
            a: `Not necessarily. In Ayurveda, temporary ${symptom.name.toLowerCase()} often occurs due to lifestyle factors such as irregular eating habits, high stress, or seasonal shifts.`
          },
          {
            q: "How long does it take to see improvements?",
            a: "Improvements depend on the underlying cause and the consistency of adjustments. Subtle shifts often begin within 3-7 days, with structural metabolic balance taking approximately 30 days."
          }
        ]).map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      },
      {
        "@type": "Article",
        "@id": `https://www.dinaveda.com/health/${slug}#article`,
        "headline": `${symptom.name}: Professional Ayurvedic Guidance`,
        "description": symptom.summary,
        "author": {
          "@type": "Person",
          "name": "Dr. Rahul K R",
          "url": "https://www.dinaveda.com/about"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Dinaveda",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.dinaveda.com/logo.png"
          }
        },
        "datePublished": "2025-03-01",
        "dateModified": "2026-03-14",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.dinaveda.com/health/${slug}`
        }
      }
    ]
  };

  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-forest z-[100] origin-left"
        style={{ scaleX }}
      />

      <nav className="px-6 py-4 md:py-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-forest transition-all py-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to hub
        </Link>
        <Link href="/" className="font-bold text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-sm font-bold text-forest uppercase tracking-wider border-b-2 border-forest/20 hover:border-forest transition-all pb-1 py-2">Assessment</Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12 md:py-24">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1.5 rounded-full bg-forest/5 text-forest text-xs font-bold uppercase tracking-widest">
              Clinical Overview
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest">
              {symptom.cluster}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-forest tracking-tight mb-8 leading-[1.1]">
            {symptom.name}
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-8 p-6 md:p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className="w-14 h-14 rounded-full bg-forest/5 flex items-center justify-center text-sm font-bold text-forest border border-forest/10">
              RK
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Medically reviewed by</p>
              <h4 className="text-base font-bold text-forest leading-none">Dr. Rahul K R, BAMS</h4>
              <p className="text-sm font-bold text-emerald-600 italic">Ayurvedic Physician</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6 md:border-l border-slate-100">
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Last medical review</p>
               <p className="text-sm font-bold text-forest">March 2026</p>
            </div>
          </div>

          <div className="mt-12 space-y-8">
            <p className="text-base md:text-lg text-slate-700 font-medium leading-[1.6]">
              <strong>{symptom.name}</strong> refers to a broad range of physiological signals often associated with metabolic or digestive inefficiency. 
              In Ayurvedic clinical practice, this pattern is traditionally interpreted as an indicator of internal imbalance in 
              <Link href="/guide/agni" className="text-forest border-b border-forest/20 hover:border-forest transition-colors">digestive fire (Agni)</Link> or the accumulation of 
              <Link href="/guide/ama" className="text-rose-600 border-b border-rose-200 hover:border-rose-600 transition-colors">metabolic residue (Ama)</Link>.
            </p>
            <p className="text-base text-slate-600 leading-[1.6] font-normal">
              {symptom.summary} {symptom.modernDesc}
            </p>
          </div>
        </motion.header>

        <div className="border-t border-slate-100 my-16 md:my-24" />

        <section className="space-y-16 md:space-y-24">
          {/* 2. Clinical Observation (Experience Signal) */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-forest tracking-tight">Understanding {symptom.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="p-6 md:p-10 bg-emerald-50/50 rounded-[3rem] border border-emerald-100 relative">
                <Compass className="absolute top-8 right-8 w-8 h-8 text-emerald-200" />
                <p className="text-slate-700 leading-[1.6] font-medium mb-6 text-base">
                  In Ayurvedic clinical practice, patients presenting with <strong>{symptom.name.toLowerCase()}</strong> often report associated patterns such as irregular digestion, poor sleep quality, chronic stress, or dietary imbalance.
                </p>
                <div className="space-y-4">
                  <p className="text-xs font-bold text-forest uppercase tracking-widest">Key clinical signs:</p>
                  <ul className="space-y-4 text-base font-medium text-slate-700">
                    {symptom.signs?.map((sign, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {sign}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <p className="text-slate-600 leading-[1.6] font-normal text-base">
                  Addressing these underlying patterns through targeted lifestyle and dietary adjustments may improve symptoms over time by restoring the body's natural regulatory capacity.
                </p>
                <div className="p-6 bg-white border border-slate-100 rounded-3xl">
                   <p className="text-base font-bold text-slate-600 italic leading-relaxed">
                     "We evaluate the whole metabolic context. {symptom.name} is rarely an isolated event, but a signal of communication between systems."
                   </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <div className="max-w-2xl space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight italic">Physiological Explanation</h2>
              <div className="space-y-6 text-slate-200 leading-relaxed text-base font-medium">
                <p>
                  In Ayurvedic physiology, symptoms are interpreted as indicators of imbalance in <Link href="/guide/agni" className="text-emerald-400 border-b border-emerald-400/20 hover:border-emerald-400 transition-all">digestive fire (Agni)</Link>, 
                  <Link href="/guide/ama" className="text-rose-400 border-b border-rose-400/20 hover:border-rose-400 transition-all">metabolic residue (Ama)</Link>, or the regulatory principles known as <Link href="/guide/doshas" className="text-indigo-400 border-b border-indigo-400/20 hover:border-indigo-400 transition-all">Doshas</Link> (Vata, Pitta, Kapha).
                </p>
                <p>
                  For <strong>{symptom.name}</strong>, {symptom.ayuDesc} Ayurvedic lifestyle practices are traditionally used to support internal equilibrium and the body's natural regulatory capacity.
                </p>
                <div className="pt-8 border-t border-white/10">
                   <p className="text-xs md:text-sm text-emerald-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Layers className="w-4 h-4" /> Structural Hierarchy
                   </p>
                   <p className="text-base text-slate-300 leading-relaxed">
                     Classical Ayurvedic texts describe digestion as a central determinant of vitality. By identifying the qualities (Gunas) present in your current state, we can introduce opposite qualities to support metabolic flow.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Common Causes Section */}
          <div className="space-y-12">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-forest tracking-tight mb-4">What causes {symptom.name.toLowerCase()}?</h2>
              <p className="text-slate-600 font-medium text-base md:text-lg leading-[1.6]">Consistent indicators usually stem from one or more of these contributing factors:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {symptom.causes?.map((group, i) => (
                <div key={i} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-forest mb-6 text-sm uppercase tracking-wider leading-none border-b border-slate-50 pb-4">{group.title}</h4>
                  <ul className="space-y-4">
                    {group.items.map((item, j) => (
                      <li key={j} className="text-base text-slate-700 font-medium flex items-start gap-3 leading-[1.6]">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )) || (
                [
                  { title: "Metabolic factors", items: ["Impaired digestion", "Metabolic residue", "Irregular Agni"] },
                  { title: "Lifestyle factors", items: ["Irregular routine", "High stress", "Poor sleep"] },
                  { title: "Dietary factors", items: ["Incompatible foods", "Late night meals", "Processed diet"] }
                ].map((group, i) => (
                  <div key={i} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm opacity-60">
                    <h4 className="font-semibold text-forest mb-6 text-sm uppercase tracking-wider leading-none border-b border-slate-50 pb-4">{group.title}</h4>
                    <ul className="space-y-4">
                      {group.items.map((item, j) => (
                        <li key={j} className="text-base text-slate-700 font-medium flex items-start gap-3 leading-[1.6]">
                          <Sparkles className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" /> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Local Mid-Page CTA */}
          <div className="p-8 md:p-12 bg-forest rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[80px] opacity-10 pointer-events-none -mr-20" />
            <div className="space-y-2 text-center md:text-left z-10">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">Understand your unique pattern</h3>
              <p className="text-emerald-100/80 font-medium text-base">Get a personalized Ayurvedic assessment based on your current state.</p>
            </div>
            <Link href="/login" className="bg-white text-forest px-8 py-4 rounded-full font-bold text-sm md:text-base uppercase tracking-widest hover:bg-emerald-50 transition-all z-10 whitespace-nowrap shadow-xl shadow-forest/20">
              Start Assessment
            </Link>
          </div>

          {/* 5. Lifestyle & Diet Strategies */}
          <div className="space-y-12">
             <h2 className="text-2xl md:text-3xl font-bold text-forest tracking-tight">Therapeutic Strategies</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Lifestyle */}
                <div className="space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-forest flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-2xl w-fit">
                    <Compass className="w-5 h-5 text-emerald-600" /> Lifestyle Corrections
                  </h3>
                  <div className="space-y-4">
                    {symptom.lifestyleTips?.map((tip, i) => (
                      <div key={i} className="p-6 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-forest mb-2 text-base">{tip.title}</h4>
                        <p className="text-base text-slate-600 font-medium leading-relaxed">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diet */}
                <div className="space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-forest flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-2xl w-fit">
                    <Flame className="w-5 h-5 text-orange-600" /> Dietary Adjustments
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-8 md:p-10 bg-emerald-50/30 rounded-[2.5rem] border border-emerald-100/50">
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Supportive Foods</p>
                      <ul className="space-y-4">
                        {symptom.dietarySupports?.map((item, i) => (
                          <li key={i} className="space-y-1">
                            <p className="text-base font-semibold text-forest leading-none">{item.food}</p>
                            <p className="text-xs text-slate-600 font-medium">{item.why}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 md:p-10 bg-orange-50/30 rounded-[2.5rem] border border-orange-100/50">
                      <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">Foods to Avoid</p>
                      <ul className="space-y-4">
                        {symptom.dietaryAvoids?.map((item, i) => (
                          <li key={i} className="space-y-1">
                            <p className="text-base font-semibold text-forest leading-none">{item.food}</p>
                            <p className="text-xs text-slate-600 font-medium">{item.why}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* 6. Safety Section (When to see a doctor) */}
          <div className="p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] bg-rose-50/50 border border-rose-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-sm border border-rose-100 shrink-0">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-forest tracking-tight leading-tight">
                When to Consult a <br className="md:hidden" /> Healthcare Professional
              </h3>
            </div>
            <p className="text-slate-700 font-medium leading-relaxed max-w-2xl text-base">
              Although mild symptoms may occur occasionally, medical evaluation is recommended if the condition occurs with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {(symptom.redFlags || [
                "Persistent or worsening symptoms", 
                "Unexplained weight loss", 
                "Severe pain", 
                "Neurological symptoms", 
                "Duration longer than several weeks"
              ]).map((flag, i) => (
                <div key={i} className="flex items-center gap-4 text-base font-medium text-slate-700 p-4 bg-white/50 rounded-2xl">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" /> {flag}
                </div>
              ))}
            </div>
          </div>

          {/* 7. FAQ Section */}
          <div className="space-y-12 pt-12 border-t border-slate-100">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-extrabold text-forest tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600 font-medium max-w-2xl leading-[1.6]">
                Everything you need to know about {symptom.name.toLowerCase()} from a clinical and physiological perspective.
              </p>
            </div>
            <div className="space-y-6 max-w-3xl">
              {(symptom.faqs || [
                {
                  q: `Is ${symptom.name.toLowerCase()} always a sign of disease?`,
                  a: `Not necessarily. In Ayurveda, temporary ${symptom.name.toLowerCase()} often occurs due to lifestyle factors such as irregular eating habits, high stress, or seasonal shifts.`
                },
                {
                  q: "How long does it take to see improvements?",
                  a: "Improvements depend on the underlying cause and the consistency of adjustments. Subtle shifts often begin within 3-7 days, with structural metabolic balance taking approximately 30 days."
                }
              ]).map((faq, i) => (
                <details key={i} className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden transition-all shadow-sm hover:border-forest/20">
                  <summary className="p-8 md:p-10 font-bold text-forest cursor-pointer list-none flex justify-between items-center group-open:bg-slate-50 transition-colors text-lg md:text-xl">
                    {faq.q}
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-open:rotate-180 transition-transform group-hover:bg-forest group-hover:text-white">
                      <ChevronDown className="w-5 h-5 transition-colors" />
                    </div>
                  </summary>
                  <div className="px-8 pb-10 md:px-10 md:pb-12 pt-4 text-lg text-slate-700 font-medium leading-[1.6] border-t border-slate-50">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* 8. Classical Ayurvedic References */}
          <div className="pt-12 border-t border-slate-100">
            <h2 className="text-xl md:text-2xl font-bold text-forest tracking-tight mb-8">Classical Ayurvedic References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-slate-500" />
                 </div>
                 <div>
                    <h5 className="font-bold text-forest text-base">Charaka Samhita</h5>
                    <p className="text-xs md:text-sm text-slate-600 font-medium italic">Sutra Sthana – Description of Agni and metabolic function</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-slate-500" />
                 </div>
                 <div>
                    <h5 className="font-bold text-forest text-base">Ashtanga Hridaya</h5>
                    <p className="text-xs md:text-sm text-slate-600 font-medium italic">Sutra Sthana – Regulation of sleep, digestion, and vitality</p>
                 </div>
              </div>
            </div>
          </div>

          {/* 9. Internal Linking Clusters (Related Topics) */}
          <div className="space-y-12 pt-12 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-forest tracking-tight">Topical Authority</h2>
                <div className="grid grid-cols-1 gap-4">
                  {relatedInCluster.map((rel) => (
                    <Link key={rel.id} href={`/health/${rel.id}`} className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Related Symptom</p>
                        <p className="text-base font-bold text-forest group-hover:text-emerald-600">{rel.name}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                  <div className="p-8 bg-forest rounded-[2.5rem] text-white">
                     <p className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2 italic">Medical Review Context</p>
                     <p className="text-base font-medium leading-relaxed opacity-90">This analysis uses classical Ayurvedic physiology clusters to identify underlying patterns rather than treating symptoms as isolated events.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-forest tracking-tight">Foundational Concepts</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/guide/agni" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">Guide</p>
                      <p className="text-base font-bold text-forest group-hover:text-orange-600">Digestive Fire (Agni)</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/ama" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">Guide</p>
                      <p className="text-base font-bold text-forest group-hover:text-rose-600">Metabolic Residue (Ama)</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/doshas" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">Guide</p>
                      <p className="text-base font-bold text-forest group-hover:text-indigo-600">Understanding Doshas</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/ojas" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Guide</p>
                      <p className="text-base font-bold text-forest group-hover:text-emerald-600">Ojas & Immunity</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Dosha Variations */}
          <div className="space-y-8 pt-12 border-t border-slate-100">
            <h2 className="text-xl md:text-2xl font-bold text-forest tracking-tight">
              Constitutional Variations
            </h2>
            <div className="flex flex-wrap gap-4">
              {Object.keys(DOSHAS).map((dKey) => (
                <Link 
                  key={dKey}
                  href={`/health/${slug}-${dKey}`}
                  className="px-6 py-4 rounded-2xl bg-white border border-slate-100 text-sm font-semibold text-slate-700 hover:border-forest hover:text-forest transition-all shadow-sm"
                >
                  {DOSHAS[dKey as keyof typeof DOSHAS].name}-type {symptom.name.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-forest p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] text-white text-center relative overflow-hidden shadow-premium">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-2xl md:text-5xl font-bold tracking-tight mb-8"
            >
              Identify Your <br /> Metabolic State
            </motion.h3>
            <p className="text-emerald-100 font-bold mb-12 uppercase tracking-widest text-sm max-w-md mx-auto opacity-90 leading-relaxed">
              Identify your unique physiological pattern and receive a personalized Ayurvedic assessment.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-10 py-5 md:px-12 md:py-6 rounded-full font-bold text-sm md:text-base uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 hover:bg-emerald-50"
            >
              Start Assessment <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Medical Disclaimer Section */}
            <div className="mt-20 pt-8 border-t border-white/10 text-xs font-bold text-emerald-100/40 text-center uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
              Medical Disclaimer: This article provides educational information based on Ayurvedic medical principles. It is not intended to replace professional medical diagnosis or treatment. Always consult a qualified healthcare professional for medical concerns.
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
