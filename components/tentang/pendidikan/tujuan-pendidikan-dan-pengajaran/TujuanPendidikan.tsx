export default function TujuanPendidikan() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand ">
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          {/* Judul dengan border-bottom responsif */}
          <div className="mb-4 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-2 border-emerald-700 inline-block">
              Tujuan Pendidikan
            </h1>
          </div>

          <p className="text-base md:text-xl text-gray-700 mb-4 italic leading-relaxed">
            Tujuan dari pondok pesantren adalah sebagai berikut:
          </p>

          <ul className="list-disc pl-5 space-y-4 text-base md:text-xl text-black leading-relaxed mb-12 md:mb-16">
            <li className="font-bold pl-2">
              Membentuk insan dengan kepribadian Islami dengan menjunjung tinggi
              dan mengamalkan ajaran Islam.
            </li>
            <li className="font-bold pl-2">
              Membentuk insan yang berpengetahuan luas.
            </li>
            <li className="font-bold pl-2">
              Menjadi pembimbing dan pengarah masyarakat menuju kehidupan yang
              lebih Islami.
            </li>
          </ul>

          {/* Box Container */}
          <div className="bg-emerald-50 p-5 md:p-10 rounded-2xl border-l-[6px] md:border-l-12 border-emerald-700 shadow-sm">
            <p className="text-gray-800 text-sm md:text-lg mb-8 leading-relaxed text-justify md:text-left">
              Pondok pesantren bukanlah lembaga yang eksklusif yang tidak
              berinteraksi dengan masyarakat. Pondok pesantren dapat menjadi
              magnet bagi masyarakat yang ingin mengenal{' '}
              <span className="font-semibold">Islam</span> dalam rangka
              memperbaiki amaliahnya. Karena itu lingkungan pondok pesantren
              sedapat mungkin mencerminkan miniatur masyarakat madani sehingga
              syiar Islam akan dapat dirasakan oleh masyarakat di sekitar pondok
              pesantren. Adapun program pesantren untuk masyarakat sekitar
              adalah:
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-6">
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-bold text-emerald-900 text-sm md:text-base uppercase tracking-wider mb-3 flex items-center">
                  <span className="bg-emerald-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">
                    1
                  </span>
                  Kajian Umum & Masyarakat
                </h3>
                <p className="text-gray-700 text-sm md:text-base italic leading-relaxed">
                  Program ini dilakukan sebagai bagian dari peran serta
                  Pesantren Shibghotallah Al-Islamy dalam da&apos;wah dan
                  pendidikan Islam kepada masyarakat. Pengajian umum dan
                  pengajian khusus untuk bapak-bapak dan ibu-ibu.
                </p>
              </div>

              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-bold text-emerald-900 text-sm md:text-base uppercase tracking-wider mb-3 flex items-center">
                  <span className="bg-emerald-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">
                    2
                  </span>
                  Pesantren Malam Minggu
                </h3>
                <p className="text-gray-700 text-sm md:text-base italic leading-relaxed">
                  Program ini diperuntukkan bagi anak-anak untuk mengisi waktu
                  hari libur dengan kegiatan keagamaan. Santri bisa
                  menerjemahkan Al-Qur&apos;an lafzhiah dengan program
                  pembelajaran 24 jam.
                </p>
              </div>
            </div>
          </div>

          {/* Footer teks */}
          <p className="mt-12 md:mt-16 text-xs md:text-sm text-gray-500 italic text-center max-w-3xl mx-auto leading-relaxed">
            Uraian lebih lanjut dari semua program Pesantren Shibghotallah
            Al-Islamy baik akademik maupun kegiatan lain akan dijelaskan lebih
            terperinci dalam panduan kurikulum dan akademis Pesantren
            Shibghotallah Al-Islamy.
          </p>
        </div>
      </section>
    </div>
  );
}
