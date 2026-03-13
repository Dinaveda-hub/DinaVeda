import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ojas: The Essence of Vitality & Immunity in Ayurveda | Dinaveda",
  description: "Understand Ojas—the ultimate product of healthy digestion and the foundation of immunity, strength, and spiritual clarity in Ayurveda.",
  alternates: {
    canonical: "https://www.dinaveda.com/guide/ojas",
  },
  openGraph: {
    title: "Ojas: The Essence of Vitality & Immunity in Ayurveda | Dinaveda",
    description: "Learn about Ojas: the biological essence that governs your resilience and glow.",
    url: "https://www.dinaveda.com/guide/ojas",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/guide/ojas-guide.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ojas: The Essence of Vitality & Immunity in Ayurveda | Dinaveda",
    description: "Learn about Ojas: the biological essence that governs your resilience and glow.",
    images: ["https://www.dinaveda.com/images/guide/ojas-guide.png"],
  },
};

export default function OjasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
