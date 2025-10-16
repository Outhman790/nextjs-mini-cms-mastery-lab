/**
 * SHARED TYPE DEFINITIONS
 * ========================
 *
 * This file contains TypeScript type definitions that are shared across multiple components.
 *
 * WHY SEPARATE TYPES FILE?
 * ------------------------
 * 1. **DRY Principle** (Don't Repeat Yourself) - Define types once, use everywhere
 * 2. **Single Source of Truth** - If the Post structure changes, update in one place
 * 3. **Consistency** - All components use the same type definitions
 * 4. **Easier Refactoring** - Change type in one place affects all components
 * 5. **Better Organization** - Types are separate from component logic
 *
 * TYPE vs INTERFACE
 * -----------------
 * In TypeScript, you can use either 'type' or 'interface'.
 *
 * We use 'type' here because:
 * - More flexible (can represent unions, primitives, etc.)
 * - Better for complex types
 * - Personal preference for data structures
 *
 * 'interface' is better when:
 * - Defining object shapes for classes
 * - Need declaration merging
 * - Working with traditional OOP patterns
 */

/**
 * Post Type Definition
 * --------------------
 * Represents a blog post from our database with all its relationships.
 *
 * This matches the Prisma schema Post model plus included relationships.
 */
export type Post = {
  id: string;              // Unique identifier (CUID format)
  title: string;           // Post title
  slug: string;            // URL-friendly version of title
  excerpt: string | null;  // Short description (optional, hence 'null')
  content: string;         // Full post content (markdown)
  published: boolean;      // Publication status (true = visible, false = draft)
  views: number;           // Number of times post was viewed
  likes: number;           // Number of likes
  createdAt: Date;         // When the post was created
  updatedAt: Date;         // Last update timestamp
  categoryId: string | null; // Foreign key to Category (optional)

  /**
   * RELATIONSHIP: Category
   * ----------------------
   * This is a "belongs to" relationship.
   * A post can have ONE category (or none).
   *
   * The '| null' means:
   * - The post might not have a category assigned
   * - We need to check if it exists before accessing it
   *
   * TypeScript will force us to handle the null case, preventing runtime errors!
   */
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

/**
 * PostCardProps Type
 * ------------------
 * Defines what props the PostCard component accepts.
 *
 * This is important for:
 * - Type safety when passing props
 * - Autocomplete in your editor
 * - Documentation of component API
 */
export type PostCardProps = {
  post: Post;  // The PostCard receives a single Post object
};

/**
 * PostListProps Type
 * ------------------
 * Defines what props the PostList component accepts.
 */
export type PostListProps = {
  posts: Post[];  // Array of Post objects (Post[] means "array of Post")
};

/**
 * TYPESCRIPT TIP: Union Types
 * ----------------------------
 * The '| null' syntax creates a "union type".
 * It means the value can be EITHER the type OR null.
 *
 * Examples:
 * - string | null → can be a string or null
 * - number | undefined → can be a number or undefined
 * - 'draft' | 'published' → can only be these exact strings
 *
 * This is one of TypeScript's most powerful features!
 */

/**
 * NEXT.JS TIP: Why Types Matter
 * ------------------------------
 * In Next.js Server Components:
 * - Data flows from server to client
 * - Types ensure data structure is consistent
 * - Prevents common bugs like accessing undefined properties
 * - Makes refactoring safer
 */
