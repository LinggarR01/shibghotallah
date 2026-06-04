import { db } from '@/lib/db';
import { posts, categories } from '@/drizzle/schema';
import { and, desc, eq } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  status: 'draft' | 'published' | 'archived';
  categoryName: string | null;
  createdAt: string | null;
  publishedAt: string | null;
};

export async function getAllPosts(limit = 10): Promise<Article[]> {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      image: posts.image,
      status: posts.status,
      categoryName: categories.name,
      createdAt: posts.createdAt,
      publishedAt: posts.publishedAt,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.status, 'published'))
    .orderBy(desc(posts.publishedAt), desc(posts.id))
    .limit(limit);

  return result.map((post) => ({
    ...post,
    createdAt: post.createdAt ? post.createdAt.toISOString() : null,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
  }));
}

export async function getPostBySlug(slug: string): Promise<Article | null> {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts');
  cacheTag(`post-${slug}`);

  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      image: posts.image,
      status: posts.status,
      categoryName: categories.name,
      createdAt: posts.createdAt,
      publishedAt: posts.publishedAt,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(and(eq(posts.slug, slug), eq(posts.status, 'published')))
    .limit(1);

  const post = result[0];

  if (!post) return null;

  return {
    ...post,
    createdAt: post.createdAt ? post.createdAt.toISOString() : null,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
  };
}

export async function getPublishedPostSlugs(): Promise<{ slug: string }[]> {
  'use cache';

  const result = await db
    .select({
      slug: posts.slug,
    })
    .from(posts)
    .where(eq(posts.status, 'published'));

  return result;
}
