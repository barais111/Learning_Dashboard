import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorTileProps {
  message?: string;
}

export function ErrorTile({ message }: ErrorTileProps) {
  return (
    <article className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-500/20 bg-red-950/20 p-10 text-center shadow-card">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
        <AlertCircle className="h-6 w-6 text-red-400" />
      </div>
      <div>
        <h3 className="mb-1 font-display text-base font-600 text-red-300">
          Failed to load courses
        </h3>
        <p className="text-sm text-white/40">
          {message ?? "Could not connect to the database. Please try again."}
        </p>
      </div>
      <form action="">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition-colors hover:bg-red-500/20"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Retry
        </button>
      </form>
    </article>
  );
}
