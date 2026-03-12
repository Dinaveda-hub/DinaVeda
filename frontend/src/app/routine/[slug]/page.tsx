import { ROUTINES } from "@/data";
import { notFound } from "next/navigation";
import RoutineClient from "./RoutineClient";

export default async function RoutinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const manualExists = !!ROUTINES[slug];
  const clinicalExists = slug.endsWith("-clinical") && ["morning", "midday", "evening"].includes(slug.split("-")[0]);
  
  if (!manualExists && !clinicalExists) {
    notFound();
  }

  return <RoutineClient slug={slug} />;
}

export async function generateStaticParams() {
  const manualSlugs = Object.keys(ROUTINES).map((slug) => ({ slug }));
  const clinicalSlugs = ["morning-clinical", "midday-clinical", "evening-clinical"].map((slug) => ({ slug }));
  
  return [...manualSlugs, ...clinicalSlugs];
}
