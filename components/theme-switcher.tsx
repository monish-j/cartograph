"use client";

import { useTheme, Theme } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string }[] = [
    { value: "system", label: "Sys" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode"
      className="inline-flex items-center rounded border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] p-0.5 font-mono text-[11px]"
    >
      {options.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(opt.value)}
            className={`px-2 py-0.5 rounded transition-colors ${
              isActive
                ? "bg-[var(--bg-surface)] text-[var(--text-primary)] font-medium shadow-xs border border-[var(--border-strong)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
