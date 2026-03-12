import { VedaState } from './stateModel';
import { Protocol } from './protocolSelectionEngine';
import { createClient } from '@/utils/supabase/client';

/**
 * effectLearningEngine.ts
 * 
 * The adaptive layer of Dinaveda.
 * Measures the actual physiological impact of protocols and updates user-specific weights.
 */

export interface ProtocolCompletionLog {
    id: string;
    protocol_name: string;
    state_before: VedaState;
    state_after?: VedaState;
    completed_at: string;
    processed: boolean;
}

/**
 * Calculates the effectiveness score for a protocol based on the change in state.
 * Score is between -1.0 and 1.0.
 * Positive score means the protocol worked as intended (or better).
 */
export function calculateEffectiveness(
    before: VedaState,
    after: VedaState,
    protocol: Protocol
): number {
    let score = 0;
    let weightSum = 0;

    for (const [key, theoreticalEffect] of Object.entries(protocol.variables)) {
        const varName = key as keyof VedaState;
        if (typeof before[varName] !== 'number' || typeof after[varName] !== 'number') continue;

        const actualChange = (after[varName] as number) - (before[varName] as number);
        
        // Effectiveness = (Actual Change * Theoretical Direction)
        // If theoreticalEffect is -5 (reduction) and actualChange is -10, result is +50
        // We normalize by the magnitude of theoretical effect to get a relative performance bit
        
        const impact = actualChange * theoreticalEffect;
        const importance = Math.abs(theoreticalEffect);
        
        score += impact;
        weightSum += importance;
    }

    if (weightSum === 0) return 0;

    // Normalize to a reasonable range. 
    // If a protocol was expected to change a variable by 5 and it changed it by 5, score is 25.
    // Let's cap the individual contribution and normalize by weightSum.
    const normalizedScore = score / (weightSum * 5); // 5 is a typical effect magnitude
    
    return Math.max(-1, Math.min(1, normalizedScore));
}

/**
 * Updates the personalization weight for a protocol using an exponential moving average.
 * Formula: new_weight = (old_weight * 0.9) + (effectiveness * 0.1)
 */
export async function updateProtocolWeights(
    userId: string,
    protocolName: string,
    effectiveness: number
): Promise<void> {
    try {
        const supabase = createClient();
        
        // 1. Fetch current weight
        const { data, error: fetchError } = await supabase
            .from('user_protocol_weights')
            .select('effect_multipliers')
            .eq('user_id', userId)
            .eq('protocol_name', protocolName)
            .single();

        let currentWeights: Record<string, number> = data?.effect_multipliers || {};
        
        // In this implementation, we apply the boost to ALL variables targeted by the protocol
        // Or we could have a single "global_multiplier" for the protocol.
        // The selection engine uses userWeights[protocolName][stateKey].
        
        // Let's find the variables this protocol affects (we might need the protocol definition here too)
        // For simplicity, we apply a uniform adaptive multiplier to the protocol's power.
        
        const LEARNING_RATE = 0.1;
        const PERSISTENCE = 0.9;
        
        // We'll update or initialize a 'master' multiplier for this protocol name
        // encoded as a key in the effect_multipliers object (e.g., '_adaptive_boost')
        // OR we update each variable's multiplier. 
        // Let's update each variable's multiplier to allow granular learning.
        
        const updatedWeights = { ...currentWeights };
        
        // If we don't have the protocol variables here, we might just update a general boost.
        // But let's assume we want to influence the existing weights.
        
        // If effectiveness is 0.5 (good), we want to increase the multipliers.
        // weight = weight * (1 + effectiveness * learning_rate) ?
        // No, the user suggested: new_weight = old_weight * 0.9 + score * 0.1
        
        // Let's use a simpler approach: update a single 'boost' for the whole protocol.
        const currentBoost = currentWeights['_protocol_boost'] ?? 1.0;
        const targetBoost = 1.0 + effectiveness; // Effectiveness -1 to 1 -> target 0.0 to 2.0
        
        const newBoost = (currentBoost * PERSISTENCE) + (targetBoost * LEARNING_RATE);
        updatedWeights['_protocol_boost'] = Math.max(0.5, Math.min(2.0, newBoost));

        // 2. Upsert
        const { error: upsertError } = await supabase
            .from('user_protocol_weights')
            .upsert({
                user_id: userId,
                protocol_name: protocolName,
                effect_multipliers: updatedWeights,
                last_updated: new Date().toISOString()
            }, { onConflict: 'user_id,protocol_name' });

        if (upsertError) throw upsertError;

    } catch (e) {
        console.error("Failed to update protocol weights:", e);
    }
}

/**
 * Automates the processing of logged completions.
 * Compares snapshots and updates weights if improvement is detected.
 */
export async function processCompletions(
    userId: string,
    completions: any[], // ProtocolCompletion[]
    currentState: VedaState
): Promise<void> {
    const protocolsRaw = await import('@/data/protocols.json');
    const protocolMap = new Map((protocolsRaw.default as any[]).map(p => [p.name, p]));

    for (const log of completions) {
        const protocol = protocolMap.get(log.protocol_name);
        if (!protocol) continue;

        // Calculate effectiveness between 'before' and 'current'
        const effectiveness = calculateEffectiveness(log.state_before, currentState, protocol);

        // Only update if there's a meaningful outcome (positive or negative)
        if (Math.abs(effectiveness) > 0.1) {
            await updateProtocolWeights(userId, log.protocol_name, effectiveness);
        }

        // Mark processed
        const { markCompletionProcessed } = await import('@/services/protocolCompletionService');
        await markCompletionProcessed(log.id);
    }
}
