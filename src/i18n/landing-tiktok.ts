export type LandingTiktokTranslations = {
  title: {
    boost: string;
    platform: string;
    now: string;
  };
  showcase: {
    title: string;
    subtitle: string;
  };
  cta: {
    text: string;
  };
  trustpilot: {
    rating: string;
    ariaLabel: string;
  };
};

export const landingTiktokTranslations: Record<string, LandingTiktokTranslations> = {
  fr: {
    title: {
      boost: "Boostez votre compte",
      platform: "TikTok",
      now: "dès maintenant",
    },
    showcase: {
      title: "Rejoignez les meilleurs créateurs 👇",
      subtitle: "12.3M d'abonnés",
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
      platform: "TikTok",
      now: "right now",
    },
    showcase: {
      title: "Join the top creators 👇",
      subtitle: "12.3M followers",
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
      platform: "TikTok",
      now: "jetzt",
    },
    showcase: {
      title: "Schließen Sie sich den Top-Creators an 👇",
      subtitle: "12.3M Follower",
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
      boost: "Impulsa tu cuenta de",
      platform: "TikTok",
      now: "ahora mismo",
    },
    showcase: {
      title: "Únete a los mejores creadores 👇",
      subtitle: "12.3M seguidores",
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

export function getLandingTiktokTranslations(lang: string): LandingTiktokTranslations {
  return landingTiktokTranslations[lang] || landingTiktokTranslations.fr;
}
