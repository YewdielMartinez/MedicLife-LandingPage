import {
  Home,
  Group,
  Calendar,
  CreditCard,
  Settings,
  Bell,
  Plus,
  MoreHoriz,
  Check,
  Clock,
  NavArrowRight,
} from "iconoir-react";

/**
 * Mockup visual del dashboard real de MedicLife.
 * Refleja el diseño minimalista con sidebar, contenido principal y widgets laterales.
 */
export function DashboardPreview() {
  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-2xl"
      style={{
        borderColor: "var(--mode-border)",
        background: "var(--mode-background)",
      }}
    >
      <div className="flex h-[480px] md:h-[540px]">
        {/* Sidebar */}
        <div
          className="hidden w-48 shrink-0 flex-col border-r p-4 md:flex"
          style={{ borderColor: "var(--mode-border)" }}
        >
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold"
              style={{
                background: "var(--theme-primary)",
                color: "var(--theme-text-on-primary)",
              }}
            >
              M
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: "var(--mode-text)" }}
            >
              MedicLife
            </span>
          </div>

          {/* Nav label */}
          <p
            className="mb-2 text-[10px] font-medium uppercase tracking-wider"
            style={{ color: "var(--mode-text-muted)" }}
          >
            Main
          </p>

          {/* Nav items */}
          <nav className="flex flex-col gap-1">
            <SidebarItem icon={<Home width={15} />} label="Inicio" active />
            <SidebarItem icon={<Group width={15} />} label="Pacientes" />
            <SidebarItem
              icon={<Calendar width={15} />}
              label="Citas"
              badge="5"
            />
            <SidebarItem icon={<Calendar width={15} />} label="Calendario" />
            <SidebarItem icon={<CreditCard width={15} />} label="Pagos" />
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom nav */}
          <nav className="flex flex-col gap-1">
            <SidebarItem icon={<Bell width={15} />} label="Notificaciones" />
            <SidebarItem icon={<Settings width={15} />} label="Configuracion" />
          </nav>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden p-5 md:p-6">
          {/* Header */}
          <div className="mb-5">
            <h3
              className="text-xl font-bold md:text-2xl"
              style={{ color: "var(--mode-text)" }}
            >
              Hola, admin
            </h3>
            <p
              className="text-xs"
              style={{ color: "var(--mode-text-muted)" }}
            >
              Martes, 7 de abril de 2026
            </p>
          </div>

          {/* Stat cards */}
          <div className="mb-5 grid grid-cols-2 gap-3">
            <StatCard
              label="El dia de hoy tienes"
              value="5 Citas"
              icon={<Calendar width={16} />}
            />
            <StatCard
              label="Tu proxima cita:"
              value="Edgar Vega"
              sublabel="Hoy a las 12:00 p.m."
            />
          </div>

          {/* Appointments section */}
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <div>
                <p
                  className="text-xs"
                  style={{ color: "var(--mode-text-muted)" }}
                >
                  Citas de hoy
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--mode-text)" }}
                >
                  Martes, 7 de abril
                </p>
              </div>
            </div>

            {/* Tab pills */}
            <div className="mb-3 mt-2 flex gap-2">
              <PillTab label="Pendientes" active />
              <PillTab label="Completadas" />
              <PillTab label="En proceso" />
            </div>

            {/* Appointment row */}
            <div
              className="flex items-center justify-between rounded-xl border p-3"
              style={{
                borderColor: "var(--mode-border)",
                background: "var(--mode-surface)",
              }}
            >
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--mode-text)" }}
                >
                  11:00 a.m , Edgar Eduardo Vega Ruiz
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-medium"
                    style={{
                      borderColor: "var(--mode-border)",
                      color: "var(--mode-text)",
                      background: "transparent",
                    }}
                  >
                    <Check width={10} /> Completada
                  </button>
                  <button
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-medium"
                    style={{
                      borderColor: "var(--mode-border)",
                      color: "var(--mode-text)",
                      background: "transparent",
                    }}
                  >
                    <Clock width={10} /> Reprogramar
                  </button>
                </div>
              </div>
              <MoreHoriz
                width={16}
                style={{ color: "var(--mode-text-muted)" }}
              />
            </div>
          </div>
        </div>

        {/* Right sidebar (widgets) */}
        <div
          className="hidden w-56 shrink-0 flex-col gap-4 border-l p-4 lg:flex"
          style={{ borderColor: "var(--mode-border)" }}
        >
          {/* Mini calendar */}
          <MiniCalendar />

          {/* Upcoming appointments */}
          <div>
            <p
              className="mb-1 text-xs font-semibold"
              style={{ color: "var(--mode-text)" }}
            >
              Proximas Citas
            </p>
            <p
              className="mb-2 text-[10px]"
              style={{ color: "var(--mode-text-muted)" }}
            >
              4 citas pendientes hoy
            </p>
            <div className="flex flex-col gap-1.5">
              <UpcomingRow name="Maria Gonzalez" time="2:30 PM" badge="15m" />
              <UpcomingRow name="Carlos Ramirez" time="3:00 PM" badge="45m" />
              <UpcomingRow name="Ana Martinez" time="3:30 PM" badge="1h 15m" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================== */
/* Sub-components                             */
/* ========================================== */

function SidebarItem({
  icon,
  label,
  active,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors"
      style={{
        background: active ? "var(--mode-surface)" : "transparent",
        color: active ? "var(--mode-text)" : "var(--mode-text-muted)",
        border: active ? "1px solid var(--mode-border)" : "1px solid transparent",
      }}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge && (
        <span
          className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
          style={{
            background: "var(--theme-primary)",
            color: "var(--theme-text-on-primary)",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  sublabel,
  icon,
}: {
  label: string;
  value: string;
  sublabel?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl border p-3"
      style={{
        borderColor: "var(--mode-border)",
        background: "var(--mode-surface)",
      }}
    >
      <div className="flex items-start justify-between">
        <p
          className="text-[10px]"
          style={{ color: "var(--mode-text-muted)" }}
        >
          {label}
        </p>
        {icon && (
          <span style={{ color: "var(--mode-text-muted)" }}>{icon}</span>
        )}
      </div>
      <p
        className="mt-1 text-lg font-bold"
        style={{ color: "var(--mode-text)" }}
      >
        {value}
      </p>
      {sublabel && (
        <p
          className="mt-0.5 text-[10px]"
          style={{ color: "var(--mode-text-muted)" }}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
}

function PillTab({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className="rounded-full border px-3 py-1 text-[10px] font-medium"
      style={{
        borderColor: active ? "var(--theme-primary)" : "var(--mode-border)",
        background: active ? "var(--theme-primary)" : "transparent",
        color: active
          ? "var(--theme-text-on-primary)"
          : "var(--mode-text-secondary)",
      }}
    >
      {label}
    </span>
  );
}

function MiniCalendar() {
  const days = ["D", "L", "M", "X", "J", "V", "S"];
  const dates = [
    [0, 0, 0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 0, 0],
  ];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p
          className="text-xs font-semibold"
          style={{ color: "var(--mode-text)" }}
        >
          Abril 2026
        </p>
        <div className="flex gap-1">
          <NavArrowRight
            width={12}
            className="rotate-180"
            style={{ color: "var(--mode-text-muted)" }}
          />
          <NavArrowRight
            width={12}
            style={{ color: "var(--mode-text-muted)" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {days.map((d) => (
          <span
            key={d}
            className="text-[9px] font-medium"
            style={{ color: "var(--mode-text-muted)" }}
          >
            {d}
          </span>
        ))}
        {dates.flat().map((d, i) => (
          <span
            key={i}
            className="flex h-5 w-5 items-center justify-center rounded-full text-[9px]"
            style={{
              color:
                d === 0
                  ? "transparent"
                  : d === 7
                    ? "var(--theme-text-on-primary)"
                    : "var(--mode-text-secondary)",
              background: d === 7 ? "var(--theme-primary)" : "transparent",
              border:
                d === 7 ? "1px solid var(--theme-primary)" : "1px solid transparent",
            }}
          >
            {d || ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function UpcomingRow({
  name,
  time,
  badge,
}: {
  name: string;
  time: string;
  badge: string;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border p-2"
      style={{
        borderColor: "var(--mode-border)",
        background: "var(--mode-surface)",
      }}
    >
      <span
        className="text-[10px] font-medium"
        style={{ color: "var(--mode-text)" }}
      >
        {name}
      </span>
      <div className="flex items-center gap-1.5">
        <span
          className="text-[9px]"
          style={{ color: "var(--mode-text-muted)" }}
        >
          {time}
        </span>
        <span
          className="rounded-full px-1.5 py-0.5 text-[8px] font-bold"
          style={{
            background: "var(--theme-primary)",
            color: "var(--theme-text-on-primary)",
          }}
        >
          {badge}
        </span>
      </div>
    </div>
  );
}
