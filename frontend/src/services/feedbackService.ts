import { createClient } from "@/utils/supabase/client";
import { VedaState } from "@/types/physiologyState";

export async function submitProtocolFeedback(
    protocolName: string,
    stateBaseline: VedaState,
    correlationTarget: string,
    perceivedShift: number // -1, 0, 1
) {
    try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
            console.error("User must be authenticated to submit feedback.");
            return false;
        }

        const { error } = await supabase
            .from('protocol_feedback')
            .insert({
                user_id: user.id,
                protocol_name: protocolName,
                state_baseline: stateBaseline,
                correlation_target: correlationTarget,
                perceived_shift: perceivedShift
            });

        if (error) {
            console.error("Error submitting protocol feedback:", error);
            return false;
        }
        
        return true;
    } catch (e) {
        console.error("Exception in submitProtocolFeedback:", e);
        return false;
    }
}
