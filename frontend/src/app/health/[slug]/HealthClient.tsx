"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Compass, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { SYMPTOMS, DOSHAS, COMBINATIONS } from "@/data";

interface HealthClientProps {
  slug: string;
}

export default function HealthClient({ slug }: HealthClientProps) {
  const combo = COMBINATIONS[slug];
  if (!combo) { return null; }
  const [symptomKey, doshaKey] = slug.split("-");
  const symptom = SYMPTOMS[symptomKey];
  const dosha = DOSHAS[doshaKey];

  // Find related symptoms in the same cluster
  const relatedInCluster = Object.values(SYMPTOMS)
    .filter(s => s.cluster === symptom?.cluster && s.id !== symptomKey)
    .slice(0, 3);

  const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": combo.title,
    "description": combo.intro,
    "about": [
      { "@type": "MedicalCondition", "name": symptom?.name },
      { "@type": "MedicalEntity", "name": dosha?.name }
    ],
    "author": {
      "@type": "Person",
      "name": "Dr. Rahul K R",
      "jobTitle": "Ayurvedic Physician"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dinaveda"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dinaveda.com/health/${slug}`
    }
  };

  const FAQ_JSON_LD = {
    "@context": "https://schema.org",
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
      },
      {
        "@type": "Question",
        "name": `Can digestion affect ${symptom?.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Absolutely. In Ayurvedic medicine, Agni (digestive fire) is the foundation of health. When Agni is compromised, it produces Ama (toxins) which can manifest as ${symptom?.name}.`
        }
      },
      {
        "@type": "Question",
        "name": `How long does it take to restore dosha balance?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Deep physiological recalibration usually follows a 30-day cycle, though noticeable symptomatic relief often occurs within the first 10-14 days of dedicated protocol adherence."
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <div className="flex items-center gap-4">
          <Link href="/health" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-all">
            Hub
          </Link>
          <span className="text-slate-200">/</span>
          <Link href={`/health/${symptomKey}`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-all">
            {symptom?.name}
          </Link>
        </div>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">
          Dinaveda
        </Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">
          Assessment
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-5 md:px-6 py-14 md:py-20">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="flex justify-center gap-2 mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
              {symptom?.name}
            </span>
            <span className="inline-block px-4 py-1.5 rounded-full bg-forest/5 text-forest text-[10px] font-black uppercase tracking-widest">
              {dosha?.name} Type
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            {combo.title.split(":")[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
              {combo.title.split(":")[1] || ""}
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {symptom?.name} may arise from multiple physiological factors including metabolic imbalance, digestive inefficiency, or nervous system dysregulation. In Ayurvedic physiology, this symptom is commonly associated with imbalance in the {dosha?.name} dosha.
          </p>

          {/* Clinical Observation Section */}
          <div className="mt-12 p-8 bg-emerald-50/50 rounded-[3rem] border border-emerald-100 max-w-3xl mx-auto text-left">
            <h3 className="text-lg font-black text-forest uppercase tracking-widest mb-4">Clinical Observation</h3>
            <div className="text-slate-600 leading-relaxed font-medium space-y-4">
              <p>
                In Ayurvedic clinical practice, symptoms such as {symptom?.name} frequently occur alongside digestive imbalance, sleep disruption, or chronic stress.
              </p>
              <p>
                Identifying these patterns helps guide appropriate dietary and lifestyle adjustments to restore internal equilibrium.
              </p>
            </div>
          </div>
        </motion.header>

        <section className="space-y-14 md:space-y-20">
          {/* Section 1: Perspectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">The Modern View</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                {symptom?.modernDesc}
              </p>
              <div className="p-8 bg-white rounded-[3rem] border border-slate-100 shadow-premium relative">
                <h3 className="text-xl font-black text-forest mb-4">The Ayurvedic Pattern</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {symptom?.ayuDesc}
                </p>
              </div>

              {/* Common Causes Section */}
              <div className="space-y-6 pt-6">
                <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
                  Common Causes of {symptom?.name}
                </h2>
                <ul className="space-y-3 text-slate-600 font-medium">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-forest/20" /> chronic stress</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-forest/20" /> irregular sleep cycles</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-forest/20" /> digestive imbalance</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-forest/20" /> nutritional deficiencies</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-forest/20" /> hormonal fluctuations</li>
                </ul>
              </div>
            </div>
            <div className={`p-8 md:p-10 rounded-[2.5rem] md:rounded-[4rem] bg-white border border-slate-100 shadow-sm space-y-6`}>
              <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center ${symptom?.color}`}>
                {symptom && <symptom.icon className="w-8 h-8" />}
              </div>
              <h3 className="text-2xl font-black text-forest">The Role of {dosha?.name}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                {combo.whyItHappens}
              </p>
              <div className="pt-4 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-600">
                <span>{dosha?.elements}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span>{dosha?.role}</span>
              </div>
            </div>
          </div>

          {/* Section: The Root Cause Bridge */}
          {symptom?.relatedCause && (
            <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 blur-[120px] opacity-20 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">The Mechanical Source</span>
                  <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                    {symptom.name} is a branch. <br />
                    The root is <span className="text-emerald-400 underline underline-offset-8 decoration-emerald-400/30">underlying physiological imbalance.</span>
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed max-w-xl">
                    While {symptom.name} manifestations are bothersome, the underlying mechanism is often related to biological patterns like {symptom.relatedCause === 'weak-agni' ? 'weakened digestion' : symptom.relatedCause === 'ama-accumulation' ? 'stored metabolic waste' : 'nervous system aggravation'}.
                  </p>
                  <Link
                    href={`/cause/${symptom.relatedCause}`}
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all hover:scale-105"
                  >
                    Investigate Root Cause <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center p-8 shrink-0 shadow-2xl">
                  <div className="text-center space-y-2">
                    <Layers className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                    <span className="block text-[10px] font-black uppercase text-slate-500 tracking-widest leading-tight">Current Focus</span>
                    <span className="block text-sm font-black text-white">{symptom.name}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Symptoms Section */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">Symptoms Often Associated With {symptom?.name}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600 font-medium">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> fatigue</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> digestive irregularity</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> mood instability</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> sleep disturbances</li>
            </ul>
          </div>

          {/* Section 2: Signs */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight text-center mb-12">Is this your pattern?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {combo.signs.map((sign, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-forest/5 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-forest" />
                  </div>
                  <p className="text-slate-600 font-bold">{sign}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Section: Causes & Mechanism */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">What causes {symptom?.name} in {dosha?.name} types?</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-forest tracking-tight">Dietary Recommendations</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Food is your primary medicine. To counter {dosha?.name} imbalance, you must introduce the
                opposite qualities through your diet.
              </p>
              <div className="space-y-4">
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <h4 className="font-black text-forest mb-3 flex items-center gap-2 text-sm uppercase tracking-widest">
                    Foods to Favor
                  </h4>
                  <ul className="text-sm font-bold text-forest/70 space-y-2">
                    <li>• Warm, cooked meals (soups, stews)</li>
                    <li>• Warming spices: Ginger, Cumin, Black Pepper</li>
                    <li>• Healthy fats: Ghee or Virgin Coconut Oil</li>
                  </ul>
                </div>
                <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                  <h4 className="font-black text-forest mb-3 flex items-center gap-2 text-sm uppercase tracking-widest">
                    Foods to Limit
                  </h4>
                  <ul className="text-sm font-bold text-orange-700/70 space-y-2">
                    <li>• Excess raw or cold foods</li>
                    <li>• Highly processed sugars and flours</li>
                    <li>• Iced drinks during or after meals</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-black text-forest tracking-tight">Daily Lifestyle Tips</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Small, consistent routine changes signal safety and rhythm to your biology, reducing the
                intensity of {symptom?.name}.
              </p>
              <div className="space-y-6">
                {[
                  "Maintain regular sleep and wake timings (Dinacharya).",
                  "Practice 5 minutes of mindful breathing before your largest meal.",
                  "Avoid heavy or late-night dinners to allow the body to clear Ama."
                ].map((tip, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-600 font-bold leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-12" />

          {/* Long-Tail SEO Section */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              How to Reduce {symptom?.name} Caused by {dosha?.name}
            </h2>

            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
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

              <p>
                In many cases, symptoms begin improving when daily habits align with
                circadian rhythms — regular meal times, adequate sleep, warm and digestible
                foods, and stress regulation practices such as breathing exercises or
                mindful movement.
              </p>
            </div>
          </div>

          {/* Clinical Explanation Section */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Ayurvedic Interpretation of {symptom?.name}
            </h2>

            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
              <p>
                Classical Ayurvedic physiology interprets {symptom?.name} as a functional
                signal rather than an isolated disorder. The symptom emerges when the
                balance between the three regulatory principles — Vata, Pitta, and Kapha —
                shifts away from an individual's natural constitution (Prakriti).
              </p>

              <p>
                In the case of {dosha?.name} imbalance, the dominant qualities associated
                with this dosha begin to influence systemic processes such as digestion,
                tissue nourishment, and neural signaling. These shifts can manifest
                through patterns including {combo.signs.slice(0, 2).join(" and ")}.
              </p>

              <p>
                From a physiological perspective, these symptoms often reflect changes in
                digestive efficiency (Agni), metabolic by-product accumulation (Ama),
                and regulatory instability across body systems. Addressing these root
                patterns through diet, lifestyle rhythm, and digestive correction is
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
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Sparkles className="w-6 h-6 text-forest" />
                  </div>
                  <h4 className="font-black text-forest mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Section: Safety & FAQ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-orange-50/50 border border-orange-100 space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Medical Guidance</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                While Ayurvedic insights provide powerful support for wellness, they do not replace
                professional medical care.
              </p>
              <p className="text-sm text-slate-600 font-bold leading-relaxed">
                You should consult a healthcare professional if:
              </p>
              <ul className="text-xs font-bold text-slate-500 space-y-2">
                <li>• Symptoms are severe, sudden, or persistent</li>
                <li>• You experience unexplained pain or high fever</li>
                <li>• You are pregnant, nursing, or on medication</li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">
                    What causes {symptom?.name} in {dosha?.name} types?
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    In Ayurveda, {symptom?.name} commonly appears when {dosha?.name}
                    becomes aggravated and disturbs the body's natural physiological balance.
                    This imbalance affects processes like digestion, nervous regulation,
                    or metabolic stability.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">
                    Can {symptom?.name} improve naturally with Ayurvedic lifestyle changes?
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Yes. Ayurveda focuses on restoring balance through diet, daily routine,
                    and digestion regulation. When these factors improve, symptoms like
                    {symptom?.name} often reduce gradually.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">
                    How long does it take to balance {dosha?.name}?
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Initial improvements may appear within a few days of consistent
                    lifestyle adjustments. However, deeper physiological balance
                    generally develops over one metabolic cycle of approximately
                    30 days.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">
                    What lifestyle habits worsen {symptom?.name}?
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Irregular meal times, lack of sleep, and high stress are the primary 
                    drivers of {dosha?.name} aggravation, which manifests as {symptom?.name}.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">
                    Can digestion affect this condition?
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Yes. In Ayurveda, {symptom?.name} is often linked to the state of your 
                    Agni (digestive fire). Weak digestion creates Ama (metabolic waste), 
                    which can block channels and cause these symptoms.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">
                    How long does it take to restore dosha balance?
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    While symptoms may begin to ease in 7-10 days, a full physiological 
                    reset typically requires 30 days of consistent adherence to the protocol.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Symptoms Section */}
          <div className="space-y-10">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Related Symptoms of {dosha?.name} Imbalance
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              In Ayurveda, symptoms rarely appear in isolation. When {dosha?.name} becomes aggravated,
              multiple signals may emerge across digestion, energy, mood, and sleep cycles.
              Recognizing these associated patterns helps identify the deeper physiological imbalance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedInCluster.map((s) => (
                  <Link
                    key={s.id}
                    href={`/health/${s.id}-${doshaKey}`}
                    className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-forest hover:shadow-premium transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-forest transition-colors">
                         <s.icon className="w-4 h-4" />
                       </div>
                       <span className="text-sm font-black text-slate-800">{s.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-tight">{s.summary}</p>
                  </Link>
                ))}
            </div>

            <div className="pt-6">
              <h3 className="text-sm font-black text-forest uppercase tracking-widest mb-4">Explore other patterns of {symptom?.name}</h3>
              <div className="flex flex-wrap gap-3">
                {Object.keys(DOSHAS)
                  .filter(dKey => dKey !== doshaKey)
                  .map(dKey => (
                    <Link
                      key={dKey}
                      href={`/health/${symptomKey}-${dKey}`}
                      className="px-6 py-2 rounded-full border border-forest/10 bg-forest/5 hover:bg-forest hover:text-white transition-all text-xs font-black uppercase tracking-widest text-forest"
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
              <Compass className="w-6 h-6 text-forest" />
              <div className="text-left">
                <span className="block text-[10px] font-black text-forest uppercase tracking-widest">Connect to Wisdom</span>
                <span className="text-xs text-slate-400 font-medium">Root Cause Guides & Biological Foundations</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/guide/agni" className="group flex items-center gap-2 text-xs font-black text-slate-600 hover:text-forest transition-all">
                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-forest" />
                Agni Biology
              </Link>
              <Link href="/guide/ama" className="group flex items-center gap-2 text-xs font-black text-slate-600 hover:text-forest transition-all">
                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-forest" />
                Waste Clearance
              </Link>
              <Link href="/guide/doshas" className="group flex items-center gap-2 text-xs font-black text-slate-600 hover:text-forest transition-all">
                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-forest" />
                Understanding Doshas
              </Link>
              <Link href="/guide/dinacharya" className="group flex items-center gap-2 text-xs font-black text-slate-600 hover:text-forest transition-all">
                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-forest" />
                Daily Rhythms
              </Link>
            </div>
          </div>

          {/* Dinaveda CTA */}
          <div className="bg-forest p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
            <motion.h3
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-2xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Analyze Your <br /> Metabolic Code
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              {dosha?.name}-type {symptom?.name} is just one layer. Let Dinaveda map your entire physiological state.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start Analysis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Footer Metadata */}
          <footer className="mt-20 pt-12 border-t border-slate-100 flex flex-col items-center gap-6 text-center">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-forest" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Medically Reviewed By</p>
                <p className="text-xs font-bold text-forest">Dr. Rahul K R, BAMS</p>
                <p className="text-[10px] text-slate-400 font-medium">Ayurvedic Physician</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Updated March 2026</p>

            <div className="max-w-xl mx-auto mt-8 p-6 bg-slate-50 rounded-3xl">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                Medical Disclaimer: This information is for educational purposes and does not replace professional medical advice.
                Consult a qualified healthcare professional for diagnosis or treatment of medical conditions.
              </p>
            </div>
          </footer>
        </section>
      </article>
    </div>
  );
}
