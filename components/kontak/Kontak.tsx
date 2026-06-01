'use client';

import { LINKS } from '@/utils/constant';
import { fadeInUp, staggerContainer } from '@/components/ui/Animations';
import GoogleMaps from '@/components/ui/GoogleMaps';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

const contactItems = [
  {
    title: 'Alamat Pondok',
    value: LINKS.contact.address,
    icon: MapPin,
  },
  {
    title: 'Telepon & WhatsApp',
    value: LINKS.contact.phone,
    icon: Phone,
  },
  {
    title: 'Email Resmi',
    value: LINKS.contact.email,
    icon: Mail,
  },
];

const socialItems = [
  {
    title: 'Facebook',
    value: LINKS.contact.socialMedia.facebook,
    icon: FaFacebookF,
  },
  {
    title: 'Instagram',
    value: LINKS.contact.socialMedia.instagram,
    icon: FaInstagram,
  },
  {
    title: 'TikTok',
    value: LINKS.contact.socialMedia.tiktok,
    icon: FaTiktok,
  },
  {
    title: 'Twitter / X',
    value: LINKS.contact.socialMedia.twitter,
    icon: FaXTwitter,
  },
  {
    title: 'YouTube',
    value: LINKS.contact.socialMedia.youtube,
    icon: FaYoutube,
  },
].filter((item) => Boolean(item.value));

export default function Kontak() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-quicksand">
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Kontak & Lokasi
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
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
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className="flex items-start">
                    <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-6">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div variants={fadeInUp} className="pt-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sosial Media
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {socialItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.title}
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                          <Icon className="h-4 w-4" />
                        </span>
                        {item.title}
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}>
            <GoogleMaps
              title="Lokasi Pondok Pesantren"
              address="Pondok Pesantren Shibghotallah Al-Islamy, Jl. Belibis V, Semper Barat, Cilincing, Jakarta Utara"
              embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9624321764495!2d106.92677857492892!3d-6.135750093851109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b55c954cfcf%3A0x1d65a33047be229f!2sPondok%20Pesantren%20Shibghotallah%20Al%20Islamy!5e0!3m2!1sen!2sus!4v1779818031933!5m2!1sen!2sus"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
