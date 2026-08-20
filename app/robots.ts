import type { MetadataRoute } from 'next'
import aiBots from './ai.robots';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
        {
            userAgent: aiBots,
            disallow: ['/'],
        },
        {
            userAgent: '*',
            disallow: ['/embed/'],
            allow: ['/'],
        },
        ],
        sitemap: 'https://thesoulboundseries.com/sitemap.xml',
    }
}