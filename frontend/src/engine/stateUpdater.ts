/**
 * stateUpdater.ts
 *
 * The HEART of the Dinaveda Health OS.
 * Every physiological change flows through this file.
 *
 * PIPELINE:
 * Signal → Seasonal Adjustment → Variable Sensitivity → State Update → Clamp → Score Recalculation
 *
 * GOLDEN RULE:
 * Only applySignal() should change physiology variables.
 */

import { VedaState } from './stateModel';
import signals from '../data/signals.json';
import { variableSensitivity } from './sensitivityEngine'; // This now reads from the new JSON internally
import { getSeasonalMultipliers } from './seasonalAdjuster';
import { clamp } from '../utils/clamp';
import { computeVikriti } from './vikritiEngine';
import { computeHealthScore } from './healthScoreEngine';
import { computeIPI } from './imbalancePressureEngine';
import { detectNotificationEvents, NotificationEvent } from './notificationEventEngine';
import { sendNotification } from '../services/notificationService';
import notificationRulesRaw from '../data/notificationRules.json';

const notificationRules = notificationRulesRaw as Record<string, { time: string, message: string }>;

// Signals data is an array, mapping to Record for easy lookup
const signalMap: Record<string, any> = (signals as any[]).reduce((acc, s) => {
    acc[s.signal] = s;
    return acc;
}, {} as any);

/**
 * The singular entry point for physiological changes FROM A SIGNAL NAME.
 */
export function applySignal(signalName: string, state: VedaState, userId?: string): VedaState {
    const signal = signalMap[signalName];
    if (!signal) return state;

    return applyEffects(state, [signal.effects], userId);
}

/**
 * Plural version for multiple signal names.
 */
export function applySignals(signalsList: string[], state: VedaState, userId?: string): VedaState {
    let nextState = { ...state };
    for (const name of signalsList) {
        nextState = applySignal(name, nextState, userId);
    }
    return nextState;
}

/**
 * Applies raw effects directly to the state, following the full pipeline.
 * Use this for quiz completions or check-ins.
 */
export function applyEffects(
    state: VedaState,
    effectsList: Partial<Record<keyof VedaState, number>>[],
    userId?: string
): VedaState {
    const seasonMultipliers = getSeasonalMultipliers(state.rutu_season || 'spring');
    let nextState = { ...state };

    for (const effects of effectsList) {
        for (const [variable, baseEffect] of Object.entries(effects)) {
            if (variable in nextState && typeof baseEffect === 'number') {

                // 1. Seasonal Adjustment (applied to dosha states)
                let adjustedEffect = baseEffect;
                if (variable === 'vata_state') adjustedEffect *= seasonMultipliers.vata_multiplier;
                if (variable === 'pitta_state') adjustedEffect *= seasonMultipliers.pitta_multiplier;
                if (variable === 'kapha_state') adjustedEffect *= seasonMultipliers.kapha_multiplier;

                // 2. Variable Sensitivity Scaling
                const sensitivity = (variableSensitivity as any)[variable] || 1.0;
                const finalEffect = adjustedEffect * sensitivity;

                // 3. State Update
                (nextState as any)[variable] += finalEffect;

                // 4. Clamp (0-100)
                (nextState as any)[variable] = clamp((nextState as any)[variable], 0, 100);
            }
        }
    }

    // 5. Notification Triggering (if userId available)
    if (userId) {
        const events = detectNotificationEvents(nextState);
        for (const event of events) {
            const rule = notificationRules[event];
            if (rule) {
                // Fire and forget notification
                sendNotification(userId, rule.message).catch(err =>
                    console.error("Failed to send notification:", err)
                );
            }
        }
    }

    return nextState;
}

/**
 * Natural recovery toward prakriti baseline.
 */
export function applyNightlyRecovery(state: VedaState, prakriti: { vata: number, pitta: number, kapha: number }): VedaState {
    const nextState = { ...state };
    const recoveryRate = 0.1;

    nextState.vata_state -= (nextState.vata_state - prakriti.vata) * recoveryRate;
    nextState.pitta_state -= (nextState.pitta_state - prakriti.pitta) * recoveryRate;
    nextState.kapha_state -= (nextState.kapha_state - prakriti.kapha) * recoveryRate;

    // Standard clamping
    nextState.vata_state = clamp(nextState.vata_state, 0, 100);
    nextState.pitta_state = clamp(nextState.pitta_state, 0, 100);
    nextState.kapha_state = clamp(nextState.kapha_state, 0, 100);

    return nextState;
}

/**
 * Recalculates all scores.
 */
export function updateScores(state: VedaState, _prakriti?: any) {
    const vikriti = computeVikriti(state);
    const healthScore = computeHealthScore(state, vikriti.drift_index);
    const ipi = computeIPI(state, vikriti.drift_index);

    return {
        vikriti,
        healthScore,
        ipi
    };
}
