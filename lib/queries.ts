import { createClient } from "@/lib/supabase/server";
import type { Course, CourseRow } from "@/types";

// Color accents assigned per-course for visual variety
const COURSE_ACCENTS = [
  "#9747ff", // violet
  "#00e5ff", // cyan
  "#ff47b3", // pink
  "#ffb347", // amber
  "#47ffb3", // emerald
  "#ff6b6b", // coral
];

export async function getCourses(): Promise<Course[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[Supabase] Failed to fetch courses:", error.message);
    throw new Error(`Database error: ${error.message}`);
  }

  if (!data) return [];

  return (data as CourseRow[]).map((row, i) => ({
    ...row,
    colorAccent: COURSE_ACCENTS[i % COURSE_ACCENTS.length],
  }));
}
