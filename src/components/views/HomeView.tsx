"use client";

import { useTina } from "tinacms/dist/react";
import type { StartseiteQuery } from "../../../tina/__generated__/types";
import type { StartseiteContent } from "@/lib/content";
import type { TinaResult } from "@/lib/tina";
import Hero from "@/components/sections/Hero";
import AudienceSelector from "@/components/sections/AudienceSelector";
import ServicesOverview from "@/components/sections/ServicesOverview";
import FinanceCalculators from "@/components/sections/FinanceCalculators";
import CareerTimeline from "@/components/sections/CareerTimeline";
import AdvisorProfile from "@/components/sections/AdvisorProfile";
import ConsultingProcess from "@/components/sections/ConsultingProcess";
import FAQ from "@/components/sections/FAQ";
import FinalCta from "@/components/sections/FinalCta";
import LegalNotice from "@/components/ui/LegalNotice";
import Reveal from "@/components/ui/Reveal";
import { toFaqs } from "@/lib/faq";

/** Startseite – Inhalte aus Tina, im Editor live aktualisiert. */
export default function HomeView(props: TinaResult<StartseiteQuery>) {
  const { data } = useTina(props);
  const page = data.startseite as unknown as StartseiteContent;
  return (
    <>
      <Hero data={page.hero} />
      <AudienceSelector data={page.audiences} />
      <Reveal>
        <ServicesOverview data={page.services} />
      </Reveal>
      <FinanceCalculators />
      <CareerTimeline data={page.career} />
      <Reveal>
        <AdvisorProfile data={page.profile} />
      </Reveal>
      <Reveal>
        <ConsultingProcess data={page.process} />
      </Reveal>
      <FAQ faqs={toFaqs(page.faq.items, "faq-start")} title={page.faq.title} />
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <LegalNotice />
      </div>
      <FinalCta />
    </>
  );
}
