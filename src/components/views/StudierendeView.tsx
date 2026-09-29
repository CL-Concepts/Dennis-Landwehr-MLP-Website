"use client";

import Link from "next/link";
import Image from "next/image";
import { useTina } from "tinacms/dist/react";
import type { StudierendeQuery } from "../../../tina/__generated__/types";
import type { StudierendeContent } from "@/lib/content";
import type { TinaResult } from "@/lib/tina";
import { toFaqs } from "@/lib/faq";
import { siteConfig } from "@/config/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BookingLink from "@/components/ui/BookingLink";
import FAQ from "@/components/sections/FAQ";
import FinalCta from "@/components/sections/FinalCta";
import LegalNotice from "@/components/ui/LegalNotice";
import SectionHeading from "@/components/ui/SectionHeading";

/** Seite „Für Studierende“ – Inhalte aus Tina, im Editor live aktualisiert. */
export default function StudierendeView(props: TinaResult<StudierendeQuery>) {
  const { data } = useTina(props);
  const page = data.studierende as unknown as StudierendeContent;
  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: page.breadcrumb, href: "/studierende" }]} />
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 gradient-hero" aria-labelledby="studierende-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
                {page.hero.eyebrow}
              </p>
              <h1
                id="studierende-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 text-balance"
              >
                {page.hero.title}
              </h1>
              <p className="text-muted leading-relaxed mb-8 text-lg">{page.hero.text}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <BookingLink source="studierende">{page.hero.primaryButton}</BookingLink>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary bg-white border border-primary rounded-lg hover:bg-secondary transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus min-h-[44px]"
                >
                  {page.hero.secondaryButton}
                </a>
              </div>
            </div>
            {/* Foto: Medizinstudierende */}
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover aspect-[4/3]">
              <Image
                src={page.hero.image}
                alt={page.hero.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wichtige Botschaft */}
      <section className="py-10 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary border-l-4 border-primary rounded-r-lg p-5 max-w-3xl">
            <p className="text-base text-foreground leading-relaxed">
              <strong className="text-navy">{page.notice.label}</strong> {page.notice.text}
            </p>
          </div>
        </div>
      </section>

      {/* Themenübersicht */}
      <section className="py-12 md:py-20 gradient-section" aria-labelledby="topics-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="topics-heading"
            as="h2"
            title={page.topics.title}
            subtitle={page.topics.subtitle}
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.topics.items.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group bg-white border border-border rounded-card p-5 hover:border-primary hover:shadow-card-hover transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus flex flex-col"
              >
                <h3 className="text-base font-bold text-navy mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed flex-1 mb-3">
                  {topic.description}
                </p>
                <span className="text-xs font-semibold text-primary flex items-center gap-1">
                  {page.topics.linkText}
                  <svg
                    className="w-3 h-3 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Studierendenförderprogramm */}
      <section className="py-12 md:py-20 gradient-warm" aria-labelledby="foerder-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-12 h-12 bg-warm rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>
            <div>
              <h2 id="foerder-heading" className="text-2xl md:text-3xl font-bold text-navy mb-2">
                {page.program.title}
              </h2>
              <p className="text-muted leading-relaxed max-w-2xl">{page.program.text}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.program.items.map((item) => (
              <div
                key={item.title}
                className={`rounded-card p-5 border flex flex-col ${
                  item.highlight ? "bg-warm/10 border-warm-border" : "bg-white border-border"
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                    item.highlight ? "text-warm-dark" : "text-primary"
                  }`}
                >
                  {item.tag}
                </span>
                <h3 className="text-base font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-white border border-warm-border rounded-card">
            <p className="text-sm text-muted">
              <strong className="text-navy">{page.program.accessLabel}</strong>{" "}
              {page.program.accessText}
            </p>
          </div>
        </div>
      </section>

      {/* Pflicht- und Zusatzbereiche */}
      <section className="py-12 bg-white" aria-labelledby="bereiche-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="bereiche-heading" className="text-2xl font-bold text-navy mb-2">
            {page.areas.title}
          </h2>
          <p className="text-muted mb-8 max-w-2xl">{page.areas.text}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                {page.areas.requiredTitle}
              </h3>
              <ul className="space-y-3">
                {page.areas.required.map((item) => (
                  <li key={item.label} className="flex gap-3 text-sm">
                    <span className="font-semibold text-navy w-36 flex-shrink-0">{item.label}</span>
                    <span className="text-muted">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-warm rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
                {page.areas.optionalTitle}
              </h3>
              <ul className="space-y-3">
                {page.areas.optional.map((item) => (
                  <li key={item.label} className="flex gap-3 text-sm">
                    <span className="font-semibold text-navy w-36 flex-shrink-0">{item.label}</span>
                    <span className="text-muted">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-12 bg-white" aria-labelledby="process-stud-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 id="process-stud-heading" className="text-2xl font-bold text-navy mb-6">
            {page.process.title}
          </h2>
          <ol className="space-y-5">
            {page.process.steps.map((item) => (
              <li key={item.step} className="flex gap-4">
                <div className="w-10 h-10 bg-secondary border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">{item.title}</p>
                  <p className="text-sm text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQ faqs={toFaqs(page.faq.items, "faq-stud")} title={page.faq.title} />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LegalNotice />
      </div>

      <FinalCta />
    </>
  );
}
