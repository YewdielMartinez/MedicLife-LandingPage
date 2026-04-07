import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Check, SunLight, HalfMoon } from "iconoir-react";
import {
  THEME_PRESETS,
  type ThemeMode,
  type ThemeName,
} from "../../lib/preferences/preferences-config";
import { useLanguage } from "../../lib/i18n/LanguageProvider";

interface ThemeShowcaseProps {
  mode: ThemeMode;
  currentTheme: ThemeName;
  onSelectTheme: (theme: ThemeName) => void;
  onToggleMode: () => void;
}

export function ThemeShowcase({
  mode,
  currentTheme,
  onSelectTheme,
  onToggleMode,
}: ThemeShowcaseProps) {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);
  const activePreset = THEME_PRESETS.find((p) => p.value === currentTheme);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-theme-left] > *",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-theme-left]", start: "top 85%" },
        },
      );

      gsap.fromTo(
        "[data-theme-dot]",
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.35,
          stagger: 0.02,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: "[data-theme-dots]", start: "top 85%" },
        },
      );
    },
    { scope: container },
  );

  return (
    <section ref={container} id="customization" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p
          className="mb-16 text-xs uppercase tracking-[0.3em] md:mb-24"
          style={{ color: "var(--mode-text-muted)" }}
        >
          {t.themes.label}
        </p>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-start">
          <div data-theme-left>
            <h2
              className="invisible mb-4 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--mode-text)" }}
            >
              {t.themes.titleLine1}
              <br />
              {t.themes.titleLine2}
            </h2>
            <p
              className="invisible mb-8 max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--mode-text-secondary)" }}
            >
              {t.themes.description}
            </p>

            <button
              onClick={onToggleMode}
              className="invisible inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-opacity hover:opacity-70"
              style={{
                borderColor: "var(--mode-border)",
                color: "var(--mode-text)",
                background: "transparent",
              }}
            >
              {mode === "dark" ? (
                <>
                  <SunLight width={15} /> {t.themes.lightButton}
                </>
              ) : (
                <>
                  <HalfMoon width={15} /> {t.themes.darkButton}
                </>
              )}
            </button>

            <div className="invisible mt-10 flex items-center gap-3">
              <div
                className="h-4 w-4 rounded-full transition-colors"
                style={{ background: "var(--theme-primary)" }}
              />
              <span
                className="text-xs"
                style={{ color: "var(--mode-text-muted)" }}
              >
                {activePreset?.label ?? currentTheme}
              </span>
            </div>
          </div>

          <div data-theme-dots className="flex flex-wrap gap-3">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.value}
                data-theme-dot
                onClick={() => onSelectTheme(preset.value)}
                className="invisible relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{
                  background: preset.color,
                  boxShadow:
                    currentTheme === preset.value
                      ? `0 0 0 2px var(--mode-background), 0 0 0 3.5px var(--mode-text)`
                      : "none",
                }}
                title={preset.label}
              >
                {currentTheme === preset.value && (
                  <Check
                    width={14}
                    strokeWidth={2.5}
                    style={{
                      color:
                        preset.color === "#000000" && mode !== "dark"
                          ? "#fff"
                          : preset.color === "#000000"
                            ? "#000"
                            : "#fff",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
