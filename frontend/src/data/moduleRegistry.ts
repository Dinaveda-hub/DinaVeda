import { Activity, Moon, Utensils, Zap, BrainCircuit, CloudSun, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { VedaState } from "@/engine/stateModel";
import { VikritiMetrics } from "@/engine/vikritiEngine";

export type ModuleId =
    | "somasleep"
    | "nutriveda"
    | "dinaveda"
    | "rutuveda"
    | "ayufit"
    | "manasayur"
    | "sattvaliving";

export interface ModuleDefinition {
    id: ModuleId;
    title: string;
    subtitle: string;
    icon: LucideIcon;
    color: "air" | "water" | "earth" | "fire" | "space";
    element: string;
    principles: string;
    vedaInsight: string;
    stats: { label: string; getValue: (state: VedaState, vikriti?: VikritiMetrics) => string }[];
}

export const MODULES: ModuleDefinition[] = [
    {
        id: "somasleep",
        title: "Somasleep",
        subtitle: "Nidra & Sleep Architecture",
        icon: Moon,
        color: "air",
        element: "Air & Space",
        principles: "Nidra is the natural state of restoration. Proper Sleep provides strength, immunity, and cognitive clarity.",
        vedaInsight: "The Charaka Samhita defines Nidra as one of the 'Trayopastambha' (Three Pillars of Life). It is essential for the nourishment of Ojas.",
        stats: [
            { label: "Circadian Sync", getValue: (s) => `${Math.round(s.circadian)}%` },
            { label: "Sleep Quality", getValue: (s) => s.circadian > 80 ? "Restorative" : "Disrupted" }
        ]
    },
    {
        id: "nutriveda",
        title: "Nutriveda",
        subtitle: "Ahara & Food Medicine",
        icon: Utensils,
        color: "water",
        element: "Water & Earth",
        principles: "Ahara is the primary source of biological fuel. When diet is correct, medicine is of no need.",
        vedaInsight: "Ahara dictates the quality of all seven Dhatus (tissues).",
        stats: [
            { label: "Agni Strength", getValue: (s) => `${Math.round(s.agni)}/100` },
            { label: "Metabolic State", getValue: (s) => s.agni > 75 ? "Teekshna (Sharp)" : s.agni > 50 ? "Sama (Balanced)" : "Manda (Dull)" }
        ]
    },
    {
        id: "dinaveda",
        title: "Dinaveda",
        subtitle: "Dinacharya & Daily Rituals",
        icon: Activity,
        color: "earth",
        element: "Earth",
        principles: "Mastery over the self begins with mastery over the day. Daily rhythm establishes the biological clock.",
        vedaInsight: "Dinacharya aligns your individual biological rhythm with the cosmic solar cycle to prevent chronic imbalances.",
        stats: [
            { label: "Ojas Core", getValue: (s) => `${Math.round(s.ojas)}` },
            { label: "Vitality State", getValue: (s) => s.ojas > 85 ? "Excellent" : "Stable" }
        ]
    },
    {
        id: "rutuveda",
        title: "Rutuveda",
        subtitle: "Ritucharya & Seasonality",
        icon: CloudSun,
        color: "fire",
        element: "Fire",
        principles: "As the universe shifts, so must the inner biological fire. Harmony with seasons prevents disease.",
        vedaInsight: "Each Ritu (season) requires specific shifts in Ahara and Vihara. Kapha accumulates in winter and melts in spring.",
        stats: [
            { label: "Current Ritu", getValue: () => CURRENT_RITU.name },
            { label: "Dosha Risk", getValue: () => CURRENT_RITU.doshaRisk }
        ]
    },
    {
        id: "ayufit",
        title: "Ayufit",
        subtitle: "Vyayama & Flow State",
        icon: Zap,
        color: "fire",
        element: "Fire",
        principles: "Movement should provide lightness and strength without exhaustion. Exercise to half capacity.",
        vedaInsight: "Vyayama brings 'Laghava' (lightness) to the body. Excessive exercise generates Vata.",
        stats: [
            { label: "Physical Strain", getValue: (s) => s.vata > 65 ? "High Vata" : "Balanced" },
            { label: "Movement Pulse", getValue: () => "Stable" }
        ]
    },
    {
        id: "manasayur",
        title: "Manasayur",
        subtitle: "Sadvritta & Mental Flow",
        icon: BrainCircuit,
        color: "air",
        element: "Air",
        principles: "The mind follows the body, and the body follows the mind. Cognitive clarity is the ultimate Ojas.",
        vedaInsight: "Mental hygiene prevents Pragyaparadha (crimes against wisdom).",
        stats: [
            { label: "Mental Clarity", getValue: (s) => s.vata < 35 ? "Clear (Sattvic)" : "Active (Rajasic)" },
            { label: "Stress Load", getValue: (s) => s.ojas < 40 ? "Elevated" : "Low" }
        ]
    },
    {
        id: "sattvaliving",
        title: "Sattvaliving",
        subtitle: "Ethical & Harmonious Life",
        icon: Leaf,
        color: "earth",
        element: "Space",
        principles: "Sattva is the quality of clarity, harmony, and balance. Daily behavioral rituals cultivate inner purity.",
        vedaInsight: "Sadvritta (ethical conduct) and daily behavioral hygiene prevent Pragyaparadha and maintain Ojas over time.",
        stats: [
            { label: "Stress Load", getValue: (s) => `${Math.round(s.stress)}/100` },
            { label: "Mental Clarity", getValue: (s) => s.mental_clarity > 60 ? "Clear (Sattvic)" : "Clouded (Tamasic)" }
        ]
    },
];

// ─────────────────────────────────────────────────────────
// Fast lookup map: ModuleId → ModuleDefinition
// ─────────────────────────────────────────────────────────
export const MODULE_MAP: Record<ModuleId, ModuleDefinition> = Object.fromEntries(
    MODULES.map(m => [m.id, m])
) as Record<ModuleId, ModuleDefinition>;

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
    return RITU_CALENDAR[index] ?? RITU_CALENDAR[0];
}

export const CURRENT_RITU = getCurrentRitu();
