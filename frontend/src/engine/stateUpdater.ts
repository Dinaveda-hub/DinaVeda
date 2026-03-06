import { VedaState } from './stateModel';
import { getSeasonalMultipliers } from './seasonalAdjuster';
import { getSensitivityConfig, variableSensitivity } from './sensitivityConfig';
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
     * Resolves signal strings to their effect objects and passes them to applyEffects.
     */
    public applySignals(currentState: VedaState, incomingSignals: string[]): VedaState {
        const signalMap = new Map((signalsData as SignalConfig[]).map(s => [s.signal, s.effects]));
        const effectsList = incomingSignals
            .map(signalName => signalMap.get(signalName))
            .filter(effects => effects !== undefined) as Partial<Record<keyof VedaState, number>>[];

        return this.applyEffects(currentState, effectsList);
    }

    /**
     * Applies a raw list of payload effects to the current state deterministically.
     * Pipeline: Effects -> Season -> Base Elasticity -> Global Sensitivity -> Update -> Cascade -> Clamp
     */
    public applyEffects(currentState: VedaState, effectsList: Partial<Record<keyof VedaState, number>>[]): VedaState {
        let nextState = { ...currentState };

        // 1. Seasonal Multipliers
        const seasonMultipliers = getSeasonalMultipliers(nextState.rutu_season);

        // 2. Variable Sensitivity (Prakriti Elasticity)
        const plasticity = getSensitivityConfig(
            nextState.prakriti_vata,
            nextState.prakriti_pitta,
            nextState.prakriti_kapha
        );

        for (const effects of effectsList) {
            for (const [key, rawEffect] of Object.entries(effects)) {
                if (key in nextState && rawEffect !== undefined) {
                    let effectValue = rawEffect as number;

                    // 3. Apply seasonal & prakriti elasticity modifiers dynamically
                    if (key === 'vata_state') {
                        effectValue *= seasonMultipliers.vata_multiplier * (effectValue > 0 ? plasticity.vata_elasticity : 1);
                    } else if (key === 'pitta_state') {
                        effectValue *= seasonMultipliers.pitta_multiplier * (effectValue > 0 ? plasticity.pitta_elasticity : 1);
                    } else if (key === 'kapha_state') {
                        effectValue *= seasonMultipliers.kapha_multiplier * (effectValue > 0 ? plasticity.kapha_elasticity : 1);
                    } else if (key === 'agni_strength') {
                        effectValue *= (effectValue < 0 ? plasticity.agni_elasticity : 1);
                    } else if (key === 'ojas_score') {
                        effectValue *= (effectValue < 0 ? plasticity.ojas_elasticity : 1);
                    }

                    // 4. Apply Global Variable Sensitivity Scaler
                    const globalSens = variableSensitivity[key] !== undefined ? variableSensitivity[key] : 1.0;
                    effectValue *= globalSens;

                    // 5. State Update
                    (nextState as any)[key] += effectValue;
                }
            }
        }

        // --- LAYER 4.5: PHYSIOLOGICAL STATE CASCADES ---
        nextState = this.applyCascades(nextState);

        // 6. Clamp all 26 variables to 0-100 bounds
        for (const key of Object.keys(nextState)) {
            if (typeof (nextState as any)[key] === 'number') {
                (nextState as any)[key] = this.clamp((nextState as any)[key]);
            }
        }

        return nextState;
    }

    /**
     * Enforces the thermodynamic rules of the Ayurvedic Physiology Graph.
     * Circadian -> Dosha -> Agni -> Ama -> Ojas
     */
    private applyCascades(state: VedaState): VedaState {
        let cascadeState = { ...state };

        // 1. Circadian -> Dosha + Agni + Ojas
        if (cascadeState.circadian_alignment < 70) {
            const penalty = (70 - cascadeState.circadian_alignment) * 0.2;
            cascadeState.vata_state += penalty;
            cascadeState.agni_strength -= penalty * 0.5;
            cascadeState.ojas_score -= penalty * 0.5;
        }

        // 2. Dosha -> Agni (Digestion mechanics)
        if (cascadeState.vata_state > 65) {
            cascadeState.agni_stability -= (cascadeState.vata_state - 65) * 0.5; // Vishama Agni
        }
        if (cascadeState.pitta_state > 65) {
            cascadeState.agni_strength += (cascadeState.pitta_state - 65) * 0.5; // Tikshna Agni
            cascadeState.agni_stability -= (cascadeState.pitta_state - 65) * 0.3;
        }
        if (cascadeState.kapha_state > 65) {
            cascadeState.agni_strength -= (cascadeState.kapha_state - 65) * 0.5; // Manda Agni
        }

        // 3. Agni -> Ama (Waste accumulation)
        if (cascadeState.agni_strength < 50) {
            cascadeState.ama_risk += (50 - cascadeState.agni_strength) * 0.5;
        }

        // 4. Ama & Stress -> Ojas (Vitality reservoir)
        if (cascadeState.ama_risk > 40) {
            cascadeState.ojas_score -= (cascadeState.ama_risk - 40) * 0.3;
        }
        if (cascadeState.stress_load > 60) {
            cascadeState.ojas_score -= (cascadeState.stress_load - 60) * 0.4;
        }

        // 5. Mind -> Dosha & Circadian
        if (cascadeState.stress_load > 60) {
            cascadeState.vata_state += (cascadeState.stress_load - 60) * 0.3;
        }
        if (cascadeState.screen_exposure > 70) {
            cascadeState.circadian_alignment -= (cascadeState.screen_exposure - 70) * 0.4;
            cascadeState.sleep_debt += (cascadeState.screen_exposure - 70) * 0.2;
        }

        // 6. Digestive Signals -> Agni Feedback
        if (cascadeState.bloating_level > 50) {
            cascadeState.agni_strength -= (cascadeState.bloating_level - 50) * 0.3;
            cascadeState.ama_risk += (cascadeState.bloating_level - 50) * 0.2;
        }
        if (cascadeState.bowel_quality < 40) {
            cascadeState.agni_strength -= (40 - cascadeState.bowel_quality) * 0.3;
            cascadeState.ama_risk += (40 - cascadeState.bowel_quality) * 0.2;
        }

        return cascadeState;
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
