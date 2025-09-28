import type { FileData } from "../types/file";

export async function fetchFiles(): Promise<FileData[]> {
  const response = await fetch("/api/files");
  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }
  const data = await response.json();
  return data;
}

export async function deleteFile(key: string): Promise<void> {
  const response = await fetch("/api/files", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to delete file: ${errText}`);
  }
}
