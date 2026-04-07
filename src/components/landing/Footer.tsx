import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useLanguage } from "../../lib/i18n/LanguageProvider";

gsap.registerPlugin(SplitText);

const COL1_HREFS = ["#features", "#customization", "#pricing"];
const COL2_HREFS = ["#", "#", "#"];

const CHAR_COLORS = [
  "#e84037", // rojo    → M
  "#f7830f", // naranja → e
  "#ffca3a", // amarillo→ d
  "#6a994e", // verde   → i
  "#3c6e71", // teal    → c
  "#4d51db", // azul    → L
  "#7848f4", // morado  → i
  "#913358", // rubí    → f
  "#c1121f", // rojo    → e
];

export function Footer() {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useGSAP(
    (_, contextSafe) => {
      const pEl = container.current!.querySelector<HTMLElement>("[data-footer-brand]")!;
      const brandSplit = SplitText.create("[data-footer-brand]", {
        type: "chars",
        tag: "span",
      });

      const cleanups: (() => void)[] = [];

      brandSplit.chars.forEach((char, i) => {
        const hoverColor = CHAR_COLORS[i % CHAR_COLORS.length];

        const onEnter = contextSafe!(() => {
          gsap.to(char, { color: hoverColor, duration: 0.2, ease: "power2.out" });
        });

        const onLeave = contextSafe!(() => {
          // Read at leave-time so it always matches the current mode
          const naturalColor = getComputedStyle(pEl).color;
          gsap.to(char, {
            color: naturalColor,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => { gsap.set(char, { clearProps: "color" }); },
          });
        });

        char.addEventListener("mouseenter", onEnter);
        char.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          char.removeEventListener("mouseenter", onEnter);
          char.removeEventListener("mouseleave", onLeave);
        });
      });

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

      return () => { cleanups.forEach((fn) => fn()); };
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
            data-footer-brand
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
