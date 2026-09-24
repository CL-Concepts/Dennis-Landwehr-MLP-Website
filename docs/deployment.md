# Deployment & Rollback – Dennis Landwehr Website

## Wer deployt?

**Vercel**, automatisch. Es gibt keinen manuellen Deploy-Befehl.

| Ereignis | Ergebnis |
|---|---|
| Push auf einen Branch | Vorschau-Deployment mit eigener URL (nicht öffentlich verlinkt) |
| Merge/Push auf `main` | Production-Deployment → https://dennis-landwehr.com |

## Welcher Stand ist gerade live?

- **Vercel** → Projekt → *Deployments*: Der oberste Eintrag mit dem Label **Production / Current**
  zeigt Commit-Hash, Commit-Nachricht, Branch und Zeitpunkt.
- **GitHub** → Repository → rechts *Deployments* bzw. *Environments* → „Production“.
- Welche Version vorher live war: in derselben Vercel-Liste der nächste Production-Eintrag darunter.

## Neue Version veröffentlichen

Pull Request auf GitHub mergen (siehe `git-workflow.md`). Nach 1–2 Minuten prüfen:

```bash
curl -I https://dennis-landwehr.com
```

## Rollback (etwas ist kaputt gegangen)

**Schnell (Sekunden):** Vercel → *Deployments* → letztes funktionierendes Production-Deployment →
Menü „…“ → **Instant Rollback**.

> Achtung: Nach einem Instant Rollback veröffentlicht Vercel neue Merges auf `main` **nicht mehr
> automatisch**, bis du den Rollback wieder aufhebst (*Undo Rollback* oder ein Deployment manuell
> „Promote to Production“). Das ist Absicht – damit nicht der kaputte Stand gleich wieder live geht.

**Sauber (dauerhaft):** den fehlerhaften Commit rückgängig machen – in GitHub Desktop Rechtsklick auf
den Commit → *Revert Changes in Commit* → als Pull Request mergen. So bleibt die Historie nachvollziehbar.

## Wartungsmodus

Zustand seit 21.07.2026: **aktiv** (alle Seiten liefern eine Wartungsseite mit Status 503).

- **Aus:** `src/middleware.ts` in einem Branch löschen → Pull Request → Merge.
- **An:** die Datei aus dem Commit `608cc26` wiederherstellen (`git checkout 608cc26 -- src/middleware.ts`).

Längerer Wartungsmodus (Wochen) schadet dem Google-Ranking; 503 ist nur für kurze Auszeiten gedacht.

## Domain & SSL

- Domain `dennis-landwehr.com` zeigt per DNS auf Vercel; SSL-Zertifikat stellt Vercel automatisch aus.
- Verwaltung: Vercel → Projekt → *Settings → Domains*.

## Logs

Vercel → Projekt → *Deployments* → Deployment anklicken → *Build Logs* (Bauvorgang) bzw.
*Logs* (Laufzeit).

## Node-Version

Lokal: `.nvmrc` (22). In Vercel unter *Settings → Build & Development → Node.js Version* ebenfalls
**22.x** einstellen, damit lokal und live gleich gebaut wird.
