import { registerUserWithOneSignal } from "../src/services/notificationService";

async function runTests() {
    console.log("=== Notification Service Tests ===");
    let passed = 0;
    let failed = 0;

    // Test 1: Normal Registration
    try {
        let capturedId: string | null = null;
        let loginPromise: Promise<void> | null = null;

        // Mock global window
        (global as any).window = {
            OneSignal: {
                push: (fn: Function) => {
                    const result = fn();
                    if (result instanceof Promise) {
                        loginPromise = result;
                    }
                },
                login: async (id: string) => {
                    capturedId = id;
                }
            }
        };

        registerUserWithOneSignal("user123");

        if (loginPromise) {
            await loginPromise;
        }

        if (capturedId === "user123") {
            console.log("✓ registers user with OneSignal");
            passed++;
        } else {
            console.error("✗ registers user with OneSignal (login was not called with correct ID)");
            failed++;
        }
    } catch (e) {
        console.error("✗ registers user with OneSignal (threw an error)", e);
        failed++;
    }

    // Test 2: OneSignal Missing
    try {
        (global as any).window = {
            OneSignal: undefined
        };

        registerUserWithOneSignal("user123");
        console.log("✓ handles missing OneSignal");
        passed++;
    } catch (e) {
        console.error("✗ handles missing OneSignal (threw an error)", e);
        failed++;
    }

    // Test 3: No window Environment
    try {
        // Bun has a global 'window' in some contexts, but we can override it
        const originalWindow = (global as any).window;
        delete (global as any).window;
        // In bun we might also need to explicitly ensure `typeof window === 'undefined'`
        // However, typeof window resolves to undefined if it's not defined globally

        registerUserWithOneSignal("user123");
        console.log("✓ safe when window is undefined");
        passed++;

        // Restore window if needed
        (global as any).window = originalWindow;
    } catch (e) {
        console.error("✗ safe when window is undefined (threw an error)", e);
        failed++;
    }

    console.log(`\nTests complete: ${passed} passed, ${failed} failed`);
    if (failed > 0) {
        process.exit(1);
    }
}

runTests().catch(e => {
    console.error(e);
    process.exit(1);
});
