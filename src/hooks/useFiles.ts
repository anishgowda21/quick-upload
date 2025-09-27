import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../utils/query-client";
import { fetchFiles } from "../utils/file-api";
import type { FileData } from "../types/file";

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
