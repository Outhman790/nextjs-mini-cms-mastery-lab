import Link from 'next/link';

/**
 * PAGINATION COMPONENT
 * ====================
 *
 * Displays pagination controls for navigating between pages.
 *
 * COMPONENT TYPE: Server Component
 * ---------------------------------
 * This is a Server Component because:
 * - No interactivity (just displays links)
 * - Uses Next.js Link for client-side navigation
 * - No useState, useEffect, or event handlers
 *
 * WHY USE LINK INSTEAD OF BUTTONS?
 * ---------------------------------
 * Using <Link> instead of <button onClick={}> because:
 * 1. SEO - Search engines can crawl pagination links
 * 2. Shareable URLs - Users can copy/paste page 3 URL
 * 3. Browser history - Back/forward buttons work
 * 4. Client-side navigation - Fast page transitions
 * 5. No JavaScript required - Works even if JS disabled
 */

/**
 * PROPS TYPE DEFINITION
 * ----------------------
 * Defines what data this component needs from parent.
 */
type PaginationProps = {
  currentPage: number;  // e.g., 2 (we're on page 2)
  totalPages: number;   // e.g., 5 (there are 5 total pages)
};

/**
 * PAGINATION COMPONENT FUNCTION
 * ------------------------------
 * Renders Previous/Next buttons and page indicator.
 */
export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  /**
   * EDGE CASE: Single Page or No Pages
   * -----------------------------------
   * If there's only 1 page (or 0 pages), don't show pagination.
   * No point showing Previous/Next if there's nowhere to go!
   */
  if (totalPages <= 1) {
    return null;  // Render nothing
  }

  /**
   * DETERMINE BUTTON STATES
   * ------------------------
   * Calculate whether Previous/Next should be disabled.
   */
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  /**
   * URL CONSTRUCTION
   * ----------------
   * Build URLs for Previous and Next pages.
   *
   * Examples:
   * - Current page 2 → Previous: /?page=1, Next: /?page=3
   * - Current page 1 → Previous: disabled, Next: /?page=2
   */
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    /**
     * PAGINATION CONTAINER
     * --------------------
     * Flex layout to space out Previous, Info, and Next.
     */
    <nav
      className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6"
      aria-label="Pagination"
    >
      <div className="flex items-center justify-between">

        {/* PREVIOUS BUTTON */}
        {isFirstPage ? (
          /**
           * DISABLED STATE
           * --------------
           * When on first page, show disabled button.
           * - Can't use <Link> because there's no previous page
           * - Use <span> styled like a button
           * - Gray text and cursor-not-allowed
           */
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-not-allowed">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </span>
        ) : (
          /**
           * ACTIVE LINK
           * -----------
           * When not on first page, show clickable link.
           *
           * NEXT.JS LINK COMPONENT
           * ----------------------
           * - Provides client-side navigation (no full page reload)
           * - Prefetches linked page on hover (faster navigation)
           * - Updates URL in browser
           * - Maintains scroll position
           *
           * href={`/?page=${previousPage}`}
           * - Template literal to construct URL
           * - /?page=1, /?page=2, etc.
           */
          <Link
            href={`/?page=${previousPage}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </Link>
        )}

        {/* PAGE INDICATOR */}
        {/**
         * CURRENT PAGE DISPLAY
         * --------------------
         * Shows "Page X of Y" in the center.
         *
         * Example: "Page 2 of 5"
         *
         * Why show this?
         * - Users know where they are
         * - Users know how many pages total
         * - Users can decide whether to continue browsing
         */}
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </span>

        {/* NEXT BUTTON */}
        {isLastPage ? (
          /**
           * DISABLED STATE
           * --------------
           * When on last page, show disabled button.
           */
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-not-allowed">
            Next
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        ) : (
          /**
           * ACTIVE LINK
           * -----------
           * When not on last page, show clickable link to next page.
           */
          <Link
            href={`/?page=${nextPage}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Next
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </nav>
  );
}

/**
 * KEY CONCEPTS DEMONSTRATED:
 * ==========================
 *
 * 1. NEXT.JS LINK COMPONENT
 *    - Client-side navigation (SPA-like)
 *    - Prefetching on hover
 *    - URL updates without full reload
 *    - Browser history support
 *
 * 2. URL-BASED STATE
 *    - Pagination state in URL (?page=2)
 *    - Shareable links
 *    - SEO friendly
 *    - Works without JavaScript
 *
 * 3. CONDITIONAL RENDERING
 *    - Show different UI based on state
 *    - Disabled vs active buttons
 *    - Hide pagination if only 1 page
 *
 * 4. ACCESSIBILITY
 *    - <nav> with aria-label
 *    - Semantic HTML
 *    - Clear visual states
 *
 * 5. TAILWIND CSS
 *    - Consistent styling
 *    - Dark mode support
 *    - Hover effects
 *    - Responsive design
 *
 * NEXT.JS LINK vs HTML <a>
 * -------------------------
 * <a href="/?page=2">           → Full page reload (slow)
 * <Link href="/?page=2">        → Client-side navigation (fast)
 *
 * NEXT.JS LINK vs onClick
 * -----------------------
 * <button onClick={goToPage}>   → Requires JavaScript, not SEO friendly
 * <Link href="/?page=2">        → Works without JS, SEO friendly
 */
