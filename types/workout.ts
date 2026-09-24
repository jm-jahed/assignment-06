/**
 * Workout Interface
 * Represents the complete structure of a workout item returned by the FitLog API.
 */
export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number; // in minutes
  caloriesBurned: number; // kcal
  sets: number;
  reps: string; // e.g. "6-8" or "10-12"
  rating: number; // e.g. 4.8
  description: string;
  instructions: string[];
}
