"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Workout } from "@/types/workout";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Sort state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

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

  // Filtered and Sorted workouts list
  const filteredAndSortedWorkouts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // 1. Filter by workout name or muscle-group tags
    let result = workouts.filter((workout) => {
      if (!query) return true;
      const nameMatch = workout.name.toLowerCase().includes(query);
      const tagMatch = workout.muscleGroups.some((group) =>
        group.toLowerCase().includes(query)
      );
      const equipmentMatch = workout.equipment.toLowerCase().includes(query);
      return nameMatch || tagMatch || equipmentMatch;
    });

    // 2. Sort by selected criteria (default: duration)
    result = [...result].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

    return result;
  }, [workouts, searchQuery, sortBy]);

  return (
    <section
      id="library"
      aria-labelledby="library-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 scroll-mt-16"
    >
      {/* Section Header */}
      <div className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
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
      </div>

      {/* Search & Sort Controls Bar */}
      {!isLoading && !error && workouts.length > 0 && (
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
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
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or muscle group..."
              aria-label="Search workouts by name or muscle group"
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search input"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white"
              >
                <svg
                  className="w-4 h-4"
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
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-select"
              className="text-xs font-bold uppercase tracking-wider text-neutral-400 whitespace-nowrap"
            >
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort workouts"
              className="bg-neutral-950 border border-neutral-800 text-white text-sm font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] cursor-pointer transition-colors"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center py-24 sm:py-32 space-y-4"
        >
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

      {/* Workouts Grid or Search Empty State */}
      {!isLoading && !error && workouts.length > 0 && (
        filteredAndSortedWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAndSortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-2 rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50">
            <p className="text-neutral-300 font-bold text-base">
              No workouts match your search query.
            </p>
            <p className="text-neutral-500 text-xs uppercase tracking-wider">
              Try searching for a different workout name or muscle group.
            </p>
          </div>
        )
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
