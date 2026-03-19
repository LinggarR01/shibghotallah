'use client';
import { LINKS } from '@/utils/constant';
import { fadeInUp, staggerContainer } from '@/components/ui/Animations';
import { motion } from 'motion/react';

export default function Kontak() {
  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col font-quicksand">
      {/* Main Content Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        <div className="max-w-3xl mx-auto">
          {/* Card Informasi Kontak */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-100 pb-4 text-center">
              Informasi Kontak
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8">
              {/* Item: Alamat */}
              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-6">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Alamat Pondok
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {LINKS.contact.address}
                  </p>
                </div>
              </motion.div>

              {/* Item: Telepon / WhatsApp */}
              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-6">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Telepon & WhatsApp
                  </h3>
                  <p className="text-gray-600">{LINKS.contact.phone}</p>
                </div>
              </motion.div>

              {/* Item: Email */}
              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-6">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Email Resmi
                  </h3>
                  <p className="text-gray-600">{LINKS.contact.email}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
