import { NextResponse } from 'next/server';
import { getPublicCategories } from '@/lib/cms-data';

const handleError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : 'Terjadi kesalahan pada server';

  return NextResponse.json({ error: message }, { status: 500 });
};

// GET public: Mengambil semua kategori
export async function GET() {
  try {
    const allCategories = await getPublicCategories();

    return NextResponse.json(allCategories, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
