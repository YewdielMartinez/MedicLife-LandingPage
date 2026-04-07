import { useState, useEffect, useCallback } from "react";
import {
  type ThemeMode,
  type ThemeName,
  type Preferences,
  DEFAULT_PREFERENCES,
  STORAGE_KEY,
} from "../lib/preferences/preferences-config";

/* ========================================== */
/* Preset CSS imports (static, treeshakeable) */
/* ========================================== */
const presetModules = import.meta.glob("../styles/presets/*.css", {
  eager: false,
});

function presetPath(name: ThemeName): string {
  return `../styles/presets/${name}.css`;
}

/* ========================================== */
/* Hook: useTheme                             */
/* ========================================== */
export function useTheme() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Preferences>;
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch { /* ignore */ }

    // Respect system preference on first visit
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return { ...DEFAULT_PREFERENCES, mode: prefersDark ? "dark" : "light" };
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  // Apply dark/light mode class
  useEffect(() => {
    const root = document.documentElement;
    if (preferences.mode === "dark") {
      root.classList.add("dark");
      root.classList.remove("mode-light");
      root.classList.add("mode-dark");
    } else {
      root.classList.remove("dark");
      root.classList.remove("mode-dark");
      root.classList.add("mode-light");
    }
  }, [preferences.mode]);

  // Load and apply theme preset CSS
  useEffect(() => {
    const root = document.documentElement;

    // Remove old theme classes
    const themeClasses = Array.from(root.classList).filter((c) =>
      c.startsWith("theme-"),
    );
    themeClasses.forEach((c) => root.classList.remove(c));

    // Add new theme class
    root.classList.add(`theme-${preferences.theme}`);

    // Dynamically load the preset CSS
    const path = presetPath(preferences.theme);
    if (presetModules[path]) {
      (presetModules[path] as () => Promise<unknown>)();
    }
  }, [preferences.theme]);

  // Setters
  const setMode = useCallback((mode: ThemeMode) => {
    setPreferences((prev) => ({ ...prev, mode }));
  }, []);

  const setTheme = useCallback((theme: ThemeName) => {
    setPreferences((prev) => ({ ...prev, theme }));
  }, []);

  const toggleMode = useCallback(() => {
    setPreferences((prev) => ({
      ...prev,
      mode: prev.mode === "dark" ? "light" : "dark",
    }));
  }, []);

  return {
    mode: preferences.mode,
    theme: preferences.theme,
    preferences,
    setMode,
    setTheme,
    toggleMode,
  };
}
