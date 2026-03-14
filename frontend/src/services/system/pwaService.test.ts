import { initializePWA } from "./pwaService";

describe("pwaService", () => {
    const originalConsoleError = console.error;
    const originalNavigator = global.navigator;
    const originalWindow = global.window;

    beforeEach(() => {
        // Since window is not defined in this pure Node/Bun environment, we must mock it at least partially
        // if we are testing client-side code that expects it.
        // We ensure we don't completely overwrite a real window if it somehow exists later.
        global.window = global.window || ({} as any);
        global.window.addEventListener = jest.fn((event: string, callback: any) => {
            if (event === "load") {
                // Instantly invoke the load callback to execute the inner try/catch
                callback();
            }
        });
    });

    afterEach(() => {
        // Restore original globals
        global.navigator = originalNavigator;
        global.window = originalWindow;
        console.error = originalConsoleError;
        jest.restoreAllMocks();
    });

    test("logs error when service worker registration fails", async () => {
        // 1. Silence console.error
        jest.spyOn(console, "error").mockImplementation(() => {});

        // 2. Mock navigator.serviceWorker to reject
        Object.defineProperty(global.navigator, "serviceWorker", {
            value: {
                register: jest.fn().mockRejectedValue(new Error("fail"))
            },
            configurable: true
        });

        // 3. Execute initializePWA.
        initializePWA();

        // Wait for microtasks to flush
        await new Promise(resolve => setTimeout(resolve, 0));

        // 4. Assert console.error was called, but do not assert the exact string
        // as per instructions to prevent brittle tests.
        expect(console.error).toHaveBeenCalled();
        expect((console.error as jest.Mock).mock.calls[0][0]).toContain("Service Worker registration failed");

        // 5. Restore mock
        (console.error as jest.Mock).mockRestore();
    });
});
