import { RawProtocol, ProtocolData } from "./types";
import RAW_PROTOCOLS_JSON from "./protocols.json";

export const RAW_PROTOCOLS = RAW_PROTOCOLS_JSON as unknown as RawProtocol[];

export const PROTOCOL_MAP: Record<string, RawProtocol> = RAW_PROTOCOLS.reduce((acc, p) => {
  acc[p.name] = p;
  return acc;
}, {} as Record<string, RawProtocol>);

export const PROTOCOL_GUIDES: Record<string, ProtocolData> = {
  "digestion-reset": {
    id: "digestion-reset",
    name: "Digestive Fire Reset",
    indications: ["Bloating", "Low appetite", "Heaviness after meals"],
    mechanism: "Stoking the biological fire through controlled thermal input and timed restriction.",
    steps: [
      { title: "Ginger Ignition", desc: "Small slice of fresh ginger with salt 15 mins before meals." },
      { title: "Thermal Hydration", desc: "Sip hot water every hour; no cold liquids for 48 hours." },
      { title: "Monodiary Rest", desc: "Eat simple, spiced yellow mung dal for dinner to rest the gut." }
    ],
    duration: "3-5 Days",
    contraindications: ["Active ulcers", "Severe dehydration", "High fever"]
  },
  "detox-protocol": {
    id: "detox-protocol",
    name: "Ama Clearance Protocol",
    indications: ["Brain fog", "Fatigue", "Waking up stiff"],
    mechanism: "Scraping the channels and improving metabolic clearance via bitter and pungent herbs.",
    steps: [
      { title: "Tongue Scraping", desc: "Perform copper tongue scraping first thing in the morning." },
      { title: "Bitter Tonic", desc: "Warm water with lemon and honey (not boiling) on empty stomach." },
      { title: "Sweat Flush", desc: "Light cardio or sauna to move systemic toxins to the GI tract." }
    ],
    duration: "7 Days",
    contraindications: ["Pregnancy", "Menstruation", "Acute illness"]
  },
  "vata-calming": {
    id: "vata-calming",
    name: "Nervous System Grounding",
    indications: ["Anxiety", "Insomnia", "Restlessness"],
    mechanism: "Applying weight, warmth, and oil to calm the mobile air element in the nerves.",
    steps: [
      { title: "Abhyanga", desc: "Warm sesame oil massage before shower. Focus on feet and head." },
      { title: "Grounding Food", desc: "Heavier, warm root vegetables and well-cooked grains." },
      { title: "Screen Lockout", desc: "No digital devices after 8 PM to ground the light element." }
    ],
    duration: "Ongoing / 14 Days intensive",
    contraindications: ["Active flu", "Digestive heaviness (high Ama)"]
  },
  "kapha-activation": {
    id: "kapha-activation",
    name: "Metabolic Activation",
    indications: ["Weight gain", "Lethargy", "Slow metabolism"],
    mechanism: "Increasing systemic heat and movement to clear stagnant Kapha.",
    steps: [
      { title: "Dry Brushing", desc: "Vigorous skin brushing toward the heart to move the lymph." },
      { title: "Pungent Spices", desc: "Generous use of black pepper, ginger, and chili to ignite the fire." },
      { title: "The Bitter Start", desc: "Eat bitter greens (arugula, kale) at the beginning of every meal." }
    ],
    duration: "Ongoing",
    contraindications: ["Severe inflammation", "High Pitta conditions"]
  }
};
