import { VedaState } from "./stateModel";
import { ENGINE_CONFIG } from "./config";

const { clamp } = ENGINE_CONFIG.ranges;
const OJ_W = ENGINE_CONFIG.weights.ojas;

/**
 * derivedMetricsEngine.ts
 * 
 * Computes all user-facing physiological variables as projections
 * of the 5 core latent health axes.
 */

export function computeDerivedMetrics(state: VedaState): VedaState {
    const nextState = { ...state };

    // The 5 Core Axes
    const vata = state.vata_axis;
    const pitta = state.pitta_axis;
    const kapha = state.kapha_axis;
    const agni = state.agni_axis;
    const ojas_axis = state.ojas_axis;

    // --- Autonomic & Nervous System ---
    nextState.stress = clamp((vata * 0.7) + (pitta * 0.3));
    // Sleep quality inversely correlates with Vata and directly correlates with Ojas axis
    nextState.sleep = clamp((ojas_axis * 0.5) + ((100 - vata) * 0.5));
    nextState.mental_clarity = clamp((ojas_axis * 0.4) + ((100 - pitta) * 0.3) + ((100 - vata) * 0.3));
    nextState.irritability = clamp((pitta * 0.6) + (vata * 0.4));
    nextState.attention_stability = clamp((100 - vata) * 0.8 + (ojas_axis * 0.2));
    
    // --- Metabolic & Digestive System ---
    nextState.digestion = agni;
    nextState.appetite = agni;
    nextState.bloating = clamp((vata * 0.6) + ((100 - agni) * 0.4));
    nextState.elimination = clamp((100 - vata) * 0.5 + (agni * 0.5));
    
    // --- Vitality & Circadian ---
    // Circadian tightly coupled with sleep and regularity, penalized by TOD drag
    nextState.circadian = clamp(nextState.sleep - (state.daily_circadian_drag || 0));

    // Standardized Ojas Formula: Driven by digestion, sleep, stress balance, and circadian alignment
    // (100 - stress) is used to represent the positive vitality aspect of the stress axis
    nextState.ojas = clamp(
        (nextState.digestion * OJ_W.DIGESTION) +
        (nextState.sleep * OJ_W.SLEEP) +
        ((100 - nextState.stress) * OJ_W.STRESS) +
        (nextState.circadian * OJ_W.CIRCADIAN)
    );

    // --- Energy & Immunity ---
    nextState.energy = clamp((nextState.ojas * 0.6) + (agni * 0.4));
    nextState.cognitive_energy = clamp((nextState.ojas * 0.5) + (agni * 0.5));
    nextState.mood = clamp((nextState.ojas * 0.4) + ((100 - pitta) * 0.3) + ((100 - vata) * 0.3));
    nextState.immunity = nextState.ojas; 
    
    // --- Structural & Physical ---
    nextState.inflammation = pitta; 
    nextState.stiffness = clamp((kapha * 0.6) + (vata * 0.4));
    nextState.movement = clamp(100 - nextState.stiffness); 
    nextState.hydration = clamp((100 - vata) * 0.7 + (kapha * 0.3));
    nextState.skin_health = clamp((nextState.ojas * 0.5) + ((100 - pitta) * 0.3) + (kapha * 0.2));
    nextState.hair_health = clamp((nextState.ojas * 0.6) + ((100 - pitta) * 0.4));
    
    // --- Social ---
    nextState.social_balance = clamp((nextState.ojas * 0.5) + ((100 - nextState.irritability) * 0.5));

    // Provide legacy Dosha mappings
    nextState.vata = vata;
    nextState.pitta = pitta;
    nextState.kapha = kapha;
    nextState.agni = agni;
    nextState.ama = clamp((100 - agni) * 0.7 + (kapha * 0.3));

    return nextState;
}
