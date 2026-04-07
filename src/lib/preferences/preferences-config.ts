/* ========================================== */
/* PREFERENCES CONFIG                         */
/* Types and constants for the theme system   */
/* ========================================== */

export type ThemeMode = "light" | "dark";

export type ThemeName =
  | "default"
  | "blue"
  | "green"
  | "purple"
  | "red"
  | "orange"
  | "pink"
  | "teal"
  | "gray"
  | "yellow"
  | "crimson-red"
  | "ruby-wine"
  | "royal-indigo"
  | "lavender-dream"
  | "aqua-mint"
  | "green-amazon"
  | "green-fern"
  | "calm-pediatric"
  | "neon-green"
  | "orange-bright"
  | "purple-pastel"
  | "yellow-pastel"
  | "soft-pop"
  | "tangerine"
  | "brutalist";

export type Font = "nb-international" | "system" | "inter";

export interface ThemePreset {
  label: string;
  value: ThemeName;
  description: string;
  color: string; // preview color for the selector
}

export interface Preferences {
  mode: ThemeMode;
  theme: ThemeName;
  font: Font;
}

export const DEFAULT_PREFERENCES: Preferences = {
  mode: "light",
  theme: "default",
  font: "nb-international",
};

export const THEME_PRESETS: ThemePreset[] = [
  { label: "Negro", value: "default", description: "Tema principal", color: "#000000" },
  { label: "Azul", value: "blue", description: "Azul marino profesional", color: "#003566" },
  { label: "Verde", value: "green", description: "Verde natural", color: "#588157" },
  { label: "Morado", value: "purple", description: "Morado profundo", color: "#372549" },
  { label: "Rojo", value: "red", description: "Rojo intenso", color: "#c1121f" },
  { label: "Naranja", value: "orange", description: "Naranja cálido", color: "#e76f51" },
  { label: "Rosa", value: "pink", description: "Rosa suave", color: "#e63980" },
  { label: "Teal", value: "teal", description: "Teal oceánico", color: "#0d9488" },
  { label: "Gris", value: "gray", description: "Gris neutro", color: "#6b7280" },
  { label: "Amarillo", value: "yellow", description: "Amarillo solar", color: "#ca8a04" },
  { label: "Crimson", value: "crimson-red", description: "Carmesí intenso", color: "#dc2626" },
  { label: "Rubí", value: "ruby-wine", description: "Rubí vino", color: "#9f1239" },
  { label: "Índigo", value: "royal-indigo", description: "Índigo real", color: "#4338ca" },
  { label: "Lavanda", value: "lavender-dream", description: "Lavanda soñadora", color: "#8b5cf6" },
  { label: "Aqua", value: "aqua-mint", description: "Aqua menta", color: "#06b6d4" },
  { label: "Amazonas", value: "green-amazon", description: "Verde amazonas", color: "#15803d" },
  { label: "Helecho", value: "green-fern", description: "Verde helecho", color: "#4d7c0f" },
  { label: "Pediátrico", value: "calm-pediatric", description: "Calma pediátrica", color: "#3b82f6" },
  { label: "Neón", value: "neon-green", description: "Verde neón", color: "#22c55e" },
  { label: "Naranja Vivo", value: "orange-bright", description: "Naranja brillante", color: "#f97316" },
  { label: "Pastel Morado", value: "purple-pastel", description: "Morado pastel", color: "#a78bfa" },
  { label: "Pastel Amarillo", value: "yellow-pastel", description: "Amarillo pastel", color: "#fbbf24" },
  { label: "Soft Pop", value: "soft-pop", description: "Suave y moderno", color: "#ec4899" },
  { label: "Tangerina", value: "tangerine", description: "Mandarina vibrante", color: "#fb923c" },
  { label: "Brutalist", value: "brutalist", description: "Estilo brutalista", color: "#000000" },
];

export const STORAGE_KEY = "mediclife-preferences";
