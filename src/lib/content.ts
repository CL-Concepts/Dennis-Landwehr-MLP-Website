/**
 * Inhalte aus dem CMS (TinaCMS) – Zugriff ohne Netzwerk.
 *
 * Alle Inhalte liegen als JSON-Dateien in /content und werden von Tina bearbeitet.
 * Jede Speicherung im Editor ist ein Git-Commit und löst einen neuen Build aus –
 * deshalb können Einstellungen, Leistungen und Rechner-Texte hier direkt beim
 * Build eingelesen werden (synchron, überall nutzbar, auch im Browser).
 *
 * Die Seiteninhalte selbst lädt src/lib/tina.ts über den Tina-Client, damit der
 * Editor eine Live-Vorschau anzeigen kann.
 */
import settingsJson from "../../content/einstellungen/allgemein.json";
import rechnerJson from "../../content/rechner/rechner.json";
import startseiteJson from "../../content/seiten/startseite.json";
import leistungenSeiteJson from "../../content/seiten/leistungen.json";
import studierendeJson from "../../content/seiten/studierende.json";
import ueberMichJson from "../../content/seiten/ueber-mich.json";
import kontaktJson from "../../content/seiten/kontakt.json";
import impressumJson from "../../content/rechtliches/impressum.json";
import bhJson from "../../content/leistungen/berufshaftpflicht-mediziner.json";
import kvJson from "../../content/leistungen/krankenversicherung-mediziner.json";
import buJson from "../../content/leistungen/berufsunfaehigkeit-mediziner.json";
import vaJson from "../../content/leistungen/vermoegensaufbau-mediziner.json";
import lqJson from "../../content/leistungen/liquiditaetsmanagement-mediziner.json";

/* ------------------------------------------------------------------ */
/* Typen (aus den JSON-Dateien abgeleitet)                             */
/* ------------------------------------------------------------------ */

export type Settings = typeof settingsJson;
export type RechnerTexte = typeof rechnerJson;
export type StartseiteContent = typeof startseiteJson;
export type LeistungenSeiteContent = typeof leistungenSeiteJson;
export type StudierendeContent = typeof studierendeJson;
export type UeberMichContent = typeof ueberMichJson;
export type KontaktContent = typeof kontaktJson;

export type Baustein = {
  _template?: string;
  __typename?: string;
  text?: string | null;
  punkte?: (string | null)[] | null;
  karten?: ({ titel?: string | null; text?: string | null } | null)[] | null;
  label?: string | null;
  lines?: (string | null)[] | null;
  boldFirstLine?: boolean | null;
};
export type Section = {
  heading?: string | null;
  style?: string | null;
  bausteine?: (Baustein | null)[] | null;
};
export type FaqEntry = {
  id?: string | null;
  question?: string | null;
  answer?: string | null;
  category?: string | null;
};

export type LeistungContent = Omit<typeof bhJson, "sections" | "faqs"> & {
  slug: string;
  sections: Section[];
  faqs: FaqEntry[];
};
export type RechtstextContent = Omit<typeof impressumJson, "sections"> & { sections: Section[] };

/* ------------------------------------------------------------------ */
/* Statische Inhalte                                                   */
/* ------------------------------------------------------------------ */

export const settings: Settings = settingsJson;
export const rechnerTexte: RechnerTexte = rechnerJson;

/** Alle fünf Leistungen in der Reihenfolge des Feldes „order“. */
export const leistungen: LeistungContent[] = (
  [
    ["berufshaftpflicht-mediziner", bhJson],
    ["krankenversicherung-mediziner", kvJson],
    ["berufsunfaehigkeit-mediziner", buJson],
    ["vermoegensaufbau-mediziner", vaJson],
    ["liquiditaetsmanagement-mediziner", lqJson],
  ] as const
)
  .map(([slug, doc]) => ({ ...(doc as unknown as Omit<LeistungContent, "slug">), slug }))
  .sort((a, b) => a.order - b.order);

/** Statische Fallback-Inhalte der Seiten (für Tests, Sitemap, strukturierte Daten). */
export const staticPages = {
  startseite: startseiteJson,
  leistungen: leistungenSeiteJson,
  studierende: studierendeJson,
  ueberMich: ueberMichJson,
  kontakt: kontaktJson,
};

/* ------------------------------------------------------------------ */
/* Platzhalter                                                         */
/* ------------------------------------------------------------------ */

/** Werte für {{platzhalter}} in Texten aus dem CMS. */
export function tokenValues(s: Settings = settings): Record<string, string> {
  return {
    name: s.name,
    berufsbezeichnung: s.professionalTitle,
    stadt: s.city,
    telefon: s.phoneFormatted,
    email: s.email,
    strasse: s.address.street,
    plz: s.address.zip,
    ort: s.address.city,
    land: s.address.country,
    "mlp-profil-url": s.mlpProfileUrl,
    "hinweis-allgemein": s.legal.disclaimer,
    "hinweis-beraterwebsite": s.legal.personalSite.replace(/\{\{name\}\}/g, s.name),
  };
}

/** Ersetzt {{platzhalter}} in einem Text. Unbekannte Platzhalter bleiben stehen. */
export function fill(
  text: string | null | undefined,
  extra: Record<string, string | number> = {}
): string {
  if (!text) return "";
  const values: Record<string, string> = {
    ...tokenValues(),
    ...Object.fromEntries(Object.entries(extra).map(([k, v]) => [k, String(v)])),
  };
  return text.replace(/\{\{([\w-]+)\}\}/g, (m, key: string) => (key in values ? values[key] : m));
}

/** Tina liefert Bausteine mit __typename („…BausteineAbsatz“), die JSON-Datei mit _template („absatz“). */
export function bausteinTyp(b: Baustein): string {
  if (b._template) return b._template;
  const name = (b.__typename || "").replace(/^.*Bausteine/, "");
  return name.charAt(0).toLowerCase() + name.slice(1);
}

/** „Absatz eins\n\nAbsatz zwei“ → ["Absatz eins", "Absatz zwei"] */
export function splitParagraphs(text: string | null | undefined): string[] {
  return (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
