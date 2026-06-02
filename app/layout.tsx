import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileNavBar } from "@/components/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Lumina — Learning Dashboard",
  description: "Next-gen adaptive learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-void text-white antialiased">
        <div className="flex h-screen overflow-hidden bg-void">
          {/* Sidebar — hidden on mobile */}
          <div className="hidden md:block md:h-full md:shrink-0">
            <Sidebar className="h-full" />
          </div>

          {/* Main content area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>

        {/* Mobile bottom nav */}
        <MobileNavBar />
      </body>
    </html>
  );
}
