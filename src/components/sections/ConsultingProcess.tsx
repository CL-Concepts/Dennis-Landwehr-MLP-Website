import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Kennenlernen",
    description:
      "Wir klären deine aktuelle Situation, deine Ziele und die Themen, die für dich wirklich relevant sind.",
  },
  {
    number: "02",
    title: "Struktur und Vergleich",
    description:
      "Bestehende Lösungen werden eingeordnet. Anschließend erhältst du nachvollziehbare Optionen und eine klare Priorisierung.",
  },
  {
    number: "03",
    title: "Umsetzung und Begleitung",
    description:
      "Du entscheidest selbst, welche Schritte umgesetzt werden. Bei beruflichen oder privaten Veränderungen wird die Strategie erneut geprüft.",
  },
];

export default function ConsultingProcess() {
  return (
    <section className="py-16 md:py-24 bg-navy text-white" aria-labelledby="process-heading">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="process-heading"
          as="h2"
          title="In drei Schritten zu mehr finanzieller Klarheit"
          className="mb-12 [&_h2]:text-white [&_p]:text-blue-200"
        />
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Verbindungslinie */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-full w-full h-px bg-blue-700 -translate-x-6 z-0"
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10">
                <div
                  className="text-5xl font-bold text-blue-800 mb-4 select-none"
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-blue-200 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
