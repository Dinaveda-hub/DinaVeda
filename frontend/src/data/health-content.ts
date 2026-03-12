import { Wind, Flame, Droplets, Zap, Shield, Sparkles, Brain, Activity, Clock, Scale, Thermometer, Sun, Moon, Utensils, Droplet, Heart, ZapOff, Layers } from "lucide-react";

export interface SymptomData {
  id: string;
  name: string;
  modernDesc: string;
  ayuDesc: string;
  icon: any;
  color: string;
  relatedCause?: string;
}

export interface DoshaData {
  id: string;
  name: string;
  elements: string;
  role: string;
  color: string;
}

export interface CombinationContent {
  title: string;
  intro: string;
  whyItHappens: string;
  signs: string[];
  protocol: {
    title: string;
    desc: string;
  }[];
}

export interface CauseData {
  id: string;
  name: string;
  symptoms: string[];
  mechanism: string;
  ayuView: string;
  icon: any;
  color: string;
  recommendedProtocol: string;
}

export interface ProtocolData {
  id: string;
  name: string;
  indications: string[];
  mechanism: string;
  steps: {
    title: string;
    desc: string;
  }[];
  duration: string;
  contraindications: string[];
}

export interface RoutineData {
  id: string;
  name: string;
  category: "daily" | "seasonal" | "dosha";
  blocks: {
    time: string;
    activity: string;
    description: string;
    icon: any;
  }[];
}

export interface RawProtocol {
  name: string;
  module: string;
  category: string;
  time_of_day?: string;
  duration?: string;
  variables: Record<string, number>;
  instructions: string;
  contraindications: string[];
  tags: string[];
  is_premium: boolean;
}

import RAW_PROTOCOLS_JSON from "./protocols.json";
export const RAW_PROTOCOLS = RAW_PROTOCOLS_JSON as any[];
export const PROTOCOL_MAP = RAW_PROTOCOLS.reduce((acc, p) => {
  acc[p.name] = p;
  return acc;
}, {} as Record<string, any>);

export const SYMPTOMS: Record<string, SymptomData> = {
  "bloating": {
    id: "bloating",
    name: "Bloating",
    modernDesc: "Modern medicine often views bloating as IBS or food sensitivity, focusing on dietary triggers.",
    ayuDesc: "Ayurveda views bloating as a disturbance of the sub-dosha Samana Vayu, fueled by weak digestive fire.",
    icon: Wind,
    color: "text-blue-500",
    relatedCause: "weak-agni"
  },
  "low-energy": {
    id: "low-energy",
    name: "Low Energy",
    modernDesc: "Chronic fatigue is usually linked to nutrient deficiencies, sleep quality, or chronic stress.",
    ayuDesc: "Fatigue is seen as either a depletion of Ojas or a blockage caused by Ama (metabolic toxins).",
    icon: Zap,
    color: "text-orange-500",
    relatedCause: "ama-accumulation"
  },
  "brain-fog": {
    id: "brain-fog",
    name: "Brain Fog",
    modernDesc: "Mental cloudiness is often attributed to neuro-inflammation or high cognitive load.",
    ayuDesc: "Brain fog is 'mental Ama'—heavy, sticky residue blocking the subtle channels of the mind.",
    icon: Brain,
    color: "text-indigo-500",
    relatedCause: "ama-accumulation"
  },
  "insomnia": {
    id: "insomnia",
    name: "Insomnia",
    modernDesc: "Sleep disorders are typically linked to circadian rhythm disruption or chemical imbalances.",
    ayuDesc: "Insomnia is a Vata-Pitta drift where the nervous system is too mobile to enter Kapha-rest.",
    icon: Clock,
    color: "text-slate-600",
    relatedCause: "vata-aggravation"
  },
  "anxiety": {
    id: "anxiety",
    name: "Anxiety",
    modernDesc: "Anxiety is a hyper-active flight-or-fight response in the modern nervous system.",
    ayuDesc: "Anxiety is excess Vata (air/ether) moving through the Majja Dhatu (nervous tissue).",
    icon: Activity,
    color: "text-indigo-600",
    relatedCause: "vata-aggravation"
  },
  "weight-gain": {
    id: "weight-gain",
    name: "Weight Gain",
    modernDesc: "Weight gain is seen as an imbalance of calories vs. expenditure or hormonal shifts.",
    ayuDesc: "Weight accumulation is excess Kapha element and slow Agni (Manda Agni).",
    icon: Scale,
    color: "text-amber-600",
    relatedCause: "kapha-congestion"
  }
};

export const DOSHAS: Record<string, DoshaData> = {
  "vata": {
    id: "vata",
    name: "Vata",
    elements: "Space + Air",
    role: "Movement & Nervous System",
    color: "text-indigo-500"
  },
  "pitta": {
    id: "pitta",
    name: "Pitta",
    elements: "Fire + Water",
    role: "Transformation & Metabolism",
    color: "text-orange-500"
  },
  "kapha": {
    id: "kapha",
    name: "Kapha",
    elements: "Water + Earth",
    role: "Structure & Immunity",
    color: "text-emerald-500"
  }
};

export const CAUSES: Record<string, CauseData> = {
  "weak-agni": {
    id: "weak-agni",
    name: "Weak Agni (Manda Agni)",
    symptoms: ["Bloating", "Heaviness", "Lethargy"],
    mechanism: "When digestive fire is low, food isn't fully transformed. It ferments and creates gas and toxicity.",
    ayuView: "Agni is the pilot light of health. Modern lifestyle habits like iced water and overeating smother it.",
    icon: Flame,
    color: "text-orange-500",
    recommendedProtocol: "digestion-reset"
  },
  "ama-accumulation": {
    id: "ama-accumulation",
    name: "Ama (Metabolic Toxins)",
    symptoms: ["Brain Fog", "Fatigue", "Coated Tongue"],
    mechanism: "Undigested food creates a sticky residue (Ama) that clogs biological channels and dulls awareness.",
    ayuView: "Ama is the root of 90% of disease. It acts as an internal sludge that inhibits nutrient flow.",
    icon: Shield,
    color: "text-slate-500",
    recommendedProtocol: "detox-protocol"
  },
  "vata-aggravation": {
    id: "vata-aggravation",
    name: "Vata Aggravation",
    symptoms: ["Anxiety", "Insomnia", "Dry Skin"],
    mechanism: "Excess air and ether elements cause instability in the nervous system and irregular biological cycles.",
    ayuView: "Vata is the king of doshas; when it becomes unstable due to stress or lack of routine, it disrupts all other systems.",
    icon: Wind,
    color: "text-indigo-500",
    recommendedProtocol: "vata-calming"
  },
  "kapha-congestion": {
    id: "kapha-congestion",
    name: "Kapha Congestion",
    symptoms: ["Weight Gain", "Slow Metabolism", "Mucus"],
    mechanism: "Excess earth and water elements lead to stagnation, swelling, and reduced metabolic clearance.",
    ayuView: "Kapha provides structure, but when it accumulates, it becomes a heavy dampness that requires heat to clear.",
    icon: Layers,
    color: "text-emerald-500",
    recommendedProtocol: "kapha-activation"
  }
};

export const PROTOCOLS: Record<string, ProtocolData> = {
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
  }
};

export const ROUTINES: Record<string, RoutineData> = {
  "morning-routine": {
    id: "morning-routine",
    name: "Sattva Morning Routine",
    category: "daily",
    blocks: [
      { time: "5:00AM - 6:00AM", activity: "Brahma Muhurta", description: "Waking before sunrise to capture raw prana.", icon: Sun },
      { time: "6:00AM - 6:30AM", activity: "Purification", description: "Tongue scraping, oil pulling, and elimination.", icon: Droplet },
      { time: "6:30AM - 7:30AM", activity: "Movement", description: "Yoga and breathwork to circulate energy.", icon: Activity }
    ]
  },
  "vata-daily": {
    id: "vata-daily",
    name: "Vata Balancing Lifestyle",
    category: "dosha",
    blocks: [
      { time: "7:00AM", activity: "Warmth", description: "Warm breakfast, spiced with cinnamon.", icon: Utensils },
      { time: "1:00PM", activity: "Grounding", description: "Largest meal; warm and slightly heavy.", icon: Utensils },
      { time: "9:00PM", activity: "Oil & Rest", description: "Foot massage and early bed for nerve repair.", icon: Moon }
    ]
  }
};

export const COMBINATIONS: Record<string, CombinationContent> = {
  "bloating-vata": {
    title: "Vata-Type Bloating: Irregular Air & Tension",
    intro: "Vata-type bloating is characterized by irregular gas, sudden distention, and a feeling of 'cold' in the gut.",
    whyItHappens: "When Vata (Air) is high, the colon becomes dry and mobile. Like wind blowing out a candle, it extinguishes the digestive fire, leading to fermentation and sudden gas.",
    signs: [
      "Bloating that fluctuates throughout the day",
      "Tendency toward constipation or dryness",
      "Worsens with raw food or cold salads",
      "Accompanying anxiety or cold hands/feet"
    ],
    protocol: [
      { title: "Grounded Eating", desc: "Eat at the exact same time every day to train the nervous system." },
      { title: "Warmth is Medicine", desc: "Always eat cooked food; add ghee and ginger to lubricate the gut." },
      { title: "CCF Tea", desc: "Sip Cumin, Coriander, and Fennel tea to ground the wind element." }
    ]
  },
  "bloating-pitta": {
    title: "Pitta-Type Bloating: Heat & Fermentation",
    intro: "Pitta-type bloating feels 'hot' and is often accompanied by acidity, thirst, or irritability.",
    whyItHappens: "When Pitta (Fire) is too high, it doesn't just digest; it burns. This creates an acidic environment where food ferments quickly, creating sharp, pressurized gas.",
    signs: [
      "Bloating followed by acidity or heartburn",
      "Soft or frequent stools",
      "Worsens with spicy foods or caffeine",
      "Feeling overheated or irritable after eating"
    ],
    protocol: [
      { title: "Cooling Spices", desc: "Use fennel, mint, and cardamom to soothe the internal heat." },
      { title: "Aloe Vera", desc: "2 tablespoons of pure aloe juice before meals helps coat the stomach lining." },
      { title: "Avoid Nightshades", desc: "Reduce tomatoes, peppers, and garlic which 'fan the flames'." }
    ]
  },
  "bloating-kapha": {
    title: "Kapha-Type Bloating: Sluggishness & Heaviness",
    intro: "Kapha bloating feels heavy, dull, and long-lasting—often lasting for hours after a meal.",
    whyItHappens: "Kapha (Earth/Water) is naturally slow. When it aggregates in the gut, it creates a 'swampy' environment where the fire is smothered by sheer volume or mucus.",
    signs: [
      "Feeling heavy and lethargic for hours after eating",
      "Worsens with dairy, wheat, or sugar",
      "The tongue often has a thick white coating",
      "Slow, sluggish metabolism"
    ],
    protocol: [
      { title: "Spice Ignition", desc: "Use black pepper, ginger, and cinnamon to 'dry out' the swamp." },
      { title: "Light Dinners", desc: "Eat a very light, warm dinner before sunset." },
      { title: "The 70% Rule", desc: "Never eat until full; leave significant space for digestive movement." }
    ]
  },
  "low-energy-vata": {
    title: "Vata Fatigue: The Nervous System Drain",
    intro: "Vata-type low energy feels like being 'wired but tired'—an empty tank with a racing engine.",
    whyItHappens: "Excessive movement and sensory input 'leak' your Ojas (vitality). You aren't just tired; you are biologically brittle.",
    signs: [
      "Sudden crashes in the afternoon",
      "Muscle tension and dry skin along with fatigue",
      "Feeling fragile or easily overwhelmed",
      "Racing thoughts preventing restorative rest"
    ],
    protocol: [
      { title: "Oil Massage", desc: "Warm sesame oil application (Abhyanga) seals the energy leaks." },
      { title: "Rooting Diet", desc: "Eat sweet potatoes, grains, and warm stews to provide 'earth' weight." },
      { title: "Digital Fast", desc: "Cut sensory input 2 hours before bed to stop Vata leakage." }
    ]
  },
  "low-energy-kapha": {
    title: "Kapha Fatigue: The Metabolic Blockage",
    intro: "Kapha-type fatigue feels heavy and sticky—like moving through mud.",
    whyItHappens: "This isn't a lack of energy; it's a lack of flow. Ama (metabolic waste) has built up, preventing your cells from accessing the fire they need.",
    signs: [
      "Waking up feeling tired even after 8+ hours of sleep",
      "Heaviness in the limbs and mental fog",
      "Cravings for sugar or caffeine to 'wake up'",
      "Fatigue that improves with exercise"
    ],
    protocol: [
      { title: "Trikatu Spices", desc: "Ginger, black pepper, and pippali to 'burn' through the blockage." },
      { title: "Morning Movement", desc: "Vigorous exercise before 10 AM is essential to clear Kapha." },
      { title: "Dry Fasting", desc: "Avoid snacking between meals to allow Agni to clear the channels." }
    ]
  },
  "brain-fog-vata": {
    title: "Vata Brain Fog: The Scattered Mind",
    intro: "Vata brain fog feels like mental static—a lack of focus where thoughts are too fast to capture.",
    whyItHappens: "Excessive Air element makes the nervous system unstable. The 'moving' quality of Vata prevents the mind from settling into a clear flow.",
    signs: [
      "Short-term memory lapses and forgetfulness",
      "Inability to complete one task before starting another",
      "Worsened by cold weather and multitasking",
      "Physical anxiety or nervous twitching"
    ],
    protocol: [
      { title: "Stillness Practice", desc: "5 minutes of alternate nostril breathing (Nadi Shodhana) twice daily." },
      { title: "Warm Oil Nasya", desc: "Applying 2 drops of sesame oil to nostrils to ground the mind." },
      { title: "Single-Tasking", desc: "Eliminate all background noise and focus on one sensory input at a time." }
    ]
  },
  "brain-fog-kapha": {
    title: "Kapha Brain Fog: The Heavy Cloud",
    intro: "Kapha brain fog is a feeling of 'heavy head' and dullness that makes thinking feel like moving through water.",
    whyItHappens: "Accumulation of Ama (toxins) in the subtle channels of the brain (Srotas). This 'mental sludge' slows down neurotransmission and clarity.",
    signs: [
      "Slowed reaction time and dull thinking",
      "Waking up with a sense of mental 'heaviness'",
      "Worsened by heavy meals, dairy, and daytime napping",
      "Feeling unmotivated or uninspired"
    ],
    protocol: [
      { title: "Tongue Scraping", desc: "Copper scraping to stimulate the brain-gut connection via the tongue." },
      { title: "Bitter Herbs", desc: "Sip hot water with a slice of lemon and a pinch of turmeric." },
      { title: "Brisk Movement", desc: "A 15-minute fast walk to 'shake off' the mental dampness." }
    ]
  },
  "insomnia-vata": {
    title: "Vata Insomnia: The Wired Mind",
    intro: "Vata-type insomnia is defined by the inability to fall asleep because the mind is racing or 'wired'.",
    whyItHappens: "The nervous system is over-stimulated. High Air and Ether elements make it impossible for the mind to 'drop' into the heavy Kapha state required for sleep.",
    signs: [
      "Racing thoughts when the head hits the pillow",
      "Light, easily disturbed sleep",
      "Waking up between 2 AM and 4 AM (Vata time)",
      "Dry skin and cold feet preventing relaxation"
    ],
    protocol: [
      { title: "Foot Massage", desc: "Rub warm sesame oil into the soles of the feet before bed." },
      { title: "Magnesium-Rich Food", desc: "Warm almond milk with a pinch of nutmeg to soothe the nerves." },
      { title: "The Darkness Protocol", desc: "Total black-out and no screens 60 minutes before sleep." }
    ]
  },
  "insomnia-pitta": {
    title: "Pitta Insomnia: The Midnight Wake",
    intro: "Pitta-type insomnia usually involves falling asleep easily but waking up in the middle of the night feeling 'hot' and alert.",
    whyItHappens: "Excess heat in the liver and blood. During Pitta time (10 PM - 2 AM), the body's internal fire peaks, causing you to wake up with sharp, active thoughts.",
    signs: [
      "Waking up suddenly at midnight or 1 AM",
      "Feeling overheated or thirsty during the night",
      "Intense, vivid, or 'work-related' dreams",
      "Irritability if sleep is interrupted"
    ],
    protocol: [
      { title: "Cooling Breath", desc: "Sheetali pranayama (cooling breath) before bed to lower core temp." },
      { title: "Aloe Soothe", desc: "Drink 1 oz of pure aloe vera juice after dinner to cool the blood." },
      { title: "Loose Bedding", desc: "Use cotton or linen sheets; keep the room temperature below 68°F." }
    ]
  },
  "anxiety-vata": {
    title: "Vata Anxiety: The Fear Response",
    intro: "Vata anxiety is characterized by worry, fear, and a sense of 'impending doom' or instability.",
    whyItHappens: "Fragility in the nervous system. Like a leaf in the wind, the mind is tossed around by external stressors because it lacks the 'earth' element to stay grounded.",
    signs: [
      "Constant worry about future events",
      "Shortness of breath and palpitations",
      "Muscle tension in the neck and shoulders",
      "Feeling better with warm food and company"
    ],
    protocol: [
      { title: "Weighted Grounding", desc: "Use a weighted blanket or heavy clothing to signal safety to the brain." },
      { title: "Oil Application", desc: "Ear lubrication (Karna Purana) with warm oil to calm the Vata seat." },
      { title: "Routine Anchor", desc: "Do three things at the exact same time every day without fail." }
    ]
  },
  "weight-gain-kapha": {
    title: "Kapha Weight Gain: Slow Consolidation",
    intro: "Kapha weight gain is slow, steady, and often involves water retention and a feeling of overall heaviness.",
    whyItHappens: "Low metabolic fire (Manda Agni). The body is too efficient at storing and too slow at burning, leading to an accumulation of Meda Dhatu (fat tissue).",
    signs: [
      "Gaining weight even while eating 'healthy' quantities",
      "Cellulite and water retention in the limbs",
      "Lethargy and increased need for sleep",
      "Slow, heavy digestion"
    ],
    protocol: [
      { title: "Dry Brushing", desc: "Vigorous skin brushing toward the heart to move the lymph." },
      { title: "Pungent Spices", desc: "Generous use of black pepper, ginger, and chili to ignite the fire." },
      { title: "The Bitter Start", desc: "Eat bitter greens (arugula, kale) at the beginning of every meal." }
    ]
  }
};
