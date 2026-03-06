import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                <h1 className="text-5xl font-black text-forest tracking-tighter mb-4">Privacy Policy</h1>
                <p className="text-slate-500 font-bold mb-16 tracking-widest uppercase text-xs">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg prose-slate max-w-none text-slate-600 space-y-8 font-medium leading-relaxed">
                    <p>
                        At Dinaveda, accessible from [Your URL], one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Dinaveda and how we use it.
                    </p>
                    <p>
                        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>support@dinaveda.com</strong>.
                    </p>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">1. Information We Collect</h2>
                    <p>
                        <strong>Biological Profiles:</strong> When you complete the Prakriti or Vikriti assessments, we collect the responses you provide to generate your Ayurvedic profile.
                    </p>
                    <p>
                        <strong>Account Data:</strong> If you create an account, we collect your name, email address, and authentication credentials through our secure Provider (Supabase).
                    </p>
                    <p>
                        <strong>Usage Logs:</strong> Daily pulse logs, dietary habits, and lifestyle routines you voluntarily input are stored to provide personalized AI insights.
                    </p>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">2. How We Use Your Information</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To provide, operate, and maintain our application.</li>
                        <li>To generate highly personalized AI wellness remedies via the Google Gemini API.</li>
                        <li>To improve, personalize, and expand our platform.</li>
                        <li>To communicate with you regarding updates, security alerts, and support messages.</li>
                    </ul>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">3. AI Processing & Third Parties</h2>
                    <p>
                        Dinaveda utilizes advanced LLMs (Large Language Models) like Gemini to process your wellness logs. When sending data to the AI engine for synthesis, we ensure the prompts are stripped of personally identifiable contact information wherever possible. Your raw data is stored securely in our databases and is never sold to arbitrary third parties.
                    </p>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">4. Data Security</h2>
                    <p>
                        We implement localized caching (`localStorage`) for public assessments and utilize strong, encrypted databases for registered members. We follow industry best practices to protect your data from unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h2 className="text-2xl font-black text-forest tracking-tight mt-12 mb-4">5. Your Rights</h2>
                    <p>
                        You maintain the right to request access to, correction of, or deletion of your personal data at any time. Simply navigate to your Core Settings within the Dinaveda dashboard to wipe your biological configurations, or email support@dinaveda.com to request full account deletion.
                    </p>
                </div>
            </main>

            <footer className="py-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest border-t border-forest/10 mx-6">
                © {new Date().getFullYear()} Dinaveda Neural Systems
            </footer>
        </div>
    );
}
