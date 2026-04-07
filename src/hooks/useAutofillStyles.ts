import { useEffect } from "react";

/**
 * Hook para controlar los estilos del autocompletado del navegador
 * @param isDarkMode - Indica si el modo oscuro está activo
 * @param className - Clase CSS que se aplicará a los inputs (default: "autofill-input")
 */
export const useAutofillStyles = (
  isDarkMode: boolean,
  className: string = "autofill-input",
) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .${className}:-webkit-autofill,
      .${className}:-webkit-autofill:hover,
      .${className}:-webkit-autofill:focus,
      .${className}:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 1000px ${isDarkMode ? "#1a1a1a" : "var(--mode-background)"} inset !important;
        -webkit-text-fill-color: var(--mode-text) !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isDarkMode, className]);

  return className;
};
