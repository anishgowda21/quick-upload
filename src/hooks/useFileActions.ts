import { toast } from "react-hot-toast";
import { deleteFile } from "../utils/file-api";

export function useFileActions(onRefresh: () => void) {
  const handleDelete = async (fileId: string, fileName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${fileName}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteFile(fileId);
      toast.success(`File "${fileName}" deleted successfully`);
      onRefresh();
    } catch (error) {
      console.error("Failed to delete file:", error);
      toast.error("Cannot delete file. Please try again.");
    }
  };

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    handleDelete,
    handleDownload,
  };
}
