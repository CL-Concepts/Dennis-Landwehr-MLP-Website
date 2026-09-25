import type { Metadata } from "next";
import { buildServiceMetadata } from "@/lib/metadata";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = buildServiceMetadata(
  "Berufshaftpflicht für Ärzte und Zahnärzte",
  "Berufshaftpflicht für Humanmediziner und Zahnmediziner: Was in Studium, Anstellung und eigener Praxis zu berücksichtigen ist – sachliche Informationen und individuelle Beratung.",
  "berufshaftpflicht-mediziner"
);

const faqs = [
  {
    id: "bh-faq-studium",
    question: "Bin ich im Studium automatisch berufshaftpflichtversichert?",
    answer:
      "Während regulärer Pflichtveranstaltungen und Pflichtfamulaturen sind Studierende in der Regel über die Universität oder das Lehrkrankenhaus versichert. Für freiwillige Famulaturen, Auslandsaufenthalte oder eigenständige Tätigkeiten außerhalb dieser Rahmenbedingungen kann die Absicherung unzureichend sein. Es empfiehlt sich, die konkrete Situation im Vorfeld zu prüfen.",
    category: "studierende" as const,
  },
  {
    id: "bh-faq-angestellt",
    question: "Brauche ich als angestellte Ärztin eine eigene Berufshaftpflicht?",
    answer:
      "In einer Anstellung sind Ärztinnen und Ärzte in der Regel über die Haftpflichtversicherung des Arbeitgebers abgedeckt. Aber: Nebentätigkeiten, Vertretungen in anderen Einrichtungen oder Bereitschaftsdienste außerhalb des Hauptarbeitsverhältnisses können eine eigene Absicherung erfordern. Es lohnt sich, den genauen Umfang der arbeitgeberseitigen Versicherung zu kennen.",
    category: "aerzte" as const,
  },
  {
    id: "bh-faq-praxis",
    question: "Was ist bei der eigenen Praxis zu beachten?",
    answer:
      "Praxisinhaber tragen berufliche Risiken sowohl für die eigene Tätigkeit als auch für die ihrer angestellten Mitarbeitenden. Die benötigte Deckung hängt von Fachrichtung, Praxisform, Mitarbeitendenanzahl und spezifischen Tätigkeiten ab. Private und betriebliche Haftung sind dabei sauber voneinander zu trennen.",
    category: "praxis" as const,
  },
];

export default function BerufshaftpflichtPage() {
  return (
    <ServicePageLayout
      breadcrumb="Berufshaftpflicht"
      slug="berufshaftpflicht-mediziner"
      h1="Berufshaftpflicht für Ärzte und Zahnärzte"
      summary="Die Berufshaftpflicht schützt vor finanziellen Folgen bei Behandlungsfehlern und beruflichen Versäumnissen. Ob und welcher Schutz notwendig ist, hängt von der konkreten Tätigkeit ab – im Studium, in der Anstellung oder in der eigenen Praxis."
      updatedAt="2025-06-01"
      atAGlance={[
        { label: "Für wen relevant", value: "Studierende, Angestellte, Praxisinhaber" },
        { label: "Wann prüfen", value: "Vor Famulatur, PJ, Anstellung und Praxisgründung" },
        {
          label: "Themen im Gespräch",
          value: "Tätigkeit, Umfang, Nebentätigkeiten, Mitarbeitende",
        },
        { label: "Nächster Schritt", value: "Persönliches Gespräch" },
      ]}
      faqs={faqs}
      relatedLinks={[
        { label: "Krankenversicherung", href: "/leistungen/krankenversicherung-mediziner" },
        { label: "Berufsunfähigkeit", href: "/leistungen/berufsunfaehigkeit-mediziner" },
        { label: "Für Studierende", href: "/studierende" },
      ]}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Was ist Berufshaftpflicht?</h2>
          <p>
            Die Berufshaftpflichtversicherung sichert Ärztinnen und Ärzte sowie Zahnärztinnen und
            Zahnärzte gegen Schadensersatzansprüche ab, die aus ihrer beruflichen Tätigkeit
            entstehen. Dazu gehören etwa Behandlungsfehler, Fehler bei der Aufklärung oder
            fehlerhafte Dokumentation. Ohne ausreichende Absicherung können Forderungen
            existenzbedrohend sein.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Für Studierende: Famulatur und PJ</h2>
          <p className="mb-3">
            Im Pflichtrahmen des Studiums – bei Pflichtfamulaturen und im Praktischen Jahr an
            anerkannten Lehrkrankenhäusern – besteht in der Regel ein institutioneller
            Versicherungsschutz. Dieser Schutz gilt jedoch nicht automatisch für alle Situationen:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Freiwillige Famulaturen außerhalb der Pflichtblöcke",
              "Auslandsaufenthalte und internationale Rotationen",
              "Praktika in Einrichtungen ohne eigene Absicherung",
              "Tätigkeiten außerhalb des offiziellen Rahmens",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">–</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Vor einem Auslandsaufenthalt oder einer freiwilligen Famulatur empfiehlt es sich, den
            bestehenden Schutz zu prüfen und bei Bedarf zu ergänzen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Für angestellte Ärztinnen und Ärzte</h2>
          <p className="mb-3">
            In einer festen Anstellung – etwa in einer Klinik oder einem medizinischen
            Versorgungszentrum – übernimmt der Arbeitgeber die Berufshaftpflicht für dienstlich
            angeordnete Tätigkeiten. Zu klären ist jedoch:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Umfang und Deckungshöhe der arbeitgeberseitigen Versicherung",
              "Absicherung bei Nebentätigkeiten und Honorartätigkeiten",
              "Schutz bei Vertretungen in anderen Einrichtungen",
              "Bereitschaftsdienste außerhalb des Hauptarbeitsverhältnisses",
              "Eigene Haftung im Verhältnis zu Patientinnen und Patienten",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">
            Für Praxisinhaber und Niedergelassene
          </h2>
          <p className="mb-3">
            In der eigenen Praxis trägst du nicht nur Verantwortung für deine eigene Tätigkeit,
            sondern auch für die deiner angestellten Mitarbeitenden. Relevante Punkte im Gespräch
            sind:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Fachrichtung und spezifische Tätigkeiten (z. B. operative Eingriffe)",
              "Anzahl und Qualifikation der Mitarbeitenden",
              "Betriebsstätten und Außeneinsätze",
              "Trennung von privater und betrieblicher Haftung",
              "Praxisgemeinschaften und Berufsausübungsgemeinschaften",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Human- und Zahnmedizin im Vergleich</h2>
          <p>
            Human- und Zahnmedizin unterscheiden sich in Tätigkeitsprofil und Risikobild. Für
            Zahnärztinnen und Zahnärzte sind unter anderem prothesenprothetische, chirurgische und
            implantologische Eingriffe relevant. Für Humanmediziner variieren die Anforderungen
            stark nach Fachrichtung. Die konkret benötigte Absicherung ergibt sich aus der
            tatsächlichen Tätigkeit – pauschale Aussagen sind hier nicht sinnvoll.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  );
}
