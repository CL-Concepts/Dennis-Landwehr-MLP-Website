# Umgebungen & Umgebungsvariablen – Dennis Landwehr Website

## Umgebungen

| Umgebung   | Wo                         | Adresse                                   | Wartungsmodus                               |
| ---------- | -------------------------- | ----------------------------------------- | ------------------------------------------- |
| Local      | eigener Mac, `npm run dev` | http://localhost:3000 (`/admin` = Editor) | aus                                         |
| Preview    | Vercel, je Branch          | `…vercel.app` (steht im Pull Request)     | aus                                         |
| Production | Vercel, `main`             | https://dennis-landwehr.com               | **an** (außer `/admin` und Editor-Vorschau) |

## Variablen

| Name                         | Zweck                                 | Local     | Preview      | Production | öffentlich/geheim | eintragen in                              |
| ---------------------------- | ------------------------------------- | --------- | ------------ | ---------- | ----------------- | ----------------------------------------- |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | ID des Tina-Cloud-Projekts            | optional¹ | ja           | ja         | öffentlich        | Vercel → Settings → Environment Variables |
| `TINA_TOKEN`                 | Read-Only-Token zum Lesen der Inhalte | optional¹ | ja           | ja         | **geheim**        | Vercel (nie ins Git)                      |
| `NEXT_PUBLIC_TINA_BRANCH`    | aus welchem Git-Branch Tina liest     | –         | leer lassen² | `main`     | öffentlich        | Vercel                                    |

¹ Lokal läuft Tina ohne Cloud gegen die Dateien in `content/`.
² Ohne Wert nimmt `tina/config.ts` bei Vercel automatisch den Branch des Deployments.

Von Vercel automatisch gesetzt und im Code genutzt: `VERCEL_ENV` (Wartungsmodus: nur bei
`production` aktiv, zusätzlich immer über die echte Domain).

Herkunft der Tina-Werte: app.tina.io → Projekt → _Overview / Tokens_. Vorlage: `.env.example`.

> **Wichtig:** Ohne diese Variablen schlägt jeder Vercel-Build fehl (auch Vorschauen), weil
> `npm run build` Tina Cloud braucht. Die bisherige Version bleibt dann online.
