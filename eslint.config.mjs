import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Gemeinsame ESLint-Konfiguration aller Agentur-Projekte.
 * Regeln unter "Bewusst als Warnung" sind bekannte technische Schulden:
 * sichtbar, aber nicht blockierend. Neue Stellen sollen sie nicht vermehren.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Bewusst als Warnung: CMS-Daten sind teils noch nicht typisiert.
      "@typescript-eslint/no-explicit-any": "warn",
      // Bewusst als Warnung: Animations-Logik (Scroll-Beobachter) setzt State in Effects.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "coverage/**",
      "public/admin/**",
      "tina/__generated__/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
];

export default eslintConfig;
