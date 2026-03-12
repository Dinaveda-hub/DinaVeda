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
import { sendNotification } from '../services/notificationService';
import notificationRulesRaw from '../data/notificationRules.json';

import { createClient } from '../utils/supabase/client';

import signalConflicts from '../data/rules/signal_conflicts.json';

const notificationRules = notificationRulesRaw as Record<string, { time: string, message: string }>;

const MAX_DAILY_DELTA = 15;
const SIGNAL_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
const MAX_DAILY_CIRCADIAN_PENALTY = 10;

// ─────────────────────────────────────────────
// TOD CYCLE & DISPLACEMENT LOGIC
// ─────────────────────────────────────────────

interface TODWindow {
    start: number;
    end: number;
    name: string;
}

const TOD_WINDOWS: TODWindow[] = [
    { start: 2, end: 6, name: 'early_morning' },
    { start: 6, end: 10, name: 'morning' },
    { start: 10, end: 14, name: 'midday' },
    { start: 14, end: 18, name: 'afternoon' },
    { start: 18, end: 22, name: 'evening' },
    { start: 22, end: 2, name: 'night' }
];

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

/**
 * Calculates the TOD displacement factor and circadian drag.
 * factor = 1.0 (Δ≤1), 0.85 (Δ≤2), 0.7 (Δ≤4), 0.5 (Δ>4)
 */
function getTODFactor(actualTime: string | null, recommendedTod: string): { factor: number; drag: number } {
    if (!actualTime) return { factor: 1.0, drag: 0 };

    const [hours, minutes] = actualTime.split(':').map(Number);
    const actualHour = hours + (minutes / 60);
    const recommendedHour = TOD_RECOMMENDED_HOURS[recommendedTod.toLowerCase()] ?? 12;

    let delta = Math.abs(actualHour - recommendedHour);
    delta = Math.min(delta, 24 - delta); // VIII. Midnight Crossing: correct wrap-around

    let factor = 1.0;
    if (delta <= 1) factor = 1.0;
    else if (delta <= 2) factor = 0.85;
    else if (delta <= 4) factor = 0.7;
    else factor = 0.5;

    const drag = clamp(delta * 0.5, 0, 6);

    return { factor, drag };
}

type NumericKeys = { [K in keyof VedaState]: VedaState[K] extends number ? K : never }[keyof VedaState];

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

export async function applySignal(signalName: string, state: VedaState, userId: string = 'guest', performedAt?: string): Promise<UpdateResult> {
    return applySignals([signalName], state, userId, performedAt);
}

export async function applySignals(signalsList: string[], state: VedaState, userId: string = 'guest', performedAt?: string): Promise<UpdateResult> {
    let uniqueSignals = Array.from(new Set(signalsList));
    if (uniqueSignals.length === 0) return applyEffects(state, []);

    // ─────────────────────────────────────────────
    // 1. SIGNAL CONFLICT RESOLUTION
    // ─────────────────────────────────────────────
    const conflicts = signalConflicts.conflicts as [string, string][];
    const signalsToRemove = new Set<string>();

    for (const [s1, s2] of conflicts) {
        if (uniqueSignals.includes(s1) && uniqueSignals.includes(s2)) {
            const sev1 = severityScore[signalLibrary[s1]?.severity || 'minor'];
            const sev2 = severityScore[signalLibrary[s2]?.severity || 'minor'];

            // Keep the stronger signal. If equal, keep the second one (more recent in theory)
            if (sev1 > sev2) {
                signalsToRemove.add(s2);
            } else {
                signalsToRemove.add(s1);
            }
        }
    }
    uniqueSignals = uniqueSignals.filter(s => !signalsToRemove.has(s));

    const now = new Date();
    const supabase = createClient();

    // 2. Fetch existing cooldowns from Supabase
    // ... (rest of the cooldown logic)
    const { data: cooldowns } = await supabase
        .from("signal_cooldowns")
        .select("signal, last_applied")
        .eq("user_id", userId)
        .in("signal", uniqueSignals);

    const cooldownMap: Record<string, number> = {};
    cooldowns?.forEach((c: { signal: string, last_applied: string }) => {
        cooldownMap[c.signal] = new Date(c.last_applied).getTime();
    });

    // 3. Filter signals based on cooldown logic
    const signalsToApply: string[] = [];
    const upserts: { user_id: string, signal: string, last_applied: string }[] = [];

    uniqueSignals.forEach(signalName => {
        const signal = signalLibrary[signalName];
        if (!signal) return;

        // Skip guard for positive signals
        if (signal.type !== 'negative') {
            signalsToApply.push(signalName);
            return;
        }

        const lastAppliedTime = cooldownMap[signalName];
        const isCooledDown = !lastAppliedTime || (Date.now() - lastAppliedTime > SIGNAL_COOLDOWN_MS);

        if (isCooledDown) {
            signalsToApply.push(signalName);
            upserts.push({
                user_id: userId,
                signal: signalName,
                last_applied: now.toISOString()
            });
        }
    });

    // 4. Upsert new cooldown timestamps
    if (upserts.length > 0 && userId !== 'guest') {
        await supabase.from("signal_cooldowns").upsert(upserts, { onConflict: 'user_id,signal' });
    }

    const effects = signalsToApply
        .map(name => signalLibrary[name]?.effects)
        .filter((e): e is Partial<Record<keyof VedaState, number>> => !!e);

    return applyEffects(state, effects, performedAt, signalsToApply);
}

// ─────────────────────────────────────────────
// BIOLOGICAL MOMENTUM FACTORS
// ─────────────────────────────────────────────
const MOMENTUM_FACTORS: Partial<Record<NumericKeys, number>> = {
    // Doshas (vata, pitta, kapha): 0.8 (Moderate resistance)
    vata: 0.8, pitta: 0.8, kapha: 0.8,
    // Vitality & Fire (ojas, agni): 0.7 (High resistance - fundamental stability)
    ojas: 0.7, agni: 0.7,
    // Circadian & Sleep: 0.7 (High resistance - rhythms take time to shift)
    circadian: 0.7, sleep: 0.8,
    // Physical (stiffness, inflammation, skin): 0.6 (High resistance - slow tissue response)
    stiffness: 0.6, inflammation: 0.6, skin_health: 0.6, hair_health: 0.6,
    // Digestion & Metabolic: 0.8
    digestion: 0.8, elimination: 0.8, appetite: 0.8, energy: 0.8,
    // Fast Shifting (Mental & Fluctuating stats): 0.9
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

    // 1. Aggregate all deltas in the batch (signal_effect)
    const batchDeltas: Partial<Record<NumericKeys, number>> = {};

    for (let i = 0; i < effectsList.length; i++) {
        const effects = effectsList[i];
        const signalName = signalNames[i];

        // Find if this is a protocol with TOD metadata
        const protocol = (protocols as any[]).find(p => p.name === signalName);
        let todFactor = 1.0;
        let todDrag = 0;

        if (protocol && performedAt) {
            const { factor, drag } = getTODFactor(performedAt, protocol.time_of_day);
            const sensitivity = protocol.time_sensitivity ?? 0.5;

            // Calc base penalties
            let effectPenaltyMultiplier = (1.0 - factor) * sensitivity;
            let currentTodDrag = drag * sensitivity;

            // VIII. Sleep Protocol Safeguard: reduce TOD penalty by 50%
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

    // Apply Circadian Drag (capped at 10/day total)
    if (dailyCircadianDrag > 0) {
        const remainingCapacity = MAX_DAILY_CIRCADIAN_PENALTY; // In a stateless session, we assume 10 capacity per batch. In production, this would track daily usage in DB.
        const finalDrag = Math.min(dailyCircadianDrag, remainingCapacity);
        batchDeltas['circadian'] = (batchDeltas['circadian'] || 0) - finalDrag;
    }

    // 2. Apply Pipeline
    const typedBatchKeys = Object.keys(batchDeltas) as NumericKeys[];
    for (const variable of typedBatchKeys) {
        const totalBaseEffect = batchDeltas[variable];
        if (typeof totalBaseEffect !== 'number') continue;

        let effect = totalBaseEffect;

        // I. Seasonal Multiplier (Vata, Pitta, Kapha only)
        if (variable === 'vata') effect *= multipliers.vata;
        else if (variable === 'pitta') effect *= multipliers.pitta;
        else if (variable === 'kapha') effect *= multipliers.kapha;

        // II. Sensitivity Multiplier
        const sensitivityMap = variableSensitivity as Record<NumericKeys, number>;
        const sensitivity = sensitivityMap[variable] ?? 1.0;
        effect *= sensitivity;

        // III. Delta Limit (MAX_DAILY_DELTA = 15)
        const clampedEffect = clamp(effect, -MAX_DAILY_DELTA, MAX_DAILY_DELTA);

        // IV. Biological Momentum Damping
        const momentum = MOMENTUM_FACTORS[variable] ?? 1.0;
        const finalEffect = clampedEffect * momentum;

        // VII. Noise Threshold: Ignore micro-updates (< 0.5) to maintain stability
        if (Math.abs(finalEffect) < 0.5) continue;

        // V. State Update & VI. Clamp (0-100)
        const currentValue = nextState[variable];
        nextState[variable] = clamp(currentValue + finalEffect, 0, 100);
    }

    // 3. Detect Events (Purity: detect but do not execute side effects)
    const events = detectNotificationEvents(nextState);

    return { state: nextState, events };
}

export function updateScores(state: VedaState, _prakriti?: unknown) {
    const vikriti = computeVikriti(state);
    const healthScore = computeHealthScore(state, vikriti.drift_index);
    const ipi = computeIPI(state, vikriti.drift_index);

    return {
        vikriti,
        healthScore,
        ipi
    };
}
