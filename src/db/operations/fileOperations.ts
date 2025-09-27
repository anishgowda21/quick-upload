import type { UploadedFileData } from "uploadthing/types";
import { db } from "../database";
import { file } from "../schema/file-schema";
import { eq } from "drizzle-orm";

export async function addFile(userId: string, uploadedFile: UploadedFileData) {
  try {
    const newFile = await db
      .insert(file)
      .values({
        id: uploadedFile.key,
        name: uploadedFile.name,
        hash: uploadedFile.fileHash,
        lastModified: uploadedFile.lastModified
          ? new Date(uploadedFile.lastModified)
          : null,
        size: uploadedFile.size,
        type: uploadedFile.type || "application/octet-stream",
        url: uploadedFile.ufsUrl,
        userId,
      })
      .returning();

    return newFile;
  } catch (error) {
    console.error("Failed to add file to database:", error);
    throw new Error("Failed to save file metadata");
  }
}

export async function getAllFiles(userId: string) {
  try {
    const userFiles = await db
      .select()
      .from(file)
      .where(eq(file.userId, userId));
    return userFiles;
  } catch (error) {
    console.error("Failed to retrieve files from database:", error);
    throw new Error("Failed to retrieve user files");
  }
}
