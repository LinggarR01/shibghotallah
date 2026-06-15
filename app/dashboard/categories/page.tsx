import { connection } from 'next/server';
import CategoryManager from '@/components/cms/CategoryManager';
import { canManageAllPosts, requireSession } from '@/lib/auth';
import { getCategoriesWithCounts } from '@/lib/cms-data';
import { formatDate } from '@/lib/utils';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = searchParams[key];

  return Array.isArray(value) ? value[0] : value;
}

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await connection();

  const resolvedSearchParams = await searchParams;
  const session = await requireSession();
  const search = getParam(resolvedSearchParams, 'q') ?? '';
  const categories = await getCategoriesWithCounts(search);

  return (
    <CategoryManager
      categories={categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        createdAt: formatDate(category.createdAt),
      }))}
      canManageCategories={canManageAllPosts(session.user.role)}
      search={search}
    />
  );
}
