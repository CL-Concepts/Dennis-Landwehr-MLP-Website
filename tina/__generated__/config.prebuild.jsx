// tina/config.ts
import { defineConfig } from "tinacms";

// tina/fields.ts
var PLATZHALTER_HILFE = "Platzhalter werden automatisch ersetzt: {{name}}, {{berufsbezeichnung}}, {{stadt}}, {{telefon}}, {{email}}.";
var FORMAT_HILFE = "Formatierung: **fett**, [Linktext](https://adresse.de). Neue Zeile = Zeilenumbruch. " + PLATZHALTER_HILFE;
var text = (name, label, description) => ({
  type: "string",
  name,
  label,
  description
});
var textarea = (name, label, description) => ({
  type: "string",
  name,
  label,
  description,
  ui: { component: "textarea" }
});
var formatText = (name, label) => ({
  type: "string",
  name,
  label,
  description: FORMAT_HILFE,
  ui: { component: "textarea" }
});
var paragraphs = (name, label = "Text") => ({
  type: "string",
  name,
  label,
  description: "Abs\xE4tze durch eine Leerzeile trennen.",
  ui: { component: "textarea" }
});
var textList = (name, label, description) => ({
  type: "string",
  name,
  label,
  description,
  list: true
});
var image = (name, label) => ({
  type: "image",
  name,
  label
});
var hidden = (name, type = "string") => ({ type, name, label: name, ui: { component: "hidden" } });
var seoFields = (description = PLATZHALTER_HILFE) => [
  text("seoTitle", "Seitentitel (Browser-Tab / Google)", description),
  textarea("seoDescription", "Beschreibung f\xFCr Google (Meta-Beschreibung)", description)
];
var faqList = (name = "items", label = "Fragen und Antworten") => ({
  type: "object",
  name,
  label,
  list: true,
  ui: { itemProps: (item) => ({ label: item?.question || "Frage" }) },
  fields: [
    text("question", "Frage"),
    textarea("answer", "Antwort"),
    hidden("id"),
    hidden("category")
  ]
});
var absatz = {
  name: "absatz",
  label: "Absatz",
  ui: { itemProps: (item) => ({ label: `Absatz: ${(item?.text || "").slice(0, 40)}\u2026` }) },
  fields: [formatText("text", "Text")]
};
var liste = {
  name: "liste",
  label: "Aufz\xE4hlung",
  fields: [textList("punkte", "Punkte")]
};
var karten = {
  name: "karten",
  label: "Kacheln (2 Spalten)",
  fields: [
    {
      type: "object",
      name: "karten",
      label: "Kacheln",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.titel || "Kachel" }) },
      fields: [text("titel", "Titel"), text("text", "Text")]
    }
  ]
};
var notiz = {
  name: "notiz",
  label: "Randnotiz (klein, grau)",
  fields: [formatText("text", "Text")]
};
var hinweis = {
  name: "hinweis",
  label: "Hinweis-Kasten",
  fields: [
    text("label", "Fettgedrucktes Stichwort", "z. B. \u201EHinweis:\u201C"),
    formatText("text", "Text")
  ]
};
var anschrift = {
  name: "anschrift",
  label: "Anschrift",
  fields: [
    textList(
      "lines",
      "Zeilen",
      PLATZHALTER_HILFE + " Weitere: {{strasse}}, {{plz}}, {{ort}}, {{land}}."
    ),
    { type: "boolean", name: "boldFirstLine", label: "Erste Zeile fett" }
  ]
};
var serviceSections = {
  type: "object",
  name: "sections",
  label: "Inhalt (Abschnitte)",
  list: true,
  ui: { itemProps: (item) => ({ label: item?.heading || "Abschnitt" }) },
  fields: [
    text("heading", "Zwischen\xFCberschrift"),
    {
      type: "object",
      name: "bausteine",
      label: "Bausteine",
      list: true,
      templates: [absatz, liste, karten, notiz, hinweis]
    }
  ]
};
var legalSections = {
  type: "object",
  name: "sections",
  label: "Abschnitte",
  list: true,
  ui: { itemProps: (item) => ({ label: item?.heading || "Fu\xDFnote" }) },
  fields: [
    text("heading", "\xDCberschrift", "Leer lassen bei einer Fu\xDFnote."),
    {
      type: "string",
      name: "style",
      label: "Darstellung",
      options: [
        { label: "Normaler Abschnitt", value: "normal" },
        { label: "Fu\xDFnote (klein, mit Trennlinie)", value: "fussnote" }
      ]
    },
    {
      type: "object",
      name: "bausteine",
      label: "Bausteine",
      list: true,
      templates: [absatz, anschrift]
    }
  ]
};

// tina/config.ts
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var fixed = { create: false, delete: false };
var page = (name, label, file, route, fields) => ({
  name,
  label,
  path: "content/seiten",
  format: "json",
  match: { include: file },
  ui: { allowedActions: fixed, router: () => route },
  fields
});
var button = (name, label = "Button-Text") => text(name, label);
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: { outputFolder: "admin", publicFolder: "public" },
  // Bilder liegen wie bisher in public/images
  media: { tina: { mediaRoot: "images", publicFolder: "public" } },
  schema: {
    collections: [
      /* ------------------------------------------------------------ */
      {
        name: "einstellungen",
        label: "Einstellungen (Kontakt, Men\xFC, Fu\xDFzeile)",
        path: "content/einstellungen",
        format: "json",
        ui: { global: true, allowedActions: fixed },
        fields: [
          text("name", "Name"),
          text("professionalTitle", "Berufsbezeichnung"),
          text("specialization", "Spezialisierung (f\xFCr Google)"),
          text("city", "Stadt"),
          hidden("region"),
          text("phone", "Telefon (nur Ziffern, ohne Leerzeichen)", "Beispiel: 01754960247"),
          text("phoneFormatted", "Telefon (Anzeige)", "Beispiel: 0175 496 02 47"),
          text("email", "E-Mail"),
          {
            type: "object",
            name: "address",
            label: "Adresse",
            fields: [
              text("street", "Stra\xDFe und Hausnummer"),
              text("zip", "PLZ"),
              text("city", "Ort"),
              text("country", "Land"),
              text("full", "Adresse in einer Zeile")
            ]
          },
          text(
            "bookingUrl",
            "Link zur Terminbuchung",
            "Alle \u201ETermin vereinbaren\u201C-Buttons f\xFChren hierhin."
          ),
          text("mlpProfileUrl", "Link zum MLP-Beraterprofil"),
          textarea("description", "Standard-Beschreibung f\xFCr Google"),
          {
            type: "object",
            name: "navigation",
            label: "Hauptmen\xFC",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.label }) },
            fields: [
              text("label", "Beschriftung"),
              hidden("href"),
              {
                type: "object",
                name: "children",
                label: "Untermen\xFC",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.label }) },
                fields: [text("label", "Beschriftung"), hidden("href")]
              }
            ]
          },
          {
            type: "object",
            name: "buttons",
            label: "Buttons",
            fields: [
              button("header", "Button im Kopfbereich"),
              button("mobile", "Button unten auf dem Handy"),
              button("serviceCard", "Button auf den Leistungs-Kacheln")
            ]
          },
          text("breadcrumbHome", "Brotkr\xFCmel: Startseite"),
          {
            type: "object",
            name: "footer",
            label: "Fu\xDFzeile",
            fields: [
              button("bookingButton"),
              text("contactTitle", "\xDCberschrift Kontakt"),
              text("mlpLinkText", "Linktext MLP-Profil"),
              text("legalTitle", "\xDCberschrift Rechtliches"),
              {
                type: "object",
                name: "legalLinks",
                label: "Rechtliche Links",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.label }) },
                fields: [text("label", "Beschriftung"), hidden("href")]
              },
              text("copyright", "Copyright-Zusatz")
            ]
          },
          {
            type: "object",
            name: "legal",
            label: "Rechtliche Hinweistexte",
            fields: [
              text("noticeTitle", "\xDCberschrift Hinweiskasten"),
              textarea("disclaimer", "Rechtlicher Hinweis (erscheint auf vielen Seiten)"),
              textarea(
                "personalSite",
                "Hinweis \u201EPers\xF6nliche Beraterwebsite\u201C",
                "{{name}} wird automatisch ersetzt."
              )
            ]
          },
          {
            type: "object",
            name: "finalCta",
            label: "Abschluss-Bereich (unten auf fast jeder Seite)",
            fields: [
              text("title", "\xDCberschrift"),
              textarea("text", "Text"),
              button("button"),
              text("note", "Kleiner Hinweis", "{{stadt}} wird automatisch ersetzt.")
            ]
          },
          {
            type: "object",
            name: "servicePage",
            label: "Gemeinsame Texte der Leistungsseiten",
            fields: [
              text("breadcrumbParent", "Brotkr\xFCmel: Leistungen"),
              text("atAGlanceTitle", "\xDCberschrift \u201EAuf einen Blick\u201C"),
              button("bookingButton"),
              text("contactLink", "Link zur Kontaktseite"),
              text("authorPrefix", "Autor: Vorsatz"),
              text("authorName", "Autor: Name"),
              text("authorSuffix", "Autor: Zusatz"),
              text("updatedPrefix", "\u201EZuletzt aktualisiert\u201C"),
              text("relatedTitle", "\xDCberschrift verwandte Themen"),
              text("faqTitle", "\xDCberschrift Fragen")
            ]
          },
          {
            type: "object",
            name: "notFound",
            label: "Fehlerseite (Seite nicht gefunden)",
            fields: [
              hidden("code"),
              text("title", "\xDCberschrift"),
              textarea("text", "Text"),
              button("homeButton", "Button zur Startseite"),
              button("bookingButton", "Termin-Button")
            ]
          }
        ]
      },
      /* ------------------------------------------------------------ */
      page("startseite", "Startseite", "startseite", "/", [
        ...seoFields(),
        {
          type: "object",
          name: "hero",
          label: "Kopfbereich",
          fields: [
            text("eyebrow", "Kleine \xDCberzeile"),
            text("title", "\xDCberschrift"),
            text("lead", "Unterzeile"),
            textarea("text", "Text"),
            button("primaryButton", "Haupt-Button"),
            button("secondaryButton", "Button zu den Rechnern"),
            textList("trustItems", "Stichpunkte mit H\xE4kchen"),
            image("image", "Foto"),
            text("imageAlt", "Bildbeschreibung (f\xFCr Screenreader und Google)"),
            text("badgeStatus", "K\xE4rtchen: Status"),
            text("badgeTitle", "K\xE4rtchen: \xDCberschrift"),
            text("badgeText", "K\xE4rtchen: Ort")
          ]
        },
        {
          type: "object",
          name: "audiences",
          label: "Bereich \u201EWo stehst du gerade?\u201C",
          fields: [
            text("title", "\xDCberschrift"),
            textarea("subtitle", "Unterzeile"),
            {
              type: "object",
              name: "cards",
              label: "Karten",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("title", "\xDCberschrift"),
                textarea("description", "Text"),
                text("ctaText", "Linktext"),
                hidden("href"),
                image("image", "Bild"),
                text("imageAlt", "Bildbeschreibung"),
                {
                  type: "string",
                  name: "icon",
                  label: "Symbol",
                  options: [
                    { label: "Doktorhut (Studium)", value: "studium" },
                    { label: "Siegel (Beruf)", value: "beruf" },
                    { label: "Geb\xE4ude (Praxis)", value: "praxis" }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "object",
          name: "services",
          label: "Bereich Leistungen",
          description: "Die Kacheln selbst werden unter \u201ELeistungen\u201C bearbeitet.",
          fields: [text("title", "\xDCberschrift"), textarea("subtitle", "Unterzeile")]
        },
        {
          type: "object",
          name: "career",
          label: "Bereich Karrierephasen",
          fields: [
            text("eyebrow", "Kleine \xDCberzeile"),
            text("title", "\xDCberschrift"),
            textarea("subtitle", "Unterzeile"),
            text("phaseLabel", "Z\xE4hler", "{{nr}} und {{gesamt}} werden automatisch ersetzt."),
            button("nextButton", "Button \u201EN\xE4chste Phase\u201C"),
            {
              type: "object",
              name: "phases",
              label: "Phasen",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.label }) },
              fields: [
                text("label", "Name der Phase"),
                text("description", "Kurzbeschreibung"),
                textarea("detail", "Text"),
                textList("topics", "Themen"),
                text("hrefLabel", "Button-Text"),
                hidden("href"),
                hidden("id")
              ]
            }
          ]
        },
        {
          type: "object",
          name: "profile",
          label: "Bereich \u201EDein pers\xF6nlicher Ansprechpartner\u201C",
          fields: [
            text("title", "\xDCberschrift"),
            paragraphs("text"),
            image("image", "Foto"),
            text("imageAlt", "Bildbeschreibung"),
            button("primaryButton", "Termin-Button"),
            button("secondaryButton", "Button \u201EMehr \xFCber mich\u201C"),
            text("mlpPrefix", "Zeile unten: Vorsatz"),
            text("mlpLinkText", "Zeile unten: Linktext")
          ]
        },
        {
          type: "object",
          name: "process",
          label: "Bereich Ablauf",
          fields: [
            text("title", "\xDCberschrift"),
            {
              type: "object",
              name: "steps",
              label: "Schritte",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("number", "Nummer"),
                text("title", "\xDCberschrift"),
                textarea("description", "Text")
              ]
            }
          ]
        },
        {
          type: "object",
          name: "faq",
          label: "H\xE4ufige Fragen",
          fields: [text("title", "\xDCberschrift"), faqList()]
        }
      ]),
      /* ------------------------------------------------------------ */
      page("leistungsuebersicht", "Leistungen (\xDCbersichtsseite)", "leistungen", "/leistungen", [
        ...seoFields(),
        text("breadcrumb", "Brotkr\xFCmel"),
        text("title", "\xDCberschrift"),
        textarea("subtitle", "Unterzeile"),
        text("phasesTitle", "\xDCberschrift Karrierephasen"),
        {
          type: "object",
          name: "phases",
          label: "Karrierephasen",
          list: true,
          ui: { itemProps: (i) => ({ label: i?.title }) },
          fields: [
            text("title", "\xDCberschrift"),
            textarea("text", "Text"),
            text("linkText", "Linktext (optional)"),
            hidden("linkHref")
          ]
        }
      ]),
      /* ------------------------------------------------------------ */
      {
        name: "leistung",
        label: "Leistungen (Einzelseiten)",
        path: "content/leistungen",
        format: "json",
        ui: {
          allowedActions: fixed,
          router: ({ document }) => `/leistungen/${document._sys.filename}`
        },
        fields: [
          hidden("order", "number"),
          text("title", "Name der Leistung (Kachel)", void 0),
          textarea("shortText", "Kurztext (Kachel)"),
          textList("highlights", "Stichpunkte (Kachel)"),
          text("ctaText", "Linktext (Kachel)"),
          {
            type: "string",
            name: "icon",
            label: "Symbol (Kachel)",
            options: [
              { label: "Schild", value: "shield" },
              { label: "Herz", value: "heart" },
              { label: "Schirm", value: "umbrella" },
              { label: "Kurve", value: "trending-up" },
              { label: "Balken", value: "bar-chart" }
            ]
          },
          ...seoFields(),
          text("breadcrumb", "Brotkr\xFCmel"),
          text("h1", "\xDCberschrift der Seite"),
          textarea("summary", "Zusammenfassung (farbiger Kasten)"),
          { type: "datetime", name: "updatedAt", label: "Zuletzt aktualisiert" },
          {
            type: "object",
            name: "atAGlance",
            label: "Auf einen Blick",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.label }) },
            fields: [text("label", "Bezeichnung"), text("value", "Inhalt")]
          },
          serviceSections,
          {
            type: "string",
            name: "calculator",
            label: "Rechner auf dieser Seite",
            options: [
              { label: "Kein Rechner", value: "keiner" },
              { label: "BU-L\xFCcken-Check", value: "bu" },
              { label: "Verm\xF6gensrechner", value: "vermoegen" }
            ]
          },
          faqList("faqs", "H\xE4ufige Fragen"),
          {
            type: "object",
            name: "relatedLinks",
            label: "Verwandte Themen",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.label }) },
            fields: [text("label", "Beschriftung"), hidden("href")]
          }
        ]
      },
      /* ------------------------------------------------------------ */
      page("studierende", "F\xFCr Studierende", "studierende", "/studierende", [
        ...seoFields(),
        text("breadcrumb", "Brotkr\xFCmel"),
        {
          type: "object",
          name: "hero",
          label: "Kopfbereich",
          fields: [
            text("eyebrow", "Kleine \xDCberzeile"),
            text("title", "\xDCberschrift"),
            textarea("text", "Text"),
            button("primaryButton", "Termin-Button"),
            button("secondaryButton", "Button \u201EFrage stellen\u201C (\xF6ffnet E-Mail)"),
            image("image", "Bild"),
            text("imageAlt", "Bildbeschreibung")
          ]
        },
        {
          type: "object",
          name: "notice",
          label: "Hinweis-Kasten",
          fields: [text("label", "Fettgedrucktes Stichwort"), textarea("text", "Text")]
        },
        {
          type: "object",
          name: "topics",
          label: "Themen im Studium",
          fields: [
            text("title", "\xDCberschrift"),
            textarea("subtitle", "Unterzeile"),
            text("linkText", "Linktext der Karten"),
            {
              type: "object",
              name: "items",
              label: "Karten",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("title", "\xDCberschrift"),
                textarea("description", "Text"),
                hidden("href")
              ]
            }
          ]
        },
        {
          type: "object",
          name: "program",
          label: "F\xF6rderprogramm",
          fields: [
            text("title", "\xDCberschrift"),
            textarea("text", "Text"),
            {
              type: "object",
              name: "items",
              label: "Angebote",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("tag", "Etikett"),
                text("title", "\xDCberschrift"),
                textarea("text", "Text"),
                { type: "boolean", name: "highlight", label: "Hervorheben (orange)" }
              ]
            },
            text("accessLabel", "Kasten unten: Stichwort"),
            textarea("accessText", "Kasten unten: Text")
          ]
        },
        {
          type: "object",
          name: "areas",
          label: "Pflicht- und Zusatzbereiche",
          fields: [
            text("title", "\xDCberschrift"),
            textarea("text", "Text"),
            text("requiredTitle", "\xDCberschrift Pflichtbereiche"),
            {
              type: "object",
              name: "required",
              label: "Pflichtbereiche",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.label }) },
              fields: [text("label", "Bezeichnung"), textarea("text", "Text")]
            },
            text("optionalTitle", "\xDCberschrift Zusatzbereiche"),
            {
              type: "object",
              name: "optional",
              label: "Zusatzbereiche",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.label }) },
              fields: [text("label", "Bezeichnung"), textarea("text", "Text")]
            }
          ]
        },
        {
          type: "object",
          name: "process",
          label: "Ablauf des Gespr\xE4chs",
          fields: [
            text("title", "\xDCberschrift"),
            {
              type: "object",
              name: "steps",
              label: "Schritte",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("step", "Nummer"),
                text("title", "\xDCberschrift"),
                textarea("text", "Text")
              ]
            }
          ]
        },
        {
          type: "object",
          name: "faq",
          label: "H\xE4ufige Fragen",
          fields: [text("title", "\xDCberschrift"), faqList()]
        }
      ]),
      /* ------------------------------------------------------------ */
      page("ueberMich", "\xDCber mich", "ueber-mich", "/ueber-mich", [
        ...seoFields(),
        text("breadcrumb", "Brotkr\xFCmel"),
        image("image", "Portr\xE4t"),
        text("imageAlt", "Bildbeschreibung"),
        text("contactTitle", "Kontaktkarte: \xDCberschrift"),
        text("mlpLinkText", "Kontaktkarte: Linktext MLP-Profil"),
        text("eyebrow", "Kleine \xDCberzeile"),
        text("title", "\xDCberschrift"),
        paragraphs("text"),
        text("specializationTitle", "\xDCberschrift Spezialisierung"),
        textList("specializations", "Spezialisierungen"),
        text("activityTitle", "\xDCberschrift T\xE4tigkeit"),
        formatText("activityText", "Text T\xE4tigkeit"),
        button("button", "Termin-Button"),
        text("topicsTitle", "\xDCberschrift Beratungsthemen"),
        {
          type: "object",
          name: "personal",
          label: "Bereich Pers\xF6nliches",
          fields: [
            image("image", "Foto"),
            text("imageAlt", "Bildbeschreibung"),
            text("title", "\xDCberschrift"),
            paragraphs("text")
          ]
        }
      ]),
      /* ------------------------------------------------------------ */
      page("kontakt", "Kontakt", "kontakt", "/kontakt", [
        ...seoFields(),
        text("breadcrumb", "Brotkr\xFCmel"),
        text("title", "\xDCberschrift"),
        textarea("intro", "Einleitung"),
        text("bookingTitle", "Terminbuchung: \xDCberschrift"),
        text("bookingText", "Terminbuchung: Text", "{{stadt}} wird automatisch ersetzt."),
        button("bookingButton", "Terminbuchung: Button"),
        text("phoneTitle", "Telefon: \xDCberschrift"),
        text("emailTitle", "E-Mail: \xDCberschrift"),
        text("emailNote", "E-Mail: Hinweis"),
        text("officeTitle", "B\xFCro: \xDCberschrift"),
        text("officeNote", "B\xFCro: Hinweis"),
        text("profileTitle", "MLP-Profil: \xDCberschrift"),
        text("profileLinkText", "MLP-Profil: Linktext")
      ]),
      /* ------------------------------------------------------------ */
      {
        name: "rechtstext",
        label: "Rechtstexte (Impressum, Datenschutz, Hinweise)",
        path: "content/rechtliches",
        format: "json",
        ui: { allowedActions: fixed, router: ({ document }) => `/${document._sys.filename}` },
        fields: [
          hidden("order", "number"),
          ...seoFields(),
          text("breadcrumb", "Brotkr\xFCmel"),
          text("title", "\xDCberschrift"),
          text(
            "warningTitle",
            "Warnkasten: \xDCberschrift",
            "Warnkasten verschwindet, wenn der Text leer ist."
          ),
          textarea("warningText", "Warnkasten: Text"),
          legalSections
        ]
      },
      /* ------------------------------------------------------------ */
      {
        name: "rechner",
        label: "Rechner (Texte)",
        path: "content/rechner",
        format: "json",
        ui: { global: true, allowedActions: fixed },
        fields: [
          text("eyebrow", "Kleine \xDCberzeile"),
          text("title", "\xDCberschrift"),
          textarea("subtitle", "Unterzeile"),
          text("tabBu", "Reiter: BU-Rechner"),
          text("tabWealth", "Reiter: Verm\xF6gensrechner"),
          textarea("disclaimer", "Hinweis unter dem Rechner"),
          {
            type: "object",
            name: "wealth",
            label: "Verm\xF6gensrechner",
            description: "{{jahre}} wird automatisch durch die gew\xE4hlte Anlagedauer ersetzt.",
            fields: [
              text("monthlyLabel", "Regler Sparrate"),
              text("yearsLabel", "Regler Anlagedauer"),
              text("rateLabel", "Regler Rendite"),
              text("investedLabel", "Ergebnis: Eingezahlt"),
              text("gainLabel", "Ergebnis: Wertzuwachs"),
              text("totalLabel", "Ergebnis: Endkapital"),
              text("chartStart", "Diagramm: Beschriftung links"),
              text("chartEnd", "Diagramm: Beschriftung rechts"),
              text("legendInvested", "Legende: Einzahlungen"),
              text("legendGrowth", "Legende: Wertentwicklung")
            ]
          },
          {
            type: "object",
            name: "bu",
            label: "BU-L\xFCcken-Check",
            description: "Die Rechenannahmen (75 % Bedarf, 30 % gesetzliche Absicherung) stehen im Code.",
            fields: [
              text("incomeLabel", "Regler Einkommen"),
              text("statusLegend", "\xDCberschrift Berufliche Situation"),
              text("statusStudium", "Auswahl: Studium"),
              text("statusAngestellt", "Auswahl: Angestellt"),
              text("statusSelbststaendig", "Auswahl: Selbstst\xE4ndig"),
              text("needLabel", "Balken: Absicherungsbedarf"),
              text("coverLabel", "Balken: Gesetzliche Absicherung"),
              text("gapLabel", "Ergebnis: Versorgungsl\xFCcke"),
              textarea("textStudium", "Erkl\xE4rung bei Studium"),
              textarea("textAngestellt", "Erkl\xE4rung bei Angestellt"),
              textarea("textSelbststaendig", "Erkl\xE4rung bei Selbstst\xE4ndig"),
              button("button")
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
