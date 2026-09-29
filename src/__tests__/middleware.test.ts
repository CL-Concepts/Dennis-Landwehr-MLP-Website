/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

/** Wartungsmodus: Wer bekommt die Wartungsseite (503), wer die echte Seite? */
function call(url: string, headers: Record<string, string> = {}) {
  return middleware(new NextRequest(url, { headers }));
}

describe("Wartungsmodus (src/middleware.ts)", () => {
  const LIVE = "https://dennis-landwehr.com";
  const originalEnv = process.env.VERCEL_ENV;
  afterEach(() => {
    process.env.VERCEL_ENV = originalEnv;
  });

  it("zeigt auf der echten Domain die Wartungsseite", () => {
    expect(call(`${LIVE}/`).status).toBe(503);
    expect(call(`${LIVE}/leistungen/berufshaftpflicht-mediziner`).status).toBe(503);
    expect(call("https://www.dennis-landwehr.com/").status).toBe(503);
  });

  it("zeigt in Production auch über andere Adressen die Wartungsseite", () => {
    process.env.VERCEL_ENV = "production";
    expect(call("https://projekt.vercel.app/").status).toBe(503);
  });

  it("lässt Vorschau-Deployments und lokale Entwicklung durch", () => {
    process.env.VERCEL_ENV = "preview";
    expect(call("https://projekt-git-feature.vercel.app/").status).toBe(200);
    delete process.env.VERCEL_ENV;
    expect(call("http://localhost:3000/").status).toBe(200);
  });

  it("lässt den Tina-Editor durch", () => {
    expect(call(`${LIVE}/admin`).status).toBe(200);
    expect(call(`${LIVE}/admin/index.html`).status).toBe(200);
  });

  it("lässt die Seitenvorschau im Editor-Rahmen durch und setzt das Vorschau-Cookie", () => {
    const res = call(`${LIVE}/`, {
      "sec-fetch-dest": "iframe",
      referer: `${LIVE}/admin/index.html`,
    });
    expect(res.status).toBe(200);
    expect(res.cookies.get("tina-vorschau")?.value).toBe("1");
    expect(call(`${LIVE}/images/x.jpeg`, { cookie: "tina-vorschau=1" }).status).toBe(200);
  });

  it("lässt fremde Rahmen und Rahmen außerhalb von /admin nicht durch", () => {
    expect(
      call(`${LIVE}/`, { "sec-fetch-dest": "iframe", referer: "https://fremd.de/admin" }).status
    ).toBe(503);
    expect(
      call(`${LIVE}/`, { "sec-fetch-dest": "iframe", referer: `${LIVE}/kontakt` }).status
    ).toBe(503);
    expect(call(`${LIVE}/`, { referer: `${LIVE}/admin/index.html` }).status).toBe(503);
  });
});
