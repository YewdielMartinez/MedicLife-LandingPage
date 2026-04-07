import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    features: "Features",
    pricing: "Pricing",
    customize: "Customize",
    contact: "Contact",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    menu: "Menu",
  },
  hero: {
    label: "Medical Appointment Software",
    tagline: "Simplify your practice.",
    subtitle:
      "Patients, appointments, calendar, history and payments. Customized to your style.",
    ctaPrimary: "Start free",
    ctaSecondary: "Explore",
  },
  features: {
    label: "Features",
    items: [
      {
        number: "01",
        title: "Patients",
        description:
          "Complete profile with contact info, active status, appointment history and medical data. All in one place.",
      },
      {
        number: "02",
        title: "Appointments",
        description:
          "Schedule, reschedule and complete appointments. Filter by pending, completed or in progress. Total control of your day.",
      },
      {
        number: "03",
        title: "Calendar",
        description:
          "Daily, weekly and monthly views. Avoid scheduling conflicts and optimize your office availability.",
      },
      {
        number: "04",
        title: "History",
        description:
          "Consultations, diagnoses and treatments recorded. Quick access to each patient's complete history.",
      },
      {
        number: "05",
        title: "Payments",
        description:
          "Weekly summary, daily average and per-patient tracking. Clear income without complications.",
      },
      {
        number: "06",
        title: "Customizable",
        description:
          "Theme, font, dark mode, navigation, shortcuts and dashboard. Every detail adapts to you.",
      },
    ],
  },
  howItWorks: {
    label: "How it works",
    steps: [
      {
        number: "01",
        title: "Sign up",
        description:
          "Create your free account in seconds. No credit card, no complications.",
      },
      {
        number: "02",
        title: "Customize",
        description:
          "Choose theme, font, dark mode and adapt every detail to your workflow.",
      },
      {
        number: "03",
        title: "Manage",
        description:
          "Patients, appointments, calendar, history and payments. All ready from day one.",
      },
    ],
  },
  pricing: {
    label: "Pricing",
    title: "Simple and transparent.",
    description: "No hidden costs. Change or cancel anytime.",
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "For starting practices.",
        features: [
          "Up to 20 patients",
          "Basic appointment scheduler",
          "Monthly calendar",
          "1 user",
        ],
        cta: "Start free",
      },
      {
        name: "Pro",
        price: "$299",
        period: "MXN / month",
        description: "For growing practices.",
        features: [
          "Unlimited patients",
          "Complete clinical history",
          "Payment tracking",
          "Smart calendar",
          "Full customization",
          "Up to 3 users",
        ],
        cta: "Start free trial",
      },
      {
        name: "Clinic",
        price: "$699",
        period: "MXN / month",
        description: "For multi-doctor clinics.",
        features: [
          "Everything in Pro",
          "Unlimited users",
          "Documents and files",
          "Advanced reports",
          "Priority support",
          "Role-based access",
        ],
        cta: "Contact sales",
      },
    ],
    note: "All plans include email support and free updates.",
  },
  fonts: {
    label: "Typography",
    title: "12 fonts included.",
    description:
      "All loaded locally. Change your system font in one click.",
  },
  themes: {
    label: "Customize",
    titleLine1: "Your system,",
    titleLine2: "your style.",
    description:
      "Over 25 color themes. Dark and light mode. Every element responds instantly. Try one now.",
    lightButton: "Light",
    darkButton: "Dark",
  },
  cta: {
    titleLine1: "Start today.",
    titleLine2: "No commitments.",
    description:
      "Set up your practice in minutes. No credit card. Your system, ready when you are.",
    ctaPrimary: "Create account",
    ctaSecondary: "Request demo",
  },
  footer: {
    tagline: "Your practice, simplified.",
    col1: ["Features", "Customize", "Pricing"],
    col2: ["Support", "Privacy", "Terms"],
    location: "Merida, Mexico",
  },
};
