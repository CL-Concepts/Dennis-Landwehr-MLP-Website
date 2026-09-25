import type { Metadata } from "next";
import { buildServiceMetadata } from "@/lib/metadata";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import FinanceCalculators from "@/components/sections/FinanceCalculators";

export const metadata: Metadata = buildServiceMetadata(
  "Berufsunfähigkeit für Ärzte und Zahnärzte",
  "Berufsunfähigkeitsversicherung für Humanmediziner und Zahnmediziner: Arbeitskraft absichern, Versorgungslücken kennen und frühzeitig die richtigen Weichen stellen.",
  "berufsunfaehigkeit-mediziner"
);

const faqs = [
  {
    id: "bu-faq-studium",
    question: "Lohnt sich eine BU-Versicherung schon im Studium?",
    answer:
      "Ja – aus zwei Gründen: Erstens sind die Beiträge im Studium in der Regel deutlich geringer, da jüngere Menschen statistisch seltener berufsunfähig werden. Zweitens ist der Gesundheitszustand häufig besser, was die Gesundheitsprüfung erleichtert. Eine im Studium abgeschlossene Versicherung kann zudem Nachversicherungsoptionen enthalten, die ein späteres Anheben der versicherten Rente ohne erneute Gesundheitsprüfung ermöglichen.",
    category: "studierende" as const,
  },
  {
    id: "bu-faq-versorgungswerk",
    question: "Deckt das Versorgungswerk eine Berufsunfähigkeit ausreichend ab?",
    answer:
      "Das Versorgungswerk bietet in vielen Fällen Leistungen bei Berufsunfähigkeit – allerdings variieren Bedingungen und Höhe erheblich je nach Kammer und individueller Einzahldauer. Häufig bestehen Wartezeiten und besondere Voraussetzungen. Ob die Leistungen im konkreten Fall ausreichen, ist individuell zu prüfen. Eine ergänzende private Absicherung kann sinnvoll sein, muss aber an die konkrete Situation angepasst werden.",
    category: "aerzte" as const,
  },
  {
    id: "bu-faq-zahnarzt",
    question: "Welche Besonderheiten gibt es für Zahnärztinnen und Zahnärzte?",
    answer:
      "Zahnärztinnen und Zahnärzte sind bei ihrer Arbeit körperlich stark beansprucht – durch Feinmotorik, stehende oder sitzende Arbeit in beengten Verhältnissen und hohe Konzentrationserfordernisse. Erkrankungen der Hände, der Wirbelsäule oder der Augen können die Berufsfähigkeit frühzeitig einschränken. Deshalb sollten BU-Verträge für Zahnärzte die konkrete Tätigkeit und ihre spezifischen Risiken berücksichtigen.",
    category: "aerzte" as const,
  },
];

export default function BerufsunfaehigkeitPage() {
  return (
    <ServicePageLayout
      breadcrumb="Berufsunfähigkeit"
      slug="berufsunfaehigkeit-mediziner"
      h1="Berufsunfähigkeit für Ärzte und Zahnärzte"
      summary="Die Arbeitskraft ist für Medizinerinnen und Mediziner die wichtigste wirtschaftliche Grundlage. Eine Absicherung, die zur tatsächlichen Tätigkeit passt, sollte früh aufgebaut und regelmäßig überprüft werden."
      updatedAt="2025-06-01"
      atAGlance={[
        { label: "Für wen relevant", value: "Studierende, Ärzte, Zahnärzte, Praxisinhaber" },
        { label: "Wann prüfen", value: "Möglichst früh im Studium, spätestens bei Berufseinstieg" },
        {
          label: "Themen im Gespräch",
          value: "Absicherungshöhe, Versorgungswerk, Nachversicherung, Tätigkeit",
        },
        { label: "Nächster Schritt", value: "Persönliches Gespräch" },
      ]}
      interactiveSection={<FinanceCalculators variant="bu" headingId="bu-rechner-heading" />}
      faqs={faqs}
      relatedLinks={[
        { label: "Krankenversicherung", href: "/leistungen/krankenversicherung-mediziner" },
        { label: "Berufshaftpflicht", href: "/leistungen/berufshaftpflicht-mediziner" },
        { label: "Vermögensaufbau", href: "/leistungen/vermoegensaufbau-mediziner" },
      ]}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-navy mb-3">
            Warum ist die Arbeitskraft so wichtig?
          </h2>
          <p>
            Für Ärztinnen, Ärzte, Zahnärztinnen und Zahnärzte ist das zukünftige Arbeitseinkommen
            das bedeutendste Vermögen – besonders in den ersten Berufsjahren, wenn noch kaum anderes
            Vermögen aufgebaut wurde. Wer nicht mehr in seinem Beruf arbeiten kann, verliert dieses
            Einkommen. Sozialstaatliche Absicherungen decken dies in der Regel nur sehr begrenzt.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Frühe Absicherung im Studium</h2>
          <p className="mb-3">
            Je früher eine Berufsunfähigkeitsversicherung abgeschlossen wird, desto günstiger sind
            in der Regel die Beiträge. Zudem ist die Gesundheitsprüfung im Studium meist einfacher,
            da kaum Vorerkrankungen vorliegen. Mögliche Vorteile einer frühen Absicherung:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Günstigere Beiträge durch junges Eintrittsalter",
              "Einfachere Gesundheitsprüfung bei guter Gesundheitslage",
              "Nachversicherungsoptionen ohne erneute Gesundheitsprüfung bei Gehaltssteigerungen",
              "Schutz auch bei psychischen Erkrankungen, die im Studium auftreten können",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Für angestellte Ärztinnen und Ärzte</h2>
          <p>
            Im Anstellungsverhältnis gilt: Das Versorgungswerk bietet zwar eine Grundabsicherung,
            aber ob und wie viel es im Falle einer Berufsunfähigkeit leistet, hängt von der
            Einzahldauer und den konkreten Bedingungen des jeweiligen Versorgungswerks ab.
            Ergänzende Absicherung schließt mögliche Versorgungslücken. Die Absicherungshöhe sollte
            dabei an das Einkommen und die laufenden Kosten angepasst sein.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">Besonderheiten in der Zahnmedizin</h2>
          <p>
            Zahnärztliche Tätigkeit ist körperlich anspruchsvoll: Feinmotorik, dauerhafte
            Anspannung, Ergonomie und der Umgang mit Substanzen und Materialien belasten den Körper
            langfristig. Erkrankungen der Hände, Handgelenke, Schultern oder der Wirbelsäule können
            zu einer frühzeitigen Einschränkung führen. Eine Berufsunfähigkeitsversicherung für
            Zahnärztinnen und Zahnärzte sollte die konkrete Tätigkeit als Maßstab für die
            Leistungsprüfung heranziehen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-navy mb-3">
            Absicherungshöhe individuell bestimmen
          </h2>
          <p>
            Wie hoch die monatliche Berufsunfähigkeitsrente sein sollte, ergibt sich aus den
            persönlichen Lebenshaltungskosten, bestehenden Absicherungen und dem angestrebten
            Versorgungsniveau. Faustregel kann es hier nicht geben. Relevant ist, welche Kosten im
            Versicherungsfall gedeckt sein müssen – und welche anderen Leistungen (z. B. aus dem
            Versorgungswerk) daneben bestehen.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  );
}
