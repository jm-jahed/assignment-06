import type { Metadata } from "next";
import { Suspense } from "react";
import MyPlanContent from "@/components/MyPlanContent";

export const metadata: Metadata = {
  title: "My Plan — FitLog",
  description: "Cap of five lifts for today. Finish them, then load more.",
};

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-neutral-800 border-t-[#ccff00] rounded-full animate-spin mb-4" />
          <p className="text-neutral-400 font-semibold tracking-wide text-sm animate-pulse">
            Loading workouts…
          </p>
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}
