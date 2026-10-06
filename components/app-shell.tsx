import { Header } from "./header";
import type { CurrentOrg } from "@/lib/org";

interface AppShellProps {
  currentOrg: CurrentOrg | null;
}

export function AppShell({ currentOrg }: AppShellProps) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <Header currentOrg={currentOrg} />

      <main className="flex flex-1 overflow-hidden">
        {/* Left Panel: Repository / File Explorer Placeholder */}
        <aside
          id="panel-explorer"
          className="flex w-64 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs"
        >
          <div className="flex h-8 items-center justify-between border-b border-[var(--border-subtle)] px-3 font-mono text-[11px] text-[var(--text-muted)]">
            <span className="font-semibold uppercase tracking-wider">Explorer</span>
            <span>0 files</span>
          </div>
          <div className="flex flex-1 items-center justify-center p-4 text-center font-mono text-[11px] text-[var(--text-muted)]">
            No repository loaded.
          </div>
        </aside>

        {/* Center Panel: Map Canvas Area */}
        <section
          id="panel-canvas"
          className="relative flex flex-1 flex-col overflow-hidden bg-[var(--bg-canvas)]"
        >
          <div className="flex h-8 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 font-mono text-[11px] text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[var(--text-primary)]">Dependency Canvas</span>
              <span>•</span>
              <span>{currentOrg ? currentOrg.name : "Workspace"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--flow-in)]" />
              <span>Ready</span>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center p-6 text-center">
            <div className="max-w-md space-y-3 font-mono">
              <div className="text-xs font-medium text-[var(--text-primary)]">
                Cartograph Dependency Map
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Connect a public repository in Phase 2 to parse dependencies and draw the structural
                graph.
              </p>
              <div className="inline-flex items-center gap-3 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-[11px] text-[var(--text-subtle)]">
                <span>Active Org ID:</span>
                <code className="text-[var(--text-primary)]">{currentOrg?.id || "None"}</code>
              </div>
            </div>
          </div>

          {/* Bottom Dock: Agent / Lookup Panel Placeholder */}
          <div
            id="panel-lookup"
            className="flex h-10 items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 font-mono text-[11px] text-[var(--text-muted)]"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[var(--accent)]">QUERY</span>
              <span className="text-[var(--text-subtle)]">
                Ask a question about the repository...
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span>In: <span className="text-[var(--flow-in)]">Green</span></span>
              <span>Out: <span className="text-[var(--flow-out)]">Amber</span></span>
            </div>
          </div>
        </section>

        {/* Right Panel: Detail / Inspector Placeholder */}
        <aside
          id="panel-inspector"
          className="flex w-72 flex-col border-l border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs"
        >
          <div className="flex h-8 items-center justify-between border-b border-[var(--border-subtle)] px-3 font-mono text-[11px] text-[var(--text-muted)]">
            <span className="font-semibold uppercase tracking-wider">Inspector</span>
          </div>
          <div className="flex flex-1 items-center justify-center p-4 text-center font-mono text-[11px] text-[var(--text-muted)]">
            Select a file or folder on the canvas to inspect dependencies.
          </div>
        </aside>
      </main>
    </div>
  );
}
