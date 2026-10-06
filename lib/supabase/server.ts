import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { env } from "@/lib/env";

/**
 * Creates a Supabase client for server code that attaches the user's signed-in
 * Clerk session token in the Authorization header.
 *
 * Persisted sessions and refresh handling are disabled so Supabase does not try
 * to manage its own cookie/session layer alongside Clerk.
 */
export async function createServerSupabaseClient() {
  const { getToken } = await auth();

  let token: string | null = null;
  try {
    token = await getToken({ template: "supabase" });
  } catch {
    token = await getToken();
  }
  if (!token) {
    token = await getToken();
  }

  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    }
  );
}
