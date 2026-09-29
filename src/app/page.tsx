import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { buildFaqSchema } from "@/lib/schema";
import { fill, type StartseiteContent } from "@/lib/content";
import { getStartseite } from "@/lib/tina";
import { toFaqs } from "@/lib/faq";
import JsonLd from "@/components/seo/JsonLd";
import HomeView from "@/components/views/HomeView";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getStartseite();
  const page = data.startseite as unknown as StartseiteContent;
  return buildMetadata({
    title: fill(page.seoTitle),
    description: fill(page.seoDescription) || siteConfig.description,
    canonical: "/",
  });
}

export default async function HomePage() {
  const result = await getStartseite();
  const page = result.data.startseite as unknown as StartseiteContent;
  return (
    <>
      <JsonLd data={buildFaqSchema(toFaqs(page.faq.items, "faq-start"))} />
      <HomeView {...result} />
    </>
  );
}
