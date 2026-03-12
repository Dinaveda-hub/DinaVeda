import { VedaState } from "./stateModel";

export type NotificationEvent =
    | "circadian_drift"
    | "weak_agni"
    | "vata_imbalance"
    | "kapha_accumulation"
    | "stress_overload"
    | "pitta_imbalance"
    | "mental_fatigue"
    | "sleep_debt"
    | "ojas_depletion"
    | "ama_accumulation"
    | "kapha_stagnation"
    | "pitta_inflammation";

/**
 * Priority levels for events (Higher = More critical/urgent)
 */
const EVENT_PRIORITIES: Record<NotificationEvent, number> = {
    stress_overload: 3,
    vata_imbalance: 3,
    pitta_imbalance: 3,
    pitta_inflammation: 3,
    weak_agni: 2,
    ama_accumulation: 2,
    kapha_accumulation: 2,
    kapha_stagnation: 2,
    sleep_debt: 2,
    circadian_drift: 1,
    mental_fatigue: 1,
    ojas_depletion: 1
};

/**
 * Evaluates the current VedaState to detect any critical notification events.
 * Results are sorted by priority (descending).
 */
export function detectNotificationEvents(state: VedaState): NotificationEvent[] {
    const events: NotificationEvent[] = [];

    // 1. Circadian & Sleep
    if (state.circadian < 60) events.push("circadian_drift");
    if (state.sleep < 50) events.push("sleep_debt");

    // 2. Digestion & Metabolism
    if (state.agni < 50) events.push("weak_agni");
    if (state.ama > 40) events.push("ama_accumulation");

    // 3. Dosha Imbalances
    if (state.vata > 70) events.push("vata_imbalance");
    if (state.pitta > 70) {
        if (state.inflammation > 60) {
            events.push("pitta_inflammation");
        } else {
            events.push("pitta_imbalance");
        }
    }
    
    if (state.kapha > 70) {
        if (state.movement < 40) {
            events.push("kapha_stagnation");
        } else {
            events.push("kapha_accumulation");
        }
    }

    // 4. Mental, Stress & Vitality
    if (state.stress > 70) events.push("stress_overload");
    if (state.mental_clarity < 40) events.push("mental_fatigue");
    if (state.ojas < 40) events.push("ojas_depletion");

    // Sort by priority (Highest first)
    return events.sort((a, b) => EVENT_PRIORITIES[b] - EVENT_PRIORITIES[a]);
}
