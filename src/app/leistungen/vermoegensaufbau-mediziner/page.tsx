import type { Metadata } from "next";
import { buildServiceMetadata } from "@/lib/metadata";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import FinanceCalculators from "@/components/sections/FinanceCalculators";

export const metadata: Metadata = buildServiceMetadata(
  "Vermögensaufbau für Ärzte und Zahnärzte",
  "Strukturierter Vermögensaufbau für Mediziner: Ziele, Rücklagen, Altersvorsorge und Versorgungswerk sinnvoll koordinieren – ohne Renditeversprechen, aber mit klarem Konzept.",
  "vermoegensaufbau-mediziner"
);

const faqs = [
  {
    id: "va-faq-start",
    question: "Wann sollte ich mit dem Vermögensaufbau beginnen?",
    answer:
      "Einen optimalen Zeitpunkt gibt es nicht – wichtiger ist, mit dem zu beginnen, was aktuell möglich ist. Vor dem langfristigen Aufbau sollte eine ausreichende Notfallreserve vorhanden sein. Wer zudem offene Versicherungsfragen gelöst hat, kann freie Mittel gezielter einsetzen. Der Einstieg muss nicht mit großen Beträgen beginnen – Kontinuität ist oft wichtiger als Startvolumen.",
    category: "aerzte" as const,
  },
  {
    id: "va-faq-versorgungswerk",
    question: "Reicht das Versorgungswerk für die Altersvorsorge aus?",
    answer:
      "Das Versorgungswerk der Ärzte- und Zahnärztekammern ist eine wichtige Grundlage für die Altersvorsorge. Ob es ausreicht, hängt davon ab, wie lange eingezahlt wurde, welche Leistungen zu erwarten sind und welchen Lebensstandard man im Ruhestand anstrebt. In vielen Fällen kann eine ergänzende private Vorsorge sinnvoll sein – das ist individuell zu bewerten.",
    category: "aerzte" as const,
  },
  {
    id: "va-faq-immobilien",
    question: "Sollten Ärzte in Immobilien investieren?",
    answer:
      "Immobilien können ein Baustein im Vermögenskonzept sein, sind aber kein Allheilmittel. Sie binden Kapital, erfordern Verwaltungsaufwand und bringen eigene Risiken mit sich. Ob eine Immobilie sinnvoll ist, hängt von der persönlichen Situation, vorhandener Liquidität und dem Gesamtvermögenskonzept ab. Keine Anlageform sollte isoliert betrachtet werden.",
    category: "aerzte" as const,
  },
];

export default function VermoegensaufbauPage() {
  return (
    <ServicePageLayout
      breadcrumb="Vermögensaufbau"
      slug="vermoegensaufbau-mediziner"
      h1="Vermögensaufbau für Ärzte und Zahnärzte"
      summary="Ein gutes Einkommen schafft Möglichkeiten – aber keine Strategie. Strukturierter Vermögensaufbau beginnt mit einer klaren Bestandsaufnahme und berücksichtigt kurz-, mittel- und langfristige Ziele gemeinsam."
      updatedAt="2025-06-01"
      atAGlance={[
        { label: "Für wen relevant", value: "Alle Karrierephasen ab Berufseinstieg" },
        {
          label: "Wann prüfen",
          value: "Bei erstem regelmäßigem Einkommen, nach Anstellungswechsel",
        },
        {
          label: "Themen im Gespräch",
          value: "Ziele, Rücklagen, Versorgungswerk, Risikoprofil",
        },
        { label: "Nächster Schritt", value: "Persönliches Gespräch" },
      ]}
      interactiveSection={
        <FinanceCalculators variant="vermoegen" headingId="vermoegen-rechner-heading" />
      }
      faqs={faqs}
      relatedLinks={[
        {
          label: "Liquiditätsmanagement",
          href: "/leistungen/liquiditaetsmanagement-mediziner",
        },
        { label: "Berufsunfähigkeit", href: "/leistungen/berufsunfaehigkeit-mediziner" },
        { label: "Krankenversicherung", href: "/leistungen/krankenversicherung-mediziner" },
      ]}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Grundlage: Bestandsaufnahme zuerst</h2>
          <p>
            Bevor über konkrete Anlageformen gesprochen wird, steht die Bestandsaufnahme: Welche
            Absicherungen bestehen? Welche laufenden Kosten fallen an? Wie hoch ist die
            Notfallreserve? Erst wenn diese Grundlagen klar sind, lässt sich sinnvoll über den
            Einsatz freier Mittel sprechen. Dieser Schritt wird oft übersprungen – und fehlt dann
            als Fundament.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Ziele und Zeithorizonte</h2>
          <p className="mb-3">
            Nicht alle finanziellen Ziele haben den gleichen Zeithorizont. Eine sinnvolle Struktur
            unterscheidet:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Kurzfristig: Notfallreserve, planbare Ausgaben, Liquiditätspuffer",
              "Mittelfristig: Anschaffungen, Weiterbildungen, mögliche Praxisgründung",
              "Langfristig: Altersvorsorge, Vermögensaufbau, Praxisübergabe",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">–</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Anlageformen und Beträge richten sich nach diesen Zeithorizonten und der persönlichen
            Risikobereitschaft – nicht umgekehrt.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">
            Versorgungswerk und ergänzende Vorsorge
          </h2>
          <p>
            Das Versorgungswerk der Ärzte- und Zahnärztekammern ist die berufsständische
            Pflichtvorsorge für approbierte Heilberufe. Die erwartbare Rentenleistung hängt von
            Einzahldauer und Beiträgen ab und variiert je nach Kammer. In manchen Fällen ist eine
            ergänzende Altersvorsorge sinnvoll – ob und in welchem Umfang, ergibt sich aus dem
            individuellen Versorgungsstand und den persönlichen Zielen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Risikoprofil und Risikotragfähigkeit</h2>
          <p>
            Zwei Fragen sind für den Vermögensaufbau zentral: Welches Risiko kann ich wirtschaftlich
            tragen? Und welches Risiko bin ich bereit, einzugehen? Beide Fragen haben oft
            unterschiedliche Antworten. Ein Konzept, das diese nicht berücksichtigt, passt auf dem
            Papier, aber nicht zur Lebenswirklichkeit.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Keine Renditeversprechen</h2>
          <p>
            Wertentwicklungen der Vergangenheit sind kein Indikator für künftige Ergebnisse. Seriöse
            Finanzberatung arbeitet mit Szenarien, nicht mit Garantien. Das Ziel ist ein Konzept,
            das zu deiner Situation passt – nicht eines, das auf optimistischen Hochrechnungen
            beruht.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  );
}
