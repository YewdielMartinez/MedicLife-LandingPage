import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useLanguage } from "../../lib/i18n/LanguageProvider";

const COL1_HREFS = ["#features", "#customization", "#pricing"];
const COL2_HREFS = ["#", "#", "#"];

export function Footer() {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-footer-giant]",
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-footer-giant]", start: "top 95%" },
        },
      );
    },
    { scope: container },
  );

  return (
    <footer ref={container} className="px-6 pt-16 pb-8 md:pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-start md:justify-between">
          <p
            className="text-sm"
            style={{ color: "var(--mode-text-secondary)" }}
          >
            {t.footer.tagline}
          </p>

          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              {t.footer.col1.map((label, i) => (
                <a
                  key={label}
                  href={COL1_HREFS[i]}
                  className="text-sm no-underline transition-opacity hover:opacity-60"
                  style={{ color: "var(--mode-text)" }}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {t.footer.col2.map((label, i) => (
                <a
                  key={label}
                  href={COL2_HREFS[i]}
                  className="text-sm no-underline transition-opacity hover:opacity-60"
                  style={{ color: "var(--mode-text)" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div data-footer-giant className="invisible">
          <p
            className="w-full text-center leading-[0.85] font-bold tracking-tighter select-none"
            style={{
              color: "var(--mode-text)",
              fontSize: "clamp(3rem, 13vw, 14rem)",
            }}
          >
            MedicLife
          </p>
        </div>

        <div
          className="mt-6 flex items-center justify-between border-t pt-4"
          style={{ borderColor: "var(--mode-border)" }}
        >
          <span
            className="text-[11px]"
            style={{ color: "var(--mode-text-muted)" }}
          >
            &copy; {year} MedicLife
          </span>
          <span
            className="text-[11px]"
            style={{ color: "var(--mode-text-muted)" }}
          >
            {t.footer.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
