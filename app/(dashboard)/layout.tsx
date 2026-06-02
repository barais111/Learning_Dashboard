import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileNavBar } from "@/components/sidebar/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-void">
      {/* Sidebar — hidden on mobile */}
      <div className="hidden md:block md:h-full md:shrink-0">
        <Sidebar className="h-full" />
      </div>

      {/* Main scrollable area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>

      {/* Mobile bottom nav */}
      <MobileNavBar />
    </div>
  );
}
