import { Fragment, type ReactNode } from "react";
import { fill, settings } from "@/lib/content";

/**
 * Stellt Texte aus dem CMS mit einfachen Formatierungskürzeln dar:
 *   **fett**              → <strong>
 *   [Linktext](adresse)   → Link (externe Adressen öffnen in neuem Tab)
 *   {{email}}, {{telefon}} → klickbare E-Mail- bzw. Telefon-Links
 *   {{name}} usw.          → Werte aus den Einstellungen
 *   Zeilenumbruch          → <br>
 */
type RichTextProps = {
  text: string | null | undefined;
  /** Klasse für fettgedruckte Stellen */
  strongClassName?: string;
  /** Klasse für Links */
  linkClassName?: string;
};

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\{\{(?:email|telefon)\}\})/g;

export default function RichText({
  text,
  strongClassName = "text-foreground",
  linkClassName = "text-primary hover:underline",
}: RichTextProps) {
  if (!text) return null;
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {renderLine(line, strongClassName, linkClassName)}
        </Fragment>
      ))}
    </>
  );
}

function renderLine(line: string, strongClassName: string, linkClassName: string): ReactNode[] {
  return line
    .split(TOKEN)
    .filter((part) => part !== "")
    .map((part, i) => {
      if (part === "{{email}}") {
        return (
          <a key={i} href={`mailto:${settings.email}`} className={linkClassName}>
            {settings.email}
          </a>
        );
      }
      if (part === "{{telefon}}") {
        return (
          <a key={i} href={`tel:+49${settings.phone}`} className={linkClassName}>
            {settings.phoneFormatted}
          </a>
        );
      }
      const bold = part.match(/^\*\*([^*]+)\*\*$/);
      if (bold) {
        return (
          <strong key={i} className={strongClassName}>
            {fill(bold[1])}
          </strong>
        );
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const href = fill(link[2]);
        const external = /^https?:\/\//.test(href);
        return (
          <a
            key={i}
            href={href}
            className={linkClassName}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {fill(link[1])}
            {external && <span className="sr-only">(öffnet in neuem Tab)</span>}
          </a>
        );
      }
      return <Fragment key={i}>{fill(part)}</Fragment>;
    });
}
