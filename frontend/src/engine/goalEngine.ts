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
 * Applies health goal weights to protocol priority.
 *
 * Rules:
 * 1. Does NOT add or remove protocols (stays deterministic).
 * 2. If a protocol name matches a tag in the goal, it gets boosted.
 * 3. Module-level boosts are applied to all protocols in that module.
 */

export function applyGoalBoost(
    protocols: Protocol[],
    goalId: string
): Protocol[] {
    const goal = HEALTH_GOALS.find(g => g.id === goalId);
    if (!goal) return protocols;

    // We want to return a NEW array, sorted by the boost weight
    return [...protocols].sort((a, b) => {
        const aScore = calculateProtocolScore(a, goal);
        const bScore = calculateProtocolScore(b, goal);

        // Higher score comes first
        return bScore - aScore;
    });
}

function calculateProtocolScore(protocol: Protocol, goal: HealthGoal): number {
    let score = 0;

    const protoNameLower = protocol.name.toLowerCase();
    const protoCategoryLower = protocol.category.toLowerCase();
    const moduleLower = protocol.module.toLowerCase();

    // 1. Module-level boost
    if (goal.module_boosts[moduleLower]) {
        score += goal.module_boosts[moduleLower] * 10;
    }

    // 2. Protocol Tag matches (highest signal)
    for (const tag of goal.protocol_tags) {
        const tagLower = tag.toLowerCase();

        // Direct name match
        if (protoNameLower.includes(tagLower)) {
            score += 20;
        }

        // Category match
        if (protoCategoryLower.includes(tagLower)) {
            score += 5;
        }
    }

    return score;
}
