import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ActivityDay } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate mock 16-week contribution data */
export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const now = new Date();

  for (let i = 111; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const date = d.toISOString().split("T")[0];

    // Weight toward recent days
    const recencyBoost = i < 14 ? 0.5 : 0;
    const rand = Math.random() + recencyBoost;
    const count = rand > 0.75 ? Math.floor(rand * 5) : rand > 0.45 ? 1 : 0;

    days.push({ date, count });
  }

  return days;
}

/** Format numbers with K/M suffixes */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
