import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';

export function filterAyufitProtocols(protocols: Protocol[]): Protocol[] {
    return protocols.filter(p => p.module.toLowerCase() === 'ayufit');
}

export function getMovementInsight(state: VedaState): string {
    if (state.vata > 60) return "High Vata load. Favor slow, grounding Hatha yoga and avoid high-impact cardio.";
    if (state.kapha > 60) return "High Kapha load. Increase intensity with vigorous Surya Namaskar and warming pranayama.";
    if (state.pitta > 60) return "Moderate Pitta. Exercise during the cooler parts of the day; avoid excessive heat-generating flows.";
    return "Balanced state. Maintain 50% capacity rule in all physical activities.";
}
