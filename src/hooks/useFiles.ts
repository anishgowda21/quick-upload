import { useQuery } from "@tanstack/react-query";
import { fetchFiles } from "../utils/file-api";
import type { FileData } from "../types/file";
import { queryClient } from "../utils/query-client";

export function useFiles() {
  const query = useQuery<FileData[]>(
    {
      queryKey: ["files"],
      queryFn: fetchFiles,
    },
    queryClient
  );

  const refreshFiles = () => {
    queryClient.invalidateQueries({ queryKey: ["files"] });
  };

  return {
    ...query,
    refreshFiles,
  };
}
