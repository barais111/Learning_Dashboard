import { Suspense } from "react";
import { BentoContainer, BentoItem } from "@/components/ui/motion-wrappers";
import { HeroTile } from "@/components/dashboard/hero-tile";
import { CourseGrid } from "@/components/dashboard/course-grid";
import { ActivityTile } from "@/components/dashboard/activity-tile";
import { QuickStatsTile } from "@/components/dashboard/quick-stats-tile";
import {
  DashboardSkeleton,
  CourseCardSkeleton,
} from "@/components/ui/skeletons";
import { Bell, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex-1 overflow-y-auto pb-24 md:pb-8">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/[0.06] bg-abyss/80 px-5 backdrop-blur-md md:px-8">
        <div className="font-display text-sm font-600 text-white/60 md:hidden">
          Lumina
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <span className="text-xs text-white/25">Dashboard</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="flex h-8 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 text-xs text-white/30 transition-colors hover:text-white/60">
            <Search className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden rounded border border-white/10 bg-white/[0.06] px-1 font-mono text-[10px] text-white/20 md:inline">
              ⌘K
            </kbd>
          </button>

          {/* Notifications */}
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/40 transition-colors hover:text-white/80">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-arc-400" />
          </button>
        </div>
      </header>

      {/* Bento grid */}
      <section className="p-5 md:p-8">
        <Suspense fallback={<DashboardSkeleton />}>
          <BentoGrid />
        </Suspense>
      </section>
    </main>
  );
}

async function BentoGrid() {
  return (
    <BentoContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Row 1: Hero (2 cols) + Quick Stats (1 col) */}
      <div className="md:col-span-2">
        <HeroTile />
      </div>
      <div>
        <QuickStatsTile />
      </div>

      {/* Row 2: Courses (2 cols) + Activity (1 col, spans 2 rows on desktop) */}
      <Suspense
        fallback={
          <>
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
          </>
        }
      >
        <CourseGrid />
      </Suspense>

      {/* Activity tile */}
      <div className="md:col-span-2 lg:col-span-1">
        <ActivityTile />
      </div>
    </BentoContainer>
  );
}
