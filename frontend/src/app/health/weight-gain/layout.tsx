import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weight Gain: Ayurvedic Metabolic Reset & Causes | Dinaveda",
  description: "Struggling with stubborn weight? Learn the Ayurvedic perspective on weight gain. Understand how Kapha, weak Agni, and metabolic toxins affect weight.",
  alternates: {
    canonical: "https://www.dinaveda.com/health/weight-gain",
  },
  openGraph: {
    title: "Weight Gain: Ayurvedic Metabolic Reset & Causes | Dinaveda",
    description: "Struggling with stubborn weight? Learn the Ayurvedic perspective on weight gain. Understand how Kapha, weak Agni, and metabolic toxins affect weight.",
    url: "https://www.dinaveda.com/health/weight-gain",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/health/weight-gain-cover.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayurvedic Perspective on Weight Gain: Metabolic Reset Guide | Dinaveda",
    description: "Struggling with stubborn weight? Learn the Ayurvedic perspective on weight gain. Understand how Kapha, weak Agni, and metabolic toxins affect weight.",
    images: ["https://www.dinaveda.com/images/health/weight-gain-cover.png"],
  },
};

export default function WeightGainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
