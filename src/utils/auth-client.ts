import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: import.meta.env.PUBLIC_BETTER_AUTH_URL,
});
