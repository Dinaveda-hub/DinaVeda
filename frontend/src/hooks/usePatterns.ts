/**
 * usePatterns.ts
 *
 * React hook for the Physiology Memory Layer.
 * Fetches and caches user's detected behavioral patterns.
 */

"use client";

import { useState, useEffect, useCallback } from 'react';
import { PhysiologyPattern, fetchPatterns, triggerPatternAnalysis } from '../services/patternService';
import { usePhysiologyState } from './usePhysiologyState';

interface UsePatternsResult {
    patterns: PhysiologyPattern[];
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    analyze: () => Promise<PhysiologyPattern[]>;
}

export function usePatterns(): UsePatternsResult {
    const { userId } = usePhysiologyState();
    const [patterns, setPatterns] = useState<PhysiologyPattern[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        if (!userId) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetched = await fetchPatterns(userId);
            setPatterns(fetched);
        } catch (err) {
            setError('Failed to load patterns');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const analyze = useCallback(async (): Promise<PhysiologyPattern[]> => {
        if (!userId) return [];
        setIsLoading(true);
        setError(null);
        try {
            const detected = await triggerPatternAnalysis(userId);
            // Refresh the full list after analysis
            const all = await fetchPatterns(userId);
            setPatterns(all);
            return detected;
        } catch (err) {
            setError('Pattern analysis failed');
            console.error(err);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { patterns, isLoading, error, refresh, analyze };
}
