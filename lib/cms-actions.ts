'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { categories, posts, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import {
  canManageAllPosts,
  canManagePost,
  clearSession,
  createSession,
  requireSession,
} from '@/lib/auth';
import {
  isCategorySlugTaken,
  isPostSlugTaken,
  parsePostStatus,
} from '@/lib/cms-data';
import {
  deleteUploadedPostImage,
  savePostImageFromFormData,
} from '@/lib/post-image-upload';
import { slugify } from '@/lib/utils';

export type FormState = {
  error?: string;
  success?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED_FIELDS_ERROR = 'Mohon lengkapi data yang wajib diisi.';
const DUPLICATE_SLUG_ERROR = 'Slug sudah digunakan. Silakan gunakan slug lain.';
const PERMISSION_ERROR = 'Anda tidak memiliki izin untuk melakukan aksi ini.';

function revalidatePublicPosts(slug?: string | null) {
  revalidateTag('posts', 'max');
  revalidateTag('categories', 'max');
  revalidatePath('/');
  revalidatePath('/berita');

  if (slug) {
    revalidateTag(`post-${slug}`, 'max');
    revalidatePath(`/berita/${slug}`);
  }
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === 'string' ? value.trim() : '';
}

function getNullableString(formData: FormData, key: string) {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
}

function getNullableNumber(formData: FormData, key: string) {
  const value = getString(formData, key);
  const number = Number(value);

  return Number.isInteger(number) && number > 0 ? number : null;
}

function getNullableDate(formData: FormData, key: string) {
  const value = getString(formData, key);

  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function safeSlug(value: string) {
  return slugify(value).slice(0, 255);
}

export async function loginAction(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = getString(formData, 'email').toLowerCase();
  const password = getString(formData, 'password');

  if (!emailRegex.test(email)) {
    return { error: 'Masukkan email yang valid.' };
  }

  if (!password) {
    return { error: 'Password wajib diisi.' };
  }

  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      password: users.password,
      role: users.role,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return { error: 'Email atau password salah.' };
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return { error: 'Email atau password salah.' };
  }

  await createSession({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  });

  redirect('/dashboard');
}

export async function logoutAction() {
  await clearSession();
  redirect('/login?toast=logout-success');
}

function parsePostForm(formData: FormData) {
  const title = getString(formData, 'title');
  const slug = safeSlug(getString(formData, 'slug') || title);
  const content = getString(formData, 'content');
  const status = parsePostStatus(getString(formData, 'status'));

  if (!title || !slug || !content) {
    return { error: REQUIRED_FIELDS_ERROR } as const;
  }
  if (!status) return { error: 'Status artikel tidak valid.' } as const;

  let publishedAt = getNullableDate(formData, 'publishedAt');

  if (status === 'published' && !publishedAt) {
    publishedAt = new Date();
  }

  return {
    values: {
      title,
      slug,
      excerpt: getNullableString(formData, 'excerpt'),
      content,
      image: getNullableString(formData, 'image'),
      status,
      categoryId: getNullableNumber(formData, 'categoryId'),
      publishedAt: status === 'draft' ? publishedAt : publishedAt,
    },
  } as const;
}

export async function createPostAction(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await requireSession();
  const parsed = parsePostForm(formData);

  if ('error' in parsed) return { error: parsed.error };

  if (await isPostSlugTaken(parsed.values.slug)) {
    return { error: DUPLICATE_SLUG_ERROR };
  }

  const upload = await savePostImageFromFormData(formData, parsed.values.slug);

  if (upload.error) {
    return { error: upload.error };
  }

  let insertedId: number | undefined;

  try {
    const result = await db
      .insert(posts)
      .values({
        ...parsed.values,
        image: upload.imagePath ?? parsed.values.image,
        userId: session.user.id,
      })
      .$returningId();

    insertedId = result[0]?.id;
  } catch {
    await deleteUploadedPostImage(upload.imagePath).catch(() => undefined);

    return { error: 'Gagal menambahkan artikel.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/posts');
  revalidatePublicPosts(parsed.values.status === 'published' ? parsed.values.slug : null);

  if (!insertedId) {
    redirect('/dashboard/posts?toast=article-created');
  }

  redirect(`/dashboard/posts/${insertedId}?toast=article-created`);
}

export async function updatePostAction(
  id: number,
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await requireSession();
  const [existingPost] = await db
    .select({
      id: posts.id,
      userId: posts.userId,
      image: posts.image,
      slug: posts.slug,
      status: posts.status,
      publishedAt: posts.publishedAt,
    })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  if (!existingPost) {
    return { error: 'Artikel tidak ditemukan.' };
  }

  if (!canManagePost(session.user, existingPost.userId)) {
    return { error: PERMISSION_ERROR };
  }

  const parsed = parsePostForm(formData);

  if ('error' in parsed) return { error: parsed.error };

  if (await isPostSlugTaken(parsed.values.slug, id)) {
    return { error: DUPLICATE_SLUG_ERROR };
  }

  const publishedAt =
    parsed.values.status === 'published' && !parsed.values.publishedAt
      ? existingPost.publishedAt ?? new Date()
      : parsed.values.publishedAt;

  const upload = await savePostImageFromFormData(formData, parsed.values.slug);

  if (upload.error) {
    return { error: upload.error };
  }

  try {
    await db
      .update(posts)
      .set({
        ...parsed.values,
        image: upload.imagePath ?? existingPost.image,
        publishedAt,
      })
      .where(eq(posts.id, id));
  } catch {
    await deleteUploadedPostImage(upload.imagePath).catch(() => undefined);

    return { error: 'Gagal memperbarui artikel.' };
  }

  if (upload.imagePath && upload.imagePath !== existingPost.image) {
    await deleteUploadedPostImage(existingPost.image).catch(() => undefined);
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/posts');
  revalidatePath(`/dashboard/posts/${id}`);
  revalidatePublicPosts(
    existingPost.status === 'published' ? existingPost.slug : null,
  );
  revalidatePublicPosts(
    parsed.values.status === 'published' ? parsed.values.slug : null,
  );

  redirect(`/dashboard/posts/${id}?toast=article-updated`);
}

export async function deletePostAction(id: number) {
  const session = await requireSession();
  const [existingPost] = await db
    .select({
      id: posts.id,
      userId: posts.userId,
      slug: posts.slug,
      status: posts.status,
    })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  if (!existingPost) {
    redirect('/dashboard/posts?toast=article-delete-failed');
  }

  if (!canManagePost(session.user, existingPost.userId)) {
    redirect('/dashboard/posts?toast=permission-denied');
  }

  try {
    await db.delete(posts).where(eq(posts.id, id));
  } catch {
    redirect('/dashboard/posts?toast=article-delete-failed');
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/posts');
  revalidatePublicPosts(
    existingPost.status === 'published' ? existingPost.slug : null,
  );
  redirect('/dashboard/posts?toast=article-deleted');
}

export async function updatePostStatusAction(id: number, status: string) {
  const session = await requireSession();
  const parsedStatus = parsePostStatus(status);

  if (!parsedStatus) {
    redirect('/dashboard/posts?toast=article-delete-failed');
  }

  const [existingPost] = await db
    .select({
      id: posts.id,
      userId: posts.userId,
      slug: posts.slug,
      status: posts.status,
      publishedAt: posts.publishedAt,
    })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  if (!existingPost) {
    redirect('/dashboard/posts?toast=article-delete-failed');
  }

  if (!canManagePost(session.user, existingPost.userId)) {
    redirect('/dashboard/posts?toast=permission-denied');
  }

  try {
    await db
      .update(posts)
      .set({
        status: parsedStatus,
        publishedAt:
          parsedStatus === 'published'
            ? existingPost.publishedAt ?? new Date()
            : existingPost.publishedAt,
      })
      .where(eq(posts.id, id));
  } catch {
    redirect('/dashboard/posts?toast=article-delete-failed');
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/posts');
  revalidatePath(`/dashboard/posts/${id}`);
  revalidatePublicPosts(
    existingPost.status === 'published' || parsedStatus === 'published'
      ? existingPost.slug
      : null,
  );
  redirect(
    `/dashboard/posts?toast=${
      parsedStatus === 'published' ? 'article-published' : 'article-archived'
    }`,
  );
}

function parseCategoryForm(formData: FormData) {
  const name = getString(formData, 'name');
  const slug = safeSlug(getString(formData, 'slug') || name).slice(0, 100);

  if (!name || !slug) return { error: REQUIRED_FIELDS_ERROR } as const;

  return {
    values: {
      name,
      slug,
      description: getNullableString(formData, 'description'),
    },
  } as const;
}

export async function createCategoryAction(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await requireSession();

  if (!canManageAllPosts(session.user.role)) {
    return { error: PERMISSION_ERROR };
  }

  const parsed = parseCategoryForm(formData);

  if ('error' in parsed) return { error: parsed.error };

  if (await isCategorySlugTaken(parsed.values.slug)) {
    return { error: DUPLICATE_SLUG_ERROR };
  }

  try {
    await db.insert(categories).values(parsed.values);
  } catch {
    return { error: 'Gagal menambahkan kategori.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/categories');
  revalidatePublicPosts();
  redirect('/dashboard/categories?toast=category-created');
}

export async function updateCategoryAction(
  id: number,
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await requireSession();

  if (!canManageAllPosts(session.user.role)) {
    return { error: PERMISSION_ERROR };
  }

  const parsed = parseCategoryForm(formData);

  if ('error' in parsed) return { error: parsed.error };

  if (await isCategorySlugTaken(parsed.values.slug, id)) {
    return { error: DUPLICATE_SLUG_ERROR };
  }

  try {
    await db.update(categories).set(parsed.values).where(eq(categories.id, id));
  } catch {
    return { error: 'Gagal memperbarui kategori.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/categories');
  revalidatePublicPosts();
  redirect('/dashboard/categories?toast=category-updated');
}

export async function deleteCategoryAction(id: number) {
  const session = await requireSession();

  if (!canManageAllPosts(session.user.role)) {
    redirect('/dashboard/categories?toast=permission-denied');
  }

  try {
    await db.delete(categories).where(eq(categories.id, id));
  } catch {
    redirect('/dashboard/categories?toast=category-delete-failed');
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/categories');
  revalidatePath('/dashboard/posts');
  revalidatePublicPosts();
  redirect('/dashboard/categories?toast=category-deleted');
}
