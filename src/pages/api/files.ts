import type { APIRoute } from "astro";
import { auth } from "../../utils/auth";
import { getAllFiles } from "../../db/operations/fileOperations";

export const GET: APIRoute = async ({ request }) => {
  try {
    const session = await auth.api
      .getSession({ headers: request.headers })
      .catch(() => null);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const files = await getAllFiles(session.user.id);

    return new Response(JSON.stringify(files), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve files" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
