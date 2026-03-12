"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultState, VedaState } from '../engine/stateModel';
import { createClient } from '../utils/supabase/client';
import { fetchUserProtocolWeights, ProtocolWeights } from '../utils/userWeightsService';
import { applySeasonalDrift, getCurrentSeason, Season } from '../engine/rutuDriftEngine';
import { applyBaselineStabilizer } from '../engine/baselineStabilizer';

const STORAGE_KEY = 'veda_health_state';

interface PhysiologyContextType {
    state: VedaState;
    updateState: (newState: VedaState) => void;
    isLoaded: boolean;
    userWeights: ProtocolWeights;
    userId: string | null;
    subscriptionStatus: string;
    currentSeason: Season;
    healthGoal: string;
    setHealthGoal: (goal: string) => void;
}

const PhysiologyContext = createContext<PhysiologyContextType | undefined>(undefined);

export function PhysiologyProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<VedaState>(defaultState);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userWeights, setUserWeights] = useState<ProtocolWeights>({});
    const [userId, setUserId] = useState<string | null>(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>('inactive');
    const [healthGoal, setHealthGoalInternal] = useState<string>('general_wellness');

    useEffect(() => {
        const supabase = createClient();

        const validateState = (data: any): boolean => {
            if (!data || typeof data !== 'object') return false;
            // Basic check: at least some core variables exist and are numeric
            const coreFields: (keyof VedaState)[] = ['vata', 'pitta', 'kapha', 'agni', 'ama', 'ojas'];
            return coreFields.every(field => typeof data[field] === 'number' && data[field] >= 0 && data[field] <= 100);
        };

        const loadProfile = async (userId: string | null) => {
            setIsLoaded(false);
            setUserId(userId);
            if (!userId) {
                setState(defaultState);
                setHealthGoalInternal('general_wellness');
                setIsLoaded(true);
                return;
            }

            const [{ data: profile }, weightsMap] = await Promise.all([
                supabase
                    .from('profiles')
                    .select('veda_health_state, is_onboarded, subscription_status, health_goal')
                    .eq('id', userId)
                    .single(),
                fetchUserProtocolWeights()
            ]);

            setUserWeights(weightsMap);

            if (profile) {
                setSubscriptionStatus(profile.subscription_status || 'inactive');
                setHealthGoalInternal(profile.health_goal || 'general_wellness');
                
                const dbState = (profile.veda_health_state as any) || {};
                if (validateState(dbState)) {
                    setState({
                        ...defaultState,
                        ...dbState,
                        is_onboarded: profile.is_onboarded ?? dbState.is_onboarded ?? false
                    });
                } else {
                    console.warn("Corrupted state in DB, resetting to default");
                    setState({ ...defaultState, is_onboarded: profile.is_onboarded ?? false });
                }
            } else {
                const localStored = localStorage.getItem(STORAGE_KEY);
                const localGoal = localStorage.getItem('veda_health_goal');
                const localPrakritiStored = localStorage.getItem('prakriti_result');
                const localOnboarded = !!localPrakritiStored;

                if (localGoal) setHealthGoalInternal(localGoal);

                if (localStored) {
                    try {
                        const parsed = JSON.parse(localStored);
                        if (validateState(parsed)) {
                            setState({ ...parsed, is_onboarded: localOnboarded });
                        } else {
                            throw new Error("Invalid local state");
                        }
                    } catch (e) {
                        console.warn("Corrupted local state, resetting to default");
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
                localStorage.removeItem('veda_health_goal');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
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
            if (e.key === 'veda_health_goal' && e.newValue) {
                setHealthGoalInternal(e.newValue);
            }
            if (e.key === 'prakriti_result') {
                setState((prev: VedaState) => ({ ...prev, is_onboarded: !!e.newValue }));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateState = async (newState: VedaState) => {
        // ── Physiology Pipeline ────────────────────────────────────────────
        // 1. User Input (signals) have already been applied by the caller.
        // 2. Apply Seasonal Drift (Rutu Drift) — environmental pressure.
        const withDrift = applySeasonalDrift(newState);
        // 3. Apply Baseline Stabilizer — prevents constitutional runaway.
        const stabilized = applyBaselineStabilizer(withDrift);
        // ──────────────────────────────────────────────────────────────────

        setState(stabilized);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stabilized));

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from('profiles').upsert({
                id: user.id,
                veda_health_state: stabilized,
                is_onboarded: stabilized.is_onboarded,
                updated_at: new Date().toISOString()
            });
        }
    };

    const setHealthGoal = async (goal: string) => {
        setHealthGoalInternal(goal);
        localStorage.setItem('veda_health_goal', goal);
        
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await supabase
                .from('profiles')
                .update({ health_goal: goal })
                .eq('id', session.user.id);
        }
    };

    const currentSeason = getCurrentSeason();

    return (
        <PhysiologyContext.Provider value={{ 
            state, updateState, isLoaded, userWeights, userId, 
            subscriptionStatus, currentSeason, healthGoal, setHealthGoal 
        }}>
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
