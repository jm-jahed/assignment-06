import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page Not Found — FitLog",
  description: "The page or workout you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center justify-center text-center space-y-6">
      {/* 404 Badge */}
      <div className="px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black uppercase tracking-widest">
        404 — PAGE NOT FOUND
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
        WORKOUT OUT OF RANGE
      </h1>

      {/* Description */}
      <p className="text-neutral-400 text-base sm:text-lg max-w-md leading-relaxed">
        The page or workout you requested could not be found. It may have been moved, removed, or never existed.
      </p>

      {/* Back to Library CTA */}
      <Link
        href="/#library"
        className="inline-flex items-center gap-2.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-[0_0_20px_rgba(204,255,0,0.25)]"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Workout Library</span>
      </Link>
    </div>
  );
}
