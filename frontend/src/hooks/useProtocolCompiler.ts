import { useMemo } from 'react';
import { RecommendationEngine } from '@/engine/recommendationEngine';
import { Protocol } from '@/engine/protocolSelectionEngine';
import { compileDailyProtocols } from '@/engine/protocolCompiler';
import { PredictionEngine } from '@/engine/predictionEngine';
import { usePhysiologyState } from './usePhysiologyState';
import { computeVikriti } from '@/engine/vikritiEngine';

/**
 * Hook to compile the full daily dinacharya from recommendations and predictions.
 */
export function useProtocolCompiler(healthGoal: string = "general_wellness") {
    const { state, isLoaded } = usePhysiologyState();

    const dailyPlan = useMemo(() => {
        if (!isLoaded) return { morning: [], midday: [], evening: [] };

        const vikriti = computeVikriti(state);
        const recEngine = new RecommendationEngine();
        const predictionEngine = new PredictionEngine();

        const stateHistory = predictionEngine.loadStateHistory();
        const predictionProtocolNames = predictionEngine.getPredictionProtocols(stateHistory);

        const recommendations = recEngine.getRecommendations(state, vikriti, healthGoal);
        return compileDailyProtocols(recommendations, predictionProtocolNames);
    }, [state, isLoaded, healthGoal]);

    return dailyPlan;
}
