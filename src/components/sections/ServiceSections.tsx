import RichText from "@/components/ui/RichText";
import { bausteinTyp, type Baustein, type Section } from "@/lib/content";

/**
 * Fließtext der Leistungsseiten – Abschnitte aus dem CMS.
 * Die Abstände ergeben sich aus der Reihenfolge der Bausteine, damit Dennis
 * nichts an der Gestaltung einstellen muss:
 *  - Ein Absatz, dem noch etwas folgt, bekommt Abstand nach unten.
 *  - Ein Absatz direkt nach einer Aufzählung bekommt Abstand nach oben.
 *  - Abschnitte mit Kacheln oder Hinweis-Kasten sind etwas luftiger.
 */
export default function ServiceSections({ sections }: { sections: (Section | null)[] }) {
  return (
    <div className="space-y-8">
      {sections.filter(Boolean).map((section, i) => (
        <ServiceSection key={`${section!.heading}-${i}`} section={section!} />
      ))}
    </div>
  );
}

function ServiceSection({ section }: { section: Section }) {
  const bausteine = (section.bausteine || []).filter((b): b is Baustein => Boolean(b));
  const types = bausteine.map(bausteinTyp);
  const wide = types.some((t) => t === "karten" || t === "hinweis" || t === "notiz");
  return (
    <div>
      <h2 className={`text-xl font-bold text-navy ${wide ? "mb-4" : "mb-3"}`}>{section.heading}</h2>
      {bausteine.map((b, i) => {
        const type = types[i];
        const key = `${type}-${i}`;
        if (type === "absatz") {
          const classes = [
            i < bausteine.length - 1 ? (wide ? "mb-4" : "mb-3") : "",
            types[i - 1] === "liste" ? "mt-3" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <p key={key} className={classes || undefined}>
              <RichText text={b.text} strongClassName="text-navy" />
            </p>
          );
        }
        if (type === "liste") {
          return (
            <ul key={key} className="space-y-2 ml-4">
              {(b.punkte || []).filter(Boolean).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">–</span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (type === "karten") {
          return (
            <div key={key} className="grid sm:grid-cols-2 gap-3">
              {(b.karten || []).filter(Boolean).map((card) => (
                <div key={card!.titel} className="bg-surface border border-border rounded-lg p-4">
                  <p className="font-semibold text-navy text-sm mb-1">{card!.titel}</p>
                  <p className="text-xs text-muted">{card!.text}</p>
                </div>
              ))}
            </div>
          );
        }
        if (type === "notiz") {
          return (
            <p key={key} className="mt-4 text-sm text-muted">
              <RichText text={b.text} strongClassName="text-navy" />
            </p>
          );
        }
        if (type === "hinweis") {
          return (
            <p
              key={key}
              className="mt-4 text-sm text-muted bg-surface border border-border rounded-lg p-3"
            >
              <strong className="text-navy">{b.label}</strong>{" "}
              <RichText text={b.text} strongClassName="text-navy" />
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}
