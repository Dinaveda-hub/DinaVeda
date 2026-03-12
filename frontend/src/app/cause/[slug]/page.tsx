import { CAUSES } from "@/data";
import { notFound } from "next/navigation";
import CauseClient from "./CauseClient";

export default async function CausePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (!CAUSES[slug]) {
    notFound();
  }

  return <CauseClient slug={slug} />;
}

export async function generateStaticParams() {
  return Object.keys(CAUSES).map((slug) => ({
    slug,
  }));
}
