import type { MetadataRoute } from 'next'
import fs from 'fs';
import { downloadRelease } from "@terascope/fetch-github-release";

export default async function robots(): Promise<MetadataRoute.Robots> {
    if (!fs.existsSync('/tmp/robots.txt')) {
        const _releaseInfo = await downloadRelease('ai-robots-txt','ai.robots.txt','/tmp/',(release) => (true || release),(asset) => (asset.name == 'robots.txt'));
    }
    const botsStr = fs.readFileSync('/tmp/robots.txt').toString();
    const aiBots = botsStr.split('\n').map((entry) => entry.split('User-agent: ')[1]).filter((entry) => (entry));

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