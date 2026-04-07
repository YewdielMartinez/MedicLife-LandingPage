import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Check, ArrowRight } from "iconoir-react";
import { useLanguage } from "../../lib/i18n/LanguageProvider";

const PLAN_HIGHLIGHTED = [false, true, false];

export function Pricing() {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-pricing-card]",
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
    },
    { scope: container },
  );

  return (
    <section ref={container} id="pricing" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="mb-3 text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--mode-text-muted)" }}
            >
              {t.pricing.label}
            </p>
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--mode-text)" }}
            >
              {t.pricing.title}
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: "var(--mode-text-secondary)" }}
          >
            {t.pricing.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {t.pricing.plans.map((plan, i) => {
            const pop = PLAN_HIGHLIGHTED[i];

            return (
              <div
                key={plan.name}
                data-pricing-card
                className="invisible flex flex-col rounded-2xl border p-6"
                style={{
                  borderColor: "var(--mode-border)",
                  borderTopWidth: pop ? 2 : 1,
                  borderTopColor: pop
                    ? "var(--theme-primary)"
                    : "var(--mode-border)",
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--mode-text)" }}
                  >
                    {plan.name}
                  </span>
                  {pop && (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        background: "var(--theme-primary-light)",
                        color: "var(--theme-primary)",
                      }}
                    >
                      Popular
                    </span>
                  )}
                </div>

                <div className="mb-1 flex items-baseline gap-1">
                  <span
                    className="text-4xl font-bold tracking-tight"
                    style={{ color: "var(--mode-text)" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--mode-text-muted)" }}
                  >
                    {plan.period}
                  </span>
                </div>

                <p
                  className="mb-6 text-sm"
                  style={{ color: "var(--mode-text-secondary)" }}
                >
                  {plan.description}
                </p>

                <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--mode-text-secondary)" }}
                    >
                      <Check
                        width={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--theme-primary)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium no-underline transition-opacity hover:opacity-80"
                  style={
                    pop
                      ? {
                          background: "var(--theme-primary)",
                          color: "var(--theme-text-on-primary)",
                        }
                      : {
                          border: "1px solid var(--mode-border)",
                          color: "var(--mode-text)",
                        }
                  }
                >
                  {plan.cta}
                  <ArrowRight width={14} />
                </a>
              </div>
            );
          })}
        </div>

        <p
          className="mt-8 text-center text-xs"
          style={{ color: "var(--mode-text-muted)" }}
        >
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
