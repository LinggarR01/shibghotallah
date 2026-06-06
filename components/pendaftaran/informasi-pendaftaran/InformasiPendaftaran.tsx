import Image from 'next/image';
import Link from 'next/link';

const FORM_GOOGLE_URL = 'https://forms.gle/w2YBtocEp6DiLRr58';

export default function InformasiPendaftaran() {
  return (
    <div className="min-h-screen w-full bg-white font-quicksand">
      <section className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-8 lg:my-20 lg:grid-cols-2 lg:px-12">
          <div>
            <h1 className="animate-fade-in-up mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              Pendaftaran Santri Baru Pondok Modern Shibghatallah
            </h1>

            <p className="animate-fade-in-up animation-delay-100 mb-5 text-base leading-relaxed text-gray-600 md:text-lg">
              Mari bergabung bersama Pondok Modern Shibghatallah, tempat
              pembinaan ilmu, akhlak, kedisiplinan, dan kemandirian santri dalam
              lingkungan pendidikan yang islami.
            </p>

            <p className="animate-fade-in-up animation-delay-200 mb-8 text-base leading-relaxed text-gray-600 md:text-lg">
              Segera daftarkan putra-putri Anda untuk menjadi bagian dari
              generasi Qurani yang berilmu, beradab, dan siap menghadapi masa
              depan dengan nilai-nilai Islam.
            </p>

            <div className="animate-fade-in-up animation-delay-300 flex flex-col gap-3 sm:flex-row">
              <Link
                href={FORM_GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition duration-300 hover:-translate-y-1 hover:bg-emerald-800">
                Daftar
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-emerald-700 px-7 py-3 text-sm font-bold text-emerald-700 transition duration-300 hover:-translate-y-1 hover:bg-emerald-50">
                Kembali ke Beranda
              </Link>
            </div>
          </div>

          <div className="animate-fade-in-right animation-delay-200 relative mx-auto w-full max-w-md">
            <div className="animate-soft-float relative overflow-hidden rounded-[2rem] border bg-white p-3 shadow-2xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-gray-100">
                <Image
                  src="/poster-pendaftaran.webp"
                  alt="Poster Pendaftaran Santri Baru Pondok Modern Shibghatallah"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 448px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
