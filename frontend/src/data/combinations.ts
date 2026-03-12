import { CombinationContent } from "./types";

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
  "anxiety-pitta": {
    title: "Pitta Anxiety: Intensity & Pressure",
    intro: "Pitta-type anxiety manifests as perfectionism, intensity, and a feeling of being 'under pressure'.",
    whyItHappens: "Excessive Fire (Pitta) in the mind leads to criticism, impatience, and an internal 'overheating'.",
    signs: [
      "Irritability and perfectionist tendencies",
      "Excessive heat in the body when stressed",
      "Controlling behavior and sharp speech",
      "Worsened by hot weather and skipped meals"
    ],
    protocol: [
      { title: "Cooling Visualization", desc: "Meditate on an open blue sky or large body of water." },
      { title: "Fennel Infusion", desc: "Sip cool (not iced) fennel tea throughout the afternoon." },
      { title: "The 80% Rule", desc: "Purposefully stop working at 80% capacity to avoid overheating." }
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
