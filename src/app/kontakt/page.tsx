import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { fill, type KontaktContent } from "@/lib/content";
import { getKontakt } from "@/lib/tina";
import KontaktView from "@/components/views/KontaktView";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getKontakt();
  const page = data.kontakt as unknown as KontaktContent;
  return buildMetadata({
    title: fill(page.seoTitle),
    description: fill(page.seoDescription),
    canonical: "/kontakt",
  });
}

export default async function KontaktPage() {
  const result = await getKontakt();
  return <KontaktView {...result} />;
}
