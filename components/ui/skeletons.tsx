import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton-shimmer rounded-xl",
        className
      )}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-5 shadow-card">
      {/* Icon */}
      <Skeleton className="mb-4 h-10 w-10 rounded-lg" />
      {/* Title */}
      <Skeleton className="mb-2 h-5 w-3/4 rounded-md" />
      <Skeleton className="mb-4 h-4 w-1/2 rounded-md" />
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-8 rounded" />
        </div>
        <Skeleton className="h-1.5 w-full rounded-full" />
      </div>
    </article>
  );
}

export function HeroTileSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-8 shadow-card">
      <Skeleton className="mb-3 h-8 w-56 rounded-lg" />
      <Skeleton className="mb-6 h-5 w-40 rounded-md" />
      <div className="flex gap-3">
        <Skeleton className="h-16 w-24 rounded-xl" />
        <Skeleton className="h-16 w-24 rounded-xl" />
        <Skeleton className="h-16 w-24 rounded-xl" />
      </div>
    </article>
  );
}

export function ActivityTileSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 shadow-card">
      <Skeleton className="mb-6 h-5 w-32 rounded-md" />
      <div className="grid grid-cols-16 gap-1">
        {Array.from({ length: 112 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-sm" />
        ))}
      </div>
    </article>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <HeroTileSkeleton />
      </div>
      <div className="row-span-2">
        <ActivityTileSkeleton />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <CourseCardSkeleton />
        </div>
      ))}
    </div>
  );
}
