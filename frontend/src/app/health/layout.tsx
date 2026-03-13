import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayurvedic Symptom Hub: Understanding Health Through Physiology | Dinaveda",
  description: "Explore common health symptoms through Ayurvedic physiology. Understand how digestion, metabolic residue, and dosha balance affect your vitality.",
  alternates: {
    canonical: "https://www.dinaveda.com/health",
  },
  openGraph: {
    title: "Ayurvedic Symptom Hub: Understanding Health Through Physiology | Dinaveda",
    description: "Explore common health symptoms through Ayurvedic physiology. Understand how digestion, metabolic residue, and dosha balance affect your vitality.",
    url: "https://www.dinaveda.com/health",
    siteName: "Dinaveda",
    type: "website",
    images: [{ url: "https://www.dinaveda.com/images/health/health-hub-cover.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayurvedic Symptom Hub: Understanding Health Through Physiology | Dinaveda",
    description: "Explore common health symptoms through Ayurvedic physiology. Understand how digestion, metabolic residue, and dosha balance affect your vitality.",
    images: ["https://www.dinaveda.com/images/health/health-hub-cover.png"],
  },
};

export default function HealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
