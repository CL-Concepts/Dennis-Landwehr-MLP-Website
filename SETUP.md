# Setup-Checkliste – Dennis Landwehr Finanzberater-Website

## Vor der Veröffentlichung

### Pflicht – Konfiguration

- [ ] Termin-URL eingesetzt (`siteConfig.bookingUrl` in `src/config/site.ts`)
- [ ] Geschäftliche E-Mail bestätigt (`siteConfig.email`)
- [ ] Telefonnummer bestätigt (`siteConfig.phone`)
- [ ] Standort bestätigt (`siteConfig.address`)
- [ ] Berufsbezeichnung durch MLP bestätigt (`siteConfig.professionalTitle`)
- [ ] Domain und Canonical URL eingesetzt (`siteConfig.siteUrl`)

### Pflicht – Bilder

- [ ] Portrait von Dennis Landwehr bereitgestellt (freigegebenes Foto, kein KI-Bild)
- [ ] Hero-Bild bereitgestellt (`public/images/hero-mediziner.jpg`)
- [ ] Open-Graph-Bild bereitgestellt (`public/images/og-image.jpg`, 1200×630 px)
- [ ] Alle weiteren Bilder aus `IMAGE_PROMPTS.md` bereitgestellt

### Pflicht – Rechtliches

- [ ] Impressum juristisch geprüft und finalisiert
- [ ] Datenschutzerklärung juristisch geprüft und finalisiert
- [ ] Rechtliche Hinweise durch MLP-Compliance freigegeben
- [ ] Alle Inhalte durch Dennis und MLP-Compliance freigegeben
- [ ] MLP-Logo-Nutzung freigegeben (oder Logo nicht verwendet)
- [ ] Keine nicht freigegebenen Siegel, Auszeichnungen oder Testimonials

### Empfohlen – SEO und Technik

- [ ] Strukturierte Daten validiert (Google Rich Results Test)
- [ ] Mobile Darstellung geprüft (360, 390, 768, 1024, 1440 px)
- [ ] Lighthouse-Scores geprüft (Ziel: Performance ≥90, A11y ≥95, SEO ≥95)
- [ ] Sitemap unter `/sitemap.xml` erreichbar
- [ ] Robots-Datei unter `/robots.txt` erreichbar
- [ ] Alle internen Links funktionieren
- [ ] CTA-Links führen zur konfigurierten Booking-URL
- [ ] 404-Seite funktioniert korrekt

### Optional

- [ ] Analytics-Konfiguration geprüft (standardmäßig deaktiviert)
- [ ] Google Business Profil verknüpft (wenn vorhanden)
- [ ] Tracking-Konfiguration geprüft (nur nach Einwilligung)

---

## Installation

```bash
# Node.js ≥ 18 erforderlich
npm install
npm run dev
```

## Entwicklungsserver

```bash
npm run dev
# → http://localhost:3000
```

## Produktionsbuild

```bash
npm run build
npm start
```

## Konfiguration ändern

Alle zentralen Konfigurationswerte befinden sich in `src/config/site.ts`:

```ts
export const siteConfig = {
  name: "Dennis Landwehr",
  professionalTitle: "Finanzberater bei MLP",
  email: "dennis.landwehr@mlp.de",
  phone: "01754960247",
  bookingUrl: "https://onlineberatung.mlp.de/consultant/dennis.landwehr",
  // ...
};
```

## Terminlink ändern

Einzel-Änderung in `src/config/site.ts` → `bookingUrl`.
Alle CTAs werden automatisch aktualisiert.

## Bilder austauschen

1. Datei unter `public/images/` ablegen (AVIF oder WebP empfohlen)
2. Dateiname entsprechend `IMAGE_PROMPTS.md` wählen
3. Bei abweichendem Namen: Pfad im entsprechenden Abschnitt der Komponente anpassen

## Analytics aktivieren (optional)

Analytics ist standardmäßig deaktiviert. Bevor Analytics eingebunden wird:

1. Datenschutzerklärung entsprechend ergänzen
2. Einwilligungsmanagement implementieren
3. Erst nach wirksamer Einwilligung laden

## Deployment auf Vercel

```bash
npm i -g vercel
vercel deploy
```

Alternativ: Repository mit Vercel verbinden → automatisches Deployment bei Git-Push.

## Rechtliche Inhalte ersetzen

Platzhaltertexte in folgenden Dateien:

- `src/app/impressum/page.tsx`
- `src/app/datenschutz/page.tsx`
- `src/app/rechtliche-hinweise/page.tsx`
- `src/content/legal.ts`

Alle Platzhalter sind mit `[Platzhalter]` oder dem ⚠️-Symbol markiert.

---

## Offene Punkte (Platzhalter)

| Bereich          | Datei                                        | Was fehlt                                  |
| ---------------- | -------------------------------------------- | ------------------------------------------ |
| Impressum        | `src/app/impressum/page.tsx`                 | Vollständiger Rechtstext, Aufsichtsbehörde |
| Datenschutz      | `src/app/datenschutz/page.tsx`               | Vollständiger Rechtstext, Hosting-Anbieter |
| Rechtl. Hinweise | `src/app/rechtliche-hinweise/page.tsx`       | MLP-Compliance-Freigabe                    |
| Portrait         | `public/images/dennis-landwehr-portrait.jpg` | Foto bereitstellen                         |
| Hero-Bild        | `public/images/hero-mediziner.jpg`           | Bild bereitstellen                         |
| OG-Bild          | `public/images/og-image.jpg`                 | Bild bereitstellen (1200×630)              |
| JAEG-Grenzwert   | `src/config/sources.ts`                      | Aktuellen Wert mit Quelle eintragen        |
| Domain           | `src/config/site.ts` → `siteUrl`             | Produktionsdomain eintragen                |
