import { defineConfig, type Collection, type TinaField } from "tinacms";
import {
  text,
  textarea,
  formatText,
  textList,
  image,
  hidden,
  seoFields,
  faqList,
  serviceSections,
  legalSections,
  paragraphs,
} from "./fields";

// Bei Vercel/Tina Cloud gesetzt; lokal greifen die Fallbacks.
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

/** Seiten dürfen bearbeitet, aber weder angelegt noch gelöscht werden. */
const fixed = { create: false, delete: false };

/** Eine Einzelseite in content/seiten (eine Datei = eine Seite). */
const page = (
  name: string,
  label: string,
  file: string,
  route: string,
  fields: TinaField[]
): Collection => ({
  name,
  label,
  path: "content/seiten",
  format: "json",
  match: { include: file },
  ui: { allowedActions: fixed, router: () => route },
  fields,
});

const button = (name: string, label = "Button-Text") => text(name, label);

export default defineConfig({
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
        label: "Einstellungen (Kontakt, Menü, Fußzeile)",
        path: "content/einstellungen",
        format: "json",
        ui: { global: true, allowedActions: fixed },
        fields: [
          text("name", "Name"),
          text("professionalTitle", "Berufsbezeichnung"),
          text("specialization", "Spezialisierung (für Google)"),
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
              text("street", "Straße und Hausnummer"),
              text("zip", "PLZ"),
              text("city", "Ort"),
              text("country", "Land"),
              text("full", "Adresse in einer Zeile"),
            ],
          },
          text(
            "bookingUrl",
            "Link zur Terminbuchung",
            "Alle „Termin vereinbaren“-Buttons führen hierhin."
          ),
          text("mlpProfileUrl", "Link zum MLP-Beraterprofil"),
          textarea("description", "Standard-Beschreibung für Google"),
          {
            type: "object",
            name: "navigation",
            label: "Hauptmenü",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.label }) },
            fields: [
              text("label", "Beschriftung"),
              hidden("href"),
              {
                type: "object",
                name: "children",
                label: "Untermenü",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.label }) },
                fields: [text("label", "Beschriftung"), hidden("href")],
              },
            ],
          },
          {
            type: "object",
            name: "buttons",
            label: "Buttons",
            fields: [
              button("header", "Button im Kopfbereich"),
              button("mobile", "Button unten auf dem Handy"),
              button("serviceCard", "Button auf den Leistungs-Kacheln"),
            ],
          },
          text("breadcrumbHome", "Brotkrümel: Startseite"),
          {
            type: "object",
            name: "footer",
            label: "Fußzeile",
            fields: [
              button("bookingButton"),
              text("contactTitle", "Überschrift Kontakt"),
              text("mlpLinkText", "Linktext MLP-Profil"),
              text("legalTitle", "Überschrift Rechtliches"),
              {
                type: "object",
                name: "legalLinks",
                label: "Rechtliche Links",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.label }) },
                fields: [text("label", "Beschriftung"), hidden("href")],
              },
              text("copyright", "Copyright-Zusatz"),
            ],
          },
          {
            type: "object",
            name: "legal",
            label: "Rechtliche Hinweistexte",
            fields: [
              text("noticeTitle", "Überschrift Hinweiskasten"),
              textarea("disclaimer", "Rechtlicher Hinweis (erscheint auf vielen Seiten)"),
              textarea(
                "personalSite",
                "Hinweis „Persönliche Beraterwebsite“",
                "{{name}} wird automatisch ersetzt."
              ),
            ],
          },
          {
            type: "object",
            name: "finalCta",
            label: "Abschluss-Bereich (unten auf fast jeder Seite)",
            fields: [
              text("title", "Überschrift"),
              textarea("text", "Text"),
              button("button"),
              text("note", "Kleiner Hinweis", "{{stadt}} wird automatisch ersetzt."),
            ],
          },
          {
            type: "object",
            name: "servicePage",
            label: "Gemeinsame Texte der Leistungsseiten",
            fields: [
              text("breadcrumbParent", "Brotkrümel: Leistungen"),
              text("atAGlanceTitle", "Überschrift „Auf einen Blick“"),
              button("bookingButton"),
              text("contactLink", "Link zur Kontaktseite"),
              text("authorPrefix", "Autor: Vorsatz"),
              text("authorName", "Autor: Name"),
              text("authorSuffix", "Autor: Zusatz"),
              text("updatedPrefix", "„Zuletzt aktualisiert“"),
              text("relatedTitle", "Überschrift verwandte Themen"),
              text("faqTitle", "Überschrift Fragen"),
            ],
          },
          {
            type: "object",
            name: "notFound",
            label: "Fehlerseite (Seite nicht gefunden)",
            fields: [
              hidden("code"),
              text("title", "Überschrift"),
              textarea("text", "Text"),
              button("homeButton", "Button zur Startseite"),
              button("bookingButton", "Termin-Button"),
            ],
          },
        ],
      },

      /* ------------------------------------------------------------ */
      page("startseite", "Startseite", "startseite", "/", [
        ...seoFields(),
        {
          type: "object",
          name: "hero",
          label: "Kopfbereich",
          fields: [
            text("eyebrow", "Kleine Überzeile"),
            text("title", "Überschrift"),
            text("lead", "Unterzeile"),
            textarea("text", "Text"),
            button("primaryButton", "Haupt-Button"),
            button("secondaryButton", "Button zu den Rechnern"),
            textList("trustItems", "Stichpunkte mit Häkchen"),
            image("image", "Foto"),
            text("imageAlt", "Bildbeschreibung (für Screenreader und Google)"),
            text("badgeStatus", "Kärtchen: Status"),
            text("badgeTitle", "Kärtchen: Überschrift"),
            text("badgeText", "Kärtchen: Ort"),
          ],
        },
        {
          type: "object",
          name: "audiences",
          label: "Bereich „Wo stehst du gerade?“",
          fields: [
            text("title", "Überschrift"),
            textarea("subtitle", "Unterzeile"),
            {
              type: "object",
              name: "cards",
              label: "Karten",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("title", "Überschrift"),
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
                    { label: "Gebäude (Praxis)", value: "praxis" },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "object",
          name: "services",
          label: "Bereich Leistungen",
          description: "Die Kacheln selbst werden unter „Leistungen“ bearbeitet.",
          fields: [text("title", "Überschrift"), textarea("subtitle", "Unterzeile")],
        },
        {
          type: "object",
          name: "career",
          label: "Bereich Karrierephasen",
          fields: [
            text("eyebrow", "Kleine Überzeile"),
            text("title", "Überschrift"),
            textarea("subtitle", "Unterzeile"),
            text("phaseLabel", "Zähler", "{{nr}} und {{gesamt}} werden automatisch ersetzt."),
            button("nextButton", "Button „Nächste Phase“"),
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
                hidden("id"),
              ],
            },
          ],
        },
        {
          type: "object",
          name: "profile",
          label: "Bereich „Dein persönlicher Ansprechpartner“",
          fields: [
            text("title", "Überschrift"),
            paragraphs("text"),
            image("image", "Foto"),
            text("imageAlt", "Bildbeschreibung"),
            button("primaryButton", "Termin-Button"),
            button("secondaryButton", "Button „Mehr über mich“"),
            text("mlpPrefix", "Zeile unten: Vorsatz"),
            text("mlpLinkText", "Zeile unten: Linktext"),
          ],
        },
        {
          type: "object",
          name: "process",
          label: "Bereich Ablauf",
          fields: [
            text("title", "Überschrift"),
            {
              type: "object",
              name: "steps",
              label: "Schritte",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("number", "Nummer"),
                text("title", "Überschrift"),
                textarea("description", "Text"),
              ],
            },
          ],
        },
        {
          type: "object",
          name: "faq",
          label: "Häufige Fragen",
          fields: [text("title", "Überschrift"), faqList()],
        },
      ]),

      /* ------------------------------------------------------------ */
      page("leistungsuebersicht", "Leistungen (Übersichtsseite)", "leistungen", "/leistungen", [
        ...seoFields(),
        text("breadcrumb", "Brotkrümel"),
        text("title", "Überschrift"),
        textarea("subtitle", "Unterzeile"),
        text("phasesTitle", "Überschrift Karrierephasen"),
        {
          type: "object",
          name: "phases",
          label: "Karrierephasen",
          list: true,
          ui: { itemProps: (i) => ({ label: i?.title }) },
          fields: [
            text("title", "Überschrift"),
            textarea("text", "Text"),
            text("linkText", "Linktext (optional)"),
            hidden("linkHref"),
          ],
        },
      ]),

      /* ------------------------------------------------------------ */
      {
        name: "leistung",
        label: "Leistungen (Einzelseiten)",
        path: "content/leistungen",
        format: "json",
        ui: {
          allowedActions: fixed,
          router: ({ document }) => `/leistungen/${document._sys.filename}`,
        },
        fields: [
          hidden("order", "number"),
          text("title", "Name der Leistung (Kachel)", undefined),
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
              { label: "Balken", value: "bar-chart" },
            ],
          },
          ...seoFields(),
          text("breadcrumb", "Brotkrümel"),
          text("h1", "Überschrift der Seite"),
          textarea("summary", "Zusammenfassung (farbiger Kasten)"),
          { type: "datetime", name: "updatedAt", label: "Zuletzt aktualisiert" },
          {
            type: "object",
            name: "atAGlance",
            label: "Auf einen Blick",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.label }) },
            fields: [text("label", "Bezeichnung"), text("value", "Inhalt")],
          },
          serviceSections,
          {
            type: "string",
            name: "calculator",
            label: "Rechner auf dieser Seite",
            options: [
              { label: "Kein Rechner", value: "keiner" },
              { label: "BU-Lücken-Check", value: "bu" },
              { label: "Vermögensrechner", value: "vermoegen" },
            ],
          },
          faqList("faqs", "Häufige Fragen"),
          {
            type: "object",
            name: "relatedLinks",
            label: "Verwandte Themen",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.label }) },
            fields: [text("label", "Beschriftung"), hidden("href")],
          },
        ],
      },

      /* ------------------------------------------------------------ */
      page("studierende", "Für Studierende", "studierende", "/studierende", [
        ...seoFields(),
        text("breadcrumb", "Brotkrümel"),
        {
          type: "object",
          name: "hero",
          label: "Kopfbereich",
          fields: [
            text("eyebrow", "Kleine Überzeile"),
            text("title", "Überschrift"),
            textarea("text", "Text"),
            button("primaryButton", "Termin-Button"),
            button("secondaryButton", "Button „Frage stellen“ (öffnet E-Mail)"),
            image("image", "Bild"),
            text("imageAlt", "Bildbeschreibung"),
          ],
        },
        {
          type: "object",
          name: "notice",
          label: "Hinweis-Kasten",
          fields: [text("label", "Fettgedrucktes Stichwort"), textarea("text", "Text")],
        },
        {
          type: "object",
          name: "topics",
          label: "Themen im Studium",
          fields: [
            text("title", "Überschrift"),
            textarea("subtitle", "Unterzeile"),
            text("linkText", "Linktext der Karten"),
            {
              type: "object",
              name: "items",
              label: "Karten",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("title", "Überschrift"),
                textarea("description", "Text"),
                hidden("href"),
              ],
            },
          ],
        },
        {
          type: "object",
          name: "program",
          label: "Förderprogramm",
          fields: [
            text("title", "Überschrift"),
            textarea("text", "Text"),
            {
              type: "object",
              name: "items",
              label: "Angebote",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("tag", "Etikett"),
                text("title", "Überschrift"),
                textarea("text", "Text"),
                { type: "boolean", name: "highlight", label: "Hervorheben (orange)" },
              ],
            },
            text("accessLabel", "Kasten unten: Stichwort"),
            textarea("accessText", "Kasten unten: Text"),
          ],
        },
        {
          type: "object",
          name: "areas",
          label: "Pflicht- und Zusatzbereiche",
          fields: [
            text("title", "Überschrift"),
            textarea("text", "Text"),
            text("requiredTitle", "Überschrift Pflichtbereiche"),
            {
              type: "object",
              name: "required",
              label: "Pflichtbereiche",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.label }) },
              fields: [text("label", "Bezeichnung"), textarea("text", "Text")],
            },
            text("optionalTitle", "Überschrift Zusatzbereiche"),
            {
              type: "object",
              name: "optional",
              label: "Zusatzbereiche",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.label }) },
              fields: [text("label", "Bezeichnung"), textarea("text", "Text")],
            },
          ],
        },
        {
          type: "object",
          name: "process",
          label: "Ablauf des Gesprächs",
          fields: [
            text("title", "Überschrift"),
            {
              type: "object",
              name: "steps",
              label: "Schritte",
              list: true,
              ui: { itemProps: (i) => ({ label: i?.title }) },
              fields: [
                text("step", "Nummer"),
                text("title", "Überschrift"),
                textarea("text", "Text"),
              ],
            },
          ],
        },
        {
          type: "object",
          name: "faq",
          label: "Häufige Fragen",
          fields: [text("title", "Überschrift"), faqList()],
        },
      ]),

      /* ------------------------------------------------------------ */
      page("ueberMich", "Über mich", "ueber-mich", "/ueber-mich", [
        ...seoFields(),
        text("breadcrumb", "Brotkrümel"),
        image("image", "Porträt"),
        text("imageAlt", "Bildbeschreibung"),
        text("contactTitle", "Kontaktkarte: Überschrift"),
        text("mlpLinkText", "Kontaktkarte: Linktext MLP-Profil"),
        text("eyebrow", "Kleine Überzeile"),
        text("title", "Überschrift"),
        paragraphs("text"),
        text("specializationTitle", "Überschrift Spezialisierung"),
        textList("specializations", "Spezialisierungen"),
        text("activityTitle", "Überschrift Tätigkeit"),
        formatText("activityText", "Text Tätigkeit"),
        button("button", "Termin-Button"),
        text("topicsTitle", "Überschrift Beratungsthemen"),
        {
          type: "object",
          name: "personal",
          label: "Bereich Persönliches",
          fields: [
            image("image", "Foto"),
            text("imageAlt", "Bildbeschreibung"),
            text("title", "Überschrift"),
            paragraphs("text"),
          ],
        },
      ]),

      /* ------------------------------------------------------------ */
      page("kontakt", "Kontakt", "kontakt", "/kontakt", [
        ...seoFields(),
        text("breadcrumb", "Brotkrümel"),
        text("title", "Überschrift"),
        textarea("intro", "Einleitung"),
        text("bookingTitle", "Terminbuchung: Überschrift"),
        text("bookingText", "Terminbuchung: Text", "{{stadt}} wird automatisch ersetzt."),
        button("bookingButton", "Terminbuchung: Button"),
        text("phoneTitle", "Telefon: Überschrift"),
        text("emailTitle", "E-Mail: Überschrift"),
        text("emailNote", "E-Mail: Hinweis"),
        text("officeTitle", "Büro: Überschrift"),
        text("officeNote", "Büro: Hinweis"),
        text("profileTitle", "MLP-Profil: Überschrift"),
        text("profileLinkText", "MLP-Profil: Linktext"),
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
          text("breadcrumb", "Brotkrümel"),
          text("title", "Überschrift"),
          text(
            "warningTitle",
            "Warnkasten: Überschrift",
            "Warnkasten verschwindet, wenn der Text leer ist."
          ),
          textarea("warningText", "Warnkasten: Text"),
          legalSections,
        ],
      },

      /* ------------------------------------------------------------ */
      {
        name: "rechner",
        label: "Rechner (Texte)",
        path: "content/rechner",
        format: "json",
        ui: { global: true, allowedActions: fixed },
        fields: [
          text("eyebrow", "Kleine Überzeile"),
          text("title", "Überschrift"),
          textarea("subtitle", "Unterzeile"),
          text("tabBu", "Reiter: BU-Rechner"),
          text("tabWealth", "Reiter: Vermögensrechner"),
          textarea("disclaimer", "Hinweis unter dem Rechner"),
          {
            type: "object",
            name: "wealth",
            label: "Vermögensrechner",
            description: "{{jahre}} wird automatisch durch die gewählte Anlagedauer ersetzt.",
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
              text("legendGrowth", "Legende: Wertentwicklung"),
            ],
          },
          {
            type: "object",
            name: "bu",
            label: "BU-Lücken-Check",
            description:
              "Die Rechenannahmen (75 % Bedarf, 30 % gesetzliche Absicherung) stehen im Code.",
            fields: [
              text("incomeLabel", "Regler Einkommen"),
              text("statusLegend", "Überschrift Berufliche Situation"),
              text("statusStudium", "Auswahl: Studium"),
              text("statusAngestellt", "Auswahl: Angestellt"),
              text("statusSelbststaendig", "Auswahl: Selbstständig"),
              text("needLabel", "Balken: Absicherungsbedarf"),
              text("coverLabel", "Balken: Gesetzliche Absicherung"),
              text("gapLabel", "Ergebnis: Versorgungslücke"),
              textarea("textStudium", "Erklärung bei Studium"),
              textarea("textAngestellt", "Erklärung bei Angestellt"),
              textarea("textSelbststaendig", "Erklärung bei Selbstständig"),
              button("button"),
            ],
          },
        ],
      },
    ],
  },
});
