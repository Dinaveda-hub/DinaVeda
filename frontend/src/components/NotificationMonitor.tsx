"use client";

import { useEffect, useRef } from "react";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { sendNotification } from "@/services/notificationService";
import notificationRulesRaw from "@/data/notificationRules.json";

const notificationRules = notificationRulesRaw as Record<string, { time: string, message: string }>;

export default function NotificationMonitor() {
    const { state, isLoaded, userId } = usePhysiologyState();
    const lastTriggeredRef = useRef<Record<string, number>>({});

    useEffect(() => {
        if (!isLoaded || !userId) return;

        const checkNotifications = () => {
            const now = new Date();
            const hour = now.getHours();
            const minutes = now.getMinutes();

            // Helper to prevent spamming (max once per day for same event)
            // Uses localStorage locking to synchronize across multiple tabs
            const canTrigger = (key: string) => {
                const localLast = parseInt(localStorage.getItem(`veda_noti_${key}`) || '0', 10);
                const memLast = lastTriggeredRef.current[key] || 0;
                const last = Math.max(localLast, memLast);
                
                return (Date.now() - last) > 86400000; // 1 day cooldown
            };

            const trigger = (event: string) => {
                if (canTrigger(event) && notificationRules[event]) {
                    sendNotification(userId, notificationRules[event].message);
                    const nowMs = Date.now();
                    lastTriggeredRef.current[event] = nowMs;
                    localStorage.setItem(`veda_noti_${event}`, nowMs.toString());
                }
            };

            // 1. Morning Check-in (6:30 - 7:30 AM)
            if (
                (hour === 6 && minutes >= 30) || 
                (hour === 7 && minutes <= 30)
            ) {
                trigger("morning_checkin");
            }

            // 2. Midday Agni (12:30 PM)
            if (hour === 12 && minutes >= 30 && minutes <= 45) {
                if (state.agni < 60) {
                    trigger("midday_agni_reminder");
                }
            }

            // 3. Evening Circadian (8:30 PM)
            if (hour === 20 && minutes >= 30 && minutes <= 45) {
                if (state.circadian < 70) {
                    trigger("evening_circadian_reminder");
                }
            }

            // 4. Prediction Hints (Heuristics)
            if (state.kapha > 75) trigger("kapha_rising_alert");
            if (state.circadian < 50) trigger("sleep_debt_alert");
        };

        const interval = setInterval(checkNotifications, 60000); // Check every minute
        checkNotifications(); // Initial check

        return () => clearInterval(interval);
    }, [isLoaded, userId, state]);

    return null;
}
