"use client";

import React from "react";
import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";
import { useToast } from "@/context/ToastContext";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { addToPlan, isInPlan, saveWorkout, isSaved, planCount } = useFitLog();
  const { showToast } = useToast();

  const alreadyInPlan = isInPlan(workout.id);
  const isPlanFull = planCount >= 5 && !alreadyInPlan;
  const alreadySaved = isSaved(workout.id);

  // 1. Add to Today's Plan handler
  const handleAddToPlan = () => {
    if (alreadyInPlan) {
      showToast("Already in your plan", "info");
      return;
    }

    if (isPlanFull) {
      showToast("Today's plan is full. Maximum 5 workouts.", "warning");
      return;
    }

    const result = addToPlan(workout);

    if (result.success) {
      showToast("Added to today's plan.", "success");
    } else if (result.reason === "limit") {
      showToast("Today's plan is full. Maximum 5 workouts.", "warning");
    } else if (result.reason === "duplicate") {
      showToast("Already in your plan", "info");
    }
  };

  // 2. Save for Later handler
  const handleSaveWorkout = () => {
    if (alreadySaved) {
      showToast("Already saved for later.", "info");
      return;
    }

    const result = saveWorkout(workout);

    if (result.success) {
      showToast("Saved for later.", "success");
    } else if (result.reason === "duplicate") {
      showToast("Already saved for later.", "info");
    }
  };

  return (
    <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
      {/* Primary Action Button: Add to Today's Plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        className={`flex-1 inline-flex items-center justify-center gap-2.5 font-extrabold text-sm uppercase tracking-wider px-6 py-4 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-white active:scale-95 ${
          alreadyInPlan
            ? "bg-[#ccff00]/15 text-[#ccff00] border-2 border-[#ccff00]/50 hover:bg-[#ccff00]/25 shadow-[0_0_15px_rgba(204,255,0,0.15)]"
            : isPlanFull
            ? "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-800 cursor-not-allowed"
            : "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)]"
        }`}
        aria-label={
          alreadyInPlan
            ? "Already added to today's plan"
            : isPlanFull
            ? "Today's plan is full, maximum 5 workouts"
            : "Add to today's plan"
        }
      >
        {alreadyInPlan ? (
          <>
            <svg
              className="w-5 h-5 text-[#ccff00]"
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
            <span>Added to today&apos;s plan</span>
          </>
        ) : isPlanFull ? (
          <>
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
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <span>Plan full (5/5)</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 text-black"
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
          </>
        )}
      </button>

      {/* Secondary Action Button: Save for Later */}
      <button
        type="button"
        onClick={handleSaveWorkout}
        className={`flex-1 inline-flex items-center justify-center gap-2.5 font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
          alreadySaved
            ? "border-2 border-[#ccff00]/60 bg-neutral-900 text-[#ccff00] hover:bg-neutral-800"
            : "border border-neutral-700 hover:border-neutral-500 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white"
        }`}
        aria-label={alreadySaved ? "Workout saved for later" : "Save workout for later"}
      >
        <svg
          className={`w-5 h-5 ${alreadySaved ? "text-[#ccff00] fill-[#ccff00]" : "text-neutral-400"}`}
          fill={alreadySaved ? "currentColor" : "none"}
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
        <span>{alreadySaved ? "Saved for later" : "Save for later"}</span>
      </button>
    </div>
  );
}
