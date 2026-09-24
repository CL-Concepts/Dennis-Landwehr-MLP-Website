# Git-Workflow – Dennis Landwehr Website

## Grundregel

**`main` ist die Live-Website.** Alles, was auf `main` landet, veröffentlicht Vercel automatisch auf
https://dennis-landwehr.com. Deshalb wird auf `main` nie direkt gearbeitet.

## Branches

| Branch | Zweck | Beispiel |
|---|---|---|
| `main` | Production | – |
| `feature/…` | neue Inhalte oder Funktionen | `feature/neue-leistung-praxisgruendung` |
| `fix/…` | Fehlerbehebung | `fix/telefonnummer-footer` |
| `chore/…` | Wartung, Updates, Konfiguration | `chore/next-update` |
| `docs/…` | nur Dokumentation | `docs/rollback-anleitung` |

Einen dauerhaften `staging`-Branch gibt es **nicht**. Stattdessen erzeugt Vercel für jeden Branch eine
eigene Vorschau-URL – das ist die Testumgebung.

## Ablauf einer Änderung

1. `main` aktualisieren (GitHub Desktop: *Fetch origin* → *Pull*).
2. Neuen Branch anlegen (GitHub Desktop: *Current Branch → New Branch*).
3. Änderung mit Claude Code umsetzen; lokal prüfen:
   `npm run lint && npm run typecheck && npm test && npm run build`
4. Committen und *Publish branch* / *Push*.
5. Auf GitHub **Pull Request** öffnen – die Vorlage mit Checkliste erscheint automatisch.
6. Vercel-Vorschau im Pull Request öffnen und prüfen.
7. **Merge** → geht live. Branch danach löschen (GitHub bietet den Button an).

## Commit-Nachrichten

Format: `typ: kurze Beschreibung auf Deutsch`

- `feat:` neue Funktion / neuer Inhalt
- `fix:` Fehlerbehebung
- `chore:` Wartung, Abhängigkeiten, Konfiguration
- `docs:` nur Dokumentation

Beispiel: `fix: Termin-Link auf neue MLP-URL umgestellt`

## Was nie ohne ausdrückliche Zustimmung passiert

`git push --force`, `git reset --hard`, Löschen von Branches mit ungemergter Arbeit, direkte Commits auf `main`.

## Hinweis zum Schutz von `main`

GitHub kann `main` technisch sperren („Branch protection“ / „Rulesets“). Bei **privaten** Repositories
ist das nur mit einem bezahlten GitHub-Tarif (Pro/Team) verfügbar. Bis dahin gilt die Regel als
Arbeitsvereinbarung und steht in `CLAUDE.md`.
