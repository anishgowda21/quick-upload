import { useState } from "react";
import toast from "react-hot-toast";

interface CopyButtonProps {
  text: string;
  label: string;
}

export default function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label} copied!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={copied}
      className={`px-2 py-1 text-xs rounded border ${
        copied
          ? "bg-green-100 border-green-300 text-green-700"
          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {copied ? "✓" : label}
    </button>
  );
}
