import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { categories } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

// Helper function untuk menangani error
const handleError = (error: any) => {
  return NextResponse.json({ error: error.message }, { status: 500 });
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

    const newCategory = await db.insert(categories).values(body).returning();

    return NextResponse.json(newCategory[0], { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// PUT: Mengupdate kategori
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    const updatedCategory = await db
      .update(categories)
      .set(updates)
      .where(eq(categories.id, id))
      .returning();

    // Cek jika ID tidak ditemukan
    if (updatedCategory.length === 0) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedCategory[0]);
  } catch (error) {
    return handleError(error);
  }
}

// DELETE: Menghapus kategori
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const deletedCategory = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    // Cek jika ID tidak ditemukan
    if (deletedCategory.length === 0) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 },
      );
    }

    return NextResponse.json(deletedCategory[0]);
  } catch (error) {
    return handleError(error);
  }
}
