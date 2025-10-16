import PostCard from './PostCard';
import type { PostListProps } from '@/types/post';

/**
 * PostList Component
 * ==================
 *
 * Container component that displays multiple blog posts in a grid layout.
 *
 * COMPONENT RESPONSIBILITIES:
 * - Receive an array of posts as props
 * - Handle empty state (no posts)
 * - Render posts in a responsive grid
 * - Display post count
 * - Pass individual posts to PostCard components
 *
 * COMPONENT TYPE: Server Component
 * ---------------------------------
 * Still a Server Component because:
 * - Only renders data, no interactivity
 * - Passes data down to child components
 * - Optimal for performance
 *
 * COMPOSITION PATTERN
 * -------------------
 * This component demonstrates "component composition":
 * - PostList (parent) manages the layout
 * - PostCard (child) handles individual post display
 * - Clear separation of concerns
 * - Reusable pieces
 */

/**
 * Component Function
 * ------------------
 * Accepts 'posts' array via props with TypeScript type checking.
 */
export default function PostList({ posts }: PostListProps) {
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
   * HAPPY PATH
   * ----------
   * If we reach here, we have posts to display.
   */
  return (
    <>
      {/*
        POST COUNT DISPLAY
        ------------------
        Shows how many posts are being displayed.

        Ternary operator for plural handling:
        - posts.length === 1 ? 'post' : 'posts'
        - If exactly 1: "post" (singular)
        - Otherwise: "posts" (plural)
        - Proper grammar matters for UX!
      */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
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
    </>
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
