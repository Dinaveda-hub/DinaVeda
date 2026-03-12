import { PROTOCOLS, PROTOCOL_MAP } from "@/data/health-content";
import { notFound } from "next/navigation";
import ProtocolClient from "./ProtocolClient";

export default async function ProtocolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to find in manual bundles first
  const bundle = PROTOCOLS[slug];
  // Then try in the raw clinical dataset
  const raw = !bundle ? PROTOCOL_MAP[slug] : null;

  if (!bundle && !raw) {
    notFound();
  }

  const name = bundle?.name || (raw.name.split('_').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '));
  const mechanism = bundle?.mechanism || raw.instructions;
  const duration = bundle?.duration || raw.duration || "Self-paced";
  const indications = bundle?.indications || raw.tags || [];
  const contraindications = bundle?.contraindications || raw.contraindications || [];

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
  const manualSlugs = Object.keys(PROTOCOLS).map((slug) => ({ slug }));
  const rawSlugs = Object.keys(PROTOCOL_MAP).map((slug) => ({ slug }));
  
  return [...manualSlugs, ...rawSlugs];
}
