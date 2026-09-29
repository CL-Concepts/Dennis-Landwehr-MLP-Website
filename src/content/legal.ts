import { fill, settings } from "@/lib/content";
import impressum from "../../content/rechtliches/impressum.json";
import datenschutz from "../../content/rechtliches/datenschutz.json";
import hinweise from "../../content/rechtliches/rechtliche-hinweise.json";

/** Rechtliche Hinweistexte – gepflegt im CMS (Einstellungen bzw. Rechtstexte). */
export const legalTexts = {
  disclaimer: settings.legal.disclaimer,
  personalSite: fill(settings.legal.personalSite),
  imprintPlaceholder: impressum.warningText,
  privacyPlaceholder: datenschutz.warningText,
  legalNotesPlaceholder: hinweise.warningText,
};
