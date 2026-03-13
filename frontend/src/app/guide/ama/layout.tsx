import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ama: Understanding Metabolic Toxins in Ayurveda | Dinaveda",
  description: "Explore the concept of Ama—undigested metabolic residue that clogs biological channels. Learn how Ama forms and how to clear it for optimal health.",
  alternates: {
    canonical: "https://www.dinaveda.com/guide/ama",
  },
  openGraph: {
    title: "Ama: Understanding Metabolic Toxins in Ayurveda | Dinaveda",
    description: "Learn about Ama: the root cause of most health imbalances in Ayurvedic physiology.",
    url: "https://www.dinaveda.com/guide/ama",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/guide/ama-guide.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ama: Understanding Metabolic Toxins in Ayurveda | Dinaveda",
    description: "Learn about Ama: the root cause of most health imbalances in Ayurvedic physiology.",
    images: ["https://www.dinaveda.com/images/guide/ama-guide.png"],
  },
};

export default function AmaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
