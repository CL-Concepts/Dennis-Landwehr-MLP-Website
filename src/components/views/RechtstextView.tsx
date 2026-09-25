"use client";

import { Fragment } from "react";
import { useTina } from "tinacms/dist/react";
import type { RechtstextQuery } from "../../../tina/__generated__/types";
import {
  bausteinTyp,
  fill,
  type Baustein,
  type RechtstextContent,
  type Section,
} from "@/lib/content";
import type { TinaResult } from "@/lib/tina";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RichText from "@/components/ui/RichText";

/** Impressum, Datenschutz, Rechtliche Hinweise – Inhalte aus Tina, im Editor live aktualisiert. */
export default function RechtstextView({
  slug,
  ...props
}: TinaResult<RechtstextQuery> & { slug: string }) {
  const { data } = useTina(props);
  const page = data.rechtstext as unknown as RechtstextContent;
  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: page.breadcrumb, href: `/${slug}` }]} />
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-navy mb-8">{page.title}</h1>

          {page.warningText && (
            <div
              className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-8"
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm font-semibold text-amber-800 mb-1">{page.warningTitle}</p>
              <p className="text-sm text-amber-700">{page.warningText}</p>
            </div>
          )}

          <div className="space-y-6 text-sm text-muted leading-relaxed">
            {(page.sections || []).filter(Boolean).map((section, i) => (
              <LegalSection key={`${section.heading}-${i}`} section={section} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function LegalSection({ section }: { section: Section }) {
  const bausteine = (section.bausteine || []).filter((b): b is Baustein => Boolean(b));
  if (section.style === "fussnote") {
    return (
      <div className="border-t border-border pt-4">
        {bausteine.map((b, i) => (
          <p key={i} className="text-xs text-muted/70">
            <RichText text={b.text} />
          </p>
        ))}
      </div>
    );
  }
  return (
    <div>
      {section.heading && <h2 className="text-base font-bold text-navy mb-2">{section.heading}</h2>}
      {bausteine.map((b, i) =>
        bausteinTyp(b) === "anschrift" ? (
          <address key={i} className="not-italic">
            {(b.lines || []).map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {j === 0 && b.boldFirstLine ? (
                  <strong className="text-foreground">{fill(line)}</strong>
                ) : (
                  <RichText text={line} />
                )}
              </Fragment>
            ))}
          </address>
        ) : (
          <p key={i}>
            <RichText text={b.text} />
          </p>
        )
      )}
    </div>
  );
}
