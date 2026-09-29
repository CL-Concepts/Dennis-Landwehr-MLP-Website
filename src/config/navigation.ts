import { siteConfig } from "./site";
import { settings } from "@/lib/content";

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  href: string;
  children?: NavItem[];
};

/** Hauptmenü – Beschriftungen im CMS (Einstellungen → Hauptmenü), Ziele fest. */
export const mainNav: NavGroup[] = settings.navigation.map((g) => ({
  label: g.label,
  href: g.href,
  ...(g.children.length ? { children: g.children } : {}),
}));

export const footerNav = {
  legal: settings.footer.legalLinks,
  contact: [
    { label: siteConfig.phoneFormatted, href: `tel:+49${siteConfig.phone}` },
    { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ],
  external: [
    {
      label: "MLP-Beraterprofil",
      href: siteConfig.mlpProfileUrl,
      external: true,
    },
  ],
};
