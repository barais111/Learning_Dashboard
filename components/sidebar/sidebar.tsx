"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  Zap,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/achievements" },
];

const BOTTOM_ITEMS = [
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      className={cn(
        "relative flex h-full flex-col border-r border-white/[0.06] bg-abyss",
        className
      )}
      animate={{ width: collapsed ? 68 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-white/[0.06]">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-arc-400 to-arc-700">
          <Zap className="h-4 w-4 text-white" fill="currentColor" />
          <div className="absolute inset-0 rounded-lg bg-arc-500/20 blur-sm" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              className="font-display text-lg font-700 tracking-tight text-white"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
            >
              Lumina
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <div className="flex flex-1 flex-col gap-1 p-3 pt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavButton
              key={item.id}
              item={item}
              isActive={isActive}
              collapsed={collapsed}
            />
          );
        })}
      </div>

      {/* Bottom items */}
      <div className="flex flex-col gap-1 border-t border-white/[0.06] p-3">
        {BOTTOM_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavButton
              key={item.id}
              item={item}
              isActive={isActive}
              collapsed={collapsed}
            />
          );
        })}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-elevated text-white/40 shadow-card transition-colors hover:text-white/80"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronLeft className="h-3 w-3" />
        </motion.div>
      </button>
    </motion.nav>
  );
}

// ── Mobile bottom bar ──────────────────────────────────────────────────────────

export function MobileNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-white/[0.06] bg-abyss/95 px-2 backdrop-blur-md md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            href={item.href}
            className="relative flex flex-col items-center gap-0.5 px-4 py-2"
          >
            {isActive && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-arc-400"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-arc-300" : "text-white/30"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? "text-arc-300" : "text-white/30"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

// ── Shared nav button ──────────────────────────────────────────────────────────

interface NavButtonProps {
  item: { id: string; label: string; icon: React.ElementType; href: string };
  isActive: boolean;
  collapsed: boolean;
}

function NavButton({ item, isActive, collapsed }: NavButtonProps) {
  const Icon = item.icon;

  return (
    <Link href={item.href} className="relative block">
      {isActive && (
        <motion.div
          layoutId="sidebar-active-pill"
          className="absolute inset-0 rounded-lg bg-arc-500/15"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <div
        className={cn(
          "relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
          isActive
            ? "text-arc-300"
            : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              className="text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
        {isActive && !collapsed && (
          <motion.div
            layoutId="sidebar-active-dot"
            className="ml-auto h-1.5 w-1.5 rounded-full bg-arc-400"
          />
        )}
      </div>
    </Link>
  );
}
