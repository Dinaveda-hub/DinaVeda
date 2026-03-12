import { createClient } from "@/utils/supabase/client";
import { VedaState } from "@/types/physiologyState";

/**
 * protocolCompletionService.ts
 * 
 * Handles logging and retrieval of protocol completion events for the Learning Engine.
 */

export interface ProtocolCompletion {
    id?: string;
    protocol_name: string;
    state_before: VedaState;
    state_after?: VedaState;
    completed_at: string;
    processed: boolean;
}

export async function logProtocolCompletion(
    protocolName: string,
    stateBefore: VedaState,
    stateAfter?: VedaState
) {
    try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) return null;

        const { data, error } = await supabase
            .from('protocol_completions')
            .insert({
                user_id: user.id,
                protocol_name: protocolName,
                state_before: stateBefore,
                state_after: stateAfter,
                completed_at: new Date().toISOString(),
                processed: false
            })
            .select()
            .single();

        if (error) {
            console.error("Error logging protocol completion:", error);
            return null;
        }

        return data;
    } catch (e) {
        console.error("Exception in logProtocolCompletion:", e);
        return null;
    }
}

/**
 * Fetches unprocessed completions to evaluate outcome.
 */
export async function fetchUnprocessedCompletions() {
    try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) return [];

        const { data, error } = await supabase
            .from('protocol_completions')
            .select('*')
            .eq('user_id', user.id)
            .eq('processed', false)
            .order('completed_at', { ascending: true });

        if (error) throw error;
        return data as ProtocolCompletion[];
    } catch (e) {
        console.error("Error fetching completions:", e);
        return [];
    }
}

/**
 * Marks a completion as processed.
 */
export async function markCompletionProcessed(id: string) {
    try {
        const supabase = createClient();
        await supabase
            .from('protocol_completions')
            .update({ processed: true })
            .eq('id', id);
    } catch (e) {
        console.error("Error marking completion processed:", e);
    }
}
