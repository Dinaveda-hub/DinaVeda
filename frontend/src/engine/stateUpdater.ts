import { VedaState } from './stateModel';
import signals from '../data/signals.json';
import protocols from '../data/protocols.json';
import { runPhysiologyCycle } from './physiologyOrchestrator';
import { ENGINE_CONFIG } from './config';

const { clamp } = ENGINE_CONFIG.ranges;

import { createClient } from '../utils/supabase/client';
import { ProtocolWeights } from '@/utils/userWeightsService';

import signalConflicts from '../data/rules/signal_conflicts.json';

const MAX_DAILY_DELTA = 15;
const SIGNAL_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
const MAX_DAILY_CIRCADIAN_PENALTY = 10;

// O(1) Protocol Lookup Cache
const protocolMap = new Map((protocols as any[]).map(p => [p.name, p]));

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

    const drag = clamp(delta * 0.5);

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

export async function applySignals(
    signalsList: string[], 
    state: VedaState, 
    userId: string = 'guest', 
    performedAt?: string,
    userWeights: ProtocolWeights = {},
    healthGoal: string = "general_wellness"
): Promise<UpdateResult> {
    let uniqueSignals = Array.from(new Set(signalsList));
    if (uniqueSignals.length === 0) return applyEffects(state, [], performedAt, [], userWeights, healthGoal);

    // ─────────────────────────────────────────────
    // 1. SIGNAL CONFLICT RESOLUTION
    // ─────────────────────────────────────────────
    const conflicts = signalConflicts.conflicts as [string, string][];
    const signalsToRemove = new Set<string>();

    for (const [s1, s2] of conflicts) {
        if (uniqueSignals.includes(s1) && uniqueSignals.includes(s2)) {
            const sev1 = severityScore[signalLibrary[s1]?.severity || 'minor'];
            const sev2 = severityScore[signalLibrary[s2]?.severity || 'minor'];

            // If severity is equal or sev2 is higher, prefer s2 (the later entry)
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
        if (!signal) {
            console.warn(`Engine Warning: Unknown signal detected: ${signalName}`);
            return;
        }

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

    return applyEffects(state, effects, performedAt, signalsToApply, userWeights, healthGoal);
}

// (MOMENTUM_FACTORS removed here to be handled by applyMomentum)

export function applyEffects(
    state: VedaState,
    effectsList: Partial<Record<keyof VedaState, number>>[],
    performedAt?: string,
    signalNames: string[] = [],
    userWeights: ProtocolWeights = {},
    healthGoal: string = "general_wellness"
): UpdateResult {
    let nextState = { ...state };
    let dailyCircadianDrag = 0;

    // 1. Aggregate all deltas in the batch (signal_effect)
    const batchDeltas: Partial<Record<NumericKeys, number>> = {};

    for (let i = 0; i < effectsList.length; i++) {
        const effects = effectsList[i];
        const signalName = signalNames[i];

        // Find if this is a protocol with TOD metadata (O(1) lookup)
        const protocol = protocolMap.get(signalName);
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

    // Apply Circadian Drag persistently (capped at 10/day total)
    if (dailyCircadianDrag > 0) {
        // Read previous drag from state, add current batch's drag
        const currentTotalDrag = (nextState.daily_circadian_drag || 0) + dailyCircadianDrag;
        const clampedNewDrag = Math.min(currentTotalDrag, MAX_DAILY_CIRCADIAN_PENALTY);
        
        // Calculate the actual effective drag applied in this batch
        const effectiveDragThisBatch = clampedNewDrag - (nextState.daily_circadian_drag || 0);
        
        if (effectiveDragThisBatch > 0) {
            batchDeltas['circadian'] = (batchDeltas['circadian'] || 0) - effectiveDragThisBatch;
            nextState.daily_circadian_drag = clampedNewDrag;
        }
    }

    // 2. Apply Raw Deltas (clamped 0-100)
    // Only evolve the 5 core axes directly. 
    // Any derived variables in the signal vector are currently ignored (or should be mapped).
    const CORE_AXES: (keyof VedaState)[] = ['vata_axis', 'pitta_axis', 'kapha_axis', 'agni_axis', 'ojas_axis'];
    
    for (const variable of CORE_AXES) {
        const numKey = variable as NumericKeys;
        const totalBaseEffect = batchDeltas[numKey];
        if (typeof totalBaseEffect !== 'number') continue;

        const currentValue = nextState[variable] as number;
        nextState[variable] = clamp(currentValue + totalBaseEffect) as never;
    }

    // 3. Delegate to central physiology orchestrator 
    // This executes: Momentum -> Seasonal Drift -> Recovery -> Baseline Stabilizer -> Analysis -> Events
    const { state: stabilizedState, notifications } = runPhysiologyCycle(
        state,              // previous state
        nextState,          // raw signaled state
        userWeights,
        healthGoal
    );

    return { state: stabilizedState, events: notifications };
}
