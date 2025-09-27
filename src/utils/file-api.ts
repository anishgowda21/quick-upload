import type { FileData } from "../types/file";

export async function fetchFiles(): Promise<FileData[]> {
  const response = await fetch("/api/files");
  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }
  const data = await response.json();
  return data;
}
