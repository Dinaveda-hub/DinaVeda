import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import { PhysiologyProvider } from "@/contexts/PhysiologyContext";
import { UpgradeProvider } from "@/contexts/UpgradeContext";
import SystemController from "@/components/system/SystemController";
import UpgradeModal from "@/components/billing/UpgradeModal";
import Script from "next/script";

import { createClient } from "@/utils/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dinaveda | Personalized Ayurvedic AI",
    template: "%s | Dinaveda",
  },
  description:
    "Your daily guide to holistic wellness combining Ayurvedic wisdom with circadian health.",
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "apple-touch-icon-precomposed", url: "/apple-icon.png" },
    ],
  },
  manifest: "/manifest.json?v=4",
};

export const viewport: Viewport = {
  themeColor: "#1B5E43",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.onesignal.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.onesignal.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn-cookieyes.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn-cookieyes.com" />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P5QD4DQ6KM"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-P5QD4DQ6KM');
        ` }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}>
        {/* Start cookieyes banner - Only show for guests to avoid obstructing dashboard nav */}
        {!isLoggedIn && (
            <Script
                id="cookieyes"
                src="https://cdn-cookieyes.com/client_data/3ed2a749e0e980e4777bb45b4c4f9a26/script.js"
                strategy="beforeInteractive"
            />
        )}
        {/* End cookieyes banner */}


        {/* OneSignal CDN — must load before SystemController initializes it */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />
        

        <PhysiologyProvider>
          <UpgradeProvider>
            {/* Unified system lifecycle: SW, OneSignal, auth registration, notifications, PWA prompt */}
            <SystemController
              oneSignalAppId={process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || process.env.ONESIGNAL_APP_ID || ""}
              oneSignalSafariId={process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_ID || process.env.ONESIGNAL_SAFARI_ID || ""}
            />

            <div className="flex flex-col md:flex-row min-h-dvh">
              <GlobalNav />

              <main className="flex-1 flex flex-col min-h-dvh">
                {children}
              </main>
            </div>

            {/* Contextual Global Upgrade Modal */}
            <UpgradeModal />
          </UpgradeProvider>
        </PhysiologyProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
