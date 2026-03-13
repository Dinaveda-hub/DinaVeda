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
  const [openSection, setOpenSection] = useState<string | null>("assessments");

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
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
              <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6">
                <motion.div variants={containerVariants} initial="closed" animate="opened" className="space-y-0">
                  
                  {/* Tools / Assessments */}
                  <motion.div variants={itemVariants} className="space-y-0">
                    <button
                      onClick={() => toggleSection("assessments")}
                      className="w-full flex items-center justify-between py-4 border-b border-slate-100"
                    >
                      <span className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-slate-900">
                        <Activity className="w-4 h-4 text-slate-700" />
                        Biological Assessments
                      </span>

                      <span className="text-slate-600 text-lg font-light">
                        {openSection === "assessments" ? "−" : "+"}
                      </span>
                    </button>
                    {openSection === "assessments" && (
                    <div className="pl-7 py-3 space-y-3">
                      {(TOPIC_GROUPS.tools ?? []).length > 0 ? (
                        TOPIC_GROUPS.tools.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/assessments/${item.slug}`}
                            onClick={toggleMenu}
                            className="block text-[17px] font-semibold text-forest"
                          >
                            {item.name}
                          </Link>
                        ))
                      ) : (
                        <>
                          <Link href="/tools" onClick={toggleMenu} className="block text-[17px] font-semibold text-forest">
                            Analysis Tools
                          </Link>
                          <Link href="/login" onClick={toggleMenu} className="block text-[17px] font-semibold text-forest">
                            Start Assessment
                          </Link>
                        </>
                      )}
                    </div>
                    )}
                  </motion.div>

                  {/* Symptoms / Health Hub */}
                  <motion.div variants={itemVariants} className="space-y-0">
                    <button
                      onClick={() => toggleSection("health")}
                      className="w-full flex items-center justify-between py-4 border-b border-slate-100"
                    >
                      <span className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-slate-900">
                        <HeartPulse className="w-4 h-4 text-slate-700" />
                        Health Hub
                      </span>

                      <span className="text-slate-600 text-lg font-light">
                        {openSection === "health" ? "−" : "+"}
                      </span>
                    </button>
                    {openSection === "health" && (
                    <div className="pl-7 py-3 space-y-3">
                      {TOPIC_GROUPS.symptoms.map((item) => (
                        <Link 
                          key={item.slug} 
                          href={`/health/${item.slug}`}
                          onClick={toggleMenu}
                          className="block text-[17px] font-semibold text-forest"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    )}
                  </motion.div>

                  {/* Protocols */}
                  <motion.div variants={itemVariants} className="space-y-0">
                    <button
                      onClick={() => toggleSection("protocols")}
                      className="w-full flex items-center justify-between py-4 border-b border-slate-100"
                    >
                      <span className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-slate-900">
                        <Activity className="w-4 h-4 text-slate-700" />
                        Protocols
                      </span>

                      <span className="text-slate-600 text-lg font-light">
                        {openSection === "protocols" ? "−" : "+"}
                      </span>
                    </button>

                    {openSection === "protocols" && (
                      <div className="pl-7 py-3 space-y-3">
                        <Link href="/protocol/dinacharya-reset" onClick={toggleMenu} className="block text-[17px] font-semibold text-forest">
                          Dinacharya Reset
                        </Link>
                        <Link href="/protocol/agni-reboot" onClick={toggleMenu} className="block text-[17px] font-semibold text-forest">
                          Agni Reboot
                        </Link>
                        <Link href="/protocol/ama-cleanse" onClick={toggleMenu} className="block text-[17px] font-semibold text-forest">
                          Ama Cleanse
                        </Link>
                      </div>
                    )}
                  </motion.div>

                  {/* Routines */}
                  <motion.div variants={itemVariants} className="space-y-0">
                    <button
                      onClick={() => toggleSection("routines")}
                      className="w-full flex items-center justify-between py-4 border-b border-slate-100"
                    >
                      <span className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-slate-900">
                        <Activity className="w-4 h-4 text-slate-700" />
                        Routines
                      </span>

                      <span className="text-slate-600 text-lg font-light">
                        {openSection === "routines" ? "−" : "+"}
                      </span>
                    </button>

                    {openSection === "routines" && (
                      <div className="pl-7 py-3 space-y-3">
                        <Link href="/routine/morning" onClick={toggleMenu} className="block text-[17px] font-semibold text-forest">
                          Morning Routine
                        </Link>
                        <Link href="/routine/evening" onClick={toggleMenu} className="block text-[17px] font-semibold text-forest">
                          Evening Routine
                        </Link>
                        <Link href="/routine/sleep-reset" onClick={toggleMenu} className="block text-[17px] font-semibold text-forest">
                          Sleep Reset
                        </Link>
                      </div>
                    )}
                  </motion.div>

                  {/* Education */}
                  <motion.div variants={itemVariants} className="space-y-0">
                    <button
                      onClick={() => toggleSection("education")}
                      className="w-full flex items-center justify-between py-4 border-b border-slate-100"
                    >
                      <span className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-slate-900">
                        <BookOpen className="w-4 h-4 text-slate-700" />
                        Education
                      </span>

                      <span className="text-slate-600 text-lg font-light">
                        {openSection === "education" ? "−" : "+"}
                      </span>
                    </button>
                    {openSection === "education" && (
                    <div className="pl-7 py-3 space-y-3">
                      {TOPIC_GROUPS.education.map((item) => (
                        <Link 
                          key={item.slug} 
                          href={item.slug === "index" ? "/guide" : `/guide/${item.slug}`}
                          onClick={toggleMenu}
                          className="block text-[17px] font-semibold text-forest"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    )}
                  </motion.div>

                </motion.div>
              </div>

              {/* Footer / CTA */}
              <div className="px-7 pt-4 pb-10 border-t border-slate-100 space-y-4 bg-slate-50/40">
                <Link 
                  href="/login" 
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-3 bg-forest text-white w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-forest/20"
                >
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-center font-bold text-slate-600 uppercase tracking-[0.12em]">
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
