import { db } from '../src/lib/db';

async function testDatabase() {
  try {
    console.log('Testing database connection...\n');

    // Count categories
    const categoryCount = await db.category.count();
    console.log(`✓ Categories: ${categoryCount}`);

    // Count posts
    const postCount = await db.post.count();
    console.log(`✓ Posts: ${postCount}`);

    // Count published posts
    const publishedCount = await db.post.count({
      where: { published: true },
    });
    console.log(`✓ Published posts: ${publishedCount}`);

    // Fetch a sample post with category
    const samplePost = await db.post.findFirst({
      include: { category: true },
    });

    if (samplePost) {
      console.log('\n✓ Sample post retrieved:');
      console.log(`  - Title: ${samplePost.title}`);
      console.log(`  - Slug: ${samplePost.slug}`);
      console.log(`  - Category: ${samplePost.category?.name || 'None'}`);
      console.log(`  - Published: ${samplePost.published}`);
      console.log(`  - Views: ${samplePost.views}`);
      console.log(`  - Likes: ${samplePost.likes}`);
    }

    console.log('\n✅ Database connection successful!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

testDatabase();
