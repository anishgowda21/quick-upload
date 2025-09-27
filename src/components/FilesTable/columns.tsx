import { createColumnHelper } from "@tanstack/react-table";
import type { FileData } from "../../types/file";
import CopyButton from "./CopyButton";

const columnHelper = createColumnHelper<FileData>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <a
        href={info.row.original.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 truncate block max-w-xs"
      >
        {info.getValue()}
      </a>
    ),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => (
      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("size", {
    header: "Size",
    cell: (info) => {
      const bytes = info.getValue();
      const sizes = ["Bytes", "KB", "MB", "GB"];
      if (bytes === 0) return "0 Byte";
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return (
        Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
      );
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Uploaded",
    cell: (info) => {
      const date = new Date(info.row.original.createdAt);
      return isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <div className="flex gap-2">
        <CopyButton text={info.row.original.url} label="URL" />
        <CopyButton text={info.row.original.hash} label="Hash" />
      </div>
    ),
  }),
];
