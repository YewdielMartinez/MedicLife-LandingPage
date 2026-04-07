import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowRight } from "iconoir-react";
import { useLanguage } from "../../lib/i18n/LanguageProvider";
import { ParticleCanvas } from "./ParticleCanvas";
import type { ThemeMode } from "../../lib/preferences/preferences-config";

gsap.registerPlugin(SplitText);

interface HeroProps {
  mode: ThemeMode;
}

export function Hero({ mode }: HeroProps) {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Read the final text color before splitting so we can animate back to it
      const titleEl = container.current!.querySelector<HTMLElement>("[data-hero-title]")!;
      const finalColor = getComputedStyle(titleEl).color;

      const titleSplit = SplitText.create("[data-hero-title]", { type: "chars" });
      const taglineSplit = SplitText.create("[data-hero-tagline]", { type: "words" });
      const subtitleSplit = SplitText.create("[data-hero-subtitle]", {
        type: "lines",
        mask: "lines",
      });

      // Preset hues: rojo → naranja → amarillo → verde → teal → azul → morado → rubí → rojo
      const charColors = [
        "#e84037", // rojo    → M  (crimson-red)
        "#f7830f", // naranja → e  (orange-bright)
        "#ffca3a", // amarillo→ d  (yellow)
        "#6a994e", // verde   → i  (green-amazon)
        "#3c6e71", // teal    → c  (teal)
        "#4d51db", // azul    → L  (royal-indigo)
        "#7848f4", // morado  → i  (soft-pop)
        "#913358", // rubí    → f  (ruby-wine)
        "#c1121f", // rojo    → e  (red)
      ];
      titleSplit.chars.forEach((char, i) => {
        gsap.set(char, { color: charColors[i % charColors.length] });
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleSplit.chars, {
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
      })
        // after entry, transition each char back to its natural text color
        .to(
          titleSplit.chars,
          { color: finalColor, stagger: 0.05, duration: 0.4, ease: "power2.inOut" },
          "+=0.15",
        )
        .to(
          "[data-hero-divider]",
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.3",
        )
        .from(
          taglineSplit.words,
          { y: 20, opacity: 0, stagger: 0.07, duration: 0.6 },
          "-=0.3",
        )
        .from(
          subtitleSplit.lines,
          { y: 30, opacity: 0, stagger: 0.1, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-cta] a",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative flex min-h-screen items-center px-6"
    >
      <ParticleCanvas mode={mode} />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Label */}

        {/* Giant MedicLife — the brand IS the hero */}
        <h1
          data-hero-title
          className="font-bold tracking-tighter leading-[0.9] select-none"
          style={{
            color: "var(--mode-text)",
            fontSize: "clamp(4rem, 12vw, 13rem)",
          }}
        >
          MedicLife
        </h1>

        {/* Animated divider */}
        <div
          data-hero-divider
          className="my-8 h-px md:my-12"
          style={{
            background: "var(--mode-border)",
            transformOrigin: "left",
            transform: "scaleX(0)",
          }}
        />

        {/* Editorial bottom: text left, CTAs right */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div data-hero-content>
            <p
              data-hero-tagline
              className="mb-2 text-lg font-bold tracking-tight md:text-xl"
              style={{ color: "var(--mode-text)" }}
            >
              {t.hero.tagline}
            </p>
            <p
              data-hero-subtitle
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--mode-text-secondary)" }}
            >
              {t.hero.subtitle}
            </p>
          </div>

          <div data-hero-cta className="flex shrink-0 items-center gap-3">
            <a
              href="#cta"
              className="invisible inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium no-underline transition-opacity hover:opacity-80"
              style={{
                background: "var(--theme-primary)",
                color: "var(--theme-text-on-primary)",
              }}
            >
              {t.hero.ctaPrimary}
              <ArrowRight width={15} />
            </a>
            <a
              href="#features"
              className="invisible inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-medium no-underline transition-colors"
              style={{
                borderColor: "var(--mode-border)",
                color: "var(--mode-text)",
              }}
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
