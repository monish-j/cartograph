import { auth, clerkClient } from "@clerk/nextjs/server";

export interface CurrentOrg {
  id: string;
  name: string;
  slug: string | null;
  role: string | null;
  needsActivation?: boolean;
}

/**
 * Resolves the active organization for the currently authenticated user during server rendering.
 * If the user has an active org in their session, returns it.
 * If the user has no active org in their session, either picks their existing membership or
 * auto-provisions a personal team organization without asking them to create it.
 */
export async function getCurrentOrg(): Promise<CurrentOrg | null> {
  const { userId, orgId, orgRole, orgSlug } = await auth();
  if (!userId) return null;

  const client = await clerkClient();

  if (orgId) {
    try {
      const org = await client.organizations.getOrganization({ organizationId: orgId });
      return {
        id: org.id,
        name: org.name,
        slug: orgSlug ?? org.slug,
        role: orgRole ?? null,
        needsActivation: false,
      };
    } catch {
      // If fetching org details by ID fails, fallback below
    }
  }

  // Check if the user already has memberships (e.g. from an accepted invitation)
  const memberships = await client.users.getOrganizationMembershipList({ userId });
  if (memberships.data && memberships.data.length > 0) {
    const firstMembership = memberships.data[0];
    return {
      id: firstMembership.organization.id,
      name: firstMembership.organization.name,
      slug: firstMembership.organization.slug,
      role: firstMembership.role,
      needsActivation: true,
    };
  }

  // Auto-provision a new organization for first-time sign-in
  const user = await client.users.getUser(userId);
  const orgName =
    user.firstName && user.firstName.trim() !== ""
      ? `${user.firstName}'s Team`
      : user.username && user.username.trim() !== ""
      ? `${user.username}'s Team`
      : user.emailAddresses?.[0]?.emailAddress
      ? `${user.emailAddresses[0].emailAddress.split("@")[0]}'s Team`
      : "Workspace";

  const newOrg = await client.organizations.createOrganization({
    name: orgName,
    createdBy: userId,
  });

  return {
    id: newOrg.id,
    name: newOrg.name,
    slug: newOrg.slug,
    role: "org:admin",
    needsActivation: true,
  };
}
