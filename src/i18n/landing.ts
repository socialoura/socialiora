export type LandingTranslations = {
  title: {
    boost: string;
    platform: string;
    now: string;
  };
  results: {
    title: string;
    subtitle: string;
    before: string;
    after: string;
  };
  cta: {
    text: string;
  };
  trustpilot: {
    rating: string;
    ariaLabel: string;
  };
};

export const landingTranslations: Record<string, LandingTranslations> = {
  fr: {
    title: {
      boost: "Boostez votre",
      platform: "Instagram",
      now: "dès maintenant",
    },
    results: {
      title: "Les résultats parlent d'eux-mêmes 👇",
      subtitle: "Avant / Après",
      before: "Avant",
      after: "Après",
    },
    cta: {
      text: "Voir les tarifs",
    },
    trustpilot: {
      rating: "4.8",
      ariaLabel: "Trustpilot rating 4.8 out of 5",
    },
  },
  en: {
    title: {
      boost: "Boost your",
      platform: "Instagram",
      now: "right now",
    },
    results: {
      title: "Results speak for themselves 👇",
      subtitle: "Before / After",
      before: "Before",
      after: "After",
    },
    cta: {
      text: "See pricing",
    },
    trustpilot: {
      rating: "4.8",
      ariaLabel: "Trustpilot rating 4.8 out of 5",
    },
  },
  de: {
    title: {
      boost: "Boosten Sie Ihr",
      platform: "Instagram",
      now: "jetzt",
    },
    results: {
      title: "Die Ergebnisse sprechen für sich 👇",
      subtitle: "Vorher / Nachher",
      before: "Vorher",
      after: "Nachher",
    },
    cta: {
      text: "Preise sehen",
    },
    trustpilot: {
      rating: "4.8",
      ariaLabel: "Trustpilot rating 4.8 out of 5",
    },
  },
  es: {
    title: {
      boost: "Impulsa tu",
      platform: "Instagram",
      now: "ahora mismo",
    },
    results: {
      title: "Los resultados hablan por sí solos 👇",
      subtitle: "Antes / Después",
      before: "Antes",
      after: "Después",
    },
    cta: {
      text: "Ver precios",
    },
    trustpilot: {
      rating: "4.8",
      ariaLabel: "Trustpilot rating 4.8 out of 5",
    },
  },
};

export function getLandingTranslations(lang: string): LandingTranslations {
  return landingTranslations[lang] || landingTranslations.fr;
}
