import { legalTexts } from "@/content/legal";

type LegalNoticeProps = {
  compact?: boolean;
};

export default function LegalNotice({ compact = false }: LegalNoticeProps) {
  if (compact) {
    return (
      <p className="text-xs text-muted border-l-2 border-border pl-3">{legalTexts.disclaimer}</p>
    );
  }

  return (
    <aside
      aria-label="Rechtlicher Hinweis"
      className="bg-surface border border-border rounded-lg p-4 md:p-6"
    >
      <p className="text-sm font-semibold text-navy mb-2">Rechtlicher Hinweis</p>
      <p className="text-sm text-muted leading-relaxed">{legalTexts.disclaimer}</p>
    </aside>
  );
}
