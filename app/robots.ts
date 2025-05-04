import type { MetadataRoute } from 'next'
import fs from 'fs';

export default async function robots(): Promise<MetadataRoute.Robots> {
    const botsStr = fs.readFileSync('lib/releaseDownloads/robots.txt').toString();
    const aiBots = botsStr.split('\n').map((entry) => entry.split('User-agent: ')[1]).filter((entry) => (entry));

    return {
        rules: [
        {
            userAgent: aiBots,
            disallow: ['/'],
        },
        {
            userAgent: '*',
            disallow: ['/embed/', '/episodes/'],
            allow: ['/episodes', '/'],
        },
        ],
        sitemap: 'https://thesoulboundseries.com/sitemap.xml',
    }
}