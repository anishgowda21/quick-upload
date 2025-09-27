interface ErrorStateProps {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="text-red-600 p-4 border border-red-200 rounded">
      Failed to load files.
      <button onClick={onRetry} className="ml-2 text-red-800 underline">
        Retry
      </button>
    </div>
  );
}
