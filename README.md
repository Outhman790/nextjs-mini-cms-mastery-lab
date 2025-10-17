# Next.js Mini CMS Mastery Lab

Learning Next.js 15 by building a full-stack mini CMS with TypeScript, Prisma, and Tailwind CSS. Exploring all modern Next.js features through practical implementation.

## 🚀 Project Status

**Current Progress:** Day 2 Complete - Home Feed with ISR ✅

- ✅ Modular component architecture
- ✅ Server Components with direct database access
- ✅ ISR (Incremental Static Regeneration) with 60-second revalidation
- ✅ PostgreSQL database with Docker
- ✅ Responsive grid layout (1→2→3 columns)
- ✅ Production-ready build system

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Prisma ORM** - Database toolkit and query builder
- **PostgreSQL 16** - Production-ready database (via Docker)
- **Docker** - Containerized database for local development
- **Tailwind CSS v4** - Utility-first CSS framework
- **React 19** - Latest React features

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager
- **Docker Desktop** (for PostgreSQL database)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Outhman790/nextjs-mini-cms-mastery-lab.git
cd nextjs-mini-cms-mastery-lab
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start PostgreSQL with Docker:**
```bash
# Start PostgreSQL container
docker run --name mini-cms-postgres \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mini_cms_dev \
  -p 5432:5432 \
  -d postgres:16

# Verify it's running
docker ps
```

4. **Set up environment variables:**

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/mini_cms_dev"
```

5. **Set up the database:**
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database with sample data
npx prisma db seed
```

6. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Managing Docker PostgreSQL

```bash
# Start the container
docker start mini-cms-postgres

# Stop the container
docker stop mini-cms-postgres

# View logs
docker logs mini-cms-postgres

# Access PostgreSQL CLI
docker exec -it mini-cms-postgres psql -U postgres -d mini_cms_dev

# Remove container (WARNING: deletes data)
docker rm mini-cms-postgres
```

## Testing ISR (Incremental Static Regeneration)

ISR only works in **production mode**, not development mode:

```bash
# 1. Build for production
npm run build

# Look for this in output:
# ○ / (ISR: 60 Seconds)  ← This means ISR is enabled!

# 2. Start production server
npm start

# 3. Test ISR behavior:
# - Visit http://localhost:3000 (page generated)
# - Refresh immediately (instant load from cache)
# - Add a post in Prisma Studio: npx prisma studio
# - Refresh immediately (still cached, old data)
# - Wait 61+ seconds
# - Refresh again (new post appears! cache regenerated)
```

## Database Schema

### Post Model
- **id**: Unique identifier (CUID)
- **title**: Post title
- **slug**: URL-friendly unique identifier
- **content**: Post content (markdown)
- **excerpt**: Optional short description
- **published**: Publication status (default: false)
- **views**: View count
- **likes**: Like count
- **categoryId**: Optional foreign key to Category
- **createdAt**: Timestamp of creation (TIMESTAMP(6))
- **updatedAt**: Timestamp of last update (TIMESTAMP(6))

### Category Model
- **id**: Unique identifier (CUID)
- **name**: Category name (unique)
- **slug**: URL-friendly unique identifier
- **createdAt**: Timestamp of creation (TIMESTAMP(6))
- **updatedAt**: Timestamp of last update (TIMESTAMP(6))
- **posts**: One-to-many relation to Post model

## Project Structure

```
nextjs-mini-cms-mastery-lab/
├── prisma/
│   ├── schema.prisma              # Database schema (PostgreSQL)
│   ├── seed.ts                    # Database seeding script
│   └── migrations/                # Database migrations
│       └── 20251017073404_init_postgresql/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page (ISR enabled)
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   └── home/
│   │       ├── PageHeader.tsx     # Header component
│   │       ├── PostCard.tsx       # Individual post card
│   │       └── PostList.tsx       # Post grid layout
│   ├── types/
│   │   └── post.ts                # Shared TypeScript types
│   ├── lib/
│   │   └── db.ts                  # Prisma client instance
│   └── generated/
│       └── prisma/                # Generated Prisma Client
├── public/                        # Static assets
├── .env                           # Environment variables (not committed)
├── docker-compose.yml             # Docker configuration (optional)
└── package.json
```

## Implementation Progress

### ✅ Completed Features

#### **Day 1: Project Setup**
- [x] Next.js 15 project initialization
- [x] TypeScript configuration
- [x] Tailwind CSS v4 setup
- [x] Prisma ORM integration
- [x] Database schema design (Post & Category models)
- [x] Git repository initialization

#### **Day 2: Home Feed with ISR**
- [x] **Modular Component Architecture**
  - Created reusable `PageHeader` component
  - Built `PostCard` component with conditional rendering
  - Implemented `PostList` with responsive grid layout
  - Extracted shared TypeScript types
  - Reduced code from 267 to 100 lines through composition

- [x] **Server Components**
  - Async server components for data fetching
  - Direct database access (no API routes needed)
  - Zero client-side JavaScript for rendering

- [x] **ISR (Incremental Static Regeneration)**
  - Configured 60-second revalidation period
  - Stale-while-revalidate pattern
  - Production build with cache optimization

- [x] **PostgreSQL Migration**
  - Migrated from SQLite to PostgreSQL
  - Docker containerization for local development
  - Production-ready database setup
  - Added proper timestamp precision with `@db.Timestamp(6)`
  - Created indexes for query performance

### 🚧 In Progress / Planned Features

- [ ] **App Router** - File-based routing system
- [ ] **Client Components** - Interactive client-side components
- [ ] **Server Actions** - Server-side data mutations
- [ ] **Dynamic Routes** - Individual post pages `/posts/[slug]`
- [ ] **Route Handlers** - API routes in App Router
- [ ] **Loading UI** - Loading states and Suspense
- [ ] **Error Handling** - Error boundaries
- [ ] **Metadata API** - SEO and metadata management
- [ ] **Middleware** - Request/response manipulation
- [ ] **Image Optimization** - next/image component
- [ ] **Font Optimization** - next/font
- [ ] **Pagination** - URL-based pagination with searchParams
- [ ] **Dark Mode** - Theme toggle with system preference detection

## Next.js Features Implemented

### ✅ Server Components (RSC)
**File:** `src/app/page.tsx`, all components in `src/components/home/`

**What we learned:**
- Async components that run only on the server
- Direct database access without API routes
- Zero client-side JavaScript for these components
- Better performance and security

**Key concept:**
```tsx
export default async function Home() {
  const posts = await db.post.findMany({ /* query */ });
  return <PostList posts={posts} />;
}
```

### ✅ ISR (Incremental Static Regeneration)
**File:** `src/app/page.tsx`

**Configuration:**
```tsx
export const revalidate = 60; // Regenerate every 60 seconds
```

**What we learned:**
- Difference between SSR, SSG, ISR, and CSR
- Stale-while-revalidate pattern
- Next.js 15 caching behavior changes
- How to test ISR in production mode

**Benefits:**
- Fast page loads (cached)
- Always fresh content (automatic regeneration)
- Reduced database load

### ✅ Component Composition
**Files:** `src/components/home/*`

**What we learned:**
- Smart vs Dumb components pattern
- Props and TypeScript type safety
- Reusable component architecture
- Single Responsibility Principle

**Architecture:**
```
page.tsx (Smart)
├─> PageHeader (Dumb)
└─> PostList (Dumb)
    └─> PostCard (Dumb)
```

### ✅ Data Fetching with Prisma
**File:** `src/app/page.tsx`

**What we learned:**
- Direct database queries in Server Components
- Prisma Client type safety
- Eager loading with `include`
- Query optimization with indexes

**Example:**
```tsx
const posts = await db.post.findMany({
  where: { published: true },
  include: { category: true },  // Eager load
  orderBy: { createdAt: 'desc' },
  take: 10,
});
```

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production (test ISR)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Prisma Commands

- `npx prisma studio` - Open Prisma Studio (database GUI at http://localhost:5555)
- `npx prisma generate` - Generate Prisma Client
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma db seed` - Seed the database with sample data
- `npx prisma db push` - Push schema changes without migrations

### Docker Commands

```bash
# Start PostgreSQL
docker start mini-cms-postgres

# Stop PostgreSQL
docker stop mini-cms-postgres

# View all containers
docker ps -a

# View logs
docker logs mini-cms-postgres

# Remove container
docker stop mini-cms-postgres
docker rm mini-cms-postgres
```

## Learning Goals

This project aims to master the following Next.js concepts:

1. ✅ **App Router Architecture** - File-based routing with app directory
2. ✅ **Server vs Client Components** - Understanding when to use each
3. ✅ **Data Fetching Patterns** - SSR, SSG, ISR implementation
4. ✅ **Database Integration** - Prisma ORM with PostgreSQL
5. ✅ **TypeScript Integration** - Type-safe full-stack development
6. ✅ **Component Composition** - Building reusable, modular components
7. 🚧 **Server Actions** - Modern form handling and data mutations
8. 🚧 **Performance Optimization** - Image, font, and code optimization
9. 🚧 **SEO Best Practices** - Metadata and structured data
10. 🚧 **Error Handling** - Graceful error management
11. 🚧 **Deployment** - Production deployment on Vercel

## Key Concepts Learned

### 1. Modular Architecture
- Separation of concerns (Smart vs Dumb components)
- Component reusability
- Props and type safety
- Single Responsibility Principle

### 2. Server Components
- Async components
- Direct database access
- Zero bundle impact
- Security benefits

### 3. ISR (Incremental Static Regeneration)
- Stale-while-revalidate pattern
- Cache configuration
- Production vs development behavior
- Performance benefits

### 4. PostgreSQL with Docker
- Containerized database
- Connection strings
- Migration management
- Data persistence

### 5. TypeScript Best Practices
- Shared type definitions
- Union types (`string | null`)
- Type-safe props
- Compile-time error checking

## Deployment (Coming Soon)

### Prerequisites for Production
- ✅ PostgreSQL database (completed)
- ✅ ISR configuration (completed)
- ✅ Production build working (completed)
- 🚧 Vercel account setup
- 🚧 Vercel Postgres database
- 🚧 Environment variables configuration

### Deployment Steps
1. Create Vercel account
2. Connect GitHub repository
3. Add Vercel Postgres database
4. Configure environment variables
5. Deploy application
6. Test ISR in production

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Troubleshooting

### PostgreSQL Connection Issues
```bash
# Check if container is running
docker ps

# Start container if stopped
docker start mini-cms-postgres

# Check logs for errors
docker logs mini-cms-postgres

# Restart container
docker restart mini-cms-postgres
```

### Prisma Issues
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Check database connection
npx prisma db pull
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma Client
npx prisma generate
```

## License

This is a learning project and is available for educational purposes.

---

**Built with Next.js 15** - Focusing on mastering modern React and full-stack development patterns through hands-on implementation.

**Repository:** [https://github.com/Outhman790/nextjs-mini-cms-mastery-lab](https://github.com/Outhman790/nextjs-mini-cms-mastery-lab)
