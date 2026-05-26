'use client';

import { badanWakafSections } from '@/utils/constant';
import Link from 'next/link';
import { motion } from 'motion/react';
import { staggerContainer, fadeInUp } from '@/components/ui/Animations';

export default function BadanWakaf() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-2 border-emerald-700 inline-block">
            Badan Wakaf
          </motion.h1>

          <motion.div
            variants={staggerContainer}
            className="space-y-5 text-base md:text-lg text-gray-600 leading-relaxed">
            <motion.p variants={fadeInUp}>
              Badan Wakaf Shibghotallah Al-Islamy merupakan unsur penting dalam
              menjaga amanah, arah perjuangan, dan keberlangsungan pendidikan
              pondok pesantren. Keberadaan badan wakaf menjadi bentuk tanggung
              jawab bersama dalam mengelola, mengembangkan, dan memajukan
              lembaga pendidikan Islam agar senantiasa memberikan manfaat bagi
              umat.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Dengan semangat keikhlasan, musyawarah, dan pengabdian, Badan
              Wakaf Shibghotallah Al-Islamy berperan dalam mendukung visi pondok
              untuk membina generasi muslim yang beriman, berilmu, berakhlak
              mulia, mandiri, serta siap berkhidmat kepada agama, masyarakat,
              bangsa, dan negara.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {badanWakafSections.map((section) => (
              <motion.div
                key={section.title}
                variants={fadeInUp}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
                <h2 className="text-xl font-bold text-gray-900">
                  {section.title}
                </h2>

                <div className="mt-4 h-1 w-14 rounded-full bg-emerald-700" />

                <ol className="mt-5 space-y-3">
                  {section.members.map((member, index) => (
                    <li
                      key={member}
                      className="flex gap-3 text-base leading-relaxed text-gray-600">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                        {index + 1}
                      </span>

                      <span>{member}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
