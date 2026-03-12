import { COMBINATIONS } from "@/data";
import { notFound } from "next/navigation";
import HealthClient from "./HealthClient";

export default async function DynamicHealthPage({ params }: { params: Promise<{ slug: string }> }) {
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
