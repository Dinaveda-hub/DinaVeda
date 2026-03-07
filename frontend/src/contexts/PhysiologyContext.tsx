"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultState, VedaState } from '../engine/stateModel';
import { createClient } from '../utils/supabase/client';

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
        const loadState = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            let remoteState: Partial<VedaState> | null = null;
            let remoteOnboarded = false;

            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('veda_health_state, is_onboarded')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    remoteState = profile.veda_health_state as any;
                    remoteOnboarded = profile.is_onboarded;
                }
            }

            const localStored = localStorage.getItem(STORAGE_KEY);
            const localPrakritiStored = localStorage.getItem('prakriti_result');
            const localOnboarded = !!localPrakritiStored;

            if (remoteState) {
                // DB wins, but we can merge if needed. For now, DB is source of truth.
                setState({ ...defaultState, ...remoteState, is_onboarded: remoteOnboarded });
            } else if (localStored) {
                try {
                    const parsed = JSON.parse(localStored);
                    setState({ ...parsed, is_onboarded: localOnboarded });

                    // Trigger an initial sync to DB if user is logged in
                    if (user) {
                        await supabase.from('profiles').upsert({
                            id: user.id,
                            veda_health_state: parsed,
                            is_onboarded: localOnboarded,
                            updated_at: new Date().toISOString()
                        });
                    }
                } catch (e) {
                    console.error("Failed to parse local Veda state", e);
                    setState((prev: VedaState) => ({ ...prev, is_onboarded: localOnboarded }));
                }
            } else {
                setState((prev: VedaState) => ({ ...prev, is_onboarded: localOnboarded || remoteOnboarded }));
            }
            setIsLoaded(true);
        };

        loadState();
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
                setState((prev: VedaState) => ({ ...prev, is_onboarded: !!e.newValue }));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateState = async (newState: VedaState) => {
        setState(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from('profiles').upsert({
                id: user.id,
                veda_health_state: newState,
                is_onboarded: newState.is_onboarded,
                updated_at: new Date().toISOString()
            });
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
