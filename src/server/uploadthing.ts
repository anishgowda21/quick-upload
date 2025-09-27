import { createUploadthing, type FileRouter } from "uploadthing/server";
import { auth } from "../utils/auth";

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
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
