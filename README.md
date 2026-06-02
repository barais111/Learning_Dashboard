# Lumina — Next-Gen Learning Dashboard

A high-fidelity Student Dashboard built with Next.js 14 App Router, Supabase, Framer Motion, and Tailwind CSS.

![Lumina Dashboard](https://placeholder.svg)

## Live Demo

🔗 **[lumina-dashboard.vercel.app](https://lumina-dashboard.vercel.app)** *(deploy to populate this)*

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/your-username/learning-dashboard
cd learning-dashboard
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Navigate to **SQL Editor** and paste + run `supabase/seed.sql`
3. Copy your project URL and anon key from **Project Settings → API**

### 3. Configure environment variables

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

---

## Architecture & Technical Decisions

### Server / Client Component Split

The primary data-fetching strategy uses **React Server Components (RSC)**:

```
app/page.tsx                → Server Component (no "use client")
  └─ <Suspense>
       └─ <CourseGrid />    → async Server Component — fetches from Supabase
            └─ <CourseCard /> → Client Component ("use client" — needs Framer Motion)
```

**Why this split?**

- `CourseGrid` is async and calls `getCourses()` on the server, so Supabase credentials never reach the browser
- `CourseCard`, `HeroTile`, `ActivityTile`, etc. are Client Components because they use `framer-motion` hooks and browser APIs
- `Sidebar` is a Client Component because it needs `usePathname()` for active state

### Supabase Integration

- Uses `@supabase/ssr` with `createServerClient` — the correct approach for App Router
- The anon key is safe to expose (it's `NEXT_PUBLIC_`), but Row Level Security policies on the `courses` table restrict write access
- Connection is established fresh per request (no singleton anti-pattern in RSC)

### Animation Architecture

All animations use `framer-motion` with these key patterns:

| Pattern | Used for |
|---------|----------|
| `variants` + `staggerChildren` | Bento tile staggered entrance |
| `type: "spring", stiffness: 300, damping: 20` | Card hover elevation |
| `layoutId` | Sidebar active indicator (snaps between items) |
| `useInView` | Progress bar — animates only when visible |
| `whileHover` | Card scale + glow reveal |

**Zero Layout Shifts:** All animations use `transform` (scale, translateY) and `opacity` exclusively. No width/height/top/left changes occur on hover.

### Responsive Breakpoints

| Viewport | Layout |
|----------|--------|
| `< 768px` | Single column, sidebar → bottom nav bar |
| `768–1024px` | 2-column Bento, sidebar collapses to icon-only |
| `> 1024px` | Full 3-column Bento, expanded sidebar |

### Loading States

Two-layer loading strategy:
1. **Route-level** `loading.tsx` — shown for the entire page during navigation
2. **Granular `<Suspense>`** — wraps `<CourseGrid>` independently so the Hero tile renders immediately while courses load

Skeleton loaders use CSS `overflow: hidden` + a pseudo-element shimmer animation (no JS, hardware-accelerated).

---

## Project Structure

```
app/
  layout.tsx          ← Root layout (sidebar + mobile nav)
  page.tsx            ← Dashboard Server Component
  loading.tsx         ← Route-level skeleton
  globals.css         ← Base styles, fonts, custom animations

components/
  ui/
    dynamic-icon.tsx  ← Maps icon_name → Lucide component
    motion-wrappers.tsx ← BentoContainer/BentoItem with variants
    progress-bar.tsx  ← Animated progress with useInView
    skeletons.tsx     ← Skeleton loaders for all tiles
  dashboard/
    hero-tile.tsx     ← Welcome + streak + XP
    course-card.tsx   ← Dynamic course tile (Client)
    course-grid.tsx   ← async Server Component
    activity-tile.tsx ← Contribution graph
    quick-stats-tile.tsx ← Stat chips
    error-tile.tsx    ← Graceful DB error state
  sidebar/
    sidebar.tsx       ← Collapsible nav + mobile bar

lib/
  supabase/
    server.ts         ← createServerClient (RSC)
    client.ts         ← createBrowserClient (for future use)
  queries.ts          ← getCourses() with error handling
  utils.ts            ← cn(), generateActivityData()

types/
  index.ts            ← CourseRow, Course, NavItem interfaces

supabase/
  seed.sql            ← Schema + sample data
```

---

## Challenges & Solutions

**1. Framer Motion in RSC context**
Framer Motion requires a browser environment. Solution: keep all animated components as `"use client"`, and pass pre-fetched data as props from Server Components.

**2. Dynamic Lucide icons from string**
The `icon_name` field is a string like `"Layers"`. Solution: cast `lucide-react`'s named exports to a record type and look up by PascalCase name, with a `BookOpen` fallback.

**3. Zero layout shifts on hover**
Using `whileHover={{ scale: 1.018 }}` with spring physics means no reflow — `transform: scale()` is composited on the GPU.

**4. Contribution graph performance**
112 DOM nodes animating in. Solution: stagger delay calculated as `index * 0.003s` so the animation completes in ~336ms total, not 112 sequential springs.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Your Supabase anon/public key |

See `.env.example` for the template. **Never commit your `.env.local` file.**
