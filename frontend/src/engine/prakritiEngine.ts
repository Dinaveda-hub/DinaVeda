export interface PrakritiMetrics {
    prakriti_vata: number;
    prakriti_pitta: number;
    prakriti_kapha: number;
    constitution_string: string;
}

export class PrakritiEngine {
    /**
     * Calculates deterministic normalized (100-basis) Prakriti metrics
     * from a list of user selections across the 21-question traits.
     */
    public calculateConstitution(answers: { vata: number; pitta: number; kapha: number }[]): PrakritiMetrics {
        let vata = 0;
        let pitta = 0;
        let kapha = 0;

        // Sum raw points
        for (const ans of answers) {
            vata += ans.vata;
            pitta += ans.pitta;
            kapha += ans.kapha;
        }

        // Avoid division by zero in weird edge cases
        const total = (vata + pitta + kapha) || 1;

        // Normalize to exactly 100
        const prakriti_vata = Math.round((vata / total) * 100);
        const prakriti_pitta = Math.round((pitta / total) * 100);
        const prakriti_kapha = Math.round((kapha / total) * 100);

        // Classify Constitution
        const constitution_string = this.classifyConstitution(prakriti_vata, prakriti_pitta, prakriti_kapha);

        return {
            prakriti_vata,
            prakriti_pitta,
            prakriti_kapha,
            constitution_string
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

        // TRIDOSHA Check
        if ((first.score - third.score) <= 5) {
            return "Tridoshic (Vata-Pitta-Kapha)";
        }

        // DUAL DOSHA Check
        if ((first.score - second.score) <= 5) {
            return `${first.dosha}-${second.dosha} Dominant`;
        }

        // SINGLE DOSHA
        return `${first.dosha} Dominant`;
    }
}
