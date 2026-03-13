import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poor Digestion: Ayurvedic Guide to Gut Health & Agni | Dinaveda",
  description: "Improve your digestive strength through Ayurvedic principles. Understand the role of Agni and Ama in maintaining optimal gut health and nutrient absorption.",
  alternates: {
    canonical: "https://www.dinaveda.com/health/poor-digestion",
  },
  openGraph: {
    title: "Poor Digestion: Ayurvedic Guide to Gut Health & Agni | Dinaveda",
    description: "Improve your digestive strength through Ayurvedic principles. Understand the role of Agni and Ama in maintaining optimal gut health and nutrient absorption.",
    url: "https://www.dinaveda.com/health/poor-digestion",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/health/poor-digestion-cover.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poor Digestion: Ayurvedic Guide to Agni and Metabolism | Dinaveda",
    description: "Learn how to improve your digestion using Ayurvedic principles. Understand the role of Agni, Ama, and dosha balance in metabolic health.",
    images: ["https://www.dinaveda.com/images/health/poor-digestion-cover.png"],
  },
};

export default function PoorDigestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
