import fs from "fs";
import path from "path";
import { fill, leistungen, settings, splitParagraphs, tokenValues } from "@/lib/content";

/**
 * Prüft die Inhalte aus dem CMS (content/). Schützt vor den typischen Fehlern:
 * unbekannte Platzhalter, Links auf nicht existierende Seiten, leere Pflichtfelder.
 */
const root = process.cwd();
const contentFiles = (dir = path.join(root, "content")): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory()
        ? contentFiles(path.join(dir, e.name))
        : e.name.endsWith(".json")
          ? [path.join(dir, e.name)]
          : []
    );
const allStrings = (value: unknown): string[] =>
  typeof value === "string"
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(allStrings)
      : value && typeof value === "object"
        ? Object.values(value).flatMap(allStrings)
        : [];

/** Alle Seiten, die es gibt (Ordner mit page.tsx) plus die fünf Leistungen. */
const routes = new Set<string>(["/", ...leistungen.map((l) => `/leistungen/${l.slug}`)]);
(function collect(dir: string, prefix: string) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith("[")) continue;
    const full = path.join(dir, e.name);
    if (fs.existsSync(path.join(full, "page.tsx"))) routes.add(`${prefix}/${e.name}`);
    collect(full, `${prefix}/${e.name}`);
  }
})(path.join(root, "src/app"), "");

describe("Inhalte aus dem CMS", () => {
  const files = contentFiles();

  it("findet alle 15 Inhaltsdateien", () => {
    expect(files).toHaveLength(15);
  });

  it.each(files.map((f) => path.relative(root, f)))("%s nutzt nur bekannte Platzhalter", (file) => {
    const known = new Set([...Object.keys(tokenValues()), "jahre", "nr", "gesamt"]);
    const used = allStrings(JSON.parse(fs.readFileSync(path.join(root, file), "utf8"))).flatMap(
      (s) => [...s.matchAll(/\{\{([\w-]+)\}\}/g)].map((m) => m[1])
    );
    expect(used.filter((t) => !known.has(t))).toEqual([]);
  });

  it.each(files.map((f) => path.relative(root, f)))(
    "%s verlinkt nur auf existierende Seiten",
    (file) => {
      const doc = JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
      const links: string[] = [];
      (function walk(v: unknown, key = "") {
        if (typeof v === "string" && /^(href|linkHref)$/.test(key) && v.startsWith("/"))
          links.push(v.split("#")[0]);
        else if (v && typeof v === "object")
          for (const [k, x] of Object.entries(v)) walk(x, Array.isArray(v) ? key : k);
      })(doc);
      expect(links.filter((l) => !routes.has(l))).toEqual([]);
    }
  );

  it("jede Leistung hat Überschrift, Zusammenfassung und mindestens einen Abschnitt", () => {
    expect(leistungen).toHaveLength(5);
    for (const l of leistungen) {
      expect(l.h1).toBeTruthy();
      expect(l.summary).toBeTruthy();
      expect(l.sections.length).toBeGreaterThan(0);
      expect(["keiner", "bu", "vermoegen"]).toContain(l.calculator);
    }
  });

  it("Menü und Fußzeile zeigen auf existierende Seiten", () => {
    const hrefs = [
      ...settings.navigation.flatMap((g) => [g.href, ...g.children.map((c) => c.href)]),
      ...settings.footer.legalLinks.map((l) => l.href),
    ];
    expect(hrefs.filter((h) => !routes.has(h))).toEqual([]);
  });
});

describe("Platzhalter und Absätze", () => {
  it("ersetzt bekannte Platzhalter und lässt unbekannte stehen", () => {
    expect(fill("in {{stadt}}")).toBe(`in ${settings.city}`);
    expect(fill("{{jahre}} Jahre", { jahre: 20 })).toBe("20 Jahre");
    expect(fill("{{unbekannt}}")).toBe("{{unbekannt}}");
  });

  it("teilt Text an Leerzeilen in Absätze", () => {
    expect(splitParagraphs("Eins\n\nZwei\n \nDrei")).toEqual(["Eins", "Zwei", "Drei"]);
    expect(splitParagraphs("")).toEqual([]);
  });
});
