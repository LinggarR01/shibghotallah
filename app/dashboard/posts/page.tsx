import Link from 'next/link';
import Image from 'next/image';
import { connection } from 'next/server';
import {
  Archive,
  Eye,
  FileText,
  Pencil,
  PlusCircle,
  Search,
  Send,
  Trash2,
} from 'lucide-react';
import ConfirmButton from '@/components/cms/ConfirmButton';
import EmptyState from '@/components/cms/EmptyState';
import PageHeader from '@/components/cms/PageHeader';
import Pagination from '@/components/cms/Pagination';
import StatusBadge from '@/components/cms/StatusBadge';
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  LinkButton,
  Select,
  Table,
  Td,
  Th,
} from '@/components/cms/ui';
import { deletePostAction, updatePostStatusAction } from '@/lib/cms-actions';
import {
  getCategoryOptions,
  getPostsList,
  parsePostStatus,
} from '@/lib/cms-data';
import { requireSession } from '@/lib/auth';
import { formatDate } from '@/lib/utils';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = searchParams[key];

  return Array.isArray(value) ? value[0] : value;
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await connection();

  const resolvedSearchParams = await searchParams;
  const session = await requireSession();
  const search = getParam(resolvedSearchParams, 'q') ?? '';
  const status = parsePostStatus(
    getParam(resolvedSearchParams, 'status') ?? null,
  );
  const categoryParam = Number(getParam(resolvedSearchParams, 'categoryId'));
  const categoryId =
    Number.isInteger(categoryParam) && categoryParam > 0 ? categoryParam : null;
  const pageParam = Number(getParam(resolvedSearchParams, 'page'));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const [categories, postList] = await Promise.all([
    getCategoryOptions(),
    getPostsList({
      user: session.user,
      search,
      status,
      categoryId,
      page,
    }),
  ]);

  const hasFilters = Boolean(search || status || categoryId);

  return (
    <div>
      <PageHeader
        title="Artikel/Berita"
        description="Kelola draft, publikasi, dan arsip berita Pondok Modern Shibghatallah."
        actions={
          <LinkButton href="/dashboard/posts/new">
            <PlusCircle className="h-4 w-4" />
            Tambah Artikel
          </LinkButton>
        }
      />

      <Card className="mb-5">
        <CardContent className="p-5">
          <form className="grid gap-4 lg:grid-cols-[1fr_180px_220px_auto] lg:items-end">
            <div className="space-y-2">
              <Label htmlFor="q">Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <Input
                  id="q"
                  name="q"
                  defaultValue={search}
                  placeholder="Cari judul atau slug"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" name="status" defaultValue={status ?? ''}>
                <option value="">Semua status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Kategori</Label>
              <Select
                id="categoryId"
                name="categoryId"
                defaultValue={categoryId?.toString() ?? ''}>
                <option value="">Semua kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Filter</Button>
              {hasFilters ? (
                <LinkButton href="/dashboard/posts" variant="outline">
                  Reset
                </LinkButton>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      {postList.items.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Artikel belum ditemukan"
          description={
            hasFilters
              ? 'Tidak ada artikel yang cocok dengan filter saat ini.'
              : 'Mulai tulis artikel pertama untuk ditampilkan di CMS.'
          }
          actions={
            <LinkButton href="/dashboard/posts/new">
              <PlusCircle className="h-4 w-4" />
              Tambah Artikel
            </LinkButton>
          }
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <thead>
                <tr>
                  <Th>Cover</Th>
                  <Th>Judul</Th>
                  <Th>Slug</Th>
                  <Th>Kategori</Th>
                  <Th>Author</Th>
                  <Th>Status</Th>
                  <Th>Published At</Th>
                  <Th>Updated At</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {postList.items.map((post) => (
                  <tr key={post.id}>
                    <Td>
                      <div className="relative h-14 w-20 overflow-hidden rounded-lg bg-gray-100">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-gray-400">
                            -
                          </div>
                        )}
                      </div>
                    </Td>
                    <Td className="min-w-56">
                      <Link
                        href={`/dashboard/posts/${post.id}`}
                        className="font-semibold text-gray-950 hover:text-emerald-700">
                        {post.title}
                      </Link>
                    </Td>
                    <Td className="text-gray-500">{post.slug}</Td>
                    <Td>{post.categoryName ?? '-'}</Td>
                    <Td>{post.authorName ?? '-'}</Td>
                    <Td>
                      <StatusBadge status={post.status} />
                    </Td>
                    <Td>{formatDate(post.publishedAt)}</Td>
                    <Td>{formatDate(post.updatedAt)}</Td>
                    <Td>
                      <div className="flex min-w-[280px] flex-wrap items-center gap-2">
                        <Link
                          href={`/dashboard/posts/${post.id}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-gray-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800"
                          aria-label="Detail artikel"
                          title="Detail artikel">
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/dashboard/posts/${post.id}/edit`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-gray-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800"
                          aria-label="Edit artikel"
                          title="Edit artikel">
                          <Pencil className="h-4 w-4" />
                        </Link>

                        {post.status !== 'published' ? (
                          <form
                            action={updatePostStatusAction.bind(
                              null,
                              post.id,
                              'published',
                            )}>
                            <ConfirmButton
                              title="Publikasikan artikel?"
                              message="Artikel akan tampil di halaman berita publik."
                              confirmLabel="Publish"
                              variant="secondary"
                            >
                              <Send className="h-4 w-4" />
                              Publish
                            </ConfirmButton>
                          </form>
                        ) : null}

                        {post.status !== 'archived' ? (
                          <form
                            action={updatePostStatusAction.bind(
                              null,
                              post.id,
                              'archived',
                            )}>
                            <ConfirmButton
                              title="Arsipkan artikel?"
                              message="Artikel akan dipindahkan ke arsip dan tidak menjadi konten aktif."
                              confirmLabel="Archive"
                              variant="outline"
                            >
                              <Archive className="h-4 w-4" />
                              Archive
                            </ConfirmButton>
                          </form>
                        ) : null}

                        <form action={deletePostAction.bind(null, post.id)}>
                          <ConfirmButton
                            title="Hapus artikel?"
                            message="Artikel yang dihapus tidak bisa dikembalikan."
                            confirmLabel="Hapus">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </ConfirmButton>
                        </form>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Pagination
        pathname="/dashboard/posts"
        searchParams={{
          q: search,
          status,
          categoryId,
        }}
        page={postList.page}
        totalPages={postList.totalPages}
      />
    </div>
  );
}
