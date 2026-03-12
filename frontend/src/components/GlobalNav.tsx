"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";

const AUTH_ROUTES = ["/login", "/auth"];
const MARKETING_ROUTES = ["/", "/about", "/privacy", "/terms", "/contact", "/how-it-works"];
const ONBOARDING_ROUTES = ["/welcome"];

const HIDDEN_ROUTES = [...AUTH_ROUTES, ...MARKETING_ROUTES, ...ONBOARDING_ROUTES];

export default function GlobalNav() {
  const pathname = usePathname();
  const { state, isLoaded } = usePhysiologyState();

  if (!isLoaded) return null;

  if (
    HIDDEN_ROUTES.some(
      route => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    return null;
  }

  if (!state?.is_onboarded) return null;

  return (
    <>
      <Sidebar />
      <div className="md:hidden">
        <BottomNav />
      </div>
    </>
  );
}
