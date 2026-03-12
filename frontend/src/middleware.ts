import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
    // 1. Refresh session for all requests (important for all browser tabs)
    const response = await updateSession(request)

    const { nextUrl } = request
    
    // 2. Define Protected and Public paths
    const protectedPaths = ['/dashboard', '/modules', '/profile', '/prakriti', '/ayuone', '/history']
    const publicPaths = ['/', '/login', '/welcome', '/about', '/contact', '/privacy', '/terms', '/faq', '/how-it-works']

    // Use full matching for some, prefix for others
    const isProtected = protectedPaths.some(path => 
        path === '/' ? nextUrl.pathname === '/' : nextUrl.pathname.startsWith(path)
    )
    
    // Skip if it's an API or Auth route (handled separately)
    // 3. Authentication Check
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (isProtected && !user) {
        // Unauthenticated: redirect to login and preserve destination
        const loginUrl = nextUrl.clone()
        loginUrl.pathname = '/login'
        loginUrl.searchParams.set('next', nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Optional: Redirect authenticated users away from Login/Welcome/Landing to Dashboard
    if (user && (nextUrl.pathname === '/login' || nextUrl.pathname === '/welcome' || nextUrl.pathname === '/')) {
        const dashboardUrl = nextUrl.clone()
        dashboardUrl.pathname = '/dashboard'
        return NextResponse.redirect(dashboardUrl)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images/logos (public assets)
         */
        '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|OneSignalSDKWorker.js|OneSignalSDKUpdaterWorker.js|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
