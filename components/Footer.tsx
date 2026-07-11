import Link from 'next/link';
import { LINKS } from '@/utils/constant';
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa6';

const socialItems = [
  {
    name: 'Facebook',
    href: LINKS.contact.socialMedia.facebook,
    icon: FaFacebook,
  },
  {
    name: 'Instagram',
    href: LINKS.contact.socialMedia.instagram,
    icon: FaInstagram,
  },
  {
    name: 'TikTok',
    href: LINKS.contact.socialMedia.tiktok,
    icon: FaTiktok,
  },
  {
    name: 'X',
    href: LINKS.contact.socialMedia.twitter,
    icon: FaXTwitter,
  },
  {
    name: 'YouTube',
    href: LINKS.contact.socialMedia.youtube,
    icon: FaYoutube,
  },
].filter((item) => Boolean(item.href));

const isInternalHref = (href: string) => href.startsWith('/');

export default function Footer() {
  return (
    <footer className="bg-hijau text-white pt-16 pb-8 font-quicksand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Pondok Modern <br /> Shibghatallah Al-Islamy
            </h3>

            <p className="text-emerald-50 leading-relaxed mb-3 max-w-sm">
              Modern Islamic Boarding School yang berkomitmen untuk mencetak
              generasi muda yang beriman, berilmu, dan berakhlak mulia.
            </p>

            <div className="flex space-x-4">
              {socialItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="text-2xl hover:text-emerald-200 cursor-pointer transition-colors duration-300">
                    <Icon />
                  </a>
                );
              })}
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
                    prefetch={false}
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
                  {isInternalHref(link.href) ? (
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-emerald-100 hover:text-white hover:underline transition-all duration-300">
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-100 hover:text-white hover:underline transition-all duration-300">
                      {link.name}
                    </a>
                  )}
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
            2026 Pondok Modern Shibghatallah Al-Islamy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
