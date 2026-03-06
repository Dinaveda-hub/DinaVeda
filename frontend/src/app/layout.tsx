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

export const metadata: Metadata = {
  title: "Dinaveda | Personalized Ayurvedic AI",
  description: "Your daily guide to holistic wellness, aligning ancient Ayurvedic wisdom with your unique constitution and real-world circadian rhythms.",
};

import OneSignalInitializer from "@/components/OneSignalInitializer";
import NotificationMonitor from "@/components/NotificationMonitor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2D5A43" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
        suppressHydrationWarning
      >
        <OneSignalInitializer />
        <NotificationMonitor />
        <div className="flex flex-col md:flex-row min-h-screen">
          <GlobalNav />
          <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
