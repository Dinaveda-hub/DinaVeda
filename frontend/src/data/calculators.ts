import { Wind, Flame, Droplets, Zap, Activity, ShieldCheck, HeartPulse, BrainCircuit, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CalculatorOption {
  label: string;
  weights: {
    vata?: number;
    pitta?: number;
    kapha?: number;
    agni?: number;
    ama?: number;
    circadian?: number;
    ojas?: number;
    sleep?: number;
    digestion?: number;
    energy?: number;
  };
}

export interface CalculatorQuestion {
  id: string;
  text: string;
  options: CalculatorOption[];
}

export interface CalculatorResult {
  id: string;
  title: string;
  type: "dosha" | "score" | "imbalance";
  explanation: string;
  ayuPerspective: string;
  recommendations: string[];
}

export interface CalculatorConfig {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  questions: CalculatorQuestion[];
  results: CalculatorResult[];
}

export const CALCULATORS: Record<string, CalculatorConfig> = {
  "dosha-quiz": {
    id: "dosha-quiz",
    title: "Dosha Constitution Quiz",
    description: "Identify your primal Ayurvedic body type (Prakriti) and core biological tendencies.",
    icon: Wind,
    color: "bg-air",
    questions: [
      {
        id: "frame",
        text: "How would you describe your physical frame?",
        options: [
          { label: "Slender, light, long-limbed", weights: { vata: 10 } },
          { label: "Medium, athletic, moderate build", weights: { pitta: 10 } },
          { label: "Large, sturdy, well-developed", weights: { kapha: 10 } }
        ]
      },
      {
        id: "skin",
        text: "How is your skin naturally?",
        options: [
          { label: "Dry, rough, cool, thin", weights: { vata: 10 } },
          { label: "Warm, sensitive, oily in T-zone", weights: { pitta: 10 } },
          { label: "Cool, oily, smooth, thick", weights: { kapha: 10 } }
        ]
      },
      {
        id: "digestion",
        text: "How is your typical appetite and digestion?",
        options: [
          { label: "Variable, irregular, prone to gas", weights: { vata: 10 } },
          { label: "Strong, intense hunger, loud stomach", weights: { pitta: 10 } },
          { label: "Steady, slow, can skip meals easily", weights: { kapha: 10 } }
        ]
      },
      {
        id: "mind",
        text: "How does your mind behave under stress?",
        options: [
          { label: "Anxious, worried, racing thoughts", weights: { vata: 10 } },
          { label: "Irritable, angry, impatient", weights: { pitta: 10 } },
          { label: "Withdraws, stubborn, calm but slow", weights: { kapha: 10 } }
        ]
      }
    ],
    results: [
      {
        id: "vata",
        title: "Vata constitution",
        type: "dosha",
        explanation: "Vata is governed by Air and Space. You are likely creative, energetic, and prone to movement.",
        ayuPerspective: "Vata controls the nervous system and elimination. Balance it with warmth and grounding.",
        recommendations: ["Eat warm, cooked foods", "Keep a regular sleep routine", "Use warming spices like ginger"]
      },
      {
        id: "pitta",
        title: "Pitta constitution",
        type: "dosha",
        explanation: "Pitta is governed by Fire and Water. You are likely sharp, determined, and competitive.",
        ayuPerspective: "Pitta controls transformation and metabolism. Balance it with cooling foods and moderation.",
        recommendations: ["Eat sweet, bitter, and astringent foods", "Avoid intense heat", "Practice meditation"]
      },
      {
        id: "kapha",
        title: "Kapha constitution",
        type: "dosha",
        explanation: "Kapha is governed by Earth and Water. You are likely steady, compassionate, and strong.",
        ayuPerspective: "Kapha provides structure and stability. Balance it with movement and light foods.",
        recommendations: ["Eat light, spicy, and bitter foods", "Engage in daily vigorous exercise", "Avoid daytime napping"]
      }
    ]
  },
  "agni-test": {
    id: "agni-test",
    title: "Agni Strength (Metabolic Fire)",
    description: "Measure the power of your digestive fire and metabolic efficiency.",
    icon: Flame,
    color: "bg-fire",
    questions: [
      {
        id: "hunger",
        text: "Do you feel hungry at regular meal times?",
        options: [
          { label: "Consistent and strong hunger", weights: { agni: 10 } },
          { label: "Variable or intense 'hunger pangs'", weights: { agni: 5 } },
          { label: "Rarely feel hungry or feel heavy", weights: { agni: 2 } }
        ]
      },
      {
        id: "bloating",
        text: "Do you experience bloating after meals?",
        options: [
          { label: "Rarely or never", weights: { agni: 10 } },
          { label: "Sometimes, especially with raw food", weights: { agni: 5 } },
          { label: "Frequently, feels like heavy stomach", weights: { agni: 2 } }
        ]
      },
      {
        id: "bowel",
        text: "How regular and complete is your bowel movement?",
        options: [
          { label: "Regularly every morning, feels complete", weights: { agni: 10 } },
          { label: "Irregular, can skip days, or variable consistency", weights: { agni: 5 } },
          { label: "Sluggish, incomplete, or requires caffeine to start", weights: { agni: 2 } }
        ]
      }
    ],
    results: [
      {
        id: "sama-agni",
        title: "Sama Agni (Balanced Fire)",
        type: "score",
        explanation: "Your metabolic fire is burning perfectly. This is the goal of all Ayurvedic habits.",
        ayuPerspective: "Sama Agni ensures no Ama is formed and Ojas is maximized.",
        recommendations: ["Maintain your current routine", "Eat seasonally", "Practice mindful eating"]
      },
      {
        id: "manda-agni",
        title: "Manda Agni (Low Fire)",
        type: "score",
        explanation: "Your metabolic fire is currently burning low, leading to heaviness and slow digestion.",
        ayuPerspective: "Manda Agni is often caused by Kapha accumulation. It leads to the formation of Ama (toxins).",
        recommendations: ["Sip hot water with ginger", "Avoid cold drinks with meals", "Walk for 15 minutes after eating"]
      },
      {
        id: "tikshna-agni",
        title: "Tikshna Agni (Sharp Fire)",
        type: "score",
        explanation: "Your metabolic fire is intense and can burn through food too quickly, often leading to acidity.",
        ayuPerspective: "Tikshna Agni is linked to high Pitta. It can lead to irritation and inflammation.",
        recommendations: ["Favor cooling foods like cucumber and coconut", "Avoid spicy/acidic foods", "Don't skip meals"]
      }
    ]
  },
  "ama-checker": {
    id: "ama-checker",
    title: "Ama Detector (Toxin Scan)",
    description: "Check for signs of metabolic waste and biological 'sludge' in your system.",
    icon: Droplets,
    color: "bg-water",
    questions: [
      {
        id: "tongue",
        text: "Does your tongue have a white or yellowish coating in the morning?",
        options: [
          { label: "Clear/Pink", weights: { ama: 0 } },
          { label: "Thin white coating", weights: { ama: 5 } },
          { label: "Thick yellow/white coating", weights: { ama: 10 } }
        ]
      },
      {
        id: "energy",
        text: "Do you feel heavy and lethargic when you wake up?",
        options: [
          { label: "Light and refreshed", weights: { ama: 0 } },
          { label: "A bit slow to start", weights: { ama: 5 } },
          { label: "Very heavy, brain fogged", weights: { ama: 10 } }
        ]
      },
      {
        id: "joints",
        text: "Do you experience stiffness or mild aches in your joints, especially in the AM?",
        options: [
          { label: "No, joints feel light and clear", weights: { ama: 0 } },
          { label: "Occasional stiffness that clears with movement", weights: { ama: 6 } },
          { label: "Frequent heaviness or stiffness in multiple joints", weights: { ama: 12 } }
        ]
      }
    ],
    results: [
      {
        id: "low-ama",
        title: "Minimal Ama Accumulation",
        type: "imbalance",
        explanation: "Your system appears relatively clear of metabolic waste. Your Agni is likely efficient.",
        ayuPerspective: "Low Ama is the prerequisite for high Ojas (vitality) and immune strength.",
        recommendations: ["Continue tongue scraping", "Periodic warm water sipping", "Light, seasonal diet"]
      },
      {
        id: "high-ama",
        title: "High Ama Accumulation",
        type: "imbalance",
        explanation: "There are significant signs of undigested metabolic waste in your system.",
        ayuPerspective: "Ama is the root of most biological imbalances. It clogs the Srotas (channels).",
        recommendations: ["Gentle fasting or liquid diet for a day", "Spiced teas (cumin, coriander, fennel)", "Tongue scraping daily"]
      }
    ]
  },
  "daily-rhythm-analyzer": {
    id: "daily-rhythm-analyzer",
    title: "Daily Ayurvedic Rhythm Analyzer",
    description: "Evaluate your alignment with the 24-hour biological clock and identify circadian drift.",
    icon: Activity,
    color: "bg-earth",
    questions: [
      {
        id: "sleep_time",
        text: "What time do you usually go to sleep?",
        options: [
          { label: "Before 10 PM", weights: { circadian: 10, sleep: 10 } },
          { label: "10 PM - 11 PM", weights: { circadian: 7, sleep: 7 } },
          { label: "After 11 PM", weights: { circadian: 2, sleep: 2 } }
        ]
      },
      {
        id: "wake_time",
        text: "What time do you wake up?",
        options: [
          { label: "Before Sunrise (4 AM - 6 AM)", weights: { circadian: 10, energy: 10 } },
          { label: "6 AM - 8 AM", weights: { circadian: 6, energy: 6 } },
          { label: "After 8 AM", weights: { circadian: 2, energy: 2 } }
        ]
      },
      {
        id: "wake_quality",
        text: "Do you wake feeling refreshed and light?",
        options: [
          { label: "Refreshed and ready for movement", weights: { circadian: 10, energy: 10 } },
          { label: "Variable, sometimes groggy", weights: { circadian: 5, energy: 5 } },
          { label: "Always heavy, needs caffeine", weights: { circadian: 1, energy: 1 } }
        ]
      },
      {
        id: "main_meal",
        text: "When do you have your largest meal of the day?",
        options: [
          { label: "Lunch (10 AM - 2 PM)", weights: { circadian: 10, digestion: 10 } },
          { label: "Late Afternoon (2 PM - 6 PM)", weights: { circadian: 5, digestion: 5 } },
          { label: "Late Dinner (After 7 PM)", weights: { circadian: 1, digestion: 1 } }
        ]
      },
      {
        id: "dinner_timing",
        text: "How long is the gap between your final meal and sleep?",
        options: [
          { label: "3+ hours clear space", weights: { circadian: 10, digestion: 10 } },
          { label: "1-2 hours", weights: { circadian: 5, digestion: 5 } },
          { label: "I eat and then sleep shortly after", weights: { circadian: 1, digestion: 1 } }
        ]
      },
      {
        id: "energy_peak",
        text: "When is your natural peak energy phase?",
        options: [
          { label: "Morning (6 AM - 10 AM)", weights: { circadian: 10, energy: 10 } },
          { label: "Night (After 9 PM)", weights: { circadian: 5, energy: 5 } },
          { label: "No clear peak, general fatigue", weights: { circadian: 2, energy: 2 } }
        ]
      }
    ],
    results: [
      {
        id: "high-alignment",
        title: "Chronobiological Alignment",
        type: "score",
        explanation: "Your daily rhythm is excellently synced with the Ayurvedic 24-hour cycle.",
        ayuPerspective: "Aligned living (Dinacharya) creates Ojas and minimizes Ama formation. You are in 'Brahma Muhurta' levels of synchronization.",
        recommendations: ["Maintain current sleep windows", "Optimize seasonal meal shifts", "Deepen Ojas practices"]
      },
      {
        id: "moderate-drift",
        title: "Circadian Drift Detected",
        type: "score",
        explanation: "Your habits are slightly out of phase with natural solar cycles.",
        ayuPerspective: "Sleeping after 11 PM enters the Pitta phase of 'internal processing' which can disrupt deep biological repair.",
        recommendations: ["Shift dinner to 6:30 PM", "Remove blue light after 9 PM", "Morning movement during Kapha time"]
      }
    ]
  }
};
