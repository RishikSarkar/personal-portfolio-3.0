"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-2xl font-light mb-4">Something went wrong</h1>
      <p className="text-white/80 mb-8 text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-white/10 text-white font-light hover:bg-white/20 transition-colors duration-100"
      >
        Try again
      </button>
    </div>
  );
}
