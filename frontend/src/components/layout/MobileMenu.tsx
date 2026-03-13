"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, BookOpen, Activity, HeartPulse } from "lucide-react";
import { TOPIC_GROUPS } from "@/data/navigation";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key support
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 26
      }
    },
    opened: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 26
      }
    }
  };

  const containerVariants = {
    opened: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    opened: { opacity: 1, x: 0 }
  };

  return (
    <div className="md:hidden relative z-[110]">
      {/* Trigger */}
      <button 
        onClick={toggleMenu}
        className="p-2 text-forest hover:bg-forest/5 rounded-xl transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-[9998]"
            />

            {/* Menu Panel */}
            <motion.div 
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="fixed top-0 right-0 h-screen w-full max-w-[420px] bg-white z-[9999] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 flex justify-between items-center border-b border-slate-50">
                <span className="font-black text-forest text-xl tracking-tighter">Dinaveda</span>
                <button 
                  onClick={toggleMenu}
                  className="p-2 text-slate-600 hover:text-forest transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-7 py-8 space-y-14">
                <motion.div variants={containerVariants} initial="closed" animate="opened" className="space-y-12">
                  
                  {/* Tools / Assessments */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-2 mb-3">
                       <Activity className="w-3.5 h-3.5" /> Biological Assessments
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {(TOPIC_GROUPS.tools ?? []).length > 0 ? (
                        TOPIC_GROUPS.tools.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/assessments/${item.slug}`}
                            onClick={toggleMenu}
                            className="text-lg font-semibold text-forest py-1.5 hover:translate-x-1 transition-transform"
                          >
                            {item.name}
                          </Link>
                        ))
                      ) : (
                        <>
                          <Link href="/tools" onClick={toggleMenu} className="text-base font-bold text-forest">
                            Analysis Tools
                          </Link>
                          <Link href="/login" onClick={toggleMenu} className="text-base font-bold text-forest">
                            Start Assessment
                          </Link>
                        </>
                      )}
                    </div>
                  </motion.div>

                  <div className="border-t border-slate-100 pt-6" />

                  {/* Symptoms / Health Hub */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-2 mb-3">
                       <HeartPulse className="w-3.5 h-3.5" /> Health Hub
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {TOPIC_GROUPS.symptoms.map((item) => (
                        <Link 
                          key={item.slug} 
                          href={`/health/${item.slug}`}
                          onClick={toggleMenu}
                          className="text-lg font-semibold text-forest py-1.5 hover:translate-x-1 transition-transform"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>

                  <div className="border-t border-slate-100 pt-6" />

                  {/* Education */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-2 mb-3">
                       <BookOpen className="w-3.5 h-3.5" /> Education
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {TOPIC_GROUPS.education.map((item) => (
                        <Link 
                          key={item.slug} 
                          href={item.slug === "index" ? "/guide" : `/guide/${item.slug}`}
                          onClick={toggleMenu}
                          className="text-lg font-semibold text-forest py-1.5 hover:translate-x-1 transition-transform"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>

                </motion.div>
              </div>

              {/* Footer / CTA */}
              <div className="px-7 pt-6 pb-10 border-t border-slate-100 space-y-4 bg-slate-50/40">
                <Link 
                  href="/login" 
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-3 bg-forest text-white w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-forest/20"
                >
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[10px] text-center font-bold text-slate-600 uppercase tracking-widest">
                   © 2026 Dinaveda AI
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
