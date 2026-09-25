# TinaCMS – Dennis Landwehr Website

## Wo ist was?

| Was                            | Wo                                                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------- |
| Schema (welche Felder es gibt) | `tina/config.ts`, Bausteine in `tina/fields.ts`                                                     |
| Inhalte                        | `content/` – eine JSON-Datei pro Seite bzw. Leistung                                                |
| Bilder                         | `public/images/` (Tina-Mediathek)                                                                   |
| Editor                         | `/admin` – wird beim Build nach `public/admin` erzeugt (nicht im Git)                               |
| Datenzugriff im Code           | `src/lib/content.ts` (direkt aus den Dateien), `src/lib/tina.ts` (über Tina, für die Live-Vorschau) |

## Was sieht Dennis im Editor?

| Bereich im Editor                   | Inhalt                                                                                       | Live-Vorschau               |
| ----------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------- |
| Einstellungen                       | Name, Telefon, E-Mail, Adresse, Termin-Link, Menü-Beschriftungen, Fußzeile, gemeinsame Texte | nach dem Speichern          |
| Startseite                          | alle Abschnitte inkl. Karrierephasen und Fragen                                              | ja                          |
| Leistungen (Übersichtsseite)        | Überschriften, Karrierephasen-Texte                                                          | ja                          |
| Leistungen (Einzelseiten)           | Kachel-Texte, Seiteninhalt in Abschnitten, „Auf einen Blick“, Fragen, Rechner-Auswahl        | ja (Kacheln nach Speichern) |
| Für Studierende, Über mich, Kontakt | alle Texte und Bilder                                                                        | ja                          |
| Rechtstexte                         | Impressum, Datenschutz, Rechtliche Hinweise                                                  | ja                          |
| Rechner (Texte)                     | Überschriften, Beschriftungen, Erklärtexte                                                   | nach dem Speichern          |

**Nicht möglich (bewusst):** neue Seiten anlegen, Seiten löschen oder umbenennen, Links auf andere
Seiten ändern. Dafür ist die Agentur zuständig.

## Kürzel in Textfeldern

- `**fett**` → **fett**
- `[Linktext](https://adresse.de)` → Link (externe Adressen öffnen in neuem Tab)
- Neue Zeile im Feld → Zeilenumbruch; Leerzeile → neuer Absatz (wo angegeben)
- Platzhalter werden automatisch aus den Einstellungen ersetzt:
  `{{name}}`, `{{berufsbezeichnung}}`, `{{stadt}}`, `{{telefon}}`, `{{email}}`,
  `{{strasse}}`, `{{plz}}`, `{{ort}}`, `{{land}}`.
  So bleiben z. B. Impressum und Datenschutz automatisch aktuell, wenn sich die Telefonnummer ändert.

## Wie kommen Änderungen aus dem Editor auf die Website?

1. Dennis öffnet `https://dennis-landwehr.com/admin` und meldet sich bei Tina Cloud an.
2. Er ändert Inhalte und klickt _Speichern_.
3. Tina Cloud schreibt einen **Commit auf `main`** im GitHub-Repository.
4. Vercel baut die Seite neu (1–2 Minuten).

Solange der **Wartungsmodus** aktiv ist, sieht die Öffentlichkeit weiterhin die Wartungsseite.
Editor und Vorschau im Editor funktionieren trotzdem (Ausnahme in `src/middleware.ts`).

## Welches Environment nutzt Tina?

Branch aus `NEXT_PUBLIC_TINA_BRANCH`, sonst der Vercel-Branch, sonst `main` (`tina/config.ts`).

## Wer darf in den Editor?

Die Editor-Seite ist öffentlich abrufbar, aber ohne Anmeldung bei Tina Cloud sieht und speichert niemand
etwas. Zugriff: Tina Cloud → Projekt → _Collaborators_. Dennis bekommt nur Zugriff auf dieses Projekt.

## Einmalige Einrichtung (Tina Cloud)

1. app.tina.io → mit GitHub (Konto CL-Concepts) anmelden → _Create project_ → Repository
   `Dennis-Landwehr-MLP-Website` wählen, Branch `main`.
2. Client-ID und Read-Only-Token notieren (Overview / Tokens).
3. In Vercel → Projekt → _Settings → Environment Variables_ eintragen (siehe `docs/environments.md`).
4. Unter _Collaborators_ Dennis einladen.

## Schema sicher ändern

- Felder **hinzufügen**: unkritisch.
- Felder/Bausteine **umbenennen oder löschen**: alle Dateien in `content/` mit anpassen.
- Danach `npm run dev`, Seite im Editor öffnen, `npm test` (prüft Platzhalter und Links).

## Beim Build

Seiten werden beim Build fertig erzeugt. Ist Tina Cloud nicht erreichbar oder sind die Zugangsdaten
falsch, **bricht der Build mit klarer Meldung ab** – die bisherige Version bleibt online.
Lokal: `npm run build:local` (startet den Tina-Server mit).
