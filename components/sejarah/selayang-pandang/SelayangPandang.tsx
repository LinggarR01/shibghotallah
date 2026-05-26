'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { staggerContainer, fadeInUp } from '@/components/ui/Animations';

export default function SelayangPandang() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-2 border-emerald-700 inline-block">
            Selayang Pandang
          </motion.h1>

          <div className="space-y-5 text-base md:text-xl text-black leading-relaxed">
            <motion.p variants={fadeInUp}>
              Pondok Modern Shibghatallah Al-Islamy merupakan lembaga pendidikan
              Islam yang hadir sebagai tempat pembinaan generasi muda muslim
              agar tumbuh menjadi pribadi yang beriman, berilmu, berakhlak
              mulia, mandiri, dan siap mengabdi kepada umat.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Pendidikan di Pondok Modern Shibghatallah Al-Islamy tidak hanya
              berorientasi pada penguasaan ilmu pengetahuan, tetapi juga pada
              pembentukan adab, kedisiplinan, tanggung jawab, serta kebiasaan
              hidup Islami dalam keseharian santri.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Dengan menjadikan Al-Qur’an dan As-Sunnah sebagai landasan utama,
              pondok berupaya menciptakan lingkungan pendidikan yang religius,
              tertib, bersih, dan penuh nilai persaudaraan. Setiap aktivitas
              santri diarahkan agar menjadi bagian dari proses belajar, ibadah,
              pembentukan karakter, dan latihan kehidupan.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Pondok Modern Shibghatallah Al-Islamy memiliki harapan besar untuk
              melahirkan generasi yang kuat aqidahnya, lurus ibadahnya, santun
              akhlaknya, luas wawasannya, serta mampu memberikan manfaat bagi
              keluarga, masyarakat, bangsa, dan agama.
            </motion.p>
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
      </motion.section>
    </div>
  );
}
