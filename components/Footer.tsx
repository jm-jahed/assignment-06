import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-neutral-800/80 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-md transition-opacity hover:opacity-90"
          aria-label="FitLog Home"
        >
          <div className="relative w-6 h-6 flex-shrink-0">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-black text-lg tracking-wider text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Exact Copyright Text */}
        <p className="text-xs text-neutral-400 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
