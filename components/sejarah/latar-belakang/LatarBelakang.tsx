'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { staggerContainer } from '@/components/ui/Animations';

export default function LatarBelakang() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 border-b-4 pb-2 border-emerald-700 inline-block">
            Latar Belakang
          </h1>

          <div className="space-y-5 text-base md:text-xl text-black leading-relaxed">
            <p>
              Islam yang memberkahi adalah Islam yang diamalkan dalam kehidupan
              nyata. Iman bukan hanya berhenti pada konsep dan teori, tetapi
              harus terwujud dalam amal shalih, akhlak mulia, kepedulian sosial,
              dan perilaku yang membawa manfaat bagi sesama.
            </p>

            <p>
              Iman yang kuat adalah iman yang mampu mewarnai kehidupan. Ia
              menjadi ruh dalam cara berpikir, bersikap, belajar, bekerja, dan
              berjuang. Iman tidak hanya mengarahkan manusia kepada kebahagiaan
              akhirat, tetapi juga menjadi energi untuk berkiprah secara positif
              dalam kehidupan dunia.
            </p>

            <p>
              Dengan harapan dan cita-cita tersebut, Pondok Modern Shibghatallah
              Al-Islamy didirikan sebagai lembaga pendidikan Islam yang berupaya
              memadukan pembinaan keimanan, keilmuan, akhlak, kedisiplinan, dan
              keterampilan hidup santri.
            </p>

            <p>
              Pondok Modern Shibghatallah Al-Islamy merupakan salah satu
              institusi <span className="font-bold">tarbiyah</span> pendidikan,{' '}
              <span className="font-bold">tajribah</span> latihan, dan{' '}
              <span className="font-bold">tathbiqiyah</span> pengamalan Islam.
              Seluruh proses pendidikan dirancang agar santri tidak hanya
              memahami ilmu, tetapi juga mampu mengamalkannya dalam kehidupan
              sehari-hari.
            </p>

            <p>
              Pondok ini juga merupakan keberlanjutan dari pendidikan TK Islam
              Terpadu Al Barkah dan Rumah Tahfidz As Suada yang telah berjalan
              sebelumnya. Dari perjalanan tersebut, lahirlah semangat untuk
              melangkah lebih jauh dalam membina generasi muda muslim yang
              tangguh, berintegritas, dan berakhlak Qur’ani.
            </p>

            <p>
              Melalui pendidikan yang terpadu, Pondok Modern Shibghatallah
              Al-Islamy berikhtiar menjadi tempat tumbuhnya santri yang memiliki
              aqidah yang kokoh, ibadah yang terjaga, ilmu yang bermanfaat,
              serta kepedulian untuk berkhidmat kepada masyarakat dan umat.
            </p>
          </div>
          <div className="mt-12 flex items-center justify-end border-t border-gray-200 pt-6">
            <Link
              href="/sejarah/selayang-pandang"
              className="text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
              Selayang Pandang →
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
