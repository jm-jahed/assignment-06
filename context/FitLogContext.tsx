"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";

// Storage keys
const STORAGE_KEY_PLAN = "fitlog_plan";
const STORAGE_KEY_SAVED = "fitlog_saved";
const STORAGE_KEY_DONE = "fitlog_done";

// Maximum workouts allowed in Today's Plan
export const MAX_PLAN_WORKOUTS = 5;

// Result types for action feedback (used for UI and toasts)
export type AddToPlanResult =
  | { success: true }
  | { success: false; reason: "limit" | "duplicate" };

export type SaveWorkoutResult =
  | { success: true }
  | { success: false; reason: "duplicate" };

interface FitLogContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  doneIds: number[];
  planCount: number;
  savedCount: number;
  addToPlan: (workout: Workout) => AddToPlanResult;
  removeFromPlan: (workoutId: number) => void;
  isInPlan: (workoutId: number) => boolean;
  saveWorkout: (workout: Workout) => SaveWorkoutResult;
  removeSaved: (workoutId: number) => void;
  isSaved: (workoutId: number) => boolean;
  markAsDone: (workoutId: number) => void;
  isDone: (workoutId: number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydration-safe initial load from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(STORAGE_KEY_PLAN);
      if (storedPlan) {
        const parsedPlan = JSON.parse(storedPlan);
        if (Array.isArray(parsedPlan)) {
          setTodayPlan(parsedPlan.slice(0, MAX_PLAN_WORKOUTS));
        }
      }

      const storedSaved = localStorage.getItem(STORAGE_KEY_SAVED);
      if (storedSaved) {
        const parsedSaved = JSON.parse(storedSaved);
        if (Array.isArray(parsedSaved)) {
          setSavedWorkouts(parsedSaved);
        }
      }

      const storedDone = localStorage.getItem(STORAGE_KEY_DONE);
      if (storedDone) {
        const parsedDone = JSON.parse(storedDone);
        if (Array.isArray(parsedDone)) {
          setDoneIds(parsedDone);
        }
      }
    } catch (error) {
      console.error("Failed to load FitLog state from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync today's plan to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(todayPlan));
    } catch (error) {
      console.error("Failed to save todayPlan to localStorage:", error);
    }
  }, [todayPlan, isLoaded]);

  // Sync saved workouts to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedWorkouts));
    } catch (error) {
      console.error("Failed to save savedWorkouts to localStorage:", error);
    }
  }, [savedWorkouts, isLoaded]);

  // Sync done status to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_DONE, JSON.stringify(doneIds));
    } catch (error) {
      console.error("Failed to save doneIds to localStorage:", error);
    }
  }, [doneIds, isLoaded]);

  // 1. Add to Today's Plan with 5-item cap and duplicate prevention
  const addToPlan = (workout: Workout): AddToPlanResult => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      return { success: false, reason: "duplicate" };
    }

    if (todayPlan.length >= MAX_PLAN_WORKOUTS) {
      return { success: false, reason: "limit" };
    }

    setTodayPlan((prev) => [...prev, workout]);
    return { success: true };
  };

  // 2. Remove from Today's Plan
  const removeFromPlan = (workoutId: number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== workoutId));
    // Also clean up done state if removed
    setDoneIds((prev) => prev.filter((id) => id !== workoutId));
  };

  // 3. Check if workout is in Today's Plan
  const isInPlan = (workoutId: number): boolean => {
    return todayPlan.some((item) => item.id === workoutId);
  };

  // 4. Save workout for later with duplicate prevention
  const saveWorkout = (workout: Workout): SaveWorkoutResult => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      return { success: false, reason: "duplicate" };
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    return { success: true };
  };

  // 5. Remove from Saved
  const removeSaved = (workoutId: number) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== workoutId));
  };

  // 6. Check if workout is saved
  const isSaved = (workoutId: number): boolean => {
    return savedWorkouts.some((item) => item.id === workoutId);
  };

  // 7. Mark as Done / toggle done
  const markAsDone = (workoutId: number) => {
    setDoneIds((prev) => {
      if (prev.includes(workoutId)) {
        return prev.filter((id) => id !== workoutId);
      } else {
        return [...prev, workoutId];
      }
    });
  };

  // 8. Check if workout is marked as done
  const isDone = (workoutId: number): boolean => {
    return doneIds.includes(workoutId);
  };

  return (
    <FitLogContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        doneIds,
        planCount: todayPlan.length,
        savedCount: savedWorkouts.length,
        addToPlan,
        removeFromPlan,
        isInPlan,
        saveWorkout,
        removeSaved,
        isSaved,
        markAsDone,
        isDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

/**
 * Custom hook to consume the FitLogContext.
 * Throws a helpful error if used outside FitLogProvider.
 */
export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
}
