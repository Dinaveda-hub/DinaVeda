import { VedaState } from "./stateModel";

export type NotificationEvent =
    | "circadian_drift"
    | "weak_agni"
    | "vata_imbalance"
    | "kapha_accumulation"
    | "stress_overload"
    | "pitta_imbalance"
    | "mental_fatigue";

/**
 * Evaluates the current VedaState to detect any critical notification events.
 */
export function detectNotificationEvents(state: VedaState): NotificationEvent[] {
    const events: NotificationEvent[] = [];

    // 1. Circadian Alignment
    if (state.circadian < 60) {
        events.push("circadian_drift");
    }

    // 2. Agni Strength (Digestion)
    if (state.agni < 50) {
        events.push("weak_agni");
    }

    // 3. Dosha Imbalances
    if (state.vata > 70) {
        events.push("vata_imbalance");
    }

    if (state.kapha > 70) {
        events.push("kapha_accumulation");
    }

    if (state.pitta > 70) {
        events.push("pitta_imbalance");
    }

    // 4. Mental & Stress
    if (state.stress > 70) {
        events.push("stress_overload");
    }

    if (state.mental_clarity < 40) {
        events.push("mental_fatigue");
    }

    return events;
}
