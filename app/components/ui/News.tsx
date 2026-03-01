import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/app/data/constant';

export default function News({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) {
    return <div className="text-center py-20">Belum ada berita.</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Artikel & Berita Terbaru
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan informasi terkini tentang kegiatan dan perkembangan di
            pondok pesantren kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200">
              <div className="relative h-48 w-full overflow-hidden group">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {article.description}
                </p>
                <Link
                  href={`/berita/${article.slug}`}
                  className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-300 flex items-center ">
                  Baca Selengkapnya
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7-7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
