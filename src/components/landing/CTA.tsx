import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowRight } from "iconoir-react";
import { useLanguage } from "../../lib/i18n/LanguageProvider";

export function CTA() {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-cta-left] > *",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 75%" },
        },
      );

      gsap.fromTo(
        "[data-cta-right] > *",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        },
      );
    },
    { scope: container },
  );

  return (
    <section ref={container} id="cta" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div
          className="border-t pt-16 md:pt-24"
          style={{ borderColor: "var(--mode-border)" }}
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end">
            <div data-cta-left>
              <h2
                className="invisible text-3xl font-bold tracking-tight md:text-5xl"
                style={{ color: "var(--mode-text)" }}
              >
                {t.cta.titleLine1}
                <br />
                <span style={{ color: "var(--mode-text-muted)" }}>
                  {t.cta.titleLine2}
                </span>
              </h2>
            </div>

            <div data-cta-right>
              <p
                className="invisible mb-8 max-w-sm text-sm leading-relaxed"
                style={{ color: "var(--mode-text-secondary)" }}
              >
                {t.cta.description}
              </p>

              <div className="invisible flex items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium no-underline transition-opacity hover:opacity-80"
                  style={{
                    background: "var(--theme-primary)",
                    color: "var(--theme-text-on-primary)",
                  }}
                >
                  {t.cta.ctaPrimary}
                  <ArrowRight width={15} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm no-underline transition-opacity hover:opacity-60"
                  style={{
                    borderColor: "var(--mode-border)",
                    color: "var(--mode-text)",
                  }}
                >
                  {t.cta.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
