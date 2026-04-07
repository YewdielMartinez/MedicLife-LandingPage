import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowRight } from "iconoir-react";
import { useLanguage } from "../../lib/i18n/LanguageProvider";
import { ParticleCanvas } from "./ParticleCanvas";
import type { ThemeMode } from "../../lib/preferences/preferences-config";

interface HeroProps {
  mode: ThemeMode;
}

export function Hero({ mode }: HeroProps) {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-label]",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
      )
        .fromTo(
          "[data-hero-title]",
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.1 },
          "-=0.3",
        )
        .to(
          "[data-hero-divider]",
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.5",
        )
        .fromTo(
          "[data-hero-content] > *",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 },
          "-=0.4",
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
          className="invisible font-bold tracking-tighter leading-[0.9] select-none"
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
              className="invisible mb-2 text-lg font-bold tracking-tight md:text-xl"
              style={{ color: "var(--mode-text)" }}
            >
              {t.hero.tagline}
            </p>
            <p
              className="invisible max-w-sm text-sm leading-relaxed"
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
