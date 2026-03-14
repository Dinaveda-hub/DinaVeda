import { COMBINATIONS, SYMPTOMS } from "@/data";
import { notFound } from "next/navigation";
import HealthClient from "./HealthClient";
import SymptomClient from "./SymptomClient";
import type { Metadata } from "next";

export default async function DynamicHealthPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug in COMBINATIONS) {
    return <HealthClient slug={slug} />;
  }

  if (slug in SYMPTOMS) {
    return <SymptomClient slug={slug} />;
  }

  notFound();
}

export async function generateStaticParams() {
  const combinationParams = Object.keys(COMBINATIONS).map((slug) => ({ slug }));
  const symptomParams = Object.keys(SYMPTOMS).map((slug) => ({ slug }));
  
  return [...combinationParams, ...symptomParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  const siteUrl = "https://www.dinaveda.com";
  const canonical = `${siteUrl}/health/${slug}`;

  if (slug in COMBINATIONS) {
    const combo = COMBINATIONS[slug];
    const parts = slug.split("-");
    const doshaName = parts.pop() || "";
    const symptomName = parts.join(" ");
    const capitalizedSymptom = symptomName.charAt(0).toUpperCase() + symptomName.slice(1);
    const capitalizedDosha = doshaName.charAt(0).toUpperCase() + doshaName.slice(1);
    
    const title = `${capitalizedSymptom} (${capitalizedDosha} Type): Ayurvedic Perspective | Dinaveda`;
    const description = `Understand ${capitalizedSymptom} through the lens of ${capitalizedDosha} physiology. Explore traditionally used Ayurvedic lifestyle and dietary support patterns. Medically reviewed.`;
    
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "Dinaveda",
        type: "article",
        images: ["/og-health.png"]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-health.png"]
      }
    };
  }

  if (slug in SYMPTOMS) {
    const symptom = SYMPTOMS[slug];
    const title = `${symptom.name}: Ayurvedic Explanation & Causes | Dinaveda`;
    const description = `${symptom.summary} traditionally used in Ayurvedic physiology to support internal balance. Medically reviewed by Dr. Rahul K R.`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "Dinaveda",
        type: "article",
        images: ["/og-health.png"]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-health.png"]
      }
    };
  }

  return {};
}

export const revalidate = 86400;
