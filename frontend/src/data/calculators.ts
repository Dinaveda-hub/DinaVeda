import { Wind, Flame, Droplets, Zap, Activity, ShieldCheck, HeartPulse, BrainCircuit, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PhysiologyWeights = Partial<{
  vata: number;
  pitta: number;
  kapha: number;
  agni: number;
  ama: number;
  circadian: number;
  ojas: number;
  sleep: number;
  digestion: number;
  energy: number;
  stress: number;
}>;

export type CalculatorId =
  | "dosha-quiz"
  | "agni-test"
  | "ama-checker"
  | "daily-rhythm-analyzer";

export type CalculatorResultType =
  | "prakriti"
  | "agni_state"
  | "ama_level"
  | "circadian_alignment";

export interface CalculatorOption {
  label: string;
  weights: PhysiologyWeights;
}

export interface CalculatorQuestion {
  id: string;
  text: string;
  options: CalculatorOption[];
}

export interface CalculatorResult {
  id: string;
  title: string;
  type: CalculatorResultType;
  explanation: string;
  ayuPerspective: string;
  recommendations: string[];
  recommendedProtocol?: string;
  minScore?: number; // declarative selection for threshold-based results
  resultUpdates?: Record<string, number | { type: "add" | "set"; value: number }>; // Specific state side-effects
}

export interface CalculatorConfig {
  id: CalculatorId;
  title: string;
  description: string;
  icon: LucideIcon;
  color: "air" | "fire" | "water" | "earth" | "space";
  questions: CalculatorQuestion[];
  results: CalculatorResult[];
  stateMapping?: Record<string, string>; // Maps weight keys to VedaState keys
  scalingFactor?: number; // To normalize scores (e.g., 30 -> 100)
}

export const CALCULATORS: Record<CalculatorId, CalculatorConfig> = {
  "dosha-quiz": {
    id: "dosha-quiz",
    title: "Dosha Constitution Quiz",
    description: "Identify your primal Ayurvedic body type (Prakriti) and core biological tendencies.",
    icon: Wind,
    color: "air",
    questions: [
      {
        id: "frame",
        text: "Physical Frame",
        options: [
          { label: "Slender, light, long-limbed", weights: { vata: 10 } },
          { label: "Medium, athletic, moderate", weights: { pitta: 10 } },
          { label: "Large, sturdy, well-developed", weights: { kapha: 10 } }
        ]
      },
      {
        id: "skin",
        text: "Skin Texture",
        options: [
          { label: "Dry, rough, cool, thin", weights: { vata: 10 } },
          { label: "Warm, sensitive, active", weights: { pitta: 10 } },
          { label: "Cool, oily, smooth, thick", weights: { kapha: 10 } }
        ]
      },
      {
        id: "digestion",
        text: "Digestion & Appetite",
        options: [
          { label: "Variable, irregular, gas-prone", weights: { vata: 10 } },
          { label: "Strong, intense, sharp hunger", weights: { pitta: 10 } },
          { label: "Steady, slow, can skip meals", weights: { kapha: 10 } }
        ]
      },
      {
        id: "mind",
        text: "Mental Stress Response",
        options: [
          { label: "Anxious, worried, racing", weights: { vata: 10 } },
          { label: "Irritable, angry, impatient", weights: { pitta: 10 } },
          { label: "Withdraws, stubborn, calm", weights: { kapha: 10 } }
        ]
      }
    ],
    results: [
      {
        id: "vata",
        title: "Vata constitution",
        type: "prakriti",
        explanation: "Vata is governed by Air and Space. You are likely creative, energetic, and prone to movement.",
        ayuPerspective: "Vata controls the nervous system and elimination. Balance it with warmth and grounding.",
        recommendations: ["Eat warm, cooked foods", "Keep a regular sleep routine", "Use warming spices like ginger"]
      },
      {
        id: "pitta",
        title: "Pitta constitution",
        type: "prakriti",
        explanation: "Pitta is governed by Fire and Water. You are likely sharp, determined, and competitive.",
        ayuPerspective: "Pitta controls transformation and metabolism. Balance it with cooling foods and moderation.",
        recommendations: ["Eat sweet, bitter, and astringent foods", "Avoid intense heat", "Practice meditation"]
      },
      {
        id: "kapha",
        title: "Kapha constitution",
        type: "prakriti",
        explanation: "Kapha is governed by Earth and Water. You are likely steady, compassionate, and strong.",
        ayuPerspective: "Kapha provides structure and stability. Balance it with movement and light foods.",
        recommendations: ["Eat light, spicy, and bitter foods", "Engage in daily vigorous exercise", "Avoid daytime napping"]
      }
    ],
    stateMapping: {
      vata: "prakriti_vata",
      pitta: "prakriti_pitta",
      kapha: "prakriti_kapha"
    }
  },
  "agni-test": {
    id: "agni-test",
    title: "Agni Strength (Metabolic Fire)",
    description: "Measure the power of your digestive fire and metabolic efficiency.",
    icon: Flame,
    color: "fire",
    questions: [
      {
        id: "hunger",
        text: "Hunger Regularity",
        options: [
          { label: "Consistent and strong hunger", weights: { agni: 10 } },
          { label: "Variable or intense 'pangs'", weights: { agni: 5, pitta: 3 } },
          { label: "Rarely feel hungry or feel heavy", weights: { agni: 2, kapha: 3 } }
        ]
      },
      {
        id: "bloating",
        text: "Post-Meal Comfort",
        options: [
          { label: "Rarely or never bloated", weights: { agni: 10 } },
          { label: "Sometimes, with raw/heavy food", weights: { agni: 5, vata: 3 } },
          { label: "Frequently, feels like heavy sludge", weights: { agni: 2, ama: 5 } }
        ]
      },
      {
        id: "bowel",
        text: "Elimination Rhythm",
        options: [
          { label: "Regular every morning, complete", weights: { agni: 10, digestion: 10 } },
          { label: "Irregular, can skip days", weights: { agni: 5, vata: 4 } },
          { label: "Sluggish, needs help to start", weights: { agni: 2, kapha: 4, ama: 4 } }
        ]
      }
    ],
    results: [
      {
        id: "sama-agni",
        title: "Sama Agni (Balanced Fire)",
        type: "agni_state",
        minScore: 25,
        explanation: "Your metabolic fire is burning perfectly. This is the goal of all Ayurvedic habits.",
        ayuPerspective: "Sama Agni ensures no Ama is formed and Ojas is maximized.",
        recommendations: ["Maintain your current routine", "Eat seasonally", "Practice mindful eating"]
      },
      {
        id: "tikshna-agni",
        title: "Tikshna Agni (Sharp Fire)",
        type: "agni_state",
        minScore: 15,
        explanation: "Your metabolic fire is intense and can burn through food too quickly, often leading to acidity.",
        ayuPerspective: "Tikshna Agni is linked to high Pitta. It can lead to irritation and inflammation.",
        recommendations: ["Favor cooling foods like cucumber and coconut", "Avoid spicy/acidic foods", "Don't skip meals"],
        resultUpdates: { pitta: { type: "add", value: 15 } }
      },
      {
        id: "manda-agni",
        title: "Manda Agni (Low Fire)",
        type: "agni_state",
        minScore: 0,
        explanation: "Your metabolic fire is currently burning low, leading to heaviness and slow digestion.",
        ayuPerspective: "Manda Agni is often caused by Kapha accumulation. It leads to the formation of Ama (toxins).",
        recommendations: ["Sip hot water with ginger", "Avoid cold drinks with meals", "Walk for 15 minutes after eating"],
        recommendedProtocol: "digestion-reset",
        resultUpdates: { ama: { type: "add", value: 10 }, kapha: { type: "add", value: 5 } }
      }
    ],
    stateMapping: { agni: "agni" },
    scalingFactor: 3.33 // 30 -> 100
  },
  "ama-checker": {
    id: "ama-checker",
    title: "Ama Detector (Toxin Scan)",
    description: "Check for signs of metabolic waste and biological 'sludge' in your system.",
    icon: Droplets,
    color: "water",
    questions: [
      {
        id: "tongue",
        text: "Tongue Coating",
        options: [
          { label: "Clear/Pink", weights: { ama: 0 } },
          { label: "Thin white coating", weights: { ama: 5 } },
          { label: "Thick yellow/white coating", weights: { ama: 10, agni: -5 } }
        ]
      },
      {
        id: "energy",
        text: "Morning Vitality",
        options: [
          { label: "Light and refreshed", weights: { ama: 0, ojas: 5 } },
          { label: "A bit slow to start", weights: { ama: 5 } },
          { label: "Very heavy, brain fogged", weights: { ama: 10, agni: -5 } }
        ]
      },
      {
        id: "joints",
        text: "Joint Mobility (AM)",
        options: [
          { label: "Joints feel light and clear", weights: { ama: 0 } },
          { label: "Occasional stiffness - clears soon", weights: { ama: 6, vata: 2 } },
          { label: "Frequent heaviness or stiffness", weights: { ama: 12, kapha: 3 } }
        ]
      }
    ],
    results: [
      {
        id: "low-ama",
        title: "Minimal Ama Accumulation",
        type: "ama_level",
        minScore: 0,
        explanation: "Your system appears relatively clear of metabolic waste. Your Agni is likely efficient.",
        ayuPerspective: "Low Ama is the prerequisite for high Ojas (vitality) and immune strength.",
        recommendations: ["Continue tongue scraping", "Periodic warm water sipping", "Light, seasonal diet"]
      },
      {
        id: "high-ama",
        title: "High Ama Accumulation",
        type: "ama_level",
        minScore: 16,
        explanation: "There are significant signs of undigested metabolic waste in your system.",
        ayuPerspective: "Ama is the root of most biological imbalances. It clogs the Srotas (channels).",
        recommendations: ["Gentle fasting or liquid diet for a day", "Spiced teas (cumin, coriander, fennel)", "Tongue scraping daily"],
        recommendedProtocol: "detox-protocol",
        resultUpdates: { ojas: { type: "add", value: -10 }, energy: { type: "add", value: -10 } }
      }
    ],
    stateMapping: { ama: "ama" },
    scalingFactor: 3.33 // 30 -> 100
  },
  "daily-rhythm-analyzer": {
    id: "daily-rhythm-analyzer",
    title: "Daily Rhythm Analyzer",
    description: "Evaluate your alignment with the 24-hour biological clock and identify circadian drift.",
    icon: Activity,
    color: "earth",
    questions: [
      {
        id: "sleep_time",
        text: "Sleep Timing",
        options: [
          { label: "Before 10 PM", weights: { circadian: 10, sleep: 10 } },
          { label: "10 PM - 11 PM", weights: { circadian: 7, sleep: 7 } },
          { label: "After 11 PM", weights: { circadian: 2, sleep: 2 } }
        ]
      },
      {
        id: "wake_time",
        text: "Wake Timing",
        options: [
          { label: "Before Sunrise (4-6 AM)", weights: { circadian: 10, energy: 10 } },
          { label: "6 AM - 8 AM", weights: { circadian: 6, energy: 6 } },
          { label: "After 8 AM", weights: { circadian: 2, energy: 2 } }
        ]
      },
      {
        id: "wake_quality",
        text: "Wake-up Quality",
        options: [
          { label: "Refreshed and ready", weights: { circadian: 10, ojas: 5 } },
          { label: "Variable, sometimes groggy", weights: { circadian: 5 } },
          { label: "Always heavy, needs caffeine", weights: { circadian: 1, ama: 5 } }
        ]
      },
      {
        id: "main_meal",
        text: "Main Meal Phase",
        options: [
          { label: "Lunch (10 AM - 2 PM)", weights: { circadian: 10, agni: 5 } },
          { label: "Late Afternoon (2-6 PM)", weights: { circadian: 5 } },
          { label: "Late Dinner (After 7 PM)", weights: { circadian: 1, ama: 5 } }
        ]
      },
      {
        id: "dinner_timing",
        text: "Pre-Sleep Gap",
        options: [
          { label: "3+ hours clear space", weights: { circadian: 10, digestion: 10 } },
          { label: "1-2 hours", weights: { circadian: 5, digestion: 5 } },
          { label: "Eat and sleep shortly after", weights: { circadian: 1, ama: 10 } }
        ]
      },
      {
        id: "energy_peak",
        text: "Natural Energy Peak",
        options: [
          { label: "Morning (6 AM - 10 AM)", weights: { circadian: 10, ojas: 5 } },
          { label: "Night (After 9 PM)", weights: { circadian: 5, pitta: 3 } },
          { label: "No clear peak, general fatigue", weights: { circadian: 2, ojas: -5 } }
        ]
      }
    ],
    results: [
      {
        id: "high-alignment",
        title: "Chronobiological Alignment",
        type: "circadian_alignment",
        minScore: 41,
        explanation: "Your daily rhythm is excellently synced with the Ayurvedic 24-hour cycle.",
        ayuPerspective: "Aligned living (Dinacharya) creates Ojas and minimizes Ama formation.",
        recommendations: ["Maintain current sleep windows", "Optimize seasonal meal shifts", "Deepen Ojas practices"]
      },
      {
        id: "moderate-drift",
        title: "Circadian Drift Detected",
        type: "circadian_alignment",
        minScore: 0,
        explanation: "Your habits are slightly out of phase with natural solar cycles.",
        ayuPerspective: "Sleeping after 11 PM enters the Pitta phase which can disrupt biological repair.",
        recommendations: ["Shift dinner to 6:30 PM", "Remove blue light after 9 PM", "Morning movement during Kapha time"],
        recommendedProtocol: "circadian-reset",
        resultUpdates: { stress: { type: "add", value: 10 }, daily_circadian_drag: { type: "set", value: 10 } }
      }
    ],
    stateMapping: { circadian: "circadian" },
    scalingFactor: 1.66 // 60 -> 100
  }
};
