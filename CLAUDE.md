# CLAUDE.md – Dennis Landwehr, Finanzberater-Website

Dieses Repository gehört **ausschließlich** zum Kunden **Dennis Landwehr** (Finanzberater bei MLP,
Hannover). Es hat nichts mit anderen Kundenprojekten der Agentur zu tun – keine Inhalte, Komponenten,
Farben oder Zugangsdaten aus anderen Projekten übernehmen.

- **Live-Domain:** https://dennis-landwehr.com
- **GitHub:** `CL-Concepts/Dennis-Landwehr-MLP-Website` (privat)
- **Hosting:** Vercel – deployt automatisch bei jedem Push/Merge auf `main`
- **Lokaler Ordner:** `~/Developer/agentur/kunden/dennis-landwehr/website`
- **Material (nicht im Git):** `~/Developer/agentur/kunden/dennis-landwehr/material`

> ⚠️ **Aktueller Sonderzustand:** Die Live-Seite ist seit 21.07.2026 im **Wartungsmodus**
> (`src/middleware.ts` beantwortet alle Anfragen mit Status 503). **Bleibt auf Wunsch bis auf Weiteres
> aktiv** (bestätigt 24.09.2026). Datei nicht ändern oder löschen, ohne dass es ausdrücklich verlangt
> wird – das Löschen schaltet die Website wieder live.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (Konfiguration über `src/app/globals.css` + `@tailwindcss/postcss`)
- Jest + Testing Library (`src/__tests__`)
- ESLint 9 (Flat Config), Prettier
- **Kein CMS.** Alle Inhalte stehen im Code (siehe unten). Der Kunde bearbeitet nichts selbst.
- Node **22** (`.nvmrc`)

## Befehle

```bash
npm install          # einmalig bzw. nach Änderungen an package-lock.json
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm test
npm run build        # Produktionsbuild
npm run format       # Prettier
```

**Nie `npm run build` ausführen, während der Dev-Server läuft** – der Build überschreibt `.next`, der
laufende Dev-Server liefert danach 404 auf seine CSS-/JS-Dateien. Erst stoppen, dann bauen.

## Verzeichnisstruktur

```
src/
  app/                 Seiten (App Router) – jede Route ein Ordner mit page.tsx
  components/
    layout/            Header, Footer, StickyMobileCta
    sections/          Seitenabschnitte (Hero, FAQ, ServicesOverview …)
    ui/                kleine Bausteine (BookingLink, Reveal, SectionHeading …)
    seo/               JsonLd
  config/
    site.ts            ZENTRALE Stammdaten: Name, Telefon, E-Mail, Adresse, Termin-URL, Domain
    services.ts        Leistungen (Titel, Texte, Links)
    navigation.ts      Menü
    sources.ts         Quellenangaben für Zahlen/Grenzwerte
  content/             faqs.ts, legal.ts (Rechtstexte – Platzhalter!)
  lib/                 booking.ts, metadata.ts, schema.ts (strukturierte Daten)
  middleware.ts        Wartungsmodus (siehe oben)
  __tests__/           Tests für Konfiguration, Booking-Links, Schema
public/images/         Fotos und Illustrationen
docs/                  Projektdokumentation (Architektur, Deployment, Git, Umgebungen)
```

## Wo ändere ich was?

| Wunsch | Datei |
|---|---|
| Telefon, E-Mail, Adresse, Termin-Link | `src/config/site.ts` |
| Leistungstexte | `src/config/services.ts` bzw. `src/app/leistungen/*/page.tsx` |
| FAQ | `src/content/faqs.ts` |
| Rechtstexte | `src/content/legal.ts`, `src/app/impressum`, `datenschutz`, `rechtliche-hinweise` |
| Menü | `src/config/navigation.ts` |

## Regeln für Claude Code

### Allgemein
- **Bestehende Komponenten wiederverwenden** (`components/ui`, `components/sections`), bevor neue entstehen.
- Änderungen **so klein und nachvollziehbar wie möglich**. Keine Umbauten „nebenbei“.
- Nach jeder Code-Änderung: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- Keine neuen Abhängigkeiten ohne Rückfrage (vorher Zweck und Alternative nennen).
- Bestehende, fachlich unabhängige Probleme nicht ungefragt „mitreparieren“ – nur benennen.

### Inhalte / Compliance (Finanzberatung!)
- Dennis ist **MLP-Berater**. Aussagen zu Produkten, Renditen, Versicherungen, Steuer oder Recht
  nicht erfinden oder zuspitzen. Neue fachliche Aussagen immer als „Freigabe durch Dennis/MLP nötig“ markieren.
- `siteConfig.legalNotice.pendingReview` ist `true`: Rechtstexte sind **ungeprüfte Platzhalter**.
- Keine Siegel, Auszeichnungen, Testimonials oder MLP-Logos ohne Freigabe.
- Zahlen/Grenzwerte immer mit Quelle in `src/config/sources.ts`.
- Kein Tracking/Analytics ohne Einwilligungslösung und angepasste Datenschutzerklärung.

### Git
- `main` = **Production**. Jeder Merge auf `main` geht sofort live (Vercel).
- **Nie direkt auf `main` committen.** Arbeiten in Branches: `feature/…`, `fix/…`, `chore/…`, `docs/…`.
- Commit-Nachrichten: `typ: kurze Beschreibung auf Deutsch` (z. B. `fix: Telefonnummer im Footer korrigiert`).
- Keine destruktiven Befehle (`push --force`, `reset --hard`, Branch löschen) ohne ausdrückliche Zustimmung.
- Details: `docs/git-workflow.md`.

### Deployment
- **Niemals ungefragt Production verändern** – also nicht auf `main` pushen/mergen, keinen Vercel-Deploy
  auslösen und nichts am Vercel-Projekt ändern, ohne dass es ausdrücklich verlangt wird.
- Jeder Branch bekommt bei Vercel automatisch eine Vorschau-URL – dort prüfen, dann mergen.
- Rollback: `docs/deployment.md`.

### Sicherheit & Umgebungsvariablen
- Das Projekt nutzt derzeit **keine** Umgebungsvariablen (siehe `.env.example`, `docs/environments.md`).
- Nie Secrets, Tokens oder Passwörter in Code, Commits oder Doku schreiben. `.env*` ist ignoriert.
- Security-Header stehen in `next.config.ts` – nicht abschwächen.

## Bekannte Eigenheiten

- `src/middleware.ts`: In Next.js 16 heißt die Datei offiziell `proxy.ts`; `middleware.ts`
  funktioniert noch (veraltet). Nicht ungefragt umbenennen.
- Bilder von Unsplash sind in `next.config.ts` freigegeben (`images.remotePatterns`).

## Beschlossene nächste Schritte (24.09.2026)

- **TinaCMS wird eingeführt.** Dennis darf alles bearbeiten, was im Frontend sichtbar ist (Texte,
  Bilder, Grafiken) – aber **keine Seiten anlegen oder löschen** (`allowedActions: { create: false, delete: false }`).
- **Wartungsmodus-Ausnahmen:** `/admin` und Vorschau-Deployments (`VERCEL_ENV !== "production"`)
  werden vom Wartungsmodus ausgenommen; die öffentliche Seite bleibt gesperrt.
- **Hosting:** Vercel-Team „CL Concepts“ mit Pro-Tarif (kommerzielle Nutzung).
- **Domain:** `dennis-landwehr.com` liegt bei **Strato**, verwaltet über das Konto von CL Concepts – bleibt so.
