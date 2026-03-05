import { VedaState } from './stateModel';
import { getSeasonalMultipliers } from './seasonalAdjuster';
import signalsData from '../data/signals.json';

type ValidSignal = keyof typeof signalsData;

export class StateUpdater {
    /**
     * Clamps a value strictly between 0 and 100.
     */
    private clamp(val: number): number {
        return Math.max(0, Math.min(100, val));
    }

    /**
     * Applies a list of NLU extracted signals to the current state deterministically.
     */
    public applySignals(currentState: VedaState, signals: string[]): VedaState {
        // Clone the state to avoid direct mutation
        let nextState = { ...currentState };
        const seasonMultipliers = getSeasonalMultipliers(nextState.rutu_season);

        for (const signalName of signals) {
            const signalConfig = (signalsData as any)[signalName];
            if (!signalConfig || !signalConfig.effects) continue;

            const effects = signalConfig.effects;

            for (const [key, value] of Object.entries(effects)) {
                if (key in nextState) {
                    let effectValue = value as number;

                    // Apply seasonal sensitivities to doshas
                    if (key === 'vata_state') {
                        effectValue *= seasonMultipliers.vata_multiplier;
                    } else if (key === 'pitta_state') {
                        effectValue *= seasonMultipliers.pitta_multiplier;
                    } else if (key === 'kapha_state') {
                        effectValue *= seasonMultipliers.kapha_multiplier;
                    }

                    // Apply the effect
                    (nextState as any)[key] += effectValue;

                    // Clamp to 0-100 bounds
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
