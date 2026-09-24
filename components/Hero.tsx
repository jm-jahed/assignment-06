import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-neutral-800/80 bg-gradient-to-b from-[#0e0e10] via-[#0a0a0a] to-[#0a0a0a]"
    >
      {/* Background glow effect */}
      <div
        className="pointer-events-none absolute -top-24 right-0 lg:right-1/4 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 sm:space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">
                WORKOUT LIBRARY
              </span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] font-[family-name:var(--font-oswald)]"
            >
              TRAIN WITH INTENT. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-400 text-base sm:text-lg max-w-xl leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
              today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* Primary CTA Button */}
            <div className="pt-2 sm:pt-4">
              <a
                href="#library"
                className="group inline-flex items-center gap-3 bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-black text-sm sm:text-base uppercase tracking-wider px-7 py-4 rounded-full transition-all duration-200 shadow-[0_0_25px_rgba(204,255,0,0.25)] hover:shadow-[0_0_35px_rgba(204,255,0,0.4)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
              >
                <span>BROWSE WORKOUTS</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Banner Image */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Subtle radial aura behind illustration */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-[#ccff00]/10 blur-2xl" />
            </div>

            <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md flex justify-center">
              <Image
                src="/assets/banner.png"
                alt="Athlete performing targeted bicep curl exercise on gym machine"
                width={450}
                height={450}
                className="w-auto h-auto max-h-[380px] sm:max-h-[440px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
