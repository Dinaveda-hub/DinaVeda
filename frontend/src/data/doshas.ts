import { DoshaData } from "./types";

export const DOSHAS: Record<string, DoshaData> = {
  "vata": {
    id: "vata",
    name: "Vata",
    elements: "Space + Air",
    role: "Movement & Nervous System",
    color: "indigo"
  },
  "pitta": {
    id: "pitta",
    name: "Pitta",
    elements: "Fire + Water",
    role: "Transformation & Metabolism",
    color: "orange"
  },
  "kapha": {
    id: "kapha",
    name: "Kapha",
    elements: "Water + Earth",
    role: "Structure & Immunity",
    color: "emerald"
  }
};
