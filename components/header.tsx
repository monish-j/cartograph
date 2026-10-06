import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { ThemeSwitcher } from "./theme-switcher";
import type { CurrentOrg } from "@/lib/org";

interface HeaderProps {
  currentOrg: CurrentOrg | null;
}

export function Header({ currentOrg }: HeaderProps) {
  return (
    <header className="flex h-11 w-full items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 select-none">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold tracking-tight text-[var(--text-primary)]">
            Cartograph
          </span>
          <span className="rounded bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] px-1.5 py-0.2 font-mono text-[10px] text-[var(--text-muted)]">
            v0.1.0
          </span>
        </div>

        <div className="h-4 w-px bg-[var(--border-subtle)]" />

        <div className="flex items-center gap-2 font-mono text-xs">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: "flex items-center text-xs",
                organizationSwitcherTrigger:
                  "h-7 px-2 text-xs border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] rounded font-mono font-normal transition-colors",
                organizationPreviewMainIdentifier: "text-xs font-mono text-[var(--text-primary)]",
                organizationSwitcherTriggerIcon: "text-[var(--text-muted)] w-3.5 h-3.5",
              },
            }}
          />
          {currentOrg && (
            <span
              id="server-rendered-org-badge"
              data-org-id={currentOrg.id}
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] border-l border-[var(--border-subtle)] pl-2"
            >
              <span>Org:</span>
              <span className="font-medium text-[var(--text-primary)]">
                {currentOrg.name}
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <div className="h-4 w-px bg-[var(--border-subtle)]" />
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-6 h-6 rounded border border-[var(--border-subtle)]",
            },
          }}
        />
      </div>
    </header>
  );
}
