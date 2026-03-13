import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bloating After Eating: Ayurvedic Causes & Digestion Guide | Dinaveda",
  description: "Understand bloating after meals through Ayurvedic physiology. Learn how digestion (Agni) and metabolic residue (Ama) contribute to abdominal discomfort.",
  alternates: {
    canonical: "https://www.dinaveda.com/health/bloating",
  },
  openGraph: {
    title: "Bloating After Eating: Ayurvedic Causes & Digestion Guide | Dinaveda",
    description: "Understand bloating after meals through Ayurvedic physiology. Learn how digestion (Agni) and metabolic residue (Ama) contribute to abdominal discomfort.",
    url: "https://www.dinaveda.com/health/bloating",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/health/bloating-cover.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloating After Eating: Ayurvedic Causes & Digestion Guide | Dinaveda",
    description: "Understand bloating after meals through Ayurvedic physiology. Learn how digestion (Agni) and metabolic residue (Ama) contribute to abdominal discomfort.",
    images: ["https://www.dinaveda.com/images/health/bloating-cover.png"],
  },
};

export default function BloatingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
