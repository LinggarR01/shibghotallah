'use client';

import Image from 'next/image';
import News from './components/ui/News';
import Card from './components/ui/Card';
import { articles } from './data/constant';
import { falsafah } from './data/constant';

export default function Home() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      {/* --- HERO SECTION BARU YANG LEBIH CAKEP --- */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pondokpesantren.jpg"
            alt="Pondok Pesantren Shibghotallah"
            fill
            className="object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite]" // Efek zoom lambat bernapas
            priority
          />
          {/* Trik Overlay: Gradasi Hitam -> Hijau -> Hitam agar teks menonjol */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-emerald-900/60 to-black/80"></div>
        </div>

        {/* Content */}
        {/* mt-16 ditambahkan agar konten tidak tertutup navbar fixed kamu */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-16">
          {/* Badge Info (Glassmorphism) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm md:text-base font-semibold tracking-wide text-emerald-50">
              Pendaftaran Santri Baru Telah Dibuka
            </span>
          </div>

          {/* Headline yang lebih tegas */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight drop-shadow-xl">
            Mencetak Generasi <br className="hidden md:block" />
            {/* Trik Teks Gradasi */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-100">
              Qur'ani & Inspiratif
            </span>
          </h1>

          <p className="text-lg md:text-2xl font-medium mb-10 leading-relaxed max-w-3xl mx-auto text-gray-200 drop-shadow-md">
            Pondok Pesantren Modern Shibghotallah memadukan pendidikan Islam
            klasik dengan wawasan global untuk menyongsong masa depan umat.
          </p>

          {/* Tombol yang lebih modern */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-1">
              Daftar Sekarang
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-emerald-900 px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1">
              Jelajahi Profil Pondok
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center opacity-70">
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

      {/* --- ABOUT SECTION BARU (ELEGAN & MODERN) --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Ornamen Background Lembut */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-[30rem] h-[30rem] bg-emerald-50/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* BAGIAN 1: Split Layout (Teks & Komposisi Gambar) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Sisi Kiri: Teks */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-sm mb-6 border border-emerald-100">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                FALSAFAH PONDOK
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                Merajut Akhlak, <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                  Membangun Peradaban
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Pondok Pesantren Shibghotallah hadir sebagai oase pendidikan
                Islam yang memadukan kedalaman spiritual, kecerdasan
                intelektual, dan ketangguhan karakter. Kami berkomitmen mencetak
                generasi yang tidak hanya memahami agama, tetapi juga siap
                menjadi pemimpin di era modern.
              </p>

              {/* Checklist Keunggulan */}
              <ul className="space-y-4 mb-10">
                {[
                  'Pengajar Tersertifikasi & Berpengalaman',
                  'Fasilitas Asrama yang Nyaman & Asri',
                  'Kurikulum Terpadu (Agama & Umum)',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-gray-700 font-medium">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-600"
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

              <button className="text-emerald-700 font-bold hover:text-emerald-500 transition-colors flex items-center group">
                Kenali Sejarah Kami Lebih Dalam
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
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

            {/* Sisi Kanan: Komposisi Gambar Estetik */}
            <div className="order-1 lg:order-2 relative">
              {/* Gambar Utama */}
              <div className="relative h-[400px] md:h-[500px] w-full lg:w-4/5 ml-auto rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/santri.jpg"
                  alt="Kegiatan Santri Utama"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Gambar Tumpuk (Kecil) */}
              <div className="absolute -bottom-12 left-0 w-2/3 h-64 md:h-72 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-4 border-white hidden sm:block transform hover:-translate-y-2 transition-transform duration-500">
                <Image
                  src="/santri2.jpg"
                  alt="Suasana Pondok"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Badge Experience */}
              <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce hover:animate-none">
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  A
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Akreditasi
                  </p>
                  <p className="font-extrabold text-gray-900">
                    Unggul (Amat Baik)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-20">
            <Card content={falsafah} />
          </div>
        </div>
      </section>
      {/* --- AKHIR ABOUT SECTION --- */}

      {/* News Section */}
      <section className="bg-white">
        <News articles={articles} />
      </section>
    </div>
  );
}
