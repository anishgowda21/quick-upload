import { UploadButton, UploadDropzone } from "../utils/uploadthing-client";
import toast from "react-hot-toast";
import { useFiles } from "../hooks/useFiles";

export function FileUploader() {
  const { refreshFiles } = useFiles();
  return (
    <div className="w-full">
      <UploadDropzone
        appearance={{
          container: {
            height: "180px",
            minHeight: "120px",
            padding: "20px",
          },

          label: {
            fontSize: "14px",
          },
          allowedContent: {
            fontSize: "12px",
            margin: "4px 0",
          },
        }}
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          toast.success("Upload Completed");
          refreshFiles();
        }}
        onUploadError={(error: Error) => {
          toast.error("Error, could not upload!");
        }}
      />
    </div>
  );
}
