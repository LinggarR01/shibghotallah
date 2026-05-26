import Link from 'next/link';

export default function SelayangPandang() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-2 border-emerald-700 inline-block">
            Selayang Pandang
          </h1>

          <div className="space-y-5 text-base md:text-xl text-black leading-relaxed">
            <p>
              Pondok Modern Shibghatallah Al-Islamy merupakan lembaga pendidikan
              Islam yang hadir sebagai tempat pembinaan generasi muda muslim
              agar tumbuh menjadi pribadi yang beriman, berilmu, berakhlak
              mulia, mandiri, dan siap mengabdi kepada umat.
            </p>

            <p>
              Pendidikan di Pondok Modern Shibghatallah Al-Islamy tidak hanya
              berorientasi pada penguasaan ilmu pengetahuan, tetapi juga pada
              pembentukan adab, kedisiplinan, tanggung jawab, serta kebiasaan
              hidup Islami dalam keseharian santri.
            </p>

            <p>
              Dengan menjadikan Al-Qur’an dan As-Sunnah sebagai landasan utama,
              pondok berupaya menciptakan lingkungan pendidikan yang religius,
              tertib, bersih, dan penuh nilai persaudaraan. Setiap aktivitas
              santri diarahkan agar menjadi bagian dari proses belajar, ibadah,
              pembentukan karakter, dan latihan kehidupan.
            </p>

            <p>
              Pondok Modern Shibghatallah Al-Islamy memiliki harapan besar untuk
              melahirkan generasi yang kuat aqidahnya, lurus ibadahnya, santun
              akhlaknya, luas wawasannya, serta mampu memberikan manfaat bagi
              keluarga, masyarakat, bangsa, dan agama.
            </p>
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
            <Link
              href="/sejarah/latar-belakang"
              className="text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
              ← Latar Belakang
            </Link>
            <Link
              href="/sejarah/sintesa"
              className="text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
              Sintesa →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
