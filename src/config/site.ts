import { settings } from "@/lib/content";

/**
 * Zentrale Stammdaten.
 * Name, Kontakt, Adresse, Termin-Link usw. werden im CMS gepflegt
 * (Tina → „Einstellungen“, Datei content/einstellungen/allgemein.json).
 * Hier stehen nur die technischen Werte, die Dennis nicht ändern soll.
 */
export const siteConfig = {
  name: settings.name,
  professionalTitle: settings.professionalTitle,
  specialization: settings.specialization,
  city: settings.city,
  region: settings.region,
  phone: settings.phone,
  phoneFormatted: settings.phoneFormatted,
  email: settings.email,
  address: settings.address,
  bookingUrl: settings.bookingUrl,
  mlpProfileUrl: settings.mlpProfileUrl,
  description: settings.description,
  // --- technisch, nur im Code ---
  siteUrl: "https://dennis-landwehr.com",
  ogImage: "/images/og-image.jpg",
  twitterHandle: undefined,
  locale: "de_DE",
  legalNotice: {
    pendingReview: true,
    message:
      "Die Rechtstexte dieser Seite sind Platzhalter und wurden noch nicht juristisch geprüft. Vor Veröffentlichung ist eine anwaltliche Prüfung sowie die Compliance-Freigabe durch MLP erforderlich.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
