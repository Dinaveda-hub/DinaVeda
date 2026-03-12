import { usePhysiologyState } from "./usePhysiologyState";
import { applySignals } from "../engine/stateUpdater";

/**
 * Hook to handle signal logging persistence.
 * Functionalized to integrate with the deterministic physiology orchestrator.
 */
export function useSignalLogger() {
    const { state, updateState, userId, healthGoal, userWeights } = usePhysiologyState();

    const logSignals = async (signals: string[], performedAt?: string) => {
        if (!signals || signals.length === 0) return;

        console.log("Processing signals:", signals);
        
        // 1. applySignals handles: Conflicts, Cooldowns, TOD scaling, 
        // and triggers the full runPhysiologyCycle via updateState integration.
        const { state: newState, events } = await applySignals(
            signals, 
            state, 
            userId || 'guest', 
            performedAt,
            userWeights,
            healthGoal
        );
        
        // 2. Commit the new state to global context
        updateState(newState);

        // 3. Handle Events
        if (events && events.length > 0) {
            console.log("Signals triggered events:", events);
        }
    };

    return { logSignals };
}
