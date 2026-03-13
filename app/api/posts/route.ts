import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const handleError = (error: any) => {
  return NextResponse.json({ error: error.message }, { status: 500 });
};

// Mengambil semua kategori
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

    // Jika tidak ada parameter slug, kembalikan SEMUA data
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

    const newPost = await db.insert(posts).values(body).returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// Mengupdate post
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    const updatedPost = await db
      .update(posts)
      .set(updates)
      .where(eq(posts.id, id))
      .returning();

    if (updatedPost.length === 0) {
      return NextResponse.json(
        { error: 'Post tidak ditemukan' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedPost[0]);
  } catch (error) {
    return handleError(error);
  }
}

// Menghapus post
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const deletedPost = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    if (deletedPost.length === 0) {
      return NextResponse.json(
        { error: 'Post tidak ditemukan' },
        { status: 404 },
      );
    }

    return NextResponse.json(deletedPost[0]);
  } catch (error) {
    return handleError(error);
  }
}
