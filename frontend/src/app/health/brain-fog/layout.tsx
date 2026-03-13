import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brain Fog: Ayurvedic Causes and Natural Support | Dinaveda",
  description: "Understand the root causes of brain fog through Ayurvedic physiology. Explore the impact of Ama and Kapha imbalance on mental clarity and focus.",
  alternates: {
    canonical: "https://www.dinaveda.com/health/brain-fog",
  },
  openGraph: {
    title: "Brain Fog: Ayurvedic Causes and Natural Support | Dinaveda",
    description: "Understand the root causes of brain fog through Ayurvedic physiology. Explore the impact of Ama and Kapha imbalance on mental clarity and focus.",
    url: "https://www.dinaveda.com/health/brain-fog",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/health/brain-fog-cover.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brain Fog: Ayurvedic Causes and Natural Support | Dinaveda",
    description: "Understand the root causes of brain fog through Ayurvedic physiology. Explore the impact of Ama, Kapha imbalance, and gut-brain connection.",
    images: ["https://www.dinaveda.com/images/health/brain-fog-cover.png"],
  },
};

export default function BrainFogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
