import Link from 'next/link';

export default function Moto() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="py-24 bg-white relative overflow-hidden animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-2 border-emerald-700 inline-block">
            Moto
          </h1>

          <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed stagger-container">
            <p>
              Moto Pondok Modern Shibghatallah Al-Islamy menjadi pedoman dalam
              membentuk pribadi santri yang beriman, berilmu, berakhlak mulia,
              dan siap mengabdi kepada agama, masyarakat, bangsa, dan negara.
            </p>

            <p>
              Dengan berlandaskan nilai-nilai Al-Qur’an dan As-Sunnah, pondok
              pesantren berupaya menanamkan semangat keikhlasan, kedisiplinan,
              kemandirian, serta tanggung jawab dalam setiap aspek kehidupan
              santri.
            </p>

            <p>
              Moto ini menjadi ruh perjuangan pondok dalam melahirkan generasi
              muslim yang kuat aqidahnya, luas ilmunya, santun akhlaknya, serta
              mampu menjadi teladan di tengah masyarakat.
            </p>

            <div className="mt-12 flex items-center justify-end border-t border-gray-200 pt-6">
              <Link
                href="/tentang/falsafah/panca-jangka"
                prefetch={false}
                className="text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900 hover:scale-105 inline-block">
                Panca Jangka →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
