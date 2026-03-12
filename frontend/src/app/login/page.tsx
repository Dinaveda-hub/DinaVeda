"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowRight, Sparkles, ShieldCheck, Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [acceptTos, setAcceptTos] = useState(false);
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

        if (password.length < 8) {
            setMessage({ type: 'error', text: 'Security requirement: Password must be at least 8 characters.' });
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
                    router.push('/dashboard');
                    router.refresh();
                } else {
                    setMessage({ type: 'success', text: 'Sanctuary account created. Please check your email to verify your identity.' });
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                
                if (error) {
                    if (error.message.includes("Email not confirmed")) {
                        setMessage({ type: 'error', text: 'Verification required. Please check your inbox to confirm your email address.' });
                    } else {
                        throw error;
                    }
                    return;
                }

                router.push('/dashboard');
                router.refresh();
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'An unexpected error occurred in the authentication layer.' });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setMessage(null);
        const supabase = createClient();

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to initialize Google authentication.' });
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
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass shadow-premium rounded-[3rem] p-10 md:p-14 border border-white/60 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-[2rem] bg-white text-forest flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform duration-700">
                            <Leaf className="w-10 h-10" />
                        </div>

                        <h1 className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                            Dinaveda Central Login
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
                                        <label htmlFor="full-name" className="sr-only">Full Name</label>
                                        <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="full-name"
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
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="email"
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
                                <label htmlFor="password" className="sr-only">Password</label>
                                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password (min 8 characters)"
                                    className="w-full bg-white/60 border border-slate-100 focus:border-forest/30 focus:ring-4 focus:ring-forest/5 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none transition-all duration-300 shadow-sm"
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex flex-col gap-3 py-2 text-left">
                                {mode === 'signin' && (
                                    <Link 
                                        href="/forgot-password" 
                                        className="text-[10px] font-black uppercase tracking-widest text-forest/60 hover:text-forest transition-colors self-end pr-2"
                                    >
                                        Forgot Password?
                                    </Link>
                                )}

                                {mode === 'signup' && (
                                    <label className="flex items-center gap-3 cursor-pointer group pt-2">
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${acceptTos ? 'bg-forest border-forest text-white' : 'border-slate-300 bg-white group-hover:border-forest/50'}`}>
                                            {acceptTos && <span className="text-xs font-black">✓</span>}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={acceptTos} onChange={(e) => setAcceptTos(e.target.checked)} />
                                        <span className="text-[10px] font-black text-slate-400 leading-tight uppercase tracking-wider">
                                            I agree to the <Link href="/terms" className="text-forest underline underline-offset-4">Terms</Link> & <Link href="/privacy" className="text-forest underline underline-offset-4">Privacy</Link>
                                        </span>
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
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {mode === 'signin' ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-100"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white/40 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Or continue with</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full bg-white border border-slate-100 text-slate-600 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </button>
                        </form>

                        <AnimatePresence>
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`mb-6 p-4 rounded-xl text-[10px] font-black uppercase tracking-wider leading-relaxed border w-full ${message.type === 'success'
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
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> Securely encrypted authentication
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
