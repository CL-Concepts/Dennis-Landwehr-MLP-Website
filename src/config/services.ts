import { leistungen, staticPages } from "@/lib/content";

/**
 * Leistungen und Karrierephasen – gepflegt im CMS
 * (Tina → „Leistungen (Einzelseiten)“ bzw. „Startseite → Karrierephasen“).
 */
export type Service = {
  id: string;
  title: string;
  slug: string;
  href: string;
  shortText: string;
  highlights: string[];
  ctaText: string;
  iconName: string;
};

export const services: Service[] = leistungen.map((l) => ({
  id: l.slug.replace(/-mediziner$/, ""),
  title: l.title,
  slug: l.slug,
  href: `/leistungen/${l.slug}`,
  shortText: l.shortText,
  highlights: l.highlights,
  ctaText: l.ctaText,
  iconName: l.icon,
}));

export type CareerPhase = {
  id: string;
  label: string;
  description: string;
  detail: string;
  topics: string[];
  href: string;
  hrefLabel: string;
};

export const careerPhases: CareerPhase[] = staticPages.startseite.career.phases;
