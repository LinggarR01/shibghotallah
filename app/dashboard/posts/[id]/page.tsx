import { connection } from 'next/server';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import ConfirmButton from '@/components/cms/ConfirmButton';
import PageHeader from '@/components/cms/PageHeader';
import StatusBadge from '@/components/cms/StatusBadge';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LinkButton,
} from '@/components/cms/ui';
import { deletePostAction } from '@/lib/cms-actions';
import { getPostDetail } from '@/lib/cms-data';
import { requireSession } from '@/lib/auth';
import { formatDate } from '@/lib/utils';

type Params = Promise<{ id: string }>;

export default async function PostDetailPage({ params }: { params: Params }) {
  await connection();

  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId <= 0) {
    notFound();
  }

  const session = await requireSession();
  const post = await getPostDetail(postId, session.user);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Preview Artikel"
        description="Detail konten dan metadata artikel."
        actions={
          <>
            <LinkButton href="/dashboard/posts" variant="outline">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </LinkButton>
            <LinkButton href={`/dashboard/posts/${post.id}/edit`}>
              <Pencil className="h-4 w-4" />
              Edit
            </LinkButton>
            <form action={deletePostAction.bind(null, post.id)}>
              <ConfirmButton
                title="Hapus artikel?"
                message="Artikel yang dihapus tidak bisa dikembalikan."
                confirmLabel="Hapus">
                <Trash2 className="h-4 w-4" />
                Delete
              </ConfirmButton>
            </form>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          {post.image ? (
            <div
              className="h-64 rounded-t-2xl bg-cover bg-center sm:h-80"
              style={{ backgroundImage: `url(${post.image})` }}
            />
          ) : null}
          <CardHeader>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={post.status} />
              <Badge variant="outline">{post.categoryName ?? 'Tanpa kategori'}</Badge>
            </div>
            <CardTitle className="text-2xl sm:text-3xl">{post.title}</CardTitle>
            <p className="mt-2 text-sm text-gray-500">{post.slug}</p>
          </CardHeader>
          <CardContent>
            {post.excerpt ? (
              <p className="mb-6 rounded-2xl bg-emerald-50 p-4 text-sm font-medium leading-relaxed text-emerald-900">
                {post.excerpt}
              </p>
            ) : null}
            <article className="whitespace-pre-wrap text-base leading-8 text-gray-700">
              {post.content}
            </article>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-gray-500">Author</dt>
                <dd className="mt-1 font-medium text-gray-950">
                  {post.authorName ?? '-'}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">Email Author</dt>
                <dd className="mt-1 text-gray-700">{post.authorEmail ?? '-'}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">Kategori</dt>
                <dd className="mt-1 text-gray-700">{post.categoryName ?? '-'}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">Published At</dt>
                <dd className="mt-1 text-gray-700">
                  {formatDate(post.publishedAt)}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">Created At</dt>
                <dd className="mt-1 text-gray-700">{formatDate(post.createdAt)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">Updated At</dt>
                <dd className="mt-1 text-gray-700">{formatDate(post.updatedAt)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
