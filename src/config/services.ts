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

export const services: Service[] = [
  {
    id: "berufshaftpflicht",
    title: "Berufshaftpflicht für Mediziner",
    slug: "berufshaftpflicht-mediziner",
    href: "/leistungen/berufshaftpflicht-mediziner",
    shortText:
      "Berufliche Verantwortung braucht einen Schutz, der zur konkreten Tätigkeit passt. Gemeinsam prüfen wir, welche Risiken in Studium, Anstellung, Nebentätigkeit oder eigener Praxis berücksichtigt werden müssen.",
    highlights: [
      "Famulatur und Praktisches Jahr",
      "Angestellte Tätigkeit und Nebentätigkeiten",
      "Human- und Zahnmedizin",
      "Praxis und Mitarbeitende",
    ],
    ctaText: "Berufshaftpflicht ansehen",
    iconName: "shield",
  },
  {
    id: "krankenversicherung",
    title: "Krankenversicherung für Mediziner",
    slug: "krankenversicherung-mediziner",
    href: "/leistungen/krankenversicherung-mediziner",
    shortText:
      "Gesetzlich oder privat ist keine pauschale Entscheidung. Entscheidend sind berufliche Situation, Leistungswünsche, langfristige Beitragsentwicklung und persönliche Lebensplanung.",
    highlights: [
      "GKV und PKV vergleichen",
      "Optionen für Studierende und Berufseinsteiger",
      "Krankentagegeld mitdenken",
      "Langfristige Versorgung planen",
    ],
    ctaText: "Krankenversicherung prüfen",
    iconName: "heart",
  },
  {
    id: "berufsunfaehigkeit",
    title: "Berufsunfähigkeit für Mediziner",
    slug: "berufsunfaehigkeit-mediziner",
    href: "/leistungen/berufsunfaehigkeit-mediziner",
    shortText:
      "Die eigene Arbeitskraft ist die Grundlage des späteren Einkommens. Eine medizinerspezifische Absicherung sollte Tätigkeit, Karriereentwicklung und mögliche Versorgungslücken berücksichtigen.",
    highlights: [
      "Früher Abschluss im Studium",
      "Passende Rentenhöhe",
      "Nachversicherungsmöglichkeiten",
      "Medizinische und zahnmedizinische Tätigkeitsbilder",
    ],
    ctaText: "Arbeitskraft absichern",
    iconName: "umbrella",
  },
  {
    id: "vermoegensaufbau",
    title: "Vermögensaufbau für Mediziner",
    slug: "vermoegensaufbau-mediziner",
    href: "/leistungen/vermoegensaufbau-mediziner",
    shortText:
      "Ein gutes Einkommen schafft Möglichkeiten, aber noch keine Strategie. Wir strukturieren kurz-, mittel- und langfristige Ziele und entwickeln daraus ein nachvollziehbares Vermögenskonzept.",
    highlights: [
      "Flexible Rücklagen",
      "Langfristiger Vermögensaufbau",
      "Altersvorsorge und Versorgungswerk",
      "Individuelle Risikobereitschaft",
    ],
    ctaText: "Vermögensstrategie besprechen",
    iconName: "trending-up",
  },
  {
    id: "liquiditaetsmanagement",
    title: "Liquiditätsmanagement für Mediziner",
    slug: "liquiditaetsmanagement-mediziner",
    href: "/leistungen/liquiditaetsmanagement-mediziner",
    shortText:
      "Eine klare Trennung von laufenden Ausgaben, Rücklagen und langfristigem Vermögen schafft finanzielle Kontrolle – privat ebenso wie in der eigenen Praxis.",
    highlights: [
      "Notfallreserve",
      "Planbare Rücklagen",
      "Private und berufliche Zahlungsströme",
      "Liquiditätsplanung für Praxisinhaber",
    ],
    ctaText: "Liquidität strukturieren",
    iconName: "bar-chart",
  },
];

export type CareerPhase = {
  id: string;
  label: string;
  description: string;
  detail: string;
  topics: string[];
  href: string;
  hrefLabel: string;
};

export const careerPhases: CareerPhase[] = [
  {
    id: "studium",
    label: "Studium",
    description: "Erste Absicherung, Grundlagen schaffen",
    detail:
      "Im Studium zählt vor allem eines: früh die richtigen Weichen stellen. Wer jetzt startet, sichert sich günstige Konditionen und einen gesunden Gesundheitsstatus für später.",
    topics: [
      "Berufsunfähigkeit früh sichern",
      "Krankenversicherung im Studium",
      "Erste Budget-Struktur",
    ],
    href: "/studierende",
    hrefLabel: "Mehr für Studierende",
  },
  {
    id: "famulatur-pj",
    label: "Famulatur & PJ",
    description: "Berufshaftpflicht, praktische Erfahrung",
    detail:
      "Mit dem ersten Patientenkontakt entsteht echte berufliche Verantwortung. Eine passende Berufshaftpflicht ist jetzt Pflichtprogramm – oft schon kostenlos oder sehr günstig.",
    topics: [
      "Berufshaftpflicht für Famulatur & PJ",
      "Auslandsaufenthalte absichern",
      "Übergang in den Beruf planen",
    ],
    href: "/leistungen/berufshaftpflicht-mediziner",
    hrefLabel: "Zur Berufshaftpflicht",
  },
  {
    id: "berufseinstieg",
    label: "Berufseinstieg",
    description: "Krankenversicherung, BU, erste Rücklagen",
    detail:
      "Mit dem ersten Gehalt fallen wichtige Entscheidungen: GKV oder PKV, Höhe der BU-Absicherung, Umgang mit dem Versorgungswerk – und der Aufbau erster Rücklagen.",
    topics: [
      "GKV vs. PKV entscheiden",
      "BU-Rente ans Einkommen anpassen",
      "Notfallreserve aufbauen",
    ],
    href: "/leistungen/krankenversicherung-mediziner",
    hrefLabel: "Krankenversicherung prüfen",
  },
  {
    id: "facharzt",
    label: "Facharzt­laufbahn",
    description: "Vermögensaufbau, Versorgungswerk optimieren",
    detail:
      "Steigendes Einkommen schafft Spielraum. Jetzt geht es darum, aus gutem Verdienst eine echte Strategie zu machen – mit klaren Zielen für Vermögen und Altersvorsorge.",
    topics: [
      "Vermögensstrategie entwickeln",
      "Versorgungswerk einordnen",
      "Immobilie & Finanzierung",
    ],
    href: "/leistungen/vermoegensaufbau-mediziner",
    hrefLabel: "Vermögensaufbau ansehen",
  },
  {
    id: "niederlassung",
    label: "Niederlassung",
    description: "Praxisabsicherung, Finanzierung, Liquidität",
    detail:
      "Der Schritt in die eigene Praxis ist auch finanziell der größte. Finanzierung, Absicherung und private Finanzen müssen jetzt als ein Gesamtsystem gedacht werden.",
    topics: [
      "Praxisfinanzierung strukturieren",
      "Praxis & Inventar absichern",
      "Private und betriebliche Finanzen trennen",
    ],
    href: "/leistungen/liquiditaetsmanagement-mediziner",
    hrefLabel: "Praxisfinanzen strukturieren",
  },
  {
    id: "praxisfuehrung",
    label: "Praxis­führung",
    description: "Betriebswirtschaftliche Kontrolle, Team absichern",
    detail:
      "Eine laufende Praxis braucht finanzielle Kontrolle: planbare Rücklagen, abgesicherte Mitarbeitende und Liquidität, die auch in schwächeren Quartalen trägt.",
    topics: [
      "Liquiditätsplanung für die Praxis",
      "Mitarbeitende absichern",
      "Rücklagen systematisieren",
    ],
    href: "/leistungen/liquiditaetsmanagement-mediziner",
    hrefLabel: "Liquidität strukturieren",
  },
  {
    id: "ruhestand",
    label: "Ruhestands­planung",
    description: "Praxisabgabe, Rentenplanung, Vermögensübergabe",
    detail:
      "Praxisabgabe und Ruhestand wollen Jahre im Voraus geplant sein – vom Praxiswert über Versorgungswerk und private Vorsorge bis zur geordneten Vermögensübergabe.",
    topics: [
      "Praxisabgabe vorbereiten",
      "Einkommensquellen im Ruhestand",
      "Vermögen geordnet übergeben",
    ],
    href: "/leistungen/vermoegensaufbau-mediziner",
    hrefLabel: "Ruhestand planen",
  },
];
