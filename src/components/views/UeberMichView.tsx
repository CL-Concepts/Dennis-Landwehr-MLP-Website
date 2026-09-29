"use client";

import Image from "next/image";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import type { UeberMichQuery } from "../../../tina/__generated__/types";
import { splitParagraphs, type UeberMichContent } from "@/lib/content";
import type { TinaResult } from "@/lib/tina";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BookingLink from "@/components/ui/BookingLink";
import FinalCta from "@/components/sections/FinalCta";
import LegalNotice from "@/components/ui/LegalNotice";
import RichText from "@/components/ui/RichText";

/** Seite „Über mich“ – Inhalte aus Tina, im Editor live aktualisiert. */
export default function UeberMichView(props: TinaResult<UeberMichQuery>) {
  const { data } = useTina(props);
  const page = data.ueberMich as unknown as UeberMichContent;
  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: page.breadcrumb, href: "/ueber-mich" }]} />
      </div>

      <section className="py-12 md:py-20 bg-white" aria-labelledby="about-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Portrait */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-[4/5] max-w-sm shadow-card-hover">
                <Image
                  src={page.image}
                  alt={page.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 384px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
              </div>

              {/* Kontaktkarte */}
              <div className="mt-6 bg-surface border border-border rounded-card p-5">
                <p className="font-semibold text-navy mb-3">{page.contactTitle}</p>
                <div className="space-y-2 text-sm">
                  <a
                    href={`tel:+49${siteConfig.phone}`}
                    className="flex items-center gap-2 text-muted hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
                  >
                    <svg
                      className="w-4 h-4 text-primary flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                    {siteConfig.phoneFormatted}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 text-muted hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded break-all"
                  >
                    <svg
                      className="w-4 h-4 text-primary flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    {siteConfig.email}
                  </a>
                  <p className="flex items-start gap-2 text-muted">
                    <svg
                      className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    {siteConfig.address.full}
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={siteConfig.mlpProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary-hover underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
                  >
                    {page.mlpLinkText}
                    <span className="sr-only">(öffnet in neuem Tab)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                {page.eyebrow}
              </p>
              <h1
                id="about-heading"
                className="text-3xl md:text-4xl font-bold text-navy mb-6 text-balance"
              >
                {page.title}
              </h1>

              <div className="space-y-4 text-muted leading-relaxed mb-8">
                {splitParagraphs(page.text).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="bg-surface border border-border rounded-card p-5 mb-8">
                <p className="font-semibold text-navy mb-3">{page.specializationTitle}</p>
                <ul className="space-y-2">
                  {page.specializations.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted">
                      <svg
                        className="w-4 h-4 text-primary flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface border border-border rounded-card p-5 mb-8">
                <p className="font-semibold text-navy mb-2">{page.activityTitle}</p>
                <p className="text-sm text-muted">
                  <RichText text={page.activityText} />
                </p>
              </div>

              <BookingLink source="ueber-mich" size="lg">
                {page.button}
              </BookingLink>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen im Überblick */}
      <section className="py-12 gradient-section" aria-labelledby="about-services-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="about-services-heading" className="text-2xl font-bold text-navy mb-6">
            {page.topicsTitle}
          </h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={service.href}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover bg-white border border-border rounded-lg px-4 py-3 hover:border-primary transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Persönliches */}
      <section className="py-12 bg-white" aria-labelledby="about-personal-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card">
              <Image
                src={page.personal.image}
                alt={page.personal.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 id="about-personal-heading" className="text-2xl font-bold text-navy mb-4">
                {page.personal.title}
              </h2>
              {splitParagraphs(page.personal.text).map((paragraph, i, all) => (
                <p
                  key={paragraph}
                  className={`text-muted leading-relaxed${i < all.length - 1 ? " mb-4" : ""}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
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
