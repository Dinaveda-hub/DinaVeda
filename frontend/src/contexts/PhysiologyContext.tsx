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
        const supabase = createClient();

        const loadProfile = async (userId: string | null) => {
            setIsLoaded(false); // Reset loading state during transition
            if (!userId) {
                setState(defaultState);
                setIsLoaded(true);
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('veda_health_state, is_onboarded')
                .eq('id', userId)
                .single();

            if (profile) {
                // Prioritize DB state if it exists
                const dbState = (profile.veda_health_state as any) || {};
                setState({
                    ...defaultState,
                    ...dbState,
                    is_onboarded: profile.is_onboarded ?? dbState.is_onboarded ?? false
                });
            } else {
                // Fallback to local if no DB profile at all (first login)
                const localStored = localStorage.getItem(STORAGE_KEY);
                const localPrakritiStored = localStorage.getItem('prakriti_result');
                const localOnboarded = !!localPrakritiStored;

                if (localStored) {
                    try {
                        const parsed = JSON.parse(localStored);
                        setState({ ...parsed, is_onboarded: localOnboarded });
                    } catch (e) {
                        setState((prev: VedaState) => ({ ...prev, is_onboarded: localOnboarded }));
                    }
                } else {
                    setState((prev: VedaState) => ({ ...prev, is_onboarded: localOnboarded }));
                }
            }
            setIsLoaded(true);
        };

        // Handle initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            loadProfile(session?.user?.id || null);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
            if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED') {
                loadProfile(session?.user?.id || null);
            } else if (event === 'SIGNED_OUT') {
                loadProfile(null);
                // Clear local keys to prevent cross-user leak
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem('prakriti_result');
                localStorage.removeItem('completed_logs');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Remove the old mount useEffect (lines 21-74 in original)

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
