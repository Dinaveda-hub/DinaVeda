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
import PwaInstallBanner from "@/components/PwaInstallBanner";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Dinaveda | Personalized Ayurvedic AI",
  description: "Your daily guide to holistic wellness, aligning ancient Ayurvedic wisdom with your unique constitution and real-world circadian rhythms.",
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

export const viewport = {
  themeColor: "#1B5E43",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
        suppressHydrationWarning
      >
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="lazyOnload"
        />
        <OneSignalInitializer />
        <GlobalRegistration />
        <NotificationMonitor />
        <PwaInstallBanner />
        <div className="flex flex-col md:flex-row min-h-screen">
          <GlobalNav />
          <main className="flex-1 flex flex-col min-h-screen">
            {children}
          </main>
        </div>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              const register = () => {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                  console.log('ServiceWorker registration failed: ', err);
                });
              };
              
              if (document.readyState === 'complete') {
                register();
              } else {
                window.addEventListener('load', register);
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
