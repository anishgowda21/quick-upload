import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { useFiles } from "../../hooks/useFiles";
import ConfirmModal from "../ConfirmModal";
import { deleteFile } from "../../utils/file-api";
import { useState } from "react";
import type { DeleteModel } from "../../types/file";
import toast from "react-hot-toast";

export default function FilesTable() {
  const { data: files = [], isLoading, error, refetch } = useFiles();

  const [deleteModal, setDeleteModal] = useState<DeleteModel>({
    isOpen: false,
    fileId: "",
    fileName: "",
    isDeleting: false,
  });

  const handleDeleteClick = (fileId: string, fileName: string) => {
    setDeleteModal({
      isOpen: true,
      fileId,
      fileName,
      isDeleting: false,
    });
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

    try {
      await deleteFile(deleteModal.fileId);
      await refetch();
      toast.success(`${deleteModal.fileName} deleted successfully`);
      setDeleteModal({
        isOpen: false,
        fileId: "",
        fileName: "",
        isDeleting: false,
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Cannot delete file. Please try again.");
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteModal.isDeleting) {
      setDeleteModal({
        isOpen: false,
        fileId: "",
        fileName: "",
        isDeleting: false,
      });
    }
  };

  const table = useReactTable({
    data: files,
    columns: columns(handleDeleteClick),
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <>
      <div className="overflow-hidden border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50/50 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-900 border-b border-gray-50 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {files.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-gray-50/30">
            <div className="flex flex-col items-center gap-2">
              <div className="text-gray-400 text-lg">📁</div>
              <p className="text-sm font-medium">No files uploaded yet</p>
              <p className="text-xs text-gray-400">
                Upload your first file to get started
              </p>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete File"
        message={`Are you sure you want to delete "${deleteModal.fileName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteModal.isDeleting}
      />
    </>
  );
}
