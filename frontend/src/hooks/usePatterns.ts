/**
 * usePatterns.ts
 *
 * React hook for the Physiology Memory Layer.
 * Fetches and caches user's detected behavioral patterns.
 */

"use client";

import { useState, useEffect, useCallback } from 'react';
import { PhysiologyPattern, fetchPatterns, triggerPatternAnalysis } from '../services/patternService';
import { usePhysiology } from '../contexts/PhysiologyContext';

interface UsePatternsResult {
    patterns: PhysiologyPattern[];
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    analyze: () => Promise<PhysiologyPattern[]>;
}

export function usePatterns(): UsePatternsResult {
    const { userId, patterns, setPatterns } = usePhysiology();
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
    }, [userId, setPatterns]);

    const analyze = useCallback(async (): Promise<PhysiologyPattern[]> => {
        if (!userId) return [];
        setIsLoading(true);
        setError(null);
        try {
            const newlyDetected = await triggerPatternAnalysis(userId);
            
            // Optimistic update: Immediate merge to avoid the redundant fetchPatterns call
            // and ensure the orchestrator sees the new patterns immediately.
            setPatterns((prev: PhysiologyPattern[]) => {
                const existingLabels = new Set(prev.map(p => p.pattern_type));
                const uniqueNew = newlyDetected.filter(p => !existingLabels.has(p.pattern_type));
                return [...prev, ...uniqueNew];
            });

            return newlyDetected;
        } catch (err) {
            setError('Pattern analysis failed');
            console.error(err);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [userId, setPatterns]);

    const refreshCallback = useCallback(async () => {
        await refresh();
    }, [refresh]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { patterns, isLoading, error, refresh: refreshCallback, analyze };
}
