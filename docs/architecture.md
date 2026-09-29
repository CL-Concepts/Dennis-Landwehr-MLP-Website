# Architektur – Dennis Landwehr Website

## In einem Satz

Eine statisch vorgerenderte Next.js-Website, deren Inhalte als JSON-Dateien im Repository liegen und
über den Editor TinaCMS bearbeitet werden; GitHub speichert alles, Vercel baut und veröffentlicht es.

## Bild

```
 Code-Änderung                          Inhalts-Änderung
 (Claude Code, lokal)                   (Dennis im Editor /admin)
        │ git push (Branch → PR)                │ Speichern
        ▼                                       ▼
 GitHub ── "CL-Concepts/Dennis-Landwehr-MLP-Website" ◄── Tina Cloud schreibt Commit auf main
        │ Vercel beobachtet das Repository
        ▼
 Vercel ── Branch → Vorschau-URL (zum Prüfen)
        └─ main   → Production → https://dennis-landwehr.com  (zurzeit Wartungsseite)
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

- **Feste Seitenstruktur im CMS**: Dennis ändert alle sichtbaren Texte und Bilder, kann aber keine
  Seiten anlegen, löschen oder Links umbiegen. Aufbau und Gestaltung bleiben bei der Agentur.
- **Statische Seiten**: Inhalte werden beim Build eingelesen – schnell und unabhängig davon, ob Tina
  Cloud gerade erreichbar ist.
- **Kein Tracking**: keine Cookies, kein Banner. Analytics erst nach Einwilligungslösung.
- **Security-Header** in `next.config.ts` (nosniff, DENY-Framing, Referrer-Policy).

## Kundentrennung

Dieses Repository enthält nur Daten von Dennis Landwehr. Es teilt keinen Code, keine Zugangsdaten und
kein Hosting-Projekt mit anderen Kunden.
