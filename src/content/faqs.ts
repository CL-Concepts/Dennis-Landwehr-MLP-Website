import { staticPages } from "@/lib/content";

/** Häufige Fragen – gepflegt im CMS auf der jeweiligen Seite. */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: "allgemein" | "studierende" | "aerzte" | "praxis" | string;
};

export const homepageFaqs: FaqItem[] = staticPages.startseite.faq.items;
export const studyFaqs: FaqItem[] = staticPages.studierende.faq.items;
