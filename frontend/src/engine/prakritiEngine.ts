import { ENGINE_CONFIG } from "./config";

const { prakriti: PT } = ENGINE_CONFIG.thresholds;

export interface DoshaAnswer {
    vata: number;
    pitta: number;
    kapha: number;
}

export interface PrakritiMetrics {
    prakriti_vata: number;
    prakriti_pitta: number;
    prakriti_kapha: number;
    raw_vata_points: number;
    raw_pitta_points: number;
    raw_kapha_points: number;
    constitution_string: string;
    confidence: number; // Dominance index (first - second)
    is_extreme?: boolean; // Anti-gaming flag
    is_onboarded?: boolean;
}

export class PrakritiEngine {
    /**
     * Calculates deterministic normalized (100-basis) Prakriti metrics
     * from a list of user selections across the 21-question traits.
     */
    public calculateConstitution(answers: DoshaAnswer[]): PrakritiMetrics {
        // Validation: Ensure exactly 21 answers exist
        if (answers.length !== 21) {
            throw new Error(`Invalid Prakriti questionnaire length: expected 21, got ${answers.length}`);
        }

        let vata = 0;
        let pitta = 0;
        let kapha = 0;

        // Sum raw points
        for (const ans of answers) {
            vata += ans.vata;
            pitta += ans.pitta;
            kapha += ans.kapha;
        }

        // Avoid division by zero
        const total = (vata + pitta + kapha) || 1;

        // Normalized raw values (before rounding)
        const rawV = (vata / total) * 100;
        const rawP = (pitta / total) * 100;
        const rawK = (kapha / total) * 100;

        let prakriti_vata = Math.round(rawV);
        let prakriti_pitta = Math.round(rawP);
        let prakriti_kapha = Math.round(rawK);

        // Mathematical Correction: Ensure total is exactly 100
        const diff = 100 - (prakriti_vata + prakriti_pitta + prakriti_kapha);
        if (diff !== 0) {
            // Distribute the difference to the largest dosha to maintain integrity
            const max = Math.max(prakriti_vata, prakriti_pitta, prakriti_kapha);
            if (max === prakriti_vata) prakriti_vata += diff;
            else if (max === prakriti_pitta) prakriti_pitta += diff;
            else prakriti_kapha += diff;
        }

        const sortedScores = [prakriti_vata, prakriti_pitta, prakriti_kapha].sort((a, b) => b - a);

        // Anti-gaming detection: dominant > 65 AND second < 20
        const is_extreme = sortedScores[0] > PT.EXTREME_DOMINANCE && sortedScores[1] < PT.EXTREME_RECESSION;

        // Confidence: Dominance Index (first - second)
        const confidence = sortedScores[0] - sortedScores[1];

        // Classify Constitution
        const constitution_string = this.classifyConstitution(prakriti_vata, prakriti_pitta, prakriti_kapha);

        return {
            prakriti_vata,
            prakriti_pitta,
            prakriti_kapha,
            raw_vata_points: vata,
            raw_pitta_points: pitta,
            raw_kapha_points: kapha,
            constitution_string,
            confidence,
            is_extreme
        };
    }

    private classifyConstitution(vata: number, pitta: number, kapha: number): string {
        const scores = [
            { dosha: "Vata", score: vata },
            { dosha: "Pitta", score: pitta },
            { dosha: "Kapha", score: kapha }
        ];

        // Sort descending
        scores.sort((a, b) => b.score - a.score);

        const first = scores[0];
        const second = scores[1];
        const third = scores[2];

        // 1. TRIDOSHA Check (diff ≤ 5 between 1st and 3rd)
        if ((first.score - third.score) <= PT.TRIDOSHA_MARGIN) {
            return "Tridoshic (Vata-Pitta-Kapha)";
        }

        // 2. DUAL DOSHA Check (diff ≤ 10 between 1st and 2nd)
        if ((first.score - second.score) <= PT.DUAL_DOSHA_MARGIN) {
            return `${first.dosha}-${second.dosha} Dominant`;
        }

        // 3. SINGLE DOSHA (diff > 10)
        return `${first.dosha} Dominant`;
    }
}
