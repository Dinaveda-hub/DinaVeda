"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Activity, AlertCircle, Wind, Sparkles, Moon, Anchor, Zap } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurvedic Perspective on Anxiety: Causes and Natural Solutions",
  "description": "Understand anxiety through the lens of Vata imbalance. Learn how the air element affects your nervous system and Ayurvedic tips to find your center.",
  "about": [
    { "@type": "Thing", "name": "Anxiety" },
    { "@type": "Thing", "name": "Vata" },
    { "@type": "Thing", "name": "Ayurveda" }
  ],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Ayurveda view anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda views anxiety as a Vata disturbance—essentially too much 'air' and 'movement' in the nervous system. Treatment focuses on grounding, warmth, and steady routine."
        }
      },
      {
        "@type": "Question",
        "name": "Can diet help with anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Grounding foods like root vegetables, warm stews, and healthy fats help stabilize the nervous system, whereas cold, dry, or caffeinated foods can worsen Vata-type anxiety."
        }
      }
    ]
  }
};

export default function AnxietyPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-all">
          <ArrowLeft className="w-4 h-4" /> Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">Assessment</Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Neurological Regulation
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Anxiety and <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
              Nervous System Imbalance
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Anxiety is characterized by heightened nervous system activation, excessive worry, restlessness, and difficulty maintaining emotional stability.  <br />
            In Ayurvedic physiology, these symptoms are commonly associated with aggravated Vata, the regulatory system governing neurological activity, movement, and sensory processing.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">Neurological Regulation in Ayurvedic Physiology</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                In Ayurveda, the nervous system is regulated primarily by Vata Dosha.  <br />
                When Vata becomes aggravated, neurological activity may become unstable, resulting in symptoms such as restlessness, racing thoughts, sleep disturbances, and heightened stress sensitivity.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-black text-forest mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-indigo-400" /> Vata Symptoms
                </h4>
                <ul className="text-sm font-bold text-slate-500 space-y-2">
                  <li>• Persistent worry or excessive thinking</li>
                  <li>• Difficulty concentrating</li>
                  <li>• Restless or disturbed sleep</li>
                  <li>• Increased sensitivity to stress</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Wind className="w-12 h-12 text-indigo-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">Principle of Opposite Qualities</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Ayurvedic management strategies apply the principle of opposite qualities.  <br />
                Since Vata is characterized by lightness, dryness, and mobility, stabilization methods emphasize warmth, regularity, nourishment, and grounding routines.
              </p>
              <Link href="/guide/doshas" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Learn about Vata →</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">Lifestyle Strategies for Nervous System Stability</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Warm Oil", icon: Sparkles, desc: "Abhyanga (therapeutic oil massage) is traditionally used to support nervous system stability and reduce Vata aggravation." },
                { title: "Root Foods", icon: Anchor, desc: "Warm, nourishing foods such as cooked grains and root vegetables help stabilize metabolic and neurological activity." },
                { title: "Pranayama", icon: Zap, desc: "Controlled breathing techniques such as Nadi Shodhana may help regulate autonomic nervous system responses and reduce physiological stress." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 text-center shadow-sm">
                   <item.icon className="w-10 h-10 text-indigo-500 mx-auto mb-6" />
                   <h4 className="font-black text-forest mb-2">{item.title}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vata Anxiety Symptoms */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Common Symptoms of Vata Anxiety
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              When anxiety is driven by Vata imbalance, the nervous system becomes
              overstimulated and irregular. These symptoms often appear together and
              fluctuate depending on sleep quality, stress levels, and digestive
              stability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Mental Symptoms</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Racing thoughts or mental overactivity</li>
                  <li>• Difficulty concentrating</li>
                  <li>• Excessive worry about future events</li>
                  <li>• Sudden mood shifts</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Physical Symptoms</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Restless sleep or insomnia</li>
                  <li>• Cold hands and feet</li>
                  <li>• Digestive irregularity</li>
                  <li>• Muscle tension or tremors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Long-tail SEO Section */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Why Does Vata Cause Anxiety?
            </h2>

            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
              <p>
                In Ayurveda, anxiety is most commonly associated with an aggravation of
                the <strong>Vata dosha</strong>, the biological principle responsible for
                movement, nerve impulses, and mental activity. When Vata becomes excessive,
                the mind begins to move faster than the body's ability to stabilize it.
              </p>

              <p>
                This imbalance can manifest as racing thoughts, restlessness, sleep
                disturbance, and heightened sensitivity to stress. Factors such as
                irregular meals, excessive screen time, chronic stress, and poor sleep
                rhythm can further amplify Vata activity in the nervous system.
              </p>

              <p>
                Ayurvedic management focuses on restoring rhythm, warmth, and grounding
                influences through diet, routine, breathwork, and calming herbal
                preparations that help stabilize the nervous system.
              </p>
            </div>
          </div>

          {/* Clinical Interpretation */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Ayurvedic Interpretation of Anxiety
            </h2>

            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
              <p>
                In classical Ayurvedic physiology, anxiety is interpreted as a functional
                disturbance in the regulatory principle known as <strong>Vata dosha</strong>.
                Vata governs movement in the body, including nerve impulses, breathing
                rhythm, circulation, and mental activity.
              </p>

              <p>
                When Vata becomes excessive or unstable, neural signaling becomes
                irregular. This can produce sensations of restlessness, racing thoughts,
                heightened alertness, and emotional volatility. Ayurveda therefore
                approaches anxiety not as an isolated psychological condition, but as a
                systemic imbalance affecting the nervous system.
              </p>

              <p>
                The therapeutic approach focuses on restoring stability through warmth,
                nourishment, and consistent daily rhythm. Practices such as warm oil
                massage, grounding foods, regular sleep cycles, and breathing practices
                are used to counteract the excessive mobility associated with Vata.
              </p>
            </div>
          </div>

          {/* New Educational Content */}
          <div className="space-y-12 py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">Underlying Mechanism: Vata Dysregulation</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                <p>
                  Ayurvedic medicine considers mental and physical processes to be closely interconnected.  <br />
                  Neurological instability is often attributed to aggravated Vata, which governs nerve impulses, sensory perception, and cognitive activity.
                </p>
                <p>
                  Modern triggers like constant digital notifications, irregular sleep, and 
                  high-pressure environments "fan the flames" of Vata, leading to the physical 
                  experience of anxiety, even when there is no immediate external threat.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Dietary Factors Influencing Anxiety</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Diet plays a role in maintaining neurological stability.  <br />
                  Ayurvedic dietary guidance typically recommends warm, easily digestible meals with adequate healthy fats and moderate spices to support metabolic balance.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Importance of Daily Routine</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Consistent daily routines (Dinacharya) help regulate circadian rhythms and reduce physiological stress.  <br />
                  Regular sleep, meal timing, and activity patterns may support nervous system stability.
                </p>
              </div>
            </div>
          </div>

          {/* New FAQ/Safety Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div className="p-10 rounded-[3.5rem] bg-indigo-50/50 border border-indigo-100 space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">When to Seek Medical Advice</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Although lifestyle and dietary interventions may support stress management, persistent or severe anxiety should be evaluated by a qualified healthcare professional.
              </p>
              <p className="text-sm text-slate-600 font-bold leading-relaxed underline underline-offset-4 decoration-indigo-200">
                Seek professional help if you experience panic attacks, severe depression, 
                or if anxiety interferes with your basic ability to function.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Can Ayurvedic practices support stress reduction?</h4>
                  <p className="text-xs text-slate-500 font-medium">Certain traditional practices such as therapeutic massage, breathing techniques, and dietary adjustments may support stress regulation and relaxation when used appropriately.</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">How long does it take to improve symptoms?</h4>
                  <p className="text-xs text-slate-500 font-medium">Improvements depend on the underlying cause and individual health status. <br /> Lifestyle and dietary adjustments may require several weeks of consistent implementation before noticeable changes occur.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Symptoms Section */}
          <div className="space-y-10 pt-8 border-t border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Symptoms Often Connected With Anxiety
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              In Ayurvedic physiology, anxiety rarely appears alone. When Vata becomes
              unstable, several other signals may arise across sleep, digestion, and
              cognitive function. Recognizing these related patterns helps identify
              deeper nervous system imbalance.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link
                href="/health/insomnia"
                className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-forest transition-all text-sm font-bold text-slate-600 hover:text-forest"
              >
                Insomnia
              </Link>

              <Link
                href="/health/brain-fog"
                className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-forest transition-all text-sm font-bold text-slate-600 hover:text-forest"
              >
                Brain Fog
              </Link>

              <Link
                href="/health/low-energy"
                className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-forest transition-all text-sm font-bold text-slate-600 hover:text-forest"
              >
                Low Energy
              </Link>

              <Link
                href="/health/bloating"
                className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-forest transition-all text-sm font-bold text-slate-600 hover:text-forest"
              >
                Digestive Bloating
              </Link>

              <Link
                href="/health/poor-digestion"
                className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-forest transition-all text-sm font-bold text-slate-600 hover:text-forest"
              >
                Poor Digestion
              </Link>

              <Link
                href="/guide/doshas"
                className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-forest transition-all text-sm font-bold text-slate-600 hover:text-forest"
              >
                Vata Dosha Guide
              </Link>
            </div>
          </div>

          {/* Author Authority & Update Info */}
          <div className="flex items-center gap-4 mb-8 pt-6 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
              DA
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Reviewed By</p>
              <p className="text-xs font-bold text-forest">Dinaveda Editorial Team</p>
              <p className="text-[10px] text-slate-400 font-medium">Last updated: March 2024 • Medical Review</p>
            </div>
          </div>

          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Evaluate Your Stress and <br /> Nervous System Balance
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda analyzes physiological indicators associated with stress regulation, sleep quality, and metabolic balance to help identify patterns contributing to anxiety symptoms.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Analyze My Stress <Activity className="w-5 h-5" />
            </Link>

            {/* Medical Disclaimer */}
            <div className="mt-16 pt-8 border-t border-white/10 uppercase tracking-widest text-[9px] font-bold text-emerald-100/30">
              Disclaimer: Not a substitute for medical advice. consult a professional for psychiatric concerns.
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
