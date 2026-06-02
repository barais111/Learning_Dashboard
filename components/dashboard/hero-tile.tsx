"use client";

import { motion } from "framer-motion";
import { Flame, Zap, Trophy, ChevronRight } from "lucide-react";
import { bentoItemVariants } from "@/components/ui/motion-wrappers";

const USER = {
  name: "Alex Rivera",
  streak: 14,
  xp: 4_820,
  level: 12,
  nextLevelXp: 5_000,
  completedToday: 3,
};

export function HeroTile() {
  const greeting = getGreeting();

  return (
    <motion.article
      variants={bentoItemVariants}
      whileHover={{ scale: 1.012, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="noise-overlay grain-bg relative col-span-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-surface shadow-card lg:col-span-2"
    >
      {/* Background gradient mesh */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-arc-600/20 blur-[80px]" />
        <div className="absolute -bottom-10 left-20 h-48 w-48 rounded-full bg-glow-cyan/10 blur-[60px]" />
      </div>

      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 p-7 md:p-8">
        {/* Greeting */}
        <div className="mb-1 text-sm font-medium text-white/40">{greeting}</div>
        <h1 className="mb-6 font-display text-3xl font-700 tracking-tight text-white md:text-4xl">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-arc-300 to-glow-cyan bg-clip-text text-transparent">
            {USER.name.split(" ")[0]}
          </span>
        </h1>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3">
          {/* Streak */}
          <StatChip
            icon={<Flame className="h-4 w-4 text-glow-amber" fill="#ffb347" />}
            value={`${USER.streak}`}
            label="day streak"
            glowColor="#ffb34744"
            chipClass="glow-pulse"
          />

          {/* XP */}
          <StatChip
            icon={<Zap className="h-4 w-4 text-arc-300" fill="currentColor" />}
            value={`${(USER.xp / 1000).toFixed(1)}K`}
            label="total XP"
            glowColor="#9747ff33"
          />

          {/* Level */}
          <StatChip
            icon={<Trophy className="h-4 w-4 text-glow-cyan" />}
            value={`Lv ${USER.level}`}
            label="current level"
            glowColor="#00e5ff33"
          />
        </div>

        {/* XP progress to next level */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-white/30">
              Level progress
            </span>
            <button className="flex items-center gap-1 text-xs text-arc-300 transition-opacity hover:opacity-70">
              View details <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-arc-600 to-arc-400"
              style={{ boxShadow: "0 0 8px rgba(151,71,255,0.5)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${(USER.xp / USER.nextLevelXp) * 100}%` }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            />
          </div>
          <div className="mt-1.5 text-right text-[11px] text-white/25">
            {USER.xp.toLocaleString()} / {USER.nextLevelXp.toLocaleString()} XP
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function StatChip({
  icon,
  value,
  label,
  glowColor,
  chipClass,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  glowColor: string;
  chipClass?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 ${chipClass ?? ""}`}
      style={{ boxShadow: `0 0 16px ${glowColor}` }}
    >
      {icon}
      <div>
        <div className="font-display text-lg font-700 leading-none text-white">
          {value}
        </div>
        <div className="mt-0.5 text-[11px] text-white/35">{label}</div>
      </div>
    </div>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning ☀️";
  if (h < 18) return "Good afternoon 🌤";
  return "Good evening 🌙";
}
