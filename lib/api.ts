import { Workout } from "@/types/workout";

/**
 * Base URL for the FitLog API
 */
const API_BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetches all workouts from the FitLog API.
 * Returns an array of Workout objects.
 */
export async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE_URL, {
      // Revalidate cache periodically or fetch freshly
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: HTTP ${res.status} ${res.statusText}`);
    }

    const data: Workout[] = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid API response format: expected an array of workouts");
    }

    return data;
  } catch (error) {
    console.error("Error in getWorkouts:", error);
    throw error;
  }
}

/**
 * Fetches a single workout by its ID from the FitLog API.
 * Returns the Workout object if found, or null if not found.
 */
export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  try {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(numericId)) {
      return null;
    }

    const res = await fetch(`${API_BASE_URL}/${numericId}`, {
      next: { revalidate: 3600 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch workout #${id}: HTTP ${res.status} ${res.statusText}`);
    }

    const data: Workout = await res.json();
    return data;
  } catch (error) {
    console.error(`Error in getWorkoutById(${id}):`, error);
    throw error;
  }
}
