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
      published: false, // This one is a draft
      categoryId: lifestyle.id,
      views: 0,
      likes: 0,
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
