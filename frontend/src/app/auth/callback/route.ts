import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/welcome";

    // Security: Only allow internal redirects
    const safeNext = next.startsWith("/") ? next : "/welcome";

    if (code) {
        const supabase = await createClient();

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${safeNext}`);
        }

        console.error("Auth exchange failed:", error);
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(
        `${origin}/login?error=Invalid%20or%20expired%20magic%20link`
    );
}
