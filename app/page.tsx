import { getCurrentOrg } from "@/lib/org";
import { AppShell } from "@/components/app-shell";
import { OrgAutoActivator } from "@/components/org-auto-activator";

export default async function HomePage() {
  const currentOrg = await getCurrentOrg();

  return (
    <>
      <AppShell currentOrg={currentOrg} />
      {currentOrg?.needsActivation && (
        <OrgAutoActivator
          orgId={currentOrg.id}
          needsActivation={currentOrg.needsActivation}
        />
      )}
    </>
  );
}
