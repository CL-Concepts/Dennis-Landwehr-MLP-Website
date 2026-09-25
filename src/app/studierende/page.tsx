import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { buildFaqSchema } from "@/lib/schema";
import { studyFaqs } from "@/content/faqs";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BookingLink from "@/components/ui/BookingLink";
import FAQ from "@/components/sections/FAQ";
import FinalCta from "@/components/sections/FinalCta";
import LegalNotice from "@/components/ui/LegalNotice";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Finanzberatung für Medizinstudierende in ${siteConfig.city}`,
  description:
    "Finanzielle Grundlagen für das Medizinstudium: Berufshaftpflicht bei Famulatur, Berufsunfähigkeit, Krankenversicherung und erste Rücklagen – verständlich erklärt.",
  canonical: "/studierende",
});

const topics = [
  {
    title: "Berufshaftpflicht bei ersten Patientenkontakten",
    description:
      "Was gilt bei Pflichtfamulaturen, freiwilligen Famulaturen und Auslandsaufenthalten? Wann ist ein eigener Schutz sinnvoll?",
    href: "/leistungen/berufshaftpflicht-mediziner",
  },
  {
    title: "Krankenversicherung und spätere Wechseloptionen",
    description:
      "Familienversicherung, studentische GKV, Optionstarife – und wie sich Entscheidungen im Studium auf spätere Optionen auswirken.",
    href: "/leistungen/krankenversicherung-mediziner",
  },
  {
    title: "Frühe Berufsunfähigkeitsabsicherung",
    description:
      "Warum ein früher Abschluss oft günstiger ist, welche Nachversicherungsoptionen es gibt und was die Gesundheitsprüfung bedeutet.",
    href: "/leistungen/berufsunfaehigkeit-mediziner",
  },
  {
    title: "Konto, Budget und Rücklagen",
    description:
      "Strukturierter Umgang mit BAföG, Nebenjob-Einkommen und Förderungen – Grundlage für spätere finanzielle Entscheidungen.",
    href: "/leistungen/liquiditaetsmanagement-mediziner",
  },
  {
    title: "Flexibler Einstieg in den Vermögensaufbau",
    description:
      "Wann lohnt es sich, erste Rücklagen für den Vermögensaufbau beiseitezulegen – und wie das mit kleinem Budget funktionieren kann.",
    href: "/leistungen/vermoegensaufbau-mediziner",
  },
  {
    title: "Vorbereitung auf den Berufseinstieg",
    description:
      "Was ändert sich finanziell nach dem Studium? Krankenversicherung, erstes Gehalt, Versorgungswerk – frühzeitig den Überblick bekommen.",
    href: "/leistungen",
  },
];

export default function StudierendePage() {
  return (
    <>
      <JsonLd data={buildFaqSchema(studyFaqs)} />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: "Für Studierende", href: "/studierende" }]} />
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 gradient-hero" aria-labelledby="studierende-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
                Für Medizinstudierende
              </p>
              <h1
                id="studierende-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 text-balance"
              >
                Finanzielle Grundlagen für dein Medizinstudium
              </h1>
              <p className="text-muted leading-relaxed mb-8 text-lg">
                Zwischen Studium, Famulatur, Auslandsaufenthalt und Praktischem Jahr bleiben Finanz-
                und Versicherungsthemen oft liegen. Dabei lassen sich gerade in dieser Phase
                wichtige Grundlagen frühzeitig und mit überschaubarem Aufwand ordnen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <BookingLink source="studierende">Termin für Studierende vereinbaren</BookingLink>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary bg-white border border-primary rounded-lg hover:bg-secondary transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus min-h-[44px]"
                >
                  Frage stellen
                </a>
              </div>
            </div>
            {/* Foto: Medizinstudierende */}
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                alt="Medizinstudierende lernen gemeinsam"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wichtige Botschaft */}
      <section className="py-10 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary border-l-4 border-primary rounded-r-lg p-5 max-w-3xl">
            <p className="text-base text-foreground leading-relaxed">
              <strong className="text-navy">Wichtig:</strong> Im Studium muss nicht sofort alles
              geregelt werden. Zuerst geht es darum, Risiken und Ziele zu verstehen – und dann nur
              die wirklich relevanten Schritte umzusetzen. Das erspart unnötige Ausgaben und schafft
              Raum für tatsächlich wichtige Entscheidungen.
            </p>
          </div>
        </div>
      </section>

      {/* Themenübersicht */}
      <section className="py-12 md:py-20 gradient-section" aria-labelledby="topics-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="topics-heading"
            as="h2"
            title="Finanzthemen im Studium – worauf es ankommt"
            subtitle="Nicht alle Themen sind gleichzeitig wichtig. Hier findest du einen Überblick, was in welcher Phase des Studiums relevant sein kann."
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group bg-white border border-border rounded-card p-5 hover:border-primary hover:shadow-card-hover transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus flex flex-col"
              >
                <h3 className="text-base font-bold text-navy mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed flex-1 mb-3">
                  {topic.description}
                </p>
                <span className="text-xs font-semibold text-primary flex items-center gap-1">
                  Mehr erfahren
                  <svg
                    className="w-3 h-3 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Studierendenförderprogramm */}
      <section className="py-12 md:py-20 gradient-warm" aria-labelledby="foerder-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-12 h-12 bg-warm rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>
            <div>
              <h2 id="foerder-heading" className="text-2xl md:text-3xl font-bold text-navy mb-2">
                MLP Studierendenförderprogramm 2026
              </h2>
              <p className="text-muted leading-relaxed max-w-2xl">
                Als MLP-Berater habe ich Zugang zu einem umfangreichen Förderprogramm exklusiv für
                Medizinstudierende – kostenfreie Seminare, Klinikdatenbanken, Wundnahtkurse und ein
                dotiertes Stipendienprogramm.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                tag: "Seminar",
                title: "Ab ins Ausland – mit Famulatur und PJ",
                text: "Wie finde ich die passende Klinik im In- und Ausland? Wie bewerbe ich mich und wie finanziere ich meinen Auslandsaufenthalt?",
              },
              {
                tag: "Exklusiv",
                title: "Klinikdatenbank The Electives Network (TEN)",
                text: "Kostenfreier Zugang zu ~3.000 Kliniken in über 150 Ländern mit Ansprechpartnern, Fachgebieten und aktuellen Kontaktdaten.",
              },
              {
                tag: "Seminar",
                title: "Financial MEDucation",
                text: "Smarter Umgang mit Geld, Grundzüge des Kapitalmarktes, Anlagemöglichkeiten und ein Überblick über Finanzplanung für Ärzt:innen.",
              },
              {
                tag: "Seminar",
                title: "Steuern im Medizinstudium",
                text: "Wie setze ich mein Studium beim Finanzamt ab? Was ist notwendig und worauf muss ich achten?",
              },
              {
                tag: "Seminar",
                title: "Endlich Ärztin / Arzt – Abenteuer Berufsstart",
                text: "Strukturierte Vorbereitung auf die erste Stelle als Assistenzärztin oder Assistenzarzt: Absicherung, Bewerbung, erste Schritte.",
              },
              {
                tag: "Neu 2026",
                title: "Fachrichtungscheck mit Persönlichkeitsanalyse",
                text: "Kostenfreie Persönlichkeitsanalyse + gemeinsamer Check, welche Fachrichtungen wirklich zu dir passen – strukturiert statt nach Zufall.",
              },
              {
                tag: "Auf Nachfrage",
                title: "Chirurgischer Wundnahtkurs",
                text: "Das Seminar zum Erlernen chirurgischer Wundnahttechniken wird von einem Chirurgen mit langjähriger Erfahrung geleitet.",
              },
              {
                tag: "Stipendium",
                title: "Medical Excellence – 4.000 € dotiert",
                text: "12 Stipendienplätze pro Jahr in verschiedenen Kategorien für Studierende der Human- und Zahnmedizin. Bewerbungsstart April 2026.",
                highlight: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-card p-5 border flex flex-col ${
                  item.highlight ? "bg-warm/10 border-warm-border" : "bg-white border-border"
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                    item.highlight ? "text-warm-dark" : "text-primary"
                  }`}
                >
                  {item.tag}
                </span>
                <h3 className="text-base font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-white border border-warm-border rounded-card">
            <p className="text-sm text-muted">
              <strong className="text-navy">Dein Zugang:</strong> Als dein persönlicher Berater
              informiere ich dich über aktuelle Termine und Anmeldefristen für alle Programme.
              Sprich mich einfach in unserem Gespräch darauf an.
            </p>
          </div>
        </div>
      </section>

      {/* Pflicht- und Zusatzbereiche */}
      <section className="py-12 bg-white" aria-labelledby="bereiche-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="bereiche-heading" className="text-2xl font-bold text-navy mb-2">
            Was ist im Studium wirklich relevant?
          </h2>
          <p className="text-muted mb-8 max-w-2xl">
            Es gibt Themen, um die du im Studium nicht herumkommst – und andere, die je nach
            Situation interessant sein können. Hier ein Überblick:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                Pflichtbereiche
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    label: "Gesundheit",
                    text: "Gesundheitszustand einfrieren (Optionstarif) + Auslandskrankenversicherung für Famulatur/PJ",
                  },
                  {
                    label: "Haftung",
                    text: "Privat- und Berufshaftpflicht für ärztliche Tätigkeiten im Studium – oft kostenfrei möglich",
                  },
                  {
                    label: "Kontenmodell",
                    text: "Weltweit kostenfrei Bargeld abheben, studentische Kreditkarte, smarte Kontostruktur",
                  },
                  {
                    label: "Berufsunfähigkeit",
                    text: "Absicherung mit Mediziner-Besonderheiten: Infektionsklausel, keine Verweisung, günstigerer Beitrag im Studium",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3 text-sm">
                    <span className="font-semibold text-navy w-36 flex-shrink-0">{item.label}</span>
                    <span className="text-muted">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-warm rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
                Zusatzbereiche (je nach Situation)
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    label: "Unfallschutz",
                    text: "Ergänzend zur BU – einmaliger Auszahlungsbetrag, Infektionsklausel, weltweit in Beruf und Freizeit",
                  },
                  {
                    label: "Geldanlage",
                    text: "Erste Grundsteine für effizienten Vermögensaufbau – Studienkonzepte ab 10 € Sparrate möglich",
                  },
                  {
                    label: "Studienfinanzierung",
                    text: "Unabhängigkeit und finanzielle Flexibilität, kombinierbar mit BAföG, keine Sicherheiten nötig",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3 text-sm">
                    <span className="font-semibold text-navy w-36 flex-shrink-0">{item.label}</span>
                    <span className="text-muted">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-12 bg-white" aria-labelledby="process-stud-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 id="process-stud-heading" className="text-2xl font-bold text-navy mb-6">
            Wie läuft ein Beratungsgespräch für Studierende ab?
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Situation klären",
                text: "Wir besprechen deine aktuelle Situation: Wo stehst du im Studium? Welche Themen beschäftigen dich konkret?",
              },
              {
                step: "2",
                title: "Relevantes identifizieren",
                text: "Nicht jedes Thema ist für jede Person und jede Studienphase gleich relevant. Wir sortieren, was wirklich Priorität hat.",
              },
              {
                step: "3",
                title: "Nur das Notwendige angehen",
                text: "Du entscheidest, welche Schritte du umsetzen möchtest. Es gibt keinen Druck und keine unnötigen Empfehlungen.",
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <div className="w-10 h-10 bg-secondary border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">{item.title}</p>
                  <p className="text-sm text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQ faqs={studyFaqs} title="Häufige Fragen von Medizinstudierenden" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LegalNotice />
      </div>

      <FinalCta />
    </>
  );
}
