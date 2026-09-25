import type { Metadata } from "next";
import { buildServiceMetadata } from "@/lib/metadata";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = buildServiceMetadata(
  "Liquiditätsmanagement für Arzt- und Zahnarztpraxen",
  "Liquiditätsmanagement für niedergelassene Ärztinnen und Ärzte sowie Zahnärzte: Private und betriebliche Zahlungsströme strukturieren, Rücklagen planen, Praxisliquidität sichern.",
  "liquiditaetsmanagement-mediziner"
);

const faqs = [
  {
    id: "lq-faq-notfallreserve",
    question: "Wie hoch sollte eine Notfallreserve sein?",
    answer:
      "Als grobe Orientierung gelten drei bis sechs Nettomonatsgehälter als privater Liquiditätspuffer. Für Praxisinhaber kommt ein zusätzlicher betrieblicher Puffer hinzu, der sich an den laufenden Betriebskosten orientiert. Die genaue Höhe hängt von deiner persönlichen Situation, dem Einkommensverlauf und den Fixkosten ab. Es gibt keine universelle Faustregel – das Ziel ist eine Situation, in der unerwartete Ausgaben nicht zu Engpässen führen.",
    category: "praxis" as const,
  },
  {
    id: "lq-faq-praxis",
    question: "Was ist bei der Liquiditätsplanung einer Praxis zu beachten?",
    answer:
      "Praxen haben besondere Zahlungsrhythmen: Abrechnungen laufen verzögert ein, Quartalszahlungen können schwanken, Gehälter und Mieten fallen dagegen regelmäßig an. Hinzu kommen Steuerzahlungen und Investitionsbedarfe. Eine strukturierte Liquiditätsplanung trennt laufende Betriebsausgaben, Rücklagen für Steuern und Investitionen sowie außerplanmäßige Ausgaben. Steuerliche Aspekte sollten dabei eng mit einem Steuerberater abgestimmt werden.",
    category: "praxis" as const,
  },
  {
    id: "lq-faq-privat-betrieblich",
    question: "Warum ist die Trennung von privat und betrieblich wichtig?",
    answer:
      "Ohne klare Trennung wird es schwer, den tatsächlichen wirtschaftlichen Stand der Praxis zu erkennen oder private Ziele gezielt zu verfolgen. Außerdem ist die Trennung aus steuerlichen und buchhalterischen Gründen notwendig. Eine saubere Struktur – separates Geschäftskonto, definierte Entnahmeregeln – schafft Übersicht und reduziert administrative Fehler.",
    category: "praxis" as const,
  },
];

export default function LiquiditaetsmanagementPage() {
  return (
    <ServicePageLayout
      breadcrumb="Liquiditätsmanagement"
      slug="liquiditaetsmanagement-mediziner"
      h1="Liquiditätsmanagement für Arzt- und Zahnarztpraxen"
      summary="Finanzielle Kontrolle beginnt mit einem klaren Überblick über Einnahmen, Ausgaben und Rücklagen – privat und betrieblich. Für niedergelassene Ärztinnen und Ärzte sowie Zahnärzte ist diese Struktur besonders wichtig, weil beide Bereiche eng miteinander verbunden sind."
      updatedAt="2025-06-01"
      atAGlance={[
        {
          label: "Für wen relevant",
          value: "Niedergelassene, Praxisinhaber, angestellte Ärzte mit variablem Einkommen",
        },
        { label: "Wann prüfen", value: "Vor Niederlassung, bei wachsender Praxis, jährlich" },
        {
          label: "Themen im Gespräch",
          value: "Notfallreserve, Betriebskosten, Steuerrücklagen, Trennung privat/betrieblich",
        },
        { label: "Nächster Schritt", value: "Persönliches Gespräch" },
      ]}
      faqs={faqs}
      relatedLinks={[
        { label: "Vermögensaufbau", href: "/leistungen/vermoegensaufbau-mediziner" },
        { label: "Berufshaftpflicht", href: "/leistungen/berufshaftpflicht-mediziner" },
        { label: "Krankenversicherung", href: "/leistungen/krankenversicherung-mediziner" },
      ]}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-navy mb-4">Private Liquidität strukturieren</h2>
          <p className="mb-4">
            Für alle – ob angestellt oder selbstständig – gilt: Wer seine Einnahmen und Ausgaben
            kennt, kann gezielt planen. Die Grundstruktur besteht aus vier Bereichen:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Laufende Ausgaben", desc: "Miete, Versicherungen, Lebenshaltung" },
              {
                title: "Notfallreserve",
                desc: "Kurzfristig verfügbar, 3–6 Monatsausgaben als Orientierung",
              },
              { title: "Mittelfristige Rücklagen", desc: "Geplante Ausgaben, Anschaffungen" },
              { title: "Langfristiger Aufbau", desc: "Altersvorsorge, Investitionen, Vermögen" },
            ].map((item) => (
              <div key={item.title} className="bg-surface border border-border rounded-lg p-4">
                <p className="font-semibold text-navy text-sm mb-1">{item.title}</p>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Variable Einkommen – etwa durch Bereitschaftsdienste oder Nebentätigkeiten – erschweren
            die Planung. Hier hilft ein Durchschnittswert als Planungsgrundlage.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-4">
            Betriebliche Liquidität in der Praxis
          </h2>
          <p className="mb-4">
            Praxen haben eigene Zahlungsrhythmen und Kostenstrukturen. Eine funktionierende
            betriebliche Liquiditätsplanung berücksichtigt:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Laufende Betriebskosten: Personal, Miete, Verbrauchsmaterial",
              "Steuerrücklagen: Einkommensteuer, Umsatzsteuer (falls relevant), Gewerbesteuer",
              "Investitionsrücklagen: Geräte, Software, Praxisausstattung",
              "Schwankende Abrechnungseingänge und Quartalszahlungen",
              "Außerplanmäßige Ausgaben: Reparaturen, Ausfälle, Vertretungskosten",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">–</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted bg-surface border border-border rounded-lg p-3">
            <strong className="text-navy">Hinweis:</strong> Steuerliche und buchhalterische Fragen
            zur Praxis sollten in enger Abstimmung mit einem Steuerberater geklärt werden. Die
            Finanzberatung kann die Gesamtstruktur unterstützen, ersetzt aber keine steuerliche
            Fachberatung.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Trennung von privat und betrieblich</h2>
          <p>
            Eine klare Trennung von privatem und betrieblichem Konto ist der erste Schritt zu
            finanzieller Übersicht. Regelmäßige, vorab festgelegte Privatentnahmen schaffen
            Planungssicherheit und erleichtern die Buchhaltung. Wer beides vermischt, verliert den
            Überblick über beide Bereiche. Gerade in wachsenden Praxen steigt dieser Aufwand
            deutlich.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">
            Liquiditätsplanung vor der Niederlassung
          </h2>
          <p>
            Die Niederlassung bringt einen erheblichen Liquiditätsbedarf mit sich –
            Praxisausstattung, Mietkaution, erste Gehaltsauszahlungen, bevor eigene Einnahmen
            fließen. Eine realistische Planung der Anlaufphase ist Teil jeder soliden
            Praxisgründung. Welche Mittel benötigt werden und wie diese strukturiert sein sollten,
            ist ein eigenständiges Beratungsthema.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  );
}
