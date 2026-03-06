"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowRight, Sparkles, ShieldCheck, Mail, Lock, User } from 'lucide-react';

export default function LoginPage() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [acceptTos, setAcceptTos] = useState(false);
    const [keepLogged, setKeepLogged] = useState(true);
    const router = useRouter();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const supabase = createClient();

        if (mode === 'signup' && !acceptTos) {
            setMessage({ type: 'error', text: 'You must accept the Terms of Service to enter the Sanctuary.' });
            setLoading(false);
            return;
        }

        try {
            if (mode === 'signup') {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name
                        },
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                });
                if (error) throw error;

                if (data.session) {
                    router.push('/');
                    router.refresh();
                } else {
                    setMessage({ type: 'success', text: 'Account created. Check your email to verify your account.' });
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;

                router.push('/');
                router.refresh();
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background relative flex items-center justify-center p-6 font-sans overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -ml-40" />

            {/* Main Auth Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass shadow-premium rounded-[3rem] p-10 md:p-14 border border-white/60 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-[2rem] bg-white text-forest flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform duration-700">
                            <Leaf className="w-10 h-10" />
                        </div>

                        <h1 className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                            Dinaveda
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-black text-forest tracking-tighter mb-4 leading-none">
                            {mode === 'signin' ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-sm font-bold text-slate-400 mb-10 text-balance leading-relaxed uppercase tracking-wide">
                            {mode === 'signin' ? "Sign in to your health dashboard" : "Join Dinaveda to track your rhythms"}
                        </p>

                        <form onSubmit={handleAuth} className="w-full relative z-10 space-y-4 mb-8">
                            <AnimatePresence>
                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="relative"
                                    >
                                        <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            required={mode === 'signup'}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Full Name"
                                            className="w-full bg-white/60 border border-slate-100 focus:border-forest/30 focus:ring-4 focus:ring-forest/5 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none transition-all duration-300 shadow-sm"
                                            disabled={loading}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full bg-white/60 border border-slate-100 focus:border-forest/30 focus:ring-4 focus:ring-forest/5 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none transition-all duration-300 shadow-sm"
                                    disabled={loading}
                                />
                            </div>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full bg-white/60 border border-slate-100 focus:border-forest/30 focus:ring-4 focus:ring-forest/5 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none transition-all duration-300 shadow-sm"
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex flex-col gap-3 py-2 text-left">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${keepLogged ? 'bg-forest border-forest text-white' : 'border-slate-300 bg-white group-hover:border-forest/50'}`}>
                                        {keepLogged && <span className="text-xs font-black">✓</span>}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={keepLogged} onChange={(e) => setKeepLogged(e.target.checked)} />
                                    <span className="text-xs font-bold text-slate-400">Keep me logged in</span>
                                </label>

                                {mode === 'signup' && (
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${acceptTos ? 'bg-forest border-forest text-white' : 'border-slate-300 bg-white group-hover:border-forest/50'}`}>
                                            {acceptTos && <span className="text-xs font-black">✓</span>}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={acceptTos} onChange={(e) => setAcceptTos(e.target.checked)} />
                                        <span className="text-xs font-bold text-slate-400 leading-tight">I agree to the <a href="#" className="text-forest underline underline-offset-4">Terms</a> & <a href="#" className="text-forest underline underline-offset-4">Privacy</a></span>
                                    </label>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-forest text-white py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-forest/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 group/btn mt-4"
                            >
                                {loading ? (
                                    <>
                                        <Sparkles className="w-4 h-4 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        {mode === 'signin' ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <AnimatePresence>
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`mb-6 p-4 rounded-xl text-xs font-bold leading-relaxed border w-full ${message.type === 'success'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                        : 'bg-red-50 text-red-700 border-red-100'
                                        }`}
                                >
                                    {message.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="button"
                            onClick={() => {
                                setMode(mode === 'signin' ? 'signup' : 'signin');
                                setMessage(null);
                            }}
                            className="text-xs font-black uppercase tracking-widest text-forest/70 hover:text-forest transition-colors"
                        >
                            {mode === 'signin' ? "Don't have an account? Sign up" : "Already have an account? Sign In"}
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center px-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-3 h-3" /> Military-grade encrypted
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
