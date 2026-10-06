"use client";

import { useEffect, useRef } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface OrgAutoActivatorProps {
  orgId: string;
  needsActivation?: boolean;
}

/**
 * When a user lands without an active org in their session token (e.g. brand new user
 * whose org was auto-provisioned, or an invited user accepting an invite), this component
 * sets the active organization in the Clerk session once the client session is loaded.
 */
export function OrgAutoActivator({ orgId, needsActivation }: OrgAutoActivatorProps) {
  const { isLoaded, isSignedIn, sessionId, orgId: currentOrgId } = useAuth();
  const { setActive } = useClerk();
  const router = useRouter();
  const activatedRef = useRef(false);

  useEffect(() => {
    if (
      needsActivation &&
      isLoaded &&
      isSignedIn &&
      sessionId &&
      orgId &&
      currentOrgId !== orgId &&
      !activatedRef.current &&
      setActive
    ) {
      activatedRef.current = true;
      setActive({ session: sessionId, organization: orgId })
        .then(() => {
          router.refresh();
        })
        .catch(() => {
          activatedRef.current = false;
        });
    }
  }, [needsActivation, isLoaded, isSignedIn, sessionId, orgId, currentOrgId, setActive, router]);

  return null;
}
