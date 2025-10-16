import type { PostCardProps } from '@/types/post';

/**
 * PostCard Component
 * ==================
 *
 * Displays a single blog post in a card format.
 *
 * COMPONENT RESPONSIBILITIES:
 * - Display post information (title, excerpt, category, etc.)
 * - Format dates in a readable way
 * - Show engagement metrics (views, likes)
 * - Provide consistent styling across all posts
 *
 * COMPONENT TYPE: Server Component
 * ---------------------------------
 * This is a Server Component because:
 * - No interactivity (no clicks, no state changes)
 * - Just displays data
 * - Optimal performance (no JS sent to client)
 *
 * When would we make it a Client Component?
 * - If we add click handlers
 * - If we need useState or useEffect
 * - If we need browser APIs
 * Then we'd add 'use client' at the top
 */

/**
 * PROPS EXPLANATION
 * -----------------
 * Props are how we pass data from parent to child component.
 *
 * Destructuring syntax: { post }
 * - Instead of: function PostCard(props) { const post = props.post; }
 * - We use: function PostCard({ post })
 * - Cleaner and more readable
 *
 * TypeScript type: PostCardProps
 * - Ensures we receive the correct data structure
 * - Provides autocomplete in editor
 * - Catches errors at compile time
 */
export default function PostCard({ post }: PostCardProps) {
  /**
   * COMPONENT LOGIC
   * ---------------
   * Format the date before rendering.
   * We do this here (not in JSX) because:
   * - Keeps JSX clean and readable
   * - Can reuse the formatted date
   * - Easier to test
   */
  const formattedDate = post.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',   // "2024"
    month: 'long',     // "January"
    day: 'numeric',    // "15"
  });

  /**
   * JSX RETURN
   * ----------
   * The <article> semantic HTML element is perfect for blog posts.
   * It tells browsers and screen readers "this is a self-contained piece of content".
   */
  return (
    <article
      /**
       * Tailwind Classes Breakdown:
       * ---------------------------
       * STRUCTURE:
       * - bg-white dark:bg-gray-800: White background (or dark gray in dark mode)
       * - rounded-lg: Rounded corners (0.5rem radius)
       * - shadow-md: Medium drop shadow
       * - overflow-hidden: Clips content to rounded corners
       *
       * INTERACTIONS:
       * - hover:shadow-lg: Larger shadow on mouse hover
       * - transition-shadow: Smooth animation for shadow
       * - duration-300: Animation takes 300ms
       *
       * These create a pleasant interactive effect!
       */
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/*
        CARD CONTENT CONTAINER
        ----------------------
        Flexbox layout with vertical direction pushes footer to bottom.
      */}
      <div className="p-6 flex flex-col h-full">

        {/*
          CATEGORY BADGE
          --------------
          Conditional rendering: only show if post has a category.

          JavaScript && operator:
          - If post.category is truthy, render the <div>
          - If post.category is null, render nothing

          This is a common React pattern!
        */}
        {post.category && (
          <div className="mb-3">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
              {post.category.name}
            </span>
          </div>
        )}

        {/*
          POST TITLE
          ----------
          <h2> because this is a sub-heading (page has <h1>).
          Proper heading hierarchy is important for accessibility and SEO.
        */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {post.title}
        </h2>

        {/*
          POST EXCERPT
          ------------
          Another conditional render.

          The 'flex-grow' class is clever:
          - It makes this element take all available space
          - Pushes the meta information to the bottom
          - Creates consistent card heights
        */}
        {post.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
            {post.excerpt}
          </p>
        )}

        {/*
          META INFORMATION SECTION
          ------------------------
          The 'mt-auto' class:
          - 'auto' margin on top
          - Combined with flex-col parent, pushes this to bottom
          - Ensures footer is always at the bottom regardless of content length
        */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">

          {/*
            ENGAGEMENT METRICS (Views & Likes)
            ----------------------------------
            We use SVG icons for:
            - Scalability (look crisp at any size)
            - Styling flexibility (can change color with CSS)
            - Performance (no image downloads)
          */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <div className="flex items-center space-x-4">

              {/* VIEWS COUNTER */}
              <span className="flex items-center">
                {/*
                  SVG Icon - Eye
                  --------------
                  - viewBox: Defines coordinate system
                  - stroke: Line color (currentColor = inherits text color)
                  - strokeLinecap/strokeLinejoin: Line style
                  - strokeWidth: Line thickness
                  - d: Path definition (the actual shape)
                */}
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {post.views}
              </span>

              {/* LIKES COUNTER */}
              <span className="flex items-center">
                {/* SVG Icon - Heart */}
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {post.likes}
              </span>
            </div>
          </div>

          {/*
            PUBLICATION DATE
            ----------------
            Using the formatted date we created earlier.
          */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formattedDate}
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * KEY CONCEPTS DEMONSTRATED:
 * ==========================
 *
 * 1. COMPONENT PROPS
 *    - Accepting data from parent
 *    - TypeScript for type safety
 *    - Destructuring for clean code
 *
 * 2. CONDITIONAL RENDERING
 *    - Using && operator
 *    - Handling null/undefined values
 *    - Graceful degradation
 *
 * 3. SEMANTIC HTML
 *    - <article> for blog post
 *    - Proper heading hierarchy
 *    - Meaningful structure
 *
 * 4. FLEXBOX LAYOUT
 *    - flex-col for vertical layout
 *    - flex-grow for dynamic spacing
 *    - mt-auto for bottom alignment
 *
 * 5. RESPONSIVE DESIGN
 *    - Works on all screen sizes
 *    - Dark mode support
 *    - Hover effects for interactivity
 *
 * 6. SVG ICONS
 *    - Scalable vector graphics
 *    - Styling with CSS
 *    - currentColor for theme support
 *
 * WHY THIS APPROACH?
 * ------------------
 * By separating PostCard:
 * ✓ Can reuse it anywhere (search results, related posts, etc.)
 * ✓ Easy to modify design in one place
 * ✓ Can test independently
 * ✓ Clear responsibilities
 * ✓ Better code organization
 */
