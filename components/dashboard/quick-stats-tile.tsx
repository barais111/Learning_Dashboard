"use client";

import { motion } from "framer-motion";
import { Target, Clock, BookMarked, TrendingUp } from "lucide-react";
import { bentoItemVariants } from "@/components/ui/motion-wrappers";

const STATS = [
  { icon: Target, label: "Daily Goal", value: "3 / 5", color: "#ff47b3" },
  { icon: Clock, label: "Time Today", value: "47 min", color: "#00e5ff" },
  { icon: BookMarked, label: "Saved", value: "12", color: "#47ffb3" },
  { icon: TrendingUp, label: "This Week", value: "+18%", color: "#ffb347" },
];

export function QuickStatsTile() {
  return (
    <motion.article
      variants={bentoItemVariants}
      whileHover={{
        scale: 1.012,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="noise-overlay group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface p-6 shadow-card"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,229,255,0.15)" }}
      />

      <h2 className="mb-5 font-display text-sm font-600 uppercase tracking-widest text-white/40">
        Quick Stats
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
            >
              <Icon className="mb-2 h-4 w-4" style={{ color: stat.color }} />
              <div
                className="font-display text-lg font-700 leading-none"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="mt-0.5 text-[11px] text-white/30">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}
