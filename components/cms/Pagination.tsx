import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LinkButton } from '@/components/cms/ui';

function buildHref(
  pathname: string,
  searchParams: Record<string, string | number | null | undefined>,
  page: number,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) params.set(key, String(value));
  });

  params.set('page', String(page));

  return `${pathname}?${params.toString()}`;
}

export default function Pagination({
  pathname,
  searchParams,
  page,
  totalPages,
}: {
  pathname: string;
  searchParams: Record<string, string | number | null | undefined>;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const previousPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-gray-500">
        Halaman {page} dari {totalPages}
      </p>
      <div className="flex gap-2">
        {page > 1 ? (
          <LinkButton
            href={buildHref(pathname, searchParams, previousPage)}
            variant="outline">
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </LinkButton>
        ) : null}
        {page < totalPages ? (
          <LinkButton
            href={buildHref(pathname, searchParams, nextPage)}
            variant="outline">
            Berikutnya
            <ChevronRight className="h-4 w-4" />
          </LinkButton>
        ) : null}
      </div>
    </div>
  );
}
