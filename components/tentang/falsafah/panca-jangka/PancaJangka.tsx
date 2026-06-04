import { pancaJangkaItems } from '@/utils/constant';
import Link from 'next/link';

export default function PancaJangka() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="py-16 md:py-24 bg-white relative overflow-hidden animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-2 border-emerald-700 inline-block">
            Panca Jangka
          </h1>

          <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed stagger-container">
            <p>
              Panca Jangka Pondok Pesantren Shibghatallah Al-Islamy merupakan
              arah perjuangan dan pengembangan pondok dalam membina pendidikan
              Islam yang berkelanjutan. Panca Jangka menjadi landasan strategis
              agar pesantren senantiasa tumbuh, berkembang, dan memberikan
              manfaat yang luas bagi umat.
            </p>

            <p>
              Seluruh program pengembangan pondok diarahkan untuk mewujudkan
              lingkungan pendidikan yang Islami, tertib, produktif, dan
              berorientasi pada pembentukan generasi muslim yang berilmu,
              beradab, serta siap berkhidmat kepada masyarakat.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 stagger-container">
            {pancaJangkaItems.map((item, index) => (
              <div
                key={item.title}
                className="hover-lift rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="animate-fade-in-up mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
            <Link
              href="/tentang/falsafah/moto"
              className="link-hover-scale text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
              ← Moto
            </Link>

            <Link
              href="/tentang/falsafah/panca-jiwa"
              className="link-hover-scale text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
              Panca Jiwa →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
