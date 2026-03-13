import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dinacharya: The Science of Ayurvedic Daily Routine | Dinaveda",
  description: "Learn about Dinacharya—the practice of aligning your daily habits with natural biological rhythms for optimal energy, digestion, and longevity.",
  alternates: {
    canonical: "https://www.dinaveda.com/guide/dinacharya",
  },
  openGraph: {
    title: "Dinacharya: The Science of Ayurvedic Daily Routine | Dinaveda",
    description: "Align your life with the sun's cycles through the ancient wisdom of Dinacharya.",
    url: "https://www.dinaveda.com/guide/dinacharya",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/guide/dinacharya-guide.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinacharya: The Science of Ayurvedic Daily Routine | Dinaveda",
    description: "Align your life with the sun's cycles through the ancient wisdom of Dinacharya.",
    images: ["https://www.dinaveda.com/images/guide/dinacharya-guide.png"],
  },
};

export default function DinacharyaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
