import { CALCULATORS, CalculatorId } from "@/data/calculators";
import ToolClient from "./ToolClient";
import { notFound } from "next/navigation";

export default async function DynamicToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!(slug in CALCULATORS)) {
    notFound();
  }

  return <ToolClient slug={slug as CalculatorId} />;
}

export async function generateStaticParams() {
  return Object.keys(CALCULATORS).map((slug) => ({
    slug,
  }));
}
