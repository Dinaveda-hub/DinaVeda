import { useState, useEffect } from 'react';

export type ChatLimitStatus = 'ok' | 'rate_limit' | 'daily_cap';

export const useChatLimits = () => {
    const [dailyCount, setDailyCount] = useState(0);
    const [recentTimestamps, setRecentTimestamps] = useState<number[]>([]);

    useEffect(() => {
        const loadLimits = () => {
            const today = new Date().toDateString();
            const storedDate = localStorage.getItem('veda_chat_limit_date');

            if (storedDate !== today) {
                localStorage.setItem('veda_chat_limit_date', today);
                localStorage.setItem('veda_chat_daily_count', '0');
                localStorage.setItem('veda_chat_recent_timestamps', '[]');
                setDailyCount(0);
                setRecentTimestamps([]);
            } else {
                const count = parseInt(localStorage.getItem('veda_chat_daily_count') || '0', 10);
                const timestamps = JSON.parse(localStorage.getItem('veda_chat_recent_timestamps') || '[]');
                setDailyCount(count);
                setRecentTimestamps(timestamps);
            }
        };

        loadLimits();

        // Midnight reset check
        const interval = setInterval(loadLimits, 60000);
        return () => clearInterval(interval);
    }, []);

    const checkLimit = (): ChatLimitStatus => {
        // Daily Limit: 50
        if (dailyCount >= 50) return 'daily_cap';

        // Rate Limit: 5 messages per minute
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        const messagesInLastMinute = recentTimestamps.filter(ts => ts > oneMinuteAgo);

        if (messagesInLastMinute.length >= 5) return 'rate_limit';

        return 'ok';
    };

    const incrementCount = () => {
        const now = Date.now();
        const newCount = dailyCount + 1;
        const newTimestamps = [...recentTimestamps, now].filter(ts => ts > now - 60000);

        setDailyCount(newCount);
        setRecentTimestamps(newTimestamps);

        localStorage.setItem('veda_chat_daily_count', newCount.toString());
        localStorage.setItem('veda_chat_recent_timestamps', JSON.stringify(newTimestamps));
    };

    const timeUntilDailyReset = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const diff = tomorrow.getTime() - now.getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    };

    return {
        dailyCount,
        checkLimit,
        incrementCount,
        timeUntilDailyReset,
        isAtDailyCap: dailyCount >= 50
    };
};
