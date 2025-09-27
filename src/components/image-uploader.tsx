import { UploadButton } from "../utils/uploadthing-client";
import toast from "react-hot-toast";
import { useFiles } from "../hooks/useFiles";

export function ImageUploader() {
  const { refreshFiles } = useFiles();
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        toast.success("Upload Completed");
        refreshFiles();
      }}
      onUploadError={(error: Error) => {
        toast.error("Error, could not upload!");
      }}
    />
  );
}
