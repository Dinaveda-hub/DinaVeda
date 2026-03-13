import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayurveda Guide: Understanding Doshas, Prakriti & Biological Rhythm | Dinaveda",
  description: "The definitive guide to Ayurvedic physiology. Learn about Vata, Pitta, Kapha, Agni, Ama, and Ojas to understand your unique biological blueprint.",
  alternates: {
    canonical: "https://www.dinaveda.com/guide",
  },
  openGraph: {
    title: "Ayurveda Guide: Understanding Doshas, Prakriti & Biological Rhythm | Dinaveda",
    description: "The definitive guide to Ayurvedic physiology. Learn about Vata, Pitta, Kapha, Agni, Ama, and Ojas.",
    url: "https://www.dinaveda.com/guide",
    siteName: "Dinaveda",
    type: "website",
    images: [{ url: "https://www.dinaveda.com/images/guide/guide-hub.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayurveda Guide: Understanding Doshas, Prakriti & Biological Rhythm | Dinaveda",
    description: "The definitive guide to Ayurvedic physiology. Learn about Vata, Pitta, Kapha, Agni, Ama, and Ojas.",
    images: ["https://www.dinaveda.com/images/guide/guide-hub.png"],
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
