"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultState, VedaState } from '../engine/stateModel';

const STORAGE_KEY = 'veda_health_state';

interface PhysiologyContextType {
    state: VedaState;
    updateState: (newState: VedaState) => void;
    isLoaded: boolean;
}

const PhysiologyContext = createContext<PhysiologyContextType | undefined>(undefined);

export function PhysiologyProvider({ children }: { children: ReactNode }) {
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

    // Listen for storage changes from other tabs/windows
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                try {
                    const newState = JSON.parse(e.newValue);
                    setState(newState);
                } catch (error) {
                    console.error("Error syncing storage change", error);
                }
            }
            if (e.key === 'prakriti_result') {
                setState(prev => ({ ...prev, is_onboarded: !!e.newValue }));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateState = (newState: VedaState) => {
        setState(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

        // Also ensure prakriti_result syncs if it's part of the update
        if (newState.is_onboarded) {
            // We don't necessarily overwrite the actual quiz result here, 
            // but we ensure the flag is consistent.
        }
    };

    return (
        <PhysiologyContext.Provider value={{ state, updateState, isLoaded }}>
            {children}
        </PhysiologyContext.Provider>
    );
}

export function usePhysiology() {
    const context = useContext(PhysiologyContext);
    if (context === undefined) {
        throw new Error('usePhysiology must be used within a PhysiologyProvider');
    }
    return context;
}
