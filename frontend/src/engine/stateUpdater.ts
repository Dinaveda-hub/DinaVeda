import { VedaState } from './stateModel';
import { getSeasonalMultipliers } from './seasonalAdjuster';
import { getSensitivityConfig, variableSensitivity } from './sensitivityEngine';
import { VARIABLE_MIN, VARIABLE_MAX } from '../config/variableRanges';
import signalsData from '../data/signals.json';

type SignalConfig = {
    signal: string;
    effects: Partial<Record<keyof VedaState, number>>;
};

export class StateUpdater {
    private clamp(val: number): number {
        return Math.max(VARIABLE_MIN, Math.min(VARIABLE_MAX, val));
    }

    public applySignals(currentState: VedaState, incomingSignals: string[]): VedaState {
        const signalMap = new Map((signalsData as SignalConfig[]).map(s => [s.signal, s.effects]));
        const effectsList = incomingSignals
            .map(signalName => signalMap.get(signalName))
            .filter(effects => effects !== undefined) as Partial<Record<keyof VedaState, number>>[];

        return this.applyEffects(currentState, effectsList);
    }

    public applyEffects(currentState: VedaState, effectsList: Partial<Record<keyof VedaState, number>>[]): VedaState {
        let nextState = { ...currentState };
        const seasonMultipliers = getSeasonalMultipliers(nextState.rutu_season);
        const plasticity = getSensitivityConfig(
            nextState.prakriti_vata,
            nextState.prakriti_pitta,
            nextState.prakriti_kapha
        );

        for (const effects of effectsList) {
            for (const [key, rawEffect] of Object.entries(effects)) {
                if (key in nextState && rawEffect !== undefined) {
                    let effectValue = rawEffect as number;

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

                    const globalSens = (variableSensitivity as any)[key] !== undefined ? (variableSensitivity as any)[key] : 1.0;
                    effectValue *= globalSens;

                    (nextState as any)[key] += effectValue;
                }
            }
        }

        nextState = this.applyCascades(nextState);

        for (const key of Object.keys(nextState)) {
            if (typeof (nextState as any)[key] === 'number') {
                (nextState as any)[key] = this.clamp((nextState as any)[key]);
            }
        }

        return nextState;
    }

    private applyCascades(state: VedaState): VedaState {
        let cascadeState = { ...state };

        if (cascadeState.circadian_alignment < 70) {
            const penalty = (70 - cascadeState.circadian_alignment) * 0.2;
            cascadeState.vata_state += penalty;
            cascadeState.agni_strength -= penalty * 0.5;
            cascadeState.ojas_score -= penalty * 0.5;
        }

        if (cascadeState.vata_state > 65) {
            cascadeState.agni_stability -= (cascadeState.vata_state - 65) * 0.5;
        }
        if (cascadeState.pitta_state > 65) {
            cascadeState.agni_strength += (cascadeState.pitta_state - 65) * 0.5;
            cascadeState.agni_stability -= (cascadeState.pitta_state - 65) * 0.3;
        }
        if (cascadeState.kapha_state > 65) {
            cascadeState.agni_strength -= (cascadeState.kapha_state - 65) * 0.5;
        }

        if (cascadeState.agni_strength < 50) {
            cascadeState.ama_risk += (50 - cascadeState.agni_strength) * 0.5;
        }

        if (cascadeState.ama_risk > 40) {
            cascadeState.ojas_score -= (cascadeState.ama_risk - 40) * 0.3;
        }
        if (cascadeState.stress_load > 60) {
            cascadeState.ojas_score -= (cascadeState.stress_load - 60) * 0.4;
        }

        if (cascadeState.stress_load > 60) {
            cascadeState.vata_state += (cascadeState.stress_load - 60) * 0.3;
        }
        if (cascadeState.screen_exposure > 70) {
            cascadeState.circadian_alignment -= (cascadeState.screen_exposure - 70) * 0.4;
            cascadeState.sleep_debt += (cascadeState.screen_exposure - 70) * 0.2;
        }

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

    public applyNightlyDecay(currentState: VedaState): VedaState {
        let nextState = { ...currentState };

        nextState.vata_state -= (nextState.vata_state - nextState.prakriti_vata) * 0.1;
        nextState.vata_state = this.clamp(nextState.vata_state);

        nextState.pitta_state -= (nextState.pitta_state - nextState.prakriti_pitta) * 0.1;
        nextState.pitta_state = this.clamp(nextState.pitta_state);

        nextState.kapha_state -= (nextState.kapha_state - nextState.prakriti_kapha) * 0.1;
        nextState.kapha_state = this.clamp(nextState.kapha_state);

        if (nextState.ojas_score < 100) {
            const recoveryAmount = nextState.ojas_recovery * 0.1;
            nextState.ojas_score = this.clamp(nextState.ojas_score + recoveryAmount);
        }

        nextState.sleep_debt = this.clamp(nextState.sleep_debt * 0.9);
        nextState.stress_load = this.clamp(nextState.stress_load * 0.9);

        return nextState;
    }
}
