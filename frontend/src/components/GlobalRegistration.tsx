"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { registerUserWithOneSignal } from "@/services/notificationService";

export default function GlobalRegistration() {

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.warn("GlobalRegistration: Missing Supabase environment variables.");
            return;
        }

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        const register = async (userId: string) => {
            try {
                await registerUserWithOneSignal(userId);
            } catch (err) {
                console.error("OneSignal registration failed", err);
            }
        };

        // initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user?.id) {
                register(session.user.id);
            }
        });

        // listen for login/logout (tokens refresh, tabs sync, etc)
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session?.user?.id) {
                    register(session.user.id);
                }
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };

    }, []);

    return null;
}
