import re

with open('frontend/src/services/notificationService.ts', 'r') as f:
    content = f.read()

new_func = """
export function registerUserWithOneSignal(userId: string) {
    if (typeof window !== "undefined") {
        const checkAndRegister = () => {
            const OneSignal = (window as any).OneSignal;
            if (OneSignal && (window as any).__onesignalInitialized) {
                try {
                    console.log("OneSignal: Attempting login for user:", userId);
                    OneSignal.login(userId).catch(console.error);
                } catch (err) {
                    console.error("OneSignal: Login failed:", err);
                }
            } else if (OneSignal) {
                // If it exists but not initialized yet, push a callback to the array
                OneSignal.push(async () => {
                    try {
                        console.log("OneSignal: Queue executing login for user:", userId);
                        await OneSignal.login(userId);
                    } catch (err) {
                        console.error("OneSignal: Login failed:", err);
                    }
                });
            } else {
                // Not even the array exists yet, wait
                setTimeout(checkAndRegister, 1000);
            }
        };
        checkAndRegister();
    }
}
"""

content = re.sub(
    r'export function registerUserWithOneSignal\(userId: string\) \{.*?\}\n\}\n',
    new_func.strip() + '\n\n',
    content,
    flags=re.DOTALL
)

with open('frontend/src/services/notificationService.ts', 'w') as f:
    f.write(content)

print("Updated registerUserWithOneSignal logic.")
