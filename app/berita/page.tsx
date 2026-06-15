import Berita from '@/components/berita/Berita';
import { getAllPosts } from '@/drizzle/actions/posts';

export default async function BeritaPage() {
  const articlesData = await getAllPosts(12);

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="bg-white">
        <Berita articles={articlesData} />
      </section>
    </div>
  );
}
