import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";

export default function AboutPage() {
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

            <main className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-5xl md:text-6xl font-black text-forest tracking-tighter mb-10">About Dinaveda</h1>

                <div className="prose prose-lg prose-slate max-w-none text-slate-600 space-y-8 font-medium leading-relaxed">
                    <p className="text-xl text-forest font-bold">
                        Dinaveda was born from a singular vision: to bridge the ancient, profound wisdom of Ayurveda with the breathtaking capabilities of modern artificial intelligence.
                    </p>

                    <h2 className="text-3xl font-black text-forest tracking-tight mt-16 mb-6">The Genesis</h2>
                    <p>
                        For thousands of years, Ayurveda has mapped the human biological experience using the language of elements—Ether, Air, Fire, Water, and Earth. It understood circadian rhythms, the gut microbiome (Agni), and the subtle energetic forces (Doshas) long before modern science gave them different names.
                    </p>
                    <p>
                        However, accessing this wisdom historically required years of study or consultations with specialized practitioners. Dinaveda exists to democratize this knowledge. By treating the Ayurvedic framework as a highly logical algorithm, we realized it could be digitized.
                    </p>

                    <h2 className="text-3xl font-black text-forest tracking-tight mt-16 mb-6">The Technology</h2>
                    <p>
                        At the core of Dinaveda is the <strong>Neural Wellness Engine</strong>, powered by state-of-the-art LLMs like Gemini. It doesn't just regurgitate generic health advice. It synthesizes your unique 'Prakriti' (baseline constitution) with your 'Vikriti' (current imbalances) to generate real-time, actionable 'Pathya' (lifestyle protocols).
                    </p>
                    <p>
                        Whether you are experiencing a spike in Vata anxiety during a dry autumn, or Pitta inflammation during a high-stress sprint, our engine calculates the exact dietary, behavioral, and routines required to bring you back to baseline.
                    </p>

                    <h2 className="text-3xl font-black text-forest tracking-tight mt-16 mb-6">Our Mission</h2>
                    <p>
                        We believe that chronic illness and burnout are largely symptoms of being profoundly disconnected from natural rhythms. Our mission is to provide you with the tools to "Rewire Your Biology." We want you to stop fighting your natural state and start harmonizing with it.
                    </p>

                    <div className="bg-forest/5 p-10 rounded-[2rem] border border-forest/10 mt-16 text-center">
                        <h3 className="text-2xl font-black text-forest mb-4">Join the Sanctuary</h3>
                        <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                            The journey back to your core begins with a single step. Discover your Prakriti today.
                        </p>
                        <Link href="/welcome" className="inline-block px-8 py-4 rounded-[1.5rem] bg-forest text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-forest/20 hover:-translate-y-1 transition-transform">
                            Take The Assessment
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest border-t border-forest/10 mx-6">
                © {new Date().getFullYear()} Dinaveda Neural Systems
            </footer>
        </div>
    );
}
