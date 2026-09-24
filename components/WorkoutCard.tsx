import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
      aria-label={`View details for ${workout.name}`}
    >
      {/* Thumbnail Image Container */}
      <div className="relative w-full aspect-video bg-neutral-950 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Subtle gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-neutral-800/90 text-neutral-300 border border-neutral-700/60"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#ccff00] transition-colors font-[family-name:var(--font-oswald)] line-clamp-1">
          {workout.name}
        </h3>

        {/* Equipment Line */}
        <p className="text-xs text-neutral-400 font-medium mt-1 mb-4 line-clamp-1">
          {workout.equipment}
        </p>

        {/* Stats Row */}
        <div className="mt-auto pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-neutral-400"
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
            <span className="font-semibold">{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#ccff00]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2c1.1 0 2 .9 2 2 0 .7-.4 1.4-1 1.7V7c1.7.5 3 2.1 3 4 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.9 1.3-3.5 3-4V5.7c-.6-.3-1-1-1-1.7 0-1.1.9-2 2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <span className="font-semibold">{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-white">{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
