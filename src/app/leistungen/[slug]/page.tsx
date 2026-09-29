import type { Metadata } from "next";
import { buildServiceMetadata } from "@/lib/metadata";
import { fill, leistungen, type LeistungContent } from "@/lib/content";
import { getLeistung } from "@/lib/tina";
import LeistungView from "@/components/views/LeistungView";

type Props = { params: Promise<{ slug: string }> };

/** Genau die fünf Leistungen aus dem CMS – andere Adressen ergeben 404. */
export const dynamicParams = false;
export function generateStaticParams() {
  return leistungen.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getLeistung(slug);
  const page = data.leistung as unknown as LeistungContent;
  return buildServiceMetadata(fill(page.seoTitle), fill(page.seoDescription), slug);
}

export default async function LeistungPage({ params }: Props) {
  const { slug } = await params;
  const result = await getLeistung(slug);
  return <LeistungView slug={slug} {...result} />;
}
