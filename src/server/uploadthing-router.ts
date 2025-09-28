import { createUploadthing, type FileRouter, UTApi } from "uploadthing/server";
import { auth } from "../utils/auth";
import { addFile } from "../db/operations/fileOperations";

const f = createUploadthing();

const getUser = async (req: Request) => {
  const session = await auth.api
    .getSession({ headers: req.headers })
    .catch(() => null);

  return session?.user || null;
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await getUser(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      const savedFile = await addFile(metadata.userId, file);
      console.log("Saved file:", savedFile);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const utapi = new UTApi({ token: import.meta.env.UPLOADTHING_TOKEN});
