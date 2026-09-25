"use client";

import { useTina } from "tinacms/dist/react";
import type { KontaktQuery } from "../../../tina/__generated__/types";
import { fill, type KontaktContent } from "@/lib/content";
import type { TinaResult } from "@/lib/tina";
import { siteConfig } from "@/config/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BookingLink from "@/components/ui/BookingLink";
import LegalNotice from "@/components/ui/LegalNotice";

/** Kontaktseite – Inhalte aus Tina, im Editor live aktualisiert. */
export default function KontaktView(props: TinaResult<KontaktQuery>) {
  const { data } = useTina(props);
  const page = data.kontakt as unknown as KontaktContent;
  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: page.breadcrumb, href: "/kontakt" }]} />
      </div>

      <section className="py-12 md:py-20 bg-white" aria-labelledby="kontakt-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 id="kontakt-heading" className="text-3xl md:text-4xl font-bold text-navy mb-6">
              {page.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-10">{page.intro}</p>

            <div className="space-y-6">
              {/* Terminbuchung */}
              <div className="bg-secondary border border-primary/20 rounded-card p-6">
                <h2 className="text-lg font-bold text-navy mb-2">{page.bookingTitle}</h2>
                <p className="text-sm text-muted mb-4">{fill(page.bookingText)}</p>
                <BookingLink source="hero">{page.bookingButton}</BookingLink>
              </div>

              {/* Telefon */}
              <div className="bg-surface border border-border rounded-card p-6">
                <h2 className="text-lg font-bold text-navy mb-2">{page.phoneTitle}</h2>
                <a
                  href={`tel:+49${siteConfig.phone}`}
                  className="text-primary text-lg font-semibold hover:text-primary-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
                  aria-label={`Telefon: ${siteConfig.phoneFormatted}`}
                >
                  {siteConfig.phoneFormatted}
                </a>
              </div>

              {/* E-Mail */}
              <div className="bg-surface border border-border rounded-card p-6">
                <h2 className="text-lg font-bold text-navy mb-2">{page.emailTitle}</h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary font-semibold hover:text-primary-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded break-all"
                >
                  {siteConfig.email}
                </a>
                <p className="text-xs text-muted mt-2">{page.emailNote}</p>
              </div>

              {/* Adresse */}
              <div className="bg-surface border border-border rounded-card p-6">
                <h2 className="text-lg font-bold text-navy mb-2">{page.officeTitle}</h2>
                <address className="not-italic text-sm text-muted leading-relaxed">
                  <strong className="text-foreground">{siteConfig.name}</strong>
                  <br />
                  {siteConfig.professionalTitle}
                  <br />
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.zip} {siteConfig.address.city}
                </address>
                <p className="text-xs text-muted mt-3">{page.officeNote}</p>
              </div>

              {/* MLP Profil */}
              <div className="bg-surface border border-border rounded-card p-6">
                <h2 className="text-lg font-bold text-navy mb-2">{page.profileTitle}</h2>
                <a
                  href={siteConfig.mlpProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:text-primary-hover transition-colors underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded text-sm"
                >
                  {page.profileLinkText}
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <LegalNotice />
      </div>
    </>
  );
}
