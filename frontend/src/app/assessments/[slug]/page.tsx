import { CALCULATORS, CalculatorId } from "@/data/calculators";
import AssessmentClient from "./AssessmentClient";
import { notFound } from "next/navigation";

export default async function DynamicAssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!(slug in CALCULATORS)) {
    notFound();
  }

  return <AssessmentClient slug={slug as CalculatorId} />;
}

export async function generateStaticParams() {
  return Object.keys(CALCULATORS).map((slug) => ({
    slug,
  }));
}
