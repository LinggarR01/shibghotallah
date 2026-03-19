'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dropdownVariants,
  mobileMenuVariants,
  linkHover,
} from '@/components/ui/Animations';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenus = () => {
    setDropdownOpen(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-hijau shadow-lg fixed top-0 w-full z-50 font-quicksand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center shrink-0 px-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Logo Shibghotallah"
                width={60}
                height={60}
                className="w-10 h-10 md:w-14 md:h-14 p-1 bg-white rounded-full object-contain transition-all duration-300"
              />
              <span className="font-bold text-white text-lg md:text-2xl transition-all duration-300">
                SHIBGHOTALLAH
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Home */}
            <motion.div whileHover={linkHover}>
              <Link
                href="/"
                className="text-white hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-bold">
                Home
              </Link>
            </motion.div>

            {/* Tentang Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen('tentang')}
              onMouseLeave={() => setDropdownOpen(null)}>
              <motion.button
                whileHover={linkHover}
                className="text-white hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-bold flex items-center">
                Tentang
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.button>
              <AnimatePresence>
                {dropdownOpen === 'tentang' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 w-64 bg-white border border-gray-700 rounded-md shadow-lg z-10">
                    <div className="px-4 py-2 text-sm font-semibold text-black">
                      Falsafah
                    </div>
                    <Link
                      href="/tentang/falsafah/moto"
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600"
                      onClick={closeMenus}>
                      Moto
                    </Link>
                    <Link
                      href="/tentang/falsafah/panca-jangka"
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600"
                      onClick={closeMenus}>
                      Panca Jangka
                    </Link>
                    <Link
                      href="/tentang/falsafah/panca-jiwa"
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600"
                      onClick={closeMenus}>
                      Panca Jiwa
                    </Link>
                    <Link
                      href="/sejarah/sintesa"
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600"
                      onClick={closeMenus}>
                      Sintesa
                    </Link>
                    <div className="border-t border-gray-200"></div>
                    <div className="px-4 py-2 text-sm font-semibold text-black">
                      Pendidikan
                    </div>
                    <Link
                      href="/tentang/pendidikan/tujuan-pendidikan-dan-pengajaran"
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600"
                      onClick={closeMenus}>
                      Tujuan Pendidikan dan Pengajaran
                    </Link>
                    <div className="border-t border-gray-200"></div>
                    <div className="px-4 py-2 text-sm font-semibold text-black">
                      Profil Pendiri
                    </div>
                    <Link
                      href="/tentang/profil-pimpinan/pimpinan-pondok/kh-noorsofa-thohir"
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600"
                      onClick={closeMenus}>
                      KH Noorsofa Thohir
                    </Link>
                    <Link
                      href="/tentang/profil-pimpinan/pimpinan-pondok/kh-maman-firmansyah"
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600"
                      onClick={closeMenus}>
                      KH Maman Firmansyah
                    </Link>
                    <div className="px-4 py-2 text-sm font-semibold text-black">
                      Profil Pembina
                    </div>
                    <Link
                      href="/tentang/profil-pimpinan/trimurti/trimurti-1"
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600"
                      onClick={closeMenus}>
                      Trimurti 1
                    </Link>
                    <Link
                      href="/tentang/profil-pimpinan/trimurti/trimurti-2"
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600"
                      onClick={closeMenus}>
                      Trimurti 2
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sejarah Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen('sejarah')}
              onMouseLeave={() => setDropdownOpen(null)}>
              <motion.button
                whileHover={linkHover}
                className="text-white hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-bold flex items-center">
                Sejarah
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.button>
              <AnimatePresence>
                {dropdownOpen === 'sejarah' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 w-64 bg-white border border-gray-700 rounded-md shadow-lg z-10">
                    <Link
                      href="/sejarah/latar-belakang"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600">
                      Latar Belakang
                    </Link>
                    <Link
                      href="/sejarah/selayang-pandang"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600">
                      Selayang Pandang
                    </Link>
                    <Link
                      href="/sejarah/sintesa"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600">
                      Sintesa
                    </Link>
                    <Link
                      href="/sejarah/struktur-organisasi"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-emerald-600">
                      Struktur Organisasi
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Berita */}
            <motion.div whileHover={linkHover}>
              <Link
                href="/berita"
                className="text-white hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-bold">
                Berita
              </Link>
            </motion.div>

            {/* Pendaftaran Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen('pendaftaran')}
              onMouseLeave={() => setDropdownOpen(null)}>
              <motion.button
                whileHover={linkHover}
                className="text-white hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-bold flex items-center">
                Pendaftaran
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.button>
              <AnimatePresence>
                {dropdownOpen === 'pendaftaran' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 w-48 bg-hijau border border-gray-700 rounded-md shadow-lg z-10">
                    <Link
                      href="/pendaftaran/pendaftaran-KMI"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-black hover:text-white bg-white hover:bg-emerald-600">
                      Pendaftaran KMI
                    </Link>
                    <Link
                      href="/pendaftaran/seleksi-dan-wawancara"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-black hover:text-white bg-white hover:bg-emerald-600">
                      Seleksi dan Wawancara
                    </Link>
                    <Link
                      href="/pendaftaran/ujian-lanjutan"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-black hover:text-white bg-white hover:bg-emerald-600">
                      Ujian Lanjutan
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Kontak */}
            <motion.div whileHover={linkHover}>
              <Link
                href="/kontak"
                className="text-white hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-bold">
                Kontak
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-emerald-400 focus:outline-none focus:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-hijau border-t border-gray-200">
                {/* Mobile Home */}
                <Link
                  href="/"
                  className="block px-3 py-2 text-base font-bold text-white hover:text-emerald-400 hover:bg-maroo"
                  onClick={closeMenus}>
                  Home
                </Link>

                {/* Mobile Tentang */}
                <div>
                  <button
                    onClick={() => toggleDropdown('tentang')}
                    className="flex items-center w-full px-3 py-2 text-base font-bold text-white hover:text-emerald-400 hover:bg-maroo">
                    Tentang
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === 'tentang' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: { duration: 0.2 },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: { duration: 0.15 },
                        }}
                        className="pl-4 overflow-hidden">
                        <div className="px-3 py-2 text-sm font-semibold text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Falsafah
                        </div>
                        <Link
                          href="/tentang/falsafah/moto"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Moto
                        </Link>
                        <Link
                          href="/tentang/falsafah/panca-jangka"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Panca Jangka
                        </Link>
                        <Link
                          href="/tentang/falsafah/panca-jiwa"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Panca Jiwa
                        </Link>
                        <Link
                          href="/tentang/falsafah/sintesa"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Sintesa
                        </Link>
                        <div className="px-3 py-2 text-sm font-semibold text-white">
                          Pendidikan
                        </div>
                        <Link
                          href="/tentang/pendidikan/tujuan-pendidikan-dan-pengajaran"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Tujuan Pendidikan dan Pengajaran
                        </Link>
                        <div className="px-3 py-2 text-sm font-semibold text-white">
                          Profil Pendiri
                        </div>
                        <Link
                          href="/tentang/profil-pimpinan/pimpinan-pondok/kh-noorsofa-thohir"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          KH Noorsofa Thohir
                        </Link>
                        <Link
                          href="/tentang/profil-pimpinan/pimpinan-pondok/kh-maman-firmansyah"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          KH Maman Firmansyah
                        </Link>
                        <div className="px-3 py-2 text-sm font-semibold text-white">
                          Profil Pembina
                        </div>
                        <Link
                          href="/tentang/profil-pimpinan/trimurti/trimurti-1"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Trimurti 1
                        </Link>
                        <Link
                          href="/tentang/profil-pimpinan/trimurti/trimurti-2"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Trimurti 2
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Sejarah */}
                <div>
                  <button
                    onClick={() => toggleDropdown('sejarah')}
                    className="flex items-center w-full px-3 py-2 text-base font-bold text-white hover:text-emerald-400 hover:bg-maroo">
                    Sejarah
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === 'sejarah' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: { duration: 0.2 },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: { duration: 0.15 },
                        }}
                        className="pl-4 overflow-hidden">
                        <Link
                          href="/sejarah/latar-belakang"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Latar Belakang
                        </Link>
                        <Link
                          href="/sejarah/selayang-pandang"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Selayang Pandang
                        </Link>
                        <Link
                          href="/sejarah/sintesa"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Sintesa
                        </Link>
                        <Link
                          href="/sejarah/struktur-organisasi"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Struktur Organisasi
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Berita */}
                <Link
                  href="/berita"
                  className="block px-3 py-2 text-base font-bold text-white hover:text-emerald-400 hover:bg-maroo"
                  onClick={closeMenus}>
                  Berita
                </Link>

                {/* Mobile Pendaftaran */}
                <div>
                  <button
                    onClick={() => toggleDropdown('pendaftaran')}
                    className="flex items-center w-full px-3 py-2 text-base font-bold text-white hover:text-emerald-400 hover:bg-maroo">
                    Pendaftaran
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === 'pendaftaran' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: { duration: 0.2 },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: { duration: 0.15 },
                        }}
                        className="pl-4 overflow-hidden">
                        <Link
                          href="/pendaftaran/pendaftaran-KMI"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Pendaftaran KMI
                        </Link>
                        <Link
                          href="/pendaftaran/seleksi-dan-wawancara"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Seleksi dan Wawancara
                        </Link>
                        <Link
                          href="/pendaftaran/ujian-lanjutan"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-white hover:bg-white hover:text-hijau rounded-2xl">
                          Ujian Lanjutan
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Kontak */}
                <Link
                  href="/kontak"
                  className="block px-3 py-2 text-base font-bold text-white hover:text-emerald-400 hover:bg-maroo"
                  onClick={closeMenus}>
                  Kontak
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
