import { VedaState } from './stateModel';
import { applySignals } from './stateUpdater';

/**
 * Simulates a forward trajectory of a user's physiological state given constant daily habits.
 * 
 * @param initialState The starting VedaState
 * @param dailySignals A list of daily habits/signals (e.g., 'late_sleep', 'heavy_meal')
 * @param days Number of days to simulate forward
 * @param performedAt Optional time of day string (e.g., "22:00") for the signals
 * @returns Array of VedaState objects representing the state at the end of each simulated day
 */
export async function simulateTrajectory(
    initialState: VedaState, 
    dailySignals: string[], 
    days: number,
    performedAt?: string
): Promise<VedaState[]> {
    const trajectory: VedaState[] = [];
    let currentState: VedaState = { ...initialState };

    for (let i = 0; i < days; i++) {
        // Daily reset of the circadian drag tracker
        currentState.daily_circadian_drag = 0;

        // Apply the daily habits to the state
        // We pass 'guest' as userId to prevent creating real cooldown records in the DB
        const result = await applySignals(dailySignals, currentState, 'guest', performedAt);
        currentState = result.state;
        
        trajectory.push({ ...currentState });
    }

    return trajectory;
}
