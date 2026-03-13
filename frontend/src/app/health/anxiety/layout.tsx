import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anxiety: Ayurvedic Explanation and Natural Solutions | Dinaveda",
  description: "Understand anxiety through the lens of Vata imbalance. Learn how the air element affects your nervous system and Ayurvedic tips to find your center.",
  alternates: {
    canonical: "https://www.dinaveda.com/health/anxiety",
  },
  openGraph: {
    title: "Anxiety: Ayurvedic Explanation and Natural Solutions | Dinaveda",
    description: "Understand anxiety through the lens of Vata imbalance. Learn how the air element affects your nervous system and Ayurvedic tips to find your center.",
    url: "https://www.dinaveda.com/health/anxiety",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/health/anxiety-cover.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anxiety: Ayurvedic Explanation & Causes | Dinaveda",
    description: "Understand anxiety through the lens of Vata imbalance. Learn how the air element affects your nervous system and Ayurvedic tips to find your center.",
    images: ["https://www.dinaveda.com/images/health/anxiety-cover.png"],
  },
};

export default function AnxietyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
