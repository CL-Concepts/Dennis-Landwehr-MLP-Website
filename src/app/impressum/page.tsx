import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { legalTexts } from "@/content/legal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Impressum",
  description: `Impressum der persönlichen Beraterwebsite von ${siteConfig.name}, ${siteConfig.professionalTitle}.`,
  canonical: "/impressum",
  noIndex: true,
});

export default function ImpressumPage() {
  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: "Impressum", href: "/impressum" }]} />
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-navy mb-8">Impressum</h1>

          {/* Platzhalter-Warnung */}
          <div
            className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-8"
            role="alert"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-amber-800 mb-1">⚠️ Platzhalter</p>
            <p className="text-sm text-amber-700">{legalTexts.imprintPlaceholder}</p>
          </div>

          <div className="space-y-6 text-sm text-muted leading-relaxed">
            <div>
              <h2 className="text-base font-bold text-navy mb-2">Angaben gemäß § 5 TMG</h2>
              <address className="not-italic">
                <strong className="text-foreground">{siteConfig.name}</strong>
                <br />
                {siteConfig.professionalTitle}
                <br />
                {siteConfig.address.street}
                <br />
                {siteConfig.address.zip} {siteConfig.address.city}
                <br />
                {siteConfig.address.country}
              </address>
            </div>

            <div>
              <h2 className="text-base font-bold text-navy mb-2">Kontakt</h2>
              <p>
                Telefon:{" "}
                <a href={`tel:+49${siteConfig.phone}`} className="text-primary hover:underline">
                  {siteConfig.phoneFormatted}
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                  {siteConfig.email}
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-navy mb-2">Berufsbezeichnung und -recht</h2>
              <p>
                Berufsbezeichnung: {siteConfig.professionalTitle}
                <br />
                [Zuständige Aufsichtsbehörde: Platzhalter – vor Veröffentlichung eintragen]
                <br />
                [Berufsrechtliche Regelungen: Platzhalter – vor Veröffentlichung eintragen]
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-navy mb-2">Hinweis</h2>
              <p>{legalTexts.personalSite}</p>
            </div>

            <div>
              <h2 className="text-base font-bold text-navy mb-2">MLP Finanzberatung SE</h2>
              <p>
                Dennis Landwehr ist als Finanzberater für die MLP Finanzberatung SE tätig. Weitere
                Informationen finden Sie auf dem{" "}
                <a
                  href={siteConfig.mlpProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  offiziellen MLP-Beraterprofil
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-navy mb-2">Haftungsausschluss</h2>
              <p>
                [Platzhalter: Haftungsausschluss für Inhalte, Links und Urheberrecht – vor
                Veröffentlichung juristisch prüfen lassen]
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
