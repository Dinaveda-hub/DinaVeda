"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import VedaChatFAB from "./VedaChatFAB";

export default function GlobalNav() {
    const pathname = usePathname();

    // Hide navigation on auth pages and informational landing pages
    const hiddenRoutes = ['/login', '/auth', '/welcome', '/about', '/privacy', '/terms', '/contact'];
    if (hiddenRoutes.some(route => pathname.startsWith(route))) {
        return null;
    }

    return (
        <>
            <Sidebar />
            {/* Mobile Bottom Navigation */}
            <div className="md:hidden">
                <BottomNav />
            </div>

            {/* Mobile Floating Action Button */}
            <div className="md:hidden">
                <VedaChatFAB />
            </div>
        </>
    );
}
