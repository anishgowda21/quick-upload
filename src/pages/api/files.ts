import type { APIRoute } from "astro";
import { auth } from "../../utils/auth";
import { deleteFile, getAllFiles } from "../../db/operations/fileOperations";
import { utapi } from "../../server/uploadthing-router";

const headers = { "Content-Type": "application/json" };
export const GET: APIRoute = async ({ request }) => {
  try {
    const session = await auth.api
      .getSession({ headers: request.headers })
      .catch(() => null);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers,
      });
    }

    const files = await getAllFiles(session.user.id);

    return new Response(JSON.stringify(files), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve files" }), {
      status: 500,
      headers,
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const session = await auth.api
      .getSession({ headers: request.headers })
      .catch(() => null);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers,
      });
    }

    const { key } = await request.json();

    if (!key) {
      return new Response(JSON.stringify({ error: "Key not provided" }), {
        status: 400,
        headers,
      });
    }

    const { success } = await utapi.deleteFiles(key);

    if (success) {
      console.log("Delete key =>", key);
      await deleteFile(key);
      return new Response(JSON.stringify({}), { status: 200, headers });
    }
    return new Response(JSON.stringify({ error: "Failed to delete file" }), {
      status: 500,
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete file" }), {
      status: 500,
      headers,
    });
  }
};
