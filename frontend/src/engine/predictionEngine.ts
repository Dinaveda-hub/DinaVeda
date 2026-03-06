import { VedaState } from './stateModel';
import { VikritiMetrics } from './vikritiEngine';
import predictionRulesData from '../data/rules/prediction_rules.json';

export interface HealthAdjustment {
    issue: string;
    recommendation: string;
    prediction?: string;
    protocolAdjustments?: string[];
}

export interface StateSnapshot {
    date: string; // ISO date string YYYY-MM-DD
    state: Partial<Record<keyof VedaState, number>>;
}

export interface PredictionRule {
    variable: string;
    trend_days: number;
    threshold_change: number;
    direction: 'rising' | 'declining';
    prediction: string;
    message: string;
    protocol_adjustment: string[];
}

export class PredictionEngine {
    private rules: PredictionRule[];

    constructor() {
        this.rules = predictionRulesData as PredictionRule[];
    }

    // ─────────────────────────────────────────────
    // STATE HISTORY PERSISTENCE (localStorage)
    // ─────────────────────────────────────────────

    private readonly HISTORY_KEY = 'veda_state_history';
    private readonly MAX_HISTORY_DAYS = 7;

    /**
     * Saves today's physiology snapshot, keeping only the last MAX_HISTORY_DAYS entries.
     * Call this once per day (e.g., at nightly reset).
     */
    public saveStateSnapshot(state: VedaState): void {
        if (typeof window === 'undefined') return;
        const today = new Date().toISOString().split('T')[0];
        const history = this.loadStateHistory();

        // Replace or upsert today's entry
        const filtered = history.filter(s => s.date !== today);
        const snapshot: StateSnapshot = {
            date: today,
            state: {
                vata_state: state.vata_state,
                pitta_state: state.pitta_state,
                kapha_state: state.kapha_state,
                agni_strength: state.agni_strength,
                agni_stability: state.agni_stability,
                ama_risk: state.ama_risk,
                ojas_score: state.ojas_score,
                ojas_recovery: state.ojas_recovery,
                circadian_alignment: state.circadian_alignment,
                sleep_debt: state.sleep_debt,
                stress_load: state.stress_load,
                mental_clarity: state.mental_clarity,
                movement_level: state.movement_level,
            }
        };

        const updated = [...filtered, snapshot].slice(-this.MAX_HISTORY_DAYS);
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(updated));
    }

    /**
     * Loads state history from localStorage, sorted chronologically oldest → newest.
     */
    public loadStateHistory(): StateSnapshot[] {
        if (typeof window === 'undefined') return [];
        const raw = localStorage.getItem(this.HISTORY_KEY);
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw) as StateSnapshot[];
            return parsed.sort((a, b) => a.date.localeCompare(b.date));
        } catch {
            return [];
        }
    }

    // ─────────────────────────────────────────────
    // TREND DETECTION
    // ─────────────────────────────────────────────

    /**
     * Detects the raw change in a variable over N days of history.
     * Returns undefined if insufficient history.
     */
    private detectTrend(history: StateSnapshot[], variable: string, days: number): number | undefined {
        if (history.length < days) return undefined;

        const startSnapshot = history[history.length - days];
        const endSnapshot = history[history.length - 1];

        const startVal = (startSnapshot.state as Record<string, number>)[variable];
        const endVal = (endSnapshot.state as Record<string, number>)[variable];

        if (startVal === undefined || endVal === undefined) return undefined;
        return endVal - startVal;
    }

    /**
     * Evaluates all prediction rules against the state history.
     * Returns triggered prediction rules with their adjustments.
     */
    public runPredictions(history: StateSnapshot[]): PredictionRule[] {
        const triggered: PredictionRule[] = [];

        for (const rule of this.rules) {
            const change = this.detectTrend(history, rule.variable, rule.trend_days);
            if (change === undefined) continue;

            const directionMatch =
                (rule.direction === 'rising' && change >= rule.threshold_change) ||
                (rule.direction === 'declining' && change <= -Math.abs(rule.threshold_change));

            if (directionMatch) {
                triggered.push(rule);
            }
        }

        return triggered;
    }

    // ─────────────────────────────────────────────
    // CURRENT STATE ADJUSTMENTS (threshold-based)
    // ─────────────────────────────────────────────

    /**
     * Analyzes the current state for immediate threshold risks.
     */
    public getThresholdAdjustments(state: VedaState, vikriti: VikritiMetrics): HealthAdjustment[] {
        const adjustments: HealthAdjustment[] = [];

        if (state.circadian_alignment < 50) {
            adjustments.push({
                issue: "Circadian rhythm disruption detected",
                recommendation: "Strict digital detox 2 hours before sleep tonight."
            });
        }

        if (state.ama_risk > 30 || state.agni_strength < 40) {
            adjustments.push({
                issue: "Low digestive fire (Agni) / Ama accumulation",
                recommendation: "Lighter, warm cooked meals today. Avoid raw foods."
            });
        }

        if (state.stress_load > 60 || (vikriti.dominant_dosha === 'Vata' && vikriti.vikriti_vata > 20)) {
            adjustments.push({
                issue: "Elevated subtle stress / High Vata pressure",
                recommendation: "Prioritize grounding practices and slow movement."
            });
        }

        if (state.sleep_debt > 40) {
            adjustments.push({
                issue: "Sleep debt accumulating",
                recommendation: "Prioritize early sleep (before 10 PM) tonight for Ojas recovery."
            });
        }

        return adjustments;
    }

    /**
     * Merges threshold-based and trend-based adjustments into a unified list.
     */
    public getAdjustments(state: VedaState, vikriti: VikritiMetrics): HealthAdjustment[] {
        const threshold = this.getThresholdAdjustments(state, vikriti);

        // Load history and run trend predictions
        const history = this.loadStateHistory();
        const predictions = this.runPredictions(history);

        const trending: HealthAdjustment[] = predictions.map(rule => ({
            issue: `${rule.prediction.replace(/_/g, ' ')} trend detected`,
            recommendation: rule.message,
            prediction: rule.prediction,
            protocolAdjustments: rule.protocol_adjustment,
        }));

        // Merge: show trending first as they are preventive
        return [...trending, ...threshold];
    }

    /**
     * Returns all protocol name adjustments triggered by trend predictions.
     */
    public getPredictionProtocols(history: StateSnapshot[]): string[] {
        const predictions = this.runPredictions(history);
        const names = new Set<string>();
        for (const rule of predictions) {
            for (const proto of rule.protocol_adjustment) {
                names.add(proto);
            }
        }
        return Array.from(names);
    }

    // ─────────────────────────────────────────────
    // SYSTEM REFLECTION
    // ─────────────────────────────────────────────

    /**
     * Generates a textual reflection on the current system balance.
     */
    public getSystemReflection(state: VedaState): string {
        if (state.ojas_score > 80) return "Your vitality is flourishing. Continue your consistent daily rhythms to maintain this high Ojas.";
        if (state.ojas_score > 50) return "Your routines are stabilizing your circadian rhythm. Focus on deep rest tonight.";
        return "Your system is seeking balance. Gentle, restorative practices are key right now to rebuild Ojas.";
    }
}
