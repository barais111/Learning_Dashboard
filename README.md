# Lumina — Learning Dashboard

A high-fidelity student learning dashboard built with **Next.js 14**, **Supabase**, **Framer Motion**, and **Tailwind CSS**.

---

# Why Lumina?

- Data fetching runs entirely on the server via React Server Components — Supabase credentials never reach the browser
- Granular `<Suspense>` boundaries let the Hero tile render instantly while courses load independently
- All animations use only `transform` and `opacity` — zero layout shifts, GPU-composited
- Framer Motion spring physics makes every transition feel natural without jank
- Two-layer skeleton system: route-level `loading.tsx` + component-level `<Suspense>` skeletons
- Clean Server/Client Component split makes adding new tiles easy without architectural changes
- TypeScript interfaces keep data shapes explicit across components and DB queries
- Fully responsive: expanded sidebar → icon-only → mobile bottom nav across breakpoints

---

# Features

- Bento-grid dashboard with staggered entrance animations
- Hero tile with personalized greeting, day streak, XP, and animated level progress bar
- Course cards with progress bars that animate only when scrolled into view
- Activity contribution graph — 16 weeks × 7 days, 112 cells with staggered spring animation
- Collapsible sidebar with `layoutId` active indicator that morphs between nav items
- Mobile bottom nav bar with animated top-border active indicator
- Shimmer skeleton loaders for every tile and course card (pure CSS, no JS)
- Graceful error tile — catches Supabase failures without crashing the page
- Dynamic Lucide icons mapped from DB string values at runtime

---

# Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.2.5 | App Router, RSC, file-based routing |
| React | 18 | UI library |
| TypeScript | 5 | Type safety across components and DB types |
| Supabase | 2.45.0 | PostgreSQL database + Row Level Security |
| @supabase/ssr | 0.5.1 | Server-side Supabase client for App Router |
| Framer Motion | 11.3.19 | Animations, layout animations, spring physics |
| Tailwind CSS | 3.4.1 | Utility-first styling |
| Lucide React | 0.414.0 | Icon library |
| clsx + tailwind-merge | latest | Conditional className utility (`cn()`) |

---

# Architecture

## Server / Client Component Split

```
app/page.tsx                  → Server Component (no "use client")
  └─ <Suspense>
       ├─ <HeroTile />        → Client Component (Framer Motion)
       ├─ <QuickStatsTile />  → Client Component
       ├─ <CourseGrid />      → async Server Component — fetches Supabase
       │    └─ <CourseCard /> → Client Component (animations)
       └─ <ActivityTile />    → Client Component
```

## Animation Patterns

| Pattern | Where |
|---|---|
| `variants` + `staggerChildren` | Bento tile entrance on page load |
| `type: "spring", stiffness: 300` | Card hover lift, sidebar width |
| `layoutId` | Sidebar active pill — morphs between nav items |
| `useInView` | Progress bar — animates only when visible |
| `AnimatePresence` | Sidebar label fade on collapse/expand |
| `initial → animate` with delay | Contribution graph 112-cell stagger |

---

# Getting Started

## 1. Clone and install

```bash
git clone https://github.com/your-username/learning-dashboard
cd learning-dashboard
npm install
```

## 2. Set up Supabase

- Create a free project at [supabase.com](https://supabase.com)
- Go to **SQL Editor** and run the contents of `supabase/seed.sql`
- Copy your **Project URL** and **Anon Key** from **Project Settings → API**

## 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

# Project Structure

```
app/
  layout.tsx              → Root layout (sidebar + mobile nav)
  page.tsx                → Dashboard Server Component
  loading.tsx             → Route-level skeleton
  globals.css             → Base styles, fonts, custom animations
  (dashboard)/
    layout.tsx            → Dashboard shell layout

components/
  ui/
    progress-bar.tsx      → Animated progress with useInView
    skeletons.tsx         → Skeleton loaders for all tiles
    dynamic-icon.tsx      → Maps icon_name string → Lucide component
    motion-wrappers.tsx   → BentoContainer/BentoItem with variants
  dashboard/
    hero-tile.tsx         → Welcome, streak, XP, level progress
    course-card.tsx       → Animated course tile (Client Component)
    course-grid.tsx       → Async Server Component
    activity-tile.tsx     → Contribution graph
    quick-stats-tile.tsx  → Stat chips
    error-tile.tsx        → Graceful DB error state
  sidebar/
    sidebar.tsx           → Collapsible sidebar + mobile bottom nav

lib/
  supabase/
    server.ts             → createServerClient (RSC + Server Actions)
    client.ts             → createBrowserClient
  queries.ts              → getCourses() with error handling
  utils.ts                → cn(), generateActivityData()

types/
  index.ts                → CourseRow, Course, NavItem interfaces

supabase/
  seed.sql                → Schema + sample data
```

---

# Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Your Supabase anon/public key |

> **Never commit `.env.local`** — it is already in `.gitignore`.

---

# Deployment

- Push this repo to GitHub
- Import the repo at [vercel.com/new](https://vercel.com/new)
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables
- Click **Deploy** — Vercel auto-detects Next.js, no config needed

---

# Challenges Solved

- **Framer Motion in RSC** — Framer Motion requires a browser environment. All animated components are `"use client"` and receive pre-fetched data as props from Server Components
- **Dynamic icons from DB strings** — `icon_name` is stored as a string like `"Layers"`. Cast `lucide-react` exports to a record type, look up by PascalCase with a `BookOpen` fallback
- **Contribution graph performance** — 112 DOM nodes animate simultaneously. Stagger delay of `index * 0.003s` completes the full animation in ~336ms
- **Sidebar collapse without reflow** — Framer Motion `animate={{ width }}` with spring transition never triggers a layout recalculation cascade

---

