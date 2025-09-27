import { useEffect, useState } from "react";
import { signOut, useSession } from "../utils/auth-client";

export default function SignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session) {
      const skeleton = document.getElementById("auth-skeleton");
      const component = document.getElementById("auth-component");

      skeleton?.classList.add("hidden");
      component?.classList.remove("hidden");
    }
  }, [isPending, session]);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
      <div>
        <p className="text-sm text-gray-600">Signed in as</p>
        <p className="font-medium text-gray-900">{session.user.email}</p>
      </div>
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
}
