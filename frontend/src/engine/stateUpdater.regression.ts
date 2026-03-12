import { VedaState } from './stateModel';
import signals from '../data/signals.json';
import protocols from '../data/protocols.json';
import { variableSensitivity } from './sensitivityEngine';
import { getSeasonalMultipliers } from './seasonalAdjuster';
import { clamp } from '../utils/clamp';
import { computeVikriti } from './vikritiEngine';
import { computeHealthScore } from './healthScoreEngine';
import { computeIPI } from './imbalancePressureEngine';
import { detectNotificationEvents } from './notificationEventEngine';

import signalConflicts from '../data/rules/signal_conflicts.json';

const MAX_DAILY_DELTA = 15;
const MAX_DAILY_CIRCADIAN_PENALTY = 10;

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
    const drag = clamp(delta * 0.5, 0, 6);
    return { factor, drag };
}

type NumericKeys = { [K in keyof VedaState]: VedaState[K] extends number ? K : never }[keyof VedaState];

const MOMENTUM_FACTORS: Partial<Record<NumericKeys, number>> = {
    vata: 0.8, pitta: 0.8, kapha: 0.8,
    ojas: 0.7, agni: 0.7,
    circadian: 0.7, sleep: 0.8,
    stiffness: 0.6, inflammation: 0.6, skin_health: 0.6, hair_health: 0.6,
    digestion: 0.8, elimination: 0.8, appetite: 0.8, energy: 0.8,
    stress: 0.9, mood: 0.9, mental_clarity: 0.9, irritability: 0.9,
    bloating: 0.9, hydration: 0.9
};

export function applyEffects(
    state: VedaState,
    effectsList: Partial<Record<keyof VedaState, number>>[],
    performedAt?: string,
    signalNames: string[] = []
): UpdateResult {
    const multipliers = getSeasonalMultipliers(state.rutu_index);
    let nextState = { ...state };
    let dailyCircadianDrag = 0;
    const batchDeltas: Partial<Record<NumericKeys, number>> = {};

    for (let i = 0; i < effectsList.length; i++) {
        const effects = effectsList[i];
        const signalName = signalNames[i];
        const protocol = (protocols as any[]).find(p => p.name === signalName);
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
        const sensitivityMap = variableSensitivity as Record<NumericKeys, number>;
        const sensitivity = sensitivityMap[variable] ?? 1.0;
        effect *= sensitivity;
        const clampedEffect = clamp(effect, -MAX_DAILY_DELTA, MAX_DAILY_DELTA);
        const momentum = MOMENTUM_FACTORS[variable] ?? 1.0;
        const finalEffect = clampedEffect * momentum;
        if (Math.abs(finalEffect) < 0.5) continue;
        const currentValue = nextState[variable];
        nextState[variable] = clamp(currentValue + finalEffect, 0, 100);
    }
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
            if (sev1 > sev2) signalsToRemove.add(s2);
            else signalsToRemove.add(s1);
        }
    }
    uniqueSignals = uniqueSignals.filter(s => !signalsToRemove.has(s));
    const signalsToApply = uniqueSignals.filter(name => !!signalLibrary[name]);
    const effects = signalsToApply
        .map(name => signalLibrary[name]?.effects)
        .filter((e): e is Partial<Record<keyof VedaState, number>> => !!e);
    return applyEffects(state, effects, performedAt, signalsToApply);
}
