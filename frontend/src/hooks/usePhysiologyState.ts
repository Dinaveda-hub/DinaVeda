"use client";
import { useState, useEffect } from 'react';
import { defaultState, VedaState } from '../engine/stateModel';

const STORAGE_KEY = 'veda_health_state';

/**
 * A simple hook to manage the central deterministic VedaState.
 * Automatically saves and loads from localStorage.
 */
export function usePhysiologyState() {
    const [state, setState] = useState<VedaState>(defaultState);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const prakritiStored = localStorage.getItem('prakriti_result');
        const onboarded = !!prakritiStored;

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setState({ ...parsed, is_onboarded: onboarded });
            } catch (e) {
                console.error("Failed to parse Veda state", e);
                setState(prev => ({ ...prev, is_onboarded: onboarded }));
            }
        } else {
            setState(prev => ({ ...prev, is_onboarded: onboarded }));
        }
        setIsLoaded(true);
    }, []);

    const updateState = (newState: VedaState) => {
        setState(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    };

    return { state, updateState, isLoaded };
}
