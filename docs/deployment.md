# Deployment & Rollback – Dennis Landwehr Website

## Wer deployt?

**Vercel**, automatisch. Es gibt keinen manuellen Deploy-Befehl.

| Ereignis              | Ergebnis                                                        |
| --------------------- | --------------------------------------------------------------- |
| Push auf einen Branch | Vorschau-Deployment mit eigener URL (nicht öffentlich verlinkt) |
| Merge/Push auf `main` | Production-Deployment → https://dennis-landwehr.com             |

## Welcher Stand ist gerade live?

- **Vercel** → Projekt → _Deployments_: Der oberste Eintrag mit dem Label **Production / Current**
  zeigt Commit-Hash, Commit-Nachricht, Branch und Zeitpunkt.
- **GitHub** → Repository → rechts _Deployments_ bzw. _Environments_ → „Production“.
- Welche Version vorher live war: in derselben Vercel-Liste der nächste Production-Eintrag darunter.

## Neue Version veröffentlichen

Pull Request auf GitHub mergen (siehe `git-workflow.md`). Nach 1–2 Minuten prüfen:

```bash
curl -I https://dennis-landwehr.com
```

## Rollback (etwas ist kaputt gegangen)

**Schnell (Sekunden):** Vercel → _Deployments_ → letztes funktionierendes Production-Deployment →
Menü „…“ → **Instant Rollback**.

> Achtung: Nach einem Instant Rollback veröffentlicht Vercel neue Merges auf `main` **nicht mehr
> automatisch**, bis du den Rollback wieder aufhebst (_Undo Rollback_ oder ein Deployment manuell
> „Promote to Production“). Das ist Absicht – damit nicht der kaputte Stand gleich wieder live geht.

**Sauber (dauerhaft):** den fehlerhaften Commit rückgängig machen – in GitHub Desktop Rechtsklick auf
den Commit → _Revert Changes in Commit_ → als Pull Request mergen. So bleibt die Historie nachvollziehbar.

## Wartungsmodus

Zustand seit 21.07.2026: **aktiv**. Die echte Domain (und Production allgemein) liefert eine
Wartungsseite mit Status 503.

**Ausnahmen** (seit 25.09.2026): Vorschau-Deployments, lokale Entwicklung, der Editor `/admin` und
die Seitenvorschau im Editor. Abgesichert durch `src/__tests__/middleware.test.ts`.

- **Aus:** `src/middleware.ts` in einem Branch löschen → Pull Request → Merge.
- **An:** die Datei aus der Git-Historie wiederherstellen.

Längerer Wartungsmodus (Wochen) schadet dem Google-Ranking; 503 ist nur für kurze Auszeiten gedacht.

## Tina Cloud (Voraussetzung für jeden Build)

`npm run build` braucht die Tina-Zugangsdaten (siehe `docs/environments.md`). Fehlen sie, schlägt der
Vercel-Build fehl – die bisherige Version bleibt online. Einrichtung: `docs/tina.md`.

## Domain & SSL

- Domain `dennis-landwehr.com` ist bei **Strato** registriert (Konto CL Concepts) und zeigt per DNS auf Vercel; SSL stellt Vercel automatisch aus.
- Bei Strato nur die Web-Einträge (A/CNAME) ändern – MX/SPF/DKIM/DMARC nie anfassen.
- Verwaltung: Vercel → Projekt → _Settings → Domains_.

## Logs

Vercel → Projekt → _Deployments_ → Deployment anklicken → _Build Logs_ (Bauvorgang) bzw.
_Logs_ (Laufzeit).

## Node-Version

Lokal: `.nvmrc` (22). In Vercel unter _Settings → Build & Development → Node.js Version_ ebenfalls
**22.x** einstellen, damit lokal und live gleich gebaut wird.
