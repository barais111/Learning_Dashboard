"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { generateActivityData } from "@/lib/utils";
import { bentoItemVariants } from "@/components/ui/motion-wrappers";

const DAYS = generateActivityData();
const ACCENT = "#9747ff";

function getIntensity(count: number): string {
  if (count === 0) return "rgba(255,255,255,0.04)";
  if (count === 1) return `${ACCENT}44`;
  if (count === 2) return `${ACCENT}77`;
  if (count === 3) return `${ACCENT}aa`;
  return ACCENT;
}

export function ActivityTile() {
  const totalSessions = DAYS.reduce((s, d) => s + d.count, 0);
  const streak = computeStreak(DAYS);

  return (
    <motion.article
      variants={bentoItemVariants}
      whileHover={{
        scale: 1.012,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="noise-overlay grain-bg group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface shadow-card"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(151,71,255,0.2)" }}
      />

      {/* Ambient gradient */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-arc-600/15 blur-[50px]" />

      <div className="relative z-10 p-6">
        <div className="mb-5 flex items-center gap-2">
          <Activity className="h-4 w-4 text-arc-300" />
          <h2 className="font-display text-sm font-600 uppercase tracking-widest text-white/60">
            Activity
          </h2>
        </div>

        {/* Stats */}
        <div className="mb-4 flex gap-6">
          <div>
            <div className="font-display text-2xl font-700 text-white">{totalSessions}</div>
            <div className="text-[11px] text-white/30">Total sessions</div>
          </div>
          <div>
            <div className="font-display text-2xl font-700 text-white">{streak}</div>
            <div className="text-[11px] text-white/30">Day streak</div>
          </div>
        </div>

        {/* Contribution grid — 16 weeks × 7 days */}
        <div className="flex gap-1" aria-label="Activity contribution graph">
          {Array.from({ length: 16 }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {DAYS.slice(weekIdx * 7, weekIdx * 7 + 7).map((day, dayIdx) => (
                <motion.div
                  key={day.date}
                  title={`${day.date}: ${day.count} sessions`}
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: getIntensity(day.count) }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (weekIdx * 7 + dayIdx) * 0.003,
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-end gap-1.5">
          <span className="text-[10px] text-white/25">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: getIntensity(level) }}
            />
          ))}
          <span className="text-[10px] text-white/25">More</span>
        </div>
      </div>
    </motion.article>
  );
}

function computeStreak(days: { date: string; count: number }[]): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else break;
  }
  return streak;
}
