
import { PredictionEngine } from '../src/engine/predictionEngine';
import { defaultState } from '../src/engine/stateModel';

// Mock window and localStorage
(global as any).window = {};
const mockStorage: Record<string, string> = {};
(global as any).localStorage = {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, value: string) => { mockStorage[key] = value; },
};

// Define Mock Supabase Client
const mockSupabase = {
    auth: {
        getUser: async () => ({ data: { user: { id: 'test-user' } } })
    },
    from: (table: string) => ({
        upsert: () => ({
            select: () => ({
                eq: () => ({
                    order: () => ({
                        limit: async () => ({ data: [], error: null })
                    })
                })
            }),
            then: (cb: any) => Promise.resolve(cb({ error: null }))
        }),
        select: () => ({
            eq: () => ({
                order: () => ({
                    limit: async () => ({ 
                        data: [
                            { snapshot_date: '2026-03-12', state_json: { ojas: 75 } },
                            { snapshot_date: '2026-03-11', state_json: { ojas: 70 } }
                        ],
                        error: null 
                    })
                })
            })
        })
    })
};

async function runTest() {
    console.log("=== Prediction Engine Sync Verification (DI Mode) ===");
    const engine = new PredictionEngine(mockSupabase);

    console.log("1. Testing saveStateSnapshot (Local + Mock Cloud)...");
    await engine.saveStateSnapshot(defaultState);
    const localHistory = JSON.parse(mockStorage['veda_state_history'] || '[]');
    console.log(`- Local history length: ${localHistory.length}`);
    if (localHistory.length > 0) {
        console.log(`- Latest local date: ${localHistory[localHistory.length-1].date}`);
    }

    console.log("\n2. Testing syncFromSupabase...");
    delete mockStorage['veda_state_history'];
    console.log("- Local storage cleared.");
    
    await engine.syncFromSupabase();
    const syncedHistoryValue = mockStorage['veda_state_history'];
    if (!syncedHistoryValue) {
        console.error("❌ Synced history is missing from localStorage!");
        return;
    }
    const syncedHistory = JSON.parse(syncedHistoryValue);
    console.log(`- Synced history length: ${syncedHistory.length}`);
    console.log(`- First entry date: ${syncedHistory[0].date}`);
    console.log(`- Second entry date: ${syncedHistory[1].date}`);

    // Expecting: [2026-03-11, 2026-03-12] after reverse()
    if (syncedHistory.length === 2 && syncedHistory[0].date === '2026-03-11') {
        console.log("\n✅ Sync Logic Verified Successfully.");
    } else {
        console.error("\n❌ Sync Logic Verification Failed (Date ordering mismatch).");
    }
}

runTest().catch(console.error);
