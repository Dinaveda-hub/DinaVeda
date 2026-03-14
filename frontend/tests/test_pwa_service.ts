import { initializePWA } from "../src/services/system/pwaService";

function assert(condition: boolean, message: string) {
    if (!condition) throw new Error(message);
}

// Keep a reference to the original globals to restore them between tests
const originalWindow = (global as any).window;
const originalNavigator = (global as any).navigator;

function restoreGlobals() {
    (global as any).window = originalWindow;
    (global as any).navigator = originalNavigator;
}

async function testSSREnvironment() {
    restoreGlobals();
    delete (global as any).window;

    // Should not throw
    initializePWA();

    console.log("✓ SSR Environment safely returns");
}

async function testNoServiceWorkerSupport() {
    restoreGlobals();

    // Mock window but no serviceWorker in navigator
    (global as any).window = {
        addEventListener: () => {}
    };
    (global as any).navigator = {};

    // Should not throw and should not attempt to register
    initializePWA();

    console.log("✓ No Service Worker Support safely returns");
}

async function testSuccessfulRegistration() {
    restoreGlobals();

    let registerCalled = false;
    let loadListenerAttached = false;
    let appinstalledListenerAttached = false;

    (global as any).window = {
        addEventListener: (event: string, cb: Function) => {
            if (event === "load") {
                loadListenerAttached = true;
                // Immediately call the load callback to trigger registration
                cb();
            } else if (event === "appinstalled") {
                appinstalledListenerAttached = true;
            }
        }
    };

    (global as any).navigator = {
        serviceWorker: {
            register: async (url: string) => {
                registerCalled = true;
                assert(url === "/sw.js", "Registered wrong URL");
                return { scope: "/", waiting: false };
            }
        }
    };

    initializePWA();

    // The load event handler is async, so we need to wait a tick for register to be called
    await new Promise(resolve => setTimeout(resolve, 0));

    assert(loadListenerAttached, "window.addEventListener('load') was not called");
    assert(appinstalledListenerAttached, "window.addEventListener('appinstalled') was not called");
    assert(registerCalled, "serviceWorker.register was not called");

    console.log("✓ Successful Registration (Happy Path)");
}

async function testRegistrationFailure() {
    restoreGlobals();

    let registerCalled = false;
    let errorCaught = false;

    // Mock console.error to track if the error was logged
    const originalConsoleError = console.error;
    console.error = (msg: string, err: any) => {
        if (msg.includes("Service Worker registration failed")) {
            errorCaught = true;
        }
    };

    try {
        (global as any).window = {
            addEventListener: (event: string, cb: Function) => {
                if (event === "load") cb();
            }
        };

        (global as any).navigator = {
            serviceWorker: {
                register: async () => {
                    registerCalled = true;
                    throw new Error("Mock registration failure");
                }
            }
        };

        // Should not throw an unhandled exception
        initializePWA();

        // Wait for the async load handler to complete
        await new Promise(resolve => setTimeout(resolve, 0));

        assert(registerCalled, "serviceWorker.register was not called");
        assert(errorCaught, "Error was not caught and logged by initializePWA");

        console.log("✓ Registration Failure handled gracefully");
    } finally {
        console.error = originalConsoleError;
    }
}

async function runAllTests() {
    console.log("=== PWA Service Tests ===");
    try {
        await testSSREnvironment();
        await testNoServiceWorkerSupport();
        await testSuccessfulRegistration();
        await testRegistrationFailure();

        console.log("\n✓ All tests passed");
        process.exit(0);
    } catch (err: any) {
        console.error("\n✗ Test failed:", err.message || err);
        process.exit(1);
    } finally {
        restoreGlobals();
    }
}

runAllTests();
