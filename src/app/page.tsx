import { db } from '@/lib/db';
import PageHeader from '@/components/home/PageHeader';
import PostList from '@/components/home/PostList';
import type { Post } from '@/types/post';

/**
 * HOME PAGE - Main Entry Point
 * =============================
 *
 * This is the root page of our application (corresponds to route '/').
 *
 * FILE LOCATION MATTERS IN NEXT.JS:
 * ----------------------------------
 * - src/app/page.tsx → https://yourdomain.com/
 * - src/app/about/page.tsx → https://yourdomain.com/about
 * - src/app/blog/[slug]/page.tsx → https://yourdomain.com/blog/some-post
 *
 * This is Next.js's "file-based routing" - the file structure defines the URLs!
 *
 * COMPONENT RESPONSIBILITIES:
 * ---------------------------
 * This page component has ONE job: Data Orchestration
 *
 * What it does:
 * ✓ Fetch data from the database
 * ✓ Pass data to presentation components
 * ✓ Handle the overall page structure
 *
 * What it doesn't do:
 * ✗ Render UI details (delegated to PageHeader, PostList, PostCard)
 * ✗ Style individual elements (components handle their own styling)
 * ✗ Complex business logic (keep it simple!)
 *
 * This is called "Smart vs Dumb Components" pattern:
 * - Smart Component (this page): Handles data and logic
 * - Dumb Components (PageHeader, PostList, PostCard): Just render UI
 */

/**
 * SERVER COMPONENT (RSC)
 * ----------------------
 * This is a React Server Component because:
 * - No 'use client' directive at the top
 * - It's async (can use await)
 * - Runs only on the server
 *
 * Benefits:
 * 1. Direct Database Access - No API route needed!
 * 2. Zero Client JavaScript - This component doesn't add to bundle size
 * 3. Better Performance - Data fetching happens server-side
 * 4. Security - Database credentials never exposed to client
 * 5. SEO Friendly - Content is rendered on server (crawlers see it)
 *
 * In traditional React, you'd need:
 * - useEffect for data fetching
 * - useState for storing data
 * - Loading states
 * - Error handling
 * - API routes
 *
 * Server Components eliminate all of that! 🎉
 */
export default async function Home() {
  /**
   * DATA FETCHING
   * -------------
   * We query the database directly using Prisma ORM.
   *
   * PRISMA QUERY BREAKDOWN:
   *
   * db.post.findMany({...})
   * ├─ db: Our Prisma client instance (from @/lib/db)
   * ├─ post: The model name from our schema (prisma/schema.prisma)
   * └─ findMany: Method to fetch multiple records
   *
   * Query Configuration:
   *
   * 1. where: { published: true }
   *    - Filters results to only published posts
   *    - Drafts (published: false) are excluded
   *    - This is called a "WHERE clause" in SQL
   *
   * 2. include: { category: true }
   *    - Fetches related category data
   *    - Called "eager loading" or "joining"
   *    - Without this, category would be null/undefined
   *    - One query instead of N+1 queries (efficient!)
   *
   * 3. orderBy: { createdAt: 'desc' }
   *    - Sorts results by creation date
   *    - 'desc' = descending (newest first)
   *    - 'asc' would be ascending (oldest first)
   *
   * 4. take: 10
   *    - Limits results to 10 posts
   *    - Like SQL's LIMIT clause
   *    - Later we'll add pagination for the rest
   *
   * TYPE ANNOTATION: Post[]
   * -----------------------
   * We tell TypeScript this is an array of Post objects.
   * - Provides autocomplete
   * - Catches type errors
   * - Makes code self-documenting
   */
  const posts: Post[] = await db.post.findMany({
    where: {
      published: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  /**
   * JSX RETURN - Component Composition
   * -----------------------------------
   *
   * We're composing our UI from smaller components:
   * - PageHeader: Displays title and subtitle
   * - PostList: Handles the grid layout and renders posts
   *
   */
  return (
    /**
     * PAGE CONTAINER
     * --------------
     * Tailwind classes:
     * - min-h-screen: Minimum height of viewport (100vh)
     * - bg-gray-50: Light gray background in light mode
     * - dark:bg-gray-900: Dark background in dark mode
     *
     * This ensures the page always fills the viewport.
     */
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/*
        CONTENT CONTAINER
        -----------------
        Max-width container that centers content.

        - max-w-7xl: Maximum width of 80rem (1280px)
        - mx-auto: Centers horizontally (margin: 0 auto)
        - px-4 sm:px-6 lg:px-8: Responsive horizontal padding
          * 1rem on mobile
          * 1.5rem on small screens (640px+)
          * 2rem on large screens (1024px+)
        - py-12: Vertical padding of 3rem (48px)

        This creates a responsive, centered layout with proper spacing!
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/*
          COMPONENT COMPOSITION
          ---------------------
          We render our two main components:

          1. PageHeader
             - No props needed (displays static content)
             - Could be made dynamic in the future

          2. PostList
             - Receives 'posts' array as prop
             - Handles rendering all posts
             - Also handles empty state
        */}
        <PageHeader />
        <PostList posts={posts} />
      </div>
    </div>
  );
}

/**
 * ARCHITECTURE COMPARISON
 * =======================
 *
 * BEFORE (Monolithic):
 * --------------------
 * page.tsx (267 lines)
 * ├─ Types
 * ├─ Data fetching
 * ├─ Header rendering
 * ├─ Post list rendering
 * └─ Post card rendering
 *
 * AFTER (Modular):
 * ----------------
 * page.tsx (100 lines) → Data orchestration
 * ├─ types/post.ts → Type definitions
 * ├─ components/home/PageHeader.tsx → Header UI
 * ├─ components/home/PostList.tsx → List layout
 * └─ components/home/PostCard.tsx → Card UI
 *
 * Benefits:
 * ✓ Each file has single responsibility
 * ✓ Components are reusable
 * ✓ Easier to test
 * ✓ Easier to maintain
 * ✓ Easier to understand
 * ✓ Multiple developers can work simultaneously
 * ✓ Changes are localized
 *
 * KEY NEXT.JS 15 CONCEPTS:
 * ========================
 *
 * 1. FILE-BASED ROUTING
 *    - page.tsx in a folder creates a route
 *    - No need for react-router or similar
 *
 * 2. SERVER COMPONENTS (RSC)
 *    - Async components
 *    - Direct database access
 *    - Zero client JavaScript
 *
 * 3. DATA FETCHING
 *    - No useEffect needed
 *    - No loading states needed (for now)
 *    - Happens during server render
 *
 * 4. COMPONENT COMPOSITION
 *    - Build complex UIs from simple components
 *    - Props flow down the tree
 *    - Each component has clear responsibility
 *
 * 5. TYPESCRIPT INTEGRATION
 *    - Type-safe props
 *    - Type-safe database queries
 *    - Catch errors at compile time
 *
 * NEXT STEPS (Hour 2 & 3):
 * ========================
 * - Add ISR (Incremental Static Regeneration)
 * - Implement pagination
 * - Add loading states
 * - Create dynamic routes for individual posts
 */
