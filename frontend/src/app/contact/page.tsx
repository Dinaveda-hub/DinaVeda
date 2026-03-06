import Link from "next/link";
import { Leaf, ArrowLeft, Mail, MapPin, Sparkles } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-[#FAF9F6] text-slate-800 min-h-screen relative font-sans selection:bg-forest/20 selection:text-forest">
            <nav className="p-6 sticky top-0 z-50 flex justify-between items-center bg-[#FAF9F6]/80 backdrop-blur-md border-b border-forest/5">
                <Link href="/welcome" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-[0.8rem] bg-forest flex items-center justify-center text-white shadow-md group-hover:bg-forest/90 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-black text-forest text-sm tracking-widest uppercase ml-2">Back</span>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="font-black text-forest text-xl tracking-tighter">Dinaveda</span>
                    <Leaf className="w-5 h-5 text-forest" />
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-24 min-h-[70vh]">
                <h1 className="text-5xl md:text-7xl font-black text-forest tracking-tighter mb-8">Reach the Sanctuary</h1>
                <p className="text-xl text-slate-500 font-medium mb-16 max-w-2xl leading-relaxed">
                    Experiencing an algorithmic imbalance? Have questions about your Prakriti baseline? Our support team is here to assist you in finding your true north.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white p-10 rounded-[3rem] shadow-premium border border-forest/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-forest/10 transition-colors" />
                        <div className="w-16 h-16 bg-emerald-50 text-forest rounded-[1.5rem] flex items-center justify-center mb-8 relative z-10">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-forest tracking-tight mb-2">Email Support</h3>
                        <p className="text-slate-500 font-medium mb-8">
                            Response times are typically within 24-48 hours. Our team is fully distributed across global timezones.
                        </p>
                        <a href="mailto:support@dinaveda.com" className="inline-flex items-center gap-3 text-forest font-black uppercase text-xs tracking-[0.2em] bg-emerald-50 px-6 py-4 rounded-full hover:bg-forest hover:text-white transition-colors cursor-pointer border border-forest/10">
                            support@dinaveda.com
                        </a>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] shadow-premium border border-forest/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors" />
                        <div className="w-16 h-16 bg-amber-50 text-gold rounded-[1.5rem] flex items-center justify-center mb-8 relative z-10">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-forest tracking-tight mb-2">Global Operations</h3>
                        <p className="text-slate-500 font-medium mb-8">
                            We are a borderless entity, merging technologists from the West with ancient scholars from the East.
                        </p>
                        <div className="inline-flex items-center gap-3 text-slate-500 font-black uppercase text-xs tracking-[0.2em] bg-slate-50 px-6 py-4 rounded-full border border-slate-200">
                            Remote First
                        </div>
                    </div>
                </div>

                <div className="mt-20 p-12 glass rounded-[3rem] shadow-sm border border-forest/10 text-center flex flex-col items-center">
                    <Sparkles className="w-8 h-8 text-gold mb-6" />
                    <h3 className="text-3xl font-black text-forest mb-4">Feedback & Research</h3>
                    <p className="text-slate-500 font-medium max-w-lg mb-8">
                        Are you an Ayurvedic practitioner or AI researcher? We'd love to hear your thoughts on improving the neural algorithms that drive Dinaveda.
                    </p>
                    <a href="mailto:support@dinaveda.com" className="px-10 py-5 rounded-[2rem] bg-forest text-white font-black text-xs uppercase tracking-widest hover:bg-forest/90 transition-all shadow-xl shadow-forest/30 active:scale-95">
                        Collaborate With Us
                    </a>
                </div>
            </main>

            <footer className="py-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest border-t border-forest/10 mx-6">
                © {new Date().getFullYear()} Dinaveda Neural Systems
            </footer>
        </div>
    );
}
