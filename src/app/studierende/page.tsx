import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { buildFaqSchema } from "@/lib/schema";
import { fill, type StudierendeContent } from "@/lib/content";
import { getStudierende } from "@/lib/tina";
import { toFaqs } from "@/lib/faq";
import JsonLd from "@/components/seo/JsonLd";
import StudierendeView from "@/components/views/StudierendeView";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getStudierende();
  const page = data.studierende as unknown as StudierendeContent;
  return buildMetadata({
    title: fill(page.seoTitle),
    description: fill(page.seoDescription),
    canonical: "/studierende",
  });
}

export default async function StudierendePage() {
  const result = await getStudierende();
  const page = result.data.studierende as unknown as StudierendeContent;
  return (
    <>
      <JsonLd data={buildFaqSchema(toFaqs(page.faq.items, "faq-stud"))} />
      <StudierendeView {...result} />
    </>
  );
}
