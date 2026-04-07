import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useLanguage } from "../../lib/i18n/LanguageProvider";

interface FontEntry {
  name: string;
  family: string;
}

const FONTS: FontEntry[] = [
  { name: "NB International", family: '"NB International"' },
  { name: "Inter", family: '"Inter"' },
  { name: "DM Sans", family: '"DM Sans"' },
  { name: "Plus Jakarta", family: '"Plus Jakarta Sans"' },
  { name: "Outfit", family: '"Outfit"' },
  { name: "Montserrat", family: '"Montserrat"' },
  { name: "Raleway", family: '"Raleway"' },
  { name: "Open Sans", family: '"Open Sans"' },
  { name: "Roboto", family: '"Roboto"' },
  { name: "Poppins", family: '"Poppins"' },
  { name: "IBM Plex Sans", family: '"IBM Plex Sans"' },
  { name: "Source Code Pro", family: '"Source Code Pro"' },
];

export function FontShowcase() {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-font-item]",
        { y: 15, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 80%" },
        },
      );
    },
    { scope: container },
  );

  return (
    <section ref={container} id="fonts" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="mb-3 text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--mode-text-muted)" }}
            >
              {t.fonts.label}
            </p>
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--mode-text)" }}
            >
              {t.fonts.title}
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: "var(--mode-text-secondary)" }}
          >
            {t.fonts.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {FONTS.map((font) => (
            <div
              key={font.name}
              data-font-item
              className="invisible rounded-xl border p-4"
              style={{ borderColor: "var(--mode-border)" }}
            >
              <p
                className="mb-2 truncate text-lg font-medium md:text-xl"
                style={{
                  fontFamily: `${font.family}, sans-serif`,
                  color: "var(--mode-text)",
                }}
              >
                Aa
              </p>
              <p
                className="truncate text-[11px]"
                style={{ color: "var(--mode-text-muted)" }}
              >
                {font.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
