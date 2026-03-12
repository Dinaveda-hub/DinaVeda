export interface DoshaAnswer {
    vata: number;
    pitta: number;
    kapha: number;
}

export interface PrakritiMetrics {
    prakriti_vata: number;
    prakriti_pitta: number;
    prakriti_kapha: number;
    raw_vata: number;
    raw_pitta: number;
    raw_kapha: number;
    constitution_string: string;
    is_extreme?: boolean; // Anti-gaming flag
}

export class PrakritiEngine {
    /**
     * Calculates deterministic normalized (100-basis) Prakriti metrics
     * from a list of user selections across the 21-question traits.
     */
    public calculateConstitution(answers: DoshaAnswer[]): PrakritiMetrics {
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

        // Anti-gaming detection (>70% in one dosha)
        const is_extreme = (prakriti_vata > 70 || prakriti_pitta > 70 || prakriti_kapha > 70);

        // Classify Constitution
        const constitution_string = this.classifyConstitution(prakriti_vata, prakriti_pitta, prakriti_kapha);

        return {
            prakriti_vata,
            prakriti_pitta,
            prakriti_kapha,
            raw_vata: vata,
            raw_pitta: pitta,
            raw_kapha: kapha,
            constitution_string,
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

        // 1. TRIDOSHA Check (diff ≤ 7 between 1st and 3rd)
        if ((first.score - third.score) <= 7) {
            return "Tridoshic (Vata-Pitta-Kapha)";
        }

        // 2. DUAL DOSHA Check (diff ≤ 10 between 1st and 2nd)
        if ((first.score - second.score) <= 10) {
            return `${first.dosha}-${second.dosha} Dominant`;
        }

        // 3. SINGLE DOSHA (diff > 10)
        return `${first.dosha} Dominant`;
    }
}
