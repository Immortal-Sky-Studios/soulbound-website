'use client'
import { use } from 'react';
import { getEpisode } from '@/lib/neonFunctions';

export default function EmbeddedEpisode({
    episode,
}: {
    episode?: ReturnType<typeof getEpisode>
}) {
    var slug;
    if (episode) {
        const selectedEp = use(episode);
        slug = selectedEp.slug
    }else {
        slug = "latest_episode"
    }

    return (
        <iframe title="soulboundEpisode" src={`/embed/episodes/${slug}`} className="h-[30rem] sm:h-[15rem] w-full rounded-4xl overflow-hidden"/>
    )
}