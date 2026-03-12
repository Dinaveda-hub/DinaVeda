"use client";
import { usePhysiology } from '../contexts/PhysiologyContext';

/**
 * A proxy hook that now consumes the global PhysiologyContext.
 * This maintains backward compatibility while ensuring state is synced across the app.
 */
export function usePhysiologyState() {
    const { 
        state, updateState, isLoaded, userWeights, userId, 
        subscriptionStatus, currentSeason, healthGoal, setHealthGoal 
    } = usePhysiology();
    return { 
        state, updateState, isLoaded, userWeights, userId, 
        subscriptionStatus, currentSeason, healthGoal, setHealthGoal 
    };
}
