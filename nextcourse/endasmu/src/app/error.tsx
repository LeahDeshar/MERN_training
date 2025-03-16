"use client";
import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("GlobalError caught an error:", error);
    // You can replace the above line with a call to your error reporting service
    // e.g., Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
