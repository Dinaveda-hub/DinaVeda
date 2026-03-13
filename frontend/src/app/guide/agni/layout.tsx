import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agni: Digestive Fire in Ayurvedic Physiology | Dinaveda",
  description: "Learn about Agni—the biological fire that governs digestion, metabolism, and longevity. Understand the four states of Agni and how to maintain metabolic health.",
  alternates: {
    canonical: "https://www.dinaveda.com/guide/agni",
  },
  openGraph: {
    title: "Agni: Digestive Fire in Ayurvedic Physiology | Dinaveda",
    description: "Understand Agni: the core principle of transformation and metabolism in Ayurveda.",
    url: "https://www.dinaveda.com/guide/agni",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/guide/agni-guide.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agni: Digestive Fire in Ayurvedic Physiology | Dinaveda",
    description: "Understand Agni: the core principle of transformation and metabolism in Ayurveda.",
    images: ["https://www.dinaveda.com/images/guide/agni-guide.png"],
  },
};

export default function AgniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
