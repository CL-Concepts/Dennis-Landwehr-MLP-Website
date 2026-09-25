<!-- Projekt: Dennis Landwehr – Finanzberater-Website (dennis-landwehr.com) -->

## Was ändert sich?

<!-- 1–3 Sätze. Was sieht der Besucher danach anders? -->

## Warum?

<!-- Kundenwunsch, Fehler, Wartung … -->

## Art der Änderung

- [ ] `feat` – neue Funktion / neuer Inhalt
- [ ] `fix` – Fehlerbehebung
- [ ] `chore` – Wartung, Abhängigkeiten, Konfiguration
- [ ] `docs` – nur Dokumentation

## Geprüft

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Vercel-Vorschau dieses Branches angesehen (Link: …)
- [ ] Mobil geprüft (≈ 390 px Breite)

## Besondere Vorsicht

- [ ] Betrifft Rechtstexte / MLP-Compliance-relevante Aussagen → **Freigabe durch Dennis/MLP nötig**
- [ ] Betrifft `src/middleware.ts` (Wartungsmodus) → Wirkung auf die Live-Seite bewusst geprüft
- [ ] Keine Secrets, keine `.env`-Dateien im Commit

## Rollback

Nach dem Merge: Falls etwas schiefgeht → Vercel → Deployments → vorheriges Deployment → „Instant Rollback“.
Details: `docs/deployment.md`.
