import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { userId, message } = await request.json();
        const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID || process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
        const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

        if (!ONESIGNAL_REST_API_KEY) {
            console.error("ONESIGNAL_REST_API_KEY is missing from environment variables.");
            return NextResponse.json({ error: "OneSignal API Key missing" }, { status: 500 });
        }

        const response = await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
            },
            body: JSON.stringify({
                app_id: ONESIGNAL_APP_ID,
                include_external_user_ids: [userId],
                contents: { "en": message },
            }),
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error sending notification:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
