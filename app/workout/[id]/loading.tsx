import React from "react";

export default function WorkoutLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[60vh] flex flex-col items-center justify-center py-24 space-y-4 max-w-7xl mx-auto px-4"
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-neutral-800" />
        <div className="absolute inset-0 rounded-full border-4 border-[#ccff00] border-t-transparent animate-spin" />
      </div>
      <p className="text-neutral-300 font-semibold tracking-wide text-base">
        Loading workout…
      </p>
    </div>
  );
}
