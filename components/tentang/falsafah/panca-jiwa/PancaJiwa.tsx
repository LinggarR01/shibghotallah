'use client';
import { pancaJiwaItems } from '@/utils/constant';
import Link from 'next/link';
import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '@/components/ui/Animations';

export default function PancaJiwa() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-2 border-emerald-700 inline-block">
            Panca Jiwa
          </h1>

          <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
            <p>
              Panca Jiwa Pondok Modern Shibghatallah Al-Islamy adalah nilai
              dasar yang menjadi ruh kehidupan santri di lingkungan pondok.
              Nilai-nilai ini ditanamkan dalam keseharian santri, baik dalam
              ibadah, belajar, bergaul, maupun berorganisasi.
            </p>

            <p>
              Melalui Panca Jiwa, pondok berupaya membentuk pribadi muslim yang
              ikhlas, sederhana, mandiri, mencintai persaudaraan, dan mampu
              menggunakan kebebasan dengan penuh tanggung jawab sesuai tuntunan
              Islam.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pancaJiwaItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
            <Link
              href="/tentang/falsafah/panca-jangka"
              className="text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
              ← Panca Jangka
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
