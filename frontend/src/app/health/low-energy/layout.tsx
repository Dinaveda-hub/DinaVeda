import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Low Energy: Ayurvedic Perspective on Fatigue & Metabolism | Dinaveda",
  description: "Understand persistent fatigue through Ayurvedic physiology. Learn how weak digestion and metabolic toxins affect your daily energy and vitality.",
  alternates: {
    canonical: "https://www.dinaveda.com/health/low-energy",
  },
  openGraph: {
    title: "Low Energy: Ayurvedic Perspective on Fatigue & Metabolism | Dinaveda",
    description: "Understand persistent fatigue through Ayurvedic physiology. Learn how weak digestion and metabolic toxins affect your daily energy and vitality.",
    url: "https://www.dinaveda.com/health/low-energy",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/health/low-energy-cover.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Low Energy & Fatigue: Ayurvedic Perspective | Dinaveda",
    description: "Persistent fatigue may arise from inefficient metabolic processes or accumulation of Ama. Learn how Ayurveda evaluates and supports vitality.",
    images: ["https://www.dinaveda.com/images/health/low-energy-cover.png"],
  },
};

export default function LowEnergyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
