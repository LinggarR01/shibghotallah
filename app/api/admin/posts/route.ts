import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { posts } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { canManagePost, getSession } from '@/lib/auth';
import {
  getPostsList,
  isPostSlugTaken,
  parsePostStatus,
} from '@/lib/cms-data';
import {
  deleteUploadedPostImage,
  savePostImageFromFormData,
} from '@/lib/post-image-upload';
import { slugify } from '@/lib/utils';

const REQUIRED_FIELDS_ERROR = 'Mohon lengkapi data yang wajib diisi.';
const DUPLICATE_SLUG_ERROR = 'Slug sudah digunakan. Silakan gunakan slug lain.';
const PERMISSION_ERROR = 'Anda tidak memiliki izin untuk melakukan aksi ini.';

function unauthorized() {
  return NextResponse.json({ error: 'Sesi login diperlukan.' }, { status: 401 });
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

function readNullableNumber(value: unknown) {
  const number = Number(value);

  return Number.isInteger(number) && number > 0 ? number : null;
}

function readNullableDate(value: unknown) {
  const text = readString(value);
  const date = text ? new Date(text) : null;

  return date && !Number.isNaN(date.getTime()) ? date : null;
}

function readBodyValue(body: Record<string, unknown> | FormData, key: string) {
  return body instanceof FormData ? body.get(key) : body[key];
}

function parseBody(body: Record<string, unknown> | FormData) {
  const title = readString(readBodyValue(body, 'title'));
  const slug = slugify(readString(readBodyValue(body, 'slug')) || title);
  const content = readString(readBodyValue(body, 'content'));
  const status = parsePostStatus(readString(readBodyValue(body, 'status')));

  if (!title || !slug || !content) {
    return { error: REQUIRED_FIELDS_ERROR } as const;
  }
  if (!status) return { error: 'Status artikel tidak valid.' } as const;

  let publishedAt = readNullableDate(readBodyValue(body, 'publishedAt'));

  if (status === 'published' && !publishedAt) {
    publishedAt = new Date();
  }

  return {
    values: {
      title,
      slug,
      excerpt: readNullableString(readBodyValue(body, 'excerpt')),
      content,
      image: readNullableString(readBodyValue(body, 'image')),
      status,
      categoryId: readNullableNumber(readBodyValue(body, 'categoryId')),
      publishedAt,
    },
  } as const;
}

async function readPostRequest(req: Request) {
  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    return req.formData();
  }

  return (await req.json()) as Record<string, unknown>;
}

export async function GET(req: Request) {
  const session = await getSession();

  if (!session) return unauthorized();

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') ?? 1);
  const categoryId = Number(searchParams.get('categoryId'));
  const result = await getPostsList({
    user: session.user,
    search: searchParams.get('q') ?? '',
    status: parsePostStatus(searchParams.get('status')),
    categoryId:
      Number.isInteger(categoryId) && categoryId > 0 ? categoryId : null,
    page: Number.isInteger(page) && page > 0 ? page : 1,
  });

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const session = await getSession();

  if (!session) return unauthorized();

  try {
    const body = await readPostRequest(req);
    const parsed = parseBody(body);

    if ('error' in parsed) {
      return badRequest(parsed.error ?? 'Input artikel tidak valid.');
    }

    if (await isPostSlugTaken(parsed.values.slug)) {
      return badRequest(DUPLICATE_SLUG_ERROR);
    }

    const upload =
      body instanceof FormData
        ? await savePostImageFromFormData(body, parsed.values.slug)
        : { imagePath: null, error: null };

    if (upload.error) {
      return badRequest(upload.error);
    }

    let result: { id: number }[] = [];

    try {
      result = await db
        .insert(posts)
        .values({
          ...parsed.values,
          image: upload.imagePath ?? parsed.values.image,
          userId: session.user.id,
        })
        .$returningId();
    } catch {
      await deleteUploadedPostImage(upload.imagePath).catch(() => undefined);

      throw new Error('insert_failed');
    }

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

  try {
    const body = await readPostRequest(req);
    const id = Number(readBodyValue(body, 'id'));

    if (!Number.isInteger(id) || id <= 0) {
      return badRequest('ID artikel tidak valid.');
    }

    const [existingPost] = await db
      .select({
        id: posts.id,
        userId: posts.userId,
        image: posts.image,
        publishedAt: posts.publishedAt,
      })
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan.' },
        { status: 404 },
      );
    }

    if (!canManagePost(session.user, existingPost.userId)) {
      return NextResponse.json({ error: PERMISSION_ERROR }, { status: 403 });
    }

    const parsed = parseBody(body);

    if ('error' in parsed) {
      return badRequest(parsed.error ?? 'Input artikel tidak valid.');
    }

    if (await isPostSlugTaken(parsed.values.slug, id)) {
      return badRequest(DUPLICATE_SLUG_ERROR);
    }

    const upload =
      body instanceof FormData
        ? await savePostImageFromFormData(body, parsed.values.slug)
        : { imagePath: null, error: null };

    if (upload.error) {
      return badRequest(upload.error);
    }

    try {
      await db
        .update(posts)
        .set({
          ...parsed.values,
          image:
            upload.imagePath ??
            (body instanceof FormData ? existingPost.image : parsed.values.image),
        })
        .where(eq(posts.id, id));
    } catch {
      await deleteUploadedPostImage(upload.imagePath).catch(() => undefined);

      throw new Error('update_failed');
    }

    if (upload.imagePath && upload.imagePath !== existingPost.image) {
      await deleteUploadedPostImage(existingPost.image).catch(() => undefined);
    }

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

  try {
    const { id } = (await req.json()) as { id?: unknown };
    const postId = Number(id);

    if (!Number.isInteger(postId) || postId <= 0) {
      return badRequest('ID artikel tidak valid.');
    }

    const [existingPost] = await db
      .select({
        id: posts.id,
        userId: posts.userId,
      })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan.' },
        { status: 404 },
      );
    }

    if (!canManagePost(session.user, existingPost.userId)) {
      return NextResponse.json({ error: PERMISSION_ERROR }, { status: 403 });
    }

    await db.delete(posts).where(eq(posts.id, postId));

    return NextResponse.json({ success: true, id: postId });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server.' },
      { status: 500 },
    );
  }
}
