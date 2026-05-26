import Link from 'next/link';

const sintesaItems = [
  'Madrasah sebagai pusat pembelajaran ilmu agama dan ilmu pengetahuan.',
  'Masjid sebagai pusat ibadah, pembinaan ruhani, dan pembentukan akhlak.',
  'Asrama sebagai tempat pendidikan karakter, kedisiplinan, dan kemandirian santri.',
  'Keluarga sebagai dasar pembinaan kasih sayang, adab, dan tanggung jawab.',
  'Masyarakat sebagai ruang pengabdian, dakwah, dan penerapan ilmu.',
];

export default function Sintesa() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-2 border-emerald-700 inline-block">
            Sintesa
          </h1>

          <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
            <p>
              Sintesa Pondok Modern Shibghatallah Al-Islamy merupakan perpaduan
              nilai-nilai pendidikan Islam yang menyatukan pembinaan ilmu,
              ibadah, akhlak, kedisiplinan, dan pengabdian. Pendidikan di pondok
              tidak hanya berlangsung di ruang kelas, tetapi juga melalui
              seluruh aktivitas kehidupan santri sehari-hari.
            </p>

            <p>
              Pondok modern memandang bahwa pendidikan yang sempurna adalah
              pendidikan yang mampu menyentuh akal, hati, dan perilaku. Oleh
              karena itu, setiap kegiatan santri diarahkan untuk membentuk
              pribadi yang beriman kepada Allah SWT, mencintai Rasulullah SAW,
              berakhlak mulia, berilmu luas, serta bermanfaat bagi sesama.
            </p>

            <p>
              Sintesa ini menjadi dasar bagi pondok dalam menyelenggarakan
              pendidikan yang utuh, seimbang, dan berkesinambungan. Santri
              dibina agar mampu menjadi insan muslim yang kuat dalam aqidah,
              tekun dalam ibadah, santun dalam akhlak, cerdas dalam berpikir,
              dan siap mengabdi di tengah masyarakat.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-emerald-700 p-6 md:p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold">
              Unsur Pendidikan dalam Sintesa
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {sintesaItems.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-emerald-700">
                    {index + 1}
                  </div>

                  <p className="text-sm md:text-base leading-relaxed text-white/90">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
            <Link
              href="/sejarah/selayang-pandang"
              className="text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
              ← Selayang Pandang
            </Link>
            <Link
              href="/sejarah/badan-wakaf"
              className="text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
              Badan Wakaf →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
