import { CALCULATORS } from "@/data/calculators";
import ToolClient from "./ToolClient";
import { notFound } from "next/navigation";

export default async function DynamicToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!CALCULATORS[slug]) {
    notFound();
  }

  return <ToolClient slug={slug} />;
}

export async function generateStaticParams() {
  return Object.keys(CALCULATORS).map((slug) => ({
    slug,
  }));
}
