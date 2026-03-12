import { PROTOCOL_GUIDES, PROTOCOL_MAP } from "@/data";
import { notFound } from "next/navigation";
import ProtocolClient from "./ProtocolClient";
import { formatProtocolName } from "@/utils/stringUtils";

export default async function ProtocolPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Try to find in manual bundles first
  const bundle = (slug in PROTOCOL_GUIDES) ? (PROTOCOL_GUIDES as any)[slug] : undefined;
  // Then try in the raw clinical dataset
  const raw = (slug in PROTOCOL_MAP) ? (PROTOCOL_MAP as any)[slug] : undefined;

  if (!bundle && !raw) {
    notFound();
  }

  const name = bundle?.name || formatProtocolName(raw?.name || "");
  const mechanism = bundle?.mechanism || raw?.instructions;
  const duration = bundle?.duration || raw?.duration || "Self-paced";
  const indications = bundle?.indications || raw?.tags || [];
  const contraindications = bundle?.contraindications || raw?.contraindications || [];

  return (
    <ProtocolClient 
      name={name}
      mechanism={mechanism}
      duration={duration}
      indications={indications}
      contraindications={contraindications}
      raw={raw}
      bundle={bundle}
    />
  );
}

export async function generateStaticParams() {
  const slugs = new Set([
    ...Object.keys(PROTOCOL_GUIDES),
    ...Object.keys(PROTOCOL_MAP)
  ]);
  
  return Array.from(slugs).map((slug) => ({ slug }));
}
