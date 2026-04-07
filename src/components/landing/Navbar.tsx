import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, Xmark, SunLight, HalfMoon } from "iconoir-react";
import type { ThemeMode } from "../../lib/preferences/preferences-config";
import { useLanguage } from "../../lib/i18n/LanguageProvider";
import { LANGUAGES, type Language } from "../../lib/i18n/types";

interface NavbarProps {
  mode: ThemeMode;
  onToggleMode: () => void;
}

const PILL_THRESHOLD = 80;

/* ── Liquid glass SVG displacement map ── */
function buildDispMap(w: number, h: number, r: number, d: number): string {
  const rY = Math.ceil((r / h) * 15);
  const rX = Math.ceil((r / w) * 15);
  const svg = `<svg height="${h}" width="${w}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <style>.mx{mix-blend-mode:screen}</style>
    <defs>
      <linearGradient id="gY" x1="0" x2="0" y1="${rY}%" y2="${Math.floor(100 - rY)}%">
        <stop offset="0%" stop-color="#0F0"/><stop offset="100%" stop-color="#000"/>
      </linearGradient>
      <linearGradient id="gX" x1="${rX}%" x2="${Math.floor(100 - rX)}%" y1="0" y2="0">
        <stop offset="0%" stop-color="#F00"/><stop offset="100%" stop-color="#000"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#808080"/>
    <g filter="blur(2px)">
      <rect width="${w}" height="${h}" fill="#000080"/>
      <rect width="${w}" height="${h}" fill="url(#gY)" class="mx"/>
      <rect width="${w}" height="${h}" fill="url(#gX)" class="mx"/>
      <rect x="${d}" y="${d}" width="${w - 2 * d}" height="${h - 2 * d}"
        fill="#808080" rx="${r}" ry="${r}" filter="blur(${d}px)"/>
    </g>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export function Navbar({ mode, onToggleMode }: NavbarProps) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pillVisible, setPillVisible] = useState(false);

  const pillRef = useRef<HTMLDivElement>(null);
  const dispMapRef = useRef<SVGFEImageElement>(null);

  const navLinks = [
    { label: t.nav.features, href: "#features" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.customize, href: "#customization" },
    { label: t.nav.contact, href: "#cta" },
  ];

  const cycleLang = () => {
    const i = LANGUAGES.indexOf(lang);
    setLang(LANGUAGES[(i + 1) % LANGUAGES.length] as Language);
  };

  /* ── Liquid glass init ── */
  const initLiquidGlass = useCallback(() => {
    const pill = pillRef.current;
    const dispMap = dispMapRef.current;
    if (!pill || !dispMap) return;
    const w = Math.round(pill.offsetWidth);
    const h = Math.round(pill.offsetHeight);
    if (!w || !h) return;
    const r = h / 2;
    const d = Math.max(4, Math.round(h * 0.18));
    dispMap.setAttribute("width", String(w));
    dispMap.setAttribute("height", String(h));
    dispMap.setAttribute("href", buildDispMap(w, h, r, d));
  }, []);

  /* ── Scroll / resize listeners ── */
  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const isDesktop = window.innerWidth >= 768;
      setScrolled(y > 10);
      setPillVisible(isDesktop && y > PILL_THRESHOLD);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    requestAnimationFrame(initLiquidGlass);
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initLiquidGlass, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("resize", onResize);
    };
  }, [initLiquidGlass]);

  useEffect(() => {
    if (pillVisible) requestAnimationFrame(initLiquidGlass);
  }, [pillVisible, initLiquidGlass]);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      {/* ── Full bar ── */}
      <div
        className={`bar-full transition-all duration-300 ${pillVisible ? "bar-hidden" : ""} ${scrolled ? "bar-shadow" : ""}`}
        style={{ background: "var(--mode-background)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#hero"
            className="shrink-0 text-base font-bold tracking-tight no-underline transition-opacity hover:opacity-50"
            style={{ color: "var(--mode-text)" }}
          >
            MedicLife
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium no-underline transition-colors hover:!text-[var(--mode-text)]"
                style={{ color: "var(--mode-text-secondary)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMode}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent transition-colors hover:bg-[var(--mode-surface)]"
              style={{ color: "var(--mode-text-secondary)" }}
              aria-label={mode === "dark" ? t.nav.lightMode : t.nav.darkMode}
            >
              {mode === "dark" ? (
                <SunLight width={16} />
              ) : (
                <HalfMoon width={16} />
              )}
            </button>

            <button
              onClick={cycleLang}
              className="flex h-8 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent px-2 text-xs font-medium transition-colors hover:bg-[var(--mode-surface)]"
              style={{ color: "var(--mode-text-secondary)" }}
              aria-label="Toggle language"
            >
              {lang.toUpperCase()}
            </button>

            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="flex cursor-pointer items-center rounded-lg border-none bg-transparent p-2 transition-colors hover:bg-[var(--mode-surface)] md:hidden"
              style={{ color: "var(--mode-text)" }}
              aria-label={t.nav.menu}
            >
              {mobileOpen ? <Xmark width={18} /> : <Menu width={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="border-t px-4 py-4 md:hidden"
            style={{
              borderColor: "var(--mode-border)",
              background: "var(--mode-background)",
            }}
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm font-medium no-underline transition-colors hover:!text-[var(--mode-text)]"
                  style={{ color: "var(--mode-text-secondary)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Floating pill (liquid glass) ── */}
      <div
        ref={pillRef}
        className={`nav-pill-glass fixed top-4 left-1/2 hidden items-center gap-0 rounded-full px-1.5 py-1.5 md:flex ${pillVisible ? "pill-visible" : ""}`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="pill-link relative z-1 rounded-full px-3 py-1.5 text-sm font-medium no-underline transition-all hover:bg-black/[0.06] dark:hover:bg-white/10"
            style={{ color: "var(--mode-text)" }}
          >
            {link.label}
          </a>
        ))}

        <div
          className="relative z-1 mx-1 h-4 w-px shrink-0"
          style={{ background: "var(--mode-border)" }}
        />

        <button
          onClick={onToggleMode}
          className="relative z-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-none bg-transparent transition-all hover:bg-black/[0.06] dark:hover:bg-white/10"
          style={{ color: "var(--mode-text-secondary)" }}
          aria-label={mode === "dark" ? t.nav.lightMode : t.nav.darkMode}
        >
          {mode === "dark" ? (
            <SunLight width={14} />
          ) : (
            <HalfMoon width={14} />
          )}
        </button>

        <button
          onClick={cycleLang}
          className="relative z-1 cursor-pointer rounded-full border-none bg-transparent px-2.5 py-1.5 text-xs font-medium transition-all hover:bg-black/[0.06] dark:hover:bg-white/10"
          style={{ color: "var(--mode-text-secondary)" }}
          aria-label="Toggle language"
        >
          {lang.toUpperCase()}
        </button>
      </div>

      {/* ── SVG displacement filter ── */}
      <svg
        aria-hidden
        focusable="false"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter
            id="pill-displace"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feImage ref={dispMapRef} x="0" y="0" result="dispMap" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="dispMap"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </nav>
  );
}
