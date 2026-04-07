import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useLanguage } from "../../lib/i18n/LanguageProvider";

export function Features() {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-feature-row]").forEach((row) => {
        gsap.fromTo(
          row.children,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} id="features" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p
          className="mb-16 text-xs uppercase tracking-[0.3em] md:mb-24"
          style={{ color: "var(--mode-text-muted)" }}
        >
          {t.features.label}
        </p>

        <div className="flex flex-col">
          {t.features.items.map((feature) => (
            <div
              key={feature.number}
              className="border-t py-10 md:py-14"
              style={{ borderColor: "var(--mode-border)" }}
            >
              <div
                data-feature-row
                className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between"
              >
                <div className="invisible flex items-baseline gap-4">
                  <span
                    className="text-xs tabular-nums"
                    style={{ color: "var(--mode-text-muted)" }}
                  >
                    {feature.number}
                  </span>
                  <h3
                    className="text-2xl font-bold tracking-tight md:text-3xl"
                    style={{ color: "var(--mode-text)" }}
                  >
                    {feature.title}
                  </h3>
                </div>

                <p
                  className="invisible max-w-sm text-sm leading-relaxed md:text-right"
                  style={{ color: "var(--mode-text-secondary)" }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}

          <div
            className="border-t"
            style={{ borderColor: "var(--mode-border)" }}
          />
        </div>
      </div>
    </section>
  );
}
