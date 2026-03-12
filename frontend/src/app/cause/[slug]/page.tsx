import { CAUSES } from "@/data";
import { notFound } from "next/navigation";
import CauseClient from "./CauseClient";
import { use } from "react";

export default function CausePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  if (!(slug in CAUSES)) {
    notFound();
  }

  return <CauseClient slug={slug} />;
}

export async function generateStaticParams() {
  return Object.keys(CAUSES).map((slug) => ({
    slug,
  }));
}
