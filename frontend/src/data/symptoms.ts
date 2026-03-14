import { 
  Wind, Zap, Brain, Clock, Activity, Scale, 
  Flame, Droplets, Target, Moon, Eye, 
  ThermometerSnowflake, ZapOff, Hourglass, 
  ShieldAlert, UserMinus, Lock, AlertCircle, UtensilsCrossed,
  Thermometer
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
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: [
      "Irregular appetite",
      "Fatigue immediately after meals",
      "Brain fog or cognitive slowing",
      "Fluctuating bowel movements"
    ],
    dietarySupports: [
      { food: "Warm cooked meals", why: "Lowers the metabolic energy needed for breakdown" },
      { food: "Ginger & Cumin", why: "Acts as 'Dipana' (appetizer) and 'Pachana' (digestant)" },
      { food: "Ghee or healthy oils", why: "Lubricates the GI tract to prevent Vata dryness" },
      { food: "Sipped warm water", why: "Keeps Agni active throughout the day" }
    ],
    dietaryAvoids: [
      { food: "Excessive cold/raw foods", why: "Dampens digestive fire and increases Vata coldness" },
      { food: "Carbonated drinks", why: "Introduces artificial gas into the system" },
      { food: "Heavy late-night meals", why: "Digestion is naturally weaker after sunset" }
    ],
    lifestyleTips: [
      { title: "Consistent Meal Timing", desc: "Eating at the same time every day trains your Agni to secrete digestive enzymes predictably." },
      { title: "Avoid Eating Under Stress", desc: "Eating while anxious activates the sympathetic nervous system, which shuts down blood flow to the gut." },
      { title: "Brief Post-Meal Walk", desc: "A 10-15 minute gentle walk (Shatapada) assists the mechanical movement of food and gas." }
    ]
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
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Waking up tired", "Heaviness in limbs", "Mental sluggishness", "Cravings for stimulants"],
    dietarySupports: [{ food: "Warm, light meals", why: "Prevents metabolic residue" }],
    dietaryAvoids: [{ food: "Heavy dairy/sugar", why: "Further clogs the channels" }]
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
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Inability to focus", "Feeling 'spaced out'", "Slowed speech/thoughts"],
    dietarySupports: [{ food: "Bitter greens", why: "Helps clear metabolic residue" }],
    dietaryAvoids: [{ food: "Cold/heavy grains", why: "Increases mental 'dampness'" }]
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
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Racing thoughts at night", "Light sleep", "Early waking"],
    dietarySupports: [{ food: "Warm milk with nutmeg", why: "Natural sedative for the nervous system" }],
    dietaryAvoids: [{ food: "Late-night caffeine", why: "Directly aggravates Vata/Pitta" }]
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
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: [
      "Dry skin and cold extremities",
      "Racing thoughts before sleep",
      "Irregular appetite",
      "Sensitivity to noise/light"
    ],
    dietarySupports: [
      { food: "Root Vegetables", why: "Provides the 'earth' element to stabilize the mind" },
      { food: "Healthy Fats (Ghee/Avocado)", why: "Insulates the nerves against Vata 'sparking'" },
      { food: "Warm, Moist Meals", why: "Counters the dry, light qualities of anxiety" }
    ],
    dietaryAvoids: [
      { food: "Caffeine", why: "Directly aggravates the 'wind' element" },
      { food: "Cold/Raw Salads", why: "Increases Vata in the digestive tract and mind" }
    ],
    lifestyleTips: [
      { title: "Warm Oil Massage (Abhyanga)", desc: "Applying warm sesame oil to the body is the most powerful grounding practice." },
      { title: "Timed Routine", desc: "Consistent eating and sleeping signals safety to the brain." },
      { title: "Alternate Nostril Breathing", desc: "Nadi Shodhana balances the hemispheres and slows the heart rate." }
    ]
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
  "poor-digestion": {
    id: "poor-digestion",
    name: "Poor Digestion",
    summary: "Impaired digestive fire (Agni) leading to heaviness and incomplete metabolism.",
    modernDesc: "Modern views focus on enzymes, gut microbiome, and acid levels.",
    ayuDesc: "Digestive health (Agni) is the engine of human physiology; its impairment leads to Ama (toxins).",
    icon: Thermometer,
    color: "emerald",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: [
      "Heaviness after meals",
      "Lack of genuine hunger",
      "Coated tongue or unpleasant breath",
      "Lethargy or brain fog"
    ],
    dietarySupports: [
      { food: "Warm Water with Ginger", why: "Kinds the digestive fire (Agni)" },
      { food: "Buttermilk (Takra)", why: "Ayurvedic 'nectar' for weak digestion" },
      { food: "Lightly steamed vegetables", why: "Easier for a flickering fire to break down" }
    ],
    dietaryAvoids: [
      { food: "Iced Drinks during meals", why: "Stops digestion instantly" },
      { food: "Large portions of Red Meat", why: "Extremely heavy (Guru) to process" }
    ]
  },
  "constipation": {
    id: "constipation",
    name: "Constipation",
    summary: "Systemic dryness and downward energy blockage (Apana Vayu).",
    modernDesc: "Often attributed to low fiber, dehydration, or slowed intestinal motility.",
    ayuDesc: "Constipation is 'Koshtha-Stambha'—where excess dryness (Vata) halts waste movement.",
    icon: Lock,
    color: "blue",
    cluster: "digestive",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Difficulty passing stool", "Dry/hard pellets", "Feeling of incomplete evacuation", "Gas and bloating"],
    dietarySupports: [{ food: "Soaked raisins/figs", why: "Natural laxative and hydrating" }, { food: "Warm water first thing", why: "Stimulates peristalsis" }],
    dietaryAvoids: [{ food: "Dry crackers/toast", why: "Increases bowel dryness" }]
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
    relatedCause: "pitta-imbalance" as keyof typeof CAUSES,
    signs: ["Heartburn", "Sour burps", "Burning in chest/throat", "Sharp hunger pangs"],
    dietarySupports: [{ food: "Aloe vera juice", why: "Cools the blood and gut" }, { food: "Fennel seeds", why: "Soothing and alkalizing" }],
    dietaryAvoids: [{ food: "Chili/Spices", why: "Adds fire to the fire" }, { food: "Coffee", why: "Highly acidic and heating" }]
  },
  "gas": {
    id: "gas",
    name: "Excess Gas",
    summary: "Accumulation of air and fermentation products in the gut.",
    modernDesc: "Usually caused by swallowing air, fiber breakdown, or bacterial fermentation.",
    ayuDesc: "Gas (Adhmana) is a cardinal sign of Vishama Agni—where the digestive flame flickers.",
    icon: Wind,
    color: "blue",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: ["Flatulence", "Abdominal pressure", "Gurgling sounds in the gut"],
    dietarySupports: [{ food: "Asafetida (Hing)", why: "The premier gas-clearing spice" }, { food: "Warm cooked food", why: "Reduces air element" }],
    dietaryAvoids: [{ food: "Cold sandwiches", why: "Increases air and dryness" }]
  },
  "nausea": {
    id: "nausea",
    name: "Nausea",
    summary: "Reverse movement of energy due to heavy metabolic stagnation.",
    modernDesc: "A signal from the brain or gut indicating toxicity, infection, or digestive distress.",
    ayuDesc: "Nausea (Hrillas) is often a sign of high Ama and aggravated Kapha blocking downward flow.",
    icon: AlertCircle,
    color: "emerald",
    cluster: "digestive",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Feeling of sickness", "Increased salivation", "Total lack of interest in food"],
    dietarySupports: [{ food: "Ginger tea", why: "Pushes energy downward" }],
    dietaryAvoids: [{ food: "Fried/Oily foods", why: "Heavy and increases Kapha" }]
  },
  "loss-of-appetite": {
    id: "loss-of-appetite",
    name: "Loss of Appetite",
    summary: "Diminished digestive desire indicating a coating on the sensing channels.",
    modernDesc: "Can be triggered by stress, metabolic slowdown, or hidden systemic inflammation.",
    ayuDesc: "Anorexia (Aruchi) occurs when Ama coats the tongue and sensing channels.",
    icon: UtensilsCrossed,
    color: "orange",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: ["No hunger signals", "Food tastes bland", "Feeling full with tiny amounts"],
    dietarySupports: [{ food: "Ginger-lime-salt", why: "Classic 'tongue-cleansing' appetizer" }],
    dietaryAvoids: [{ food: "Heavy milk/cream", why: "Further coats the tongue" }]
  },

  // Energy & Metabolism
  "fatigue": {
    id: "fatigue",
    name: "Fatigue",
    summary: "Deep-seated depletion of vital essence and cellular energy.",
    modernDesc: "Persistent exhaustion that doesn't improve with rest, often linked to mitochondrial function.",
    ayuDesc: "Fatigue is a depletion of Ojas (vitality) or a deep blockage of the channels by Ama.",
    icon: ZapOff,
    color: "slate",
    cluster: "energy",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Exhaustion after rest", "Lethargy", "Lack of motivation"],
    dietarySupports: [{ food: "Fresh fruit juice", why: "Quick metabolic fuel (Prana)" }],
    dietaryAvoids: [{ food: "Leftovers/Cold food", why: "Lacks Prana, increases Ama" }]
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
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: ["Heavy head after eating", "Sudden need to nap", "Bloating accompanied by tiredness"],
    dietarySupports: [{ food: "Smaller portions", why: "Reduces the load on Agni" }],
    dietaryAvoids: [{ food: "Cold desserts after meals", why: "Extinguishes the remaining fire" }]
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
    relatedCause: "kapha-congestion" as keyof typeof CAUSES,
    signs: ["Weight gain despite low intake", "Feeling constantly cold", "Slow digestion"],
    dietarySupports: [{ food: "Pungent spices", why: "Ignites the metabolic fire" }],
    dietaryAvoids: [{ food: "Sweet/Salty heavy foods", why: "Further slows the metabolism" }]
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
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Shoulder tension", "Irritability", "Shallow breathing"],
    dietarySupports: [{ food: "Almond milk", why: "Nourishes the nervous tissue (Majja)" }],
    dietaryAvoids: [{ food: "Caffeine", why: "Increases cortisol and Vata movement" }]
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
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Fidgeting", "Inability to sit still", "Constant desire for change"],
    dietarySupports: [{ food: "Heavy, grounding grains", why: "Provides physical weight to the system" }],
    dietaryAvoids: [{ food: "Light snacks/Popcorn", why: "Increases the moving quality of Vata" }]
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
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Easily distracted", "Forgetfulness", "Difficulty completing tasks"],
    dietarySupports: [{ food: "Ghee", why: "The premier brain tonic in Ayurveda" }],
    dietaryAvoids: [{ food: "Junk food", why: "Creates 'mental Ama' that clouds focus" }]
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
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Waking at 3 AM", "Feeling alert but tired", "Difficulty returning to sleep"],
    dietarySupports: [{ food: "Warm soup for dinner", why: "Easier to digest, prevents night-time sugar drops" }],
    dietaryAvoids: [{ food: "Alcohol", why: "Disrupts the deeper sleep cycles (Pitta aggravation)" }]
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
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Tossing and turning", "Vivid stressful dreams", "Muscle twitches during sleep"],
    dietarySupports: [{ food: "Nutmeg at bedtime", why: "Specific herb for grounding the sleep channels" }],
    dietaryAvoids: [{ food: "Electronic screens before bed", why: "Aggravates the moving quality of Vata" }]
  },

  "hair-loss": {
    id: "hair-loss",
    name: "Hair Loss",
    summary: "Premature thinning or loss of hair due to systemic heat.",
    modernDesc: "Often hormonal (androgenic) or related to nutrient deficiencies and stress.",
    ayuDesc: "Hair loss (Khalitya) is primarily seen as excess Pitta heat 'burning' the hair follicles.",
    icon: UserMinus,
    color: "rose",
    cluster: "skin",
    relatedCause: "pitta-imbalance" as keyof typeof CAUSES,
    signs: ["Thinning at the crown", "Scalp heat or inflammation", "Premature graying"],
    dietarySupports: [{ food: "Cooling fruits (Amla)", why: "Reduces systemic Pitta heat" }],
    dietaryAvoids: [{ food: "Spicy/Sour food", why: "Increases blood heat and circulation speed" }]
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
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Flaking", "Rough texture", "Itching exacerbated by cold/wind"],
    dietarySupports: [{ food: "Healthy fats (Ghee/Nuts)", why: "Lubricates the skin from within" }],
    dietaryAvoids: [{ food: "Dry crackers/salads", why: "Disrupts the skin's lipid balance" }]
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
    relatedCause: "pitta-imbalance" as keyof typeof CAUSES,
    signs: ["Red inflamed bumps", "Oily skin", "Worsened by humidity/heat"],
    dietarySupports: [{ food: "Cooling cucumber/melon", why: "Clears blood heat" }],
    dietaryAvoids: [{ food: "Oily/Fried/Spicy", why: "Aggravates the Pitta-Rakta axis" }]
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
    relatedCause: "kapha-congestion" as keyof typeof CAUSES,
    signs: ["Puffy eyes in morning", "Swollen ankles", "Feeling heavy even without weight gain"],
    dietarySupports: [{ food: "Coriander seed water", why: "Natural Ayurvedic diuretic" }],
    dietaryAvoids: [{ food: "Excessive salt", why: "Causes the body to hold on to Kapha elements" }]
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
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: ["Numbness in fingers", "Cold toes even in warm weather", "Pale skin at extremities"],
    dietarySupports: [{ food: "Cinnamon & Cloves", why: "Vasodilators that push heat outward" }],
    dietaryAvoids: [{ food: "Iced drinks", why: "Shuts down peripheral circulation" }]
  }
};
