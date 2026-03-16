// adapters/react.tsx
import React, { useState, createContext, useContext, useMemo } from "react";
import { ThemeEngine, ThemeConfig } from "../core/theme-engine";

export function createReactTheme<T extends ThemeConfig>(
  engine: ThemeEngine<T>
) {
  const ThemeContext = createContext({
    theme: engine.getCurrentTheme() as string,
    setTheme: (name: string) => {},
  });

  const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, _setTheme] = useState(engine.getCurrentTheme() as string);

    const setTheme = (name: string) => {
      engine.applyTheme(name);
      _setTheme(name);
    };

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
  };

  const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
  };

  return {
    ThemeProvider,
    useTheme,
  };
}
