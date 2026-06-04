import { LINKS } from '@/utils/constant';
import GoogleMaps from '@/components/ui/GoogleMaps';
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
    <div className="min-h-screen w-full overflow-x-hidden bg-white pt-16 font-quicksand">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 text-center md:mb-12 animate-fade-in-up">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Kontak & Lokasi
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <div className="w-full overflow-hidden rounded-3xl animate-fade-in-up">
            <h3 className="mb-6 border-b border-emerald-100 pb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl md:mb-8">
              Informasi Kontak
            </h3>

            <div className="space-y-5 sm:space-y-7 stagger-container">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-4 sm:gap-5 sm:p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="mb-1 text-base font-bold text-gray-900 sm:text-lg">
                        {item.title}
                      </h4>

                      <p className="break-words text-sm leading-relaxed text-gray-600 sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}

              {socialItems.length > 0 && (
                <div className="pt-2 animate-fade-in-up">
                  <h4 className="mb-4 text-base font-bold text-gray-900 sm:text-lg">
                    Sosial Media
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {socialItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <a
                          key={item.title}
                          href={item.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.title}
                          className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-600 hover:text-white sm:h-12 sm:w-12">
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="min-h-[360px] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl animate-fade-in-up sm:min-h-[420px] lg:min-h-full">
            <GoogleMaps
              title="Lokasi Pondok Pesantren"
              address="Pondok Pesantren Shibghotallah Al-Islamy, Jl. Belibis V, Semper Barat, Cilincing, Jakarta Utara"
              embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9624321764495!2d106.92677857492892!3d-6.135750093851109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b55c954cfcf%3A0x1d65a33047be229f!2sPondok%20Pesantren%20Shibghotallah%20Al%20Islamy!5e0!3m2!1sen!2sus!4v1779818031933!5m2!1sen!2sus"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
