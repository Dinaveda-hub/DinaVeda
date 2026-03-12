import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';

export function filterSomasleepProtocols(protocols: Protocol[]): Protocol[] {
    return protocols.filter(p => p.module.toLowerCase() === 'somasleep');
}

export function getSleepInsight(state: VedaState): string {
    if (state.circadian < 60) return "Deep misalignment. Establish a strict 10 PM sleep window immediately.";
    if (state.sleep < 50) return "Accumulated exhaustion. Prioritize Yoga Nidra during midday for Ojas restoration.";
    return "Bio-rhythm synchronized. Maintain your consistent sleep-wake cycle.";
}
