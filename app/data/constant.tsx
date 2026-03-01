export interface Falsafah {
  id: number;
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export const falsafah: Falsafah[] = [
  {
    id: 1,
    title: 'Moto Pondok',
    description:
      'Mencetak kader pemimpin umat yang memiliki kedalaman spiritual (Tafaqquh Fiddin) sekaligus keluasan wawasan sains modern.',
    link: '/falsafah/moto',
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Sintesa',
    description:
      'Integrasi totalitas kehidupan pesantren yang membentuk pribadi mandiri, beradab, dan disiplin dalam ekosistem pendidikan 24 jam.',
    link: '/falsafah/sintesa',
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Panca Jiwa & Jangka',
    description:
      'Internalisasi nilai karakter luhur sebagai ruh kehidupan dan rencana strategis demi kemajuan lembaga yang berkelanjutan.',
    link: '/falsafah/panca-jiwa',
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

export const articles: Article[] = [
  {
    id: 1,
    title: 'Penerimaan Santri Baru Tahun Ajaran 2024/2025',
    description:
      'Pondok Pesantren Shibghotallah kembali membuka pendaftaran bagi calon santriwan dan santriwati baru. Simak syarat dan ketentuannya di sini.',
    date: '2024-02-24',
    category: 'Pendaftaran',
    image: '/placeholder.svg',
    slug: 'penerimaan-santri-baru',
  },
  {
    id: 2,
    title: 'Kegiatan Ekstrakurikuler: Membangun Karakter Santri',
    description:
      'Selain belajar agama, santri juga dibekali dengan berbagai kegiatan ekstrakurikuler seperti pramuka, silat, dan seni kaligrafi untuk melatih soft skill.',
    date: '2024-02-20',
    category: 'Kegiatan',
    image: '/placeholder.svg',
    slug: 'kegiatan-ekstrakurikuler',
  },
  {
    id: 3,
    title: 'Prestasi Membanggakan di Tingkat Provinsi',
    description:
      'Alhamdulillah, perwakilan santri kami berhasil menyabet juara 1 dalam lomba pidato Bahasa Arab tingkat provinsi.',
    date: '2024-02-15',
    category: 'Prestasi',
    image: '/placeholder.svg',
    slug: 'prestasi-santri',
  },
];

export const FOOTER_LINKS = {
  about: [
    { name: 'Falsafah & Moto', href: '/tentang/falsafah/moto' },
    {
      name: 'Sistem Pendidikan',
      href: '/tentang/pendidikan/tujuan-pendidikan-dan-pengajaran',
    },
    { name: 'Profil Pimpinan', href: '/tentang/profil-pimpinan/pimpinan-1' },
    { name: 'Sejarah Berdiri', href: '/sejarah/latar-belakang' },
    { name: 'Struktur Organisasi', href: '/sejarah/struktur-organisasi' },
  ],
  info: [
    { name: 'Pendaftaran Santri (KMI)', href: '/pendaftaran/pendaftaran-KMI' },
    {
      name: 'Info Seleksi & Ujian',
      href: '/pendaftaran/seleksi-dan-wawancara',
    },
    { name: 'Berita & Pengumuman', href: '/berita' },
    { name: 'Hubungi Kami', href: '/kontak' },
  ],
  contact: {
    address: 'Jl. Pendidikan No. 123, Kota Islamic, Jawa Barat, Indonesia',
    phone: '(021) 123-4567',
    email: 'info@shibghotallah.edu',
  },
};
