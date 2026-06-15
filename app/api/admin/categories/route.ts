import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { categories } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { canManageAllPosts, getSession } from '@/lib/auth';
import {
  getCategoriesWithCounts,
  isCategorySlugTaken,
} from '@/lib/cms-data';
import { slugify } from '@/lib/utils';

const REQUIRED_FIELDS_ERROR = 'Mohon lengkapi data yang wajib diisi.';
const DUPLICATE_SLUG_ERROR = 'Slug sudah digunakan. Silakan gunakan slug lain.';
const PERMISSION_ERROR = 'Anda tidak memiliki izin untuk melakukan aksi ini.';

function unauthorized() {
  return NextResponse.json({ error: 'Sesi login diperlukan.' }, { status: 401 });
}

function forbidden() {
  return NextResponse.json({ error: PERMISSION_ERROR }, { status: 403 });
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function readNullableString(value: unknown) {
  const text = readString(value);

  return text ? text : null;
}

function parseBody(body: Record<string, unknown>) {
  const name = readString(body.name);
  const slug = slugify(readString(body.slug) || name).slice(0, 100);

  if (!name || !slug) return { error: REQUIRED_FIELDS_ERROR } as const;

  return {
    values: {
      name,
      slug,
      description: readNullableString(body.description),
    },
  } as const;
}

export async function GET(req: Request) {
  const session = await getSession();

  if (!session) return unauthorized();

  const { searchParams } = new URL(req.url);
  const result = await getCategoriesWithCounts(searchParams.get('q') ?? '');

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const session = await getSession();

  if (!session) return unauthorized();
  if (!canManageAllPosts(session.user.role)) return forbidden();

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const parsed = parseBody(body);

    if ('error' in parsed) {
      return badRequest(parsed.error ?? 'Input kategori tidak valid.');
    }

    if (await isCategorySlugTaken(parsed.values.slug)) {
      return badRequest(DUPLICATE_SLUG_ERROR);
    }

    const result = await db
      .insert(categories)
      .values(parsed.values)
      .$returningId();

    return NextResponse.json({ id: result[0]?.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server.' },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  const session = await getSession();

  if (!session) return unauthorized();
  if (!canManageAllPosts(session.user.role)) return forbidden();

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const id = Number(body.id);

    if (!Number.isInteger(id) || id <= 0) {
      return badRequest('ID kategori tidak valid.');
    }

    const parsed = parseBody(body);

    if ('error' in parsed) {
      return badRequest(parsed.error ?? 'Input kategori tidak valid.');
    }

    if (await isCategorySlugTaken(parsed.values.slug, id)) {
      return badRequest(DUPLICATE_SLUG_ERROR);
    }

    const [existingCategory] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan.' },
        { status: 404 },
      );
    }

    await db
      .update(categories)
      .set(parsed.values)
      .where(eq(categories.id, id));

    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server.' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();

  if (!session) return unauthorized();
  if (!canManageAllPosts(session.user.role)) return forbidden();

  try {
    const { id } = (await req.json()) as { id?: unknown };
    const categoryId = Number(id);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return badRequest('ID kategori tidak valid.');
    }

    const [existingCategory] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, categoryId))
      .limit(1);

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan.' },
        { status: 404 },
      );
    }

    await db.delete(categories).where(eq(categories.id, categoryId));

    return NextResponse.json({ success: true, id: categoryId });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server.' },
      { status: 500 },
    );
  }
}
