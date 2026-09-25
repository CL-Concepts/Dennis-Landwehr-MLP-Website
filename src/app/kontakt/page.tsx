import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BookingLink from "@/components/ui/BookingLink";
import LegalNotice from "@/components/ui/LegalNotice";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt und Terminbuchung",
  description: `Kontakt zu Dennis Landwehr, Finanzberater bei MLP in ${siteConfig.city}. Termin vereinbaren für Finanzberatung für Ärzte und Zahnärzte.`,
  canonical: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: "Kontakt", href: "/kontakt" }]} />
      </div>

      <section className="py-12 md:py-20 bg-white" aria-labelledby="kontakt-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 id="kontakt-heading" className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Kontakt aufnehmen
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-10">
              Der einfachste Weg ist die direkte Terminbuchung über den folgenden Link. Alternativ
              kannst du mich telefonisch oder per E-Mail erreichen.
            </p>

            <div className="space-y-6">
              {/* Terminbuchung */}
              <div className="bg-secondary border border-primary/20 rounded-card p-6">
                <h2 className="text-lg font-bold text-navy mb-2">Termin online buchen</h2>
                <p className="text-sm text-muted mb-4">
                  Direkte Terminbuchung über das MLP-Beratungssystem – digital oder persönlich in{" "}
                  {siteConfig.city}.
                </p>
                <BookingLink source="hero">Jetzt Termin vereinbaren</BookingLink>
              </div>

              {/* Telefon */}
              <div className="bg-surface border border-border rounded-card p-6">
                <h2 className="text-lg font-bold text-navy mb-2">Telefon</h2>
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
                <h2 className="text-lg font-bold text-navy mb-2">E-Mail</h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary font-semibold hover:text-primary-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded break-all"
                >
                  {siteConfig.email}
                </a>
                <p className="text-xs text-muted mt-2">
                  Bitte übermitteln Sie keine sensiblen Gesundheitsdaten per E-Mail.
                </p>
              </div>

              {/* Adresse */}
              <div className="bg-surface border border-border rounded-card p-6">
                <h2 className="text-lg font-bold text-navy mb-2">Büro</h2>
                <address className="not-italic text-sm text-muted leading-relaxed">
                  <strong className="text-foreground">{siteConfig.name}</strong>
                  <br />
                  {siteConfig.professionalTitle}
                  <br />
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.zip} {siteConfig.address.city}
                </address>
                <p className="text-xs text-muted mt-3">
                  Beratung ist auch digital per Videokonferenz möglich.
                </p>
              </div>

              {/* MLP Profil */}
              <div className="bg-surface border border-border rounded-card p-6">
                <h2 className="text-lg font-bold text-navy mb-2">MLP-Beraterprofil</h2>
                <a
                  href={siteConfig.mlpProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:text-primary-hover transition-colors underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded text-sm"
                >
                  Beraterprofil auf mlp-financify.de aufrufen
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
