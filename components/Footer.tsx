'use client';
import Link from 'next/link';
import { LINKS } from '@/utils/constant';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-hijau text-white pt-16 pb-8 font-quicksand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Pondok Pesantren <br /> Shibghotallah
            </h3>
            <p className="text-emerald-50 leading-relaxed mb-3 max-w-sm">
              Modern Islamic Boarding School yang berkomitmen untuk mencetak
              generasi muda yang beriman, berilmu, dan berakhlak mulia.
            </p>
            <div className="flex space-x-4">
              <FaInstagram className="text-2xl hover:text-emerald-200 cursor-pointer transition-colors duration-300" />
            </div>
          </div>

          {/* Tentang Kami */}
          <div>
            <h4 className="text-lg  mb-4 border-b border-emerald-700 pb-2 inline-block font-bold">
              Tentang Kami
            </h4>
            <ul className="space-y-3">
              {LINKS.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-emerald-100 hover:text-white hover:underline transition-all duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h4 className="text-lg  mb-4 border-b border-emerald-700 pb-2 inline-block font-bold">
              Informasi
            </h4>
            <ul className="space-y-3">
              {LINKS.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-emerald-100 hover:text-white hover:underline transition-all duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-lg  mb-4 border-b border-emerald-700 pb-2 inline-block font-bold ">
              Lokasi Pondok
            </h4>
            <div className="text-emerald-100 space-y-3 text-sm leading-relaxed">
              <p>{LINKS.contact.address}</p>
              <p>{LINKS.contact.phone}</p>
              <p>{LINKS.contact.email}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-800 mt-12 pt-8 text-center md:text-left text-emerald-200 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Pondok Pesantren Shibghotallah.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
