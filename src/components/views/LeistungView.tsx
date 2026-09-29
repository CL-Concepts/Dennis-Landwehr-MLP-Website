"use client";

import { useTina } from "tinacms/dist/react";
import type { LeistungQuery } from "../../../tina/__generated__/types";
import type { LeistungContent } from "@/lib/content";
import type { TinaResult } from "@/lib/tina";
import { toFaqs } from "@/lib/faq";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import ServiceSections from "@/components/sections/ServiceSections";
import FinanceCalculators from "@/components/sections/FinanceCalculators";

/** Leistungsseite – Inhalte aus Tina, im Editor live aktualisiert. */
export default function LeistungView({
  slug,
  ...props
}: TinaResult<LeistungQuery> & { slug: string }) {
  const { data } = useTina(props);
  const page = data.leistung as unknown as LeistungContent;
  const calculator =
    page.calculator === "bu" ? (
      <FinanceCalculators variant="bu" headingId="bu-rechner-heading" />
    ) : page.calculator === "vermoegen" ? (
      <FinanceCalculators variant="vermoegen" headingId="vermoegen-rechner-heading" />
    ) : undefined;

  return (
    <ServicePageLayout
      breadcrumb={page.breadcrumb}
      slug={slug}
      h1={page.h1}
      summary={page.summary}
      updatedAt={page.updatedAt}
      atAGlance={(page.atAGlance || []).filter(Boolean)}
      interactiveSection={calculator}
      faqs={toFaqs(page.faqs, `faq-${slug}`)}
      relatedLinks={(page.relatedLinks || []).filter(Boolean)}
    >
      <ServiceSections sections={page.sections || []} />
    </ServicePageLayout>
  );
}
