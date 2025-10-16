/**
 * PageHeader Component
 * ====================
 *
 * A reusable header component for the home page.
 *
 * COMPONENT RESPONSIBILITIES:
 * - Display the main page title
 * - Show a descriptive subtitle
 * - Provide visual hierarchy (h1 for SEO)
 *
 * COMPONENT TYPE: Server Component
 * ---------------------------------
 * This is a Server Component (no 'use client' directive).
 *
 * Why Server Component?
 * - No interactivity needed (just displays static content)
 * - Zero JavaScript sent to browser for this component
 * - Better performance
 * - SEO friendly (rendered on server)
 */

/**
 * The Component Function
 * ----------------------
 * This is a React Functional Component.
 *
 * Notice:
 * - It's a regular JavaScript function that returns JSX
 * - No props needed (yet) - it displays fixed content
 * - Can be easily modified to accept props in the future
 */
export default function PageHeader() {
  return (
    /**
     * Semantic HTML: <header>
     * -----------------------
     * We use <header> instead of <div> because:
     * - Better accessibility (screen readers understand structure)
     * - SEO benefits (search engines understand content hierarchy)
     * - Semantic meaning (this IS a header section)
     */
    <header className="mb-12">
      {/*
        HEADING ELEMENT
        ---------------
        <h1> is the most important heading on the page.

        Tailwind Classes Explained:
        - text-4xl: Font size 2.25rem (36px)
        - font-bold: Font weight 700 (bold)
        - text-gray-900: Dark gray in light mode
        - dark:text-white: White text in dark mode
        - mb-4: Margin bottom 1rem (16px)

        The 'dark:' prefix is Tailwind's way of handling dark mode.
        It automatically applies when the user's system prefers dark mode.
      */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Next.js Mini CMS
      </h1>

      {/*
        SUBTITLE PARAGRAPH
        ------------------
        Provides context about the project.

        Tailwind Classes:
        - text-lg: Slightly larger text (1.125rem / 18px)
        - text-gray-600: Medium gray in light mode
        - dark:text-gray-300: Light gray in dark mode

        Why different shades?
        - Creates visual hierarchy (title is more prominent)
        - Improves readability
        - Professional design pattern
      */}
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Learning Next.js 15 features through building a content management system
      </p>
    </header>
  );
}

/**
 * KEY CONCEPTS DEMONSTRATED:
 * ==========================
 *
 * 1. COMPONENT MODULARITY
 *    - Single responsibility (just displays header)
 *    - Reusable (can be used on multiple pages)
 *    - Easy to maintain
 *
 * 2. SEMANTIC HTML
 *    - Using <header> instead of <div>
 *    - Proper heading hierarchy (<h1>)
 *    - Accessibility best practices
 *
 * 3. TAILWIND CSS
 *    - Utility classes for styling
 *    - Responsive design ready
 *    - Dark mode support built-in
 *
 * 4. SERVER COMPONENT
 *    - No client-side JavaScript
 *    - Rendered on server
 *    - Optimal performance
 *
 * FUTURE ENHANCEMENTS:
 * -------------------
 * This component could be made more flexible by accepting props:
 *
 * type PageHeaderProps = {
 *   title: string;
 *   subtitle: string;
 * }
 *
 * export default function PageHeader({ title, subtitle }: PageHeaderProps) {
 *   return (
 *     <header className="mb-12">
 *       <h1 className="...">{title}</h1>
 *       <p className="...">{subtitle}</p>
 *     </header>
 *   );
 * }
 *
 * This would make it reusable across different pages!
 */
