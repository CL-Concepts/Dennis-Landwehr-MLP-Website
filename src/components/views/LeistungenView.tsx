"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import type { LeistungsuebersichtQuery } from "../../../tina/__generated__/types";
import type { LeistungenSeiteContent } from "@/lib/content";
import type { TinaResult } from "@/lib/tina";
import { services } from "@/config/services";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/sections/ServiceCard";
import FinalCta from "@/components/sections/FinalCta";
import LegalNotice from "@/components/ui/LegalNotice";

/** Leistungsübersicht – Inhalte aus Tina, im Editor live aktualisiert. */
export default function LeistungenView(props: TinaResult<LeistungsuebersichtQuery>) {
  const { data } = useTina(props);
  const page = data.leistungsuebersicht as unknown as LeistungenSeiteContent;
  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: page.breadcrumb, href: "/leistungen" }]} />
      </div>

      <section className="py-12 md:py-20 bg-white" aria-labelledby="leistungen-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            id="leistungen-heading"
            title={page.title}
            subtitle={page.subtitle}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-surface" aria-labelledby="leistungen-zielgruppen-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="leistungen-zielgruppen-heading" className="text-2xl font-bold text-navy mb-6">
            {page.phasesTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted leading-relaxed">
            {(page.phases || []).filter(Boolean).map((phase) => (
              <div key={phase!.title}>
                <h3 className="font-semibold text-navy mb-2">{phase!.title}</h3>
                <p>
                  {phase!.text}
                  {phase!.linkText && phase!.linkHref && (
                    <>
                      {" "}
                      <Link href={phase!.linkHref} className="text-primary hover:underline">
                        {phase!.linkText}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LegalNotice />
      </div>
      <FinalCta />
    </>
  );
}
