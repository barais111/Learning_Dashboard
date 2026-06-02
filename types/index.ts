// Database row type (matches Supabase schema exactly)
export interface CourseRow {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

// Enriched type used in components
export interface Course extends CourseRow {
  colorAccent: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  streak: number;
  xp: number;
  level: number;
}

export interface ActivityDay {
  date: string;
  count: number;
}

export type SidebarState = "expanded" | "collapsed" | "mobile";
