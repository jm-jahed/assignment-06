import type { Metadata } from "next";
import MyPlanContent from "@/components/MyPlanContent";

export const metadata: Metadata = {
  title: "My Plan — FitLog",
  description: "Cap of five lifts for today. Finish them, then load more.",
};

export default function MyPlanPage() {
  return <MyPlanContent />;
}
