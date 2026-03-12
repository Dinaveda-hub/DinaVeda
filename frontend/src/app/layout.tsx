import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import { PhysiologyProvider } from "@/contexts/PhysiologyContext";
import SystemController from "@/components/system/SystemController";
import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google';

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
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}>
        {/* Start cookieyes banner */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/3ed2a749e0e980e4777bb45b4c4f9a26/script.js"
          strategy="beforeInteractive"
        />
        {/* End cookieyes banner */}

        <link rel="preconnect" href="https://cdn.onesignal.com" />

        {/* OneSignal CDN — must load before SystemController initializes it */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />
        

        <PhysiologyProvider>
          {/* Unified system lifecycle: SW, OneSignal, auth registration, notifications, PWA prompt */}
          <SystemController />

          <div className="flex flex-col md:flex-row min-h-dvh">
            <GlobalNav />

            <main className="flex-1 flex flex-col min-h-dvh">
              {children}
            </main>
          </div>
        </PhysiologyProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        
        {/* Google Tag Manager (GTM) */}
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      </body>
    </html>
  );
}
