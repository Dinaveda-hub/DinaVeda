import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';

export function filterManasayurProtocols(protocols: Protocol[]): Protocol[] {
    return protocols.filter(p => p.module.toLowerCase() === 'manasayur');
}

export function getMindInsight(state: VedaState): string {
    if (state.stress > 60) return "High Rajasic activity. Prioritize Nadi Shodhana and grounding silence.";
    if (state.mental_clarity < 50) return "Tamasic clouding detected. Favor light-increasing activities and stimulating breathwork.";
    return "Sattvic clarity maintained. Continue periodic mindfulness and ethical conduct (Sadvritta).";
}
