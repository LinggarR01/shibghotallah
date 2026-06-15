import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/cms/PageHeader';
import PostForm from '@/components/cms/PostForm';
import { updatePostAction } from '@/lib/cms-actions';
import { getCategoryOptions, getPostDetail } from '@/lib/cms-data';
import { requireSession } from '@/lib/auth';
import { formatDateInput } from '@/lib/utils';

type Params = Promise<{ id: string }>;

export default async function EditPostPage({ params }: { params: Params }) {
  await connection();

  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId <= 0) {
    notFound();
  }

  const session = await requireSession();
  const [post, categories] = await Promise.all([
    getPostDetail(postId, session.user),
    getCategoryOptions(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Artikel"
        description="Perbarui konten, kategori, status, dan tanggal publikasi artikel."
      />
      <PostForm
        action={updatePostAction.bind(null, post.id)}
        categories={categories}
        submitLabel="Update Artikel"
        initialValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          status: post.status,
          categoryId: post.categoryId,
          publishedAt: formatDateInput(post.publishedAt),
        }}
      />
    </div>
  );
}
