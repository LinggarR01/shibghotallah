import { connection } from 'next/server';
import PageHeader from '@/components/cms/PageHeader';
import PostForm from '@/components/cms/PostForm';
import { createPostAction } from '@/lib/cms-actions';
import { getCategoryOptions } from '@/lib/cms-data';

export default async function NewPostPage() {
  await connection();

  const categories = await getCategoryOptions();

  return (
    <div>
      <PageHeader
        title="Tambah Artikel"
        description="Tulis artikel atau berita baru untuk Pondok Modern Shibghatallah."
      />
      <PostForm
        action={createPostAction}
        categories={categories}
        submitLabel="Simpan Artikel"
      />
    </div>
  );
}
