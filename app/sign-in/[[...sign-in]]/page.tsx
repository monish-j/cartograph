import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--bg-canvas)] p-4 font-mono">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
            Cartograph
          </span>
          <span className="rounded border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]">
            Sign In
          </span>
        </div>
        <SignIn
          appearance={{
            elements: {
              card: "border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-none rounded",
              headerTitle: "text-[var(--text-primary)] font-mono text-sm",
              headerSubtitle: "text-[var(--text-muted)] font-mono text-xs",
              socialButtonsBlockButton:
                "border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-xs rounded",
              formButtonPrimary:
                "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-mono text-xs rounded",
              formFieldInput:
                "border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] font-mono text-xs rounded focus:border-[var(--accent)]",
              footerActionLink: "text-[var(--accent)] hover:underline font-mono text-xs",
            },
          }}
        />
      </div>
    </div>
  );
}
