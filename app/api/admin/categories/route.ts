import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { categories } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const handleError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : 'Terjadi kesalahan pada server';

  return NextResponse.json({ error: message }, { status: 500 });
};

// POST admin: Membuat kategori baru
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await db.insert(categories).values(body).$returningId();
    const insertedId = result[0]?.id;

    if (!insertedId) {
      return NextResponse.json(
        { error: 'Gagal membuat kategori' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        id: insertedId,
        ...body,
      },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
}

// PUT admin: Mengupdate kategori
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    const categoryId = Number(id);

    if (!categoryId) {
      return NextResponse.json(
        { error: 'ID kategori tidak valid' },
        { status: 400 },
      );
    }

    await db
      .update(categories)
      .set(updates)
      .where(eq(categories.id, categoryId));

    return NextResponse.json({
      id: categoryId,
      ...updates,
    });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE admin: Menghapus kategori
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const categoryId = Number(id);

    if (!categoryId) {
      return NextResponse.json(
        { error: 'ID kategori tidak valid' },
        { status: 400 },
      );
    }

    await db.delete(categories).where(eq(categories.id, categoryId));

    return NextResponse.json({
      success: true,
      id: categoryId,
    });
  } catch (error) {
    return handleError(error);
  }
}
