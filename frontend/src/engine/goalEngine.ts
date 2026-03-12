import healthGoalsData from '../data/health_goals.json';
import { Protocol } from './protocolSelectionEngine';

export interface HealthGoal {
    id: string;
    label: string;
    icon: string;
    color: string;
    description: string;
    module_boosts: Record<string, number>;
    protocol_tags: string[];
}

export const HEALTH_GOALS = healthGoalsData as unknown as HealthGoal[];

/**
 * goalEngine.ts
 *
 * applies health goal weights as a preference layer.
 * 
 * Rules:
 * 1. Additive Scoring: Adds a small boost to existing physiological scores.
 * 2. Balanced Multipliers: Uses x3 for modules and small increments for tags.
 * 3. Robust Tag Matching: Checks protocol.tags, protocol.name, and protocol.category.
 */

export function applyGoalBoost(
    protocols: (Protocol & { score: number })[],
    goalId: string
): (Protocol & { score: number })[] {
    const goal = HEALTH_GOALS.find(g => g.id === goalId);
    if (!goal) return protocols;

    return protocols.map(p => {
        const goalBoost = calculateProtocolScore(p, goal);

        // Additive Boost: Goal is a 'preference layer' (10% weight)
        return {
            ...p,
            score: p.score + (goalBoost * 0.1)
        };
    }).sort((a, b) => b.score - a.score);
}

function calculateProtocolScore(protocol: Protocol, goal: HealthGoal): number {
    let score = 0;

    const protoNameLower = protocol.name.toLowerCase();
    const protoCategoryLower = protocol.category.toLowerCase();
    const moduleLower = protocol.module.toLowerCase();
    const protoTags = protocol.tags || [];

    // 1. Module-level boost (Balanced: x3 multiplier)
    if (goal.module_boosts[moduleLower]) {
        score += goal.module_boosts[moduleLower] * 3;
    }

    // 2. Protocol Tag matches (Robust Schema-based matching)
    for (const goalTag of goal.protocol_tags) {
        const tagLower = goalTag.toLowerCase();

        // High Signal: Direct Tag Match
        if (protoTags.some(t => t.toLowerCase() === tagLower)) {
            score += 3;
        }

        // Medium Signal: Name includes goal tag
        if (protoNameLower.includes(tagLower)) {
            score += 2;
        }

        // Low Signal: Category includes goal tag
        if (protoCategoryLower.includes(tagLower)) {
            score += 1;
        }
    }

    return score;
}
