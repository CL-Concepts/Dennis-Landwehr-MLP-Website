import type { ReactNode } from "react";
import Link from "next/link";
import BookingLink from "@/components/ui/BookingLink";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import LegalNotice from "@/components/ui/LegalNotice";
import FinalCta from "./FinalCta";
import FAQ from "./FAQ";
import type { FaqItem } from "@/content/faqs";

type AtAGlanceItem = {
  label: string;
  value: string;
};

type ServicePageLayoutProps = {
  breadcrumb: string;
  slug: string;
  h1: string;
  summary: string;
  children: ReactNode;
  atAGlance: AtAGlanceItem[];
  faqs?: FaqItem[];
  relatedLinks?: Array<{ label: string; href: string }>;
  updatedAt?: string;
  /** Optionale full-width Sektion (z. B. interaktiver Rechner) zwischen Inhalt und FAQ */
  interactiveSection?: ReactNode;
};

export default function ServicePageLayout({
  breadcrumb,
  slug,
  h1,
  summary,
  children,
  atAGlance,
  faqs,
  relatedLinks,
  updatedAt,
  interactiveSection,
}: ServicePageLayoutProps) {
  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { name: "Leistungen", href: "/leistungen" },
            { name: breadcrumb, href: `/leistungen/${slug}` },
          ]}
        />
      </div>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6 text-balance">{h1}</h1>

            {/* Summary Box */}
            <div className="bg-secondary border-l-4 border-primary rounded-r-lg p-5 mb-8">
              <p className="text-base text-foreground leading-relaxed">{summary}</p>
            </div>

            {/* Main Content */}
            <div className="prose-custom space-y-6 text-muted leading-relaxed">{children}</div>

            {/* Rechtlicher Hinweis */}
            <div className="mt-10">
              <LegalNotice />
            </div>

            {/* Autor + Datum */}
            <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-xs text-muted">
              <span>
                Autor: <strong className="text-foreground">Dennis Landwehr</strong>, Finanzberater
                bei MLP
              </span>
              {updatedAt && (
                <span>
                  Zuletzt aktualisiert:{" "}
                  <time dateTime={updatedAt}>
                    {new Date(updatedAt).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                    })}
                  </time>
                </span>
              )}
            </div>

            {/* Verwandte Seiten */}
            {relatedLinks && relatedLinks.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-navy mb-3">Verwandte Themen</p>
                <ul className="flex flex-wrap gap-2">
                  {relatedLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1 text-sm text-primary bg-secondary border border-primary/20 rounded-lg px-3 py-1.5 hover:bg-primary hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Auf einen Blick */}
            <div className="bg-surface border border-border rounded-card p-5 sticky top-24">
              <h2 className="text-base font-bold text-navy mb-4">Auf einen Blick</h2>
              <dl className="space-y-3">
                {atAGlance.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-muted">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 space-y-2">
                <BookingLink source="service-page" fullWidth>
                  Persönliche Situation besprechen
                </BookingLink>
                <Link
                  href="/kontakt"
                  className="flex items-center justify-center text-sm text-primary hover:text-primary-hover py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
                >
                  Oder schreib mir
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {interactiveSection}

      {/* FAQ */}
      {faqs && faqs.length > 0 && <FAQ faqs={faqs} title="Häufige Fragen" />}

      <FinalCta />
    </>
  );
}
