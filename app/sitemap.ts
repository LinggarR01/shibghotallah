import type { MetadataRoute } from 'next';

const baseUrl = 'https://pondokmodernshibghatallah.com';

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-06-02');

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/informasi-pendaftaran`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
