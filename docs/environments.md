# Umgebungen & Umgebungsvariablen – Dennis Landwehr Website

## Umgebungen

| Umgebung | Wo | Adresse |
|---|---|---|
| Local | eigener Mac, `npm run dev` | http://localhost:3000 |
| Preview (Staging) | Vercel, automatisch je Branch | `…vercel.app` (steht im Pull Request) |
| Production | Vercel, Branch `main` | https://dennis-landwehr.com |

## Umgebungsvariablen

Das Projekt benötigt **derzeit keine**. Alle Einstellungen stehen öffentlich unbedenklich in
`src/config/site.ts`.

Kommen später welche dazu (z. B. Analytics), gilt:

| Frage | Regel |
|---|---|
| Wo steht die Liste? | `.env.example` (ohne echte Werte, mit Kommentar) + Tabelle hier |
| Wo stehen echte Werte lokal? | `.env.local` – wird nie committet |
| Wo stehen echte Werte live? | Vercel → *Settings → Environment Variables*, getrennt nach Production/Preview |
| Öffentlich oder geheim? | Nur Variablen mit `NEXT_PUBLIC_` landen im Browser – dort **nie** Secrets |

Vorlage für neue Einträge:

| Name | Zweck | Local | Preview | Production | öffentlich/geheim | eintragen in |
|---|---|---|---|---|---|---|
| – | – | – | – | – | – | – |
