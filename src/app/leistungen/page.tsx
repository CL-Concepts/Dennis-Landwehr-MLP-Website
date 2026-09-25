import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { services } from "@/config/services";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/sections/ServiceCard";
import FinalCta from "@/components/sections/FinalCta";
import LegalNotice from "@/components/ui/LegalNotice";

export const metadata: Metadata = buildMetadata({
  title: "Leistungen – Finanzberatung für Ärzte und Zahnärzte",
  description:
    "Berufshaftpflicht, Krankenversicherung, Berufsunfähigkeit, Vermögensaufbau und Liquiditätsmanagement für Human- und Zahnmediziner – Überblick aller Leistungen.",
  canonical: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: "Leistungen", href: "/leistungen" }]} />
      </div>

      <section className="py-12 md:py-20 bg-white" aria-labelledby="leistungen-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            id="leistungen-heading"
            title="Finanzberatung für Mediziner – alle Leistungen"
            subtitle="Finanzielle Themen im medizinischen Berufsleben greifen ineinander. Hier finden Sie einen Überblick über die Bereiche, die für Human- und Zahnmediziner besonders relevant sind."
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
            Beratung für alle Karrierephasen
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted leading-relaxed">
            <div>
              <h3 className="font-semibold text-navy mb-2">Human- und Zahnmedizin im Studium</h3>
              <p>
                Erste Absicherungsthemen, Krankenversicherung, Berufsunfähigkeit im Studium –
                frühzeitig die richtigen Grundlagen legen.{" "}
                <Link href="/studierende" className="text-primary hover:underline">
                  Mehr für Studierende
                </Link>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-navy mb-2">
                Ärztinnen und Ärzte im Berufseinstieg
              </h3>
              <p>
                PKV vs. GKV, Berufsunfähigkeit, erste Rücklagen – der Berufseinstieg bringt viele
                neue Finanzfragen mit sich.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-navy mb-2">Fachärztliche Laufbahn</h3>
              <p>
                Steigendes Einkommen, Versorgungswerk, Vermögensaufbau – strukturierte Planung für
                die mittlere Karrierephase.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-navy mb-2">Niederlassung und Praxisführung</h3>
              <p>
                Praxisabsicherung, Liquiditätsplanung, betriebliche und private Finanzen gemeinsam
                betrachten.
              </p>
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
