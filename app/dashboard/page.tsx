import Link from 'next/link';
import { connection } from 'next/server';
import {
  Archive,
  FileText,
  FolderTree,
  Newspaper,
  PenLine,
  PlusCircle,
  Send,
} from 'lucide-react';
import PageHeader from '@/components/cms/PageHeader';
import StatCard from '@/components/cms/StatCard';
import StatusBadge from '@/components/cms/StatusBadge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  Td,
  Th,
} from '@/components/cms/ui';
import { requireSession } from '@/lib/auth';
import { getDashboardStats } from '@/lib/cms-data';
import { formatDate } from '@/lib/utils';

const solidButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800';

const outlineButtonClass =
  'inline-flex h-10 items-center justify-start gap-2 rounded-xl border border-emerald-100 bg-white px-4 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50';

export default async function DashboardPage() {
  await connection();

  const session = await requireSession();
  const stats = await getDashboardStats(session.user);

  return (
    <div>
      <PageHeader
        title={`Assalamu'alaikum, ${session.user.username}`}
        description="Ringkasan konten artikel dan berita Pondok Modern Shibghatallah."
        actions={
          <Link href="/dashboard/posts/new" className={solidButtonClass}>
            <PlusCircle className="h-4 w-4" />
            Tambah Artikel
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Artikel"
          value={stats.totalPosts}
          icon={FileText}
        />
        <StatCard
          title="Draft"
          value={stats.draftPosts}
          icon={PenLine}
          tone="slate"
        />
        <StatCard title="Published" value={stats.publishedPosts} icon={Send} />
        <StatCard
          title="Archived"
          value={stats.archivedPosts}
          icon={Archive}
          tone="amber"
        />
        <StatCard
          title="Kategori"
          value={stats.totalCategories}
          icon={FolderTree}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Artikel Terbaru</CardTitle>
            <CardDescription>
              Konten terakhir yang diperbarui di CMS.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <Th>Judul</Th>
                  <Th>Kategori</Th>
                  <Th>Status</Th>
                  <Th>Updated</Th>
                </tr>
              </thead>
              <tbody>
                {stats.latestPosts.length > 0 ? (
                  stats.latestPosts.map((post) => (
                    <tr key={post.id}>
                      <Td>
                        <Link
                          href={`/dashboard/posts/${post.id}`}
                          className="font-semibold text-gray-950 hover:text-emerald-700"
                        >
                          {post.title}
                        </Link>
                        <p className="mt-1 text-xs text-gray-500">
                          {post.authorName ?? 'Author tidak tersedia'}
                        </p>
                      </Td>
                      <Td>{post.categoryName ?? '-'}</Td>
                      <Td>
                        <StatusBadge status={post.status} />
                      </Td>
                      <Td>{formatDate(post.updatedAt)}</Td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <Td colSpan={4} className="text-center text-gray-500">
                      Belum ada artikel.
                    </Td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Action</CardTitle>
            <CardDescription>
              Akses cepat untuk pekerjaan harian.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Link href="/dashboard/posts/new" className={solidButtonClass}>
              <PlusCircle className="h-4 w-4" />
              Tambah Artikel
            </Link>

            <Link href="/dashboard/posts" className={outlineButtonClass}>
              <Newspaper className="h-4 w-4" />
              Kelola Artikel
            </Link>

            <Link href="/dashboard/categories" className={outlineButtonClass}>
              <FolderTree className="h-4 w-4" />
              Kelola Kategori
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}