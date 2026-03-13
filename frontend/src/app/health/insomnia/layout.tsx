import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insomnia: Ayurvedic Perspective on Sleep Imbalance | Dinaveda",
  description: "Struggling to sleep? Learn the Ayurvedic perspective on insomnia. Understand how your internal clock, Vata dosha, and lifestyle affect sleep quality.",
  alternates: {
    canonical: "https://www.dinaveda.com/health/insomnia",
  },
  openGraph: {
    title: "Insomnia: Ayurvedic Perspective on Sleep Imbalance | Dinaveda",
    description: "Struggling to sleep? Learn the Ayurvedic perspective on insomnia. Understand how your internal clock, Vata dosha, and lifestyle affect sleep quality.",
    url: "https://www.dinaveda.com/health/insomnia",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/health/insomnia-cover.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insomnia: Ayurvedic Perspective on Sleep Imbalance | Dinaveda",
    description: "Struggling to sleep? Learn the Ayurvedic perspective on insomnia. Understand how your internal clock, Vata dosha, and lifestyle affect sleep quality.",
    images: ["https://www.dinaveda.com/images/health/insomnia-cover.png"],
  },
};

export default function InsomniaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
