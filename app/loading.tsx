import { DashboardSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <main className="min-h-screen flex-1 overflow-y-auto p-5 pb-24 md:p-8 md:pb-8">
      <div className="mb-5 h-14 animate-pulse rounded-xl bg-white/[0.04]" />
      <DashboardSkeleton />
    </main>
  );
}
