import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const TOPIC_GROUPS = {
  education: [
    { name: "Ayurveda Guide", slug: "index", category: "guide" },
    { name: "Doshas", slug: "doshas", category: "guide" },
    { name: "Prakriti", slug: "prakriti", category: "guide" },
    { name: "Agni", slug: "agni", category: "guide" },
    { name: "Ama", slug: "ama", category: "guide" },
    { name: "Ojas", slug: "ojas", category: "guide" },
  ],
  tools: [
    { name: "Dosha Quiz", slug: "dosha-quiz", category: "tool" },
    { name: "Agni Strength Test", slug: "agni-test", category: "tool" },
    { name: "Ama Checker", slug: "ama-checker", category: "tool" },
    { name: "Daily Rhythm Analyzer", slug: "daily-rhythm-analyzer", category: "tool" },
  ],
  symptoms: [
    { name: "Bloating", slug: "bloating", category: "health" },
    { name: "Fatigue", slug: "low-energy", category: "health" },
    { name: "Brain Fog", slug: "brain-fog", category: "health" },
    { name: "Anxiety", slug: "anxiety", category: "health" },
    { name: "Insomnia", slug: "insomnia", category: "health" },
  ]
};

const SEO_TAGS = [
  "Vata constitution", "Pitta constitution", "Kapha constitution",
  "Vata imbalance", "Pitta imbalance", "Kapha imbalance"
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-[60] pt-16 md:pt-24 pb-12 bg-gradient-to-b from-white to-[#F6F8F7] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 md:gap-16 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" aria-label="Go to Dinaveda homepage" className="flex items-center gap-3 mb-4 group flex-nowrap">
              <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Dinaveda Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <span className="font-black text-3xl text-forest tracking-tighter">Dinaveda</span>
            </Link>
            <p className="text-slate-600 max-w-sm font-medium leading-relaxed text-sm">
              Ancient wisdom meets modern intelligence. Build your rhythm and restore balance.
            </p>
          </div>

          {/* Product Cluster */}
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400">Product</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/#how-it-works" className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block">How it works</Link></li>
              <li><Link href="/protocol" className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block">Protocols</Link></li>
              <li><Link href="/routine" className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block">Daily Routines</Link></li>
              <li><Link href="/tools" className="text-xs font-bold text-forest py-1 block">Assessment Tools</Link></li>
              <li><Link href="/pricing" className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block">Pricing</Link></li>
              <li><Link href="/login" className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block">Sign In</Link></li>
            </ul>
          </div>

          {/* Education Cluster */}
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400">Education</h4>
            <ul className="flex flex-col gap-3">
              {TOPIC_GROUPS.education.map(topic => (
                <li key={topic.slug}>
                  <Link 
                    href={topic.slug === "index" ? "/guide" : `/guide/${topic.slug}`} 
                    className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block"
                  >
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Cluster */}
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400">Diagnostic Tools</h4>
            <ul className="flex flex-col gap-3">
              {TOPIC_GROUPS.tools.map(topic => (
                <li key={topic.slug}>
                  <Link href={`/tools/${topic.slug}`} className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block">
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Symptom Cluster & Legal */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400">Symptom Hub</h4>
              <ul className="flex flex-col gap-3">
                {TOPIC_GROUPS.symptoms.map(topic => (
                  <li key={topic.slug}>
                    <Link href={`/health/${topic.slug}`} className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block">
                      {topic.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400">Legal</h4>
              <ul className="flex flex-col gap-3">
                <li><Link href="/privacy" className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-xs font-semibold text-slate-600 hover:text-forest transition-colors py-1 block">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* SEO Tags */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2 justify-center">
           {SEO_TAGS.map(tag => (
             <Link key={tag} href="/guide/doshas" className="px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 hover:bg-forest hover:text-white transition-all uppercase tracking-widest whitespace-nowrap">
                {tag}
             </Link>
           ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-12 pt-12 border-t border-slate-200/60">
          <Link 
            href="/login" 
            className="group flex items-center gap-2 text-sm font-semibold text-forest hover:underline transition-all"
          >
            Start your Ayurvedic health profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="text-slate-400 text-[11px] font-medium tracking-wide">
            © {currentYear} Dinaveda • Optimized for Balance
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": "Main Navigation",
            "hasPart": [
              ...TOPIC_GROUPS.education.map(t => ({ "@type": "SiteNavigationElement", "name": t.name, "url": `https://dinaveda.com/guide/${t.slug === 'index' ? '' : t.slug}` })),
              ...TOPIC_GROUPS.tools.map(t => ({ "@type": "SiteNavigationElement", "name": t.name, "url": `https://dinaveda.com/tools/${t.slug}` })),
              ...TOPIC_GROUPS.symptoms.map(t => ({ "@type": "SiteNavigationElement", "name": t.name, "url": `https://dinaveda.com/health/${t.slug}` }))
            ]
          })
        }}
      />
    </footer>
  );
}
