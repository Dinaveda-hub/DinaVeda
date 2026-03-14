import * as service from "../src/services/notificationService";

function assert(condition: boolean, message: string) {
    if (!condition) throw new Error(message);
}

// Global hook to track mock state since imports are immutable
let calls: { userId: string; message: string }[] = [];
let mockShouldThrow = false;

// Mock the globally available fetch function which `sendNotification` depends on internally!
// Since `sendNotification` is imported but we can't safely reassign the export,
// we will intercept what it DOES instead: the `fetch` call.
const originalFetch = global.fetch;

function setupMock() {
    calls = [];
    mockShouldThrow = false;

    // Override global fetch
    global.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
        // Only intercept the notify endpoint
        if (typeof url === "string" && url.includes("/api/notify")) {
            const body = JSON.parse((init?.body as string) || "{}");
            calls.push({ userId: body.userId, message: body.message });

            if (mockShouldThrow) {
                mockShouldThrow = false; // Only throw once
                throw new Error("Simulated network failure");
            }

            // Return a successful response stub
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Let other fetches pass through normally if any
        return originalFetch(url, init);
    };
}

function teardownMock() {
    global.fetch = originalFetch;
}

async function testEmptyInput() {
    setupMock();
    await service.triggerNotifications([], "user1");
    assert(calls.length === 0, "Expected 0 calls for empty events array");
    teardownMock();
}

async function testMissingUserId() {
    setupMock();
    await service.triggerNotifications(["circadian_drift"], "");
    assert(calls.length === 0, "Expected 0 calls for missing userId");
    teardownMock();
}

async function testSingleValidEvent() {
    setupMock();
    await service.triggerNotifications(["circadian_drift"], "user1");
    assert(calls.length === 1, "Expected 1 call for single valid event");
    assert(calls[0].userId === "user1", "Expected userId to be 'user1'");
    assert(calls[0].message.includes("sleep rhythm is drifting"), "Expected message to match circadian_drift rule");
    teardownMock();
}

async function testMultipleValidEvents() {
    setupMock();
    await service.triggerNotifications(["circadian_drift", "weak_agni"], "user1");
    assert(calls.length === 2, "Expected 2 calls for two valid events");
    assert(calls[0].userId === "user1" && calls[1].userId === "user1", "Expected userId to be 'user1'");
    assert(calls[0].message.includes("sleep rhythm is drifting"), "Expected first message to match circadian_drift");
    assert(calls[1].message.includes("Digestive fire appears weak"), "Expected second message to match weak_agni");
    teardownMock();
}

async function testMixedValidInvalidEvents() {
    setupMock();
    await service.triggerNotifications(["circadian_drift", "unknown_event"], "user1");
    assert(calls.length === 1, "Expected 1 call for mixed events");
    assert(calls[0].message.includes("sleep rhythm is drifting"), "Expected message to be from valid event");
    teardownMock();
}

async function testErrorHandling() {
    setupMock();

    // Will throw on the FIRST fetch intercepted
    mockShouldThrow = true;

    const originalConsoleError = console.error;
    console.error = () => {};

    await service.triggerNotifications(["circadian_drift", "weak_agni"], "user1");

    console.error = originalConsoleError;

    assert(calls.length === 2, "Expected 2 attempts even if first fails");
    assert(calls[0].message.includes("sleep rhythm is drifting"), "Expected first attempt to match circadian_drift");
    assert(calls[1].message.includes("Digestive fire appears weak"), "Expected second attempt to match weak_agni");
    teardownMock();
}

async function runTests() {
    await testEmptyInput();
    await testMissingUserId();
    await testSingleValidEvent();
    await testMultipleValidEvents();
    await testMixedValidInvalidEvents();
    await testErrorHandling();
}

(async () => {
    try {
        await runTests();
        console.log("✓ notification batch tests passed");
    } catch (err) {
        console.error("✗ notification batch tests failed:", err);
        process.exit(1);
    }
})();
