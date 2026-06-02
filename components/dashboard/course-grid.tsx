import { getCourses } from "@/lib/queries";
import { CourseCard } from "./course-card";
import { ErrorTile } from "./error-tile";

export async function CourseGrid() {
  let courses;

  try {
    courses = await getCourses();
  } catch (err) {
    const message = err instanceof Error ? err.message : undefined;
    return <ErrorTile message={message} />;
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-full rounded-2xl border border-white/[0.06] bg-surface p-10 text-center">
        <p className="text-sm text-white/30">
          No courses found. Add some rows to your Supabase{" "}
          <code className="rounded bg-white/[0.06] px-1 font-mono text-xs">courses</code>{" "}
          table to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </>
  );
}
