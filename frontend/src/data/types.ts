import { LucideIcon } from "lucide-react";

export type ColorTheme = "blue" | "orange" | "indigo" | "slate" | "emerald" | "amber" | "rose" | "gold";

export interface SymptomData {
  id: string;
  name: string;
  summary: string;
  modernDesc: string;
  ayuDesc: string;
  icon: LucideIcon;
  color: ColorTheme;
  cluster: "digestive" | "mental" | "energy" | "skin" | "metabolism";
  relatedCause?: string; // Will be typed as keyof typeof CAUSES in the specific files or via a generic
}

export interface DoshaData {
  id: string;
  name: string;
  elements: string;
  role: string;
  color: ColorTheme;
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
  icon: LucideIcon;
  color: ColorTheme;
  recommendedProtocol: string; // Will be typed as keyof typeof PROTOCOL_GUIDES
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
    icon: LucideIcon;
  }[];
}

export interface RawProtocol {
  name: string;
  module: string;
  category: string;
  time_of_day?: string;
  duration?: string;
  variables: Record<string, number | undefined>;
  instructions: string;
  contraindications: string[];
  tags: string[];
  is_premium: boolean;
}
