"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Theme = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "cartograph-theme";

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cartograph-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cartograph-theme-change", callback);
  };
}

function getThemeSnapshot(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme;
  if (stored === "system" || stored === "light" || stored === "dark") {
    return stored;
  }
  return "system";
}

function getThemeServerSnapshot(): Theme {
  return "system";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(t: Theme) {
      const isDark = t === "dark" || (t === "system" && mediaQuery.matches);
      const effective: ResolvedTheme = isDark ? "dark" : "light";

      setResolvedTheme(effective);
      root.setAttribute("data-theme", effective);
      if (effective === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
      document.cookie = `${STORAGE_KEY}=${t}; path=/; max-age=31536000; SameSite=Lax`;
    }

    applyTheme(theme);

    function handleSystemChange() {
      if (theme === "system") {
        applyTheme("system");
      }
    }

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  const setTheme = (nextTheme: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
      window.dispatchEvent(new Event("cartograph-theme-change"));
    } catch {
      // Ignore localStorage errors
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeScript() {
  const scriptContent = `
    (function() {
      try {
        var stored = localStorage.getItem('${STORAGE_KEY}') || 'system';
        var isDark = stored === 'dark' || (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        var root = document.documentElement;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        if (isDark) {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}
