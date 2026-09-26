"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";

export default function MyPlanContent() {
  const { todayPlan, savedWorkouts, isLoaded } = useFitLog();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  // Dynamic live metric calculations from todayPlan
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (sum, workout) => sum + (workout.duration || 0),
    0
  );
  const totalCalories = todayPlan.reduce(
    (sum, workout) => sum + (workout.caloriesBurned || 0),
    0
  );

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
      {/* 1. Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
          MY PLAN
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* 2. Live Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Exercises Metric */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Exercises
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-[#ccff00] font-mono">
              {totalExercises}
            </span>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              / 5 Max
            </span>
          </div>
        </div>

        {/* Minutes Metric */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Minutes
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">
              {totalMinutes}
            </span>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Min Total
            </span>
          </div>
        </div>

        {/* Calories Metric */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Calories
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              {totalCalories}
            </span>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Kcal Burn
            </span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-neutral-800 flex items-center gap-4 sm:gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("plan")}
          className={`pb-4 text-sm font-extrabold uppercase tracking-wider transition-all duration-200 border-b-2 flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-t-sm ${
            activeTab === "plan"
              ? "border-[#ccff00] text-[#ccff00]"
              : "border-transparent text-neutral-400 hover:text-white"
          }`}
          aria-selected={activeTab === "plan"}
          role="tab"
        >
          <span>TODAY&apos;S PLAN</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-black ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "bg-neutral-800 text-neutral-400"
            }`}
          >
            {todayPlan.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`pb-4 text-sm font-extrabold uppercase tracking-wider transition-all duration-200 border-b-2 flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-t-sm ${
            activeTab === "saved"
              ? "border-[#ccff00] text-[#ccff00]"
              : "border-transparent text-neutral-400 hover:text-white"
          }`}
          aria-selected={activeTab === "saved"}
          role="tab"
        >
          <span>SAVED</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-black ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "bg-neutral-800 text-neutral-400"
            }`}
          >
            {savedWorkouts.length}
          </span>
        </button>
      </div>

      {/* 4. Tab Content Area */}
      <div>
        {activeTab === "plan" ? (
          todayPlan.length === 0 ? (
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
                className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-[0_0_20px_rgba(204,255,0,0.2)]"
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
            /* Today's Plan Cards Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {todayPlan.map((workout) => (
                <PlanWorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )
        ) : savedWorkouts.length === 0 ? (
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
              className="inline-flex items-center gap-2 border border-neutral-700 hover:border-neutral-500 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
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
          /* Saved Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedWorkouts.map((workout) => (
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
