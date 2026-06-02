"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
  height?: number;
  label?: boolean;
}

export function AnimatedProgressBar({
  value,
  color = "#9747ff",
  height = 6,
  label = true,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div ref={ref} className="w-full">
      {label && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-widest text-white/30">
            Progress
          </span>
          <motion.span
            className="font-mono text-xs font-medium"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            {clampedValue}%
          </motion.span>
        </div>
      )}

      {/* Track */}
      <div
        className="relative w-full overflow-hidden rounded-full bg-white/[0.06]"
        style={{ height }}
      >
        {/* Fill */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}88 0%, ${color} 100%)`,
            boxShadow: `0 0 8px ${color}55`,
          }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${clampedValue}%` } : { width: "0%" }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
        />

        {/* Shimmer on fill */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          }}
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "300%" } : { x: "-100%" }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
