import Berita from '@/components/berita/Berita';
import { fetchAllPosts } from '@/lib/fetch';

export default async function BeritaPage() {
  const articlesData = await fetchAllPosts();

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="bg-white">
        <Berita articles={articlesData} />
      </section>
    </div>
  );
}
