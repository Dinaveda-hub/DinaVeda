import { SYMPTOMS } from "@/data/symptoms";
import { QUESTION_TEMPLATES } from "@/data/questionTemplates";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import QuestionClient from "./QuestionClient";

export async function generateStaticParams() {
  const pages: { slug: string }[] = [];

  Object.keys(SYMPTOMS).forEach((symptom) => {
    QUESTION_TEMPLATES.forEach((template) => {
      const slug = template.replace("{symptom}", symptom);
      pages.push({ slug });
    });
  });

  return pages;
}

function findSymptom(slug: string) {
  // Sort symptoms by length descending to match longest possible symptom first
  const symptomKeys = Object.keys(SYMPTOMS).sort((a, b) => b.length - a.length);
  for (const symptom of symptomKeys) {
    if (slug.includes(symptom)) {
      return symptom;
    }
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const symptomKey = findSymptom(slug);
  if (!symptomKey) return {};

  const symptom = SYMPTOMS[symptomKey as keyof typeof SYMPTOMS];
  const questionTitle = slug.replaceAll("-", " ");
  const capitalizedQuestion = questionTitle.charAt(0).toUpperCase() + questionTitle.slice(1) + "?";

  return {
    title: `${capitalizedQuestion} Ayurvedic Perspective | Dinaveda`,
    description: `Explore the Ayurvedic interpretation of ${symptom.name.toLowerCase()}. Learn about digestive fire (Agni), metabolic residue (Ama), and traditionally used lifestyle support patterns.`,
    keywords: symptom.primaryKeyword,
    alternates: {
      canonical: `https://www.dinaveda.com/questions/${slug}`,
    },
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symptomKey = findSymptom(slug);

  if (!symptomKey) {
    notFound();
  }

  const symptom = SYMPTOMS[symptomKey as keyof typeof SYMPTOMS];
  const questionTitle = slug.replaceAll("-", " ");
  const capitalizedQuestion = questionTitle.charAt(0).toUpperCase() + questionTitle.slice(1) + "?";

  const JSON_LD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `https://www.dinaveda.com/questions/${slug}#webpage`,
        "url": `https://www.dinaveda.com/questions/${slug}`,
        "name": `${capitalizedQuestion} Ayurvedic Perspective | Dinaveda`,
        "description": `Ayurvedic interpretation and lifestyle support patterns for ${symptom.name.toLowerCase()}.`,
        "lastReviewed": "2026-03-14",
        "author": {
          "@type": "Person",
          "name": "Dr. Rahul K R",
          "jobTitle": "Ayurvedic Physician"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Dinaveda"
        },
        "breadcrumb": { "@id": `https://www.dinaveda.com/questions/${slug}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.dinaveda.com/questions/${slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Health Hub",
            "item": "https://www.dinaveda.com/health"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Q&A",
            "item": `https://www.dinaveda.com/questions/${slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://www.dinaveda.com/questions/${slug}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": capitalizedQuestion,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `In Ayurvedic physiology, this is often interpreted as an imbalance in digestive fire (Agni) or the accumulation of metabolic residue (Ama). Lifestyle protocols are traditionally used to support internal balance.`
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <QuestionClient 
        slug={slug}
        symptomKey={symptomKey}
        symptom={symptom}
        questionTitle={questionTitle}
      />
    </>
  );
}
