# View Transitions - Estructura Modular

## 📁 Estructura de Archivos

```
src/styles/view-transitions/
├── base-transitions.css         # Configuración global
├── dialog-transitions.css       # Modales y diálogos (SettingsModal, etc.)
├── theme-transitions.css        # Cambios de tema/modo/fuente
├── datepicker-transitions.css   # Dropdown del DatePicker
├── panel-transitions.css        # Paneles laterales (CalendarSearchPanel)
└── dashboard-transitions.css    # Widgets del Dashboard
```

## 🎯 ¿Por qué Modular?

**Antes (Monolítico):**

- ❌ Todo en `index.css` (600+ líneas)
- ❌ Difícil de mantener
- ❌ Cambios en una animación rompían otras
- ❌ Imposible de reutilizar

**Ahora (Modular):**

- ✅ Cada tipo de transición aislada
- ✅ Fácil de debuggear
- ✅ Sin conflictos entre animaciones
- ✅ Reutilizable y escalable

## 📋 Descripción de Archivos

### 1. `base-transitions.css`

**Propósito:** Configuración global y utilidades compartidas.

**Contiene:**

- `:root { view-transition-name: none; }` - Prevenir transiciones en root
- `::view-transition { pointer-events: none; }` - Desactivar eventos durante transiciones
- `.animate-fadeIn` - Utilidad de fade in genérica

**Uso:** Configuración base para todas las View Transitions.

---

### 2. `dialog-transitions.css`

**Propósito:** Animaciones para modales y diálogos.

**Usado en:**

- `SettingsModal.tsx`
- Cualquier `<dialog>` con `useDialogTransition`

**Nombres de transición:**

- `vt-shared` - Nombre compartido para morph
- `vt-element-animation` - Clase para apertura
- `vt-element-animation-closing` - Clase para cierre

**Animaciones:**

- **Apertura:** Fade in + morph desde elemento origen (500ms)
- **Cierre:** Fade out + morph hacia elemento origen (500ms)

**Keyframes:**

```css
vt-fade-in: opacity 0 → 1
vt-fade-out: opacity 1 → 0
```

**Características:**

- `[origin-element] { opacity: 0; }` - Oculta elemento origen durante transición

---

### 3. `theme-transitions.css`

**Propósito:** Animaciones para cambios de tema, modo o fuente.

**Usado en:**

- `AparienciaSection.tsx` (cambio de tema)
- Hook: `useThemeTransition.ts`

**Nombre de transición:**

- `theme-change` - Asignado al `document.documentElement`

**Animaciones:**

- **Duración:** 900ms (transición suave y dramática)
- **Efecto:** Crossfade con blur, desaturación y cambio de brillo

**Keyframes:**

```css
vt-theme-fade-out:
  - opacity: 1 → 0
  - blur: 0px → 16px
  - saturate: 100% → 50%
  - brightness: 100% → 90%

vt-theme-fade-in:
  - opacity: 0 → 1
  - blur: 16px → 0px
  - saturate: 150% → 100%
  - brightness: 110% → 100%
```

**Técnicas visuales:**

- **Blur progresivo:** El tema saliente se difumina gradualmente (0→16px)
- **Desaturación:** Los colores pierden intensidad al desaparecer
- **Brillo reducido:** El tema saliente se oscurece ligeramente
- **Sobre-saturación inicial:** El tema entrante inicia más vibrante y se normaliza
- **Brillo aumentado:** El tema entrante inicia más brillante para efecto dramático

**⚠️ CRÍTICO:**
El hook `useThemeTransition` **DEBE** asignar `viewTransitionName` ANTES de `startViewTransition`:

```typescript
// ✅ CORRECTO
document.documentElement.style.viewTransitionName = "theme-change";
const transition = document.startViewTransition(() => {
  setter(value);
});
```

---

### 4. `datepicker-transitions.css`

**Propósito:** Animaciones para dropdown del DatePicker.

**Usado en:**

- `DatePicker.tsx` (componente personalizado)

**Nombres de transición:**

- `datepicker-shared` - Nombre compartido
- `datepicker-element-animation` - Apertura
- `datepicker-element-animation-closing` - Cierre

**Animaciones:**

- Similar a `dialog-transitions.css` pero con nombre único
- Evita conflictos con otros modales

---

### 5. `panel-transitions.css`

**Propósito:** Paneles laterales que se deslizan desde la derecha.

**Usado en:**

- `CalendarSearchPanel.tsx`
- Cualquier panel lateral futuro

**Nombres de transición:**

- `vt-panel-slide` - Apertura
- `vt-panel-slide-closing` - Cierre

**Animaciones:**

- **Apertura:** Slide in desde derecha (400ms)
- **Cierre:** Slide out hacia derecha (300ms)

**Keyframes:**

```css
vt-panel-slide-in: translateX(100%) → translateX(0)
vt-panel-slide-out: translateX(0) → translateX(100%)
```

**Fallback CSS (sin View Transitions):**

- `.animate-slide-in-right` - Animación CSS pura
- `.animate-slide-out-right` - Animación CSS pura

---

### 6. `dashboard-transitions.css`

**Propósito:** Animaciones para widgets del Dashboard.

**Usado en:**

- `Dashboard.tsx`
- Widgets dinámicos

**Nombre de transición:**

- `dashboard-widget`

**Animaciones:**

- **Efecto:** Fade + scale (400ms)
- **Uso:** Cambiar widgets del dashboard dinámicamente

**Keyframes:**

```css
dashboard-widget-fade-out: opacity 1 → 0, scale 1 → 0.95
dashboard-widget-fade-in: opacity 0 → 1, scale 0.95 → 1
```

**Utilidades:**

- `.dashboard-animate { opacity: 0; transform: translateY(20px); }` - Estado inicial para GSAP
- `[class*="dashboard-widget"] { transition: all 0.3s; }` - Transiciones suaves

---

## 🔧 Uso

### Importar en `index.css`:

```css
@import "./styles/view-transitions/base-transitions.css";
@import "./styles/view-transitions/dialog-transitions.css";
@import "./styles/view-transitions/theme-transitions.css";
@import "./styles/view-transitions/datepicker-transitions.css";
@import "./styles/view-transitions/panel-transitions.css";
@import "./styles/view-transitions/dashboard-transitions.css";
```

### Hook para Diálogos (`useDialogTransition`):

```typescript
import { useDialogTransition } from "@/hooks/viewtransitions/useDialogTransition";

const { dialogRef, openDialog, closeDialog } = useDialogTransition();

<button onClick={openDialog}>Abrir</button>
<dialog ref={dialogRef} className="...">
  <button onClick={closeDialog}>Cerrar</button>
</dialog>
```

### Hook para Temas (`useThemeTransition`):

```typescript
import { useThemeTransition } from "@/hooks/useThemeTransition";

const { changeThemeWithTransition } = useThemeTransition();

// Cambiar tema con animación
changeThemeWithTransition(setThemeName, "blue");
```

---

## ⚠️ Errores Comunes

### Error 1: Transición no funciona

**Causa:** No se asigna `viewTransitionName` antes de `startViewTransition`.

**Solución:**

```typescript
// ❌ INCORRECTO
const transition = document.startViewTransition(() => {
  element.style.viewTransitionName = "shared"; // ❌ Muy tarde!
});

// ✅ CORRECTO
element.style.viewTransitionName = "shared";
const transition = document.startViewTransition(() => {
  // El nombre ya está asignado
});
```

---

### Error 2: Conflictos entre transiciones

**Causa:** Múltiples elementos con el mismo `viewTransitionName` simultáneamente.

**Solución:** Usar nombres únicos por tipo de transición:

- Dialogs: `vt-shared`
- Tema: `theme-change`
- DatePicker: `datepicker-shared`
- Panel: `vt-panel-slide`
- Dashboard: `dashboard-widget`

---

### Error 3: Animación se corta o parpadea

**Causa:** No limpiar `viewTransitionName` después de la transición.

**Solución:**

```typescript
const transition = document.startViewTransition(() => {
  /* ... */
});

await transition.finished;
element.style.viewTransitionName = ""; // ✅ Limpiar
```

---

## 🎨 Personalización

### Cambiar duración:

```css
/* En el archivo correspondiente */
::view-transition-group(theme-change) {
  animation-duration: 1000ms; /* 700ms → 1000ms */
}
```

### Cambiar easing:

```css
::view-transition-group(vt-shared) {
  animation-timing-function: ease-in-out; /* Cambiar curva */
}
```

### Agregar nueva transición:

1. Crear archivo `src/styles/view-transitions/mi-transicion.css`
2. Definir `viewTransitionName` único
3. Importar en `index.css`:
   ```css
   @import "./styles/view-transitions/mi-transicion.css";
   ```

---

## 📚 Referencias

- [View Transitions API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [Chrome Developers - Smooth transitions](https://developer.chrome.com/docs/web-platform/view-transitions/)

---

## ✅ Checklist de Implementación

Para agregar una nueva View Transition:

- [ ] Crear archivo CSS en `view-transitions/`
- [ ] Definir `viewTransitionName` único
- [ ] Configurar keyframes
- [ ] Importar en `index.css`
- [ ] Crear hook si es necesario (ej: `useMyTransition`)
- [ ] Asignar `viewTransitionName` ANTES de `startViewTransition`
- [ ] Limpiar `viewTransitionName` después de `transition.finished`
- [ ] Agregar fallback para navegadores sin soporte
- [ ] Documentar en este README

---

**Última actualización:** Febrero 15, 2026
**Autor:** MedicLife Team
