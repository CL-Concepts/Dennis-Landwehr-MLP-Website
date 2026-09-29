import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { fill, type LeistungenSeiteContent } from "@/lib/content";
import { getLeistungsuebersicht } from "@/lib/tina";
import LeistungenView from "@/components/views/LeistungenView";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getLeistungsuebersicht();
  const page = data.leistungsuebersicht as unknown as LeistungenSeiteContent;
  return buildMetadata({
    title: fill(page.seoTitle),
    description: fill(page.seoDescription),
    canonical: "/leistungen",
  });
}

export default async function LeistungenPage() {
  const result = await getLeistungsuebersicht();
  return <LeistungenView {...result} />;
}
