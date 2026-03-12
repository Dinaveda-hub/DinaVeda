import { Wind, Zap, Brain, Clock, Activity, Scale } from "lucide-react";
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
    relatedCause: "kapha-congestion" as keyof typeof CAUSES
  }
};
