import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const handleError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : 'Terjadi kesalahan server';
  return NextResponse.json({ error: message }, { status: 500 });
};

const getPostById = async (id: number) => {
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return result[0];
};

// Mengambil semua post atau satu post berdasarkan slug
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const singlePost = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);

      if (singlePost.length === 0) {
        return NextResponse.json(
          { error: 'Post tidak ditemukan' },
          { status: 404 },
        );
      }

      return NextResponse.json(singlePost[0]);
    }

    const allPosts = await db.select().from(posts);
    return NextResponse.json(allPosts);
  } catch (error) {
    return handleError(error);
  }
}

// Membuat post baru
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await db.insert(posts).values(body).$returningId();
    const insertedId = result[0]?.id;

    if (!insertedId) {
      return NextResponse.json({ error: 'Post gagal dibuat' }, { status: 500 });
    }

    const newPost = await getPostById(insertedId);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// Mengupdate post
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    const postId = Number(id);

    if (!postId) {
      return NextResponse.json(
        { error: 'ID post wajib diisi' },
        { status: 400 },
      );
    }

    const existingPost = await getPostById(postId);

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post tidak ditemukan' },
        { status: 404 },
      );
    }

    await db.update(posts).set(updates).where(eq(posts.id, postId));

    const updatedPost = await getPostById(postId);
    return NextResponse.json(updatedPost);
  } catch (error) {
    return handleError(error);
  }
}

// Menghapus post
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const postId = Number(id);

    if (!postId) {
      return NextResponse.json(
        { error: 'ID post wajib diisi' },
        { status: 400 },
      );
    }

    const existingPost = await getPostById(postId);

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post tidak ditemukan' },
        { status: 404 },
      );
    }

    await db.delete(posts).where(eq(posts.id, postId));

    return NextResponse.json(existingPost);
  } catch (error) {
    return handleError(error);
  }
}
