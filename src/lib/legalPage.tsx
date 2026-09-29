import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { fill, type RechtstextContent } from "@/lib/content";
import { getRechtstext } from "@/lib/tina";
import RechtstextView from "@/components/views/RechtstextView";

/** Gemeinsame Umsetzung der drei Rechtsseiten (Inhalte: content/rechtliches/<slug>.json). */
export function legalPage(slug: "impressum" | "datenschutz" | "rechtliche-hinweise") {
  async function generateMetadata(): Promise<Metadata> {
    const { data } = await getRechtstext(slug);
    const page = data.rechtstext as unknown as RechtstextContent;
    return buildMetadata({
      title: fill(page.seoTitle),
      description: fill(page.seoDescription),
      canonical: `/${slug}`,
      noIndex: true,
    });
  }
  async function Page() {
    const result = await getRechtstext(slug);
    return <RechtstextView slug={slug} {...result} />;
  }
  return { generateMetadata, Page };
}
