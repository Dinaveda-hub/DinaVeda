import { VedaState } from './stateModel';
import { getSeasonalMultipliers } from './seasonalAdjuster';
import { getSensitivityConfig } from './sensitivityConfig';
import signalsData from '../data/signals.json';

// Type representing the array of signal objects defined in `signals.json`
type SignalConfig = {
    signal: string;
    effects: Partial<Record<keyof VedaState, number>>;
};

export class StateUpdater {
    /**
     * Clamps a value strictly between 0 and 100.
     */
    private clamp(val: number): number {
        return Math.max(0, Math.min(100, val));
    }

    /**
     * Complete Layer 4 Pipeline:
     * Applies a list of extracted signals to the current state deterministically.
     * Signal -> Season -> Sensitivity -> Update -> Clamp
     */
    public applySignals(currentState: VedaState, incomingSignals: string[]): VedaState {
        // Clone the state to avoid direct mutation (Layer 4 Start)
        let nextState = { ...currentState };

        // 1. Seasonal Multipliers
        const seasonMultipliers = getSeasonalMultipliers(nextState.rutu_season);

        // 2. Variable Sensitivity (Elasticity)
        const sensitivity = getSensitivityConfig(
            nextState.prakriti_vata,
            nextState.prakriti_pitta,
            nextState.prakriti_kapha
        );

        // Map the signal definitions
        const signalMap = new Map((signalsData as SignalConfig[]).map(s => [s.signal, s.effects]));

        for (const signalName of incomingSignals) {
            const effects = signalMap.get(signalName);
            if (!effects) continue;

            for (const [key, rawEffect] of Object.entries(effects)) {
                if (key in nextState) {
                    let effectValue = rawEffect as number;

                    // 3. Apply seasonal & sensitivity modifiers dynamically
                    if (key === 'vata_state') {
                        effectValue *= seasonMultipliers.vata_multiplier * (effectValue > 0 ? sensitivity.vata_elasticity : 1);
                    } else if (key === 'pitta_state') {
                        effectValue *= seasonMultipliers.pitta_multiplier * (effectValue > 0 ? sensitivity.pitta_elasticity : 1);
                    } else if (key === 'kapha_state') {
                        effectValue *= seasonMultipliers.kapha_multiplier * (effectValue > 0 ? sensitivity.kapha_elasticity : 1);
                    } else if (key === 'agni_strength') {
                        effectValue *= (effectValue < 0 ? sensitivity.agni_elasticity : 1);
                    } else if (key === 'ojas_score') {
                        effectValue *= (effectValue < 0 ? sensitivity.ojas_elasticity : 1);
                    }

                    // 4. State Update
                    (nextState as any)[key] += effectValue;

                    // 5. Clamp to 0-100 bounds
                    (nextState as any)[key] = this.clamp((nextState as any)[key]);
                }
            }
        }

        return nextState;
    }

    /**
     * Applies nightly recovery, pulling the current state back towards the Prakriti baseline
     * by 10% to prevent infinite drift accumulation.
     */
    public applyNightlyDecay(currentState: VedaState): VedaState {
        let nextState = { ...currentState };

        // Pull Doshas toward baseline Prakriti
        nextState.vata_state -= (nextState.vata_state - nextState.prakriti_vata) * 0.1;
        nextState.vata_state = this.clamp(nextState.vata_state);

        nextState.pitta_state -= (nextState.pitta_state - nextState.prakriti_pitta) * 0.1;
        nextState.pitta_state = this.clamp(nextState.pitta_state);

        nextState.kapha_state -= (nextState.kapha_state - nextState.prakriti_kapha) * 0.1;
        nextState.kapha_state = this.clamp(nextState.kapha_state);

        // Pull Ojas towards 100 based on recovery stat
        if (nextState.ojas_score < 100) {
            const recoveryAmount = nextState.ojas_recovery * 0.1; // e.g. 50 * 0.1 = 5 points
            nextState.ojas_score = this.clamp(nextState.ojas_score + recoveryAmount);
        }

        // Slowly clear sleep debt and stress
        nextState.sleep_debt = this.clamp(nextState.sleep_debt * 0.9);
        nextState.stress_load = this.clamp(nextState.stress_load * 0.9);

        return nextState;
    }
}
