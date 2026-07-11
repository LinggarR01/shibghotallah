'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type MenuItem = {
  href: string;
  label: string;
  external?: boolean;
};

type MenuGroup = {
  title?: string;
  items: MenuItem[];
};

const tentangGroups: MenuGroup[] = [
  {
    title: 'Falsafah',
    items: [
      { href: '/tentang/falsafah/moto', label: 'Moto' },
      { href: '/tentang/falsafah/panca-jangka', label: 'Panca Jangka' },
      { href: '/tentang/falsafah/panca-jiwa', label: 'Panca Jiwa' },
      { href: '/sejarah/sintesa', label: 'Sintesa' },
    ],
  },
  {
    title: 'Pendidikan',
    items: [
      {
        href: '/tentang/pendidikan/tujuan-pendidikan-dan-pengajaran',
        label: 'Tujuan Pendidikan dan Pengajaran',
      },
    ],
  },
  {
    title: 'Profil Pendiri',
    items: [
      {
        href: '/tentang/profil-pimpinan/pimpinan-pondok/kh-noorsofa-thohir',
        label: 'KH Noorsofa Thohir',
      },
      {
        href: '/tentang/profil-pimpinan/pimpinan-pondok/kh-maman-firmansyah',
        label: 'KH Maman Firmansyah',
      },
    ],
  },
];

const sejarahGroups: MenuGroup[] = [
  {
    items: [
      { href: '/sejarah/latar-belakang', label: 'Latar Belakang' },
      { href: '/sejarah/selayang-pandang', label: 'Selayang Pandang' },
      { href: '/sejarah/sintesa', label: 'Sintesa' },
      { href: '/sejarah/badan-wakaf', label: 'Badan Wakaf' },
    ],
  },
];

const pendaftaranGroups: MenuGroup[] = [
  {
    items: [
      {
        href: 'https://pendaftaran.pondokmodernshibghatallah.com/',
        label: 'Pendaftaran',
        external: true,
      },
      {
        href: '/pendaftaran/informasi-pendaftaran',
        label: 'Informasi Pendaftaran',
      },
    ],
  },
];

type DropdownKey = 'tentang' | 'sejarah' | 'pendaftaran';

const navLinkClass =
  'rounded-md px-3 py-2 text-sm font-bold text-white transition hover:text-emerald-400';

function Chevron() {
  return (
    <svg
      className="ml-1 h-4 w-4"
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
  );
}

function MenuLink({
  item,
  onClick,
  className,
}: {
  item: MenuItem;
  onClick?: () => void;
  className: string;
}) {
  return (
    <Link
      href={item.href}
      prefetch={item.external ? undefined : false}
      className={className}
      onClick={onClick}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noreferrer' : undefined}>
      {item.label}
    </Link>
  );
}

function DesktopDropdown({
  id,
  label,
  groups,
  openDropdown,
  setOpenDropdown,
  closeMenus,
}: {
  id: DropdownKey;
  label: string;
  groups: MenuGroup[];
  openDropdown: string | null;
  setOpenDropdown: (value: string | null) => void;
  closeMenus: () => void;
}) {
  const isPendaftaran = id === 'pendaftaran';

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(id)}
      onMouseLeave={() => setOpenDropdown(null)}>
      <button
        type="button"
        className={`${navLinkClass} flex items-center transition-transform hover:scale-105`}
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        aria-expanded={openDropdown === id}>
        {label}
        <Chevron />
      </button>

      {openDropdown === id ? (
        <div
          className={`absolute right-0 z-10 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg ${
            isPendaftaran ? 'w-56' : 'w-64'
          }`}>
          {groups.map((group, groupIndex) => (
            <div
              key={group.title ?? groupIndex}
              className={groupIndex > 0 ? 'border-t border-gray-200' : undefined}>
              {group.title ? (
                <div className="px-4 py-2 text-sm font-semibold text-black">
                  {group.title}
                </div>
              ) : null}
              {group.items.map((item) => (
                <MenuLink
                  key={item.href}
                  item={item}
                  onClick={closeMenus}
                  className="block bg-white px-4 py-2 text-sm text-black transition hover:bg-emerald-600 hover:text-white"
                />
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MobileDropdown({
  id,
  label,
  groups,
  openDropdown,
  toggleDropdown,
  closeMenus,
}: {
  id: DropdownKey;
  label: string;
  groups: MenuGroup[];
  openDropdown: string | null;
  toggleDropdown: (menu: DropdownKey) => void;
  closeMenus: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => toggleDropdown(id)}
        className="flex w-full items-center px-3 py-2 text-base font-bold text-white transition hover:text-emerald-400"
        aria-expanded={openDropdown === id}>
        {label}
        <Chevron />
      </button>

      {openDropdown === id ? (
        <div className="overflow-hidden pl-4">
          {groups.map((group, groupIndex) => (
            <div key={group.title ?? groupIndex}>
              {group.title ? (
                <div className="px-3 py-2 text-sm font-semibold text-white">
                  {group.title}
                </div>
              ) : null}
              {group.items.map((item) => (
                <MenuLink
                  key={item.href}
                  item={item}
                  onClick={closeMenus}
                  className="block rounded-2xl px-3 py-2 text-sm text-white transition active:bg-white active:text-hijau"
                />
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenus = () => {
    setDropdownOpen(null);
    setMobileMenuOpen(false);
  };

  const toggleDropdown = (menu: DropdownKey) => {
    setDropdownOpen((current) => (current === menu ? null : menu));
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-hijau font-quicksand shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex shrink-0 items-center px-4 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
            <Link
              href="/"
              prefetch={false}
              className="flex items-center gap-3"
              onClick={closeMenus}>
              <Image
                src="/logo.webp"
                alt="Logo Shibghatallah Al-Islamy"
                width={60}
                height={60}
                className="h-10 w-10 rounded-full bg-white object-contain p-1 transition-all duration-300 md:h-14 md:w-14"
              />
              <span className="truncate text-lg font-bold text-white transition-all duration-300 sm:text-xl lg:text-2xl">
                Shibghatallah Al-Islamy
              </span>
            </Link>
          </div>

          <div className="hidden items-center space-x-4 lg:flex">
            <div className="transition-transform duration-200 hover:scale-105">
              <Link href="/" prefetch={false} className={navLinkClass}>
                Beranda
              </Link>
            </div>

            <DesktopDropdown
              id="tentang"
              label="Tentang"
              groups={tentangGroups}
              openDropdown={dropdownOpen}
              setOpenDropdown={setDropdownOpen}
              closeMenus={closeMenus}
            />
            <DesktopDropdown
              id="sejarah"
              label="Sejarah"
              groups={sejarahGroups}
              openDropdown={dropdownOpen}
              setOpenDropdown={setDropdownOpen}
              closeMenus={closeMenus}
            />

            <div className="transition-transform duration-200 hover:scale-105">
              <Link href="/berita" prefetch={false} className={navLinkClass}>
                Berita
              </Link>
            </div>

            <DesktopDropdown
              id="pendaftaran"
              label="Pendaftaran"
              groups={pendaftaranGroups}
              openDropdown={dropdownOpen}
              setOpenDropdown={setDropdownOpen}
              closeMenus={closeMenus}
            />

            <div className="transition-transform duration-200 hover:scale-105">
              <Link href="/kontak" prefetch={false} className={navLinkClass}>
                Kontak
              </Link>
            </div>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="text-white transition hover:text-emerald-400 focus:outline-none focus:text-white"
              aria-expanded={mobileMenuOpen}
              aria-label="Buka menu navigasi">
              <svg
                className="h-6 w-6"
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
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="overflow-hidden border-t border-gray-200 bg-hijau lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <Link
                href="/"
                prefetch={false}
                className="block px-3 py-2 text-base font-bold text-white transition hover:text-emerald-400"
                onClick={closeMenus}>
                Beranda
              </Link>
              <MobileDropdown
                id="tentang"
                label="Tentang"
                groups={tentangGroups}
                openDropdown={dropdownOpen}
                toggleDropdown={toggleDropdown}
                closeMenus={closeMenus}
              />
              <MobileDropdown
                id="sejarah"
                label="Sejarah"
                groups={sejarahGroups}
                openDropdown={dropdownOpen}
                toggleDropdown={toggleDropdown}
                closeMenus={closeMenus}
              />
              <Link
                href="/berita"
                prefetch={false}
                className="block px-3 py-2 text-base font-bold text-white transition hover:text-emerald-400"
                onClick={closeMenus}>
                Berita
              </Link>
              <MobileDropdown
                id="pendaftaran"
                label="Pendaftaran"
                groups={pendaftaranGroups}
                openDropdown={dropdownOpen}
                toggleDropdown={toggleDropdown}
                closeMenus={closeMenus}
              />
              <Link
                href="/kontak"
                prefetch={false}
                className="block px-3 py-2 text-base font-bold text-white transition hover:text-emerald-400"
                onClick={closeMenus}>
                Kontak
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
