export interface Falsafah {
  id: number;
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

export interface LinkItem {
  id: number;
  name: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface SiteLinks {
  about: LinkItem[];
  info: LinkItem[];
  contact: ContactInfo;
}

export const falsafah: Falsafah[] = [
  {
    id: 1,
    title: 'Moto Pondok',
    description:
      'Mencetak kader pemimpin umat yang memiliki kedalaman spiritual (Tafaqquh Fiddin) sekaligus keluasan wawasan sains modern.',
    link: '/tentang/falsafah/moto',
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
    link: '/tentang/falsafah/sintesa',
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
    title: 'Panca Jiwa ',
    description:
      'Internalisasi nilai karakter luhur sebagai ruh kehidupan dan rencana strategis demi kemajuan lembaga yang berkelanjutan.',
    link: '/tentang/falsafah/panca-jiwa',
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
];

export const LINKS: SiteLinks = {
  about: [
    {
      id: 1,
      name: 'Falsafah & Moto',
      href: '/tentang/falsafah/moto',
      description:
        'Nilai-nilai dasar dan pandangan hidup yang menjadi pedoman seluruh santri dan asatidz.',
      icon: (
        <svg
          className="w-6 h-6"
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
    {
      id: 2,
      name: 'Sistem Pendidikan',
      href: '/tentang/pendidikan/tujuan-pendidikan-dan-pengajaran',
      description:
        'Kurikulum terpadu yang menggabungkan ilmu agama Islam klasik dan pengetahuan umum modern.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
      ),
    },
    {
      id: 3,
      name: 'Profil Pimpinan',
      href: '/tentang/profil-pimpinan/pimpinan-pondok/kh-noorsofa-thohir',
      description:
        'Mengenal lebih dekat sosok pimpinan dan pengasuh Pondok Pesantren Shibghotallah.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      name: 'Sejarah Berdiri',
      href: '/sejarah/latar-belakang',
      description:
        'Perjalanan panjang dan tonggak sejarah berdirinya pondok pesantren dari masa ke masa.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 5,
      name: 'Struktur Organisasi',
      href: '/sejarah/struktur-organisasi',
      description:
        'Bagan kepengurusan dan lembaga-lembaga yang menggerakkan roda kehidupan pondok.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ],
  info: [
    {
      id: 6,
      name: 'Pendaftaran Santri (KMI)',
      href: '/pendaftaran/pendaftaran-KMI',
      description:
        'Informasi lengkap tata cara dan syarat pendaftaran santri baru program KMI.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
    },
    {
      id: 7,
      name: 'Info Seleksi ',
      href: '/pendaftaran/seleksi-dan-wawancara',
      description:
        'Jadwal, materi ujian tertulis, serta panduan wawancara bagi calon santri dan wali.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 8,
      name: 'Berita',
      href: '/berita',
      description:
        'Kabar terbaru, artikel kegiatan, dan pengumuman resmi dari redaksi pesantren.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      id: 9,
      name: 'Hubungi Kami',
      href: '/kontak',
      description:
        'Layanan informasi, nomor kontak resmi, dan alamat lengkap pondok pesantren.',
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
  ],
  contact: {
    address:
      'Jl. Belibis V, RT.19/RW.4, Semper Barat, Kec. Cilincing, Kota Jakarta Utara, Daerah Khusus Ibukota Jakarta 14130',
    phone: '(021) 123-4567',
    email: 'info@shibghotallah.edu',
  },
};
