import type { Metadata } from "next";
import { buildServiceMetadata } from "@/lib/metadata";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildServiceMetadata(
  `Krankenversicherung für Mediziner in ${siteConfig.city}`,
  "GKV oder PKV für Ärzte und Zahnärzte? Individuelle Beratung zur Krankenversicherungswahl, Krankentagegeld und langfristiger Versorgung – für Studierende bis Praxisinhaber.",
  "krankenversicherung-mediziner"
);

const faqs = [
  {
    id: "kv-faq-wahl",
    question: "Ab wann kann ich als Ärztin in die PKV wechseln?",
    answer:
      "Als angestellte Ärztin besteht grundsätzlich Versicherungspflicht in der GKV, sofern das Einkommen die gesetzliche Jahresarbeitsentgeltgrenze nicht überschreitet. Bei Überschreitung dieser Grenze besteht die Möglichkeit, sich von der Versicherungspflicht befreien zu lassen und in die PKV zu wechseln. Selbstständig tätige und niedergelassene Ärztinnen und Ärzte sind von der Versicherungspflicht ausgenommen und können frei wählen. Die aktuellen Grenzwerte ändern sich jährlich – bitte individuell prüfen.",
    category: "aerzte" as const,
  },
  {
    id: "kv-faq-studierende",
    question: "Welche Krankenversicherung gilt im Medizinstudium?",
    answer:
      "Studierende sind bis zum vollendeten 25. Lebensjahr in der Regel über die Eltern familienversichert, sofern kein eigenes Einkommen über einer bestimmten Grenze vorliegt. Danach oder bei eigenem Einkommen ist eine studentische Pflichtversicherung in der GKV möglich. Für bestimmte Gruppen gibt es auch die Option der privaten Krankenversicherung als Studierender, die bei einem späteren Wechsel jedoch langfristig betrachtet werden sollte.",
    category: "studierende" as const,
  },
  {
    id: "kv-faq-krankentagegeld",
    question: "Warum ist Krankentagegeld für Selbstständige wichtig?",
    answer:
      "Bei Angestellten übernimmt der Arbeitgeber in der Regel die Fortzahlung des Gehalts für eine bestimmte Zeit. Niedergelassene Ärztinnen und Ärzte sowie Zahnärztinnen und Zahnärzte erhalten hingegen kein Gehalt, wenn sie länger erkranken – laufende Praxiskosten fallen jedoch weiter an. Ein bedarfsgerecht bemessenes Krankentagegeld kann diese Lücke schließen.",
    category: "praxis" as const,
  },
];

export default function KrankenversicherungPage() {
  return (
    <ServicePageLayout
      breadcrumb="Krankenversicherung"
      slug="krankenversicherung-mediziner"
      h1="Krankenversicherung für Ärzte und Zahnärzte"
      summary="GKV oder PKV ist keine pauschale Entscheidung – sie hängt von Berufsstatus, Einkommen, Leistungserwartungen und Lebensplanung ab. Für Medizinerinnen und Mediziner kommen in jeder Karrierephase unterschiedliche Überlegungen hinzu."
      updatedAt="2025-06-01"
      atAGlance={[
        { label: "Für wen relevant", value: "Studierende, Angestellte, Niedergelassene" },
        { label: "Wann prüfen", value: "Studienende, Anstellungswechsel, Niederlassung" },
        {
          label: "Themen im Gespräch",
          value: "GKV/PKV, Leistungen, Familienplanung, Krankentagegeld",
        },
        { label: "Nächster Schritt", value: "Persönliches Gespräch" },
      ]}
      faqs={faqs}
      relatedLinks={[
        { label: "Berufsunfähigkeit", href: "/leistungen/berufsunfaehigkeit-mediziner" },
        { label: "Berufshaftpflicht", href: "/leistungen/berufshaftpflicht-mediziner" },
        { label: "Vermögensaufbau", href: "/leistungen/vermoegensaufbau-mediziner" },
      ]}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-navy mb-3">GKV und PKV – Grundlagen</h2>
          <p className="mb-3">
            In Deutschland besteht für die meisten Arbeitnehmer zunächst Pflicht zur gesetzlichen
            Krankenversicherung (GKV). Wer über der sogenannten Jahresarbeitsentgeltgrenze verdient,
            kann sich alternativ privat versichern (PKV). Selbstständige – darunter niedergelassene
            Ärztinnen und Ärzte – können von Anfang an frei wählen.
          </p>
          <p>
            Beide Systeme haben eigene Logiken, Stärken und Schwächen. Die Entscheidung sollte nicht
            allein am kurzfristigen Beitrag ausgerichtet sein, sondern auch die langfristige
            Beitragsentwicklung, Familienplanung und berufliche Perspektiven berücksichtigen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">
            Für Studierende der Medizin und Zahnmedizin
          </h2>
          <p className="mb-3">Für Studierende stellen sich typischerweise folgende Fragen:</p>
          <ul className="space-y-2 ml-4">
            {[
              "Bis wann greift die Familienversicherung über die Eltern?",
              "Was gilt bei eigenem Einkommen durch Nebenjobs oder Stipendien?",
              "Gibt es Optionstarife, die einen späteren Wechsel ermöglichen?",
              "Wie entwickeln sich die Beiträge nach dem Studium?",
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
            Für angestellte Ärztinnen und Zahnärzte
          </h2>
          <p className="mb-3">
            Mit dem Berufseinstieg entstehen neue Entscheidungspunkte. Relevant sind unter anderem:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Überschreiten der Jahresarbeitsentgeltgrenze und Optionen danach",
              "Leistungsunterschiede zwischen GKV und PKV (z. B. ambulante Versorgung, Wahlarzt)",
              "Krankentagegeld als Ergänzung – für Angestellte und erst recht für Selbstständige",
              "Familienplanung und Versicherung von Partnern und Kindern",
              "Langfristige Beitragsentwicklung im Alter",
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
          <p>
            Niedergelassene Ärztinnen, Ärzte, Zahnärztinnen und Zahnärzte sind nicht
            versicherungspflichtig und treffen die Wahl zwischen GKV und PKV in vollem Umfang
            eigenverantwortlich. Neben dem Leistungsumfang ist das Krankentagegeld ein besonders
            wichtiges Thema: Bei längerer Erkrankung laufen Praxiskosten weiter, während kein
            Einkommen fließt. Wie hoch das Krankentagegeld bemessen sein sollte, ergibt sich aus den
            individuellen Betriebskosten und dem Privatbedarf.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">
            Langfristige Perspektive statt kurzfristiger Vergleich
          </h2>
          <p>
            Die Krankenversicherungsentscheidung sollte nicht allein auf den aktuellen Monatsbeitrag
            reduziert werden. Wichtige Faktoren für eine fundierte Betrachtung sind die
            Beitragsentwicklung im Alter, die Familienplanung, mögliche Wechseloptionen und die
            persönliche Gesundheitssituation. Eine sachliche Einschätzung erfordert Zeit und
            individuelle Zahlen – das ist Gegenstand des persönlichen Beratungsgesprächs.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  );
}
