import { createColumnHelper } from "@tanstack/react-table";
import { ExternalLink, Trash2, FileText, Hash, Link } from "lucide-react";
import type { FileData } from "../../types/file";
import CopyButton from "./CopyButton";
import { formatDate, formatFileSize } from "../../utils/table-formaters";

const columnHelper = createColumnHelper<FileData>();

export const columns = (
  onDeleteClick: (fileId: string, fileName: string) => void
) => [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-3 max-w-xs">
        <FileText size={16} className="text-blue-500 flex-shrink-0" />
        <a
          href={info.row.original.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline truncate flex items-center gap-1"
          title={info.getValue()}
        >
          <span className="truncate">{info.getValue()}</span>
          <ExternalLink size={12} className="flex-shrink-0" />
        </a>
      </div>
    ),
  }),

  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => (
      <span className="px-2 py-1 bg-gray-100 text-red-700 rounded text-xs">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("size", {
    header: "Size",
    cell: (info) => (
      <span className="font-mono text-sm text-gray-600">
        {formatFileSize(info.getValue())}
      </span>
    ),
  }),

  columnHelper.accessor("createdAt", {
    header: "Uploaded",
    cell: (info) => (
      <span className="text-gray-600 text-sm">
        {formatDate(info.getValue())}
      </span>
    ),
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <CopyButton text={info.row.original.url} label="URL" icon={Link} />
        <CopyButton text={info.row.original.hash} label="Hash" icon={Hash} />
        <button
          onClick={() =>
            onDeleteClick(info.row.original.id, info.row.original.name)
          }
          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
          title="Delete file"
        >
          <Trash2 size={14} />
        </button>
      </div>
    ),
  }),
];
