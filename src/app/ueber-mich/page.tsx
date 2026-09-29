import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { fill, type UeberMichContent } from "@/lib/content";
import { getUeberMich } from "@/lib/tina";
import UeberMichView from "@/components/views/UeberMichView";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getUeberMich();
  const page = data.ueberMich as unknown as UeberMichContent;
  return buildMetadata({
    title: fill(page.seoTitle),
    description: fill(page.seoDescription),
    canonical: "/ueber-mich",
  });
}

export default async function UeberMichPage() {
  const result = await getUeberMich();
  return <UeberMichView {...result} />;
}
