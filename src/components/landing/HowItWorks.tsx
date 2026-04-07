import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useLanguage } from "../../lib/i18n/LanguageProvider";

export function HowItWorks() {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-step]",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 80%" },
        },
      );
    },
    { scope: container },
  );

  return (
    <section ref={container} id="how-it-works" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p
          className="mb-16 text-xs uppercase tracking-[0.3em] md:mb-24"
          style={{ color: "var(--mode-text-muted)" }}
        >
          {t.howItWorks.label}
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {t.howItWorks.steps.map((step) => (
            <div key={step.number} data-step className="invisible">
              <span
                className="mb-4 block text-xs tabular-nums"
                style={{ color: "var(--mode-text-muted)" }}
              >
                {step.number}
              </span>
              <h3
                className="mb-3 text-xl font-bold tracking-tight"
                style={{ color: "var(--mode-text)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--mode-text-secondary)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
