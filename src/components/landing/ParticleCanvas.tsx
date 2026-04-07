import { useRef, useEffect } from "react";
import type { ThemeMode } from "../../lib/preferences/preferences-config";

/* Dark: soft colored bokeh | Light: barely-visible gray texture */
const DARK_COLORS: [number, number, number][] = [
  [255, 255, 255],
  [147, 197, 253],
  [167, 139, 250],
  [94, 234, 212],
  [196, 181, 253],
];
const LIGHT_COLORS: [number, number, number][] = [
  [0, 0, 0],
  [0, 0, 0],
  [99, 102, 241],
  [20, 184, 166],
];

const PARTICLE_COUNT = 45;
const MOUSE_RADIUS = 200;
const MOUSE_FORCE = 1.5;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  ci: number;
  opacity: number;
}

export function ParticleCanvas({ mode }: { mode: ThemeMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (!particlesRef.current.length) {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 45 + 10,
        ci: 0, // assigned at draw time based on mode
        opacity: 0, // assigned at draw time based on mode
      }));
      // Assign initial random indices
      const maxIdx = Math.max(DARK_COLORS.length, LIGHT_COLORS.length);
      for (const p of particlesRef.current) {
        p.ci = Math.floor(Math.random() * maxIdx);
      }
    }

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    const animate = () => {
      const r = canvas.getBoundingClientRect();
      const cw = r.width;
      const ch = r.height;
      ctx.clearRect(0, 0, cw, ch);

      const isDark = modeRef.current === "dark";
      const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
      const opMin = isDark ? 0.03 : 0.015;
      const opMax = isDark ? 0.08 : 0.035;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -p.radius * 2) p.x = cw + p.radius;
        if (p.x > cw + p.radius * 2) p.x = -p.radius;
        if (p.y < -p.radius * 2) p.y = ch + p.radius;
        if (p.y > ch + p.radius * 2) p.y = -p.radius;

        const ci = p.ci % colors.length;
        const [cr, cg, cb] = colors[ci];
        const op = opMin + (p.radius / 55) * (opMax - opMin);

        const grad = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius,
        );
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${op})`);
        grad.addColorStop(0.4, `rgba(${cr},${cg},${cb},${op * 0.45})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
