import { useState } from "react";
import { Check } from "lucide-react";
import toast from "react-hot-toast";

interface CopyButtonProps {
  text: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

export default function CopyButton({
  text,
  label,
  icon: Icon,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
    >
      {copied ? <Check size={12} /> : <Icon size={12} />}
      <span>{copied ? "Copied!" : label}</span>
    </button>
  );
}
