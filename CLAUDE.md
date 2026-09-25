# CLAUDE.md – Dennis Landwehr, Finanzberater-Website

Dieses Repository gehört **ausschließlich** zum Kunden **Dennis Landwehr** (Finanzberater bei MLP,
Hannover). Es hat nichts mit anderen Kundenprojekten der Agentur zu tun – keine Inhalte, Komponenten,
Farben oder Zugangsdaten aus anderen Projekten übernehmen.

- **Live-Domain:** https://dennis-landwehr.com (DNS bei Strato, Konto CL Concepts)
- **GitHub:** `CL-Concepts/Dennis-Landwehr-MLP-Website` (privat)
- **Hosting:** Vercel – deployt automatisch bei jedem Push/Merge auf `main`
- **CMS:** TinaCMS / Tina Cloud – Dennis bearbeitet Inhalte unter `/admin`
- **Lokaler Ordner:** `~/Desktop/Developer.nosync/agentur/kunden/dennis-landwehr/website`
- **Material (nicht im Git):** `~/Desktop/Developer.nosync/agentur/kunden/dennis-landwehr/material`

> ⚠️ **Wartungsmodus aktiv** (seit 21.07.2026, bestätigt 24.09.2026): `src/middleware.ts` beantwortet
> Aufrufe über die echte Domain bzw. in Production mit einer Wartungsseite (Status 503).
> **Ausnahmen** (freigegeben 25.09.2026): Vorschau-Deployments, lokale Entwicklung, der Editor
> `/admin` und die Seitenvorschau im Editor (Vorschau-Cookie). Abgesichert durch
> `src/__tests__/middleware.test.ts`. Datei nicht ungefragt ändern oder löschen – Löschen schaltet
> die Website live.

## Stack

- Next.js 16 (App Router), React 19, TypeScript – **gleiche Versionen wie CL Concepts**
- Tailwind CSS 4 (Konfiguration in `src/app/globals.css`)
- **TinaCMS 3** (Tina Cloud) – Inhalte als JSON in `content/`, Bilder in `public/images/`
- Jest (`src/__tests__`), ESLint 9 (identisch mit CL Concepts), Prettier
- Node **22** (`.nvmrc`)

## Befehle

```bash
npm install
npm run dev          # Website http://localhost:3000 · Editor http://localhost:3000/admin
npm run lint
npm run typecheck
npm test
npm run build:local  # Produktionsbuild lokal (startet den Tina-Server mit)
npm run build        # = tinacms build && next build → nur im Hosting (braucht Tina-Cloud-Zugangsdaten)
npm run format       # Prettier
```

- Tina nutzt hier die Ports **4002** (GraphQL) und **9002** (Datenschicht), damit Dennis und CL
  Concepts gleichzeitig laufen können (CL: 4001/9000).
- **Nie bauen, während der Dev-Server läuft** – der Build überschreibt `.next`. Erst stoppen.

## Verzeichnisstruktur

```
content/                    INHALTE (von Dennis per Tina editierbar)
  einstellungen/allgemein.json  Kontaktdaten, Termin-Link, Menü, Fußzeile, gemeinsame Texte
  seiten/*.json                 Startseite, Leistungsübersicht, Studierende, Über mich, Kontakt
  leistungen/*.json             die fünf Leistungen (Kachel + Einzelseite)
  rechtliches/*.json            Impressum, Datenschutz, Rechtliche Hinweise
  rechner/rechner.json          Texte der beiden Rechner
tina/
  config.ts                 Tina-Schema: welche Felder der Editor anbietet
  fields.ts                 Bausteine des Schemas (Feldtypen, Abschnitte, FAQ)
  __generated__/            von Tina erzeugt – nicht von Hand bearbeiten
src/
  app/                      Seiten. page.tsx lädt Inhalte (Server), die Ansicht rendert sie
  app/leistungen/[slug]/    EINE Seite für alle fünf Leistungen
  components/views/         Seitenansichten mit Live-Vorschau (useTina)
  components/sections/      Seitenabschnitte (Hero, FAQ, Rechner …) – bekommen Inhalte als Props
  components/ui/RichText.tsx  Formatierungskürzel (**fett**, [Link](url), {{email}} …)
  config/                   site.ts, services.ts, navigation.ts – lesen aus content/
  lib/content.ts            statischer Zugriff auf content/ + Platzhalter ({{name}} …)
  lib/tina.ts               Seiteninhalte über den Tina-Client (für die Live-Vorschau)
  middleware.ts             Wartungsmodus mit Ausnahmen
public/images/              Fotos und Illustrationen (= Tina-Mediathek)
docs/                       Projektdokumentation
```

## TinaCMS-Regeln (besonders vorsichtig!)

- **Dennis darf alles Sichtbare ändern, aber keine Seiten anlegen oder löschen**
  (`allowedActions: { create: false, delete: false }` in allen Sammlungen).
- Links auf andere Seiten, IDs und Reihenfolgen sind im Editor ausgeblendet (`hidden(...)`),
  damit keine kaputten Links entstehen.
- **Schema-Änderungen** (`tina/config.ts`, `tina/fields.ts`): Felder **ergänzen** ist unkritisch.
  Felder **umbenennen/löschen** nur mit Zustimmung und gleichzeitiger Anpassung aller Dateien in
  `content/` – sonst bricht der Build oder Inhalte verschwinden.
- Nach Schema-Änderungen `npm run dev` starten (regeneriert `tina/__generated__`) und die Seite im
  Editor öffnen. `npm test` prüft Platzhalter und Links in allen Inhaltsdateien.
- Bausteine kommen aus Tina mit `__typename` („…BausteineAbsatz“), aus der Datei mit `_template`
  („absatz“) – `bausteinTyp()` in `lib/content.ts` versteht beides.
- Neue Leistung = nur mit Code-Änderung (Import in `lib/content.ts`) – bewusst so.
- Inhalte in `content/` gehören dem Kunden. Nur ändern, wenn es ausdrücklich gewünscht ist.
- Details: `docs/tina.md`.

## Regeln für Claude Code

### Allgemein

- **Bestehende Komponenten wiederverwenden**, bevor neue entstehen.
- Änderungen **so klein und nachvollziehbar wie möglich**.
- Nach jeder Code-Änderung: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build:local`.
- Keine neuen Abhängigkeiten ohne Rückfrage.
- Bestehende, fachlich unabhängige Probleme nicht ungefragt reparieren – nur benennen.

### Inhalte / Compliance (Finanzberatung!)

- Dennis ist **MLP-Berater**. Aussagen zu Produkten, Renditen, Versicherungen, Steuer oder Recht
  nicht erfinden oder zuspitzen. Neue fachliche Aussagen als „Freigabe durch Dennis/MLP nötig“ markieren.
- Rechtstexte sind **ungeprüfte Platzhalter** (`siteConfig.legalNotice.pendingReview`).
- Keine Siegel, Auszeichnungen, Testimonials oder MLP-Logos ohne Freigabe.
- Rechenannahmen der Rechner (75 % Bedarf, 30 % gesetzlich) stehen im Code, nicht im CMS.
- Kein Tracking/Analytics ohne Einwilligungslösung und angepasste Datenschutzerklärung.

### Git

- `main` = **Production**. Jeder Merge auf `main` geht sofort live (Vercel).
- Speicherungen im Tina-Editor erzeugen **Commits direkt auf `main`** – vor eigener Arbeit immer
  `main` aktualisieren.
- Arbeit in Branches: `feature/…`, `fix/…`, `chore/…`, `docs/…`. Nie direkt auf `main` committen.
- Commit-Nachrichten: `typ: kurze Beschreibung auf Deutsch`.
- Keine destruktiven Befehle ohne ausdrückliche Zustimmung. Details: `docs/git-workflow.md`.

### Automatische Prüfung (CI)

- `.github/workflows/ci.yml` ist **in allen Agentur-Projekten identisch** – nur gemeinsam ändern.
- Läuft bei jedem Pull Request und auf `main`: `npm ci` → `lint` → `typecheck` → `test` → `build:local`.
- Ein Pull Request wird erst gemergt, wenn der Check **„Prüfung“ grün** ist.

### Deployment & Sicherheit

- **Niemals ungefragt Production verändern** (kein Merge auf `main`, kein Deploy, keine Änderungen an
  Vercel, Tina Cloud oder DNS ohne ausdrücklichen Auftrag).
- **DNS bei Strato:** nur Web-Einträge (A/CNAME). **MX/SPF/DKIM/DMARC nie anfassen.**
- Secrets (`TINA_TOKEN`) nur in `.env` (lokal, ignoriert) bzw. im Hosting. Vorlage: `.env.example`.
- `X-Frame-Options: SAMEORIGIN` ist nötig, weil der Editor die Seite in einem Rahmen der eigenen
  Domain zeigt. Nicht auf `DENY` zurückstellen.

## Bekannte Eigenheiten

- `src/middleware.ts`: In Next.js 16 heißt die Datei offiziell `proxy.ts`; `middleware.ts`
  funktioniert noch (Warnung beim Build). Nicht ungefragt umbenennen.
- Einstellungen, Leistungs-Kacheln und Rechner-Texte werden beim Build direkt aus `content/`
  gelesen (keine Live-Vorschau dafür) – Änderungen erscheinen nach dem Speichern.
- Bilder von Unsplash sind in `next.config.ts` freigegeben (`images.remotePatterns`).
