import { categories, posts, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { canManageAllPosts, canManagePost, SessionUser } from '@/lib/auth';
import {
  and,
  asc,
  count,
  desc,
  eq,
  like,
  ne,
  or,
  SQL,
} from 'drizzle-orm';

export type PostStatus = 'draft' | 'published' | 'archived';

export const POST_STATUSES: PostStatus[] = ['draft', 'published', 'archived'];
export const POST_PAGE_SIZE = 10;

function whereIf(conditions: SQL<unknown>[]) {
  return conditions.length > 0 ? and(...conditions) : undefined;
}

function scopedPostConditions(user: SessionUser) {
  return canManageAllPosts(user.role) ? [] : [eq(posts.userId, user.id)];
}

export function parsePostStatus(value: string | null): PostStatus | null {
  if (!value) return null;

  return POST_STATUSES.includes(value as PostStatus)
    ? (value as PostStatus)
    : null;
}

export async function getDashboardStats(user: SessionUser) {
  const scope = scopedPostConditions(user);

  const countByStatus = async (status?: PostStatus) => {
    const conditions = status ? [...scope, eq(posts.status, status)] : scope;
    const [row] = await db
      .select({ value: count() })
      .from(posts)
      .where(whereIf(conditions));

    return Number(row?.value ?? 0);
  };

  const [totalPosts, draftPosts, publishedPosts, archivedPosts, totalCategories] =
    await Promise.all([
      countByStatus(),
      countByStatus('draft'),
      countByStatus('published'),
      countByStatus('archived'),
      db.select({ value: count() }).from(categories),
    ]);

  const latestPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      image: posts.image,
      status: posts.status,
      publishedAt: posts.publishedAt,
      updatedAt: posts.updatedAt,
      categoryName: categories.name,
      authorName: users.username,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(users, eq(posts.userId, users.id))
    .where(whereIf(scope))
    .orderBy(desc(posts.updatedAt), desc(posts.id))
    .limit(5);

  return {
    totalPosts,
    draftPosts,
    publishedPosts,
    archivedPosts,
    totalCategories: Number(totalCategories[0]?.value ?? 0),
    latestPosts,
  };
}

export async function getPostsList({
  user,
  search,
  status,
  categoryId,
  page,
}: {
  user: SessionUser;
  search?: string;
  status?: PostStatus | null;
  categoryId?: number | null;
  page?: number;
}) {
  const safePage = Math.max(1, page ?? 1);
  const conditions = scopedPostConditions(user);

  if (search) {
    const keyword = `%${search}%`;
    const searchCondition = or(
      like(posts.title, keyword),
      like(posts.slug, keyword),
    );

    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  if (status) {
    conditions.push(eq(posts.status, status));
  }

  if (categoryId) {
    conditions.push(eq(posts.categoryId, categoryId));
  }

  const where = whereIf(conditions);
  const [{ value: totalItems } = { value: 0 }] = await db
    .select({ value: count() })
    .from(posts)
    .where(where);

  const items = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      image: posts.image,
      status: posts.status,
      publishedAt: posts.publishedAt,
      updatedAt: posts.updatedAt,
      categoryName: categories.name,
      authorName: users.username,
      userId: posts.userId,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(users, eq(posts.userId, users.id))
    .where(where)
    .orderBy(desc(posts.updatedAt), desc(posts.id))
    .limit(POST_PAGE_SIZE)
    .offset((safePage - 1) * POST_PAGE_SIZE);

  return {
    items,
    page: safePage,
    totalItems: Number(totalItems),
    totalPages: Math.max(1, Math.ceil(Number(totalItems) / POST_PAGE_SIZE)),
  };
}

export async function getPostDetail(id: number, user: SessionUser) {
  const [post] = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      image: posts.image,
      status: posts.status,
      userId: posts.userId,
      categoryId: posts.categoryId,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      categoryName: categories.name,
      authorName: users.username,
      authorEmail: users.email,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(users, eq(posts.userId, users.id))
    .where(eq(posts.id, id))
    .limit(1);

  if (!post || !canManagePost(user, post.userId)) {
    return null;
  }

  return post;
}

export async function getCategoryOptions() {
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .orderBy(asc(categories.name));
}

export async function getCategoriesWithCounts(search?: string) {
  const conditions: SQL<unknown>[] = [];

  if (search) {
    const keyword = `%${search}%`;
    const searchCondition = or(
      like(categories.name, keyword),
      like(categories.slug, keyword),
    );

    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      createdAt: categories.createdAt,
      postCount: count(posts.id),
    })
    .from(categories)
    .leftJoin(posts, eq(posts.categoryId, categories.id))
    .where(whereIf(conditions))
    .groupBy(
      categories.id,
      categories.name,
      categories.slug,
      categories.description,
      categories.createdAt,
    )
    .orderBy(asc(categories.name));
}

export async function getCategoryById(id: number) {
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  return category ?? null;
}

export async function isPostSlugTaken(slug: string, ignoredId?: number) {
  const conditions: SQL<unknown>[] = [eq(posts.slug, slug)];

  if (ignoredId) {
    conditions.push(ne(posts.id, ignoredId));
  }

  const [row] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(whereIf(conditions))
    .limit(1);

  return Boolean(row);
}

export async function isCategorySlugTaken(slug: string, ignoredId?: number) {
  const conditions: SQL<unknown>[] = [eq(categories.slug, slug)];

  if (ignoredId) {
    conditions.push(ne(categories.id, ignoredId));
  }

  const [row] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(whereIf(conditions))
    .limit(1);

  return Boolean(row);
}
