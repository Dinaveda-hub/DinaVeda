/**
 * notificationEventEngine.ts
 *
 * DETECTS: Physiology change → event
 * Detects specific physiological triggers that should result in a notification.
 */

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
    if (state.circadian_alignment < 60) {
        events.push("circadian_drift");
    }

    // 2. Agni Strength (Digestion)
    if (state.agni_strength < 50) {
        events.push("weak_agni");
    }

    // 3. Dosha Imbalances
    if (state.vata_state > 65) {
        events.push("vata_imbalance");
    }

    if (state.kapha_state > 65) {
        events.push("kapha_accumulation");
    }

    // Note: pitta_state might need to be added to stateModel if not present, 
    // but assuming standard 26 variables for now.
    if ((state as any).pitta_state > 65) {
        events.push("pitta_imbalance");
    }

    // 4. Mental & Stress
    if (state.stress_load > 70) {
        events.push("stress_overload");
    }

    if ((state as any).mental_clarity < 40) {
        events.push("mental_fatigue");
    }

    return events;
}
