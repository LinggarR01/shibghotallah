import Image from 'next/image';
import Link from 'next/link';
import News from '../components/ui/News';
import Card from '../components/ui/Card';
import { falsafah } from '../config/constant';
import { Article } from '@/drizzle/actions/article';

// Ubah menjadi async function untuk mengambil data
export default async function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${API_URL}/api/posts`, {
    cache: 'no-store',
  });

  // Pastikan mengubah response menjadi format JSON
  const articlesData: Article[] = await res.json();

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      {/* --- HERO SECTION --- */}
      <section className="relative h-dvh w-full flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pondokpesantren.jpg"
            alt="Pondok Pesantren Shibghotallah"
            fill
            className="object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-emerald-900/60 to-black/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-16 md:mt-0">
          {/* Badge Info */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 md:mb-8">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs sm:text-sm md:text-base font-semibold tracking-wide text-emerald-50">
              Pendaftaran Santri Baru Telah Dibuka
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight drop-shadow-xl">
            Mencetak Generasi <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-emerald-100">
              Qur'ani & Inspiratif
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl font-medium mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto text-gray-200 drop-shadow-md px-4">
            Pondok Pesantren Modern Shibghotallah memadukan pendidikan Islam
            klasik dengan wawasan global untuk menyongsong masa depan umat.
          </p>

          {/* Tombol */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4">
            <Link
              href="/pendaftaran/pendaftaran-KMI"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-1">
              Daftar Sekarang
            </Link>
            <Link
              href="/sejarah/selayang-pandang"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-emerald-900 px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1">
              Jelajahi Profil Pondok
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex-col items-center opacity-70 hidden sm:flex">
          <span className="text-xs font-semibold tracking-widest uppercase mb-2">
            Scroll
          </span>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
      {/* --- AKHIR HERO SECTION --- */}

      {/* News Section */}
      <section className="bg-white">
        {/* Masukkan array data yang sudah di-fetch ke dalam prop articles */}
        <News articles={articlesData.slice(0, 3)} />
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Ornamen Background */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-64 h-64 md:w-96 md:h-96 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-64 h-64 md:w-120 md:h-120 bg-emerald-50/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-24">
            {/* Sisi Kiri: Teks */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs md:text-sm mb-4 md:mb-6 border border-emerald-100">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                FALSAFAH PONDOK
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
                Merajut Akhlak, <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-emerald-400">
                  Membangun Peradaban
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                Pondok Pesantren Shibghotallah hadir sebagai oase pendidikan
                Islam yang memadukan kedalaman spiritual, kecerdasan
                intelektual, dan ketangguhan karakter. Kami berkomitmen mencetak
                generasi yang tidak hanya memahami agama, tetapi juga siap
                menjadi pemimpin di era modern.
              </p>

              {/* Checklist */}
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                {[
                  'Pengajar Tersertifikasi & Berpengalaman',
                  'Fasilitas Asrama yang Nyaman & Asri',
                  'Kurikulum Terpadu (Agama & Umum)',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-sm md:text-base text-gray-700 font-medium">
                    <div className="shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="text-emerald-700 font-bold hover:text-emerald-500 transition-colors flex items-center group text-sm md:text-base">
                Kenali Sejarah Kami Lebih Dalam
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            {/* Sisi Kanan: Gambar */}
            <div className="order-1 lg:order-2 relative mb-8 lg:mb-0">
              <div className="relative h-75 md:h-125 w-full lg:w-4/5 ml-auto rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/santri.jpg"
                  alt="Kegiatan Santri Utama"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="absolute -bottom-12 left-0 w-2/3 md:h-72 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-4 border-white hidden md:block transform hover:-translate-y-2 transition-transform duration-500">
                <Image
                  src="/santri2.jpg"
                  alt="Suasana Pondok"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-12 md:mt-20">
            <Card content={falsafah} />
          </div>
        </div>
      </section>
      {/* --- AKHIR ABOUT SECTION --- */}
    </div>
  );
}
