"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { registerUserWithOneSignal } from "@/services/notificationService";

export default function GlobalRegistration() {
    useEffect(() => {
        async function loadSession() {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                registerUserWithOneSignal(session.user.id);
            }
        }
        loadSession();
    }, []);

    return null;
}
