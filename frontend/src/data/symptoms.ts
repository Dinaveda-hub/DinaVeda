import { 
  Wind, Zap, Brain, Clock, Activity, Scale, 
  Flame, Droplets, Target, Moon, Eye, 
  ThermometerSnowflake, ZapOff, Hourglass, 
  ShieldAlert, UserMinus, Lock, AlertCircle, UtensilsCrossed
} from "lucide-react";
import { SymptomData } from "./types";
import { CAUSES } from "./causes";

export const SYMPTOMS: Record<string, SymptomData> = {
  "bloating": {
    id: "bloating",
    name: "Bloating",
    summary: "Digestive gas and distention caused by irregular air and weak fire.",
    modernDesc: "Modern medicine often views bloating as IBS or food sensitivity, focusing on dietary triggers.",
    ayuDesc: "Ayurveda views bloating as a disturbance of the sub-dosha Samana Vayu, fueled by weak digestive fire.",
    icon: Wind,
    color: "blue",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES
  },
  "low-energy": {
    id: "low-energy",
    name: "Low Energy",
    summary: "Systemic fatigue linked to toxin buildup or energy leakage.",
    modernDesc: "Chronic fatigue is usually linked to nutrient deficiencies, sleep quality, or chronic stress.",
    ayuDesc: "Fatigue is seen as either a depletion of Ojas or a blockage caused by Ama (metabolic toxins).",
    icon: Zap,
    color: "orange",
    cluster: "energy",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES
  },
  "brain-fog": {
    id: "brain-fog",
    name: "Brain Fog",
    summary: "Mental cloudiness caused by heavy residue in the subtle channels.",
    modernDesc: "Mental cloudiness is often attributed to neuro-inflammation or high cognitive load.",
    ayuDesc: "Brain fog is 'mental Ama'—heavy, sticky residue blocking the subtle channels of the mind.",
    icon: Brain,
    color: "indigo",
    cluster: "mental",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES
  },
  "insomnia": {
    id: "insomnia",
    name: "Insomnia",
    summary: "Disrupted sleep cycles due to nervous system over-activity.",
    modernDesc: "Sleep disorders are typically linked to circadian rhythm disruption or chemical imbalances.",
    ayuDesc: "Insomnia is a Vata-Pitta drift where the nervous system is too mobile to enter Kapha-rest.",
    icon: Clock,
    color: "slate",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES
  },
  "anxiety": {
    id: "anxiety",
    name: "Anxiety",
    summary: "Fear response and restlessness moving through the nervous tissue.",
    modernDesc: "Anxiety is a hyper-active flight-or-fight response in the modern nervous system.",
    ayuDesc: "Anxiety is excess Vata (air/ether) moving through the Majja Dhatu (nervous tissue).",
    icon: Activity,
    color: "indigo",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES
  },
  "weight-gain": {
    id: "weight-gain",
    name: "Weight Gain",
    summary: "Metabolic stagnation and excess accumulation of the earth element.",
    modernDesc: "Weight gain is seen as an imbalance of calories vs. expenditure or hormonal shifts.",
    ayuDesc: "Weight accumulation is excess Kapha element and slow Agni (Manda Agni).",
    icon: Scale,
    color: "amber",
    cluster: "metabolism",
    relatedCause: "kapha-congestion" as keyof typeof CAUSES
  },
  // Digestive Core
  "constipation": {
    id: "constipation",
    name: "Constipation",
    summary: "Systemic dryness and downward energy blockage (Apana Vayu).",
    modernDesc: "Often attributed to low fiber, dehydration, or slowed intestinal motility.",
    ayuDesc: "Constipation is a state of 'Koshtha-Stambha'—where excess dryness (Vata) halts the natural movement of waste.",
    icon: Lock,
    color: "blue",
    cluster: "digestive",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES
  },
  "acidity": {
    id: "acidity",
    name: "Acidity",
    summary: "Excessive metabolic heat overflowing from the digestive tract.",
    modernDesc: "Commonly known as GERD or acid reflux, involving stomach acid entering the esophagus.",
    ayuDesc: "Acidity (Amlapitta) is an aggravation of the liquid and hot qualities of Pitta dosha.",
    icon: Flame,
    color: "rose",
    cluster: "digestive",
    relatedCause: "pitta-imbalance" as keyof typeof CAUSES
  },
  "gas": {
    id: "gas",
    name: "Excess Gas",
    summary: "Accumulation of air and fermentation products in the gut.",
    modernDesc: "Usually caused by swallowing air, fiber breakdown, or bacterial fermentation.",
    ayuDesc: "Gas (Adhmana) is a cardinal sign of Vishama Agni—where the digestive flame flickers, causing fermentation.",
    icon: Wind,
    color: "blue",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES
  },
  "nausea": {
    id: "nausea",
    name: "Nausea",
    summary: "Reverse movement of energy due to heavy metabolic stagnation.",
    modernDesc: "A signal from the brain or gut indicating toxicity, infection, or digestive distress.",
    ayuDesc: "Nausea (Hrillas) is often a sign of high Ama and aggravated Kapha blocking the downward flow of energy.",
    icon: AlertCircle,
    color: "emerald",
    cluster: "digestive",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES
  },
  "loss-of-appetite": {
    id: "loss-of-appetite",
    name: "Loss of Appetite",
    summary: "Diminished digestive desire indicating a coating on the sensing channels.",
    modernDesc: "Can be triggered by stress, metabolic slowdown, or hidden systemic inflammation.",
    ayuDesc: "Anorexia (Aruchi) occurs when Ama coats the tongue and sensing channels, extinguishing the desire for food.",
    icon: UtensilsCrossed,
    color: "orange",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES
  },
  "stomach-ache": {
    id: "stomach-ache",
    name: "Stomach Ache",
    summary: "Abdominal discomfort or cramping caused by irregular digestive energy.",
    modernDesc: "General abdominal pain can stem from indigestion, gas, muscle strain, or inflammation.",
    ayuDesc: "Stomach pain (Udara Shula) is often a result of 'Vata-Vibandha'—where trapped air or coldness causes spasms in the digestive tract.",
    icon: Activity,
    color: "blue",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES
  },

  // Energy & Metabolism
  "chronic-fatigue": {
    id: "chronic-fatigue",
    name: "Chronic Fatigue",
    summary: "Deep-seated depletion of vital essence and cellular energy.",
    modernDesc: "Persistent exhaustion that doesn't improve with rest, often linked to mitochondrial function.",
    ayuDesc: "Chronic fatigue is a depletion of Ojas (vitality) or a deep blockage of the channels by Ama.",
    icon: ZapOff,
    color: "slate",
    cluster: "energy",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES
  },
  "post-meal-fatigue": {
    id: "post-meal-fatigue",
    name: "Post-Meal Fatigue",
    summary: "Lethargy following eating due to excessive metabolic burden.",
    modernDesc: "Often called 'food coma', related to blood sugar spikes or parasympathetic over-activation.",
    ayuDesc: "Heaviness after eating (Alasaka) signifies that the Agni is too weak to process the incoming load.",
    icon: Moon,
    color: "amber",
    cluster: "energy",
    relatedCause: "weak-agni" as keyof typeof CAUSES
  },
  "slow-metabolism": {
    id: "slow-metabolism",
    name: "Slow Metabolism",
    summary: "Sluggish transformation of food into energy and tissue.",
    modernDesc: "A lower basal metabolic rate, often influenced by thyroid function or muscle mass.",
    ayuDesc: "Slow metabolism (Manda Agni) is a Kapha-heavy state where cellular conversion is thick and sluggish.",
    icon: Hourglass,
    color: "emerald",
    cluster: "metabolism",
    relatedCause: "kapha-congestion" as keyof typeof CAUSES
  },

  // Mental & Nervous
  "stress": {
    id: "stress",
    name: "Stress",
    summary: "Systemic pressure on the nervous system and biological rhythms.",
    modernDesc: "The body's reaction to pressure, characterized by high cortisol and adrenaline.",
    ayuDesc: "Stress is 'Sahasa'—a sudden strain that depletes Ojas and forces Vata to move erraticly.",
    icon: Brain,
    color: "indigo",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES
  },
  "restlessness": {
    id: "restlessness",
    name: "Restlessness",
    summary: "Inability to find stillness in the mind or body.",
    modernDesc: "Often associated with ADHD, high caffeine intake, or generalized anxiety.",
    ayuDesc: "Restlessness (Chittodvega) is excess Rajas (activity) and Vata moving through the mind channels.",
    icon: Activity,
    color: "indigo",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES
  },
  "poor-concentration": {
    id: "poor-concentration",
    name: "Poor Concentration",
    summary: "Unstable focus and inability to sustain mental attention.",
    modernDesc: "Cognitive fog or 'brain drain' often linked to sleep deprivation or digital overload.",
    ayuDesc: "Mental instability occurs when the 'Sattva' (clarity) of the mind is clouded by Ama or Rajas.",
    icon: Target,
    color: "indigo",
    cluster: "mental",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES
  },

  // Sleep
  "night-waking": {
    id: "night-waking",
    name: "Night Waking",
    summary: "Interrupted sleep cycles, often occurring at specific hours.",
    modernDesc: "Frequent awakenings, potentially linked to sleep apnea or cortisol spikes.",
    ayuDesc: "Waking between 2 AM and 6 AM is typically a Vata disturbance; waking between 10 PM and 2 AM is Pitta.",
    icon: Eye,
    color: "slate",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES
  },
  "restless-sleep": {
    id: "restless-sleep",
    name: "Restless Sleep",
    summary: "Fragmented sleep that leaves one feeling unrefreshed.",
    modernDesc: "Non-restorative sleep, often characterized by tossing and turning.",
    ayuDesc: "Restless sleep (Alpa Nidra) indicates that the Guna of 'Stability' (Tamoguna) is insufficient.",
    icon: Clock,
    color: "slate",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES
  },

  // Skin & Hair
  "hair-loss": {
    id: "hair-loss",
    name: "Hair Loss",
    summary: "Premature thinning or loss of hair due to systemic heat.",
    modernDesc: "Often hormonal (androgenic) or related to nutrient deficiencies and stress.",
    ayuDesc: "Hair loss (Khalitya) is primarily seen as excess Pitta heat 'burning' the hair follicles.",
    icon: UserMinus,
    color: "rose",
    cluster: "skin",
    relatedCause: "pitta-imbalance" as keyof typeof CAUSES
  },
  "dry-skin": {
    id: "dry-skin",
    name: "Dry Skin",
    summary: "Lack of lubrication and moisture in the external tissues.",
    modernDesc: "A disruption of the skin's lipid barrier, often caused by environment or aging.",
    ayuDesc: "Dry skin indicates a lack of 'Snehana' (oiliness) and an excess of the 'Ruksha' (dry) quality of Vata.",
    icon: Droplets,
    color: "blue",
    cluster: "skin",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES
  },
  "acne": {
    id: "acne",
    name: "Acne",
    summary: "Inflammation of the skin channels due to toxic heat.",
    modernDesc: "Hormonal shifts leading to sebum overproduction and bacterial infection.",
    ayuDesc: "Acne (Yuvana-pidaka) is an eruption of Pitta-heated blood (Rakta) and Ama in the skin pores.",
    icon: ShieldAlert,
    color: "rose",
    cluster: "skin",
    relatedCause: "pitta-imbalance" as keyof typeof CAUSES
  },

  // Fluid
  "water-retention": {
    id: "water-retention",
    name: "Water Retention",
    summary: "Systemic swelling or heaviness due to fluid stagnation.",
    modernDesc: "Edema caused by salt intake, hormonal shifts, or lymphatic stagnation.",
    ayuDesc: "Swelling (Shotha) is a Kapha-related accumulation of heavy water and earth elements.",
    icon: Droplets,
    color: "emerald",
    cluster: "metabolism",
    relatedCause: "kapha-congestion" as keyof typeof CAUSES
  },
  "cold-hands-feet": {
    id: "cold-hands-feet",
    name: "Cold Hands & Feet",
    summary: "Reduced circulation and lack of metabolic heat in the extremities.",
    modernDesc: "Often related to Raynaud's or low blood pressure and poor circulation.",
    ayuDesc: "Lack of 'Ushna' (heat) at the extremities indicates that Agni is too weak to push warmth to the periphery.",
    icon: ThermometerSnowflake,
    color: "blue",
    cluster: "energy",
    relatedCause: "weak-agni" as keyof typeof CAUSES
  }
};
