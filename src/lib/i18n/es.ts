import type { Translations } from "./types";

export const es: Translations = {
  nav: {
    features: "Funcionalidades",
    pricing: "Precios",
    customize: "Personaliza",
    contact: "Contacto",
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
    menu: "Menu",
  },
  hero: {
    label: "Software Medico de Citas",
    tagline: "Simplifica tu consultorio.",
    subtitle:
      "Pacientes, citas, calendario, historial y pagos. Personalizado a tu estilo.",
    ctaPrimary: "Comenzar gratis",
    ctaSecondary: "Explorar",
  },
  features: {
    label: "Funcionalidades",
    items: [
      {
        number: "01",
        title: "Pacientes",
        description:
          "Perfil completo con datos de contacto, estado activo, historial de citas y datos medicos. Todo en un solo lugar.",
      },
      {
        number: "02",
        title: "Citas",
        description:
          "Agenda, reprograma y completa citas. Filtra por pendientes, completadas o en proceso. Control total de tu dia.",
      },
      {
        number: "03",
        title: "Calendario",
        description:
          "Vista diaria, semanal y mensual. Evita conflictos de horario y optimiza la disponibilidad de tu consultorio.",
      },
      {
        number: "04",
        title: "Historial",
        description:
          "Consultas, diagnosticos y tratamientos registrados. Acceso rapido al historial completo de cada paciente.",
      },
      {
        number: "05",
        title: "Pagos",
        description:
          "Resumen semanal, promedio diario y control por paciente. Ingresos claros sin complicaciones.",
      },
      {
        number: "06",
        title: "Personalizable",
        description:
          "Tema, fuente, modo oscuro, navegacion, atajos y dashboard. Cada detalle se adapta a ti.",
      },
    ],
  },
  howItWorks: {
    label: "Como funciona",
    steps: [
      {
        number: "01",
        title: "Registrate",
        description:
          "Crea tu cuenta gratis en segundos. Sin tarjeta de credito, sin complicaciones.",
      },
      {
        number: "02",
        title: "Personaliza",
        description:
          "Elige tema, fuente, modo oscuro y adapta cada detalle a tu estilo de trabajo.",
      },
      {
        number: "03",
        title: "Gestiona",
        description:
          "Pacientes, citas, calendario, historial y pagos. Todo listo desde el primer dia.",
      },
    ],
  },
  pricing: {
    label: "Precios",
    title: "Simple y transparente.",
    description: "Sin costos ocultos. Cambia o cancela en cualquier momento.",
    plans: [
      {
        name: "Gratis",
        price: "$0",
        period: "por siempre",
        description: "Para consultorios que inician.",
        features: [
          "Hasta 20 pacientes",
          "Agenda de citas basica",
          "Calendario mensual",
          "1 usuario",
        ],
        cta: "Comenzar gratis",
      },
      {
        name: "Pro",
        price: "$299",
        period: "MXN / mes",
        description: "Para consultorios en crecimiento.",
        features: [
          "Pacientes ilimitados",
          "Historial clinico completo",
          "Control de pagos",
          "Calendario inteligente",
          "Personalizacion completa",
          "Hasta 3 usuarios",
        ],
        cta: "Iniciar prueba gratis",
      },
      {
        name: "Clinica",
        price: "$699",
        period: "MXN / mes",
        description: "Para clinicas con multiples doctores.",
        features: [
          "Todo en Pro",
          "Usuarios ilimitados",
          "Documentos y archivos",
          "Reportes avanzados",
          "Soporte prioritario",
          "Accesos por rol",
        ],
        cta: "Contactar ventas",
      },
    ],
    note: "Todos los planes incluyen soporte por email y actualizaciones gratuitas.",
  },
  fonts: {
    label: "Tipografia",
    title: "12 fuentes incluidas.",
    description:
      "Todas cargadas localmente. Cambia la fuente de tu sistema en un clic.",
  },
  themes: {
    label: "Personaliza",
    titleLine1: "Tu sistema,",
    titleLine2: "tu estilo.",
    description:
      "Mas de 25 temas de color. Modo oscuro y claro. Cada elemento responde al instante. Prueba uno ahora.",
    lightButton: "Claro",
    darkButton: "Oscuro",
  },
  cta: {
    titleLine1: "Comienza hoy.",
    titleLine2: "Sin compromisos.",
    description:
      "Configura tu consultorio en minutos. Sin tarjeta de credito. Tu sistema, listo cuando tu lo estes.",
    ctaPrimary: "Crear cuenta",
    ctaSecondary: "Solicitar demo",
  },
  footer: {
    tagline: "Tu consultorio, simplificado.",
    col1: ["Funcionalidades", "Personaliza", "Precios"],
    col2: ["Soporte", "Privacidad", "Terminos"],
    location: "Merida, Mexico",
  },
};
