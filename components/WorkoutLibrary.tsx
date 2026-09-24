"use client";

import React, { useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchWorkouts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getWorkouts();
        if (isMounted) {
          setWorkouts(data);
        }
      } catch (err) {
        console.error("Failed to load workouts:", err);
        if (isMounted) {
          setError("Unable to load workouts right now. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="library"
      aria-labelledby="library-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 scroll-mt-16"
    >
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <h2
          id="library-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]"
        >
          THE <span className="text-[#ccff00]">LIBRARY</span>
        </h2>
        <p className="mt-2 text-neutral-400 text-sm sm:text-base font-normal max-w-2xl">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center py-24 sm:py-32 space-y-4"
        >
          {/* Animated Lime Spinner */}
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-neutral-800" />
            <div className="absolute inset-0 rounded-full border-4 border-[#ccff00] border-t-transparent animate-spin" />
          </div>
          <p className="text-neutral-300 font-semibold tracking-wide text-base">
            Loading workouts…
          </p>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div
          role="alert"
          className="p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-center max-w-lg mx-auto space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-neutral-300 font-medium">{error}</p>
        </div>
      )}

      {/* Workouts 3x4 Grid */}
      {!isLoading && !error && workouts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}

      {/* Empty State fallback if API returns empty array */}
      {!isLoading && !error && workouts.length === 0 && (
        <div className="text-center py-20 text-neutral-400">
          No workouts available at this time.
        </div>
      )}
    </section>
  );
}
