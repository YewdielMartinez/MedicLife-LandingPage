export type Language = "es" | "en";

export const LANGUAGES: Language[] = ["es", "en"];
export const DEFAULT_LANGUAGE: Language = "es";
export const STORAGE_KEY = "ml-language";

export interface Translations {
  nav: {
    features: string;
    pricing: string;
    customize: string;
    contact: string;
    lightMode: string;
    darkMode: string;
    menu: string;
  };
  hero: {
    label: string;
    tagline: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  features: {
    label: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  howItWorks: {
    label: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  pricing: {
    label: string;
    title: string;
    description: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      cta: string;
    }>;
    note: string;
  };
  fonts: {
    label: string;
    title: string;
    description: string;
  };
  themes: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    lightButton: string;
    darkButton: string;
  };
  cta: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  footer: {
    tagline: string;
    col1: string[];
    col2: string[];
    location: string;
  };
}
