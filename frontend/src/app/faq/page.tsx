"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, HelpCircle, Search, ChevronDown, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FAQ_DATA, FAQCategory } from "@/data/faq";

// Metadata cannot be in client components, but we'll include it as a comment for documentation.
/*
export const metadata = {
 title: "Dinaveda FAQ – Ayurvedic AI Health Platform",
 description:
 "Answers to common questions about Dinaveda, including subscriptions, health insights, and daily wellness routines."
}
*/

export default function FAQPage() {
    const [query, setQuery] = useState("");
    const [openIndices, setOpenIndices] = useState<string[]>([]);

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    const toggleAccordion = (id: string) => {
        setOpenIndices(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredData = useMemo(() => {
        if (!query) return FAQ_DATA;
        
        return FAQ_DATA.map(category => ({
            ...category,
            questions: category.questions.filter(
                q => q.q.toLowerCase().includes(query.toLowerCase()) || 
                     q.a.toLowerCase().includes(query.toLowerCase())
            )
        })).filter(category => category.questions.length > 0);
    }, [query]);

    // SEO Structured Data (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_DATA.flatMap(cat => cat.questions).map(q => ({
            "@type": "Question",
            "name": q.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q.a
            }
        }))
    };

    return (
        <div className="min-h-screen bg-[#F8FAF9] selection:bg-forest/20 selection:text-forest overflow-x-hidden text-slate-800 font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Ambient Background */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px] pointer-events-none" />

            <nav className="p-6 sticky top-0 z-50 flex justify-between items-center backdrop-blur-md bg-white/60 border-b border-slate-100">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-8 h-8 transition-transform duration-500 group-hover:scale-105">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" sizes="32px" />
                    </div>
                    <span className="font-black text-forest text-xl tracking-tighter uppercase">Dinaveda</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-2 text-[10px] font-black text-forest uppercase tracking-[0.3em] hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-4 h-4" /> Back to Contact
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-16">
                    
                    {/* Hero Section */}
                    <motion.div variants={itemVariants} className="text-center space-y-8">
                        <HelpCircle className="w-12 h-12 text-forest/20 mx-auto" />
                        <h1 className="text-5xl md:text-7xl font-black text-forest tracking-tighter leading-none">Frequently Asked</h1>
                        <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto leading-relaxed">
                            Search our guide for answers on magic links, physiology insights, and dinacharya.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-forest transition-colors" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-4 rounded-[1.5rem] border border-slate-200 bg-white/80 backdrop-blur-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest/10 focus:border-forest/30 shadow-premium transition-all"
                            />
                        </div>
                    </motion.div>

                    {/* FAQ Content */}
                    <div className="space-y-16">
                        {filteredData.length > 0 ? (
                            filteredData.map((category, catIdx) => (
                                <motion.section key={catIdx} variants={itemVariants} className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                        <category.icon className="w-5 h-5 text-gold" />
                                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">{category.category}</h2>
                                    </div>
                                    <div className="grid gap-3">
                                        {category.questions.map((item, qIdx) => {
                                            const id = `${catIdx}-${qIdx}`;
                                            const isOpen = openIndices.includes(id);
                                            return (
                                                <div 
                                                    key={qIdx} 
                                                    className={`glass rounded-[2rem] border transition-all duration-500 overflow-hidden ${isOpen ? 'border-forest/20 shadow-md bg-white' : 'border-white shadow-sm hover:border-slate-200'}`}
                                                >
                                                    <button 
                                                        onClick={() => toggleAccordion(id)}
                                                        className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4"
                                                    >
                                                        <h3 className="text-base md:text-lg font-black text-forest tracking-tight">{item.q}</h3>
                                                        <ChevronDown className={`w-5 h-5 text-slate-300 transition-transform duration-500 ${isOpen ? 'rotate-180 text-forest' : ''}`} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                            >
                                                                <div className="px-6 md:px-8 pb-8 pt-0 text-slate-500 font-medium text-sm leading-relaxed max-w-3xl">
                                                                    {item.a}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.section>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white/40 rounded-[3rem] border border-dashed border-slate-200">
                                <p className="text-slate-600 font-bold">No results found for "{query}"</p>
                                <button onClick={() => setQuery("")} className="text-forest underline mt-2 text-sm font-black uppercase tracking-widest">Clear search</button>
                            </div>
                        )}
                    </div>

                    {/* Support CTA */}
                    <motion.section variants={itemVariants} className="text-center pt-20 border-t border-slate-100">
                        <h3 className="text-2xl font-black text-forest mb-6 tracking-tight">Still have a question?</h3>
                        <p className="text-slate-500 font-medium text-sm mb-10 max-w-sm mx-auto">
                            If you couldn't find what you were looking for, our team is ready to help you directly.
                        </p>
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center gap-3 bg-forest text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-forest/20 hover:scale-[1.05] active:scale-95 transition-all"
                        >
                            <Mail className="w-4 h-4" /> Contact Support
                        </Link>
                    </motion.section>

                    <motion.div variants={itemVariants} className="pt-20 text-center text-[10px] font-medium text-slate-600 max-w-md mx-auto leading-relaxed">
                        Dinaveda provides wellness guidance and educational insights. 
                        Our algorithms are intended for lifestyle optimization and do not replace professional medical advice.
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
