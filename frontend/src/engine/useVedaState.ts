"use client";
import { useState, useEffect } from 'react';
import { defaultState, VedaState } from './stateModel';

const STORAGE_KEY = 'veda_health_state';

/**
 * A simple hook to manage the central deterministic VedaState.
 * Automatically saves and loads from localStorage.
 */
export function useVedaState() {
    const [state, setState] = useState<VedaState>(defaultState);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setState(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse Veda state", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const updateState = (newState: VedaState) => {
        setState(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    };

    return { state, updateState, isLoaded };
}
