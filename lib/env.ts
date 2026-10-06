function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    throw new Error(
      `[Cartograph Config Error] Missing required environment variable: ${key}. ` +
        `Ensure it is set in .env.local or the process environment.`
    );
  }
  return value;
}

export const env = {
  get NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY() {
    return getEnvVar("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
  },
  get CLERK_SECRET_KEY() {
    return getEnvVar("CLERK_SECRET_KEY");
  },
  get NEXT_PUBLIC_CLERK_SIGN_IN_URL() {
    return process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in";
  },
  get NEXT_PUBLIC_CLERK_SIGN_UP_URL() {
    return process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up";
  },
  get NEXT_PUBLIC_SUPABASE_URL() {
    return getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
  },
  get NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY() {
    return (
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      getEnvVar("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
    );
  },
};

// Validate all critical variables immediately upon server initialization
export function validateEnv() {
  if (typeof window === "undefined") {
    const required = [
      env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      env.CLERK_SECRET_KEY,
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    ];
    if (required.length === 0) {
      throw new Error("[Cartograph Config Error] Environment initialization failed.");
    }
  }
}
