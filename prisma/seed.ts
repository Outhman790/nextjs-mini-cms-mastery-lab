import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const tech = await prisma.category.create({
    data: {
      name: 'Technology',
      slug: 'technology',
    },
  });

  const lifestyle = await prisma.category.create({
    data: {
      name: 'Lifestyle',
      slug: 'lifestyle',
    },
  });

  const tutorial = await prisma.category.create({
    data: {
      name: 'Tutorial',
      slug: 'tutorial',
    },
  });

  console.log('✓ Created categories');

  // Create posts
  const posts = [
    {
      title: 'Getting Started with Next.js 15',
      slug: 'getting-started-nextjs-15',
      excerpt: 'Learn the fundamentals of Next.js 15 and its powerful App Router.',
      content: `# Getting Started with Next.js 15

Next.js 15 introduces several exciting features that make building modern web applications even easier.

## What's New

- **Improved App Router**: Better performance and developer experience
- **Server Actions**: Simplified data mutations
- **Streaming**: Progressive rendering for better UX

## Getting Started

First, create a new Next.js app:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will set up a new project with all the latest features enabled.

## Conclusion

Next.js 15 is a powerful framework that makes React development a joy!`,
      published: true,
      categoryId: tech.id,
      views: 150,
      likes: 23,
    },
    {
      title: 'Understanding Server Components',
      slug: 'understanding-server-components',
      excerpt: 'Deep dive into React Server Components and how they work in Next.js.',
      content: `# Understanding Server Components

React Server Components are a game-changer for web development.

## What Are They?

Server Components run on the server and send rendered output to the client.

### Benefits

1. **Zero Bundle Size**: Components don't ship to the browser
2. **Direct Backend Access**: Query databases directly
3. **Better Performance**: Faster initial page loads

## Example

\`\`\`tsx
async function BlogPost({ id }: { id: string }) {
  const post = await db.post.findUnique({ where: { id } });
  return <article>{post.content}</article>;
}
\`\`\`

Server Components are the future!`,
      published: true,
      categoryId: tech.id,
      views: 89,
      likes: 12,
    },
    {
      title: 'Building a CMS with Next.js',
      slug: 'building-cms-nextjs',
      excerpt: 'Step-by-step guide to creating your own content management system.',
      content: `# Building a CMS with Next.js

Let's build a simple but powerful CMS using Next.js and Prisma.

## Prerequisites

- Node.js 18+
- Basic React knowledge
- Understanding of databases

## Setup

First, we'll need to set up our database schema...

## Features

- Create, edit, and delete posts
- Category management
- Rich text editing
- Image uploads

This tutorial will cover all the essentials!`,
      published: true,
      categoryId: tutorial.id,
      views: 234,
      likes: 45,
    },
    {
      title: 'The Art of Minimalist Living',
      slug: 'art-minimalist-living',
      excerpt: 'Discover how less can truly be more in your daily life.',
      content: `# The Art of Minimalist Living

Minimalism isn't about having nothing—it's about having just what you need.

## Why Minimalism?

- Less stress
- More focus
- Financial freedom
- Environmental benefits

## Getting Started

1. Start small: Pick one area of your life
2. Declutter mindfully
3. Be intentional with new purchases
4. Focus on experiences over things

Remember, minimalism looks different for everyone!`,
      published: true,
      categoryId: lifestyle.id,
      views: 312,
      likes: 67,
    },
    {
      title: 'Advanced TypeScript Patterns',
      slug: 'advanced-typescript-patterns',
      excerpt: 'Level up your TypeScript skills with these advanced patterns.',
      content: `# Advanced TypeScript Patterns

TypeScript's type system is incredibly powerful. Let's explore some advanced patterns.

## Conditional Types

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`

## Mapped Types

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`

These patterns will make your code more type-safe and maintainable!`,
      published: true,
      categoryId: tutorial.id,
      views: 178,
      likes: 34,
    },
    {
      title: 'Work-Life Balance in Tech',
      slug: 'work-life-balance-tech',
      excerpt: 'Tips for maintaining healthy boundaries in the tech industry.',
      content: `# Work-Life Balance in Tech

The tech industry can be demanding. Here's how to maintain balance.

## Set Boundaries

- Define clear work hours
- Turn off notifications after hours
- Take regular breaks

## Self-Care

- Exercise regularly
- Prioritize sleep
- Make time for hobbies

Your health is more important than any deadline!`,
      published: true,
      categoryId: lifestyle.id,
      views: 145,
      likes: 28,
    },
    {
      title: 'Mastering CSS Grid Layout',
      slug: 'mastering-css-grid-layout',
      excerpt: 'Complete guide to building complex layouts with CSS Grid.',
      content: `# Mastering CSS Grid Layout

CSS Grid is a powerful tool for creating two-dimensional layouts.

## Basic Concepts

- Grid Container and Grid Items
- Rows and Columns
- Grid Lines and Gaps

## Example

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

Grid makes complex layouts simple!`,
      published: true,
      categoryId: tutorial.id,
      views: 298,
      likes: 52,
    },
    {
      title: 'Introduction to Docker Containers',
      slug: 'introduction-docker-containers',
      excerpt: 'Learn how Docker can simplify your development workflow.',
      content: `# Introduction to Docker Containers

Docker revolutionizes how we build and deploy applications.

## What is Docker?

Docker packages applications and dependencies into containers.

## Benefits

- Consistency across environments
- Easy deployment
- Isolation and security
- Resource efficiency

## Getting Started

\`\`\`bash
docker run -d -p 5432:5432 postgres:16
\`\`\`

Containerize everything!`,
      published: true,
      categoryId: tech.id,
      views: 267,
      likes: 41,
    },
    {
      title: 'Healthy Cooking on a Budget',
      slug: 'healthy-cooking-budget',
      excerpt: 'Nutritious meal ideas that won\'t break the bank.',
      content: `# Healthy Cooking on a Budget

Eating well doesn't have to be expensive.

## Smart Shopping

- Buy seasonal produce
- Plan your meals
- Cook in batches
- Use whole ingredients

## Budget-Friendly Recipes

1. Bean and vegetable stir-fry
2. Overnight oats
3. Lentil soup
4. Veggie pasta

Healthy eating made affordable!`,
      published: true,
      categoryId: lifestyle.id,
      views: 423,
      likes: 89,
    },
    {
      title: 'React Hooks Best Practices',
      slug: 'react-hooks-best-practices',
      excerpt: 'Essential patterns for writing clean React code with Hooks.',
      content: `# React Hooks Best Practices

Hooks transformed how we write React components.

## Essential Hooks

- useState for state management
- useEffect for side effects
- useContext for shared state
- useMemo for optimization

## Common Pitfalls

- Missing dependencies in useEffect
- Overusing useState
- Not cleaning up effects

## Example

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

Write better React code!`,
      published: true,
      categoryId: tutorial.id,
      views: 334,
      likes: 67,
    },
    {
      title: 'Database Optimization Techniques',
      slug: 'database-optimization-techniques',
      excerpt: 'Speed up your database queries with these proven strategies.',
      content: `# Database Optimization Techniques

A slow database can cripple your application.

## Indexing

Create indexes on frequently queried columns.

## Query Optimization

- Use EXPLAIN to analyze queries
- Avoid SELECT *
- Limit result sets

## Connection Pooling

Reuse database connections for better performance.

## Caching

Cache frequently accessed data.

Fast queries, happy users!`,
      published: true,
      categoryId: tech.id,
      views: 189,
      likes: 36,
    },
    {
      title: 'Morning Routines of Successful People',
      slug: 'morning-routines-successful-people',
      excerpt: 'Start your day right with these proven morning habits.',
      content: `# Morning Routines of Successful People

How you start your day sets the tone for everything.

## Common Habits

- Wake up early (5-6 AM)
- Exercise or stretch
- Meditate or journal
- Eat a healthy breakfast
- Plan your day

## The Science

Morning routines reduce decision fatigue and boost productivity.

## Creating Your Routine

Start small and be consistent.

Transform your mornings, transform your life!`,
      published: true,
      categoryId: lifestyle.id,
      views: 512,
      likes: 102,
    },
    {
      title: 'API Design Best Practices',
      slug: 'api-design-best-practices',
      excerpt: 'Build RESTful APIs that developers will love to use.',
      content: `# API Design Best Practices

Good API design is crucial for developer experience.

## REST Principles

- Use HTTP methods correctly
- Meaningful endpoint names
- Consistent naming conventions
- Proper status codes

## Versioning

Always version your APIs: /api/v1/users

## Documentation

Great docs make great APIs.

## Example

\`\`\`
GET /api/v1/posts
POST /api/v1/posts
PUT /api/v1/posts/:id
\`\`\`

Design APIs developers love!`,
      published: true,
      categoryId: tutorial.id,
      views: 276,
      likes: 48,
    },
    {
      title: 'Understanding JavaScript Closures',
      slug: 'understanding-javascript-closures',
      excerpt: 'Master one of JavaScript\'s most powerful features.',
      content: `# Understanding JavaScript Closures

Closures are fundamental to JavaScript mastery.

## What is a Closure?

A closure gives you access to an outer function's scope from an inner function.

## Example

\`\`\`javascript
function outer() {
  const message = 'Hello';
  function inner() {
    console.log(message); // Closure!
  }
  return inner;
}
\`\`\`

## Use Cases

- Data privacy
- Event handlers
- Callbacks
- Function factories

Closures unlock JavaScript's power!`,
      published: true,
      categoryId: tech.id,
      views: 401,
      likes: 73,
    },
    {
      title: 'Digital Detox: Reclaim Your Time',
      slug: 'digital-detox-reclaim-time',
      excerpt: 'Strategies to reduce screen time and improve mental health.',
      content: `# Digital Detox: Reclaim Your Time

Constant connectivity can be exhausting.

## Signs You Need a Detox

- Checking phone first thing in morning
- Anxiety without device
- Decreased focus
- Poor sleep quality

## Detox Strategies

- Set phone-free hours
- Remove social media apps
- Use grayscale mode
- Create device-free zones

## Benefits

Better sleep, improved focus, deeper relationships.

Disconnect to reconnect!`,
      published: true,
      categoryId: lifestyle.id,
      views: 387,
      likes: 94,
    },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log(`✓ Created ${posts.length} posts`);
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
