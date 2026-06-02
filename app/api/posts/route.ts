import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts, categories } from '@/drizzle/schema';
import { and, desc, eq } from 'drizzle-orm';

const handleError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : 'Terjadi kesalahan server';

  return NextResponse.json({ error: message }, { status: 500 });
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const slug = searchParams.get('slug');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Number(limitParam) : 10;

    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

    if (slug) {
      const singlePost = await db
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

      if (singlePost.length === 0) {
        return NextResponse.json(
          { error: 'Post tidak ditemukan' },
          { status: 404 },
        );
      }

      return NextResponse.json(singlePost[0], {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    const allPosts = await db
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
      .limit(safeLimit);

    return NextResponse.json(allPosts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
