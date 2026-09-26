"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";
import { useToast } from "@/context/ToastContext";

interface PlanWorkoutCardProps {
  workout: Workout;
  isSavedTab?: boolean;
}

export default function PlanWorkoutCard({
  workout,
  isSavedTab = false,
}: PlanWorkoutCardProps) {
  const { removeFromPlan, removeSaved, markAsDone, isDone } = useFitLog();
  const { showToast } = useToast();

  const completed = isDone(workout.id);

  // Handle Mark as Done toggle
  const handleToggleDone = () => {
    markAsDone(workout.id);
    if (!completed) {
      showToast("Workout marked as done.", "success");
    } else {
      showToast("Workout marked as incomplete.", "info");
    }
  };

  // Handle Remove from Plan
  const handleRemoveFromPlan = () => {
    removeFromPlan(workout.id);
    showToast("Removed from today's plan.", "info");
  };

  // Handle Remove from Saved
  const handleRemoveFromSaved = () => {
    removeSaved(workout.id);
    showToast("Removed from saved workouts.", "info");
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 ${
        completed && !isSavedTab
          ? "bg-neutral-950/80 border-neutral-800/80 opacity-90 shadow-none"
          : "bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 shadow-lg hover:shadow-2xl"
      }`}
    >
      {/* Top Section: Image & Remove Button */}
      <div className="relative w-full aspect-[16/10] rounded-t-2xl overflow-hidden bg-neutral-950">
        <Image
          src={workout.image}
          alt={`Demonstration of ${workout.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            completed && !isSavedTab ? "grayscale-[40%]" : ""
          }`}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40" />

        {/* Completed Badge overlay if marked done */}
        {completed && !isSavedTab && (
          <div className="absolute top-3 left-3 bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Completed</span>
          </div>
        )}

        {/* Remove Button (X) */}
        <button
          type="button"
          onClick={isSavedTab ? handleRemoveFromSaved : handleRemoveFromPlan}
          aria-label={
            isSavedTab
              ? "Remove workout from saved list"
              : "Remove workout from today's plan"
          }
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-red-500/90 text-neutral-300 hover:text-white backdrop-blur-md border border-white/10 hover:border-red-500 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Equipment Badge */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-neutral-800 text-neutral-300 border border-neutral-700">
              {workout.equipment}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)] line-clamp-1">
            {workout.name}
          </h3>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-neutral-400">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-[#ccff00]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
              <span>{workout.caloriesBurned} kcal</span>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* View Details Link */}
          <Link
            href={`/workout/${workout.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-700 hover:border-neutral-500 bg-neutral-800/60 hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
          >
            <span>View Details</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Mark as Done Button (Only for Today's Plan tab) */}
          {!isSavedTab && (
            <button
              type="button"
              onClick={handleToggleDone}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] active:scale-95 ${
                completed
                  ? "bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                  : "border border-neutral-700 hover:border-[#ccff00]/60 bg-neutral-900 text-neutral-300 hover:text-[#ccff00]"
              }`}
              aria-label={
                completed
                  ? "Workout marked as done"
                  : "Mark workout as done"
              }
            >
              {completed ? (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Done</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#ccff00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Mark as Done</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
