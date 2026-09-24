import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkoutById } from "@/lib/api";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: WorkoutPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    return {
      title: "Workout Not Found — FitLog",
    };
  }

  return {
    title: `${workout.name} — FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Back to Library Navigation */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/#library"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-[#ccff00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-sm"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Library</span>
        </Link>
      </div>

      {/* Main Two-Column Detail Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Large Workout Image */}
        <div className="lg:col-span-6 w-full">
          <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
            <Image
              src={workout.image}
              alt={`Demonstration of ${workout.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Subtle dark gradient overlay at top and bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* RIGHT COLUMN: Details, Specs, Instructions & Actions */}
        <div className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-8">
          {/* Category Tag Pills & Title */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-neutral-900 text-[#ccff00] border border-neutral-800"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)] leading-[1.05]">
              {workout.name}
            </h1>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Key Specifications Grid / Table */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">
              WORKOUT SPECIFICATIONS
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Equipment
                </span>
                <span className="block font-bold text-white mt-1 line-clamp-1">
                  {workout.equipment}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Difficulty
                </span>
                <span className="block font-bold text-white mt-1">
                  {workout.difficulty}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Sets
                </span>
                <span className="block font-bold text-white mt-1">
                  {workout.sets}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Reps
                </span>
                <span className="block font-bold text-white mt-1">
                  {workout.reps}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Duration
                </span>
                <span className="block font-bold text-white mt-1">
                  {workout.duration} min
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Calories
                </span>
                <span className="block font-bold text-white mt-1">
                  {workout.caloriesBurned} kcal
                </span>
              </div>
            </div>

            {/* Rating Bar */}
            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[11px]">
                Community Rating
              </span>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <svg
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{workout.rating} / 5.0</span>
              </div>
            </div>
          </div>

          {/* Numbered Instructions Section */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">
              HOW TO PERFORM
            </h2>
            <ol className="space-y-3" aria-label="Step by step instructions">
              {workout.instructions.map((step, index) => {
                const stepNumber = String(index + 1).padStart(2, "0");
                return (
                  <li
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80"
                  >
                    <span className="flex-shrink-0 font-black text-sm tracking-wider text-[#ccff00] font-mono mt-0.5">
                      {stepNumber}
                    </span>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                      {step}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Action Buttons (Visually ready for Phase 09) */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Primary Action Button */}
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-extrabold text-sm uppercase tracking-wider px-6 py-4 rounded-xl transition-all duration-150 shadow-[0_0_20px_rgba(204,255,0,0.2)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add to today&apos;s plan</span>
            </button>

            {/* Secondary Action Button */}
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2.5 border border-neutral-700 hover:border-neutral-500 bg-neutral-900/80 hover:bg-neutral-800 active:scale-95 text-neutral-200 hover:text-white font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
            >
              <svg
                className="w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
