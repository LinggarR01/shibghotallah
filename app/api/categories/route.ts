import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { categories } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const handleError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : 'Terjadi kesalahan pada server';

  return NextResponse.json({ error: message }, { status: 500 });
};

const getCategoryById = async (id: number) => {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  return result[0] ?? null;
};

// GET: Mengambil semua kategori
export async function GET() {
  try {
    const allCategories = await db.select().from(categories);

    return NextResponse.json(allCategories);
  } catch (error) {
    return handleError(error);
  }
}

// POST: Membuat kategori baru
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

    const newCategory = await getCategoryById(insertedId);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// PUT: Mengupdate kategori
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

    const existingCategory = await getCategoryById(categoryId);

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 },
      );
    }

    await db
      .update(categories)
      .set(updates)
      .where(eq(categories.id, categoryId));

    const updatedCategory = await getCategoryById(categoryId);

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return handleError(error);
  }
}

// DELETE: Menghapus kategori
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

    const existingCategory = await getCategoryById(categoryId);

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 },
      );
    }

    await db.delete(categories).where(eq(categories.id, categoryId));

    return NextResponse.json(existingCategory);
  } catch (error) {
    return handleError(error);
  }
}
