import type { TinaField, Template } from "tinacms";

/**
 * Bausteine für das Tina-Schema der Dennis-Landwehr-Website.
 *
 * Grundsatz: Dennis kann jeden sichtbaren Text und jedes Bild ändern, aber nicht
 * den Aufbau der Seiten. Technische Werte (Links auf andere Seiten, IDs,
 * Reihenfolge) sind im Editor ausgeblendet.
 */

const PLATZHALTER_HILFE =
  "Platzhalter werden automatisch ersetzt: {{name}}, {{berufsbezeichnung}}, {{stadt}}, {{telefon}}, {{email}}.";

const FORMAT_HILFE =
  "Formatierung: **fett**, [Linktext](https://adresse.de). Neue Zeile = Zeilenumbruch. " +
  PLATZHALTER_HILFE;

export const text = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
});

export const textarea = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
  ui: { component: "textarea" },
});

/** Mehrzeiliger Text mit Formatierungskürzeln (**fett**, [Link](url), Platzhalter). */
export const formatText = (name: string, label: string): TinaField => ({
  type: "string",
  name,
  label,
  description: FORMAT_HILFE,
  ui: { component: "textarea" },
});

/** Mehrere Absätze in einem Feld – getrennt durch eine Leerzeile. */
export const paragraphs = (name: string, label = "Text"): TinaField => ({
  type: "string",
  name,
  label,
  description: "Absätze durch eine Leerzeile trennen.",
  ui: { component: "textarea" },
});

/** Einfache Liste von Texten (z. B. Stichpunkte). */
export const textList = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
  list: true,
});

export const image = (name: string, label: string): TinaField => ({
  type: "image",
  name,
  label,
});

/** Für den Editor ausgeblendetes technisches Feld (Link, ID, Reihenfolge). */
export const hidden = (name: string, type: "string" | "number" = "string"): TinaField =>
  ({ type, name, label: name, ui: { component: "hidden" } }) as TinaField;

export const seoFields = (description = PLATZHALTER_HILFE): TinaField[] => [
  text("seoTitle", "Seitentitel (Browser-Tab / Google)", description),
  textarea("seoDescription", "Beschreibung für Google (Meta-Beschreibung)", description),
];

export const faqList = (name = "items", label = "Fragen und Antworten"): TinaField => ({
  type: "object",
  name,
  label,
  list: true,
  ui: { itemProps: (item) => ({ label: item?.question || "Frage" }) },
  fields: [
    text("question", "Frage"),
    textarea("answer", "Antwort"),
    hidden("id"),
    hidden("category"),
  ],
});

/* ------------------------------------------------------------------ */
/* Bausteine für Fließtext-Abschnitte (Leistungsseiten, Rechtstexte)   */
/* ------------------------------------------------------------------ */

const absatz: Template = {
  name: "absatz",
  label: "Absatz",
  ui: { itemProps: (item) => ({ label: `Absatz: ${(item?.text || "").slice(0, 40)}…` }) },
  fields: [formatText("text", "Text")],
};

const liste: Template = {
  name: "liste",
  label: "Aufzählung",
  fields: [textList("punkte", "Punkte")],
};

const karten: Template = {
  name: "karten",
  label: "Kacheln (2 Spalten)",
  fields: [
    {
      type: "object",
      name: "karten",
      label: "Kacheln",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.titel || "Kachel" }) },
      fields: [text("titel", "Titel"), text("text", "Text")],
    },
  ],
};

const notiz: Template = {
  name: "notiz",
  label: "Randnotiz (klein, grau)",
  fields: [formatText("text", "Text")],
};

const hinweis: Template = {
  name: "hinweis",
  label: "Hinweis-Kasten",
  fields: [
    text("label", "Fettgedrucktes Stichwort", "z. B. „Hinweis:“"),
    formatText("text", "Text"),
  ],
};

const anschrift: Template = {
  name: "anschrift",
  label: "Anschrift",
  fields: [
    textList(
      "lines",
      "Zeilen",
      PLATZHALTER_HILFE + " Weitere: {{strasse}}, {{plz}}, {{ort}}, {{land}}."
    ),
    { type: "boolean", name: "boldFirstLine", label: "Erste Zeile fett" },
  ],
};

export const serviceSections: TinaField = {
  type: "object",
  name: "sections",
  label: "Inhalt (Abschnitte)",
  list: true,
  ui: { itemProps: (item) => ({ label: item?.heading || "Abschnitt" }) },
  fields: [
    text("heading", "Zwischenüberschrift"),
    {
      type: "object",
      name: "bausteine",
      label: "Bausteine",
      list: true,
      templates: [absatz, liste, karten, notiz, hinweis],
    },
  ],
};

export const legalSections: TinaField = {
  type: "object",
  name: "sections",
  label: "Abschnitte",
  list: true,
  ui: { itemProps: (item) => ({ label: item?.heading || "Fußnote" }) },
  fields: [
    text("heading", "Überschrift", "Leer lassen bei einer Fußnote."),
    {
      type: "string",
      name: "style",
      label: "Darstellung",
      options: [
        { label: "Normaler Abschnitt", value: "normal" },
        { label: "Fußnote (klein, mit Trennlinie)", value: "fussnote" },
      ],
    },
    {
      type: "object",
      name: "bausteine",
      label: "Bausteine",
      list: true,
      templates: [absatz, anschrift],
    },
  ],
};
