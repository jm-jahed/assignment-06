"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";

type SortOption = "duration" | "calories" | "rating";

export default function MyPlanContent() {
  const { todayPlan, savedWorkouts, isLoaded } = useFitLog();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"plan" | "saved">(
    tabParam === "saved" ? "saved" : "plan"
  );
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "plan") {
      setActiveTab("plan");
    }
  }, [tabParam]);

  // Dynamic live metric calculations based on active tab (Today's Plan vs Saved)
  const currentList = activeTab === "plan" ? todayPlan : savedWorkouts;

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce(
    (sum, workout) => sum + (workout.duration || 0),
    0
  );
  const totalCalories = currentList.reduce(
    (sum, workout) => sum + (workout.caloriesBurned || 0),
    0
  );

  // Sorted list for Today's Plan tab
  const sortedTodayPlan = useMemo(() => {
    return [...todayPlan].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [todayPlan, sortBy]);

  // Sorted list for Saved tab
  const sortedSavedWorkouts = useMemo(() => {
    return [...savedWorkouts].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [savedWorkouts, sortBy]);

  // Loading state while restoring from localStorage
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-neutral-800 border-t-[#ccff00] rounded-full animate-spin mb-4" />
        <p className="text-neutral-400 font-semibold tracking-wide text-sm animate-pulse">
          Loading workouts…
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. Page Header */}
      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
          MY PLAN
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* 2. Unified Live Metrics Card (Matching Figma design) */}
      <div className="rounded-2xl border border-neutral-800/90 bg-[#131316] p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12">
          {/* Exercises */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-neutral-400">
              Exercises
            </span>
            <span className="block text-4xl sm:text-5xl font-black text-[#ccff00] font-mono">
              {totalExercises}
            </span>
          </div>

          {/* Minutes */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-neutral-400">
              Minutes
            </span>
            <span className="block text-4xl sm:text-5xl font-black text-white font-mono">
              {totalMinutes}
            </span>
          </div>

          {/* Calories */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-neutral-400">
              Calories
            </span>
            <span className="block text-4xl sm:text-5xl font-black text-white font-mono">
              {totalCalories}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Tabs & Sort Row (Matching Figma video layout) */}
      <div className="flex flex-row items-end justify-between gap-4 pt-2">
        {/* Left: Pill Tabs Container */}
        <div className="bg-[#19191d] p-1 rounded-full border border-neutral-800/80 inline-flex items-center">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
              activeTab === "plan"
                ? "bg-[#28282e] text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
            aria-selected={activeTab === "plan"}
            role="tab"
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
              activeTab === "saved"
                ? "bg-[#28282e] text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
            aria-selected={activeTab === "saved"}
            role="tab"
          >
            Saved
          </button>
        </div>

        {/* Right: Sort Dropdown with Label on Top (Matching video screenshot) */}
        <div className="flex flex-col items-start gap-1">
          <label
            htmlFor="my-plan-sort"
            className="text-xs font-semibold text-neutral-400"
          >
            Sort By
          </label>
          <select
            id="my-plan-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-[#131316] border border-neutral-600 hover:border-neutral-400 text-white text-xs sm:text-sm font-semibold rounded-xl px-4 py-2 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] cursor-pointer transition-all min-w-[140px]"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* 4. Tab Content Area */}
      <div className="pt-2">
        {activeTab === "plan" ? (
          sortedTodayPlan.length === 0 ? (
            /* Empty Today's Plan State */
            <div className="py-16 px-4 rounded-3xl border border-dashed border-neutral-800 bg-neutral-950/50 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>

              <div className="space-y-1 max-w-md">
                <h2 className="text-xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
                  NOTHING HERE YET
                </h2>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Browse the library and add a lift to get today moving.
                </p>
              </div>

              <Link
                href="/#library"
                className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-[0_0_20px_rgba(204,255,0,0.2)]"
              >
                <span>Go to workouts</span>
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            /* Today's Plan Horizontal Rows List */
            <div className="space-y-4">
              {sortedTodayPlan.map((workout) => (
                <PlanWorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )
        ) : sortedSavedWorkouts.length === 0 ? (
          /* Empty Saved Workouts State */
          <div className="py-16 px-4 rounded-3xl border border-dashed border-neutral-800 bg-neutral-950/50 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>

            <div className="space-y-1 max-w-md">
              <h2 className="text-xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
                NO SAVED WORKOUTS
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Save workouts from the library to build your stash for later.
              </p>
            </div>

            <Link
              href="/#library"
              className="inline-flex items-center gap-2 border border-neutral-700 hover:border-neutral-500 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
            >
              <span>Go to workouts</span>
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        ) : (
          /* Saved Horizontal Rows List */
          <div className="space-y-4">
            {sortedSavedWorkouts.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                isSavedTab={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
