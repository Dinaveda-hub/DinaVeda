import { Sun, Droplet, Activity, Utensils, Moon } from "lucide-react";
import { RoutineData } from "./types";

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
