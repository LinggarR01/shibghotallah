import { NextResponse } from 'next/server';
import { getAllPosts, getPostBySlug } from '@/drizzle/actions/posts';

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
      const singlePost = await getPostBySlug(slug);

      if (!singlePost) {
        return NextResponse.json(
          { error: 'Post tidak ditemukan' },
          { status: 404 },
        );
      }

      return NextResponse.json(singlePost, {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    const allPosts = await getAllPosts(Math.min(safeLimit, 24));

    return NextResponse.json(allPosts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
