import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import OneSignalInitializer from "@/components/OneSignalInitializer";
import NotificationMonitor from "@/components/NotificationMonitor";
import GlobalRegistration from "@/components/GlobalRegistration";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Dinaveda | Personalized Ayurvedic AI",
  description: "Your daily guide to holistic wellness, aligning ancient Ayurvedic wisdom with your unique constitution and real-world circadian rhythms.",
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/manifest.json",
  themeColor: "#2D5A43",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.onesignal.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://gqndshvifvsvqrvqzvzq.supabase.co" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
        suppressHydrationWarning
      >
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />
        <OneSignalInitializer />
        <GlobalRegistration />
        <NotificationMonitor />
        <div className="flex flex-col md:flex-row min-h-screen">
          <GlobalNav />
          <main className="flex-1 pb-20 md:pb-0 overflow-hidden flex flex-col min-h-screen md:h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
