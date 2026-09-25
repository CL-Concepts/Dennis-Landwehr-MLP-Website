# Architektur – Dennis Landwehr Website

## In einem Satz

Eine statisch vorgerenderte Next.js-Website, deren Inhalte komplett im Code stehen; GitHub speichert
den Code, Vercel baut und veröffentlicht ihn automatisch.

## Bild

```
 Entwickler (Claude Code, lokal)
        │  git push (Branch)
        ▼
 GitHub  ── Repository "Dennis-Landwehr-MLP-Website" (privat)
        │  Vercel beobachtet das Repository
        ▼
 Vercel  ── Branch  → Vorschau-URL (zum Prüfen)
        └─ main    → Production → https://dennis-landwehr.com
```

## Bausteine

| Teil          | Wo                                    | Wozu                                                     |
| ------------- | ------------------------------------- | -------------------------------------------------------- |
| Next.js 16    | `src/app`                             | erzeugt die Seiten                                       |
| Stammdaten    | `src/config/site.ts`                  | Name, Kontakt, Termin-Link, Domain – an **einer** Stelle |
| Inhalte       | `src/config/*.ts`, `src/content/*.ts` | Leistungen, FAQ, Rechtstexte                             |
| Wartungsmodus | `src/middleware.ts`                   | fängt alle Anfragen ab → Status 503                      |
| Tests         | `src/__tests__`                       | prüfen Konfiguration, Termin-Links, strukturierte Daten  |
| Hosting       | Vercel                                | Build, SSL, Auslieferung, Vorschau-URLs, Rollback        |

## Bewusste Entscheidungen

- **Kein CMS**: Der Kunde pflegt keine Inhalte selbst; jede Änderung läuft über die Agentur.
  Das hält die Seite einfach und compliance-sicher (MLP-Freigaben).
- **Kein Tracking**: keine Cookies, kein Banner. Analytics erst nach Einwilligungslösung.
- **Security-Header** in `next.config.ts` (nosniff, DENY-Framing, Referrer-Policy).

## Kundentrennung

Dieses Repository enthält nur Daten von Dennis Landwehr. Es teilt keinen Code, keine Zugangsdaten und
kein Hosting-Projekt mit anderen Kunden.
