"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Determine active route
  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-neutral-800">
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
      >
        {/* Left: Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-md transition-opacity hover:opacity-90"
          aria-label="FitLog Home"
        >
          <div className="relative w-7 h-7 flex-shrink-0">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-black text-xl tracking-wider text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Middle: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
              isWorkoutActive
                ? "text-[#ccff00] bg-neutral-900 border-b-2 border-[#ccff00]"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
              isMyPlanActive
                ? "text-[#ccff00] bg-neutral-900 border-b-2 border-[#ccff00]"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right: Status Badges (Plan & Saved) + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan Badge - Filled Accent Pill */}
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-1.5 bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-extrabold text-xs px-3 py-1.5 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Today's Plan: ${planCount} items`}
          >
            <span>PLAN</span>
            <span className="bg-black/20 text-black px-1.5 py-0.5 rounded-full text-[11px] font-black min-w-[1.2rem] text-center">
              {planCount}
            </span>
          </Link>

          {/* Saved Badge - Outlined Pill */}
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 border border-neutral-700 hover:border-neutral-500 bg-neutral-900/70 hover:bg-neutral-800 active:scale-95 text-neutral-200 hover:text-white font-semibold text-xs px-3 py-1.5 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
            aria-label={`Saved workouts: ${savedCount} items`}
          >
            <span>SAVED</span>
            <span className="bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded-full text-[11px] font-medium min-w-[1.2rem] text-center">
              {savedCount}
            </span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] transition-colors"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-[#0d0d0e] px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-semibold tracking-wide uppercase transition-colors ${
              isWorkoutActive
                ? "bg-neutral-900 text-[#ccff00] border-l-2 border-[#ccff00]"
                : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-semibold tracking-wide uppercase transition-colors ${
              isMyPlanActive
                ? "bg-neutral-900 text-[#ccff00] border-l-2 border-[#ccff00]"
                : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </header>
  );
}
