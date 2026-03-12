import Link from "next/link";
import Image from "next/image";
import { TOPIC_GROUPS } from "@/data/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-[60] py-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Dinaveda Logo"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <span className="font-black text-2xl text-forest tracking-tighter">Dinaveda</span>
          </div>

          {/* Legal & Social */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <Link href="/privacy" className="text-xs font-bold text-slate-600 hover:text-forest transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs font-bold text-slate-600 hover:text-forest transition-colors">Terms</Link>
            <Link href="/contact" className="text-xs font-bold text-slate-600 hover:text-forest transition-colors">Contact</Link>
          </div>

          {/* Copyright */}
          <div className="text-slate-600 text-[11px] font-bold tracking-widest uppercase">
            © {currentYear} Dinaveda AI
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
