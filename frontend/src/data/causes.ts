import { Flame, Shield, Wind, Layers } from "lucide-react";
import { CauseData } from "./types";
import { PROTOCOL_GUIDES } from "./protocols";

export const CAUSES: Record<string, CauseData> = {
  "weak-agni": {
    id: "weak-agni",
    name: "Weak Agni (Manda Agni)",
    symptoms: ["Bloating", "Heaviness", "Lethargy"],
    mechanism: "When digestive fire is low, food isn't fully transformed. It ferments and creates gas and toxicity.",
    ayuView: "Agni is the pilot light of health. Modern lifestyle habits like iced water and overeating smother it.",
    icon: Flame,
    color: "orange",
    recommendedProtocol: "digestion-reset" as keyof typeof PROTOCOL_GUIDES
  },
  "ama-accumulation": {
    id: "ama-accumulation",
    name: "Ama (Metabolic Toxins)",
    symptoms: ["Brain Fog", "Fatigue", "Coated Tongue"],
    mechanism: "Undigested food creates a sticky residue (Ama) that clogs biological channels and dulls awareness.",
    ayuView: "Ama is the root of 90% of disease. It acts as an internal sludge that inhibits nutrient flow.",
    icon: Shield,
    color: "slate",
    recommendedProtocol: "detox-protocol" as keyof typeof PROTOCOL_GUIDES
  },
  "vata-aggravation": {
    id: "vata-aggravation",
    name: "Vata Aggravation",
    symptoms: ["Anxiety", "Insomnia", "Dry Skin"],
    mechanism: "Excess air and ether elements cause instability in the nervous system and irregular biological cycles.",
    ayuView: "Vata is the king of doshas; when it becomes unstable due to stress or lack of routine, it disrupts all other systems.",
    icon: Wind,
    color: "indigo",
    recommendedProtocol: "vata-calming" as keyof typeof PROTOCOL_GUIDES
  },
  "kapha-congestion": {
    id: "kapha-congestion",
    name: "Kapha Congestion",
    symptoms: ["Weight Gain", "Slow Metabolism", "Mucus"],
    mechanism: "Excess earth and water elements lead to stagnation, swelling, and reduced metabolic clearance.",
    ayuView: "Kapha provides structure, but when it accumulates, it becomes a heavy dampness that requires heat to clear.",
    icon: Layers,
    color: "emerald",
    recommendedProtocol: "kapha-activation" as keyof typeof PROTOCOL_GUIDES
  },
  "pitta-imbalance": {
    id: "pitta-imbalance",
    name: "Pitta Imbalance",
    symptoms: ["Acidity", "Acne", "Hair Loss"],
    mechanism: "Excess fire and water elements lead to inflammation, heat accumulation, and tissue depletion.",
    ayuView: "Pitta governs transformation and heat; when it overflows, it causes 'Vidagdha' (combustion) in the blood and digestive tract.",
    icon: Flame,
    color: "rose",
    recommendedProtocol: "pitta-soothing" as keyof typeof PROTOCOL_GUIDES
  }
};
