import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';

export function filterSattvalivingProtocols(protocols: Protocol[]): Protocol[] {
    return protocols.filter(p => p.module.toLowerCase() === 'sattvaliving');
}

export function getBehaviorInsight(state: VedaState): string {
    if (state.screen_exposure > 70) return "Digital overload. Implement a 2-hour digital fast before sleep.";
    if (state.stress_load > 50) return "High behavioral friction. Focus on Achara Rasayana (social and ethical rejuvenation).";
    return "Behavioral harmony active. Your lifestyle aligns with your physiological needs.";
}
