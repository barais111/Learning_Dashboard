"use client";

import { motion } from "framer-motion";
import { bentoItemVariants } from "@/components/ui/motion-wrappers";
import { AnimatedProgressBar } from "@/components/ui/progress-bar";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.article
      variants={bentoItemVariants}
      whileHover={{
        scale: 1.018,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="grain-bg group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface shadow-card transition-shadow hover:shadow-card-hover"
    >
      {/* Hover border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${course.colorAccent}33, 0 0 24px ${course.colorAccent}22`,
        }}
      />

      {/* Gradient mesh bg */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${course.colorAccent}55 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-5">
        {/* Icon */}
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            background: `${course.colorAccent}22`,
            boxShadow: `0 0 12px ${course.colorAccent}33`,
          }}
        >
          <DynamicIcon
            name={course.icon_name}
            className="h-5 w-5"
            style={{ color: course.colorAccent }}
          />
        </div>

        {/* Title */}
        <h3 className="mb-1 font-display text-base font-600 leading-snug text-white">
          {course.title}
        </h3>
        <p className="mb-4 text-xs text-white/35">
          {course.progress >= 100
            ? "Completed"
            : course.progress > 0
            ? "In Progress"
            : "Not Started"}
        </p>

        {/* Animated progress bar */}
        <AnimatedProgressBar value={course.progress} color={course.colorAccent} />
      </div>
    </motion.article>
  );
}
