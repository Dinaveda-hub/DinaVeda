"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";

export default function GlobalNav() {
    const pathname = usePathname();
    const { state, isLoaded } = usePhysiologyState();

    // Hide navigation on auth, onboarding, and informational pages
    const hiddenRoutes = ['/login', '/auth', '/welcome', '/about', '/privacy', '/terms', '/contact', '/ayuone', '/how-it-works'];

    // Always hide if on a hidden route
    if (hiddenRoutes.some(route => pathname.startsWith(route))) {
        return null;
    }

    // Hide navigation globally if the user is not yet onboarded (ensure focus on initialization)
    if (isLoaded && !state.is_onboarded) {
        return null;
    }

    return (
        <>
            <Sidebar />
            {/* Mobile Bottom Navigation */}
            <div className="md:hidden">
                <BottomNav />
            </div>
        </>
    );
}
