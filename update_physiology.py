import re

with open('frontend/src/contexts/PhysiologyContext.tsx', 'r') as f:
    content = f.read()

# Make it load from localStorage FIRST, immediately
new_load_profile = """
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
"""

# Find the existing loadProfile block
start_idx = content.find("const loadProfile = async (userId: string | null) => {")
end_idx = content.find("setIsLoaded(true);\n        };", start_idx) + len("setIsLoaded(true);\n        };")

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_load_profile.strip() + content[end_idx:]
    with open('frontend/src/contexts/PhysiologyContext.tsx', 'w') as f:
        f.write(content)
    print("Successfully updated PhysiologyContext.tsx")
else:
    print("Could not find loadProfile block")
