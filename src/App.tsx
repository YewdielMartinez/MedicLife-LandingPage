import { useTheme } from "./hooks/useTheme";
import { LanguageProvider } from "./lib/i18n/LanguageProvider";
import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  Pricing,
  FontShowcase,
  ThemeShowcase,
  CTA,
  Footer,
} from "./components/landing";

function App() {
  const { mode, theme, toggleMode, setTheme } = useTheme();

  return (
    <LanguageProvider>
      <div
        className="min-h-screen"
        style={{ background: "var(--mode-background)" }}
      >
        <Navbar mode={mode} onToggleMode={toggleMode} />
        <Hero mode={mode} />
        <Features />
        <HowItWorks />
        <Pricing />
        <FontShowcase />
        <ThemeShowcase
          mode={mode}
          currentTheme={theme}
          onSelectTheme={setTheme}
          onToggleMode={toggleMode}
        />
        <CTA />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
