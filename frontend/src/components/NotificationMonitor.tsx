"use client";

import { useEffect, useState } from "react";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { createBrowserClient } from "@supabase/ssr";
import { sendNotification } from "@/services/notificationService";
import notificationRulesRaw from "@/data/notificationRules.json";

const notificationRules = notificationRulesRaw as Record<string, { time: string, message: string }>;

export default function NotificationMonitor() {
    const { state, isLoaded } = usePhysiologyState();
    const [userId, setUserId] = useState<string | null>(null);
    const [lastTriggered, setLastTriggered] = useState<Record<string, number>>({});

    useEffect(() => {
        async function loadSession() {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );
            const { data: { session } } = await supabase.auth.getSession();
            if (session) setUserId(session.user.id);
        }
        loadSession();
    }, []);

    useEffect(() => {
        if (!isLoaded || !userId) return;

        const checkNotifications = () => {
            const now = new Date();
            const hour = now.getHours();
            const minutes = now.getMinutes();
            const currentTimeStr = `${hour}:${minutes < 10 ? '0' : ''}${minutes}`;

            // Helper to prevent spamming (max once per hour for same event)
            const canTrigger = (key: string) => {
                const last = lastTriggered[key] || 0;
                return (Date.now() - last) > 3600000; // 1 hour
            };

            const trigger = (event: string) => {
                if (canTrigger(event) && notificationRules[event]) {
                    sendNotification(userId, notificationRules[event].message);
                    setLastTriggered(prev => ({ ...prev, [event]: Date.now() }));
                }
            };

            // 1. Morning Check-in (6:30 - 7:30 AM)
            if (hour === 6 && minutes >= 30 || hour === 7 && minutes <= 30) {
                // Logic for check-in completion would normally check Supabase, 
                // but using state-based heuristic for now.
                trigger("morning_checkin");
            }

            // 2. Midday Agni (12:30 PM)
            if (hour === 12 && minutes >= 30 && minutes <= 45) {
                if (state.agni_strength < 60) {
                    trigger("midday_agni_reminder");
                }
            }

            // 3. Evening Circadian (8:30 PM)
            if (hour === 20 && minutes >= 30 && minutes <= 45) {
                if (state.circadian_alignment < 70) {
                    trigger("evening_circadian_reminder");
                }
            }

            // 4. Prediction Hints (Heuristics)
            if (state.kapha_state > 75) trigger("kapha_rising_alert");
            if (state.circadian_alignment < 50) trigger("sleep_debt_alert");
        };

        const interval = setInterval(checkNotifications, 60000); // Check every minute
        checkNotifications(); // Initial check

        return () => clearInterval(interval);
    }, [isLoaded, userId, state, lastTriggered]);

    return null;
}
