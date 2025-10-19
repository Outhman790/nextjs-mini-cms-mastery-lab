'use client';

import PostCard from './PostCard';
import Pagination from './Pagination';
import type { PostListProps } from '@/types/post';

/**
 * PostList Component
 * ==================
 *
 * Container component that displays multiple blog posts in a grid layout with pagination.
 *
 * COMPONENT RESPONSIBILITIES:
 * - Receive an array of posts and pagination data as props
 * - Handle empty state (no posts)
 * - Render posts in a responsive grid
 * - Display post count with range ("Showing X-Y of Z posts")
 * - Pass individual posts to PostCard components
 * - Render pagination controls
 * - Animate page transitions
 *
 * COMPONENT TYPE: Client Component
 * ---------------------------------
 * Changed to Client Component because:
 * - Need animations on page changes
 * - Tailwind animations require DOM manipulation
 * - Still receives pre-rendered data from server
 * - Minimal JavaScript overhead (just for animations)
 *
 * WHY 'use client'?
 * -----------------
 * - Server Components can't use browser APIs
 * - Animations require client-side rendering
 * - But data is still fetched on server (in page.tsx)
 * - This component just handles presentation + animation
 *
 * COMPOSITION PATTERN
 * -------------------
 * This component demonstrates "component composition":
 * - PostList (parent) manages the layout
 * - PostCard (child) handles individual post display
 * - Pagination (child) handles navigation controls
 * - Clear separation of concerns
 * - Reusable pieces
 */

/**
 * Component Function
 * ------------------
 * Now accepts pagination data in addition to posts array.
 */
export default function PostList({ posts, currentPage, totalPages, totalPosts }: PostListProps) {
  /**
   * EARLY RETURN PATTERN
   * --------------------
   * If there are no posts, return early with a message.
   *
   * Why this pattern?
   * - Avoids nested conditionals
   * - Makes code more readable (happy path is clear)
   * - Prevents unnecessary computations
   * - Common React best practice
   *
   * This is called a "guard clause" in programming.
   */
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No posts found. Run the seed command to add sample posts.
        </p>
        {/*
          HELPFUL MESSAGE
          ---------------
          Always provide actionable information in empty states!
          Users shouldn't wonder "what do I do now?"
        */}
        <code className="block mt-4 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
          npx prisma db seed
        </code>
      </div>
    );
  }

  /**
   * PAGINATION CALCULATIONS
   * ------------------------
   * Calculate the range of posts being displayed on current page.
   *
   * Example: Page 2 with 6 posts per page
   * - firstPost = (2 - 1) × 6 + 1 = 7
   * - lastPost = 7 + 6 - 1 = 12
   * - Display: "Showing 7-12 of 25 posts"
   *
   * This gives users context about where they are in the full list.
   */
  const POSTS_PER_PAGE = 6;
  const firstPost = (currentPage - 1) * POSTS_PER_PAGE + 1;
  const lastPost = firstPost + posts.length - 1;

  /**
   * HAPPY PATH
   * ----------
   * If we reach here, we have posts to display.
   */
  return (
    /**
     * ANIMATION WRAPPER
     * -----------------
     * The outer div uses a key prop to force React to re-render on page changes.
     *
     * Key Prop Pattern:
     * - key={currentPage} tells React: "This is a NEW component when page changes"
     * - React will unmount the old div and mount a new one
     * - This triggers the animation to restart
     *
     * Tailwind Animation Class:
     * - animate-fadeIn: Custom animation defined in tailwind.config.ts
     * - Fades from opacity 0 to 1 with slight upward movement
     * - Duration: 500ms (smooth but not sluggish)
     * - Easing: ease-in-out (natural feeling)
     *
     * Why this works:
     * - When user clicks page 2, key changes from 1 to 2
     * - React sees different key, treats it as NEW component
     * - Unmounts old div, mounts new div
     * - New div starts with opacity 0, animates to opacity 1
     * - Smooth fade-in effect on every page change!
     *
     * Performance Benefits:
     * - GPU-accelerated (opacity + transform)
     * - No JavaScript calculations needed
     * - No external animation libraries (0 KB bundle cost)
     * - Pure CSS - works even with JavaScript disabled
     * - Doesn't block rendering or user interaction
     */
    <div key={currentPage} className="animate-fadeIn">
      {/*
        POST RANGE DISPLAY
        ------------------
        Shows which posts are being displayed out of the total.

        ENHANCED FROM SIMPLE COUNT:
        - Before: "Showing 6 posts"
        - After: "Showing 7-12 of 25 posts"

        Why this is better UX:
        - Users know their position in the full list
        - Users know total number of posts available
        - More informative and professional
        - Standard pattern in paginated interfaces
      */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {firstPost}-{lastPost} of {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {/*
        RESPONSIVE GRID LAYOUT
        ----------------------
        CSS Grid is perfect for card layouts!

        Tailwind Grid Classes Explained:
        - grid: Enables CSS Grid
        - grid-cols-1: 1 column on mobile (default)
        - md:grid-cols-2: 2 columns on medium screens (768px+)
        - lg:grid-cols-3: 3 columns on large screens (1024px+)
        - gap-6: 1.5rem (24px) space between items

        This creates a responsive layout that:
        - Stacks on mobile (better for small screens)
        - Shows 2 columns on tablets
        - Shows 3 columns on desktops
        - Automatically handles wrapping
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*
          MAPPING OVER POSTS
          ------------------
          The .map() function is fundamental to React!

          How it works:
          1. Takes an array (posts)
          2. Runs a function for each item
          3. Returns a new array with the results
          4. React renders all the results

          Why we need 'key':
          - React uses keys to track which items changed
          - Helps with performance (React knows what to re-render)
          - Should be unique and stable (post.id is perfect!)
          - Never use array index as key (can cause bugs)

          IMPORTANT: Keys should be:
          ✓ Unique among siblings
          ✓ Stable (don't change between renders)
          ✓ Predictable (same item = same key)
        */}
        {posts.map((post) => (
          /**
           * KEY PROP EXPLANATION
           * --------------------
           * key={post.id} tells React:
           * "This PostCard represents the post with this ID"
           *
           * Without keys, React can't tell:
           * - Which items were added
           * - Which items were removed
           * - Which items changed
           *
           * This leads to bugs and performance issues!
           */
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>

      {/*
        PAGINATION CONTROLS
        -------------------
        Display pagination navigation if there are multiple pages.

        The Pagination component:
        - Shows Previous/Next buttons
        - Displays current page indicator
        - Uses Next.js Link for client-side navigation
        - Automatically hides if only 1 page (handled inside component)

        URL-BASED STATE:
        - Page state is in URL (?page=2)
        - Shareable links (users can copy URL to page 3)
        - SEO friendly (search engines can crawl pages)
        - Browser back/forward buttons work
        - No JavaScript state management needed
      */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

/**
 * KEY CONCEPTS DEMONSTRATED:
 * ==========================
 *
 * 1. COMPONENT COMPOSITION
 *    - Parent component (PostList) manages layout
 *    - Child component (PostCard) handles display
 *    - Clear separation of concerns
 *    - Reusable building blocks
 *
 * 2. ARRAY MAPPING
 *    - posts.map() to render multiple components
 *    - key prop for React reconciliation
 *    - Clean, declarative code
 *
 * 3. EARLY RETURN PATTERN
 *    - Handle edge cases first
 *    - Keep happy path clear
 *    - Better readability
 *
 * 4. RESPONSIVE DESIGN
 *    - Mobile-first approach (1 column default)
 *    - Progressive enhancement (more columns on larger screens)
 *    - CSS Grid for flexible layouts
 *
 * 5. UX BEST PRACTICES
 *    - Helpful empty state
 *    - Proper pluralization
 *    - Clear feedback to users
 *
 * 6. FRAGMENT (<>)
 *    - React Fragments let you return multiple elements
 *    - Without adding extra DOM nodes
 *    - Keeps HTML clean
 *
 * REACT PERFORMANCE TIP:
 * ----------------------
 * This component is efficient because:
 * - It's a Server Component (no client JS)
 * - Grid layout is CSS-based (no JavaScript calculations)
 * - Each PostCard is independent (React can optimize)
 * - Proper keys enable efficient updates
 *
 * COMPOSITION vs MONOLITH:
 * ------------------------
 * Compare this approach:
 *   <PostList posts={posts} />
 *     └─> <PostCard post={post} />
 *
 * To the monolithic approach:
 *   <PageWithEverything />
 *     └─> (all logic and rendering in one component)
 *
 * Benefits of composition:
 * ✓ Easier to test (test PostCard independently)
 * ✓ Easier to modify (change PostCard without touching PostList)
 * ✓ Reusable (use PostCard elsewhere)
 * ✓ Readable (smaller, focused components)
 * ✓ Maintainable (find bugs faster in smaller files)
 */
