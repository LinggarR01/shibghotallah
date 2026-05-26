'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '@/components/ui/Animations';

export default function Moto() {
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
            Moto
          </motion.h1>

          <motion.div
            variants={staggerContainer}
            className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
            <motion.p variants={fadeInUp}>
              Moto Pondok Modern Shibghatallah Al-Islamy menjadi pedoman dalam
              membentuk pribadi santri yang beriman, berilmu, berakhlak mulia,
              dan siap mengabdi kepada agama, masyarakat, bangsa, dan negara.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Dengan berlandaskan nilai-nilai Al-Qur’an dan As-Sunnah, pondok
              pesantren berupaya menanamkan semangat keikhlasan, kedisiplinan,
              kemandirian, serta tanggung jawab dalam setiap aspek kehidupan
              santri.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Moto ini menjadi ruh perjuangan pondok dalam melahirkan generasi
              muslim yang kuat aqidahnya, luas ilmunya, santun akhlaknya, serta
              mampu menjadi teladan di tengah masyarakat.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center justify-end border-t border-gray-200 pt-6">
              <Link
                href="/tentang/falsafah/panca-jangka"
                className="text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
                Panca Jangka →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
