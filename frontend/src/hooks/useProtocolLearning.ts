import { useEffect } from 'react';
import { VedaState } from '@/types/physiologyState';
import { fetchUnprocessedCompletions } from '@/services/protocolCompletionService';
import { processCompletions } from '@/engine/effectLearningEngine';

/**
 * useProtocolLearning Hook
 * 
 * Periodically checks for unprocessed protocol completions and triggers the 
 * learning engine to adapt userWeights based on physiological outcomes.
 */
export function useProtocolLearning(isLoaded: boolean, userId: string | null, state: VedaState) {
    useEffect(() => {
        if (!isLoaded || !userId) return;

        const runLearningCycle = async () => {
            try {
                // 1. Fetch completions needing processing
                const completions = await fetchUnprocessedCompletions();
                
                if (completions.length > 0) {
                    // 2. Process through the learning engine
                    // This compares 'state_before' from the log with the 'current state'
                    await processCompletions(userId, completions, state);
                }
            } catch (e) {
                console.error("Protocol learning cycle failed:", e);
            }
        };

        // Run once on load/state change with a small delay to allow simulation to settle
        const timer = setTimeout(runLearningCycle, 5000); 
        
        return () => clearTimeout(timer);
    }, [isLoaded, userId, state]);
}
