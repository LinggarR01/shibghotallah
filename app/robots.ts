import type { MetadataRoute } from 'next';

const baseUrl = 'https://pondokmodernshibghatallah.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/admin', '/api'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
