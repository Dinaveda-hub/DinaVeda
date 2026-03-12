import { createClient } from "./supabase/client";

export type ProtocolWeights = Record<string, Record<string, number>>;

/**
 * Fetches the user's personalized protocol effect multipliers.
 * Returns a map of Protocol Name -> { variable: multiplier }
 */
export async function fetchUserProtocolWeights(): Promise<ProtocolWeights> {
    try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return {};
        }

        const { data, error } = await supabase
            .from('user_protocol_weights')
            .select('protocol_name, effect_multipliers')
            .eq('user_id', user.id);

        if (error) {
            console.error("Error fetching protocol weights:", error);
            return {};
        }

        const weightsMap: ProtocolWeights = {};
        if (data && data.length > 0) {
            data.forEach(row => {
                weightsMap[row.protocol_name] = row.effect_multipliers as Record<string, number>;
            });
        }
        return weightsMap;
    } catch (e) {
        console.error("Exception fetching protocol weights", e);
        return {};
    }
}
