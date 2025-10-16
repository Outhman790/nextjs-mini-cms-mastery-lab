# Next.js Mini CMS Mastery Lab

Learning Next.js 15 by building a full-stack mini CMS with TypeScript, Prisma, and Tailwind CSS. Exploring all modern Next.js features through practical implementation.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Prisma ORM** - Database toolkit and query builder
- **SQLite** - Lightweight database for development
- **Tailwind CSS v4** - Utility-first CSS framework
- **React 19** - Latest React features

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs-mini-cms-mastery-lab.git
cd nextjs-mini-cms-mastery-lab
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up the database:
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

4. Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

### Post Model
- **id**: Unique identifier (CUID)
- **title**: Post title
- **slug**: URL-friendly unique identifier
- **content**: Post content
- **excerpt**: Optional short description
- **published**: Publication status (default: false)
- **views**: View count
- **likes**: Like count
- **categoryId**: Optional foreign key to Category
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update

### Category Model
- **id**: Unique identifier (CUID)
- **name**: Category name (unique)
- **slug**: URL-friendly unique identifier
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update
- **posts**: Relation to Post model

## Project Structure

```
nextjs-mini-cms-mastery-lab/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding script
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── lib/
│   │   └── db.ts           # Prisma client instance
│   └── generated/
│       └── prisma/         # Generated Prisma Client
├── public/                 # Static assets
└── package.json
```

## Next.js Features (To Be Documented)

This section will be updated throughout the project to document each Next.js feature and its implementation:

- [ ] **App Router** - File-based routing system
- [ ] **Server Components** - React Server Components
- [ ] **Client Components** - Interactive client-side components
- [ ] **Server Actions** - Server-side data mutations
- [ ] **Data Fetching** - Various fetching strategies (SSR, SSG, ISR)
- [ ] **Caching** - Request memoization, Data Cache, Full Route Cache, and Router Cache
- [ ] **Dynamic Routes** - Dynamic route segments
- [ ] **Route Handlers** - API routes in App Router
- [ ] **Layouts & Templates** - Shared UI patterns
- [ ] **Loading UI** - Loading states and Suspense
- [ ] **Error Handling** - Error boundaries
- [ ] **Metadata API** - SEO and metadata management
- [ ] **Middleware** - Request/response manipulation
- [ ] **Image Optimization** - next/image component
- [ ] **Font Optimization** - next/font
- [ ] **Parallel Routes** - Multiple pages in same layout
- [ ] **Intercepting Routes** - Route interception patterns
- [ ] **Route Groups** - Organizing routes without affecting URL

> Detailed explanations and code examples for each feature will be added as they are implemented in the project.

## Learning Goals

This project aims to master the following Next.js concepts:

1. **App Router Architecture** - Understanding the new routing paradigm
2. **Server vs Client Components** - When and how to use each
3. **Data Fetching Patterns** - SSR, SSG, ISR, and streaming
4. **Server Actions** - Modern form handling and data mutations
5. **Database Integration** - Using Prisma with Next.js
6. **TypeScript Integration** - Type-safe full-stack development
7. **Performance Optimization** - Image, font, and code optimization
8. **SEO Best Practices** - Metadata and structured data
9. **Error Handling** - Graceful error management
10. **Deployment** - Production-ready Next.js applications

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Prisma Commands

- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma generate` - Generate Prisma Client
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma db seed` - Seed the database
- `npx prisma db push` - Push schema changes without migrations

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

This is a learning project and is available for educational purposes.

---

Built with Next.js 15, focusing on mastering modern React and full-stack development patterns.
