import { Activity, Moon, Utensils, Zap, BrainCircuit, CloudSun, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ModuleDefinition {
    id: string;
    title: string;
    subtitle: string;
    icon: LucideIcon;
    color: string;
    text: string;
    element: string;
    principles: string;
    vedaInsight: string;
    stats: { label: string; getValue: (s: any, v?: any) => string }[];
}

export const MODULES: ModuleDefinition[] = [
    {
        id: "somasleep",
        title: "Somasleep",
        subtitle: "Nidra & Sleep Architecture",
        icon: Moon,
        color: "bg-air",
        text: "text-blue-800",
        element: "Air & Space",
        principles: "Nidra is the natural state of restoration. Proper Sleep provides strength, immunity, and cognitive clarity.",
        vedaInsight: "The Charaka Samhita defines Nidra as one of the 'Trayopastambha' (Three Pillars of Life). It is essential for the nourishment of Ojas.",
        stats: [
            { label: "Circadian Sync", getValue: (s: any) => `${Math.round(s.circadian)}%` },
            { label: "Sleep Quality", getValue: (s: any) => s.circadian > 80 ? "Restorative" : "Disrupted" }
        ]
    },
    {
        id: "nutriveda",
        title: "Nutriveda",
        subtitle: "Ahara & Food Medicine",
        icon: Utensils,
        color: "bg-water",
        text: "text-teal-800",
        element: "Water & Earth",
        principles: "Ahara is the primary source of biological fuel. When diet is correct, medicine is of no need.",
        vedaInsight: "Ahara dictates the quality of all seven Dhatus (tissues).",
        stats: [
            { label: "Agni Strength", getValue: (s: any) => `${Math.round(s.agni)}/100` },
            { label: "Metabolic State", getValue: (s: any) => s.agni > 75 ? "Teekshna (Sharp)" : s.agni > 50 ? "Sama (Balanced)" : "Manda (Dull)" }
        ]
    },
    {
        id: "dinaveda",
        title: "Dinaveda",
        subtitle: "Dinacharya & Daily Rituals",
        icon: Activity,
        color: "bg-earth",
        text: "text-forest",
        element: "Earth",
        principles: "Mastery over the self begins with mastery over the day. Daily rhythm establishes the biological clock.",
        vedaInsight: "Dinacharya aligns your individual biological rhythm with the cosmic solar cycle to prevent chronic imbalances.",
        stats: [
            { label: "Ojas Core", getValue: (s: any) => `${Math.round(s.ojas_score)}` },
            { label: "Vitality State", getValue: (s: any) => s.ojas_score > 85 ? "Excellent" : "Stable" }
        ]
    },
    {
        id: "rutuveda",
        title: "Rutuveda",
        subtitle: "Ritucharya & Seasonality",
        icon: CloudSun,
        color: "bg-fire",
        text: "text-orange-900",
        element: "Fire",
        principles: "As the universe shifts, so must the inner biological fire. Harmony with seasons prevents disease.",
        vedaInsight: "Each Ritu (season) requires specific shifts in Ahara and Vihara. Kapha accumulates in winter and melts in spring.",
        stats: [
            { label: "Current Ritu", getValue: () => getCurrentRitu().name },
            { label: "Dosha Risk", getValue: () => getCurrentRitu().doshaRisk }
        ]
    },
    {
        id: "ayufit",
        title: "Ayufit",
        subtitle: "Vyayama & Flow State",
        icon: Zap,
        color: "bg-fire",
        text: "text-orange-800",
        element: "Fire",
        principles: "Movement should provide lightness and strength without exhaustion. Exercise to half capacity.",
        vedaInsight: "Vyayama brings 'Laghava' (lightness) to the body. Excessive exercise generates Vata.",
        stats: [
            { label: "Physical Strain", getValue: (s: any) => s.vata > 15 ? "High Vata" : "Balanced" },
            { label: "Movement Pulse", getValue: () => "Stable" }
        ]
    },
    {
        id: "manasayur",
        title: "Manasayur",
        subtitle: "Sadvritta & Mental Flow",
        icon: BrainCircuit,
        color: "bg-air",
        text: "text-blue-900",
        element: "Air",
        principles: "The mind follows the body, and the body follows the mind. Cognitive clarity is the ultimate Ojas.",
        vedaInsight: "Mental hygiene prevents Pragyaparadha (crimes against wisdom).",
        stats: [
            { label: "Mental Clarity", getValue: (s: any) => s.vata < 10 ? "Clear (Sattvic)" : "Active (Rajasic)" },
            { label: "Stress Load", getValue: (s: any) => s.ojas_score < 70 ? "Elevated" : "Low" }
        ]
    },
    {
        id: "sattvaliving",
        title: "Sattvaliving",
        subtitle: "Ethical & Harmonious Life",
        icon: Leaf,
        color: "bg-earth",
        text: "text-forest",
        element: "Space",
        principles: "Sattva is the quality of clarity, harmony, and balance. Daily behavioral rituals cultivate inner purity.",
        vedaInsight: "Sadvritta (ethical conduct) and daily behavioral hygiene prevent Pragyaparadha and maintain Ojas over time.",
        stats: [
            { label: "Stress Load", getValue: (s: any) => `${Math.round(s.stress_load)}/100` },
            { label: "Mental Clarity", getValue: (s: any) => s.mental_clarity > 60 ? "Clear (Sattvic)" : "Clouded (Tamasic)" }
        ]
    },
];

// ─────────────────────────────────────────────────────────
// Fast lookup map: slug → ModuleDefinition
// ─────────────────────────────────────────────────────────
export const MODULE_MAP = new Map(MODULES.map(m => [m.id, m]));

// ─────────────────────────────────────────────────────────
// Season Engine (Ritu)
// ─────────────────────────────────────────────────────────

interface RituInfo {
    name: string;
    sanskrit: string;
    doshaRisk: string;
    months: string;
}

const RITU_CALENDAR: RituInfo[] = [
    { name: "Shishira (Late Winter)", sanskrit: "शिशिर", doshaRisk: "Kapha Accumulation", months: "Jan–Mar" },
    { name: "Vasanta (Spring)", sanskrit: "वसन्त", doshaRisk: "Kapha Aggravation", months: "Mar–May" },
    { name: "Grishma (Summer)", sanskrit: "ग्रीष्म", doshaRisk: "Pitta Accumulation", months: "May–Jul" },
    { name: "Varsha (Monsoon)", sanskrit: "वर्षा", doshaRisk: "Vata Aggravation", months: "Jul–Sep" },
    { name: "Sharad (Autumn)", sanskrit: "शरद्", doshaRisk: "Pitta Aggravation", months: "Sep–Nov" },
    { name: "Hemanta (Early Winter)", sanskrit: "हेमन्त", doshaRisk: "Vata Pacification", months: "Nov–Jan" },
];

/**
 * Returns the current Ritu based on the month.
 * Mapping: Jan-Feb → Shishira, Mar-Apr → Vasanta, May-Jun → Grishma,
 *          Jul-Aug → Varsha, Sep-Oct → Sharad, Nov-Dec → Hemanta
 */
export function getCurrentRitu(): RituInfo {
    const month = new Date().getMonth(); // 0-indexed
    const index = Math.floor(month / 2); // 0→0, 1→0, 2→1, 3→1, ...
    return RITU_CALENDAR[index];
}
