import { User, CreditCard, Activity, LucideIcon } from "lucide-react";

export interface FAQItem {
    q: string;
    a: string;
}

export interface FAQCategory {
    category: string;
    icon: LucideIcon;
    questions: FAQItem[];
}

export const FAQ_DATA: FAQCategory[] = [
    {
        category: "Account & Access",
        icon: User,
        questions: [
            { 
                q: "How do I log in with a magic link?", 
                a: "Enter your email on the login page, and we'll send you a link. Click the link in your email to be automatically logged into Dinaveda." 
            },
            { 
                q: "Can I use Dinaveda on multiple devices?", 
                a: "Yes, once you are logged in via your magic link, your session is active on that device. You can request a new link for any other device." 
            }
        ]
    },
    {
        category: "Subscriptions & Premium",
        icon: CreditCard,
        questions: [
            { 
                q: "What is included in Dinaveda Premium?", 
                a: "Premium includes deep physiological patterns, AI-generated custom routines, and advanced circadian insights." 
            },
            { 
                q: "How do I manage my subscription?", 
                a: "You can manage or cancel your subscription at any time through the 'Premium' section in your Profile." 
            }
        ]
    },
    {
        category: "Health Insights",
        icon: Activity,
        questions: [
            { 
                q: "How accurate are the health scores?", 
                a: "Our physiology engine uses deterministic Ayurvedic rules. While highly precise for wellness guidance, it is not a medical diagnostic tool." 
            },
            { 
                q: "How often should I log my signals?", 
                a: "For the most accurate patterns and routines, we recommend logging your signals daily (morning and evening)." 
            },
            {
                q: "How does Dinaveda determine my dosha imbalance?",
                a: "Dinaveda analyzes daily signals such as sleep quality, digestion, stress levels, activity, and seasonal context using a deterministic Ayurvedic physiology model."
            },
            {
                q: "Is Dinaveda a medical diagnosis tool?",
                a: "No. Dinaveda provides wellness guidance based on Ayurvedic principles. It does not diagnose diseases or replace professional medical care."
            },
            {
                q: "Can Dinaveda replace an Ayurvedic doctor?",
                a: "Dinaveda is designed as a daily wellness assistant. It can support healthy habits but does not replace consultation with a qualified Ayurvedic practitioner."
            }
        ]
    }
];
