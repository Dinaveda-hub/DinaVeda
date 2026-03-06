import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';

export function filterNutrivedaProtocols(protocols: Protocol[]): Protocol[] {
    return protocols.filter(p => p.module.toLowerCase() === 'nutriveda');
}

export function getAgniInsight(state: VedaState): string {
    if (state.agni_strength < 40) return "Manda Agni (Low) detected. Favor ginger, black pepper, and warm, light soups.";
    if (state.agni_strength > 80) return "Teekshna Agni (High) detected. Favor cooling, grounding foods like ghee and sweet grains.";
    if (state.agni_stability < 50) return "Vishama Agni (Irregular) detected. Extreme regularity in meal timing is your primary medicine.";
    return "Balanced Agni active. Maintain balanced portions and seasonal local foods.";
}
