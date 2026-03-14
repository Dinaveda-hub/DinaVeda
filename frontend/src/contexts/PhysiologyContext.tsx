"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultState, VedaState } from '../engine/stateModel';
import { createClient } from '../utils/supabase/client';
import { fetchUserProtocolWeights, ProtocolWeights } from '../utils/userWeightsService';
import { runPhysiologyCycle } from '../engine/physiologyOrchestrator';
import { Season, getCurrentSeason } from '../engine/rutuDriftEngine';

const STORAGE_KEY = 'veda_health_state';

import { PhysiologyPattern, fetchPatterns } from '../services/patternService';

interface PhysiologyContextType {
    state: VedaState;
    updateState: (input: VedaState | ((prev: VedaState) => VedaState)) => void;
    isLoaded: boolean;
    userWeights: ProtocolWeights;
    userId: string | null;
    subscriptionStatus: string;
    currentSeason: Season;
    healthGoal: string;
    setHealthGoal: (goal: string) => void;
    patterns: PhysiologyPattern[];
    setPatterns: React.Dispatch<React.SetStateAction<PhysiologyPattern[]>>;
}

const PhysiologyContext = createContext<PhysiologyContextType | undefined>(undefined);

export function PhysiologyProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<VedaState>(defaultState);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userWeights, setUserWeights] = useState<ProtocolWeights>({});
    const [userId, setUserId] = useState<string | null>(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>('inactive');
    const [patterns, setPatterns] = useState<PhysiologyPattern[]>([]);
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
            setUserId(userId);

            // 1. Immediately load cached state to prevent UI freezing
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
                    }
                } catch (e) {
                    console.warn("Corrupted local state");
                }
            }

            // Unblock the UI instantly if we have local state or if it's a guest
            setIsLoaded(true);

            if (!userId) {
                if (!localStored) {
                    setState(defaultState);
                    setHealthGoalInternal('general_wellness');
                    setPatterns([]);
                }
                return;
            }

            // 2. Fetch from DB in background
            try {
                const [{ data: profile }, weightsMap, patternsList] = await Promise.all([
                    supabase
                        .from('profiles')
                        .select('veda_health_state, is_onboarded, subscription_status, health_goal')
                        .eq('id', userId)
                        .single(),
                    fetchUserProtocolWeights(),
                    fetchPatterns(userId)
                ]);

                setUserWeights(weightsMap);
                setPatterns(patternsList);

                if (profile) {
                    setSubscriptionStatus(profile.subscription_status || 'inactive');
                    if (profile.health_goal) setHealthGoalInternal(profile.health_goal);

                    const dbState = (profile.veda_health_state as any) || {};
                    if (validateState(dbState)) {
                        setState(prev => ({
                            ...prev,
                            ...dbState,
                            is_onboarded: profile.is_onboarded ?? dbState.is_onboarded ?? prev.is_onboarded ?? false
                        }));
                    }
                }
            } catch (error) {
                console.error("Failed to sync profile data:", error);
            }
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

    const updateState = async (input: VedaState | ((prev: VedaState) => VedaState)) => {
        const nextState = typeof input === 'function' ? input(state) : input;
        
        // ── Physiology Orchestration ───────────────────────────────────────
        // Execute the full 21-subsystem pipeline via the central orchestrator.
        const { state: stabilized, notifications } = runPhysiologyCycle(
            state,
            nextState,
            userWeights,
            healthGoal,
            patterns
        );
        // ──────────────────────────────────────────────────────────────────

        setState(stabilized);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stabilized));

        if (notifications.length > 0) {
            console.log("Physiology Events Detected:", notifications);
            // Future: Trigger high-level UI alerts or push notifications here
        }

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
            subscriptionStatus, currentSeason, healthGoal, setHealthGoal,
            patterns, setPatterns 
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
