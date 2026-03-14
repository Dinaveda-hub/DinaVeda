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
    primaryKeyword: "bloating after eating",
    summary: "Digestive gas and distention caused by irregular air and weak fire.",
    modernDesc: "Modern medicine often views bloating as IBS or food sensitivity, focusing on dietary triggers.",
    ayuDesc: "Ayurveda views bloating as a disturbance of the sub-dosha Samana Vayu, fueled by weak digestive fire.",
    icon: Wind,
    color: "blue",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: [
      "Abdominal pressure after meals",
      "Noticeable distention of the belly",
      "Irregular bowel habits",
      "Belching or gas release"
    ],
    causes: [
      { title: "Dietary Triggers", items: ["Excessive raw/cold salads", "Gaseous beans or Cruciferous vegetables", "Carbonated drinks while eating"] },
      { title: "Functional Issues", items: ["Swallowing air while eating", "Weak digestive fire (Agni)", "Irregular meal times"] }
    ],
    redFlags: ["Severe abdominal pain", "Unexplained weight loss", "Change in bowel habits lasting > 2 weeks", "Fever or vomiting"],
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
    primaryKeyword: "chronic fatigue symptoms",
    summary: "Systemic fatigue linked to metabolic residue and reduced vitality.",
    modernDesc: "Chronic fatigue is usually linked to nutrient deficiencies, sleep quality, or chronic stress.",
    ayuDesc: "Fatigue is seen as either a depletion of Ojas or a blockage caused by Ama (metabolic toxins).",
    icon: Zap,
    color: "orange",
    cluster: "energy",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Waking up tired", "Heaviness in limbs", "Mental sluggishness", "Cravings for stimulants"],
    causes: [
      { title: "Metabolic Issues", items: ["Accumulation of Ama (toxins)", "Weak digestive fire", "Poor nutrient absorption"] },
      { title: "Lifestyle Drains", items: ["Inadequate sleep", "High stress levels", "Lack of physical movement"] }
    ],
    redFlags: ["Sudden profound exhaustion", "Unexplained fever", "Chest pain or shortness of breath", "Significant weight loss"],
    dietarySupports: [{ food: "Warm, light meals", why: "Prevents metabolic residue" }],
    dietaryAvoids: [{ food: "Heavy dairy/sugar", why: "Further clogs the channels" }],
    lifestyleTips: [
      { title: "Standardized Sleep Routine", desc: "Maintaining consistent sleep and wake times regulates circadian rhythms and metabolic repair." },
      { title: "Gentle Morning Movement", desc: "Light exercise or yoga in the morning stimulates circulation and helps clear metabolic residue." }
    ]
  },
  "brain-fog": {
    id: "brain-fog",
    name: "Brain Fog",
    primaryKeyword: "what causes brain fog",
    summary: "Mental cloudiness caused by metabolic residue obstructing cognitive channels.",
    modernDesc: "Mental cloudiness is often attributed to neuro-inflammation or high cognitive load.",
    ayuDesc: "Brain fog is 'mental Ama'—heavy, sticky residue blocking the subtle channels of the mind.",
    icon: Brain,
    color: "indigo",
    cluster: "mental",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Inability to focus", "Feeling 'spaced out'", "Slowed speech/thoughts"],
    causes: [
      { title: "Gut-Brain Path", items: ["Ama traveling to the mind channels", "Heavy/Oily evening meals", "Poor elimination"] },
      { title: "Sensory Overload", items: ["Chronic screen time", "Irregular sleep patterns", "Mental over-exertion"] }
    ],
    redFlags: ["Sudden confusion", "Difficulty speaking", "Loss of coordination", "Severe headache"],
    dietarySupports: [{ food: "Bitter greens", why: "Helps clear metabolic residue" }],
    dietaryAvoids: [{ food: "Cold/heavy grains", why: "Increases mental 'dampness'" }],
    lifestyleTips: [
      { title: "Digital Detox Schedule", desc: "Reducing screen time, especially before bed, lowers cognitive overload and neuro-inflammation." },
      { title: "Pranayama (Breathing Exercises)", desc: "Controlled breathing patterns help clear the mental channels and improve oxygenation to the brain." }
    ]
  },
  "insomnia": {
    id: "insomnia",
    name: "Insomnia",
    primaryKeyword: "why can't i sleep",
    summary: "Disrupted sleep cycles due to nervous system over-stimulation.",
    modernDesc: "Sleep disorders are typically linked to circadian rhythm disruption or chemical imbalances.",
    ayuDesc: "Insomnia is a Vata-Pitta drift where the nervous system is too mobile to enter Kapha-rest.",
    icon: Clock,
    color: "slate",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Racing thoughts at night", "Light sleep", "Early waking"],
    causes: [
      { title: "Nervous Sensitivity", items: ["High Vata in the mind", "Late-night mental work", "Excessive stimulants"] },
      { title: "Circadian Drift", items: ["Irregular sleep habits", "Exposure to blue light", "Skipping evening routine"] }
    ],
    redFlags: ["Daytime hallucinations", "Severe depression", "High risk for accidents due to fatigue"],
    dietarySupports: [{ food: "Warm milk with nutmeg", why: "Natural sedative for the nervous system" }],
    dietaryAvoids: [{ food: "Late-night caffeine", why: "Directly aggravates Vata/Pitta" }],
    lifestyleTips: [
      { title: "Evening Wind-Down", desc: "Dimming lights and engaging in calm activities 1 hour before bed signals the brain to produce melatonin." },
      { title: "Oil Massage on Soles", desc: "Massaging the soles of the feet with warm oil (Padabhyanga) focuses energy downward away from the racing mind." }
    ]
  },
  "anxiety": {
    id: "anxiety",
    name: "Anxiety",
    primaryKeyword: "how to reduce anxiety naturally",
    summary: "Hyper-active stress response and restlessness within the nervous system.",
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
    causes: [
      { title: "Vata Agitators", items: ["Change in routine", "Traveling or high movement", "Exposure to cold/wind"] },
      { title: "Dietary Influences", items: ["Excessive caffeine", "Skipping meals", "Cold/Dry food habits"] }
    ],
    redFlags: ["Panic attacks", "Thoughts of self-harm", "Inability to function in daily life", "Chest pain during stress"],
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
    primaryKeyword: "reasons for sudden weight gain",
    summary: "Metabolic stagnation and systemic accumulation leading to tissue increase.",
    modernDesc: "Weight gain is seen as an imbalance of calories vs. expenditure or hormonal shifts.",
    ayuDesc: "Weight accumulation is excess Kapha element and slow Agni (Manda Agni).",
    icon: Scale,
    color: "amber",
    cluster: "metabolism",
    relatedCause: "kapha-congestion" as keyof typeof CAUSES,
    causes: [
      { title: "Metabolic Stagnation", items: ["Slow digestive fire (Manda Agni)", "High Ama levels", "Kapha-aggravating diet"] },
      { title: "Sedentary Habits", items: ["Lack of vigorous movement", "Excessive sleep (especially daytime)", "Emotional eating"] }
    ],
    redFlags: ["Sudden unexplained weight gain (> 5kg/month)", "Extreme lethargy", "Severe joint pain"],
    dietarySupports: [{ food: "Spiced beans/pulses", why: "Drying and stimulating for Kapha" }],
    dietaryAvoids: [{ food: "Sweet/Heavy/Oily food", why: "Directly increases the earth element" }],
    lifestyleTips: [
      { title: "Morning Exercise", desc: "Vigorous movement during Kapha time (6 AM - 10 AM) prevents metabolic stagnation." },
      { title: "Dry Brushing", desc: "Stimulating the lymphatic system before bathing helps clear systemic accumulation." }
    ],
    signs: ["Puffy face", "Heavy limbs", "Slow digestion", "Weight gain in midsection"]
  },
  "poor-digestion": {
    id: "poor-digestion",
    name: "Poor Digestion",
    primaryKeyword: "how to improve digestion",
    summary: "Impaired metabolic transformation leading to systemic heaviness.",
    modernDesc: "Modern views focus on enzymes, gut microbiome, and acid levels.",
    ayuDesc: "Digestive health (Agni) is the engine of human physiology; its impairment leads to Ama (toxins).",
    icon: Thermometer,
    color: "emerald",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: [
      "Heaviness in the stomach after even light meals",
      "Lack of genuine hunger at breakfast or lunch",
      "Coated tongue or unpleasant breath in the morning",
      "Post-meal lethargy or brain fog"
    ],
    causes: [
      { title: "Dietary Habits", items: ["Eating before the previous meal is digested", "Excessive cold/iced drinks", "Over-consumption of raw foods"] },
      { title: "Environmental Drains", items: ["Chronic stress (High cortisol)", "Irregular work/sleep schedules", "Lack of movement"] },
      { title: "Metabolic Loads", items: ["Late-night heavy meals", "Incompatible food pairings", "Suppression of natural urges"] }
    ],
    redFlags: [
      "Persistent or severe abdominal pain",
      "Unexplained or sudden weight loss",
      "Difficulty or pain while swallowing",
      "Visible blood in the stool",
      "Persistent vomiting or fever",
      "Jaundice (yellowing of eyes or skin)"
    ],
    dietarySupports: [
      { food: "Warm Water with Ginger", why: "Kinds the digestive fire (Agni)" },
      { food: "Buttermilk (Takra)", why: "Ayurvedic 'nectar' for weak digestion" },
      { food: "Lightly steamed vegetables", why: "Easier for a flickering fire to break down" }
    ],
    dietaryAvoids: [
      { food: "Iced Drinks during meals", why: "Stops digestion instantly" },
      { food: "Large portions of Red Meat", why: "Extremely heavy (Guru) to process" }
    ],
    lifestyleTips: [
      { title: "Timed Eating", desc: "Eating at consistent times (8AM, 1PM, 7PM) trains your Agni to secrete acids predictably." },
      { title: "Mindful Chewing", desc: "Digestion begins in the mouth. Chewing each bite 20-30 times reduces the mechanical load." },
      { title: "Post-Meal Movement", desc: "A 10-minute walk (shatapada) after lunch assists the gravitational movement." },
      { title: "Emotional Awareness", desc: "Avoid eating while angry or distracted. Stress shuts down the parasympathetic system." }
    ]
  },
  "constipation": {
    id: "constipation",
    name: "Constipation",
    primaryKeyword: "natural constipation relief",
    summary: "Reduced intestinal motility and systemic dryness.",
    modernDesc: "Often attributed to low fiber, dehydration, or slowed intestinal motility.",
    ayuDesc: "Constipation is 'Koshtha-Stambha'—where excess dryness (Vata) halts waste movement.",
    icon: Lock,
    color: "blue",
    cluster: "digestive",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Difficulty passing stool", "Dry/hard pellets", "Feeling of incomplete evacuation", "Gas and bloating"],
    causes: [
      { title: "Dietary Dryness", items: ["Insufficient healthy fats/ghee", "Inadequate hydration", "Over-consumption of dry/crispy foods"] },
      { title: "Energy Blockage", items: ["Suppression of natural urges", "Lack of physical movement", "Sedentary work habits"] }
    ],
    redFlags: ["Persistent abdominal pain", "Blood in stool", "Sudden change in bowel habits", "Fever and vomiting"],
    dietarySupports: [{ food: "Soaked raisins/figs", why: "Natural laxative and hydrating" }, { food: "Warm water first thing", why: "Stimulates peristalsis" }],
    dietaryAvoids: [{ food: "Dry crackers/toast", why: "Increases bowel dryness" }],
    lifestyleTips: [
      { title: "Squatting Posture", desc: "Using a footstool during elimination aligns the colon for easier waste passage." },
      { title: "Oil Application", desc: "Applying oil to the lower abdomen stimulates the downward movement of the intestinal nervous system." }
    ]
  },
  "acidity": {
    id: "acidity",
    name: "Acidity",
    primaryKeyword: "acid reflux symptoms",
    summary: "Excessive metabolic heat and inflammatory markers in the digestive tract.",
    modernDesc: "Commonly known as GERD or acid reflux, involving stomach acid entering the esophagus.",
    ayuDesc: "Acidity (Amlapitta) is an aggravation of the liquid and hot qualities of Pitta dosha.",
    icon: Flame,
    color: "rose",
    cluster: "digestive",
    relatedCause: "pitta-imbalance" as keyof typeof CAUSES,
    signs: ["Heartburn", "Sour burps", "Burning in chest/throat", "Sharp hunger pangs"],
    causes: [
      { title: "Heat Aggravators", items: ["Excessive spicy/sour foods", "Fried and fermented items", "Caffeine and alcohol"] },
      { title: "Habitual Causes", items: ["Eating while angry or stressed", "Sleeping immediately after meals", "Skipping meals"] }
    ],
    redFlags: ["Difficulty swallowing", "Vomiting blood", "Black/tarry stools", "Persistent chest pain"],
    dietarySupports: [{ food: "Aloe vera juice", why: "Cools the blood and gut" }, { food: "Fennel seeds", why: "Soothing and alkalizing" }],
    dietaryAvoids: [{ food: "Chili/Spices", why: "Adds fire to the fire" }, { food: "Coffee", why: "Highly acidic and heating" }],
    lifestyleTips: [
      { title: "Vertical Rest", desc: "Remaining upright for 2-3 hours after eating prevents gastric acid from entering the esophagus." },
      { title: "Stress Mitigation", desc: "Calming techniques during meals reduce the neurological production of excess acid." }
    ]
  },
  "gas": {
    id: "gas",
    name: "Excess Gas",
    primaryKeyword: "relief for excess gas",
    summary: "Accumulation of fermentation markers in the intestinal tract.",
    modernDesc: "Usually caused by swallowing air, fiber breakdown, or bacterial fermentation.",
    ayuDesc: "Gas (Adhmana) is a cardinal sign of Vishama Agni—where the digestive flame flickers.",
    icon: Wind,
    color: "blue",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: ["Flatulence", "Abdominal pressure", "Gurgling sounds in the gut"],
    causes: [
      { title: "Digestive Lag", items: ["Weak Agni (flickering fire)", "Eating too fast (swallowing air)", "Talking while eating"] },
      { title: "Food Factors", items: ["Beans without spices (Asafetida)", "Raw vegetables", "Cold drinks"] }
    ],
    redFlags: ["Severe abdominal cramping", "High fever", "Inability to pass gas or stool (obstruction)"],
    dietarySupports: [{ food: "Asafetida (Hing)", why: "The premier gas-clearing spice" }, { food: "Warm cooked food", why: "Reduces air element" }],
    dietaryAvoids: [{ food: "Cold sandwiches", why: "Increases air and dryness" }],
    lifestyleTips: [
      { title: "Warm Belly Compress", desc: "Applying localized warmth relaxes the intestinal smooth muscle and facilitates gas release." },
      { title: "Chew Each Bite", desc: "Breaking down food mechanically in the mouth reduces the amount of air swallowed and optimizes enzyme action." }
    ]
  },
  "nausea": {
    id: "nausea",
    name: "Nausea",
    primaryKeyword: "natural remedies for nausea",
    summary: "Impaired metabolic flow due to stagnation in the GI tract.",
    modernDesc: "A signal from the brain or gut indicating toxicity, infection, or digestive distress.",
    ayuDesc: "Nausea (Hrillas) is often a sign of high Ama and aggravated Kapha blocking downward flow.",
    icon: AlertCircle,
    color: "emerald",
    cluster: "digestive",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Feeling of sickness", "Increased salivation", "Total lack of interest in food"],
    causes: [
      { title: "Stagnation", items: ["Heavy Ama buildup", "Over-eating", "Weak hepatic (liver) function"] }
    ],
    redFlags: ["Severe vomiting", "Inability to keep liquids down", "Signs of dehydration", "High fever"],
    dietarySupports: [{ food: "Ginger tea", why: "Pushes energy downward" }],
    dietaryAvoids: [{ food: "Fried/Oily foods", why: "Heavy and increases Kapha" }],
    lifestyleTips: [
      { title: "Deep Belly Breathing", desc: "Activating the diaphragm massages the digestive organs and helps stabilize the gastric reflex." },
      { title: "Localized Cooling", desc: "Cooling the back of the neck can help reset the neurological trigger for nausea." }
    ]
  },
  "loss-of-appetite": {
    id: "loss-of-appetite",
    name: "Loss of Appetite",
    primaryKeyword: "loss of appetite causes",
    summary: "Diminished physiological hunger indicating sensory channel blockage.",
    modernDesc: "Can be triggered by stress, metabolic slowdown, or hidden systemic inflammation.",
    ayuDesc: "Anorexia (Aruchi) occurs when Ama coats the tongue and sensing channels.",
    icon: UtensilsCrossed,
    color: "orange",
    cluster: "digestive",
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: ["No hunger signals", "Food tastes bland", "Feeling full with tiny amounts"],
    causes: [
      { title: "Channel Blockage", items: ["Heavy Ama coating", "Emotional stress/grief", "Low physical activity"] }
    ],
    redFlags: ["Unexplained rapid weight loss", "Jaundice", "Severely pale stool/dark urine"],
    dietarySupports: [{ food: "Ginger-lime-salt", why: "Classic 'tongue-cleansing' appetizer" }],
    dietaryAvoids: [{ food: "Heavy milk/cream", why: "Further coats the tongue" }],
    lifestyleTips: [
      { title: "Tongue Scraping", desc: "Removes metabolic residue from the tongue, awakening the taste buds and signaling the AGNI to prepare for food." },
      { title: "Mindful Pacing", desc: "Taking small sips of warm water before meals clears the throat and prepares the esophagus for intake." }
    ]
  },

  // Energy & Metabolism
  "fatigue": {
    id: "fatigue",
    name: "Fatigue",
    primaryKeyword: "systemic fatigue causes",
    summary: "Deep-seated exhaustion linked to metabolic residue and reduced cellular vitality.",
    modernDesc: "Persistent exhaustion that doesn't improve with rest, often linked to mitochondrial function or chronic inflammation.",
    ayuDesc: "Fatigue is seen as a depletion of Ojas (vitality) or a deep blockage of the physiological channels by metabolic residue.",
    icon: ZapOff,
    color: "slate",
    cluster: "energy",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Exhaustion after minimal effort", "Lethargic limbs", "Lack of motivation", "Heavy coating on tongue"],
    causes: [
      { title: "Metabolic Burden", items: ["Accumulation of metabolic residue", "Poor nutrient absorption", "Undigested food lingering in the tract"] },
      { title: "Energy Leaks", items: ["Chronic over-working", "Excessive sensory stimulation", "Inadequate restorative sleep"] }
    ],
    redFlags: ["Sudden weight loss", "Shortness of breath", "Night sweats", "Swollen lymph nodes"],
    dietarySupports: [{ food: "Fresh fruit juice", why: "Quick metabolic fuel (Prana) that doesn't add to the digestive load" }],
    dietaryAvoids: [{ food: "Leftovers/Cold food", why: "Lacks vitality and increases metabolic residue" }],
    lifestyleTips: [
      { title: "Sunlight Exposure", desc: "15 minutes of morning sun signals the mitochondria to produce ATP and resets the circadian clock." },
      { title: "Vagal Nerve Stimulation", desc: "Cold splashing on the face or humming can help reset the nervous system from a state of exhaustion." }
    ]
  },
  "post-meal-fatigue": {
    id: "post-meal-fatigue",
    name: "Post-Meal Fatigue",
    primaryKeyword: "tired after eating",
    summary: "Lethargy following meals due to excessive metabolic burden on the digestive system.",
    modernDesc: "Often referred to as postprandial somnolence, related to blood sugar fluctuations or high inflammatory load.",
    ayuDesc: "Heaviness after eating (Alasaka) indicates that the metabolic fire is too weak to process the incoming nutritional load.",
    icon: Moon,
    color: "amber",
    cluster: "energy",
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: ["Heavy head after eating", "Sudden need to nap", "Bloating accompanied by tiredness", "Brain fog immediately following a meal"],
    causes: [
      { title: "Digestive Load", items: ["Over-eating beyond 75% capacity", "Drinking too much cold water while eating", "Frequent consumption of heavy/oily foods"] }
    ],
    redFlags: ["Extreme drowsiness after every meal", "Severe postprandial brain fog", "Fainting spells"],
    dietarySupports: [{ food: "Warm ginger water", why: "Activates digestive enzymes for immediate processing" }],
    dietaryAvoids: [{ food: "Cold desserts after meals", why: "Instantly dampens the remaining metabolic heat" }],
    lifestyleTips: [
      { title: "Post-Meal Shatapada", desc: "A 100-step (10-minute) gentle walk assists the mechanical movement of the GI tract." },
      { title: "Left-Side Lying", desc: "Lying on the left side (Vamanuvarti) for 10 minutes post-meal encourages optimal stomach emptying." }
    ]
  },
  "slow-metabolism": {
    id: "slow-metabolism",
    name: "Slow Metabolism",
    primaryKeyword: "signs of slow metabolism",
    summary: "Sluggish transformation of nutrition into energy and biological tissue.",
    modernDesc: "A lower basal metabolic rate, often influenced by thyroid function, muscle density, or chronic stress.",
    ayuDesc: "Slow metabolism (Manda Agni) is a state where cellular transformation is hampered by heavy, stagnant qualities.",
    icon: Hourglass,
    color: "emerald",
    cluster: "metabolism",
    relatedCause: "kapha-congestion" as keyof typeof CAUSES,
    signs: ["Weight gain despite low caloric intake", "Feeling constantly cold in extremities", "Slow, heavy digestion", "Difficulty losing weight"],
    causes: [
      { title: "Metabolic Dampness", items: ["Sedentary lifestyle habits", "Excessive sleep duration", "Diet high in sweet and heavy qualities"] }
    ],
    redFlags: ["Significant hair loss", "Severe cold intolerance", "Thinning outer eyebrows"],
    dietarySupports: [{ food: "Pungent spices (Black pepper, Chili)", why: "Chemically ignites the metabolic transformation rate" }],
    dietaryAvoids: [{ food: "Sweet/Salty heavy foods", why: "Further increases the metabolic burden" }],
    lifestyleTips: [
      { title: "Interval Movement", desc: "Short bursts of activity throughout the day prevent the metabolic rate from dropping too low." },
      { title: "Cinnamon Infusions", desc: "Cinnamon helps regulate insulin sensitivity and keeps the metabolic fire active." }
    ]
  },

  // Mental & Nervous
  "stress": {
    id: "stress",
    name: "Stress",
    primaryKeyword: "how stress affects the body",
    summary: "Systemic pressure on the nervous system disrupting biological rhythms.",
    modernDesc: "The body's physiological reaction to pressure, characterized by elevated cortisol and adrenaline levels.",
    ayuDesc: "Stress is seen as an overload (Sahasa) that depletes vital essence and causes erratic nervous system movement.",
    icon: Brain,
    color: "indigo",
    cluster: "nervous",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Shoulder and neck tension", "Increased irritability", "Shallow, chest-focused breathing"],
    causes: [
      { title: "Neurological Strain", items: ["Information and digital overload", "Chronic financial or work-related pressure", "Lack of restorative downtime"] }
    ],
    redFlags: ["Severe panic attacks", "Persistent chest pain", "Chronic hypertension", "Chronic insomnia"],
    dietarySupports: [{ food: "Warm almond milk", why: "Nourishes the nervous tissue and stabilizes the mind" }],
    dietaryAvoids: [{ food: "Concentrated caffeine", why: "Further elevates cortisol and nervous system movement" }],
    lifestyleTips: [
      { title: "Box Breathing", desc: "Regulating the breath directly down-regulates the sympathetic nervous system." },
      { title: "Grounding (Earthing)", desc: "Physical contact with the earth helps discharge neurological 'static' and balances the system." }
    ]
  },
  "restlessness": {
    id: "restlessness",
    name: "Restlessness",
    primaryKeyword: "restlessness and anxiety",
    summary: "Inability to maintain physiological or mental stillness.",
    modernDesc: "Often associated with neurological hyper-activity, excess stimulants, or sensory over-stimulation.",
    ayuDesc: "Restlessness (Chittodvega) is characterized by excessive mobility and activity moving through the mental channels.",
    icon: Activity,
    color: "indigo",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Physical fidgeting", "Inability to remain seated", "Constant desire for sensory change"],
    causes: [
      { title: "Sensory Hyper-mobility", items: ["Frequent travel or high physical movement", "High digital sensory input", "Irregular sleep and eating patterns"] }
    ],
    redFlags: ["Severe agitation", "Inability to focus on a single task for > 5 mins", "Total sleep loss for > 48 hours"],
    dietarySupports: [{ food: "Heavy, grounding grains (Oats, Rice)", why: "Provides physical ballast to a hyper-mobile system" }],
    dietaryAvoids: [{ food: "Light, airy snacks", why: "Increases the quality of lightness and mobility in the system" }],
    lifestyleTips: [
      { title: "Weighted Blankets", desc: "Provides proprioceptive input that signals safety and stability to the nervous system." },
      { title: "Rooting Meditation", desc: "Visualizing energy moving down into the earth helps counteract the upward-moving restless energy." }
    ]
  },
  "poor-concentration": {
    id: "poor-concentration",
    name: "Poor Concentration",
    primaryKeyword: "trouble concentrating and focusing",
    summary: "Unstable cognitive focus and inability to sustain mental attention.",
    modernDesc: "Cognitive drain or concentration difficulty often linked to sleep deprivation or neuro-inflammation.",
    ayuDesc: "Mental instability occurs when the clarity of the mind is clouded by metabolic residue or excessive mental activity.",
    icon: Target,
    color: "indigo",
    cluster: "mental",
    relatedCause: "ama-accumulation" as keyof typeof CAUSES,
    signs: ["Easily distracted by environment", "Increased forgetfulness", "Difficulty completing complex tasks"],
    causes: [
      { title: "Cognitive Load", items: ["Chronic multi-tasking", "Poor sleep architecture", "Diet high in processed sugars and additives"] }
    ],
    redFlags: ["Sudden profound memory loss", "Difficulty performing routine tasks", "Sudden personality shifts"],
    dietarySupports: [{ food: "Warm Ghee", why: "Rich in phospholipids that support brain function and cognitive clarity" }],
    dietaryAvoids: [{ food: "Processed junk food", why: "Creates 'mental residue' that clouds synaptic communication" }],
    lifestyleTips: [
      { title: "Single-Tasking Practice", desc: "Training the brain to focus on one activity at a time rebuilds concentration pathways." },
      { title: "Walnut Consumption", desc: "Walnuts contain neuroprotective compounds that support structural mental health." }
    ]
  },

  // Sleep
  "night-waking": {
    id: "night-waking",
    name: "Night Waking",
    primaryKeyword: "waking up in the middle of the night",
    summary: "Interrupted sleep cycles, often occurring at predictable hours.",
    modernDesc: "Frequent awakenings, potentially linked to sleep apnea, cortisol spikes, or metabolic shifts.",
    ayuDesc: "Waking between 2 AM and 6 AM is typically a nervous system disturbance (Vata); waking earlier is often inflammatory (Pitta).",
    icon: Eye,
    color: "slate",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Predictable waking at 3 AM", "Feeling alert but physically tired", "Difficulty returning to deep sleep"],
    causes: [
      { title: "Circadian Stressors", items: ["Late-night digital screen exposure", "Evening caffeine consumption", "Unresolved emotional stress"] }
    ],
    redFlags: ["Shortness of breath on waking", "Night-time heart palpitations", "Gasping for air while asleep"],
    dietarySupports: [{ food: "Warm soup for dinner", why: "Stable glucose release prevents nocturnal cortisol spikes" }],
    dietaryAvoids: [{ food: "Alcohol at night", why: "Disrupts REM sleep and increases metabolic heat during rest" }],
    lifestyleTips: [
      { title: "Evening Journaling", desc: "Transferring mental loops to paper prevents them from surfacing during light sleep phases." },
      { title: "Blackout Curtains", desc: "Total darkness optimizes melatonin production and prevents early-morning light disturbance." }
    ]
  },
  "restless-sleep": {
    id: "restless-sleep",
    name: "Restless Sleep",
    primaryKeyword: "restless sleep causes",
    summary: "Fragmented sleep architecture leaving one feeling physically unrefreshed.",
    modernDesc: "Non-restorative sleep, often characterized by elevated sleep stage transitions and tossing.",
    ayuDesc: "Restless sleep (Alpa Nidra) indicates that the quality of stability and rest is insufficient in the system.",
    icon: Clock,
    color: "slate",
    cluster: "mental",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Frequent tossing and turning", "Vivid, high-stress dreams", "Nocturnal muscle twitches"],
    causes: [
      { title: "Nervous Mobility", items: ["Cold sleeping environment", "Nocturnal digestive gas", "Pre-sleep anxious state"] }
    ],
    redFlags: ["Acting out dreams physically", "Extreme daytime exhaustion", "Severe snoring or gasping"],
    dietarySupports: [{ food: "Mashed banana with nutmeg", why: "Nutmeg is a natural Ayurvedic sedative that grounds the mind" }],
    dietaryAvoids: [{ food: "Late-night mental work", why: "Increases neurological activity and prevents sleep stability" }],
    lifestyleTips: [
      { title: "Warm Foot Bath", desc: "Drawing blood flow to the feet helps cool the brain and signals sleep readiness." },
      { title: "Lavender Oil", desc: "Inhaling lavender has been shown to increase deep-sleep (slow-wave) cycles." }
    ]
  },

  "hair-loss": {
    id: "hair-loss",
    name: "Hair Loss",
    primaryKeyword: "causes of thinning hair",
    summary: "Premature thinning or loss of hair follicles due to systemic metabolic heat.",
    modernDesc: "Commonly linked to hormonal shifts, nutrient deficiencies, or chronic physiological stress.",
    ayuDesc: "Hair loss (Khalitya) occurs when excessive systemic heat weakens the hair roots and follicles.",
    icon: UserMinus,
    color: "rose",
    cluster: "skin",
    relatedCause: "pitta-imbalance" as keyof typeof CAUSES,
    signs: ["Thinning at the crown or temples", "Scalp heat and inflammation", "Premature graying of hair"],
    causes: [
      { title: "Metabolic Heat", items: ["Excessive spicy and sour diet", "High chronic stress and irritability", "Exposure to extreme heat environments"] }
    ],
    redFlags: ["Sudden patchy loss (Alopecia)", "Scalp infection or severe weeping", "Loss of all body and facial hair"],
    dietarySupports: [{ food: "Amla (Indian Gooseberry)", why: "Powerful antioxidant that cools blood heat and supports follicles" }],
    dietaryAvoids: [{ food: "Spicy/Sour fermented food", why: "Increases blood heat and follicular inflammation" }],
    lifestyleTips: [
      { title: "Cooling Scalp Oil", desc: "The application of coconut or Brahmi oil reduces localized scalp heat." },
      { title: "Gentle Brushing", desc: "Stimulating scalp circulation without trauma encourages blood flow to the roots." }
    ]
  },
  "dry-skin": {
    id: "dry-skin",
    name: "Dry Skin",
    primaryKeyword: "dry skin remedies",
    summary: "Lack of lubrication and moisture in the external dermal tissues.",
    modernDesc: "A disruption of the skin's lipid barrier, often due to environmental factors or reduced sebum production.",
    ayuDesc: "Dry skin indicates a lack of internal lubrication and an excess of dry, mobile qualities in the system.",
    icon: Droplets,
    color: "blue",
    cluster: "skin",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Visible flaking and scaling", "Rough dermal texture", "Itching exacerbated by dry weather"],
    causes: [
      { title: "Hydration Deficits", items: ["Low intake of healthy dietary fats", "Environmental exposure to cold and wind", "Dehydration"] }
    ],
    redFlags: ["Deep dermal cracking or bleeding", "Signs of secondary skin infection", "Intense itching that prevents sleep"],
    dietarySupports: [{ food: "Healthy fats (Ghee, Walnuts)", why: "Lubricates the skin cells from the internal metabolic layer" }],
    dietaryAvoids: [{ food: "Dry crackers and raw salads", why: "Further disrupts the skin's moisture and lipid balance" }],
    lifestyleTips: [
      { title: "Internal Hydration", desc: "Sipping warm water throughout the day ensures fluids reach the deep dermal layers." },
      { title: "Oil Application (Abhyanga)", desc: "Applying oil to the body before bathing seals in moisture and protects the lipid barrier." }
    ]
  },
  "acne": {
    id: "acne",
    name: "Acne",
    primaryKeyword: "clear skin naturally",
    summary: "Inflammation of the skin channels due to systemic metabolic heat and stagnation.",
    modernDesc: "Hormonal fluctuations leading to sebum overproduction and follicular inflammation.",
    ayuDesc: "Acne occurs when heated metabolic residue and blood heat erupt through the skin's exit channels.",
    icon: ShieldAlert,
    color: "rose",
    cluster: "skin",
    relatedCause: "pitta-imbalance" as keyof typeof CAUSES,
    signs: ["Red inflamed dermal bumps", "Excessive oiliness", "Breakouts worsened by humidity"],
    causes: [
      { title: "Inflammatory Stagnation", items: ["High intake of fermented and spicy foods", "Hormonal heat spikes", "Impaired bowel elimination"] }
    ],
    redFlags: ["Deep cystic acne causing scarring", "Sudden severe breakout with fever", "Signs of systemic infection"],
    dietarySupports: [{ food: "Cucumber and Melon", why: "Alkalizing and cooling to the blood and skin" }],
    dietaryAvoids: [{ food: "Oily and fired foods", why: "Further aggravates systemic heat and oil production" }],
    lifestyleTips: [
      { title: "Cool Water Washing", desc: "Using cool water prevents stripping of natural oils and reduces localized inflammation." },
      { title: "Regular Elimination", desc: "Ensuring daily bowel movements prevents waste from surfacing through the skin." }
    ]
  },

  // Fluid
  "water-retention": {
    id: "water-retention",
    name: "Water Retention",
    primaryKeyword: "reduce water retention fast",
    summary: "Systemic swelling or heaviness due to fluid and metabolic stagnation.",
    modernDesc: "Edema caused by excessive sodium intake, hormonal shifts, or lymphatic stagnation.",
    ayuDesc: "Swelling (Shotha) is an accumulation resulting from heavy, stagnant metabolic qualities.",
    icon: Droplets,
    color: "emerald",
    cluster: "metabolism",
    relatedCause: "kapha-congestion" as keyof typeof CAUSES,
    signs: ["Puffy eyes in the morning", "Swelling in the ankles and hands", "Feeling heavy despite no fat gain"],
    causes: [
      { title: "Fluid Stagnation", items: ["Excessive sodium/salt intake", "Sedentary lifestyle habits", "Diet high in heavy and sweet qualities"] }
    ],
    redFlags: ["Sudden swelling in one leg only", "Shortness of breath with swelling", "Decreased urine output"],
    dietarySupports: [{ food: "Coriander seed infusions", why: "Acts as a natural metabolic diuretic and coolant" }],
    dietaryAvoids: [{ food: "Excessive salt", why: "Causes the body to retain stagnant fluid and metabolic waste" }],
    lifestyleTips: [
      { title: "Elevation", desc: "Elevating the legs for 15 minutes a day assists lymphatic return to the heart." },
      { title: "Vigorous Walking", desc: "Mechanical movement of the leg muscles acts as a pump for the neurological and lymphatic systems." }
    ]
  },
  "cold-hands-feet": {
    id: "cold-hands-feet",
    name: "Cold Hands & Feet",
    primaryKeyword: "cold extremities causes",
    summary: "Reduced circulation and lack of metabolic heat in the body's extremities.",
    modernDesc: "Often related to poor peripheral circulation, low blood pressure, or environmental sensitivity.",
    ayuDesc: "Lack of metabolic heat at the periphery indicates that the central fire is too weak to push warmth outward.",
    icon: ThermometerSnowflake,
    color: "blue",
    cluster: "energy",
    relatedCause: "weak-agni" as keyof typeof CAUSES,
    signs: ["Numbness in fingers during cold", "Cold toes even indoors", "Pale skin color at the extremities"],
    causes: [
      { title: "Circulatory Stagnation", items: ["Weak central metabolic fire", "Low blood volume or poor iron status", "Systemic constriction due to stress"] }
    ],
    redFlags: ["Fingers turning white or blue", "Persistent numbness and tingling", "Sores on toes that do not heal"],
    dietarySupports: [{ food: "Warm Cinnamon tea", why: "Increases peripheral blood flow and warms the system" }],
    dietaryAvoids: [{ food: "Iced and cold-pressed drinks", why: "Further constricts peripheral circulation and metabolic heat" }],
    lifestyleTips: [
      { title: "Warm Foot Soaks", desc: "Localized heat encourages vasodilation and improves peripheral circulation." },
      { title: "Pranayama (Ujjayi)", desc: "Specific breathing techniques generate internal heat and move it through the channels." }
    ]
  },
  "joint-pain": {
    id: "joint-pain",
    name: "Joint Pain",
    primaryKeyword: "natural joint pain relief",
    summary: "Discomfort and stiffness in the skeletal junctions due to dryness or metabolic stagnation.",
    modernDesc: "Inflammation or wear and tear in the joint tissues, often related to arthritis or overuse.",
    ayuDesc: "Joint pain occurs when systemic dryness erodes lubrication or metabolic residue blocks movement channels.",
    icon: Activity,
    color: "slate",
    cluster: "musculoskeletal",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Crackling sounds in joints", "Stiffness in the morning", "Sharp or dull localized pain"],
    causes: [
      { title: "Lubrication Deficit", items: ["Excessive dryness in the diet", "Age-related tissue reduction", "Over-exertion without proper recovery"] }
    ],
    redFlags: ["Sudden joint swelling and heat", "Fever accompanying joint pain", "Inability to bear weight"],
    dietarySupports: [{ food: "Turmeric and Ginger", why: "Powerful anti-inflammatory agents that clear metabolic residue" }],
    dietaryAvoids: [{ food: "Cold and dry foods", why: "Increases the quality of dryness in the joint spaces" }],
    lifestyleTips: [
      { title: "Gentle Rotation", desc: "Moving joints through their full range of motion encourages synovial fluid secretion." },
      { title: "Oil Massage", desc: "Applying warm oil to joints provides external lubrication and reduces systemic dryness." }
    ]
  },
  "headache": {
    id: "headache",
    name: "Headache",
    primaryKeyword: "headache relief ayurveda",
    summary: "Localized tension or vascular pressure in the cranial region.",
    modernDesc: "Vascular or muscular tension triggered by stress, dehydration, or neurological signals.",
    ayuDesc: "Headache is caused by pressure or constriction in the mental channels and cranial blood vessels.",
    icon: Brain,
    color: "indigo",
    cluster: "nervous",
    relatedCause: "vata-aggravation" as keyof typeof CAUSES,
    signs: ["Pressure behind eyes", "Tension in temples", "Throbbing sensation"],
    causes: [
      { title: "Neurological Triggers", items: ["High sensory noise environments", "Dehydration and low blood sugar", "Cervical spine tension"] }
    ],
    redFlags: ["Sudden 'thunderclap' headache", "Confusion or fainting", "Fever and neck stiffness"],
    dietarySupports: [{ food: "Hydration with salt/lemon", why: "Restores electrolyte balance and reduces vascular pressure" }],
    dietaryAvoids: [{ food: "Aged cheese and chocolate", why: "Contains compounds that can trigger vascular constriction in sensitive individuals" }],
    lifestyleTips: [
      { title: "Peppermint Oil", desc: "Applying oil to the temples provides a cooling effect and reduces localized muscle tension." },
      { title: "Digital Silence", desc: "Removing sensory input for 15 minutes allows the nervous system to recalibrate and reduce pressure." }
    ]
  }
};
