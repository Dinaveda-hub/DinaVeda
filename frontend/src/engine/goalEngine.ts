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

const GOAL_WEIGHT = 0.1;

export function applyGoalBoost(
    protocols: (Protocol & { score: number })[],
    goalId: string
): (Protocol & { score: number })[] {
    const goal = HEALTH_GOALS.find(g => g.id === goalId);
    if (!goal) return protocols;

    return protocols.map(p => {
        const goalBoost = calculateProtocolScore(p, goal);

        // Additive Boost: Goal is a 'preference layer'
        return {
            ...p,
            score: p.score + (goalBoost * GOAL_WEIGHT)
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

    // 2. Protocol Tag matches (Hierarchical matching to prevent double-counting)
    for (const goalTag of goal.protocol_tags) {
        const tagLower = goalTag.toLowerCase();
        let tagContribution = 0;

        // Highest match tier only for each goal tag
        if (protoTags.some(t => t.toLowerCase() === tagLower)) {
            tagContribution = 3; // Tier 1: Direct Tag Match
        } else if (protoNameLower.includes(tagLower)) {
            tagContribution = 2; // Tier 2: Name Match
        } else if (protoCategoryLower.includes(tagLower)) {
            tagContribution = 1; // Tier 3: Category Match
        }

        score += tagContribution;
    }

    return score;
}
