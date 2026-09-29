import type { FaqItem } from "@/content/faqs";
import type { FaqEntry } from "@/lib/content";

/**
 * Fragen aus dem CMS in das Format der FAQ-Komponente bringen.
 * Neu angelegte Fragen haben noch keine ID – dann wird eine aus der Position gebildet.
 */
export function toFaqs(items: (FaqEntry | null)[] | null | undefined, prefix: string): FaqItem[] {
  return (items || [])
    .filter((f): f is FaqEntry => Boolean(f?.question && f?.answer))
    .map((f, i) => ({
      id: f.id || `${prefix}-${i + 1}`,
      question: f.question as string,
      answer: f.answer as string,
      category: f.category || undefined,
    }));
}
