"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Compass, Layers } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SYMPTOMS, DOSHAS, COMBINATIONS } from "@/data";

interface HealthClientProps {
  slug: string;
}

export default function HealthClient({ slug }: HealthClientProps) {
  const combo = COMBINATIONS[slug];
  if (!combo) { return null; }
  const parts = slug.split("-");
  const doshaKey = parts.pop() || "";
  const symptomKey = parts.join("-");
  const symptom = SYMPTOMS[symptomKey];
  const dosha = DOSHAS[doshaKey];

  // Find related symptoms in the same cluster
  const relatedInCluster = Object.values(SYMPTOMS)
    .filter(s => s.cluster === symptom?.cluster && s.id !== symptomKey)
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
        "name": combo.title,
        "description": combo.intro,
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
        "name": symptom?.name,
        "description": symptom?.summary,
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
            "name": symptom?.name,
            "item": `https://www.dinaveda.com/health/${symptomKey}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${symptom?.name} (${dosha?.name} Type)`,
            "item": `https://www.dinaveda.com/health/${slug}`
          }
        ]
      },
      {
        "@id": `https://www.dinaveda.com/health/${slug}#faq`,
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Is ${symptom?.name} related to ${dosha?.name} imbalance?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, in Ayurveda, ${symptom?.name} is often a direct result of ${dosha?.name} imbalance affecting the body's natural rhythms and digestive fire.`
            }
          },
          {
            "@type": "Question",
            "name": `How long does it take to balance ${dosha?.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While initial shifts can be felt within 3-7 days of correct dietary and lifestyle adjustments, deep balance typically requires a full metabolic cycle of 30 days."
            }
          },
          {
            "@type": "Question",
            "name": `What lifestyle habits worsen ${symptom?.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `For ${dosha?.name} patterns, ${symptom?.name} is often aggravated by irregular meal timing, cold or processed foods, chronic stress, and lack of consistent daily routine.`
            }
          }
        ]
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

      {/* Navigation */}
      <nav className="px-6 py-4 md:py-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <div className="flex items-center gap-4">
          <Link href="/health" className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-all py-2">
            Hub
          </Link>
          <span className="text-slate-200">/</span>
          <Link href={`/health/${symptomKey}`} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-700 hover:text-forest transition-all py-2">
            {symptom?.name}
          </Link>
        </div>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">
          Dinaveda
        </Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1 py-2">
          Assessment
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-5 md:px-6 py-12 md:py-24">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex justify-center gap-2 mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-widest">
              {symptom?.name}
            </span>
            <span className="inline-block px-4 py-1.5 rounded-full bg-forest/5 text-forest text-xs font-black uppercase tracking-widest">
              {dosha?.name} Type
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            {combo.title.split(":")[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
              {combo.title.split(":")[1] || ""}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
            <strong>{symptom?.name}</strong> may arise from various physiological factors including metabolic inefficiency, digestive irregularity, or nervous system overstimulation. In Ayurvedic physiology, this pattern is commonly associated with an imbalance in the <strong>{dosha?.name}</strong> regulatory principle (dosha).
          </p>

          {/* Clinical Observation Section */}
          <div className="mt-12 p-6 md:p-10 bg-emerald-50/50 rounded-[2.5rem] md:rounded-[3rem] border border-emerald-100 max-w-2xl mx-auto text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/20 blur-3xl rounded-full" />
            <h3 className="text-xs md:text-sm font-black text-forest uppercase tracking-widest mb-6 border-b border-emerald-100/50 pb-3 w-fit">Clinical Perspective</h3>
            <div className="text-slate-700 leading-relaxed font-medium space-y-6 text-base md:text-lg">
              <p>
                In Ayurvedic clinical practice, physiological signals like {symptom?.name.toLowerCase()} are rarely isolated events. They often occur alongside patterns of irregular digestion, disrupted sleep, or chronic stress.
              </p>
              <p>
                Ayurvedic lifestyle protocols are traditionally used to support internal equilibrium and restore the body&apos;s natural regulatory capacity.
              </p>
            </div>
          </div>
        </motion.header>

        <div className="border-t border-slate-100 my-16 md:my-24" />

        <section className="space-y-14 md:space-y-20">
          {/* Section 1: Perspectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">The Modern View</h2>
              <p className="text-slate-700 leading-relaxed font-medium text-base md:text-lg">
                {symptom?.modernDesc}
              </p>
              <div className="p-8 md:p-10 bg-white rounded-[3rem] border border-slate-100 shadow-premium relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 blur-3xl rounded-full" />
                <h3 className="text-xl font-black text-forest mb-4">The Ayurvedic Pattern</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed relative z-10">
                  {symptom?.ayuDesc}
                </p>
              </div>

              {/* Common Causes Section */}
              <div className="space-y-6 pt-6">
                <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
                  Common Causes
                </h2>
                <ul className="space-y-4 text-slate-700 font-bold text-sm md:text-base">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Chronic stress</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Irregular sleep cycles</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Digestive imbalance</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Nutritional deficiencies</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Hormonal fluctuations</li>
                </ul>
              </div>
            </div>
            <div className="p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] bg-white border border-slate-100 shadow-sm space-y-8 sticky top-32">
              <div className={`w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center ${symptom?.color}`}>
                {symptom && <symptom.icon className="w-8 h-8" />}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-forest leading-tight">The Role of {dosha?.name}</h3>
              <p className="text-slate-700 font-medium leading-relaxed text-base md:text-lg">
                {combo.whyItHappens}
              </p>
              <div className="pt-6 border-t border-slate-50 flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-600">
                <span className="px-3 py-1 bg-slate-50 rounded-lg">{dosha?.elements}</span>
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                <span className="px-3 py-1 bg-slate-50 rounded-lg">{dosha?.role}</span>
              </div>
            </div>
          </div>

          {/* Local Mid-Page CTA */}
          <div className="p-8 md:p-12 bg-forest rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-forest/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[80px] opacity-10 pointer-events-none -mr-20" />
            <div className="space-y-2 text-center md:text-left z-10 flex-1">
              <h3 className="text-xl md:text-2xl font-black tracking-tight">Identify Your Physiological Pattern</h3>
              <p className="text-emerald-100/90 font-medium text-sm md:text-base max-w-md">Our clinical assessment maps your symptom clusters to Ayurvedic regulatory principles.</p>
            </div>
            <Link href="/login" className="bg-white text-forest px-10 py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-emerald-50 transition-all z-10 whitespace-nowrap shadow-xl">
              Start Assessment
            </Link>
          </div>

          {/* Section: The Root Cause Bridge */}
          {symptom?.relatedCause && (
            <div className="bg-slate-900 rounded-[3rem] md:rounded-[3.5rem] p-8 md:p-14 text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 blur-[120px] opacity-20 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">The Mechanical Source</span>
                  <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                    {symptom.name} is a branch. <br />
                    The root is <span className="text-emerald-400 underline underline-offset-8 decoration-emerald-400/30">physiological imbalance.</span>
                  </h3>
                  <p className="text-slate-300 font-medium leading-relaxed max-w-xl text-base md:text-lg">
                    While {symptom.name} manifestations are bothersome, the underlying mechanism is often related to biological patterns like {symptom.relatedCause === 'weak-agni' ? 'weakened digestion' : symptom.relatedCause === 'ama-accumulation' ? 'stored metabolic waste' : 'nervous system aggravation'}.
                  </p>
                  <Link
                    href={`/cause/${symptom.relatedCause}`}
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 md:px-10 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all hover:scale-105 shadow-xl shadow-emerald-900/40"
                  >
                    Investigate Root Cause <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center p-8 shrink-0 shadow-inner">
                  <div className="text-center space-y-2">
                    <Layers className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                    <span className="block text-xs font-black uppercase text-slate-500 tracking-widest leading-tight">Current Focus</span>
                    <span className="block text-base md:text-lg font-black text-white">{symptom.name}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Associated Symptoms Section */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">Associated Signals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["fatigue", "digestive irregularity", "mood instability", "sleep disturbances"].map((sig) => (
                <div key={sig} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-slate-700 font-bold text-sm md:text-base capitalize">{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Signs */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight text-center mb-12">Is this your pattern?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {combo.signs.map((sign, i) => (
                <div key={i} className="flex gap-4 items-start p-2 rounded-2xl transition hover:bg-slate-50">
                  <div className="w-7 h-7 rounded-full bg-forest/5 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-forest" />
                  </div>
                  <p className="text-slate-700 font-bold leading-relaxed text-sm md:text-base">{sign}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Section: Causes & Mechanism */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">Physiological Mechanism</h2>
            <div className="space-y-6 text-slate-700 leading-relaxed font-medium text-base md:text-lg">
              <p>
                In Ayurvedic physiology, {symptom?.name} is not viewed as a random occurrence, but as a specific
                sign that {dosha?.name} has become aggravated within your system. This imbalance disrupts
                normal physiological functions—such as digestion, circulation, or nervous system stability.
              </p>
              <p>
                When {dosha?.name} accumulates, it creates certain "gunas" (qualities) in the body. For a
                {dosha?.name} type, these typically manifest as {dosha?.elements} influences that interfere
                with your body's stability. For example, you may experience patterns such as {combo.signs.slice(0, 2).join(" and ")}.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-12" />

          {/* New Section: Diet & Lifestyle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-forest tracking-tight">Dietary Recommendations</h3>
              <p className="text-base text-slate-700 font-medium leading-relaxed">
                Food is your primary medicine. To counter {dosha?.name} imbalance, you must introduce the
                opposite qualities through your diet.
              </p>
              <div className="space-y-4">
                <div className="p-6 md:p-8 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm transition hover:shadow-md">
                  <h4 className="font-black text-forest mb-4 flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest border-b border-emerald-100/50 pb-2">
                    Foods to Favor
                  </h4>
                  <ul className="text-sm md:text-base font-bold text-forest space-y-3">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Warm, cooked meals</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Warming spices: Ginger, Cumin</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Healthy fats: Ghee or Virgin Coconut Oil</li>
                  </ul>
                </div>
                <div className="p-6 md:p-8 bg-orange-50 rounded-3xl border border-orange-100 shadow-sm transition hover:shadow-md">
                  <h4 className="font-black text-forest mb-4 flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest border-b border-orange-100/50 pb-2">
                    Foods to Limit
                  </h4>
                  <ul className="text-sm md:text-base font-bold text-orange-800 space-y-3">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Excess raw or cold foods</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Highly processed sugars</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Iced drinks during meals</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-black text-forest tracking-tight">Daily Lifestyle Tips</h3>
              <p className="text-base text-slate-700 font-medium leading-relaxed">
                Small, consistent routine changes signal safety and rhythm to your biology, reducing the
                intensity of {symptom?.name}.
              </p>
              <div className="space-y-6">
                {[
                  "Maintain regular sleep and wake timings (Dinacharya).",
                  "Practice 5 minutes of mindful breathing before your largest meal.",
                  "Avoid heavy or late-night dinners to allow the body to clear Ama."
                ].map((tip, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 bg-white border border-slate-50 rounded-2xl shadow-sm transition hover:shadow-md">
                    <div className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm md:text-base text-slate-700 font-bold leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-12" />

          {/* Long-Tail SEO Section */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Reducing {symptom?.name}
            </h2>

            <div className="space-y-6 text-slate-700 leading-relaxed font-medium text-base md:text-lg">
              <p>
                Reducing {symptom?.name} associated with {dosha?.name} imbalance requires
                restoring equilibrium to the qualities that have become excessive in the body.
                Ayurveda approaches this by introducing opposite qualities through diet,
                lifestyle rhythms, and digestive regulation.
              </p>

              <p>
                For example, when {dosha?.name} accumulates it can disturb digestive stability,
                circulation, or nervous system balance. This disturbance may manifest as
                patterns like {combo.signs.slice(0, 2).join(" and ")}. Correcting the imbalance
                focuses on strengthening metabolic function (Agni) and clearing accumulated
                metabolic waste (Ama).
              </p>
            </div>
          </div>

          {/* Clinical Explanation Section */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Clinical Interpretation
            </h2>

            <div className="space-y-6 text-slate-700 leading-relaxed font-medium text-base md:text-lg">
              <p>
                Classical Ayurvedic physiology interprets {symptom?.name} as a functional
                signal rather than an isolated disorder. The symptom emerges when the
                balance between the three regulatory principles — Vata, Pitta, and Kapha —
                shifts away from an individual's natural constitution (Prakriti).
              </p>

              <p>
                Addressing root patterns through diet, lifestyle rhythm, and digestive correction is
                the foundational therapeutic principle in Ayurveda.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-12" />

          {/* Section 3: Protocol */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">Recommended Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {combo.protocol.map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center shadow-sm transition hover:shadow-md">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Sparkles className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h4 className="font-black text-forest mb-2 text-base md:text-lg">{item.title}</h4>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Section: Safety & FAQ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-rose-50/50 border border-rose-100 space-y-8">
              <h3 className="text-xl md:text-2xl font-black text-forest tracking-tight">Medical Guidance</h3>
              <div className="space-y-6">
                <p className="text-base text-slate-700 font-medium leading-relaxed">
                  While Ayurvedic insights provide powerful support for wellness, they do not replace
                  professional medical care.
                </p>
                <div className="space-y-4">
                  <p className="text-sm font-black text-slate-700 uppercase tracking-widest border-b border-rose-200/50 pb-2">
                    Consult a professional if:
                  </p>
                  <ul className="text-sm md:text-base font-bold text-slate-700 space-y-3">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" /> Symptoms are severe or persistent</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" /> Unexplained pain or high fever</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" /> You are pregnant or on medication</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8">
              <h3 className="text-xl md:text-2xl font-black text-forest tracking-tight">
                Common Questions
              </h3>

              <div className="space-y-4">
                {[
                  {
                    q: `What causes ${symptom?.name} in ${dosha?.name} types?`,
                    a: `In Ayurveda, ${symptom?.name} commonly appears when ${dosha?.name}
                      becomes aggravated and disturbs the body's natural physiological balance.
                      This imbalance affects processes like digestion, nervous regulation,
                      or metabolic stability.`
                  },
                  {
                    q: `Can ${symptom?.name} improve with lifestyle changes?`,
                    a: `Yes. Ayurveda focuses on restoring balance through diet, daily routine,
                      and digestion regulation. When these factors improve, symptoms like
                      ${symptom?.name} often reduce gradually.`
                  },
                  {
                    q: `How long does balance take?`,
                    a: `Initial improvements may appear within 3-7 days of consistent
                      lifestyle adjustments. However, deeper physiological balance
                      generally develops over one metabolic cycle of approximately
                      30 days.`
                  }
                ].map((faq, i) => (
                  <details key={i} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm transition-all">
                    <summary className="p-6 font-black text-forest cursor-pointer list-none flex justify-between items-center group-open:bg-slate-50 transition-colors text-sm md:text-base">
                      {faq.q}
                      <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-open:rotate-180 transition-transform">
                        <svg className="w-3 h-3 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-2 text-sm text-slate-600 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Related Symptoms Section */}
          <div className="space-y-10">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Related Patterns
            </h2>

            <p className="text-slate-700 font-medium leading-relaxed text-base md:text-lg">
              In Ayurveda, symptoms rarely appear in isolation. When {dosha?.name} becomes aggravated,
              multiple signals may emerge across digestion, energy, and sleep.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedInCluster.map((s) => (
                  <Link
                    key={s.id}
                    href={`/health/${s.id}-${doshaKey}`}
                    className="p-8 rounded-3xl border border-slate-100 bg-white hover:border-forest hover:shadow-premium transition-all group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-forest transition-colors">
                           <s.icon className="w-5 h-5" />
                         </div>
                         <span className="text-base font-black text-slate-800">{s.name}</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{s.summary}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:gap-4 transition-all">
                      View Pattern <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
            </div>

            <div className="pt-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 w-fit">Other variations of {symptom?.name}</h3>
              <div className="flex flex-wrap gap-4">
                {Object.keys(DOSHAS)
                  .filter(dKey => dKey !== doshaKey)
                  .map(dKey => (
                    <Link
                      key={dKey}
                      href={`/health/${symptomKey}-${dKey}`}
                      className="px-6 py-4 rounded-2xl border border-slate-100 bg-white hover:border-forest hover:text-forest transition-all text-xs md:text-sm font-black uppercase tracking-widest text-slate-700 shadow-sm"
                    >
                      {symptom?.name} ({DOSHAS[dKey as keyof typeof DOSHAS].name})
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Deep Knowledge Links */}
          <div className="py-12 border-y border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <Compass className="w-8 h-8 text-forest/40" />
              <div className="text-left">
                <span className="block text-xs font-black text-forest uppercase tracking-widest">Connect to Wisdom</span>
                <span className="text-sm text-slate-500 font-medium">Root Cause Guides & Biological Foundations</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {["Agni Biology", "Waste Clearance", "Dosha Balance", "Daily Rhythms"].map((link) => (
                <Link key={link} href={`/guide/${link.toLowerCase().split(' ')[0]}`} className="group flex items-center gap-2 text-xs md:text-sm font-black text-slate-700 hover:text-forest transition-all py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-forest transition-colors" />
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Dinaveda CTA */}
          <div className="bg-forest p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl shadow-forest/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
            <motion.h3
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-2xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Identify Your <br /> Metabolic State
            </motion.h3>
            <p className="text-emerald-100 font-bold mb-12 uppercase tracking-widest text-xs md:text-sm max-w-md mx-auto opacity-80">
              {dosha?.name}-type {symptom?.name} is just one layer. Let Dinaveda map your entire physiological state.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 bg-white text-forest px-10 py-5 md:px-12 md:py-6 rounded-full font-black text-xs md:text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 hover:bg-emerald-50"
            >
              Start Full Analysis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Footer Metadata */}
          <footer className="mt-20 pt-12 border-t border-slate-100 flex flex-col items-center gap-10 text-center">
            <div className="flex gap-6 items-center p-6 bg-white border border-slate-50 rounded-3xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-forest/5 flex items-center justify-center border border-forest/10">
                RK
              </div>
              <div className="text-left space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Medically Reviewed By</p>
                <p className="text-lg font-black text-forest leading-none">Dr. Rahul K R, BAMS</p>
                <p className="text-sm font-bold text-emerald-600 italic">Ayurvedic Physician</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Review Cycle: Q1 2026</p>
              <p className="text-xs text-slate-400 font-bold">Standard: Dynamic SEO Medicine Architecture v2.4</p>
            </div>

            <div className="max-w-2xl mx-auto p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                Medical Disclaimer: This information is for educational purposes and does not replace professional medical advice.
                Consult a qualified healthcare professional for medical concerns.
              </p>
            </div>
          </footer>
        </section>
      </article>
    </div>
  );
}
