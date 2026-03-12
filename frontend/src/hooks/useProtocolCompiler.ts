import { useMemo } from 'react';
import { selectProtocols } from '@/engine/protocolSelectionEngine';
import { compileDailyProtocols } from '@/engine/protocolCompiler';
import { usePhysiologyState } from './usePhysiologyState';

/**
 * Hook to compile the full daily dinacharya from recommendations and predictions.
 */
export function useProtocolCompiler(healthGoal: string = "general_wellness") {
    const { state, isLoaded } = usePhysiologyState();

    const dailyPlan = useMemo(() => {
        if (!isLoaded) return { morning: [], midday: [], evening: [] };

        const recommendations = selectProtocols(state, {}, healthGoal);
        return compileDailyProtocols(recommendations);
    }, [state, isLoaded, healthGoal]);

    return dailyPlan;
}
