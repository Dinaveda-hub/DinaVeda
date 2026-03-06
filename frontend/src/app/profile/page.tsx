"use client";
// Force rebuild for Settings & Profile enhancements

import { useState, useEffect } from "react";
import { User, Settings as SettingsIcon, Bell, Shield, LogOut, ChevronRight, Binary, Heart, X, Zap, Lock, FileText, Activity } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import GoalSelector from "@/components/GoalSelector";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { syncNotificationTags } from "@/services/notificationService";


export default function SettingsPage() {
    const [activeModal, setActiveModal] = useState<{ title: string, content: any } | null>(null);
    const [userName, setUserName] = useState<string>("Seeker");
    const [notifications, setNotifications] = useState({
        pulseAudits: true,
        circadianReminders: false,
        routineUpdates: true
    });

    const router = useRouter();
    const { state } = usePhysiologyState();

    useEffect(() => {
        // Load notification settings
        const saved = localStorage.getItem("veda_notifications");
        if (saved) setNotifications(JSON.parse(saved));

        const initProfile = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserName(user.user_metadata?.full_name || user.email || "Seeker");
            }
        };
        initProfile();
    }, []);

    const saveNotifications = (newSettings: any) => {
        setNotifications(newSettings);
        localStorage.setItem("veda_notifications", JSON.stringify(newSettings));
        syncNotificationTags(newSettings);
    };

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();

        // Clear local bio-data so new users start completely fresh
        localStorage.removeItem("prakriti_result");
        localStorage.removeItem("vikriti_result");

        router.push("/login");
        router.refresh();
    };

    interface SettingItem {
        name: string;
        icon: any;
        detail: string;
        link?: string;
        action?: () => void;
    }

    interface Section {
        title: string;
        items: SettingItem[];
    }

    const NotificationToggle = ({ label, description, enabled, onChange }: { label: string, description: string, enabled: boolean, onChange: (val: boolean) => void }) => (
        <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
                <p className="font-black text-forest tracking-tight leading-none mb-1">{label}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{description}</p>
            </div>
            <button
                onClick={() => onChange(!enabled)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${enabled ? 'bg-forest' : 'bg-slate-200'}`}
            >
                <motion.div
                    animate={{ x: enabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                />
            </button>
        </div>
    );

    const sections: Section[] = [
        {
            title: "Account",
            items: [
                {
                    name: "Linked Identity",
                    icon: Binary,
                    detail: userName,
                    action: () => setActiveModal({
                        title: "Account Details",
                        content: (
                            <div className="space-y-4">
                                <p className="text-sm font-bold text-slate-600 leading-relaxed">
                                    Identity synchronized under the core essence of <strong className="text-forest tracking-tighter">{userName}</strong>.
                                </p>
                            </div>
                        )
                    })
                }
            ]
        },
        {
            title: "System Parameters",
            items: [
                {
                    name: "Neural Notifications",
                    icon: Bell,
                    detail: notifications.pulseAudits ? "Pulse audit reminders active" : "Notifications disabled",
                    action: () => setActiveModal({
                        title: "Neural Notifications",
                        content: (
                            <div className="space-y-6">
                                <NotificationToggle
                                    label="Pulse Audit Reminders"
                                    description="Receive alerts for daily biological synchronization."
                                    enabled={notifications.pulseAudits}
                                    onChange={(val) => saveNotifications({ ...notifications, pulseAudits: val })}
                                />
                                <NotificationToggle
                                    label="Circadian Sync"
                                    description="Alerts for optimal sleep and wake windows."
                                    enabled={notifications.circadianReminders}
                                    onChange={(val) => saveNotifications({ ...notifications, circadianReminders: val })}
                                />
                                <NotificationToggle
                                    label="Routine Updates"
                                    description="Notifications for AI-personalized routine recalibrations."
                                    enabled={notifications.routineUpdates}
                                    onChange={(val) => saveNotifications({ ...notifications, routineUpdates: val })}
                                />
                            </div>
                        )
                    })
                },
                {
                    name: "Biological Logs",
                    icon: Activity,
                    detail: "View your rhythmic pulse history",
                    link: "/profile/history"
                },
            ]
        },
        {
            title: "Health & Vitality",
            items: [
                {
                    name: "Primary Health Goal",
                    icon: Zap,
                    detail: "Personalize your daily guidance",
                    action: () => setActiveModal({
                        title: "Select Your Primary Goal",
                        content: <GoalSelector />
                    })
                }
            ]
        },
        {
            title: "Privacy & Trust",
            items: [
                {
                    name: "Data Security & Compliance",
                    icon: Shield,
                    detail: "GDPR & HIPAA standards",
                    action: () => setActiveModal({
                        title: "Data Security",
                        content: (
                            <div className="space-y-4">
                                <p className="text-sm font-bold text-slate-600 leading-relaxed">
                                    As a wellness application handling highly sensitive biometric and personal data, Dinaveda employs strictly regulated security protocols.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                        <p className="text-sm text-slate-600"><strong>HIPAA Alignment:</strong> All health records, sleep logs, and Prakriti analyses are encrypted at rest and in transit.</p>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                        <p className="text-sm text-slate-600"><strong>GDPR Compliance:</strong> You maintain full sovereign ownership over your data, including the right to wipe your profile from the neural core permanently.</p>
                                    </li>
                                </ul>
                            </div>
                        )
                    })
                },
                {
                    name: "Privacy Policy",
                    icon: Lock,
                    detail: "How we protect your data",
                    action: () => setActiveModal({
                        title: "Privacy Policy",
                        content: <p className="text-sm font-bold text-slate-600 leading-relaxed">Your data is strictly yours. We deliberately do not sell, share, or expose your biological identity, sleep patterns, or dietary logs to any third-party marketing agencies. All AI analysis is conducted dynamically within an isolated, anonymized sandbox environment.</p>
                    })
                },
                {
                    name: "Terms of Service",
                    icon: FileText,
                    detail: "Usage agreements and guidelines",
                    action: () => setActiveModal({
                        title: "Terms of Service",
                        content: <p className="text-sm font-bold text-slate-600 leading-relaxed">Dinaveda is designed as an educational wellness and lifestyle tool. It is not a substitute for professional clinical medical advice, diagnosis, or treatment. Wait to consult with a qualified healthcare provider before making significant behavioral lifestyle adjustments.</p>
                    })
                },
            ]
        }
    ];

    const handleClick = (item: SettingItem) => {
        if (item.action) {
            item.action();
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAF9] relative overflow-hidden p-6 md:p-12 pb-32">
            {/* Background elements - Optimized */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-60 -mt-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-60 -mb-60" />

            <div className="max-w-2xl mx-auto relative z-10">
                <header className="mb-16">
                    <div className="w-12 h-1 bg-forest mb-6 rounded-full" />
                    <h1 className="text-5xl font-black text-forest tracking-tighter transition-all hover:tracking-normal cursor-default">Settings</h1>
                    <p className="text-slate-400 mt-2 font-bold uppercase tracking-[0.2em] text-[10px]">Customize your Veda experience</p>
                </header>

                <div className="space-y-12">
                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-[10px] font-black text-forest uppercase tracking-[0.3em] mb-6 ml-2">{section.title}</h2>
                            <div className="glass rounded-[2.5rem] overflow-hidden border border-white/40 shadow-premium">
                                {section.items.map((item, i) => {
                                    const Icon = item.icon;
                                    const Component: any = item.link ? Link : 'button';
                                    const props = item.link ? { href: item.link } : { onClick: () => handleClick(item) };

                                    return (
                                        <Component
                                            key={i}
                                            {...props}
                                            className="w-full flex items-center justify-between p-7 hover:bg-forest/5 transition-all duration-500 border-b border-forest/5 last:border-0 group active:scale-[0.98]"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-3xl bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-all duration-500 shadow-sm border border-forest/5">
                                                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-black text-forest text-lg tracking-tight leading-none mb-1">{item.name}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.detail}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                                        </Component>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <button onClick={handleSignOut} className="w-full flex items-center gap-5 p-7 glass rounded-[2.5rem] border border-rose-100/50 text-rose-600 font-black shadow-premium hover:bg-rose-50 transition-all duration-500 active:scale-[0.98] group">
                        <div className="w-14 h-14 rounded-3xl bg-rose-50 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500 border border-rose-100">
                            <LogOut className="w-6 h-6 transition-transform group-hover:scale-110" />
                        </div>
                        <div className="text-left">
                            <p className="text-lg tracking-tight leading-none mb-1">Sign Out</p>
                            <p className="text-[10px] uppercase tracking-widest text-rose-400 opacity-60">Disconnect from Veda Neural Core</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveModal(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/20 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/60"
                        >
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                <h3 className="font-black text-forest tracking-tight">{activeModal.title}</h3>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 hover:text-slate-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-8">
                                {activeModal.content}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Gating Logic Removed */}
        </div>
    );
}
