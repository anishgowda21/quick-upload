import { UploadButton } from "../utils/uploadthing-client";
import toast from "react-hot-toast";

export function ImageUploader() {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        toast("Upload Completed", { position: "top-right", icon: "✅" });
      }}
      onUploadError={(error: Error) => {
        toast("Error, could not upload!", {
          position: "top-right",
          icon: "❌",
        });
      }}
    />
  );
}
