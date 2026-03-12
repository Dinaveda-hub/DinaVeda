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
     */
    public saveStateSnapshot(state: VedaState): void {
        if (typeof window === 'undefined') return;
        const today = new Date().toISOString().split('T')[0];
        const history = this.loadStateHistory();

        const filtered = history.filter(s => s.date !== today);

        // Comprehensive Snapshot: Captures all 26 variables
        const snapshot: StateSnapshot = {
            date: today,
            state: {
                vata: state.vata,
                pitta: state.pitta,
                kapha: state.kapha,
                agni: state.agni,
                ama: state.ama,
                ojas: state.ojas,
                sleep: state.sleep,
                energy: state.energy,
                stress: state.stress,
                mood: state.mood,
                digestion: state.digestion,
                bloating: state.bloating,
                elimination: state.elimination,
                hydration: state.hydration,
                appetite: state.appetite,
                movement: state.movement,
                stiffness: state.stiffness,
                inflammation: state.inflammation,
                skin_health: state.skin_health,
                hair_health: state.hair_health,
                mental_clarity: state.mental_clarity,
                irritability: state.irritability,
                circadian: state.circadian,
                rutu_index: state.rutu_index,
                age_factor: state.age_factor
            }
        };

        // Guard: Limit stored history to max 7 days
        const updated = [...filtered, snapshot].slice(-this.MAX_HISTORY_DAYS);
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(updated));
    }

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
    // TREND DETECTION (Rolling Average)
    // ─────────────────────────────────────────────

    /**
     * Detects trend based on rolling averages: average(last3days) − average(previous3days)
     */
    private detectTrend(history: StateSnapshot[], variable: string): number | undefined {
        // Guard: If history length < 6 days: skip prediction
        if (history.length < 6) return undefined;

        const last3 = history.slice(-3);
        const prev3 = history.slice(-6, -3);

        const avgLast = last3.reduce((sum, s) => sum + ((s.state as Record<string, number>)[variable] || 0), 0) / 3;
        const avgPrev = prev3.reduce((sum, s) => sum + ((s.state as Record<string, number>)[variable] || 0), 0) / 3;

        return avgLast - avgPrev;
    }

    public runPredictions(history: StateSnapshot[]): (PredictionRule & { trend_strength: number })[] {
        // Guard: If history length < 6 days: skip prediction
        if (history.length < 6) return [];
        const triggered: (PredictionRule & { trend_strength: number })[] = [];

        for (const rule of this.rules) {
            const trend = this.detectTrend(history, rule.variable);
            if (trend === undefined) continue;

            const isRising = rule.direction === 'rising';
            const threshold = rule.threshold_change;

            // Trigger Logic: 
            // Rising: trend >= threshold (e.g., 8 >= 5)
            // Declining: trend <= threshold (e.g., -8 <= -5)
            const isTriggered = isRising ? trend >= threshold : trend <= threshold;

            if (isTriggered) {
                triggered.push({ ...rule, trend_strength: Math.abs(trend) });
            }
        }

        return triggered;
    }

    public getPredictionBoostMap(history: StateSnapshot[]): Record<string, number> {
        const predictions = this.runPredictions(history);
        const boostMap: Record<string, number> = {};

        for (const rule of predictions) {
            for (const protoName of rule.protocol_adjustment) {
                boostMap[protoName] = (boostMap[protoName] || 0) + rule.trend_strength;
            }
        }

        return boostMap;
    }

    public getThresholdAdjustments(state: VedaState, vikriti: VikritiMetrics): HealthAdjustment[] {
        const adjustments: HealthAdjustment[] = [];

        if (state.circadian < 50) {
            adjustments.push({
                issue: "Circadian rhythm disruption detected",
                recommendation: "Strict digital detox 2 hours before sleep tonight."
            });
        }

        if (state.ama > 30 || state.agni < 40) {
            adjustments.push({
                issue: "Low digestive fire (Agni) / Ama accumulation",
                recommendation: "Lighter, warm cooked meals today. Avoid raw foods."
            });
        }

        if (state.stress > 60 || (vikriti.dominant_dosha === 'Vata' && vikriti.vata_diff > 20)) {
            adjustments.push({
                issue: "Elevated subtle stress / High Vata pressure",
                recommendation: "Prioritize grounding practices and slow movement."
            });
        }

        if (state.sleep < 60) {
            adjustments.push({
                issue: "Sleep quality is sub-optimal",
                recommendation: "Prioritize early sleep (before 10 PM) tonight for Ojas recovery."
            });
        }

        return adjustments;
    }

    public getAdjustments(state: VedaState, vikriti: VikritiMetrics): HealthAdjustment[] {
        const threshold = this.getThresholdAdjustments(state, vikriti);
        const history = this.loadStateHistory();
        const predictions = this.runPredictions(history);

        const trending: HealthAdjustment[] = predictions.map(rule => ({
            issue: `${rule.prediction.replace(/_/g, ' ')} trend detected`,
            recommendation: rule.message,
            prediction: rule.prediction,
            protocolAdjustments: rule.protocol_adjustment,
        }));

        return [...trending, ...threshold];
    }

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

    public getSystemReflection(state: VedaState): string {
        if (state.ojas > 80) return "Your vitality is flourishing. Continue your consistent daily rhythms to maintain this high Ojas.";
        if (state.ojas > 50) return "Your routines are stabilizing your circadian rhythm. Focus on deep rest tonight.";
        return "Your system is seeking balance. Gentle, restorative practices are key right now to rebuild Ojas.";
    }
}
