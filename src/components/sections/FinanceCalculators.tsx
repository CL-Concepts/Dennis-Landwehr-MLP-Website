"use client";

import { useId, useMemo, useState } from "react";
import BookingLink from "@/components/ui/BookingLink";
import SectionHeading from "@/components/ui/SectionHeading";

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

type CalculatorVariant = "all" | "vermoegen" | "bu";

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
};

function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  const id = useId();
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <output
          htmlFor={id}
          className="text-base font-bold text-primary tabular-nums whitespace-nowrap"
        >
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={format(value)}
        className="calc-slider w-full"
        style={{ "--slider-fill": `${percent}%` } as React.CSSProperties}
      />
    </div>
  );
}

/* ---------- Vermögensrechner ---------- */

function WealthCalculator() {
  const [monthly, setMonthly] = useState(300);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(6);

  const { total, invested, series } = useMemo(() => {
    const r = rate / 100 / 12;
    const points: { year: number; invested: number; total: number }[] = [];
    for (let y = 0; y <= years; y++) {
      const n = y * 12;
      const value = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
      points.push({ year: y, invested: monthly * n, total: value });
    }
    const last = points[points.length - 1];
    return { total: last.total, invested: last.invested, series: points };
  }, [monthly, years, rate]);

  const gain = total - invested;

  // SVG-Flächendiagramm (mobile-first, skaliert über viewBox)
  const chart = useMemo(() => {
    const w = 600;
    const h = 240;
    const pad = { top: 12, right: 8, bottom: 24, left: 8 };
    const innerW = w - pad.left - pad.right;
    const innerH = h - pad.top - pad.bottom;
    const maxY = Math.max(series[series.length - 1].total, 1);
    const x = (year: number) => pad.left + (year / Math.max(years, 1)) * innerW;
    const y = (v: number) => pad.top + innerH - (v / maxY) * innerH;

    const line = (key: "invested" | "total") =>
      series
        .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.year).toFixed(1)},${y(p[key]).toFixed(1)}`)
        .join(" ");
    const area = (key: "invested" | "total") =>
      `${line(key)} L${x(years).toFixed(1)},${(pad.top + innerH).toFixed(1)} L${x(0).toFixed(1)},${(pad.top + innerH).toFixed(1)} Z`;

    return {
      w,
      h,
      totalArea: area("total"),
      investedArea: area("invested"),
      totalLine: line("total"),
      baseline: pad.top + innerH,
    };
  }, [series, years]);

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
      {/* Eingaben */}
      <div className="lg:col-span-2 space-y-6">
        <Slider
          label="Monatliche Sparrate"
          value={monthly}
          min={25}
          max={1500}
          step={25}
          format={(v) => euro.format(v)}
          onChange={setMonthly}
        />
        <Slider
          label="Anlagedauer"
          value={years}
          min={5}
          max={40}
          step={1}
          format={(v) => `${v} Jahre`}
          onChange={setYears}
        />
        <Slider
          label="Angenommene Rendite p. a."
          value={rate}
          min={0}
          max={9}
          step={0.5}
          format={(v) => `${v.toLocaleString("de-DE")} %`}
          onChange={setRate}
        />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-xs text-muted font-medium mb-1">Eingezahlt</p>
            <p className="text-lg font-bold text-navy tabular-nums">{euro.format(invested)}</p>
          </div>
          <div className="bg-teal-light border border-teal/20 rounded-xl p-4">
            <p className="text-xs text-muted font-medium mb-1">Wertzuwachs</p>
            <p className="text-lg font-bold text-teal tabular-nums">+{euro.format(gain)}</p>
          </div>
          <div className="col-span-2 bg-secondary border border-primary/20 rounded-xl p-4">
            <p className="text-xs text-muted font-medium mb-1">
              Mögliches Endkapital nach {years} Jahren
            </p>
            <p className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
              {euro.format(total)}
            </p>
          </div>
        </div>
      </div>

      {/* Diagramm */}
      <div className="lg:col-span-3">
        <svg
          viewBox={`0 0 ${chart.w} ${chart.h}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Entwicklung des Vermögens über ${years} Jahre: ${euro.format(invested)} eingezahlt, mögliches Endkapital ${euro.format(total)}.`}
        >
          <path d={chart.totalArea} fill="var(--color-secondary)" />
          <path d={chart.investedArea} fill="var(--color-border)" opacity={0.85} />
          <path
            d={chart.totalLine}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          <line
            x1={0}
            y1={chart.baseline}
            x2={chart.w}
            y2={chart.baseline}
            stroke="var(--color-border)"
            strokeWidth={1}
          />
          <text x={8} y={chart.h - 6} fontSize={12} fill="var(--color-muted)">
            heute
          </text>
          <text
            x={chart.w - 8}
            y={chart.h - 6}
            fontSize={12}
            fill="var(--color-muted)"
            textAnchor="end"
          >
            in {years} Jahren
          </text>
        </svg>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-xs text-muted">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-border inline-block" aria-hidden="true" />
            Eigene Einzahlungen
          </span>
          <span className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm bg-secondary border border-primary inline-block"
              aria-hidden="true"
            />
            Mögliche Wertentwicklung
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- BU-Lücken-Check ---------- */

type WorkStatus = "studium" | "angestellt" | "selbststaendig";

const statusOptions: { id: WorkStatus; label: string }[] = [
  { id: "studium", label: "Im Studium" },
  { id: "angestellt", label: "Angestellt" },
  { id: "selbststaendig", label: "Selbstständig / Praxis" },
];

// Vereinfachte Modellannahmen – bewusst konservativ und als solche gekennzeichnet
const NEED_RATIO = 0.75; // Absicherungsbedarf: ~75 % des Nettoeinkommens
const STATE_COVER_RATIO: Record<WorkStatus, number> = {
  studium: 0, // i. d. R. kein Anspruch auf gesetzliche Erwerbsminderungsrente
  angestellt: 0.3, // volle EM-Rente, grobe Modellannahme
  selbststaendig: 0, // ohne freiwillige Vorsorge meist kein gesetzlicher Anspruch
};

function BuGapCalculator() {
  const [income, setIncome] = useState(4000);
  const [status, setStatus] = useState<WorkStatus>("angestellt");

  const need = income * NEED_RATIO;
  const covered = income * STATE_COVER_RATIO[status];
  const gap = Math.max(need - covered, 0);
  const coveredPercent = need > 0 ? (covered / need) * 100 : 0;

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
      {/* Eingaben */}
      <div className="lg:col-span-2 space-y-6">
        <Slider
          label="Monatliches Nettoeinkommen (Ziel bei Studierenden: künftiges Einkommen)"
          value={income}
          min={1000}
          max={12000}
          step={100}
          format={(v) => euro.format(v)}
          onChange={setIncome}
        />
        <fieldset>
          <legend className="text-sm font-medium text-foreground mb-2">Berufliche Situation</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Berufliche Situation">
            {statusOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={status === option.id}
                onClick={() => setStatus(option.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus ${
                  status === option.id
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Ergebnis */}
      <div className="lg:col-span-3 space-y-5">
        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <p className="text-sm font-medium text-foreground">
              Absicherungsbedarf (ca. 75 % vom Netto)
            </p>
            <p className="text-sm font-bold text-navy tabular-nums">{euro.format(need)} / Monat</p>
          </div>
          <div className="h-4 bg-surface border border-border rounded-full overflow-hidden">
            <div className="h-full w-full bg-navy rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <p className="text-sm font-medium text-foreground">
              Gesetzliche Absicherung (Modellannahme)
            </p>
            <p className="text-sm font-bold text-teal tabular-nums">
              {euro.format(covered)} / Monat
            </p>
          </div>
          <div className="h-4 bg-surface border border-border rounded-full overflow-hidden">
            <div
              className="h-full bg-teal rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(coveredPercent, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-warm-light border border-warm-border rounded-xl p-5">
          <p className="text-sm font-medium text-warm-dark mb-1">
            Mögliche monatliche Versorgungslücke
          </p>
          <p
            className="text-3xl md:text-4xl font-bold text-warm-dark tabular-nums"
            aria-live="polite"
          >
            {euro.format(gap)}
          </p>
          <p className="text-sm text-muted mt-2 leading-relaxed">
            {status === "studium"
              ? "Als Studierende:r besteht in der Regel noch kein Anspruch auf gesetzliche Erwerbsminderungsrente – gleichzeitig ist der Einstieg in die Absicherung jetzt am günstigsten."
              : status === "selbststaendig"
                ? "Ohne eigene Vorsorge besteht bei Selbstständigkeit meist kein gesetzlicher Schutz. Das Versorgungswerk leistet oft erst bei vollständiger Berufsaufgabe."
                : "Die gesetzliche Erwerbsminderungsrente deckt nur einen Teil – und greift erst, wenn kaum noch irgendeine Tätigkeit möglich ist, nicht speziell der Arztberuf."}
          </p>
        </div>

        <BookingLink source="bu-rechner" fullWidth>
          Lücke im Erstgespräch prüfen lassen
        </BookingLink>
      </div>
    </div>
  );
}

/* ---------- Section mit Tab-Umschaltung ---------- */

const tabs = [
  { id: "bu", label: "BU-Lücken-Check" },
  { id: "vermoegen", label: "Vermögensrechner" },
] as const;

type FinanceCalculatorsProps = {
  variant?: CalculatorVariant;
  headingId?: string;
};

export default function FinanceCalculators({
  variant = "all",
  headingId = "rechner-heading",
}: FinanceCalculatorsProps) {
  const [activeTab, setActiveTab] = useState<"bu" | "vermoegen">(
    variant === "vermoegen" ? "vermoegen" : "bu"
  );
  const showTabs = variant === "all";
  const active = showTabs ? activeTab : variant;

  return (
    <section
      id="rechner"
      className="py-16 md:py-24 gradient-warm scroll-mt-20"
      aria-labelledby={headingId}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id={headingId}
          as="h2"
          eyebrow="Interaktive Rechner"
          title="Verschaff dir in 30 Sekunden einen ersten Überblick"
          subtitle="Bewege die Regler und sieh sofort, was deine Zahlen bedeuten – als Ausgangspunkt für ein fundiertes Gespräch."
          className="mb-10"
        />

        {showTabs && (
          <div
            className="flex gap-2 mb-8 max-w-md mx-auto bg-white border border-border rounded-xl p-1.5"
            role="tablist"
            aria-label="Rechner auswählen"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-surface"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div
          id={showTabs ? `panel-${active}` : undefined}
          role={showTabs ? "tabpanel" : undefined}
          aria-labelledby={showTabs ? `tab-${active}` : undefined}
          className="bg-white border border-border rounded-2xl shadow-card p-5 sm:p-8 md:p-10"
        >
          {active === "bu" ? <BuGapCalculator /> : <WealthCalculator />}
        </div>

        <p className="text-xs text-muted leading-relaxed max-w-3xl mx-auto text-center mt-6">
          Vereinfachte Modellrechnung mit pauschalen Annahmen, ohne Steuern, Inflation, Kosten und
          individuelle Ansprüche. Die Ergebnisse sind keine Prognose und ersetzen keine individuelle
          Beratung – die tatsächliche Situation klären wir gemeinsam im Gespräch.
        </p>
      </div>
    </section>
  );
}
