import { COMBINATIONS } from "@/data";
import { notFound } from "next/navigation";
import HealthClient from "./HealthClient";
import type { Metadata } from "next";

export default async function DynamicHealthPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in COMBINATIONS)) {
    notFound();
  }

  return <HealthClient slug={slug} />;
}

export async function generateStaticParams() {
  return Object.keys(COMBINATIONS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const combo = COMBINATIONS[slug];

  if (!combo) return {};

  const symptomName = slug.split("-")[0].replace("-", " ");
  const capitalizedSymptom = symptomName.charAt(0).toUpperCase() + symptomName.slice(1);

  return {
    title: `${combo.title}`,
    description: `Understand ${capitalizedSymptom} through Ayurvedic physiology. Learn common causes, digestive patterns, and lifestyle approaches that may help restore balance.`,
    alternates: {
      canonical: `https://www.dinaveda.com/health/${slug}`,
    },
    openGraph: {
      title: combo.title,
      description: `Understand ${capitalizedSymptom} through Ayurvedic physiology. Learn common causes, digestive patterns, and lifestyle approaches that may help restore balance.`,
      url: `https://www.dinaveda.com/health/${slug}`,
      siteName: "Dinaveda",
      type: "article",
      images: [{ url: `https://www.dinaveda.com/images/health/${symptomName}-cover.png` }],
    },
    twitter: {
      card: "summary_large_image",
      title: combo.title,
      description: `Understand ${capitalizedSymptom} through Ayurvedic physiology. Learn common causes, digestive patterns, and lifestyle approaches that may help restore balance.`,
      images: [`https://www.dinaveda.com/images/health/${symptomName}-cover.png`],
    },
  };
}

export const revalidate = 86400;
