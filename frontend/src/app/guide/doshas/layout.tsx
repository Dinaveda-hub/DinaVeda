import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Three Doshas: Vata, Pitta, and Kapha Explained | Dinaveda",
  description: "Learn about the three doshas—Vata, Pitta, and Kapha—the fundamental biological energies that govern all physical and mental processes in Ayurveda.",
  alternates: {
    canonical: "https://www.dinaveda.com/guide/doshas",
  },
  openGraph: {
    title: "The Three Doshas: Vata, Pitta, and Kapha Explained | Dinaveda",
    description: "Discover your unique biological blueprint through the lens of Vata, Pitta, and Kapha.",
    url: "https://www.dinaveda.com/guide/doshas",
    siteName: "Dinaveda",
    type: "article",
    images: [{ url: "https://www.dinaveda.com/images/guide/doshas-guide.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Three Doshas: Vata, Pitta, and Kapha Explained | Dinaveda",
    description: "Discover your unique biological blueprint through the lens of Vata, Pitta, and Kapha.",
    images: ["https://www.dinaveda.com/images/guide/doshas-guide.png"],
  },
};

export default function DoshasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
