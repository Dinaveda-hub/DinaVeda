import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
                <h1 className="text-5xl font-black text-forest tracking-tighter mb-4">Terms of Service</h1>
                <p className="text-slate-500 font-bold mb-16 tracking-widest uppercase text-[10px]">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg prose-slate max-w-none text-slate-600 space-y-8 font-medium leading-relaxed">
                    <p>
                        Welcome to Dinaveda. These Terms of Service ("Terms") govern your use of our application, website, and associated AI services (collectively the "Service") operated by Dinaveda Neural Systems.
                    </p>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                    </p>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">2. Medical Disclaimer (CRITICAL)</h2>
                    <div className="p-6 bg-orange-50 border border-orange-200 rounded-[1rem] text-orange-800">
                        <p className="m-0 font-bold">
                            DINAVEDA IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.
                        </p>
                        <p className="mt-4 mb-0 text-sm">
                            The AI-generated insights, Prakriti assessments, and Pathya routines provided by Dinaveda are for informational and educational purposes only. They are based on Ayurvedic frameworks and machine learning algorithms. Never disregard professional medical advice or delay seeking it because of something you have read on Dinaveda. Always consult with your physician before making significant changes to your diet or lifestyle.
                        </p>
                    </div>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">3. User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">4. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, functionalities, UI/UX designs, and proprietary algorithms are and will remain the exclusive property of Dinaveda and its licensors.
                    </p>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">5. Limitation of Liability</h2>
                    <p>
                        In no event shall Dinaveda, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                    </p>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">6. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at <strong>support@dinaveda.com</strong>.
                    </p>
                </div>
            </main>

            <footer className="py-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest border-t border-forest/10 mx-6">
                © {new Date().getFullYear()} Dinaveda Neural Systems
            </footer>
        </div>
    );
}
