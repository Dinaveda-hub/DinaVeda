import { VedaState } from './stateModel';
import signals from '../data/signals.json';
import protocols from '../data/protocols.json';
import { getSensitivityMultiplier } from './sensitivityEngine';
import { getSeasonalMultipliers } from './seasonalAdjuster';
import { ENGINE_CONFIG } from './config';

const { clamp } = ENGINE_CONFIG.ranges;
import { computeVikriti } from './vikritiEngine';
import { computeHealthScore } from './healthScoreEngine';
import { computeIPI } from './imbalancePressureEngine';
import { detectNotificationEvents } from './notificationEventEngine';
import { applyMomentum } from './physiologyMomentum';
import { applyBaselineStabilizer } from './baselineStabilizer';

import signalConflicts from '../data/rules/signal_conflicts.json';
import { getRutuIndex } from './rutuDriftEngine';

const MAX_DAILY_DELTA = 15;
const MAX_DAILY_CIRCADIAN_PENALTY = 10;

// O(1) Protocol Lookup Cache
const protocolMap = new Map((protocols as any[]).map(p => [p.name, p]));

const signalLibrary = signals as Record<string, {
    type?: 'negative' | 'positive',
    severity?: 'minor' | 'moderate' | 'major',
    synonyms: string[],
    effects: Partial<Record<keyof VedaState, number>>
}>;

const severityScore: Record<string, number> = {
    'minor': 1,
    'moderate': 2,
    'major': 3
};

interface UpdateResult {
    state: VedaState;
    events: string[];
}

const TOD_RECOMMENDED_HOURS: Record<string, number> = {
    'morning': 7,
    'before_meal': 12,
    'midday': 13,
    'after_meal': 14,
    'afternoon': 16,
    'evening': 19,
    'night': 23,
    'daily': 12,
    'any': 12,
    'meal_time': 13
};

function getTODFactor(actualTime: string | null, recommendedTod: string): { factor: number; drag: number } {
    if (!actualTime) return { factor: 1.0, drag: 0 };
    const [hours, minutes] = actualTime.split(':').map(Number);
    const actualHour = hours + (minutes / 60);
    const recommendedHour = TOD_RECOMMENDED_HOURS[recommendedTod.toLowerCase()] ?? 12;
    let delta = Math.abs(actualHour - recommendedHour);
    delta = Math.min(delta, 24 - delta);
    let factor = 1.0;
    if (delta <= 1) factor = 1.0;
    else if (delta <= 2) factor = 0.85;
    else if (delta <= 4) factor = 0.7;
    else factor = 0.5;
    const drag = clamp(delta * 0.5);
    return { factor, drag };
}

type NumericKeys = { [K in keyof VedaState]: VedaState[K] extends number ? K : never }[keyof VedaState];

// (MOMENTUM_FACTORS removed here to be handled by applyMomentum)

export function applyEffects(
    state: VedaState,
    effectsList: Partial<Record<keyof VedaState, number>>[],
    performedAt?: string,
    signalNames: string[] = []
): UpdateResult {
    const rutuIndex = getRutuIndex();
    const multipliers = getSeasonalMultipliers(rutuIndex);
    let nextState = { ...state };
    let dailyCircadianDrag = 0;
    const batchDeltas: Partial<Record<NumericKeys, number>> = {};

    for (let i = 0; i < effectsList.length; i++) {
        const effects = effectsList[i];
        const signalName = signalNames[i];
        const protocol = protocolMap.get(signalName);
        let todFactor = 1.0;
        if (protocol && performedAt) {
            const { factor, drag } = getTODFactor(performedAt, protocol.time_of_day);
            const sensitivity = protocol.time_sensitivity ?? 0.5;
            let effectPenaltyMultiplier = (1.0 - factor) * sensitivity;
            let currentTodDrag = drag * sensitivity;
            if (protocol.category === 'sleep') {
                effectPenaltyMultiplier *= 0.5;
                currentTodDrag *= 0.5;
            }
            todFactor = 1.0 - effectPenaltyMultiplier;
            dailyCircadianDrag += currentTodDrag;
        }
        for (const [key, value] of Object.entries(effects)) {
            const variable = key as keyof VedaState;
            if (variable !== 'is_onboarded' && typeof value === 'number') {
                const numKey = variable as NumericKeys;
                const scaledValue = value * todFactor;
                batchDeltas[numKey] = (batchDeltas[numKey] || 0) + scaledValue;
            }
        }
    }

    if (dailyCircadianDrag > 0) {
        const remainingCapacity = MAX_DAILY_CIRCADIAN_PENALTY;
        const finalDrag = Math.min(dailyCircadianDrag, remainingCapacity);
        batchDeltas['circadian'] = (batchDeltas['circadian'] || 0) - finalDrag;
    }

    const typedBatchKeys = Object.keys(batchDeltas) as NumericKeys[];
    for (const variable of typedBatchKeys) {
        const totalBaseEffect = batchDeltas[variable];
        if (typeof totalBaseEffect !== 'number') continue;
        let effect = totalBaseEffect;
        if (variable === 'vata') effect *= multipliers.vata;
        else if (variable === 'pitta') effect *= multipliers.pitta;
        else if (variable === 'kapha') effect *= multipliers.kapha;
        // VI. Sensitivity Multiplier (Base Sensitivity * Constitution Elasticity)
        const sensitivity = getSensitivityMultiplier(variable, nextState);
        effect *= sensitivity;
        
        // Apply capped delta manually since it's not a 0-100 clamp
        let clampedEffect = effect;
        if (clampedEffect > MAX_DAILY_DELTA) clampedEffect = MAX_DAILY_DELTA;
        if (clampedEffect < -MAX_DAILY_DELTA) clampedEffect = -MAX_DAILY_DELTA;
        
        // V. State Update & VI. Clamp (0-100)
        const currentValue = nextState[variable];
        nextState[variable] = clamp(currentValue + clampedEffect);
    }

    // 3. Apply Biological Momentum Smoothing (Centralized)
    nextState = applyMomentum(state, nextState);

    // 4. Adaptive Baseline Stabilization (Constitutional Attractor)
    // Runs after momentum to ensure baseline anchoring is the final stabilization layer.
    const currentVikriti = computeVikriti(nextState);
    nextState = applyBaselineStabilizer(nextState, currentVikriti.drift_index);

    const events = detectNotificationEvents(nextState);
    return { state: nextState, events };
}

export function applySignalsRegression(signalsList: string[], state: VedaState, performedAt?: string): UpdateResult {
    let uniqueSignals = Array.from(new Set(signalsList));
    if (uniqueSignals.length === 0) return applyEffects(state, []);
    const conflicts = signalConflicts.conflicts as [string, string][];
    const signalsToRemove = new Set<string>();
    for (const [s1, s2] of conflicts) {
        if (uniqueSignals.includes(s1) && uniqueSignals.includes(s2)) {
            const sev1 = severityScore[signalLibrary[s1]?.severity || 'minor'];
            const sev2 = severityScore[signalLibrary[s2]?.severity || 'minor'];

            // If severity is equal or sev2 is higher, prefer s2 (the later entry in theoretical timeline)
            if (sev1 > sev2) {
                signalsToRemove.add(s2);
            } else {
                signalsToRemove.add(s1);
            }
        }
    }
    uniqueSignals = uniqueSignals.filter(s => !signalsToRemove.has(s));
    const signalsToApply = uniqueSignals.filter(name => {
        if (!signalLibrary[name]) {
            console.warn(`Engine Warning: Unknown signal detected: ${name}`);
            return false;
        }
        return true;
    });
    const effects = signalsToApply
        .map(name => signalLibrary[name]?.effects)
        .filter((e): e is Partial<Record<keyof VedaState, number>> => !!e);
    return applyEffects(state, effects, performedAt, signalsToApply);
}
