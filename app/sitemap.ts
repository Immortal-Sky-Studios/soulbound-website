import type { MetadataRoute } from 'next';

import { getEpisodeList } from '@/lib/neonFunctions';

async function getEpisodePages() {
    const data = await getEpisodeList('asc');
    return data.map((episode) => {
        const page: { url: string, lastModified: Date, changeFrequency: 'yearly' } = {
            url: `https://thesoulboundseries.com/episodes/${episode.slug}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
        };
        return page;
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://thesoulboundseries.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://thesoulboundseries.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://thesoulboundseries.com/episodes',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...await getEpisodePages(),
  ]
}