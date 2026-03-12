import { selectProtocols, Protocol } from '../src/engine/protocolSelectionEngine';
import { VedaState, defaultState } from '../src/engine/stateModel';
import protocolsRaw from "../src/data/protocols.json";

function isProtocolSafe(protocol: Protocol, state: VedaState): boolean {
    // 1. Pitta Guard (Heat avoidance)
    if (state.pitta >= 70 || state.inflammation >= 70) {
        const heatingCategories = ['kapha_activator', 'movement_activation', 'agni_support', 'agni_alignment', 'kapha_activation', 'circadian_activation'];
        if (heatingCategories.includes(protocol.category)) {
            console.log(`[PittaGuard] Blocked ${protocol.name} - category ${protocol.category}`);
            return false;
        }
        if (protocol.name.includes('vigorous') || protocol.name.includes('spices') || protocol.name.includes('dynamic') || protocol.name.includes('brisk')) {
            console.log(`[PittaGuard] Blocked ${protocol.name} - keywords`);
            return false;
        }
    }

    // 2. Vata/Stress Guard
    if (state.vata >= 65 || state.stress >= 70) {
        const isCooling = (protocol.name.includes('cooling') || protocol.name.includes('cold') ||
            protocol.name.includes('moonlight') || protocol.name.includes('coriander') ||
            protocol.name.includes('greens') || (protocol.name.includes('bath') && !protocol.name.includes('warm'))) ||
            protocol.category.includes('pitta');

        const isLightening = protocol.variables.kapha && protocol.variables.kapha < 0;

        if (isCooling || isLightening) {
            console.log(`[VataGuard] Blocked ${protocol.name} - isCooling: ${isCooling}, isLightening: ${isLightening}`);
            return false;
        }
    }

    // (Simplified rest of the guards for debugging)
    if (state.sleep < 50) {
        if (protocol.name.includes('light_dinner')) {
            console.log(`[SleepGuard] Blocked ${protocol.name}`);
            return false;
        }
    }

    return true;
}

const agniLow = {
    ...defaultState,
    agni: 40,
    ama: 30,
    prakriti_vata: 50,
    prakriti_pitta: 50,
    prakriti_kapha: 50
};

const protocol = (protocolsRaw as any[]).find(p => p.name === 'light_dinner');
if (protocol) {
    console.log(`Checking safety for ${protocol.name}...`);
    const result = isProtocolSafe(protocol, agniLow);
    console.log(`Result: ${result}`);
} else {
    console.log("Protocol 'light_dinner' not found!");
}
