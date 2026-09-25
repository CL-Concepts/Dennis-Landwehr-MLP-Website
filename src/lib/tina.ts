import client from "../../tina/__generated__/client";

/**
 * Seiteninhalte über den Tina-Client laden (beim Build).
 * Lokal fragt der Client den Tina-Server (npm run dev / build:local),
 * im Hosting Tina Cloud. Das Ergebnis (query, variables, data) geht an die
 * Seitenansicht, die es mit useTina für die Live-Vorschau im Editor nutzt.
 *
 * Fehler werden bewusst nicht verschluckt: Ist Tina beim Build nicht
 * erreichbar, bricht der Build mit klarer Meldung ab und die bisherige
 * Version bleibt online.
 */

async function load<T>(what: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new Error(
      `[Tina] ${what} konnte nicht geladen werden: ${reason}\n` +
        "Lokal: `npm run dev` bzw. `npm run build:local` verwenden (startet den Tina-Server mit). " +
        "Im Hosting: NEXT_PUBLIC_TINA_CLIENT_ID, TINA_TOKEN und NEXT_PUBLIC_TINA_BRANCH prüfen."
    );
  }
}

export const getStartseite = () =>
  load("Startseite", () => client.queries.startseite({ relativePath: "startseite.json" }));
export const getLeistungsuebersicht = () =>
  load("Leistungsübersicht", () =>
    client.queries.leistungsuebersicht({ relativePath: "leistungen.json" })
  );
export const getLeistung = (slug: string) =>
  load(`Leistung ${slug}`, () => client.queries.leistung({ relativePath: `${slug}.json` }));
export const getStudierende = () =>
  load("Seite Studierende", () => client.queries.studierende({ relativePath: "studierende.json" }));
export const getUeberMich = () =>
  load("Seite Über mich", () => client.queries.ueberMich({ relativePath: "ueber-mich.json" }));
export const getKontakt = () =>
  load("Kontaktseite", () => client.queries.kontakt({ relativePath: "kontakt.json" }));
export const getRechtstext = (slug: string) =>
  load(`Rechtstext ${slug}`, () => client.queries.rechtstext({ relativePath: `${slug}.json` }));

/** Was eine Seitenansicht für useTina braucht. */
export type TinaResult<T> = { query: string; variables: object; data: T };
