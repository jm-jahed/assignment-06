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
      className={`group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 gap-4 sm:gap-6 ${
        completed && !isSavedTab
          ? "bg-[#121215]/90 border-neutral-800/80"
          : "bg-[#131316] border-neutral-800/90 hover:border-neutral-700 shadow-md"
      }`}
    >
      {/* Left: Thumbnail & Workout Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
        {/* Thumbnail Image */}
        <div className="relative w-full sm:w-36 h-28 sm:h-20 rounded-xl overflow-hidden bg-neutral-950 flex-shrink-0 border border-neutral-800/60">
          <Image
            src={workout.image}
            alt={`Illustration of ${workout.name}`}
            fill
            sizes="(max-width: 640px) 100vw, 150px"
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              completed && !isSavedTab ? "grayscale-[30%]" : ""
            }`}
          />
        </div>

        {/* Info Column */}
        <div className="space-y-1 flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)] truncate">
            {workout.name}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 font-medium truncate">
            {workout.equipment}
          </p>

          {/* Specs inline row with icons */}
          <div className="flex items-center gap-4 text-xs font-semibold pt-1 text-neutral-300">
            {/* Duration */}
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

            {/* Calories */}
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-[#ccff00]"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.42.65-.845 1.545-.845 2.569 0 .438.1.86.273 1.235A6.002 6.002 0 004 12c0 3.314 2.686 6 6 6s6-2.686 6-6c0-2.42-1.433-4.505-3.605-5.447z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <span>{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions Row (View Details, Mark as Done, Remove X) */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
        {/* View Details Button */}
        <Link
          href={`/workout/${workout.id}`}
          className="px-4 py-2 rounded-full border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-white text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
        >
          View Details
        </Link>

        {/* Mark as Done Button (Only on Today's Plan tab) */}
        {!isSavedTab && (
          <button
            type="button"
            onClick={handleToggleDone}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] flex items-center gap-1.5 ${
              completed
                ? "bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-[0_0_12px_rgba(204,255,0,0.3)]"
                : "border border-neutral-700 hover:border-[#ccff00]/60 bg-neutral-900 text-white hover:text-[#ccff00]"
            }`}
            aria-label={
              completed ? "Workout marked as done" : "Mark workout as done"
            }
          >
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
            <span>Mark as Done</span>
          </button>
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
          className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ml-1"
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
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
